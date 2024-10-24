import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import WelcomeScreen from '@screens/WelcomeScreen'
import routes from '@routes';
import NavContainer from './components/NavContainer';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ToastProvider from './hooks/ToastProvider';
import ProjectsList from './screens/ProjectsScreen/ProjectsList';
import ProjectsEdit from './screens/ProjectsScreen/ProjectsEdit';
import ProjectsAdd from './screens/ProjectsScreen/ProjectsAdd';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { ApiService } from './services/api.service';

export const apiService = new ApiService(sessionStorage.getItem('access_token'), 'http://localhost:3030/api');

const Router: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(sessionStorage.getItem('access_token'))
    if (sessionStorage.getItem('access_token')) {
      // Verifier le token
      apiService.updateAccessToken(sessionStorage.getItem('access_token') as string);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path={routes.DASHBOARD} element={<NavContainer><DashboardScreen /></NavContainer>} />
              <Route path={routes.WELCOME} element={<NavContainer><WelcomeScreen /></NavContainer>} />
              <Route path={routes.PROFILE} element={<NavContainer><ProfileScreen /></NavContainer>} />
              <Route path={routes.PROJECTS.LIST} element={<NavContainer><ProjectsList /></NavContainer>} />
              <Route path={routes.PROJECTS.EDIT} element={<NavContainer><ProjectsEdit /></NavContainer>} />
              <Route path={routes.PROJECTS.ADD} element={<NavContainer><ProjectsAdd /></NavContainer>} />
              <Route path={'*'} element={<Navigate to={routes.DASHBOARD} replace />} />
            </>
          ) : (
            <>
              <Route path={routes.SIGNUP} element={<SignUpScreen />} />
              <Route path={routes.SIGNIN} element={<SignInScreen setIsLogged={setIsLoggedIn} />} />
              <Route path={'*'} element={<Navigate to={routes.SIGNIN} replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default Router