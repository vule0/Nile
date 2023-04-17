import "./User.scss"
import TopBar from "../TopBar/TopBar"
import { productCategory, routes, userQueryCodes } from "../../utils/enum"
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Icon,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
//MUI Imports
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemButton from "@mui/material/ListItemButton"
import Avatar from "@mui/material/Avatar"
import { Divider } from "@mui/material"
import Rating from "@mui/material/Rating"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import { getInitials, fecthData } from "../../utils/helperFunctions/helper"
import { useState, useRef, useEffect } from "react"

const EditMenu = ({ menu, password, setAction, username, setUser }) => {
  const [newEmail, setNewEmail] = useState(undefined)
  const [newPassword, setNewPassword] = useState(undefined)
  const [unlockTextField, setUnlockTextField] = useState(false)
  const [error, setError] = useState(false)
  const passwordAttempt = useRef(undefined)

  useEffect(() => {
    if (menu === "email") setUnlockTextField(true)
  }, [])

  const handleCurrentPasswordOnChange = (event) => {
    passwordAttempt.current = event.currentTarget.value
  }

  const validateEmail = (email) => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (email.match(validRegex)) {
      console.log("Great!")
      return true
    } else {
      console.log("Invalid email address!")
      return false
    }
  }

  const handleClose = () => {
    setAction(false)
    setUnlockTextField(false)
    setError(false)
    setNewEmail(undefined)
    setNewPassword(undefined)
    passwordAttempt.current = undefined
  }

  const handleUnlockResetPassword = () => {
    if (menu !== "password") {
      setUnlockTextField(false)
      return
    }

    if (passwordAttempt.current === password) {
      setUnlockTextField(true)
      setError(false)
    } else {
      setUnlockTextField(false)
      setError(true)
    }
  }

  const handleNewEvent = (event) => {
    const val = event.currentTarget.value
    if (menu === "password" && unlockTextField) {
      setNewPassword(val)
    } else if (menu === "email") {
      setNewEmail(val)
    }
  }

  const handleSubmit = () => {
    let data = {}
    if (menu === "email") {
      if (!validateEmail(newEmail)) {
        setError(true)
        console.log(error)
        return
      }
      // else
      setError(false)
      data = {
        query: userQueryCodes.updateEmail,
        username: username,
        email: newEmail,
      }
    } else if (menu === "password") {
      data = {
        query: userQueryCodes.updatePassword,
        username: username,
        password: newPassword,
      }
    }

    fecthData(routes.postUser, data, undefined, 1).then((data) => {
      // update logged user information
      data = {
        query: userQueryCodes.getByUserName,
        username: username,
      }

      fecthData(routes.postUser, data, setUser, 1).then(() => {
        // reset states
        setAction(false)
        setUnlockTextField(false)
        setError(false)
        setNewEmail(undefined)
        setNewPassword(undefined)
        passwordAttempt.current = undefined
      })
    })
  }
  return (
    <Grid container className="edit-menu" spacing={{ xs: 2 }}>
      <Grid item xs={8} sm={8} md={8}>
        <Typography variant="h4" gutterBottom>
          {menu === "email" ? "Edit Email" : "Edit Password"}
        </Typography>
      </Grid>

      <Grid item xs={4} sm={4} md={4}>
        <IconButton onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Grid>

      {!unlockTextField && menu === "password" && (
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            sx={{ width: "60%" }}
            label="Enter Current Password"
            error={error}
            onChange={handleCurrentPasswordOnChange}
            type="password"
            helperText={error ? "Invalid Password." : ""}
          />
          <Button onClick={handleUnlockResetPassword}>
            <NavigateNextIcon fontSize="large" />
          </Button>
        </Grid>
      )}

      {unlockTextField && (
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            sx={{ width: "60%" }}
            type={menu === "password" ? "password" : "email"}
            label={
              menu === "password" ? "Enter New Password" : "Enter New Email"
            }
            error={error}
            helperText={menu === "email" ? "Incorrect email format" : ""}
            onChange={handleNewEvent}
            ref={passwordAttempt}
          />
        </Grid>
      )}

      <Grid item xs={12} sm={12} md={12}>
        <Button
          disabled={!newPassword && !newEmail}
          variant="contained"
          onClick={handleSubmit}
        >
          <Typography gutterBottom>Submit</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

const User = ({ user, setMenu, setCategory, menu, setUser, administrator }) => {
  const [action, setAction] = useState(false)
  const [menuToEdit, setMenuToEdit] = useState(undefined)

  const handleEdit = (edit) => {
    setMenuToEdit(edit)
    setAction(true)
  }

  return (
    <div className="User-main-container">
      <TopBar
        menu={menu}
        setMenu={setMenu}
        setCategory={setCategory}
        category={productCategory.misc}
        administrator={administrator}
      />
      {/* Will triger when edit password or edit email is called */}
      {action && (
        <EditMenu
          setAction={setAction}
          menu={menuToEdit}
          setUser={setUser}
          password={user?.password}
          username={user?.username}
        />
      )}

      <Grid
        container
        sx={{ mt: "10vh" }}
        className={action ? "user-info-blur" : ""}
      >
        <Grid item xs={8} sx={{ height: "90vh" }}>
          <img
            src="https://source.unsplash.com/random"
            alt={"User Picture"}
            loading="lazy"
            style={{ width: "60vw" }}
          />
        </Grid>

        <Grid item>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>{getInitials(user ? user.name : "Un Known")}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user?.name}
                secondary={`username: ${user?.name}`}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <VerifiedUserIcon />
                </Avatar>
              </ListItemAvatar>
              {user?.administrator ? <ListItemText
                primary={`Administrator:`}
                secondary={
                  user?.verified ? (
                    <Typography sx={{ color: "green" }} fontSize={"small"}>
                      Verified
                    </Typography>
                  ) : (
                    <Typography sx={{ color: "#B45309" }} fontSize={"small"}>
                      Pending
                    </Typography>
                  )
                }
              /> : <ListItemText
                primary={`Verification Status:`}
                secondary={
                  user?.verified ? (
                    <Typography sx={{ color: "green" }} fontSize={"small"}>
                      Verified
                    </Typography>
                  ) : (
                    <Typography sx={{ color: "#B45309" }} fontSize={"small"}>
                      Pending
                    </Typography>
                  )
                }
              />}
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThumbUpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Seller Rating: ${user?.rating}`}
                secondary={
                  <Rating
                    name="half-rating-read"
                    value={user?.rating}
                    precision={0.5}
                    readOnly
                  />
                }
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <RocketLaunchIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Items Sold" secondary={user?.items_sold} />
            </ListItem>

            <Divider />

            <ListItemButton onClick={() => handleEdit("email")}>
              <ListItemAvatar>
                <Avatar>
                  <RocketLaunchIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Change My Email" secondary={user?.email} />
            </ListItemButton>

            <Divider />

            <ListItemButton onClick={() => handleEdit("password")}>
              <ListItemAvatar>
                <Avatar>
                  <RocketLaunchIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText type={"password"} primary=" Change My Password" />
            </ListItemButton>
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default User
