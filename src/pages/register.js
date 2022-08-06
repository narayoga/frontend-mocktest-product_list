import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        let url = 'https://test-binar.herokuapp.com/auth/signup'
        let body = {
            name,
            email,
            password
        }
        axios.post(url, body)
        .then(res => {
            navigate('/login')
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        document.title = 'sign up'
    },[]);

    return(
        <>
           <div className="y-center">
                <h2 className="mb-4">Register</h2>
                <div className="frame mb-3">
                    <form onSubmit={handleSubmit}> 
                        <div className="mb-2">
                            <input type="text" className="form-input" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <input type="email" className="form-input" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-input" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="form-btn-submit">Register</button>
                    </form>
                </div>
                <p>Don't have an account? <Link to='/login'>Login</Link></p>
           </div>
        </>
    )
}