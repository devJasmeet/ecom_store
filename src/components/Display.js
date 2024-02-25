import React, { useContext,useEffect, useState } from 'react'
import { ProductContext } from '../contexts/ProductContext';
import ProductCard from './ProductCard';

const Display = () => {

    const {url} = useContext(ProductContext);
    const [products,setProducts] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('API request failed');
            }
    
            const data = await response.json();
            if (data.products) {
              setProducts(data.products);
            }
          } catch (error) {
            // Handle errors that occurred during the API call
            console.error('Error during API call:', error.message);
          }
        };
        fetchData();
      }, [url]);
      
  return (
    <>
      <br></br>
      
      <div className='container'>
        <div className='products-container'>
          {products.map(product => <div>
              <ProductCard key={product.id} product={product} />
          </div>)}
        </div>
      </div>
    </>
  )
}

export default Display
