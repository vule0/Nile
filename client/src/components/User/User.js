import './User.scss'
import TopBar from '../TopBar/TopBar'
import { productCategory } from '../../utils/enum'

const User = ({user, setMenu, setCategory, menu, administrator}) => {
  return (
    <div className='User-main-container'>
        <TopBar user={user} menu={menu} setMenu={setMenu} setCategory={setCategory} category={productCategory.misc} administrator={administrator}/>
        User
    </div>
  )
}

export default User