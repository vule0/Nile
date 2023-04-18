import "./Signin.scss"
import {
  Grid,
  TextField,
  Button,
  Alert
  } from "@mui/material"
import nilelogo from "../../assets/imgs/nilelogo.JPG"
import { useState } from "react"
import { menus, routes, userQueryCodes } from '../../utils/enum'
import { fecthData, getInitials } from "../../utils/helperFunctions/helper"

const Signin = ({ user, setUser, setMenu, setCategory, menu, category}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleUsername = (event) =>{
    setUsername(event.target.value)
  }
  const handlePass = (event) =>{
    setPassword(event.target.value)
  }
  const handleSubmit = async (event) =>{
    event.preventDefault()

    const data = {
      query: userQueryCodes.logIn,
      username: username,
      password: password
    }


    fecthData(routes.postUser, data, setUser, 1).then(user => {
      // if validation
      console.log(user.name)
      console.log(getInitials(user.name))
      if (user.status === 100){
        setErrorMessage("Incorrect user credentials.")

      }
      else{
        setMenu(menus.home)
        setUsername('')
        setPassword('')
      }
    })
    
  }

  return (
  <div className="Signin-main-container">
  <div className="content" style={{ padding: 100}}>
  <img src={`${nilelogo}`} width="150px" style={{margin: "50px"}}></img>
    <Grid
      container
      spacing={3}
      direction={'column'}
      justify={'center'}
      alignItems={'center'}
    > <Grid item xs={12}>  
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Grid>
      <Grid item xs={12}>
        <TextField onKeyPress={(e) => {
          if (e.key === "Enter"){
            handleSubmit(e)
          }
        }} 
        label="Username" onChange={handleUsername} required ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField onKeyPress={(e) => {
          if (e.key === "Enter"){
            handleSubmit(e)
          }
        }} 
        
        label="Password" type={'password'} onChange={handlePass} required ></TextField>
      </Grid>

      <Grid item xs={12}>
        <Button fullWidth onClick={handleSubmit} variant="contained"> Login </Button>
      </Grid>

      <Grid item xs={12}>
        <Button onClick={() => {setMenu(menus.signup)}}>Create an Account</Button>
      </Grid>

    </Grid>
</div>
</div>
  )
}



export default Signin
