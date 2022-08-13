import React, {useState, useEffect} from "react";
import axios from "axios";
import Posts from "../component/post";
import Group from "../component/post-group";

export default function Paging(){
    const token = localStorage.getItem('token')
    const [posts, setPosts] = useState([])
    const [loading, setLoading]= useState(false)
    const [currentPage, setCurrentPage ] = useState(1)
    const [postsPerPage, setPostsPerPage ] = useState(10)

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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const change = (pageNumber)=> {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        getItem()
        console.log(posts)
    }, [])

    return(
        <div className="container">
            <h1 className="test-primary mb-3 row">my Posts</h1>
            <Posts posts={currentPosts} loading={loading} />
            <Group 
                postsPerPage={postsPerPage} 
                totalPosts={posts.length} 
                change={change}
            />
        </div>
    )
}

