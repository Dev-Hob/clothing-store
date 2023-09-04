import { createContext, useReducer } from "react";
import SHOP from "../../shopData/shopData.json"

const PRODUCT_INTIAL_STATE = {
    products: SHOP,
}

export const ProductContext = createContext(PRODUCT_INTIAL_STATE);

const productReducer = (state, action) => {
    switch(action.type){
        case "GET_ALL_PRODUCTS":
            return {...state, products: SHOP};
        case "FILTER_PRODUCTS": 
            return {...state, products: SHOP.filter( data => data.name === action.payload)}
        case "GET_PRODUCT":
            return {...state, products: SHOP.filter( data => data._id === action.payload)}
        
        default:
            return state;
    }
}


export const ProductContextProvider =  ({children}) => {
    const [state, dispatch] = useReducer(productReducer, PRODUCT_INTIAL_STATE)
    const {products} = state; 
    const value = {products, dispatch}

    return (
        <ProductContext.Provider value = {value}>
            {children}
        </ProductContext.Provider>
    )
}