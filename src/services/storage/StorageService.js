const fs = require("node:fs");

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      // recursive: membuat semua folder yang diperlukan jika path yang diberikan mengandung folder yang belum ada.
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    // file merupakan berkas gambar yang akan dikirim user berupa buffer yang otomatis dikonversi ke readablestream
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      // jika terjadi kesalahan write ke storage, throw error
      fileStream.on("error", (error) => reject(error));

      file.pipe(fileStream);

      // jika membaca file sudah selesai, akan membangkitkan event end
      file.on("end", () => resolve(filename));
    });
  }
}

module.exports = StorageService;
