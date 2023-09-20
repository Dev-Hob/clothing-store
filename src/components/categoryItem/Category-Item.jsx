import { useNavigate } from "react-router-dom";
import { BackgroundImage, CategoryBodyDiv, CategoryContainer } from "./Category-Item.styles";

export default function CategoryItem( {category: {id, imageUrl, title, route}} ) {
  const navigate = useNavigate()
  
  const onNavigateHandler = () => {
    navigate(route)
  }
  return (
    <CategoryContainer key={id} onClick={onNavigateHandler}>
       <BackgroundImage imageurl= {imageUrl}/>
       <CategoryBodyDiv >
          <h2>{title}</h2>
          <p>Shop Now</p>
        </CategoryBodyDiv>
      </CategoryContainer>
  )
}
