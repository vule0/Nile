import "./Signup.scss"
import TopBar from "../TopBar/TopBar"
import {useState} from "react"
import {
    Grid,
    TextField,
    Paper,
    Button,
    } from "@mui/material"
import { fecthData } from "../../utils/helperFunctions/helper"
import {productCategory, routes, userQueryCodes} from "../../utils/enum"

const Signup = ({ setMenu, setCategory, menu}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {
            query: userQueryCodes.insert,
            name: name,
            username: username,
            email: email,
            password: password
        }
        fecthData(routes.postUser, data, undefined, 1)
    }
    
    return (
        <div className = "Signup-main-container">
        <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} category={productCategory.misc} />
        <Grid style={{padding:100}}>
          <Grid>
            <Paper elevation={5} style={{padding:'2rem'}}>
              <h1>Create Account</h1>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                        fullWidth
                        label="Name"
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} style={{marginTop:'2rem'}}>
                    <Button variant="contained" color="primary" type="submit">
                      Create Account
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
        </div>
      );

}

export default Signup