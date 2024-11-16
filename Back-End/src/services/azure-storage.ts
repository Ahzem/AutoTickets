// backend/services/azure-storage.ts
import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING!
);

const containerClient = blobServiceClient.getContainerClient("registration-documents");

export const uploadToBlob = async (file: Buffer, fileName: string): Promise<string> => {
  try {
    // Create blob name with timestamp
    const blobName = `${Date.now()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    // Upload file
    await blockBlobClient.upload(file, file.length);
    
    // Return URL
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading to blob:", error);
    throw new Error("Failed to upload file");
  }
};