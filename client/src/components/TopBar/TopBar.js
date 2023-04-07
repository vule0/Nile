import './TopBar.scss'
import { Avatar, stepClasses } from "@mui/material"
import { IconButton } from "@mui/material"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { menus, productCategory } from "../../utils/enum"


const TopBar = ({menu, setMenu, setCategory}) => {
  return (
    <div className="wrapper top-div">
        <span style={{width:'50px'}}/>
        <IconButton className={menu === menus.home ? 'active' : 'inactive'} onClick={() => setMenu(menus.home)}>
          <Avatar>N</Avatar>
        </IconButton>
        <IconButton sx={{ml:'10px'}} className={menu === menus.user ? 'active' : 'inactive'} onClick={() => setMenu(menus.user)}>
          <AccountCircleOutlinedIcon fontSize="large"/>
        </IconButton>
        <IconButton sx={{ml:'10px'}} className={menu === menus.messages ? 'active' : 'inactive'} onClick={() => setMenu(menus.messages)}>
        <MailOutlinedIcon fontSize="large"/>
        </IconButton>
        <IconButton sx={{ml:'10px'}} className={menu === menus.showcase ? 'active' : 'inactive'} onClick={() => {
          setMenu(menus.showcase)
          setCategory(productCategory.misc)
          }}>
          <SellOutlinedIcon fontSize="large"/>
        </IconButton>
      </div>
  )
}

export default TopBar