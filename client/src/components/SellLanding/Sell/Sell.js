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
import { Alert } from "@mui/material"
import { fecthData } from "../../../utils/helperFunctions/helper"
import { productQueryCodes, routes, productCategory, imageQueryCodes } from "../../../utils/enum"

import axios from "axios"


const Sell = ({ user, postingObj = undefined, setAction }) => {
  const [files, setFiles] = useState([])
  const [checkedCategory, setCheckedCategory] = useState(postingObj?.category)
  const [checkedCondition, setCheckedCondition] = useState(postingObj?.condition)
  const [price, setPrice] = useState(postingObj?.price)
  const [productName, setProductName] = useState(postingObj ? postingObj["product name"] : undefined)
  const [description, setDescription] = useState(postingObj?.description)
  const [imageUrl, setImageUrl] = useState(undefined)
  const [error, setError] = useState(undefined)
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
    price: parseFloat(price),
    condition: checkedCondition,
    name: postingObj?.seller.name,
    username: postingObj?.seller.username,
    rating: postingObj?.seller.rating,
    isVerified: postingObj?.seller.verified,
    imageurl: postingObj?.imageUrl
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) setFiles((x) => [...x, file])
  }

  const handleCatagory = (event) => {
    setCheckedCategory(event.target.value)
  }

  const handleProductName = (event) => {
    setProductName(event.target.value)
  }

  const handlePrice = (event) => {
    const val = event.target.value
    if (val < 0) {
      alert('Please, make sure price is over $0.00')
      setPrice(0)
      return
    }
    setPrice(val)
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

  const fileUploadHandler = async () => {
    const formData = new FormData();
    console.log(files[0]);
  
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
  
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const base64String = btoa(reader.result);
        formData.append("image", base64String);
  
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=3e8faf68ce1f8e09f24bc31d36a5e27e`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            // console.log("API response ↓");
            // console.log(response);
            const imageUrl = response.data.data.display_url
            resolve(imageUrl);
          })
          .catch((error) => {
            console.log("API error ↓");
            console.log(error);
            reject(error);
          });
      };
    });
  };

  const handleSubmit = async () => {
    const imageUrl = await fileUploadHandler()
    console.log(imageUrl)
    objectToSubmit.imageurl = imageUrl
    console.log(objectToSubmit)
    if (!postingObj) {
      objectToSubmit.name = user?.name
      objectToSubmit.username = user?.username
      objectToSubmit.rating = user?.rating
      objectToSubmit.isVerified = user?.verified
    }

    // console.log(objectToSubmit)
    fecthData(routes.postProduct, objectToSubmit, console.log(), 1)
    setAction(true)
  }

  return (
    <div className="Sell-main-container">
      <div className="content">
        <Grid
          sx={{ flexGrow: 1, border: "1px solid lightgray", mb: "20px"}}
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
        {error && <Alert className="errormsg" severity="error">{error}</Alert>}
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
            value={price}
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
            // onClick={handleSubmit}
            onClick={() => {
              if (files.length == 0){
                setError("Please upload an image")
              }
              else{
                console.log(files.length)
                handleSubmit()
              }
            }}
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
