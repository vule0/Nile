import './User.scss'
import TopBar from '../TopBar/TopBar'

const User = ({setMenu, setCategory, menu}) => {
  return (
    <div className='User-main-container'>
        <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory}/>
        User
    </div>
  )
}

export default User