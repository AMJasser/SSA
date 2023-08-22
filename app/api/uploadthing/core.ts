import { createUploadthing, type FileRouter } from "uploadthing/next";
import getSession from "@/utils/getSession";

const f = createUploadthing();

const auth = async (req: Request) => {
    const session = await getSession();

    if (!session || !session.user || !session.user.email) {
        return null;
    }

    return session.user;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    fileUploader: f({
        image: { maxFileSize: "2MB" },
        pdf: { maxFileSize: "2MB" }
    })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth(req);

            // If you throw, the user will not be able to upload
            if (!user) throw new Error("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
