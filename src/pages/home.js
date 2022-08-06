import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Edit from '../component/modal-edit'
import Delete from '../component/modal-delete'
import Add from '../component/modal-add'

export default function Home() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [items, setItems] = useState([])

    const getItem= () => {
        const config = {headers: {Authorization: `Bearer ${token}`}}
        let url = 'https://test-binar.herokuapp.com/v1/products';
        axios.get(url, config)
            .then(res => {
                setItems(res.data.result)
              })
            .catch(err => console.log(err))
    }

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const check = () =>{
        if(!token){
            navigate('/login')
        }
    }

    useEffect(() => {
        document.title = 'Home'
        check()
        getItem()
    }, []);
    return(
        <>
            <div className="navbar d-flex justify-content-between">
                <div className="container">
                    <div className="d-flex">
                        <h2 className="fw-bold me-2">Product List</h2>
                        <Add />
                    </div>
                    <button onClick={logout} className='modal-btn-plain'>
                        Logout
                    </button>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    {items.map((item) => {
                        return(
                            <div key={item.id} class="col">
                                <div className="card">
                                    <img src={item.imageurl} className="card-img-top" alt="..." />
                                    <div>
                                        <p style={{marginBottom:"0px"}} >{item.name}</p>
                                        <p >{item.price}$</p>
                                        <div className='icon-group d-flex'>
                                            <div className='me-1'><Edit data={item.id}  /></div>
                                            <div className='ms-1'><Delete data={item} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </>
        
    )
}