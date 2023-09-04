import { useContext } from "react";
import { ProductContext } from "../../context/product.context";
import ProductCard from "../../product-card/product-card.component";
import "./shop.style.scss"

function Shop() {
    const value = useContext(ProductContext)
    console.log(value)
    const {products} = value
    return (
        <div className="products">
            {products.map( product => <ProductCard product={product} key={product.id}/> )}
        </div>
    )
}

export default Shop;