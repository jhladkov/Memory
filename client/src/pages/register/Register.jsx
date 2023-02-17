import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../login/login.scss'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const submitHandle = (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <section className='auth section'>
            <div className="container">
                <div className="auth__wrapper">
                    <h2 className='auth__title'>Register</h2>
                    <form
                        onSubmit={submitHandle}
                        className='auth__form'
                    >
                        <label>Name</label>
                        <input
                            onChange={(name) => setName(name.target.value)}
                            type="text"
                            placeholder='Name...'
                            value={name}
                        />
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
                        <button className='auth__submit' type='submit'>Register</button>
                        <p className='auth__subtitle'>Already have an account? <Link to='/login'>Login</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;