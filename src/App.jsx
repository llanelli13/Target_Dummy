import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ShotScreen from './pages/ShotScreen';
import ArmoryPage from './pages/ArmoryPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import { SessionProvider } from './context/SessionContext';

function App() {
  return (
    <SessionProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/shot" element={<ShotScreen />} />
          <Route path="/armory" element={<ArmoryPage />} />
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path='/history' element={<HistoryPage />} />
        </Routes>
      </Layout>
    </SessionProvider>
  );
}

export default App;
