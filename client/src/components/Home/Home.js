import "./Home.scss"
import TopBar from "../TopBar/TopBar"
import ProductCard from "./ProductCard/ProductCard"
import CategoryCard from "./CategoryCard/CategoryCard"

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
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Fashion"} />
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Jewelry"} />
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Electronics"} />
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Home"} />
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Fitness"} />
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Watches"} />
            <CategoryCard setCategory={setCategory} setMenu={setMenu} category={"Kitchen"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
