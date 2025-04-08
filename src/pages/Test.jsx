import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'; // Importar el idioma español

// Registrar el idioma español para pasar el calendario
registerLocale('es', es);

export function Test() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    console.log('Buscar con la fecha:', selectedDate);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            className="form-control"
            inline // Hacer que el calendario esté siempre visible
            locale="es" // Establecer el idioma español
          />
        </div>
      </div>
      <button className="btn btn-success mt-2" onClick={handleSearch}>Buscar</button>
    </div>
  );
}