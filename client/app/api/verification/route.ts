import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded', success: false }, { status: 400 });
        }

        // Prepare file for backend
        const buffer = Buffer.from(await file.arrayBuffer());
        const form = new FormData();
        form.append('image', new Blob([buffer]), file.name);

        // Call backend Flask API
        const backendUrl = 'https://idverify-production.up.railway.app/verify-student-id';
        const response = await fetch(backendUrl, {
            method: 'POST',
            body: form,
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message, success: false }, { status: 500 });
    }
}
