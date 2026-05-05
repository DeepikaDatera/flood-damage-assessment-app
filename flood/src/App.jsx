
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'
import PageLayout from './components/layouts/PageLayout'
import NewAssessment from './pages/NewAssessment'
import { useEffect } from 'react'
import { syncPendingAssessments } from './db/sync'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import LandingPageLayout from './components/layouts/LandingPageLayout'
import DashboardPage from './pages/DashboardPage'
import { ToastContainer } from 'react-toastify'
import { getUser } from './server/userService'
import AssessmentList from './pages/AssessmentList'
import AssessmentDetailPage from './pages/AssessmentDetailPage'

function App() {
  const token = sessionStorage.getItem("token");
  const fetchUser = async () => {
    await getUser();
  };
  useEffect(() => {
    if (token) {
      fetchUser();
    }
    const handleOnline = () => {
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
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPageLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route element={<PageLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="new-assessment" element={<NewAssessment />} />
            <Route path="assessment-list" element={<AssessmentList />} />
            <Route path="edit-assessment/:id" element={<NewAssessment />} />
            <Route path="view-assessment/:id" element={<AssessmentDetailPage />} />

          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
