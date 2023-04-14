import "./Signin.scss"
import TopBar from "../TopBar/TopBar"
import {
  Grid,
  TextField,
  Paper,
  Button,
  } from "@mui/material"
import { useEffect, useState } from "react"
import { menus, productCategory, productQueryCodes, routes } from '../../utils/enum'

const Signin = ({ setMenu, setCategory, menu, category}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (event) =>{
    console.log(email)
    setEmail(event.target.value)
  }
  const handlePass = (event) =>{
    console.log(password)
    setPassword(event.target.value)
  }
  const handleSubmit = (event) =>{
    console.log(event)
  }



  return (
  <div className="Signin-main-container">
    <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} category={productCategory.misc} />
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
        <TextField label="Username" onChange={handleEmail}></TextField>
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
