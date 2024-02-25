import React, { useState,useEffect, useContext } from 'react';
import { RiArrowDropDownLine,RiArrowDropUpLine } from "react-icons/ri";
import Categories from './Categories';
import {Link} from "react-router-dom";
import { ProductContext } from '../contexts/ProductContext';
import SearchResult from './SearchResult';
import CartModal from './CartModal';
import { CiMenuBurger } from "react-icons/ci";


const Menubar = () => {

    const [dropdown,setDropdown] = useState(false);
    const [categories,setCategories] = useState([]);
    const [callAPIFlag,setFlag] = useState(false);
    const [showSearch,setShowSearch] = useState(false);
    const [searchInput,setInput] = useState('');
    const [showCartFlag,setCartFlag] = useState(false);
    const [menuDropdown,setMenuDropdown] = useState(false);
    const categoriesURL = "https://dummyjson.com/products/categories";

    const {setUrl,itemsInCart} = useContext(ProductContext);

    function handleClickOnCart() {
      setCartFlag(true);
    }

    function toggleDrawer () {
      setMenuDropdown(!menuDropdown);
    }

    function closeMenuDrawer() {
      if(menuDropdown) setMenuDropdown(false);
    }
    
    function showCategories() {
        setDropdown(!dropdown);
        if(!dropdown) { setFlag(!callAPIFlag) }
    }

    function handleSearch(value) {
      if(value.length > 2) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
      setInput(value); 
    }

    useEffect(() => {
        const fetchData = async () => { 
          try {
            const response = await fetch(categoriesURL);
            if (!response.ok) {
              throw new Error('API request failed');
            }
    
            const data = await response.json();
            if (data) {
              setCategories(data);
            }
          } catch (error) {
            // Handle errors that occurred during the API call
            console.error('Error during API call:', error.message);
          }
        };
        fetchData();
        console.log(categories);
      }, [callAPIFlag]);

  return (
    <>
      <div id='menubar-container'>

        <div id='menu-bar'>
          <div>
            <Link className='menubarItem' to="/">Home</Link>
          </div>

          <div onClick={() => setUrl("https://dummyjson.com/products?limit=10")}><Link className='menubarItem' to="/products">Show all products</Link></div>

          <div className='categoriesList'>
            <button onClick={showCategories}>
              All Categories {dropdown ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </button>
            <Categories setDropdown={setDropdown} dropdown={dropdown} categories={categories} />
          </div>

          <div>
            <input type='text' placeHolder='Search' className='searchinput' value={searchInput} onChange={(e)=>handleSearch(e.target.value)} />
            <SearchResult input={searchInput} showSearch={showSearch} setShowSearch={setShowSearch} setInput={setInput} />
          </div>

          <div className='menubarItem' onClick={()=>setCartFlag(true)}>
            <span>Cart: {itemsInCart}</span> 
          </div>
        
        </div>

        <div className='compact-menu' onClick={closeMenuDrawer}>
          <div><CiMenuBurger onClick={toggleDrawer} /></div>
          <div onClick={()=>setCartFlag(true)}>Cart: {itemsInCart}</div>
          
          { menuDropdown && <div className='menuDropdown'>
            <div className='dropdownContent'>
              <div className='dropdownItem'>
                <Link style={{all:'unset'}} to="/">Home</Link>
              </div>
              <div className='dropdownItem' onClick={() => setUrl("https://dummyjson.com/products?limit=10")}>
                <Link className='menubarItem' to="/products">Show all products</Link>
              </div>
              <div className='dropdownItem'>
                  <div onClick={showCategories}>
                      All Categories {dropdown ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                  </div>
                  <Categories setDropdown={setDropdown} dropdown={dropdown} categories={categories} />
              </div>
              
            </div>
          </div>}
          
        </div>
        <div className='compact-search'>
          <input type='text' placeHolder='Search' className='searchinput' value={searchInput} onChange={(e)=>handleSearch(e.target.value)} />
          <SearchResult input={searchInput} showSearch={showSearch} setShowSearch={setShowSearch} setInput={setInput} />
        </div>
      </div>
      {showCartFlag && <CartModal showCartFlag={showCartFlag} setCartFlag={setCartFlag} />}
    </>
  )
}

export default Menubar
