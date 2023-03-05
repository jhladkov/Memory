import React, {useState} from 'react';
import './login.scss'
import {Link, useNavigate} from "react-router-dom";
import {authApi} from "../../services/authService";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {userSlice} from "../../store/reducers/UserSlice";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [login] = authApi.useLoginMutation()
    const {setAuthStatus} = userSlice.actions
    const {
        register,
        formState: {errors},
        handleSubmit,

    } = useForm({mode: 'onSubmit'})

    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(password,email)

    const loginHandler = async ({password, email, username}) => {
        setDisabled(true)
        const res = await login({password, email, username})
        console.log(res)
        setDisabled(false)
        if (res?.error?.data?.message) {
            throw res.error?.data?.message
        }else {
            localStorage.setItem('token', res?.data?.token)
        }
    }
    const submitHandle = async (data) => {
        await toast.promise(
            loginHandler(data),
            {
                pending: 'Please wait...',
                success: {
                    render() {
                        console.log('dispath')
                        dispatch(setAuthStatus(true))
                        navigate('/')
                        return 'You have successfully logged in'
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

                    <h2 className='auth__title'>Login</h2>
                    <form
                        onSubmit={handleSubmit(submitHandle)}
                        className='auth__form'
                    >
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
                            placeholder='Email...'
                            value={email}

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
                        />
                        <button
                            className={`auth__submit ${disabled ? 'disabled' : ''}`}
                            disabled={disabled}
                            type='submit'
                        >Login
                        </button>
                        <p className='auth__subtitle'>Don't have an account? <Link to='/register'>register</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;