import { v2 as cloudinary } from 'cloudinary';
import type { CloudinaryResponse } from '@/types';

// Debug: Log environment variables
console.log('🔍 Environment Debug:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');
console.log('API_SECRET length:', process.env.CLOUDINARY_API_SECRET?.length || 0);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: Buffer,
  filename: string,
  resourceType: 'image' | 'video' = 'image'
): Promise<CloudinaryResponse> {
  return new Promise((resolve, reject) => {
    // Debug: Log upload attempt
    console.log('🔍 Upload Debug:');
    console.log('Timestamp:', Date.now());
    console.log('Unix timestamp (seconds):', Math.floor(Date.now() / 1000));
    console.log('Current date:', new Date().toISOString());
    console.log('Filename:', filename);
    console.log('Resource type:', resourceType);
    console.log('File size:', file.length, 'bytes');

    // Hardcode credentials to bypass environment loading issues
    cloudinary.config({
      cloud_name: 'dx4okk3lp',
      api_key: '117262129685482',
      api_secret: 'BdRVP7eZOdoK2S3ze5BV-_k3d6w',
    });

    console.log('🔧 Reconfigured Cloudinary with hardcoded credentials');

    // Simple upload options
    const uploadOptions = {
      resource_type: resourceType,
      folder: 'memories-app',
    };

    console.log('📤 Upload options:', uploadOptions);

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else if (result) {
          resolve(result as CloudinaryResponse);
        } else {
          reject(new Error('Upload failed - no result returned'));
        }
      }
    ).end(file);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}

export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  const {
    width = 800,
    height = 600,
    quality = 'auto',
    format = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop: 'fill', gravity: 'auto' },
      { quality, fetch_format: format }
    ]
  });
}