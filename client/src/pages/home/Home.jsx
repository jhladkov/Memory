import React, {useEffect, useState} from 'react';
import {authApi} from "../../services/authService";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const Home = () => {
    const {token} = useSelector(state => state.authReducer)
    const {res, error, isLoading} = authApi.useGetUserDataQuery({token})
    const navigate = useNavigate()
    // const [data, setData] = useState([])

    useEffect(() => {
        console.log('effect is working!')
        if (error?.data?.message?.expiredAt) {
            localStorage.removeItem('token')
            toast(`Message: ${error?.data?.message?.message}`, {type: 'error'})
            return navigate('/login')
        }
    },[error?.data?.message?.expiredAt])

    console.log('data', res)


    return (
        <div>
            Home
        </div>
    );
};

export default Home;