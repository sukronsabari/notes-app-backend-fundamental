const Jwt = require("@hapi/jwt");
const InvariantError = require("../exceptions/InvariantError");

const TokenManager = {
  generateAccessToken: (payload) => {
    // payload berupa identitas pengguna
    // Jwt.token.generate(payload, sekretKey)
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  },
  generateRefreshToken: (payload) => {
    return Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
  },
  verifyRefreshToken: (refreshToken) => {
    // verifikasi token dengan Jwt.token.verifySignature hanya menerima token dalam bentuk artifacts(sudah di decoded)
    try {
      const artifacts = Jwt.token.decode(refreshToken);

      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);

      const { payload } = artifacts.decoded;

      return payload;
    } catch (error) {
      throw new InvariantError("Refresh token tidak valid");
    }
  },
};

module.exports = TokenManager;
