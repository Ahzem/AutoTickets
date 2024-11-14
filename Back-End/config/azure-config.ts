// backend/config/azure-config.ts
const azureConfig = {
  cosmosDB: {
    endpoint: process.env.COSMOS_ENDPOINT || "your_cosmos_endpoint",
    key: process.env.COSMOS_KEY || "your_cosmos_key",
    databaseId: "event-registration-db",
    containerId: "registrations"
  },
  blobStorage: {
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || "your_connection_string",
    containerName: "registration-documents"
  }
};

export default azureConfig;