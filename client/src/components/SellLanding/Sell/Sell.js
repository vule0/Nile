import "./Sell.scss"
import { useState } from "react"
import { Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import { fecthData } from "../../../utils/helperFunctions/helper"
import { productQueryCodes, routes, productCategory } from "../../../utils/enum"

const Sell = ({ user, postingObj = undefined, setAction }) => {
  const [files, setFiles] = useState([])
  const [checkedCategory, setCheckedCategory] = useState(postingObj?.category)
  const [checkedCondition, setCheckedCondition] = useState(postingObj?.condition)
  const [price, setPrice] = useState(postingObj?.price)
  const [productName, setProductName] = useState(postingObj ? postingObj["product name"] : undefined)
  const [description, setDescription] = useState(postingObj?.description)
  const conditions = [
    "New",
    "Like New",
    "Good",
    "Fair",
    "It Is What It Is",
    "Pretty Busted ngl",
  ]

  let objectToSubmit = {
    query: productQueryCodes.insert,
    id: postingObj?.id,
    productName: productName,
    description: description,
    category: checkedCategory,
    price: price,
    condition: checkedCondition,
    name: postingObj?.seller.name,
    username: postingObj?.seller.username,
    rating: postingObj?.seller.rating,
    isVerified: postingObj?.seller.verified,
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
    if (file) setFiles((x) => [...x, file])
  }

  const handleCatagory = (event) => {
    setCheckedCategory(event.target.value)
  }

  const handleProductName = (event) => {
    setProductName(event.target.value)
  }

  const handlePrice = (event) => {
    setPrice(event.target.value)
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleCondition = (event) => {
    setCheckedCondition(event.target.value)
  }

  const handleErase = () => {
    setFiles([])
    setAction(true)
  }

  const handleSubmit = () => {
    const fileObj = {
      imgs: files,
    }

    if (!postingObj) {
      objectToSubmit.name = user.name
      objectToSubmit.username = user.username
      objectToSubmit.rating = user.rating
      objectToSubmit.isVerified = user.verified
    }

    console.log(objectToSubmit)
    fecthData(routes.postProduct, objectToSubmit, console.log(), 1)
    setAction(true)
  }

  return (
    <div className="Sell-main-container">
      <div className="content">
        <Grid
          sx={{ flexGrow: 1, border: "1px solid lightgray", mb: "20px" }}
          container
        >
          {files.map((e, i) => {
            return (
              <Grid item xs={6} key={i}>
                <Button
                  onClick={() => {
                    setFiles(files.filter((el) => el !== e))
                  }}
                  className="file-display"
                >
                  {e.name} <CloseIcon />{" "}
                </Button>
              </Grid>
            )
          })}
        </Grid>
        <Button
          variant="contained"
          component="label"
          onChange={handleFileChange}
        >
          Upload Image
          <input type="file" hidden />
        </Button>

        <Grid>
          <h4>Title & Price</h4>
          <TextField
            required
            id="outlined-required"
            label="Enter Name of Post"
            sx={{ paddingRight: "10px" }}
            defaultValue={postingObj ? postingObj["product name"] : ""}
            onChange={handleProductName}
          />

          <TextField
            type="number"
            required
            id="outlined-required"
            label="Enter Price $$$"
            defaultValue={postingObj ? postingObj.price : ""}
            onChange={handlePrice}
          />
        </Grid>
        <Grid>
          <h4>Description</h4>
          <TextField
            required
            id="outlined-required"
            label="Enter Description"
            multiline
            fullWidth
            rows={8}
            defaultValue={postingObj ? postingObj.description : ""}
            onChange={handleDescription}
          />
        </Grid>

        <FormControl>
          <h4>Choose a Category</h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            {Object.values(productCategory).map((e, i) => {
              return (
                <FormControlLabel
                  key={i}
                  value={e}
                  control={<Radio />}
                  label={e}
                  onChange={handleCatagory}
                  checked={checkedCategory === e}
                />
              )
            })}
          </RadioGroup>

          <h4>What Condition is the Object in?</h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            {conditions.map((e, i) => {
              return <FormControlLabel
              key={i}
              value={e}
              control={<Radio />}
              label={e}
              onChange={handleCondition}
              checked={checkedCondition === e}
            />
            })}
            
          </RadioGroup>
        </FormControl>

        <Grid sx={{ marginTop: "40px", paddingBottom: "20px" }}>
          <Button
            variant="contained"
            component="label"
            onClick={handleSubmit}
            sx={{ marginRight: "20px" }}
          >
            {postingObj ? "Update Post" : "Create Post"}
          </Button>
          <Button
            variant="contained"
            component="label"
            onClick={handleErase}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
      </div>
    </div>
  )
}

export default Sell
