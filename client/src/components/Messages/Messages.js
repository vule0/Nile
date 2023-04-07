import './Messages.scss'
import TopBar from "../TopBar/TopBar"

const Messages = ({setMenu, setCategory, menu}) => {
  return (
    <div className='Messages-main-container'>
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory}/>
        Message Station
    </div>
  )
}

export default Messages