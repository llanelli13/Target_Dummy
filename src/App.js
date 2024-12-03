import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ShotScreen from './pages/ShotScreen';
import ArmoryPage from './pages/ArmoryPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<ShotScreen />} />
          <Route path="/armory" element={<ArmoryPage />} />
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path='/history' element={<HistoryPage />} />
        </Routes>
      </Layout>
  );
}

export default App;
