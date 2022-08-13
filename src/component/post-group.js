import React from "react";

const Group = ({postsPerPage, totalPosts, change}) => {
    const pageNumbers = [];

    for(let i = 1; i<= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <p onClick={() => change(number) } className="page-link change">
                            {number}
                        </p>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Group;