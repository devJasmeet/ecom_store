import React,{useState, createContext} from "react";

export const ProductContext = createContext();

export function ProductProvider({children}) {
    const baseUrl = 'https://dummyjson.com/products/';
    const [category,setCategory] = useState("");
    const [url,setUrl] = useState("");
    const [productToShow,setProduct] = useState(null);
    const [cartProducts,setCartProducts] = useState([]);

    const itemsInCart = cartProducts.reduce((total, item) => total + item.quantity, 0);

    function getProductQuantity(id) {
        //console.log("called");
        const quantity =  cartProducts.find((product) => product.id == id)?.quantity;
        if( quantity != undefined) {
            return (quantity);
        } else {
            return 0;
        } 
    }

    function addOneToCart(id,title,price) {
        const quantity =  getProductQuantity(id);
        if(quantity === 0) { // item is not in the cart  
            setCartProducts([
                    ...cartProducts,
                    { 
                        id:id , 
                        price:price,
                        title:title,
                        quantity:1
                    }
            ]);
        } else { //item already exists in cart
            setCartProducts(
                cartProducts.map(
                    product => product.id === id
                    ? { ...product, quantity:quantity+1 }
                    : product
                )
            )
        }
        console.log(cartProducts);
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);
        if(quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    cartItem => cartItem.id === id
                    ? { ...cartItem , quantity: cartItem.quantity-1}
                    : cartItem
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts.filter(cartItem => cartItem.id != id)
        );
    }

    function getTotalCost() {
        let totalcost = 0;
        cartProducts.map(cartItem => {
            totalcost += (cartItem.price * cartItem.quantity);
        });
        return totalcost;
    }

    const contextValue = {
        baseUrl,
        category,
        setCategory,
        url,
        setUrl,
        productToShow,
        setProduct,
        itemsInCart,
        addOneToCart,
        cartProducts,
        deleteFromCart,
        removeOneFromCart,
        getTotalCost
    };
    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    )
}

