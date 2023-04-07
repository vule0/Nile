import { useState } from "react"
import { productCategory } from "../../utils/enum"
import "./Home.scss"
import Category from "./Category/Category"
import Divider from '@mui/material/Divider';
const Home = () => {
  const [category, setCategory] = useState(productCategory.misc)

  return (
    <div className="Home-main-container">
      <div className="wrapper top-div"></div>

      <div className="wrapper bottom-div">
        <div className="card left-card">
          <h1>Recommended to You</h1>
          <Divider variant="middle"/>
          <div className="vertical">
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
          </div>
        </div>

        <div className=" card right-card vertical-scroll">
          <h1>Choose the Right Category For You</h1>
        </div>
      </div>
    </div>
  )
}

export default Home
