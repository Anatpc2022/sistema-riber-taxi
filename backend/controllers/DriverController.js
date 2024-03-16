const moment = require("moment/moment");
const Driver = require("../models/Driver");

const fs = require("fs");

const removeOldImage = (docCnh, docAntecedente, image) => {
  // Verificar se os arquivos existem antes de tentar removê-los
  if (docCnh) {
    fs.unlink(`public/${docCnh}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Imagem CNH excluída do servidor!");
      }
    });
  }

  if (docAntecedente) {
    fs.unlink(`public/${docAntecedente}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Imagem antecedente excluída do servidor!");
      }
    });
  }

  if (image) {
    fs.unlink(`public/${image}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Comprovante excluído do servidor!");
      }
    });
  }
};

const createDriver = async (req, res) => {
  try {
    const {
      name,
      numberCar,
      nascimento: rawNascimento, // Renomeamos o campo para evitar conflito com a função Date()
      sexo,
      endereco,
      nr,
      comp,
      bairro,
      cel,
      celContato,
      cpf,
      cnh,
      categ,
      mod,
      placa,
      cor,
      carretinha,
      roca,
      animal,
      cartao,
      pix,
      pMGrande,
    } = req.body;

    // Validar a data de nascimento antes de tentar formatá-la
    const isValidDate = moment(rawNascimento, "DD/MM/YYYY", true).isValid();
    if (!isValidDate) {
      return res.status(400).json({
        msg: "Data de nascimento inválida. Por favor, insira uma data no formato DD/MM/YYYY.",
      });
    }

    // Formatar a data de nascimento
    const nascimento = moment(rawNascimento, "DD/MM/YYYY").toDate();

    const docCnh = `docs/${req.files["docCnh"][0].filename}`;
    const docAntecedente = `docs/${req.files["docAntecedente"][0].filename}`;

    // Definir a data de entrada como a data atual
    const entryDate = new Date();

    // Verificar se todos os campos obrigatórios estão presentes
    const requiredFields = [
      "name",
      "numberCar",
      "nascimento",
      "sexo",
      "endereco",
      "nr",
      "comp",
      "bairro",
      "cel",
      "celContato",
      "cpf",
      "cnh",
      "categ",
      "mod",
      "placa",
      "cor",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(req.body[field] || req.files[field])
    );
    console.log("Campos faltando:", missingFields);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos obrigatórios." });
    }

    // Formatar o número do carro com zero à esquerda
    const formattedNumberCar = numberCar.toString().padStart(2, "0");

    const newDriver = new Driver({
      name,
      numberCar: formattedNumberCar,
      nascimento, // Passando a data formatada diretamente
      sexo,
      endereco,
      nr,
      comp,
      bairro,
      cel,
      celContato,
      cpf,
      cnh,
      categ,
      docCnh,
      docAntecedente,
      mod,
      placa,
      cor,
      carretinha,
      roca,
      animal,
      cartao,
      pix,
      pMGrande,
      entryDate,
    });

    await newDriver.save();
    res
      .status(201)
      .json({ msg: "Motorista cadastrado com sucesso!", newDriver });
  } catch (error) {
    console.error("Erro ao criar motorista:", error.message);
    res.status(500).json({ msg: "Ocorreu um erro ao criar o motorista." });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ numberCar: 1 });

    if (drivers.length === 0) {
      return res
        .status(404)
        .json({ msg: "Não existe nenhum Motorista cadastrado!" });
    }
    res.json(drivers);
  } catch (error) {
    console.error("Erro ao obter todos os motoristas:", error.message);
    res.status(500).send("Ocorreu um erro ao obter os motoristas.");
  }
};

const getDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({ msg: "ops! Motorista não encontrado." });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      return res.status(404).json({ msg: "ops! Motorista não encontrado." });
    }

    removeOldImage(driver.docCnh, driver.docAntecedente);

    res.status(200).json({ msg: "Motorista excluído com sucesso!", driver });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro!");
  }
};

const updateDriver = async (req, res) => {
  try {
    const {
      name,
      numberCar,
      nascimento,
      sexo,
      endereco,
      nr,
      comp,
      bairro,
      cel,
      celContato,
      cpf,
      cnh,
      categ,
      mod,
      placa,
      cor,
      carretinha,
      roca,
      animal,
      cartao,
      pix,
      pMGrande,
    } = req.body;

    let docCnh = null;
    let docAntecedente = null;

    // Verifica se os arquivos foram fornecidos na requisição
    if (req.files && req.files["docCnh"] && req.files["docCnh"].length > 0) {
      docCnh = `docs/${req.files["docCnh"][0].filename}`;
    }
    if (
      req.files &&
      req.files["docAntecedente"] &&
      req.files["docAntecedente"].length > 0
    ) {
      docAntecedente = `docs/${req.files["docAntecedente"][0].filename}`;
    }

    // Definir a data de entrada como a data atual
    const entryDate = new Date();

    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({ msg: "Motorista não encontrado." });
    }

    // Remover imagens antigas se houver novos arquivos fornecidos
    if (docCnh || docAntecedente) {
      // Verificar se os arquivos existem antes de tentar removê-los
      if (driver.docCnh) {
        fs.unlink(`public/${driver.docCnh}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Imagem CNH excluída do servidor!");
          }
        });
      }

      if (driver.docAntecedente) {
        fs.unlink(`public/${driver.docAntecedente}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Imagem antecedente excluída do servidor!");
          }
        });
      }
    }

    // Manter os valores atuais se os campos não forem atualizados
    const updatedNumberCar =
      numberCar !== undefined
        ? numberCar.toString().padStart(2, "0")
        : driver.numberCar;

    // Formatar o número do carro com zero à esquerda
    const formattedNumberCar = updatedNumberCar;

    // Montar objeto com os dados atualizados
    const updateData = {
      name,
      numberCar: formattedNumberCar,
      nascimento,
      sexo,
      endereco,
      nr,
      comp,
      bairro,
      cel,
      celContato,
      cpf,
      cnh,
      categ,
      mod,
      placa,
      cor,
      carretinha,
      roca,
      animal,
      cartao,
      pix,
      pMGrande,
      entryDate,
      docCnh,
      docAntecedente,
    };

    // Atualizar o motorista no banco de dados
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    // Retornar resposta de sucesso
    res
      .status(200)
      .json({ msg: "Motorista atualizado com sucesso!", updatedDriver });
  } catch (error) {
    // Retornar mensagem de erro em caso de falha
    console.error("Erro ao atualizar motorista:", error.message);
    res.status(500).send("Ocorreu um erro ao atualizar o motorista.");
  }
};

const addDaily = async (req, res) => {
  try {
    const { paymentDate, dayWeek, payment } = req.body;

     console.log("Dados recebidos no backend:", {
       paymentDate,
       dayWeek,
       payment,
     });

    if (!paymentDate || !dayWeek || !payment) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos" });
    }

    // Convertendo a string de data para o formato Date utilizando moment.js
    const formattedPaymentDate = moment(paymentDate, "DD/MM/YYYY").toDate();

    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(400).json({ msg: "Motorista não encontrado!" });
    }

    // Verifica se há arquivo de imagem na requisição
    let image = null;
    if (req.file) {
      // Se houver, obtemos o caminho do arquivo
      image = req.file.path;
    }

    // Cria um objeto daily com os dados da requisição
    const daily = {
      paymentDate: formattedPaymentDate,
      dayWeek,
      payment,
      image,
    };

    driver.dailys.push(daily);

    // Recalcula o campo amount com base nos pagamentos feitos
    const totalPayment = driver.dailys.reduce(
      (acc, curr) => acc + curr.payment,
      0
    );
    driver.amount = totalPayment; // Atualiza o campo amount

    await driver.save();

    // Adiciona o campo amount ao objeto driver antes de enviar a resposta
    const driverWithAmount = {
      ...driver.toObject(),
      amount: driver.amount,
    };

    // Retorna uma resposta de sucesso com o campo amount
    res
      .status(200)
      .json({
        msg: "Diária atualizada com sucesso!",
        driver: driverWithAmount,
      });
  } catch (error) {
    // Retornar mensagem de erro em caso de falha
    console.error("Erro no pagamento de diária:", error.message);
    res.status(500).send("Ocorreu um erro ao pagar a diária.");
  }
};

module.exports = {
  createDriver,
  getDrivers,
  getDriver,
  deleteDriver,
  updateDriver,
  addDaily,
};
