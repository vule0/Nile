import './CategoryCard.scss'
import { Button } from '@mui/material'
import { menus, productCategory } from '../../../utils/enum'
const CategoryCard = ({category, setCategory, setMenu}) => {
  return (
    <div className='CategoryCard-main-div' onClick={() => {
        setCategory(category)
        setMenu(menus.showcase)
    }}>
        <p> The "{category}" Category</p>
    </div>
  )
}

export default CategoryCard