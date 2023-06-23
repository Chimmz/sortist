import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import './App.css';
import Main from './components/Main';

function App() {
  const [algo, setAlgo] = useState<string>();
  return (
    <>
      <Navbar />
      <Main />
      <footer></footer>
    </>
  );
}

export default App;
