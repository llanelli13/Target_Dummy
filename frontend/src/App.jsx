import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ShotScreen from './pages/ShotScreen';
import ArmoryPage from './pages/ArmoryPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import { SessionProvider } from './context/SessionContext';
import PrivateRoute from './components/PrivateRoute';
import { ModeProvider } from './context/ModeContext';

function App() {
  return (
    <ModeProvider>
      <SessionProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/shot"
              element={
                <PrivateRoute>
                  <ShotScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/armory"
              element={
                <PrivateRoute>
                  <ArmoryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <HistoryPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </SessionProvider>
    </ModeProvider>
  );
}

export default App;
