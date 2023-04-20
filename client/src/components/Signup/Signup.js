import "./Signup.scss"
import { useState } from "react"
import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  Alert,
  IconButton,
} from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { fecthData } from "../../utils/helperFunctions/helper"
import { routes, userQueryCodes, menus } from "../../utils/enum"

const Signup = ({ setMenu, setUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("")
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      query: userQueryCodes.insert,
      name: name,
      username: username,
      email: email,
      password: password,
    }
    fecthData(routes.postUser, data, setUser, 1).then((user) => {
      if (user.status === 200) {
        setSeverity("success")
        setMessage(
          "Congratulations!! Your account successfully created. You can view postings, and get familiar with the site, but cannot yet sell items until your account has been verified by a member of the verification team."
        )
      } else {
        setSeverity("error")
        setMessage("Account already exists. Please try again")
      }
    })
  }

  const handleOkay = () => {
    setMenu(menus.signin)
  }

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="Signup-main-container">
      <Grid style={{ padding: 100 }}>
        <Grid>
          <Paper elevation={5} style={{ padding: "2rem" }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid
                  container
                  direction={"row"}
                  style={{ marginTop: "2rem" }}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={3}>
                    <IconButton onClick={() => setMenu(menus.signin)}>
                      <ArrowBackIosIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3">Create an Account</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {message && (
                    <Alert
                      severity={`${severity}`}
                      action={
                        <Button variant="contained" color={severity} size="small" onClick={handleOkay}>
                          Okay
                        </Button>
                      }
                    >
                      {message}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleEnterKey}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleEnterKey}
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
                    onKeyDown={handleEnterKey}
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
                    onKeyDown={handleEnterKey}
                    required
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "2rem" }}>
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
  )
}

export default Signup
