import React, { useContext } from 'react'
import CartPreview from './CartPreview'
import { ProductContext } from '../contexts/ProductContext'

function CartModal({showCartFlag,setCartFlag}) {

    const {itemsInCart} = useContext(ProductContext);
  return (
    <>
        
        {showCartFlag && <>
            <div id='cart-review'>
                <div>
                    <div style={{textAlign:'end',fontSize:'small',cursor:'pointer'}} onClick={()=>setCartFlag(false)}>close</div>
                    <h2 style={{textAlign:'center',fontWeight:'700'}}>Your cart details</h2>
                </div>
                <CartPreview />
                <div className='cartButtons'>
                    <button onClick={()=>setCartFlag(false)} id='back'>Back to Shopping</button>
                    <button id= { itemsInCart != 0 ? 'checkout' : 'faded'}>Continue to checkout</button>
                </div>
            </div>
        
        <div id='modal-background' onClick={()=>setCartFlag(false)}></div>
        </>}
    </>
  )
}

export default CartModal
