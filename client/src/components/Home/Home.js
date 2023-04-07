import "./Home.scss"
import TopBar from "../TopBar/TopBar"
import ProductCard from "./ProductCard/ProductCard"
import CategoryCard from "./CategoryCard/CategoryCard"

// images
import fashionCategory from "../../assets/imgs/fashionCategory.jpg"
import electronicsCategory from "../../assets/imgs/electronicsCategory.jpg"
import fitnessCategory from "../../assets/imgs/fitnessCategory.jpg"
import homeCategory from "../../assets/imgs/homeCategory.jpg"
import jewleryCategory from "../../assets/imgs/jewleryCategory.jpg"
import kitchenCategory from "../../assets/imgs/kitchenCategory.jpg"
import watchesCategory from "../../assets/imgs/watchesCategory.jpg"
const Home = ({ setMenu, setCategory, menu }) => {
  return (
    <div className="Home-main-container">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} />
      <div className="wrapper bottom-div">
        <div className="card left-card">
          <h1>Recommended to You</h1>
          <div className="vertical">
            <span style={{ height: "10px" }} />
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
          <h1 align="left">Explore by Categories</h1>
          <div className="vertical">
            <span style={{ height: "10px" }} />
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Home"} img={homeCategory}/>
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Fashion"} img={fashionCategory}/>
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Jewelry"} img={jewleryCategory}/>
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Electronics"} img={electronicsCategory} />
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Fitness"} img={fitnessCategory}/>
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Watches"} img={watchesCategory}/>
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Kitchen"} img={kitchenCategory}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
