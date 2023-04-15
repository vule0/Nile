import "./Signin.scss"
import TopBar from "../TopBar/TopBar"
import {
  Grid,
  TextField,
  Paper,
  Button,
  } from "@mui/material"
import { useState } from "react"
import { menus, productCategory, routes, userQueryCodes } from '../../utils/enum'
import { fecthData } from "../../utils/helperFunctions/helper"

const Signin = ({ user, setUser, setMenu, setCategory, menu, category}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      console.log(user)
      
      // if validation
      setMenu(menus.home)
    })
    
  }



  return (
  <div className="Signin-main-container">
    
  <div className="content" style={{ padding: 100 }}>
  <Paper>
    <Grid
      container
      spacing={3}
      direction={'column'}
      justify={'center'}
      alignItems={'center'}
    >
      <Grid item xs={12}>
        <TextField label="Username" onChange={handleUsername}></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField label="Password" type={'password'} onChange={handlePass}></TextField>
      </Grid>
    
      <Grid item xs={5}>
        <Button onClick={() => {setMenu(menus.signup); console.log("clicked signup")}}>Create an Account</Button>
      </Grid>

      <Grid item xs={12}>
        <Button fullWidth onClick={handleSubmit}> Login </Button>
      </Grid>

    </Grid>
  </Paper>
</div>
</div>
  )
}



export default Signin
