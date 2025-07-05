import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import dbConnect from "@/app/lib/db/connect";
import User from "@/app/lib/db/models/user.model";

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('resume') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only PDF and Word documents are allowed.' }, { status: 400 });
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
        }

        // Connect to database
        await dbConnect();

        // Find user in database
        const user = await User.findOne({ email: kindeUser.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete old resume file if exists
        if (user.resumeFilePath) {
            try {
                await unlink(user.resumeFilePath);
            } catch (error) {
                console.log('Old resume file not found or already deleted');
            }
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'uploads', 'resumes');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${kindeUser.id}_${timestamp}_${originalName}`;
        const filepath = path.join(uploadsDir, filename);

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Update user record with resume info
        await User.findByIdAndUpdate(user._id, {
            resumeFileName: filename,
            resumeFilePath: filepath,
            resumeUploadDate: new Date()
        });

        return NextResponse.json({
            message: 'Resume uploaded successfully',
            filename: filename,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString()
        });

    } catch (error) {
        console.error('Resume upload error:', error);
        return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Connect to database
        await dbConnect();

        // Find user in database
        const user = await User.findOne({ email: kindeUser.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            resumes: user.resumeFileName ? [{
                filename: user.resumeFileName,
                uploadDate: user.resumeUploadDate,
                hasResume: true
            }] : [],
            hasResume: !!(user.resumeFileName && user.resumeFilePath)
        });

    } catch (error) {
        console.error('Resume fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Connect to database
        await dbConnect();

        // Find user in database
        const user = await User.findOne({ email: kindeUser.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete file from filesystem
        if (user.resumeFilePath) {
            try {
                await unlink(user.resumeFilePath);
            } catch (error) {
                console.log('Resume file not found or already deleted');
            }
        }

        // Remove resume info from user record
        await User.findByIdAndUpdate(user._id, {
            resumeFileName: null,
            resumeFilePath: null,
            resumeUploadDate: null
        });

        return NextResponse.json({
            message: 'Resume deleted successfully'
        });

    } catch (error) {
        console.error('Resume delete error:', error);
        return NextResponse.json({ error: 'Failed to delete resume' }, { status: 500 });
    }
}
