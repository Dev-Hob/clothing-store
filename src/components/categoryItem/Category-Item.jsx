import "./Category-Item.styles.scss"

export default function CategoryItem( {category: {id, imageUrl, title}} ) {
  return (
    <div className="category-container" key={id}>
       <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}/>
       <div className="category-body-container">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
  )
}
