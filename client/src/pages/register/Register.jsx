import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../login/login.scss'
import {authApi} from "../../services/authService";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [registration, obj] = authApi.useRegistrationMutation()
    const {
        register,
        formState: {errors},
        handleSubmit,

    } = useForm({mode: 'all'})

    const navigate = useNavigate()

    const registrationHandler = async ({password, email, username}) => {
        setDisabled(true)
        const res = await registration({password, email, username})
        setDisabled(false)
        if (res.error?.data?.message) {
            throw res.error?.data?.message
        }

    }

    const submitHandle = async (data) => {
        await toast.promise(
            registrationHandler(data),
            {
                pending: 'Please wait...',
                success: {
                    render() {
                        navigate('/login')
                        return 'You have successfully registered'
                    }
                },
                error: {
                    render({data}) {
                        return `Error: \n ${data}`
                    }
                }
            }
        )
    }

    return (
        <section className='auth section'>
            <div className="container">
                <div className="auth__wrapper">
                    <h2 className='auth__title'>Registration</h2>
                    <form
                        onSubmit={handleSubmit(submitHandle)}
                        className='auth__form'
                    >
                        <label>Username</label>
                        {errors.username && <p className='error-message'>{errors.username?.message}</p>}
                        <input
                            {...register('username', {
                                required: 'Username field is required',
                                maxLength: {
                                    value: 30,
                                    message: 'Username max length is 30 symbols'
                                }
                            })}
                            onChange={(name) => setUsername(name.target.value)}
                            placeholder='Username...'
                            value={username}
                            className={errors.username ? 'error-status' : ''}
                        />
                        <label>Email</label>
                        {errors.email && <p className='error-message'>{errors.email?.message}</p>}
                        <input
                            {...register('email', {
                                required: 'Email field is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Entered value does not match email format"
                                }
                            })}
                            onChange={(email) => setEmail(email.target.value)}
                            type="email"
                            autoComplete='off'
                            placeholder='Email...'
                            value={email}
                            className={errors.email ? 'error-status' : ''}
                        />
                        <label>Password</label>
                        {errors.password && <p className='error-message'>{errors.password?.message}</p>}
                        <input
                            {...register('password', {
                                required: 'Password field is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password length have to be more than 6 symbols'
                                }
                            })}
                            onChange={(password) => setPassword(password.target.value)}
                            type="password"
                            placeholder='Password...'
                            value={password}
                            className={errors.password ? 'error-status' : ''}
                        />
                        <button
                            className={`auth__submit ${disabled ? 'disabled' : ''}`}
                            disabled={disabled}
                            type='submit'
                        >Register
                        </button>
                        <p className='auth__subtitle'>Already have an account? <Link to='/login'>Login</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;