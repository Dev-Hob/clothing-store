import { createContext,  useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";

const CATEGORIES_MAP_INTIAL_STATE = {}

export const CategoriesMapContext = createContext(CATEGORIES_MAP_INTIAL_STATE);


export const CategoriesMapContextProvider =  ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState(CATEGORIES_MAP_INTIAL_STATE)
   
    useEffect(() => {
        (async() => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap)
            setCategoriesMap(categoriesMap)
        })()
   }, [])
    const value = {categoriesMap, setCategoriesMap}

    return (
        <CategoriesMapContext.Provider value = {value}>
            {children}
        </CategoriesMapContext.Provider>
    )
}