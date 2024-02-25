import React, { useContext, useState , useEffect } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Menubar from '../components/Menubar';
import { GrLinkNext,GrLinkPrevious } from "react-icons/gr";


function SingleItem() {

  const {baseUrl,productToShow} = useContext(ProductContext);
  const productUrl = baseUrl + productToShow;
  const [item,setItem] = useState({});
  const [curImage,setImage] = useState(0);

  function next() {
    if(curImage < item.images.length-1) {
      setImage(curImage+1);
    }
    
  }

  function prev() {
    if(curImage > 0) {
      setImage(curImage-1);
    }
  }

  useEffect(() => {

    const fetchData = async () => { 
      try {
        const response = await fetch(productUrl);
        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        if (data) {
          setItem(data);
        }
      } catch (error) {
        // Handle errors that occurred during the API call
        console.error('Error during API call:', error.message);
      }
    };
    fetchData();
    setImage(0);
  }, [productUrl]);
  
  return (
    <div>
      <div className='sticky'><Menubar /></div>
      <div className="product-container">
        <div className="product-images">
          { item && item.images?.map((image,index) => ( <div key={index} >
            <img src={image} className={(curImage === index) ? 'product-image' : 'hide-image product-image'} />
          </div>))}
          <div onClick={prev} id='slideprev' className='image-slider'><GrLinkPrevious /></div>
          <div onClick={next} id='slidenext' className='image-slider'><GrLinkNext /></div>
        </div>
        <div className="product-details">
          <p>Category : {item.category}</p>
          <div>
            <h1 style={{margin:'0'}}>{item.title}</h1>
            <p style={{fontWeight:'500'}}>{item.brand}</p>
          </div>
          <p className="description">Product Desciption: {item.description}</p>
          <p>Customer rating: {item.rating}</p>
          <h3>$ {item.price}</h3>
          <button style={{alignSelf:'end'}} className="addToCartButton">Add to Cart</button>
        </div>
      </div>
      
    </div>
  )
}

export default SingleItem
