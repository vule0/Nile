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


const Sell = ({ menu, setMenu, setCategory, setAction }) => {
  const [files, setFiles] = useState([])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
    if (file) setFiles((x) => [...x, file])
  }

  const handleErase = () => {
    setFiles([])
    setAction(true)
  }

  const handleSubmit = () => {
    const obj = {
      imgs: files,
    }
    console.log(obj)
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
          />

          <TextField
            type="number"
            required
            id="outlined-required"
            label="Enter Price $$$"
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
          />
        </Grid>

        <FormControl>
          <h4>Choose a Category</h4>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{display:'flex', flexDirection:'row'}}
          >
            <FormControlLabel value="Fashion" control={<Radio />} label="Fashion" />
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            <FormControlLabel value="Fitness" control={<Radio />} label="Fitness" />
            <FormControlLabel value="Kitchen" control={<Radio />} label="Kitchen" />
            <FormControlLabel value="Watches" control={<Radio />} label="Watches" />
            <FormControlLabel value="Jewelry" control={<Radio />} label="Jewelry" />
            <FormControlLabel value="Electronics" control={<Radio />} label="Electronics" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <Grid sx={{ marginTop: "40px", paddingBottom: "20px"}}>
          <Button variant="contained" component="label" onClick={handleSubmit} sx={{marginRight: "20px"}}>
            Create Post
          </Button>
          <Button variant="contained" component="label" onClick={handleErase} color="error">
            Cancel
          </Button>
        </Grid>
      </div>
    </div>
  )
}

export default Sell
