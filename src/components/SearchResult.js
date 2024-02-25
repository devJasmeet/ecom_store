import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';

function SearchResult({input,showSearch,setShowSearch,setInput}) {
  
  const searchUrl = (input.length > 2) ? ('https://dummyjson.com/products/search?q=' + input) : null;
  const [result,setResult] = useState([]);
  const {setProduct} = useContext(ProductContext);

  function openItem(id) {
    setProduct(id);
    setShowSearch(false);
    setInput('');
  }

  useEffect(() => {

    const fetchData = async () => { 
      try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        if (data) {
          setResult(data.products);
        }
      } catch (error) {
        // Handle errors that occurred during the API call
        console.error('Error during API call:', error.message);
      }
    };
    fetchData();
  }, [searchUrl]);

  return (
    <>
      { showSearch && 
        <div className='searchresult-container'>
          {  
            result.map(product => <div key={product.id} onClick={()=>openItem(product.id)} >
              <Link to="/SingleItem" id='search-result' className='searchitem'>
                <img id='searchitem-image' src={product.thumbnail} />
                <div id='searchitem-details'>
                  <p style={{fontWeight : '500'}}>{product.title}</p>
                  <p style={{fontWeight : '300'}}>{product.brand}</p>
                  <p style={{fontWeight : '300'}}>${product.price}</p>
                </div>          
              </Link>
            </div>
            
          )}
        </div>
      }
    </>
  )
}

export default SearchResult

