import React from 'react';
import {Route, Routes} from "react-router-dom";
import BaseLayout from "./layouts/baseLayout/BaseLayout";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import Login from "./pages/login/Login";
import RequireAuth from "./hoc/RequireAuth";
import Register from "./pages/register/Register";

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path='/' element={<BaseLayout/>}>
                    <Route index element={
                        <RequireAuth>
                            <Home/>
                        </RequireAuth>
                    }/>
                    <Route path='*' element={<Error/>}/>
                </Route>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
            </Routes>
        </div>
    );
};

export default App;
