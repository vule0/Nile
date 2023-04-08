import "./Showcase.scss"
import TopBar from "../TopBar/TopBar"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import ProductCard from "../Home/ProductCard/ProductCard"
const Showcase = ({ category, setMenu, setCategory, menu }) => {
  return (
    <div className="Showcase-main-container">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} />
      <Stack className="showcase-scroll">
        <p>
           {category} Category
        </p>
        <div className="row" style={{ marginBottom: "30px" }}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <div className="row" style={{ marginBottom: "30px" }}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <div className="row" style={{ marginBottom: "30px" }}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Stack>
      
      <Stack spacing={2}>
        <Pagination count={4} defaultPage={1} boundaryCount={2} />
      </Stack>

      <span style={{marginBottom:'10px'}}/>

    </div>
  )
}

export default Showcase
