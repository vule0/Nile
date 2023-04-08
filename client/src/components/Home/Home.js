import "./Home.scss"
import TopBar from "../TopBar/TopBar"
import ProductCard from "./ProductCard/ProductCard"
import CategoryCard from "./CategoryCard/CategoryCard"
import { Tooltip } from "@mui/material"
// images
import fashionCategory from "../../assets/imgs/fashionCategory.jpg"
import electronicsCategory from "../../assets/imgs/electronicsCategory.jpg"
import fitnessCategory from "../../assets/imgs/fitnessCategory.jpg"
import homeCategory from "../../assets/imgs/homeCat.jpg"
import jewleryCategory from "../../assets/imgs/jewleryCategory.jpg"
import kitchenCategory from "../../assets/imgs/kitchenCategory.jpg"
import watchesCategory from "../../assets/imgs/watchesCategory.jpg"
import { useState } from "react"

const imgs = [
  homeCategory,
  fashionCategory,
  jewleryCategory,
  fitnessCategory,
  kitchenCategory,
  watchesCategory,
  electronicsCategory,
]
const categories = [
  "Home",
  "Fashion",
  "Jewlery",
  "Fitness",
  "Kitchen",
  "Watches",
  "Electronics",
]

const Home = ({ setMenu, setCategory, menu }) => {
  const [selector, setSelector] = useState(0)
  const handleClick = (event) => {
    setSelector(event.currentTarget.id)
  }

  return (
    <div className="Home-main-container">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} />
      
      <span style={{ marginTop: "10vh" }} />
      
      <div className="zStack">
        <CategoryCard
          setCategory={setCategory}
          setMenu={setMenu}
          category={categories[selector]}
          img={imgs[selector]}
        />
        <div className="selectors">
          {categories.map((cat, i) => {
            return (
              <Tooltip key={i} title={cat}>
                <div id={`${i}`} onClick={handleClick} className="selector" />
              </Tooltip>
            )
          })}
        </div>
      </div>

      <h1>Just For You</h1>
      <div className="recommended-div">
            <div className="row" style={{marginBottom:'30px'}}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            </div>

            <div className="row" style={{marginBottom:'30px'}}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            </div>

            {/* <div className="row" style={{marginBottom:'30px'}}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            </div> */}

      </div>

    </div>
  )
}

export default Home
