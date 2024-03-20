import fs from 'fs';

import archiver from 'archiver';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

export function zipDirectory(
  sourceDir: string,
  outPath: string,
): Promise<void> {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', (err: Error) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const date = new Date();
const currentDate =
  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
const currentTime = date.getHours() + ':' + date.getMinutes();

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

export async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: `TestReport_${currentDate}-${currentTime}.zip`,
        mimeType: 'application/zip',
      },
      media: {
        mimeType: 'application/zip',
        body: fs.createReadStream('playwright-report.zip'),
      },
    });
    const fileID = response.data.id;

    if (fileID) {
      await drive.permissions.create({
        fileId: fileID,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      const results = await drive.files.get({
        fileId: fileID,
        fields: 'webViewLink, webContentLink',
      });
      return results.data.webViewLink;
    } else {
      return 'File Failed to Upload (Size Limitation)';
    }
  } catch (error) {}
}
