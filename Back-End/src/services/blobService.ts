// src/services/blobService.ts
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

let containerClient: ContainerClient;

interface FileUpload {
  buffer: Buffer;
  originalname: string;
  size: number;
}

export const initializeBlobStorage = async (): Promise<void> => {
  try {
    if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
      throw new Error('Azure Storage connection string is not configured');
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );

    containerClient = blobServiceClient.getContainerClient(
      'registration-documents'
    );
    await containerClient.createIfNotExists();

    console.log('Azure Blob Storage initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Azure Blob Storage:', error);
    throw error;
  }
};

export const uploadToBlob = async (file: FileUpload): Promise<string> => {
  try {
    if (!containerClient) {
      throw new Error('Blob storage not initialized');
    }

    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(file.buffer, file.size);
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading to blob:', error);
    throw new Error('Failed to upload file');
  }
};