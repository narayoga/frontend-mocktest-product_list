import React from "react";
import Edit from "./modal-edit";
import Delete from "./modal-delete";

const Posts = ({posts, loading}) => {
    if(loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div className="row">
            {posts.map((item) => {
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
    )
}

export default Posts;