const { Schema, model } = require("mongoose");

const hospitalSchema = Schema(
  {
    name: { type: String, requiere: true },
    img: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "Usuario" },
  },
  { collection: "hospitales" }
);

hospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", hospitalSchema);
