import { createContext, useState } from "react";

const INITIAL_CART_VALUE = {products: [], cartToggle: false, setProducts: () => {}, setCartToggle: () => {}}

export const CartContext = createContext(INITIAL_CART_VALUE);

export const CartContextProvider = ({children}) => {

    const [products, setProducts] = useState([])
    const [cartToggle, setCartToggle] = useState(false)
    const count = products.length;      
    const value = {products, setProducts, cartToggle, setCartToggle, count}

    return (
        <CartContext.Provider value={value}>
         {children}
        </CartContext.Provider>
    )
}