import './User.scss'
import TopBar from '../TopBar/TopBar'
import { productCategory } from '../../utils/enum'

const User = ({setMenu, setCategory, menu}) => {
  return (
    <div className='User-main-container'>
        <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} category={productCategory.misc}/>
        User
    </div>
  )
}

export default User