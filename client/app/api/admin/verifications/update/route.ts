import { NextRequest, NextResponse } from 'next/server';
import { updateVerificationStatus, getVerificationById } from '@/lib/db/verifications';
import dbConnect from '@/app/lib/db/connect';
import User from '@/app/lib/db/models/user.model';
import nodemailer from 'nodemailer';

export async function PUT(request: NextRequest) {
    try {
        // Check admin authentication
        const adminAuth = request.cookies.get('admin-auth');
        if (!adminAuth || adminAuth.value !== 'authenticated') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized access' },
                { status: 401 }
            );
        }

        const { verificationId, status, adminNotes } = await request.json();

        if (!verificationId || !status) {
            return NextResponse.json(
                { success: false, message: 'Verification ID and status are required' },
                { status: 400 }
            );
        }

        // Get the verification record first
        const verification = await getVerificationById(verificationId);
        if (!verification) {
            return NextResponse.json(
                { success: false, message: 'Verification not found' },
                { status: 404 }
            );
        }

        // Update verification status
        const updated = await updateVerificationStatus(verificationId, status, adminNotes);

        if (updated) {
            // If approved, create verified user record and send welcome email
            if (status === 'approved') {
                console.log('Processing approval for verification:', verificationId);
                await dbConnect();

                // Dynamic import to avoid TypeScript issues
                const { default: VerifiedUser } = await import('@/app/lib/db/models/verifiedUser.model');

                // Create verified user record
                try {
                    const verifiedUser = new VerifiedUser({
                        userId: verification.userId,
                        userEmail: verification.userEmail,
                        studentName: verification.studentData.studentName,
                        collegeName: verification.studentData.collegeName,
                        rollNo: verification.studentData.rollNo,
                        state: verification.studentData.state,
                        verificationId: verification.id,
                        verifiedAt: new Date(),
                        verificationDuration: calculateVerificationDuration(verification.submittedAt)
                    });

                    await verifiedUser.save();

                    // Update user's verification status
                    if (verification.userEmail) {
                        const user = await User.findOne({ email: verification.userEmail });
                        if (user) {
                            await User.findOneAndUpdate(
                                { email: verification.userEmail },
                                {
                                    isVerified: true,
                                    verificationDate: new Date(),
                                    verificationId: verification.id
                                }
                            );
                            console.log('User found and updated:', verification.userEmail);
                        } else {
                            // Create user if not found
                            await User.create({
                                name: verification.studentData.studentName || 'Unknown',
                                email: verification.userEmail,
                                isVerified: true,
                                verificationDate: new Date(),
                                verificationId: verification.id,
                                referralCode: Math.random().toString(36).substring(2, 10),
                                coins: 0
                            });
                            console.log('User not found, created new user with isVerified: true:', verification.userEmail);
                        }
                    }

                    console.log('Verified user record created successfully');
                } catch (error) {
                    console.error('Error creating verified user record:', error);
                }

                // Send approval email
                if (verification.userEmail) {
                    console.log('Sending approval email to:', verification.userEmail);
                    await sendApprovalEmail(verification.userEmail, verification.studentData.studentName);
                } else {
                    console.warn('No email found for verification:', verificationId);
                }
            }

            // Send rejection email if verification is rejected
            if (status === 'rejected') {
                console.log('Processing rejection for verification:', verificationId);
                if (verification.userEmail) {
                    console.log('Sending rejection email to:', verification.userEmail);
                    await sendRejectionEmail(verification.userEmail, verification.studentData.studentName, adminNotes);
                } else {
                    console.warn('No email found for verification:', verificationId);
                }
            }

            // Send admin notification for new requests
            if (status === 'pending') {
                await sendAdminNotification(verification);
            }

            return NextResponse.json({
                success: true,
                message: `Verification ${status} successfully`,
                verificationId
            });
        } else {
            return NextResponse.json(
                { success: false, message: 'Failed to update verification status' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error updating verification status:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Calculate verification duration in hours
function calculateVerificationDuration(submittedAt: Date): number {
    const now = new Date();
    const diffMs = now.getTime() - new Date(submittedAt).getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 100)) / 100; // Hours with 2 decimal places
}

// Send approval email to student
async function sendApprovalEmail(userEmail: string, studentName: string) {
    try {
        console.log('Starting approval email send process for:', userEmail);

        // Check if required environment variables are set
        if (!process.env.BROKEBRO_MAIL_PASS) {
            console.error('BROKEBRO_MAIL_PASS environment variable is not set');
            return;
        }

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.BROKEBRO_MAIL_USER || "brokebroindia@gmail.com",
                pass: process.env.BROKEBRO_MAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"BrokeBro Team" <${process.env.BROKEBRO_MAIL_USER || "brokebroindia@gmail.com"}>`,
            to: userEmail,
            subject: "🎉 Welcome to BrokeBro - Your Student Verification is Approved!",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 20px; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #ff6b35; margin: 0;">🎉 Congratulations ${studentName}!</h1>
                        <h2 style="color: #fff; margin: 10px 0;">Your Student Verification is Approved</h2>
                    </div>
                    
                    <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="color: #fff; font-size: 16px; line-height: 1.6;">
                            Welcome to the BrokeBro community! Your student verification has been successfully approved, and you now have access to exclusive student discounts and deals.
                        </p>
                    </div>

                    <div style="background-color: #ff6b35; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #fff; margin: 0 0 10px 0;">✨ What's Next?</h3>
                        <ul style="color: #fff; margin: 0; padding-left: 20px;">
                            <li>Browse exclusive student deals and discounts</li>
                            <li>Refer friends and earn coins</li>
                            <li>Access premium internship opportunities</li>
                            <li>Join our student community</li>
                        </ul>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.KINDE_SITE_URL || 'https://brokebro.in'}" 
                           style="background-color: #ff6b35; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            Explore Deals Now
                        </a>
                    </div>

                    <div style="border-top: 1px solid #333; padding-top: 20px; margin-top: 30px; text-align: center;">
                        <p style="color: #999; font-size: 14px;">
                            This email was sent by BrokeBro. If you have any questions, feel free to reach out to us at 
                            <a href="mailto:brokebroindia@gmail.com" style="color: #ff6b35;">brokebroindia@gmail.com</a>
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Approval email sent successfully to:', userEmail);
    } catch (error) {
        console.error('Error sending approval email to', userEmail, ':', error);
        // Don't throw error to prevent blocking the verification update
    }
}

// Send rejection email to student
async function sendRejectionEmail(userEmail: string, studentName: string, adminNotes?: string) {
    try {
        console.log('Starting rejection email send process for:', userEmail);

        // Check if required environment variables are set
        if (!process.env.BROKEBRO_MAIL_PASS) {
            console.error('BROKEBRO_MAIL_PASS environment variable is not set');
            return;
        }

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.BROKEBRO_MAIL_USER || "brokebroindia@gmail.com",
                pass: process.env.BROKEBRO_MAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"BrokeBro Team" <${process.env.BROKEBRO_MAIL_USER || "brokebroindia@gmail.com"}>`,
            to: userEmail,
            subject: "📋 BrokeBro Student Verification Update",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 20px; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #ff6b35; margin: 0;">📋 Verification Update</h1>
                        <h2 style="color: #fff; margin: 10px 0;">Hi ${studentName}</h2>
                    </div>
                    
                    <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="color: #fff; font-size: 16px; line-height: 1.6;">
                            Thank you for submitting your student verification request. After reviewing your documents, we were unable to approve your verification at this time.
                        </p>
                    </div>

                    ${adminNotes ? `
                    <div style="background-color: #2d1b1b; border-left: 4px solid #ff6b35; padding: 15px; margin: 20px 0;">
                        <h3 style="color: #ff6b35; margin: 0 0 10px 0;">📝 Review Notes:</h3>
                        <p style="color: #fff; margin: 0; line-height: 1.6;">${adminNotes}</p>
                    </div>
                    ` : ''}

                    <div style="background-color: #1a2d1a; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #4ade80; margin: 0 0 10px 0;">🔄 Next Steps:</h3>
                        <ul style="color: #fff; margin: 0; padding-left: 20px;">
                            <li>Review the feedback provided above</li>
                            <li>Ensure all documents are clear and readable</li>
                            <li>Submit a new verification request with updated documents</li>
                            <li>Contact support if you need assistance: brokebroindia@gmail.com</li>
                        </ul>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.KINDE_SITE_URL || 'https://brokebro.in'}/student-verification" 
                           style="background-color: #ff6b35; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            Submit New Request
                        </a>
                    </div>

                    <div style="border-top: 1px solid #333; padding-top: 20px; margin-top: 30px; text-align: center;">
                        <p style="color: #999; font-size: 14px;">
                            This email was sent by BrokeBro. If you have any questions, feel free to reach out to us at 
                            <a href="mailto:brokebroindia@gmail.com" style="color: #ff6b35;">brokebroindia@gmail.com</a>
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Rejection email sent successfully to:', userEmail);
    } catch (error) {
        console.error('Error sending rejection email to', userEmail, ':', error);
        // Don't throw error to prevent blocking the verification update
    }
}

