import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

// Disable the default body parser to handle form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Create a promise-based wrapper for form parsing
  const parseForm = (req) => {
    return new Promise((resolve, reject) => {
      try {
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const form = new IncomingForm({
          uploadDir: uploadsDir,
          keepExtensions: true,
        });

        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
            return;
          }
          resolve({ fields, files });
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  try {
    const { fields, files } = await parseForm(req);

    if (!files.file || !fields.fileName) {
      return res.status(400).json({ error: "Missing file or fileName" });
    }

    const file = files.file[0];
    const fileName = fields.fileName[0];
    const oldPath = file.filepath;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const newPath = path.join(uploadsDir, fileName);

    // Rename the file to use the custom filename
    fs.renameSync(oldPath, newPath);

    return res.status(200).json({
      success: true,
      filePath: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Failed to upload file" });
  }
}
