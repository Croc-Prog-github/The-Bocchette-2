import crypto from "crypto";
class Hash {
  static async make(password, salt = process.env.AUTH_SALT || "## SALT ##") {
    return await this.algorithms[this.algorithm](password, salt);
  }
}
Hash.algorithm = "scrypt";
Hash.algorithms = {
  "sha1": (password, salt) => crypto.createHash("sha1").update(password + salt).digest("hex"),
  "scrypt": (password, salt) => new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err)
        reject(err);
      resolve(derivedKey.toString("hex"));
    });
  })
};
export {
  Hash
};
