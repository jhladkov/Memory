import React, {useState} from 'react';
import './login.scss'
import {Link} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandle = (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <section className='auth section'>
            <div className="container">
                <div className="auth__wrapper">

                    <h2 className='auth__title'>Login</h2>
                    <form
                        onSubmit={submitHandle}
                        className='auth__form'
                    >
                        <label>Email</label>
                        <input
                            onChange={(email) => setEmail(email.target.value)}
                            type="email"
                            placeholder='Email...'
                            value={email}
                        />
                        <label>Password</label>
                        <input
                            onChange={(password) => setPassword(password.target.value)}
                            type="password"
                            placeholder='Password...'
                            value={password}
                        />
                        <button className='auth__submit' type='submit'>Login</button>
                        <p className='auth__subtitle'>Don't have an account? <Link to='/register'>register</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;