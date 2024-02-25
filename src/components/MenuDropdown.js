import React, { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import {Link} from "react-router-dom";

function MenuDropdown({menuDropdown,setMenuDropdown}) {

    const {setUrl,itemsInCart} = useContext(ProductContext)
  return (
    <>
        {
            menuDropdown && <div className='menuDropdown'>
                <p>close</p>
                <div className='dropdownContent'>
                    <div className='dropdownItem' onClick={() => setUrl("https://dummyjson.com/products?limit=10")}>
                        <Link className='menubarItem' to="/products">Show all products</Link>
                    </div>
                    
                </div>
            </div>
        }
    </>
  )
}

export default MenuDropdown
