const Joi = require("joi");

// validasi metadata pada berkas yang di upload
//  nilai metadata dari berkas yang dikirim merupakan objek readable.hapi.

//  unknown: objek payload dapat memiliki properti apa pun selama terdapat properti content-type
const ImageHeadersSchema = Joi.object({
  "content-type": Joi.string()
    .valid(
      "image/apng",
      "image/avif",
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/webp"
    )
    .required(),
}).unknown();

module.exports = ImageHeadersSchema;
