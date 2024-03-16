import axios from "../../axios/config";
import { useState } from "react";
import Input from "../form/Input";
import InputRadio from "../form/InputRadio";
import "./DriverForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DriverForm() {

    const [name, setName] = useState('');
    const [numberCar, setNumberCar] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [nr, setNr] = useState('');
    const [comp, setComp] = useState('');
    const [bairro, setBairro] = useState('');
    const [cel, setCel] = useState('');
    const [celContato, setCelContato] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnh, setCnh] = useState('');
    const [categ, setCateg] = useState('');
    const [mod, setMod] = useState('');
    const [placa, setPlaca] = useState('');
    const [cor, setCor] = useState('');
    const [carretinha, setCarretinha] = useState(false); // Valor inicial para campos booleanos
    const [roca, setRoca] = useState(false);
    const [animal, setAnimal] = useState(false);
    const [cartao, setCartao] = useState(false);
    const [pix, setPix] = useState(false);
    const [pMGrande, setPMGrande] = useState(false);
    const [entryDate, setEntryDate] = useState(new Date().toLocaleDateString());

    const [docCnh, setDocCnh] = useState(null);
    const [docAntecedente, setDocAntecedente] = useState(null);

    const navigate = useNavigate();

    const handleRadioChange = (e) => {
        setSexo(e.target.value);
    };

    const handleNascimentoChange = (e) => {
        console.log("Novo valor de nascimento:", e.target.value);
        setNascimento(e.target.value);
    };

    // Função para formatar a data no formato "DD/MM/YYYY"
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleChange = (event) => {
        if (event.target.name === "docCnh" || event.target.name === "docAntecedente") {
            setDocCnh(event.target.files[0]);
            setDocAntecedente(event.target.files[0]);
            return;
        }
    };

    const createDriver = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("numberCar", numberCar);
        formData.append("nascimento", formatDate(nascimento));
        formData.append("sexo", sexo);
        formData.append("endereco", endereco);
        formData.append("nr", nr);
        formData.append("comp", comp);
        formData.append("bairro", bairro);
        formData.append("cel", cel);
        formData.append("celContato", celContato);
        formData.append("cpf", cpf);
        formData.append("cnh", cnh);
        formData.append("categ", categ);
        formData.append("mod", mod);
        formData.append("placa", placa);
        formData.append("cor", cor);
        formData.append("carretinha", carretinha);
        formData.append("roca", roca);
        formData.append("animal", animal);
        formData.append("pix", pix);
        formData.append("pMGrande", pMGrande);
        formData.append("docCnh", docCnh);
        formData.append("docAntecedente", docAntecedente);
        formData.append("entryDate", entryDate);

        try {

            const response = await axios.post("/drivers", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                toast.success(response.data.msg);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };

    return (
        <form onSubmit={(e) => createDriver(e)} className="form" noValidate>
            <p>Dados pessoais:</p>
            <Input
                type="text"
                text="Nome"
                name="name"
                placeholder="Digite seu nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />
            <Input
                type="date"
                text="Data de Nasc"
                name="nascimento"
                placeholder="dd/mm/aaaa"
                onChange={handleNascimentoChange}
                value={nascimento}
                required
            />
            <div className="radioContainer">
                <span className="labelText">Sexo:</span>
                <InputRadio
                    type="radio"
                    name="sexo"
                    value="masculino"
                    text="Masculino"
                    handleOnChange={handleRadioChange}
                    checked={sexo === 'masculino'}
                />
                <InputRadio
                    type="radio"
                    name="sexo"
                    value="feminino"
                    text="Feminino"
                    handleOnChange={handleRadioChange}
                    checked={sexo === 'feminino'}
                />
                <InputRadio
                    type="radio"
                    name="sexo"
                    value="outros"
                    text="Outros"
                    handleOnChange={handleRadioChange}
                    checked={sexo === 'outros'}
                />
            </div>
            <br />
            <div className="groupForm">
                <Input
                    type="text"
                    text="Endereço"
                    name="endereco"
                    placeholder="Digite seu endereço"
                    onChange={(e) => setEndereco(e.target.value)}
                    value={endereco}
                    required
                />
                <Input
                    type="number"
                    text="Número"
                    name="nr"
                    onChange={(e) => setNr(e.target.value)}
                    value={nr}
                    required
                />
                <Input
                    type="text"
                    text="Complemento"
                    name="comp"
                    onChange={(e) => setComp(e.target.value)}
                    value={comp}
                />
            </div>
            <Input
                type="text"
                text="Bairro"
                name="bairro"
                placeholder="Digite seu bairro"
                onChange={(e) => setBairro(e.target.value)}
                value={bairro}
                required
            />
            <div className="groupForm_two">
                <Input
                    type="tel"
                    text="Seu Telefone"
                    name="cel"
                    placeholder="(99)9 9999-9999"
                    pattern="[0-9]{11}"
                    onChange={(e) => setCel(e.target.value)}
                    value={cel}
                    required
                />
                <Input
                    type="tel"
                    text="Telefone de Emergência"
                    name="celContato"
                    placeholder="(99)9 9999-9999"
                    pattern="[0-9]{11}"
                    onChange={(e) => setCelContato(e.target.value)}
                    value={celContato}
                    required
                />
            </div>
            <div className="groupForm_three">
                <Input
                    type="text"
                    text="CPF"
                    name="cpf"
                    placeholder="Número do CPF"
                    onChange={(e) => setCpf(e.target.value)}
                    value={cpf}
                    required
                />
                <Input
                    type="text"
                    text="CNH"
                    name="cnh"
                    placeholder="Número da CNH"
                    onChange={(e) => setCnh(e.target.value)}
                    value={cnh}
                    required
                />
                <Input
                    type="text"
                    text="Categoria"
                    name="categ"
                    placeholder="Categoria cnh"
                    onChange={(e) => setCateg(e.target.value)}
                    value={categ}
                    required
                />
            </div>
            <Input
                type="file"
                text="Foto CNH"
                name="docCnh"
                onChange={handleChange}
                required
            />
            <Input
                type="file"
                text="Atestado de Antecendentes"
                name="docAntecedente"
                onChange={handleChange}
                required
            />
            <hr />
            <p>Caracteristicas do veículo:</p>
            <Input
                type="text"
                text="Modelo do Veículo"
                name="mod"
                placeholder="Modelo-Marca"
                onChange={(e) => setMod(e.target.value)}
                value={mod}
                required
            />
            <Input
                type="text"
                text="Placa do Veículo"
                name="placa"
                placeholder="Digite a placa"
                onChange={(e) => setPlaca(e.target.value)}
                value={placa}
                required
            />
            <Input
                type="text"
                text="Cor do Veículo"
                name="cor"
                placeholder="Digite a cor"
                onChange={(e) => setCor(e.target.value)}
                value={cor}
                required
            />
            <hr />
            <p>Serviços Prestados:</p>
            <div className="wrapper">
                <div className="checkbox_wrapper">
                    <label>
                        <input
                            type="checkbox"
                            name="carretinha"
                            onChange={(e) => setCarretinha(e.target.checked)}
                            checked={carretinha}
                        />
                        Carretinha
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="roca"
                            onChange={(e) => setRoca(e.target.checked)}
                            checked={roca}
                        />
                        Roça
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="animal"
                            onChange={(e) => setAnimal(e.target.checked)}
                            checked={animal}
                        />
                        Transporta Animal
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="cartao"
                            onChange={(e) => setCartao(e.target.checked)}
                            checked={cartao}
                        />
                        Cartão
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="pix"
                            onChange={(e) => setPix(e.target.checked)}
                            checked={pix}
                        />
                        Pix
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="pMGrande"
                            onChange={(e) => setPMGrande(e.target.checked)}
                            checked={pMGrande}
                        />
                        Porta Malas Grande
                    </label>
                </div>
            </div>
            <hr />
            <br />
            <div className="groupForm_two">
                <Input
                    type="text"
                    text="Número do Carro"
                    name="numberCar"
                    placeholder="Número do  Carro"
                    onChange={(e) => setNumberCar(e.target.value)}
                    value={numberCar}
                    required
                />
                <Input
                    type="text"
                    text="Data de Entrada"
                    name="entryDate"
                    placeholder="Data de Entrada"
                    onChange={(e) => setEntryDate(e.target.value)}
                    readOnly
                    value={entryDate}
                />

            </div>
            <hr />
            <div className="btn-secondary">
                <input type="submit" value="Cadastrar Motorista" />
            </div>
        </form>
    );
}

export default DriverForm;
