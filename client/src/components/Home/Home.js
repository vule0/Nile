import { useState } from "react"
import { productCategory } from "../../utils/enum"
import "./Home.scss"
import ProductCard from "./Category/Category"
import Divider from "@mui/material/Divider"
import { Avatar } from "@mui/material"
import { IconButton } from "@mui/material"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

const Home = () => {
  const [category, setCategory] = useState(productCategory.misc)

  return (
    <div className="Home-main-container">
      <div className="wrapper top-div">
        <span style={{width:'50px'}}/>
        <IconButton>
          <Avatar>N</Avatar>
        </IconButton>
        <IconButton>
          <AccountCircleOutlinedIcon fontSize="large"/>
        </IconButton>
        <IconButton >
        <MailOutlinedIcon fontSize="large"/>
        </IconButton>
        <IconButton>
          <SellOutlinedIcon fontSize="large"/>
        </IconButton>
      </div>

      <div className="wrapper bottom-div">
        <div className="card left-card">
          <h1>Recommended to You</h1>
          <Divider variant="middle" />
          <div className="vertical">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>

        <div className=" card right-card vertical-scroll">
          <h1 align="left" >Choose the Right Category For You</h1>
        </div>
      </div>
    </div>
  )
}

export default Home
