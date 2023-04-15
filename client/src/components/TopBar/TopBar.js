import "./TopBar.scss"
import { Avatar } from "@mui/material"
import { IconButton, Typography} from "@mui/material"
import Tooltip from "@mui/material/Tooltip"
import { menus, productCategory } from "../../utils/enum"
import MailOutlinedIcon from "@mui/icons-material/MailOutlined"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from "@mui/icons-material/Login"
import { getInitials } from "../../utils/helperFunctions/helper"

const TopBar = ({ user, menu, setMenu, setCategory, category, administrator}) => {
  return (
    <div className="wrapper top-div">
      <span style={{ width: "50px" }} />
      <Tooltip title="Home">
        <IconButton
          className={menu === menus.home ? "active" : "inactive"}
          onClick={() => {
            setMenu(menus.home)
            setCategory(productCategory.misc)
          }}
        >
          <Avatar>N</Avatar>
        </IconButton>
      </Tooltip>

      <Tooltip title="User Profile">
        <IconButton
          sx={{ ml: "10px" }}
          className={menu === menus.user ? "active" : "inactive"}
          onClick={() => setMenu(menus.user)}
        >
          <AccountCircleOutlinedIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Messages">
        <IconButton
          sx={{ ml: "10px" }}
          className={menu === menus.messages ? "active" : "inactive"}
          onClick={() => setMenu(menus.messages)}
        >
          <MailOutlinedIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Shop">
        <IconButton
          sx={{ ml: "10px" }}
          className={menu === menus.showcase ? "active" : "inactive"}
          onClick={() => {
            setMenu(menus.showcase)
            setCategory(category)
          }}
        >
          <SellOutlinedIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Sell">
        <IconButton
          sx={{ ml: "10px" }}
          className={menu === menus.sell ? "active" : "inactive"}
          onClick={() => {
            setMenu(menus.sell)
            setCategory(category)
          }}
        >
          <AttachMoneyIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      {administrator &&
      <Tooltip title="Administrator">
          <IconButton 
          sx={{ml:"10px"}}
          className={menu === menus.administrator ? "active" : "inactive"}
          onClick={() =>{
            setMenu(menus.administrator)
          }}
          >
            <AdminPanelSettingsIcon fontSize="large"/>
            </IconButton>
      </Tooltip>
      }
    </div>
  )
}

export default TopBar
