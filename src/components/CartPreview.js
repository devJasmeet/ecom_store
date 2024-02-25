import React, { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext';

function CartPreview() {
    const {itemsInCart,cartProducts,addOneToCart,deleteFromCart,removeOneFromCart,getTotalCost} = useContext(ProductContext);
    const cartTotal = getTotalCost();
    console.log(cartProducts);
    const buttonStyle = {all:'unset',cursor:'pointer'};
  return (
    <>
        {itemsInCart === 0 ?
        <div>
            <h2 style={{textAlign:'center'}}>Your cart is empty</h2>
        </div> :
        <div>
            <div id='cart-details'>
                {cartProducts?.map(product => (
                    <div className='cartItem'>
                        <div className='quantity-options'>
                            <div style={{color:'gray'}} onClick={()=>deleteFromCart(product.id)} >remove</div>
                            <div className='change-quantity'>
                                <button style={buttonStyle} onClick={()=>removeOneFromCart(product.id)}>-</button> 
                                <p>{product.quantity}</p> 
                                <button onClick={()=>addOneToCart(product.id)} style={buttonStyle}>+</button>
                            </div>
                        </div>
                        <p>{product.title}</p>
                        <p>$ {product.price}</p>
                    </div>
                ))}    
            </div>

            <div id='purchase-summary'>
                <p>Total items: {itemsInCart}</p>
                <p>Your total: <span>$ {cartTotal}</span></p>
            </div>
        </div>
        }
    </>
  )
}

export default CartPreview
