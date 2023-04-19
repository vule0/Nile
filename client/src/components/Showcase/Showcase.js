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
  productQueryCodes,
} from "../../utils/enum"

const Showcase = ({ user, category, setMenu, setCategory, menu, setPostId, administrator }) => {
  const data = {
    query: productQueryCodes.filterByCategory,
    username: "wchen",
    category: category,
  }

  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, stePriceMax] = useState(2000)
  const [rating, setRating] = useState(0)
  const [page, setPage] = useState(0)
  const [paginatedArray, setPaginatedArray] = useState([[]])
  const [fetchedData, setFetchedData] = useState([[]])
  
  const handleMin = (event) => {
    let val = event.currentTarget.value
    if (val < 0 || val > priceMax) {
      // error
      alert(`Price needs to be between $0 and $${priceMax}`)
      setPriceMin(0)
      return
    }
    setPriceMin(val)
  }
  const handleMax = (event) => {
    let val = event.currentTarget.value
    if (val < 0 || val > 2000) {
      // error
      stePriceMax(2000)
      alert('Price needs to be less than $2,000')
      return 
    }
    stePriceMax(val)
  }
  const handleRating = (event) => {
    let val = event.currentTarget.value
    
    if (val < 0 || val > 5) {
      // error
      console.log(val)
      alert('Rating needs to be between 0 and 5.')
      setRating(0)
      return
    }
    setRating(val)
  }
  const handleFiltering = () => {
    setPage(0)
    let x = filterByPrice(fetchedData, priceMin, priceMax)
    let y = filterByRating(x, rating)
    setPaginatedArray(y)
  }

  const handlePageChange = (event, value) => {
    setPage(value - 1) // we subtract 1 cause array is zero based
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    fecthData(routes.postProduct, data, setPaginatedArray)
    fecthData(routes.postProduct, data, setFetchedData)
  }, [])

  return (
    <div className="Showcase-main-container">
      <TopBar user={user} menu={menu} setMenu={setMenu} setCategory={setCategory} category={category} administrator={administrator}/>
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
              value={priceMin}
              onChange={handleMin}
              InputLabelProps={{shrink: true}}
            />
            <TextField
              id="outlined-number"
              label="To: $"
              type="number"
              variant="outlined"
              value={priceMax}
              onChange={handleMax}
              InputLabelProps={{shrink: true}}
            />
          </div>

          <div>
            <p>Rating Filters: </p>
            <TextField
              id="outlined-number"
              fullWidth
              label="⭐️'s and up"
              type="number"
              value={rating}
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
                  imageUrl={e.imageurl ? `${e.imageurl}` : "https://source.unsplash.com/random"}
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






