import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import './App.css';
import Main from './components/Main';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Navbar />
      <Main />
      <footer></footer>
    </AppContextProvider>
  );
}

export default App;
