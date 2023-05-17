const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const InvariantError = require("../../exceptions/InvariantError");

class StorageService {
  constructor() {
    this._S3Client = new S3Client({ region: "ap-southeast-1" });
  }

  async writeFile(file, meta) {
    const key = +new Date() + meta.filename;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Nama S3 Bucket yang digunakan
      Key: key, // Nama berkas yang akan disimpan
      Body: file._data, // Berkas (dalam bentuk Buffer) yang akan disimpan
      ContentType: meta.headers["content-type"], // MIME Type berkas yang akan disimpan
    };

    const uploadCommand = new PutObjectCommand(params);

    try {
      await this._S3Client.send(uploadCommand);

      const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      });

      // Mendapatkan URL akses publik dari respons
      const publicUrl = await getSignedUrl(this._S3Client, getObjectCommand);

      const { origin, pathname } = new URL(publicUrl);
      const fileName = pathname.split("/").pop();

      const shortedPublicUrl = `${origin}/${fileName}`;

      return shortedPublicUrl;
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }
}

module.exports = StorageService;
