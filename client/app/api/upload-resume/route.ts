import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user) {
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
        const filename = `${user.id}_${timestamp}_${originalName}`;
        const filepath = path.join(uploadsDir, filename);

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // TODO: Save file info to database
        // You might want to store:
        // - user_id
        // - original_filename
        // - stored_filename
        // - file_path
        // - file_size
        // - upload_date
        // - file_type

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
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // TODO: Fetch user's uploaded resumes from database
        // For now, return empty array

        return NextResponse.json({
            resumes: []
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
        const user = await getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');

        if (!filename) {
            return NextResponse.json({ error: 'Filename not provided' }, { status: 400 });
        }

        // TODO: Delete file from filesystem and database record
        // Verify user owns the file before deleting

        return NextResponse.json({
            message: 'Resume deleted successfully'
        });

    } catch (error) {
        console.error('Resume delete error:', error);
        return NextResponse.json({ error: 'Failed to delete resume' }, { status: 500 });
    }
}
