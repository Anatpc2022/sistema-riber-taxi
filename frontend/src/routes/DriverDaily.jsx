import axios from '../axios/config';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './DriverDaily.css';

const DriverDaily = () => {
  const { id } = useParams();

  const [driver, setDriver] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [dailys, setDailys] = useState([]);

  const [paymentDate, setPaymentDate] = useState("");
  const [dayWeek, setDayWeek] = useState("");
  const [payment, setPayment] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const getDriver = async () => {
      try {
        const res = await axios.get(`/drivers/${id}`);
        setDriver(res.data);
        setDailys(res.data.dailys);
      } catch (error) {
        console.error('Erro ao obter os dados do motorista:', error);
        toast.error('Erro ao carregar os dados do motorista. Por favor, tente novamente.');
      }
    };
    getDriver();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Defina a largura de 768px como limite para uma tela pequena
    };

    handleResize(); // Chamada inicial para configurar o estado com base no tamanho da tela ao carregar a página

    window.addEventListener('resize', handleResize); // Adicione um event listener para monitorar as mudanças de tamanho da tela

    return () => {
      window.removeEventListener('resize', handleResize); // Limpe o event listener quando o componente for desmontado
    };
  }, []);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const formatPayment = (payment) => {
    return parseFloat(payment).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const getFileNameFromPath = (filePath) => {
    return filePath.split('\\').pop().split('/').pop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('paymentDate', paymentDate);
      formData.append('dayWeek', dayWeek);
      formData.append('payment', payment);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const res = await axios.patch(`/drivers/${driver._id}/daily`, formData, config);

      const updatedDriver = res.data.driver;
      setDriver(updatedDriver);

      const lastDaily = res.data.driver.dailys.pop();
      setDailys((dailys) => [...dailys, lastDaily]);

      setImage(null);
      setImageName("");
      setPaymentDate("");
      setDayWeek("");
      setPayment("");

      toast.success(res.data.msg);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  if (!driver) return <p>Carregando...</p>;

  return (
    <div className={`containerDaily ${isSmallScreen ? 'smallScreen' : ''}`}>
      <div className='daily'>
        <h2>Pagamento de Diárias</h2>
        <p>Cadastrar Diárias</p>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome:</span>
              <input type="text" value={driver.name} readOnly />
            </label>
            <label>
              <span>Número do carro:</span>
              <input type="text" value={driver.numberCar} readOnly />
            </label>
            <label>
              <span>Data do Pagamento:</span>
              <input
                type="text"
                name="paymentDate"
                placeholder="Que data é hoje?"
                onChange={(e) => setPaymentDate(e.target.value)}
                value={paymentDate}
              />
            </label>
            <label>
              <span>Dia da semana:</span>
              <input
                type="text"
                name="dayWeek"
                placeholder="Que dia é hoje?"
                onChange={(e) => setDayWeek(e.target.value)}
                value={dayWeek}
              />
            </label>
            <label>
              <span>Valor da Diária:</span>
              <input
                type="number"
                name="payment"
                placeholder="Qual é o valor de hoje?"
                onChange={(e) => setPayment(e.target.value)}
                value={payment}
              />
            </label>
            <label>
              <span>Comprovante de Pagamento:</span>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              {imageName && <p>{imageName}</p>}
            </label>
            <input type="submit" value="Concluir Pagamento" />
          </form>
        </div>
      </div>
      <div className={`dayPayment ${isSmallScreen ? 'smallScreen' : ''}`}>
        <div className="title_payment">
          <h1>Tabela de Pagamentos</h1>
        </div>
        <table className="tableDay">
          <thead>
            <tr>
              <th colSpan="2">{driver.name}</th>
              <th colSpan="2">Carro {driver.numberCar}</th>
            </tr>
            <tr>
              <th>Data</th>
              <th>Dia da semana</th>
              <th>Comprovante</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {dailys.length === 0 && <tr><td colSpan="4">Não há pagamento de diárias...</td></tr>}
            {dailys.length > 0 && (
              dailys
                .sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate)) // Ordena os pagamentos com base na data
                .map((daily) => (
                  <tr key={daily._id}>
                    <td>{formatDate(daily.paymentDate)}</td>
                    <td>{daily.dayWeek}</td>
                    <td>
                      {daily.image ? (
                        <Link to={`/payment-voucher/${getFileNameFromPath(daily.image)}`} target="_blank" className='img'>
                          Abrir imagem
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>R$ {formatPayment(daily.payment)}</td>
                  </tr>
                ))
            )}
            <tr className='footerAmount'>
              <td colSpan="3" style={{ textAlign: 'center', backgroundColor: '#c9c6c6' }}>Total:</td>
              <td style={{ textAlign: 'center', backgroundColor: '#c9c6c6' }}>R$ {formatPayment(driver.amount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverDaily;
