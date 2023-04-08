import "./Showcase.scss"
import TopBar from "../TopBar/TopBar"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import ProductCard from "../Home/ProductCard/ProductCard"
import { useState, useEffect } from "react"

const Showcase = ({ category, setMenu, setCategory, menu }) => {
  useEffect(() => {
    fetchObject()
  }, [])
  const [page, setPage] = useState(0)
  const [paginatedArray, setPaginatedArray] = useState([[]])

  const fetchObject = async () => {
    const update = {
      query: 1,
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    }
    const response = await fetch(
      "http://localhost:3001/product-management",
      options
    )
    const obj = await response.json()
    setPaginatedArray(createPagination(obj, 9))
  }

  const createPagination = (obj, ITEMS_PER_PAGE) => {
    let paginatedArray = []

    obj.forEach((e, i) => {
      if (i % ITEMS_PER_PAGE == 0) paginatedArray[i / ITEMS_PER_PAGE] = []
      paginatedArray[Math.floor(i / ITEMS_PER_PAGE)].push(e)
    })

    return paginatedArray
  }

  return (
    <div className="Showcase-main-container">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} />
      <Stack className="showcase-scroll">
        <p>{category} Category</p>
        <div className="row" style={{ marginBottom: "30px" }}>
          {paginatedArray[page].map((e, i) => {
            return (
              <ProductCard
                key={i}
                name={e.seller.name}
                username={e.seller.username}
                price={e.price}
              />
            )
          })}
        </div>
      </Stack>

      <Stack spacing={2}>
        <Pagination
          count={paginatedArray.length}
          defaultPage={1}
          boundaryCount={2}
          getItemAriaLabel={(item, pageNumber, active) => {
            if (active) {
              setPage(pageNumber - 1)
              window.scrollTo(0, 0)
            }
          }}
        />
      </Stack>

      <span style={{ marginBottom: "10px" }} />
    </div>
  )
}

export default Showcase
