import { useState, useCallback } from 'react';
import type { UploadedFile, UploadProgress } from '@/types';
import { generateUniqueId, getFileType } from '@/lib/utils';

export function useUpload() {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFiles = useCallback(async (
    files: File[],
    uploaderInfo?: { name: string; email?: string }
  ): Promise<UploadedFile[]> => {
    setIsUploading(true);
    const uploadPromises: Promise<UploadedFile>[] = [];

    // Initialize progress tracking for all files
    const initialUploads = files.map(file => ({
      fileId: generateUniqueId(),
      progress: 0,
      status: 'uploading' as const,
    }));
    
    setUploads(initialUploads);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileId = initialUploads[i].fileId;

      const uploadPromise = new Promise<UploadedFile>((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileId', fileId);
        if (uploaderInfo?.name) {
          formData.append('uploaderName', uploaderInfo.name);
        }
        if (uploaderInfo?.email) {
          formData.append('uploaderEmail', uploaderInfo.email);
        }

        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            setUploads(prev => prev.map(upload => 
              upload.fileId === fileId 
                ? { ...upload, progress }
                : upload
            ));
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              setUploads(prev => prev.map(upload => 
                upload.fileId === fileId 
                  ? { ...upload, status: 'completed', progress: 100 }
                  : upload
              ));
              resolve({
                id: response.id || generateUniqueId(),
                url: response.url,
                publicId: response.publicId,
                filename: file.name,
                size: file.size,
                type: getFileType(file),
                uploadedAt: new Date(),
                uploaderName: uploaderInfo?.name,
                uploaderEmail: uploaderInfo?.email,
              });
            } catch (error) {
              setUploads(prev => prev.map(upload => 
                upload.fileId === fileId 
                  ? { ...upload, status: 'error', error: 'Parse error' }
                  : upload
              ));
              reject(new Error('Invalid response format'));
            }
          } else {
            setUploads(prev => prev.map(upload => 
              upload.fileId === fileId 
                ? { ...upload, status: 'error', error: `HTTP ${xhr.status}` }
                : upload
            ));
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          setUploads(prev => prev.map(upload => 
            upload.fileId === fileId 
              ? { ...upload, status: 'error', error: 'Network error' }
              : upload
          ));
          reject(new Error('Network error'));
        });

        xhr.open('POST', `${window.location.origin}/api/upload`);
        xhr.send(formData);
      });

      uploadPromises.push(uploadPromise);
    }

    try {
      const results = await Promise.allSettled(uploadPromises);
      const successfulUploads = results
        .filter((result): result is PromiseFulfilledResult<UploadedFile> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value);

      const failedUploads = results.filter(result => result.status === 'rejected');
      
      if (failedUploads.length > 0) {
        console.warn(`${failedUploads.length} upload(s) failed`);
      }

      return successfulUploads;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
      // Clear uploads after 5 seconds
      setTimeout(() => setUploads([]), 5000);
    }
  }, []);

  const clearUploads = useCallback(() => {
    setUploads([]);
  }, []);

  return {
    uploads,
    isUploading,
    uploadFiles,
    clearUploads,
  };
}