// Local Imports
import "./Showcase.scss"
import TopBar from "../TopBar/TopBar"
import ProductCard from "../Home/ProductCard/ProductCard"
import { fecthData, filterByPrice, filterByRating } from "../../utils/helperFunctions/helper"
// React imports
import { useState, useEffect } from "react"
// MUI Imports
import { Stack } from "@mui/material"
import { Pagination } from "@mui/material"
import { Alert } from "@mui/material"
import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
// Enum Imports
import {
  routes,
  menus,
  productCategory,
  productQueryCodes,
  userQueryCodes,
} from "../../utils/enum"

const Showcase = ({ user, category, setMenu, setCategory, menu, setPostId }) => {
  const data = {
    query: productQueryCodes.filterByCategory,
    username: "wchen",
    category: category,
  }

  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, stepriceMax] = useState(1000)
  const [rating, setRating] = useState(0)
  const [page, setPage] = useState(0)
  const [paginatedArray, setPaginatedArray] = useState([[]])
  const [fetchedData, setFetchedData] = useState([[]])
  const handleMin = (event) => {
    setPriceMin(event.currentTarget.value)
  }
  const handleMax = (event) => {
    stepriceMax(event.currentTarget.value)
  }
  const handleRating = (event) => {
    setRating(event.currentTarget.value)
  }
  const handleFiltering = () => {
    let x = filterByPrice(fetchedData, priceMin, priceMax)
    let y = filterByRating(x, rating)
    setPaginatedArray(y)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    fecthData(routes.postProduct, data, setPaginatedArray)
    fecthData(routes.postProduct, data, setFetchedData)
  }, [])

  return (
    <div className="Showcase-main-container">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} category={category}/>
      <Stack className="showcase-scroll">
        <div className="header">
          <p>{category} Category</p>
        </div>

        <div className="filters">
          <div>
            <p>Price Filters: </p>
            <TextField
              id="outlined-number"
              label="From: $"
              type="number"
              defaultValue={0}
              onChange={handleMin}
              InputProps={{ inputProps: { min: 0, max: 1000 } }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-number"
              label="To: $"
              type="number"
              variant="outlined"
              defaultValue={1000}
              onChange={handleMax}
              InputProps={{ inputProps: { min: 0, max: 1000 } }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div>
            <p>Rating Filters: </p>
            <TextField
              id="outlined-number"
              fullWidth
              label="⭐️'s and up"
              type="number"
              defaultValue={0}
              onChange={handleRating}
              InputProps={{ inputProps: { min: 0, max: 5 } }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <Button size={"large"} variant="contained" onClick={handleFiltering}>
            <FilterListIcon />
            {"Apply Filters"}
          </Button>
        </div>

        <div className="row" style={{ marginBottom: "30px" }}>
          {paginatedArray.length === 0 ? (
            <Alert className="empty" severity="info">
              No Data Matching the Criteria
            </Alert>
          ) : (
            paginatedArray[page].map((e, i) => {
              return (
                <ProductCard
                  key={i}
                  name={e.seller.name}
                  username={e.seller.username}
                  price={e.price}
                  productName={e['product name']}
                  onClick={() => {setCategory(category); setMenu(menus.detailed); setPostId(e.id)}}
                />
              )
            })
          )}
        </div>
      </Stack>

      <Stack spacing={2}>
        {paginatedArray.length > 1 && (
          <Pagination
            count={paginatedArray.length}
            defaultPage={1}
            boundaryCount={2}
            onChange={handlePageChange}
          />
        )}
      </Stack>

      <span style={{ marginBottom: "10px" }} />
    </div>
  )
}
export default Showcase






