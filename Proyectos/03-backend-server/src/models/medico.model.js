const { Schema, model } = require("mongoose");

const medicoSchema = Schema(
  {
    name: { type: String, requiere: true },
    img: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    hospital: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },
  },
  { collection: "medicos" }
);

medicoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Medico", medicoSchema);
