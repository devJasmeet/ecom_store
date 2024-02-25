import React, { useContext } from 'react'
import {Link} from "react-router-dom";
import { ProductContext } from '../contexts/ProductContext';

function Categories({dropdown,setDropdown,categories}) {

    const {setCategory,setUrl,baseUrl,url} = useContext(ProductContext)

    function handleClick(category) {
        setDropdown(!dropdown);
        setCategory(category);
        setUrl(baseUrl+'category/'+category);
    }

    return (
        <>
        {dropdown && 
        <div className='dropdown-container'>
            {categories.map(category => <div className='dropdown-content' onClick={() => handleClick(category)}>
                <Link className='dropdown-link' to="/products">{category}</Link>
            </div>)}
        </div>}
        </>
    )
}

export default Categories
