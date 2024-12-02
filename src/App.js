// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ShotScreen from './pages/ShotScreen';
import ArmoryPage from './pages/ArmoryPage';

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<ShotScreen />} />
          <Route path="/armory" element={<ArmoryPage />} />
        </Routes>
      </Layout>
  );
}

export default App;
