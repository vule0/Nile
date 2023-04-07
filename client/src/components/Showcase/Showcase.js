import './Showcase.scss'
import TopBar from '../TopBar/TopBar'
const Showcase = ({category, setMenu, setCategory, menu}) => {
  return (
    <div className='Showcase-main-container'>
        <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory}/>
        {category} Category
    </div>
  )
}

export default Showcase