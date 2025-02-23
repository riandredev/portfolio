import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1
    }
  })
    .middleware(() => {
      return { };
    })
    .onUploadComplete(({ file }) => {
      console.log("Upload complete for:", file.key);
      return {
        fileUrl: file.ufsUrl, // Use ufsUrl
        fileKey: file.key // Return the key for tracking
      };
    }),

  videoUploader: f({
    video: {
      maxFileSize: "16MB",
      maxFileCount: 1
    }
  })
    .middleware(() => {
      return { };
    })
    .onUploadComplete(({ file }) => {
      console.log("Upload complete for:", file.key);
      return {
        fileUrl: file.ufsUrl, // Use ufsUrl
        fileKey: file.key // Return the key for tracking
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
