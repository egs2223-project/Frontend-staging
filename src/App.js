import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './pages/home';
import Register from './pages/register';
import Appointments from './pages/appointments';
import RegisterDoctor from './pages/register_doctor';
import RegisterPatient from './pages/register_patient';
import Profile from './pages/profile';
import NewAppointment from './pages/new_appointment';

export const Context = React.createContext(null);

function App() {
  const [ctx, set_ctx] = React.useState({user_data: null, user_role: null, status: 'uninitialized'});

  return (
    <BrowserRouter>
      <Context.Provider value={{ctx, set_ctx}}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/doctor" element={<RegisterDoctor/>} />
          <Route path="/register/patient" element={<RegisterPatient />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/new" element={<NewAppointment />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