// Send admin notification for new verification requests
async function sendAdminNotification(verification: any) {
    try {
        const adminEmails = ['prince1362005@gmail.com', 'lavanya.varshney2104@gmail.com', 'vrindabindal1212@gmail.com'];

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.BROKEBRO_MAIL_USER || "brokebroindia@gmail.com",
                pass: process.env.BROKEBRO_MAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"BrokeBro Admin" <${process.env.BROKEBRO_MAIL_USER || "brokebroindia@gmail.com"}>`,
            to: adminEmails,
            subject: "🔔 New Student Verification Request - BrokeBro Admin",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 20px; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #ff6b35; margin: 0;">🔔 New Verification Request</h1>
                    </div>
                    
                    <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #ff6b35; margin: 0 0 15px 0;">Student Details:</h3>
                        <p style="color: #fff; margin: 5px 0;"><strong>Name:</strong> ${verification.studentData.studentName}</p>
                        <p style="color: #fff; margin: 5px 0;"><strong>College:</strong> ${verification.studentData.collegeName}</p>
                        <p style="color: #fff; margin: 5px 0;"><strong>Roll No:</strong> ${verification.studentData.rollNo}</p>
                        <p style="color: #fff; margin: 5px 0;"><strong>State:</strong> ${verification.studentData.state}</p>
                        <p style="color: #fff; margin: 5px 0;"><strong>Email:</strong> ${verification.userEmail}</p>
                        <p style="color: #fff; margin: 5px 0;"><strong>Verification ID:</strong> ${verification.id}</p>
                        <p style="color: #fff; margin: 5px 0;"><strong>Submitted:</strong> ${new Date(verification.submittedAt).toLocaleString()}</p>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.KINDE_SITE_URL || 'https://brokebro.in'}/admin" 
                           style="background-color: #ff6b35; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            Review in Admin Panel
                        </a>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Admin notification sent successfully');
    } catch (error) {
        console.error('Error sending admin notification:', error);
    }
}
