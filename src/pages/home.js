import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Add from "../component/modal-add"
import Posts from "../component/post";
import Group from "../component/post-group";

export default function Home() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [posts, setPosts] = useState([])
    const [loading, setLoading]= useState(false)
    const [currentPage, setCurrentPage ] = useState(1)
    const [postsPerPage] = useState(10)

    const getItem =  async () => {
        setLoading(true)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        let url = 'https://test-binar.herokuapp.com/v1/products';
        await axios.get(url, config)
            .then(res => {
                setPosts(res.data.result)
                setLoading(false)
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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const change = (pageNumber)=> {
        setCurrentPage(pageNumber)
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
            
            <div className="container">
                <Posts posts={currentPosts} loading={loading} />
                <Group 
                    postsPerPage={postsPerPage} 
                    totalPosts={posts.length} 
                    change={change}
                />
            </div>
        </>
        
    )
}