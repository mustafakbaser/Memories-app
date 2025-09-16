import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { generateUniqueId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileId = formData.get('fileId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'image/heic',
      'video/mp4',
      'video/mov',
      'video/avi'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';

    // Upload to Cloudinary
    const result = await uploadToCloudinary(
      buffer,
      file.name,
      resourceType
    );

    // In a real application, save file metadata to database
    const fileRecord = {
      id: generateUniqueId(),
      url: result.secure_url,
      publicId: result.public_id,
      filename: file.name,
      size: file.size,
      type: resourceType,
      uploadedAt: new Date().toISOString(),
    };

    // TODO: Save to database
    // await db.files.create({ data: fileRecord });

    return NextResponse.json({
      id: fileRecord.id,
      url: fileRecord.url,
      publicId: fileRecord.publicId,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // In a real application, fetch files from database
    // const files = await db.files.findMany({
    //   orderBy: { uploadedAt: 'desc' }
    // });

    // For now, return empty array
    const files: any[] = [];

    return NextResponse.json(files);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}