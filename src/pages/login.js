import { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = 'https://test-binar.herokuapp.com/auth/login';
        const body = {
            email,
            password
        }
        axios.post(url, body)
            .then(res => {
                localStorage.setItem('token', res.data.result.access_token)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        document.title = 'Login'
    }, []);

    return(
        <>
           <div className="y-center">
                <h2 className="mb-4">Login</h2>
                <div className="frame mb-3">
                    <form onSubmit={(e) => handleSubmit(e)} > 
                        <div className="mb-2">
                            <input type="email" className="form-input" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-input" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="form-btn-submit">Login</button>
                    </form>
                </div>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
           </div>
        </>
    )
}