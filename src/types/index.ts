export interface UploadedFile {
  id: string;
  url: string;
  publicId: string;
  filename: string;
  size: number;
  type: 'image' | 'video';
  uploadedAt: Date;
  uploaderName?: string;
  uploaderEmail?: string;
}

export interface UploadProgress {
  fileId: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface EventConfig {
  eventName: string;
  eventDate: string;
  coupleNames: string[];
  maxFileSize: number; // in MB
  allowedFileTypes: string[];
  welcomeMessage: string;
}

export interface GalleryFilter {
  type: 'all' | 'image' | 'video';
  dateRange?: {
    start: Date;
    end: Date;
  };
  uploaderName?: string;
}

export interface CloudinaryResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
}