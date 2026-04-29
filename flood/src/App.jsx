
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'
import LandingPage from './pages/LandingPage'
import PageLayout from './components/layouts/PageLayout'
import Dashboard from './pages/Dashboard'
import NewAssessment from './pages/NewAssessment'
import { useEffect } from 'react'
import { syncPendingAssessments } from './db/sync'

function App() {

  useEffect(() => {
    const handleOnline = () => {
      console.log("User is back online");
      syncPendingAssessments();
    };

    if (navigator.onLine) {
      handleOnline(); 
    }

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<PageLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new-assessment" element={<NewAssessment />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
