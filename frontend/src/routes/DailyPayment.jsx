import React, { useState, useEffect } from 'react';
import axios from '../axios/config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DailyPayment.css';
import { format } from 'date-fns'; // Importe a função format de date-fns
import ptBR from 'date-fns/locale/pt-BR'; // Importe a localização para português do Brasil

const DailyPayment = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDates, setCalendarDates] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get('/drivers');
        setDrivers(res.data);
      } catch (error) {
        console.error('Erro ao obter os motoristas:', error);
      }
    };
    fetchDrivers();
  }, []);

  const fetchCalendarDates = async (driverId) => {
    try {
      const res = await axios.get(`/drivers/${driverId}/dailys`);
      const dates = res.data.map(daily => new Date(daily.paymentDate));
      setCalendarDates(dates);
    } catch (error) {
      console.error('Erro ao obter as datas do calendário:', error);
    }
  };

  const handleDriverChange = (e) => {
    const driverId = e.target.value;
    const driver = drivers.find(driver => driver._id === driverId);
    setSelectedDriver(driver);
    if (driver) {
      fetchCalendarDates(driver._id);
    }
  };

  const highlightDates = (date) => {
    console.log("Selected Driver:", selectedDriver);
    console.log("Selected Driver Dailys:", selectedDriver ? selectedDriver.dailys : null);

    const formattedDate = date.toDateString(); // Formato: dd/MM/yyyy

    if (selectedDriver && selectedDriver.dailys) {
      const dailyWithPaymentDate = selectedDriver.dailys.find(daily => {
        const dailyDate = new Date(daily.paymentDate);
        console.log("Daily Payment Date:", dailyDate.toDateString());
        return dailyDate.toDateString() === formattedDate;
      });

      return dailyWithPaymentDate ? 'react-datepicker__day--highlighted-green' : 'react-datepicker__day--highlighted-red';
    }

    return null;
  };

  return (
    <div className="daily-payment-container">
      <h1 className="page-title">Pagamento de Diárias</h1>
      <div className="driver-selector">
        <label htmlFor="driver-select">Selecione o motorista:</label>
        <select id="driver-select" onChange={handleDriverChange} value={selectedDriver ? selectedDriver._id : ''}>
          <option value="">Selecione um motorista</option>
          {drivers.map(driver => (
            <option key={driver._id} value={driver._id}>{driver.name} - Carro {driver.numberCar}</option>
          ))}
        </select>
      </div>
      {selectedDriver && (
        <div className="calendar-container">
          <h2>Calendário de Pagamentos</h2>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            locale={ptBR} // Defina o locale como pt-BR
            dateFormat="dd/MM/yyyy" // Formato brasileiro
            calendarClassName="calendar"
            inline
            highlightDates={highlightDates}
            style={{ width: '100%' }}
            dayClassName={(date) => highlightDates(date)}
          />
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color legend-green"></div>
              <div className="legend-label">Pagamento Registrado</div>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-red"></div>
              <div className="legend-label">Sem Pagamento</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyPayment;
