import CategoryItem from "../categoryItem/Category-Item"
import "./CategoryList.style.scss"

export default function CategoryList({categories}) {
  return (
    <div className="categories-container">
    {categories.map( (category) => (
      <CategoryItem key={category.id} category={category} />
    ))}
    </div>
  )
}
