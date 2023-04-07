import "./CategoryCard.scss"
import { Button } from "@mui/material"
import { menus, productCategory } from "../../../utils/enum"
const CategoryCard = ({ category, setCategory, setMenu }) => {
  return (
    <Button
    sx={{
        color:'inherit',
        alignItems: 'flex-end',
        mt:'10px',
        mb:'10px'
    }}
      className="CategoryCard-main-div"
      onClick={() => {
        setCategory(category)
        setMenu(menus.showcase)
      }}
    >
      <p> The "{category}" Category</p>
    </Button>
  )
}

export default CategoryCard
