import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import BaseLayout from "./layouts/baseLayout/BaseLayout";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import Login from "./pages/login/Login";
import RequireAuth from "./hoc/RequireAuth";
import Register from "./pages/register/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {userSlice} from "./store/reducers/UserSlice";

const App = () => {
    const {isAuth} = useSelector(state => state.authReducer)
    const {setAuthStatus} = userSlice.actions
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setAuthStatus(true))
            navigate(location.pathname || '/')
        }else {
            navigate('/login')
        }
    }, [])

    return (
        <div className="app">
            <Routes>
                <Route path='/' element={<BaseLayout/>}>
                    <Route index element={
                        <RequireAuth authStatus={isAuth}>
                            <Home/>
                        </RequireAuth>
                    }/>
                    <Route path='/*' element={
                        <RequireAuth authStatus={isAuth}>
                            <Home/>
                        </RequireAuth>
                    }/>
                </Route>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
            <ToastContainer theme="dark"/>
        </div>
    );
};

export default App;
