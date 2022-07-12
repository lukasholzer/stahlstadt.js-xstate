import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { DataFetching } from '../state-charts/data-fetching/DataFetching';
import { SimpleToggle } from '../state-charts/simple-toggle/SimpleToggle';

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/simple-toggle">SimpleToggle</Link>
          </li>
          <li>
            <Link to="/data-fetching">Data Fetching</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <h2>Stahlstadt.js</h2>
      <Link to="/">Back</Link>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simple-toggle" element={<SimpleToggle />} />
          <Route path="/data-fetching" element={<DataFetching />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
