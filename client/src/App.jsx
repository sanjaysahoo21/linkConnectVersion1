import React from 'react'
import './App.css'
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import SignupPage from './Pages/SignupPage/SignupPage.jsx';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AdminHome from "./Pages/Admin/AdminHome.jsx";
import FacultyHome from "./Pages/Faculty/FacultyHome.jsx";
import StudentHome from "./Pages/Student/StudentHome.jsx";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';


function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AdminHome />}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/signup' element={<SignupPage />}/>
                <Route
                    path='/admin/home'
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminHome />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/faculty/home'
                    element={
                        <ProtectedRoute allowedRoles={['faculty']}>
                            <FacultyHome />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/student/home'
                    element={
                        <ProtectedRoute allowedRoles={['student']}>
                            <StudentHome />
                        </ProtectedRoute>
                    }
                 />
                <Route path='*' element={<Navigate to='/' replace={true}/>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
