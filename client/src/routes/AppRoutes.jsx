import React from 'react'
import {Routes,Route} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import AnalyticsSection from '../components/AnalyticsSection';

const AppRoutes = () => {
  const { isAuthenticated} = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
        
        }/>
      <Route path="/analytics/:id" element={
        <ProtectedRoute>
        <AnalyticsSection/>
        </ProtectedRoute>
        
        }/>
    </Routes>
  )
}

export default AppRoutes