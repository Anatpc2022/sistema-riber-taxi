const mongoose = require("mongoose");
const { Schema } = mongoose;

const dailySchema = new Schema(
  {
    paymentDate: {
      type: Date,
      required: true,
    },
    dayWeek: {
      type: String,
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
  });

const DriverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    numberCar: {
      type: String,
      required: true,
    },
    nascimento: {
      type: Date,
      required: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    endereco: {
      type: String,
      required: true,
    },
    nr: {
      type: Number,
      required: true,
    },
    comp: {
      type: String,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    cel: {
      type: String,
      required: true,
    },
    celContato: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    cnh: {
      type: String,
      required: true,
    },
    categ: {
      type: String,
      required: true,
    },
    docCnh: {
      type: String,
      required: true,
    },
    docAntecedente: {
      type: String,
      required: true,
    },
    mod: {
      type: String,
      required: true,
    },
    placa: {
      type: String,
      required: true,
    },
    cor: {
      type: String,
      required: true,
    },
    carretinha: {
      type: Boolean,
    },
    roca: {
      type: Boolean,
    },
    animal: {
      type: Boolean,
    },
    cartao: {
      type: Boolean,
    },
    pix: {
      type: Boolean,
    },
    pMGrande: {
      type: Boolean,
    },
    entryDate: {
      type: Date,
      default: Date.now,
    },
    dailys: [dailySchema],
    amount: {
      type: Number,
      default: 0, // Valor padrão caso não seja especificado
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", DriverSchema);
