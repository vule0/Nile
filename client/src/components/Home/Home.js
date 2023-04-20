import "./Home.scss"
import TopBar from "../TopBar/TopBar"
import ProductCard from "./ProductCard/ProductCard"
import CategoryCard from "./CategoryCard/CategoryCard"
import { Tooltip } from "@mui/material"
import fashionCategory from "../../assets/imgs/fashionCategory.jpg"
import electronicsCategory from "../../assets/imgs/electronicsCategory.jpg"
import fitnessCategory from "../../assets/imgs/fitnessCategory.jpg"
import homeCategory from "../../assets/imgs/homeCat.jpg"
import jewleryCategory from "../../assets/imgs/jewleryCategory.jpg"
import kitchenCategory from "../../assets/imgs/kitchenCategory.jpg"
import watchesCategory from "../../assets/imgs/watchesCategory.jpg"
import { useEffect, useState } from "react"
import { fecthData } from "../../utils/helperFunctions/helper"
import {
  menus,
  productCategory,
  productQueryCodes,
  routes,
} from "../../utils/enum"

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
  "Jewelry",
  "Fitness",
  "Kitchen",
  "Watches",
  "Electronics",
]

const Home = ({
  user,
  setMenu,
  setCategory,
  menu,
  category,
  setPostId,
  administrator,
}) => {
  const [selector, setSelector] = useState(0)
  const [recommendedData, setRecommendedData] = useState([])

  const getRecommendedData = () => {
    const data = { query: productQueryCodes.getRecommended }
    fecthData(routes.postProduct, data, setRecommendedData, 1)
  }

  const handleCategorySelector = (event) => setSelector(event.currentTarget.id)

  useEffect(() => getRecommendedData(), [])

  return (
    <div className="Home-main-container">
      <TopBar
        user={user}
        menu={menu}
        setMenu={setMenu}
        setCategory={setCategory}
        category={category}
        administrator={administrator}
      />

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
                <div
                  id={`${i}`}
                  onClick={handleCategorySelector}
                  className="selector"
                />
              </Tooltip>
            )
          })}
        </div>
      </div>

      <h1>Just For You</h1>
      <div className="recommended-div">
        <div className="row" style={{ marginBottom: "30px" }}>
          {recommendedData.map((e, i) => {
            return (
              <ProductCard
                user={user}
                key={i}
                imageUrl={
                  e.imageurl
                    ? `${e.imageurl}`
                    : "https://source.unsplash.com/random"
                }
                name={e.seller.name}
                username={e.seller.username}
                price={e.price}
                productName={e["product name"]}
                onClick={() => {
                  setCategory(productCategory.misc)
                  setPostId(e.id)
                  setMenu(menus.detailed)
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
