import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const ProductCard = ({ product }) => {

  const {addOneToCart} = useContext(ProductContext);
  return (
    <div className='card'>
      <img className='cardImage' src={product.thumbnail} alt={product.title} />
      <div className='cardContent'>
        <div>
          <p style={{fontSize:'smaller'}}>{product.brand}</p>
          <p style={{fontWeight:'bold'}}>{product.title}</p>
        </div>
        <div style={{}}>
          <p>Price: ${product.price}</p>
          <button className='addToCartButton' onClick={()=>addOneToCart(product.id,product.title,product.price)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  image: {
    height: '50%',
    borderRadius: '4px',
  },
  content: {
    marginTop: '10px',
    display:'flex',
    flexDirection:'column',
    gap:'0.5rem'
  },
  button: {
    fontSize:'medium',
    color: '#4CAF50',
    padding: '0.5rem',
    border: '0.1rem solid #4CAF50',
    backgroundColor:'transparent',
    cursor: 'pointer',
    alignSelf:'start',
  },
  detail:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  }
};

export default ProductCard;
