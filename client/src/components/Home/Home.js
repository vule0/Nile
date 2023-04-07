import { useState } from "react"
import "./Home.scss"
import ProductCard from "./ProductCard/ProductCard"
import TopBar from "../TopBar/TopBar"
const Home = ({setMenu, setCategory, menu}) => {
  return (
    <div className="Home-main-container">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory}/>
      <div className="wrapper bottom-div">
        <div className="card left-card">
          <h1>Recommended to You</h1>
          <div className="vertical">
          <span style={{height:'10px'}}/>
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
