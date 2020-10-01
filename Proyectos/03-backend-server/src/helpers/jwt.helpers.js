const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (error, token) => {
        if (error) {
          console.log(error);
          return reject(error);
        }

        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
