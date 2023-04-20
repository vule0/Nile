import "./User.scss"
import TopBar from "../TopBar/TopBar"
import { productCategory, routes, userQueryCodes } from "../../utils/enum"
import { Grid, TextField, Button, Typography, IconButton } from "@mui/material"
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
import {
  getInitials,
  fecthData,
  validateEmail,
} from "../../utils/helperFunctions/helper"
import { useState, useRef, useEffect } from "react"
import axios from "axios"

const EditMenu = ({
  menu,
  password,
  setAction,
  username,
  setUser,
  setMenu,
}) => {
  const [newEmail, setNewEmail] = useState(undefined)
  const [newPassword, setNewPassword] = useState(undefined)
  const [unlockTextField, setUnlockTextField] = useState(false)
  const [error, setError] = useState(false)
  const passwordAttempt = useRef(undefined)

  /* unlocks textField if edit email, 
   otherwise if edit password we lock it 
   until user successfully enters current password */
  useEffect(() => {
    if (menu === "email") setUnlockTextField(true)
  }, [])

  const handleUnlockResetPassword = () => {
    if (menu === "email") return

    if (passwordAttempt.current === password) {
      setUnlockTextField(true)
      setError(false)
    } else {
      setUnlockTextField(false)
      setError(true)
    }
  }

  const handleCurrentPasswordOnChange = (event) => {
    passwordAttempt.current = event.currentTarget.value
  }

  const handleClose = () => {
    setAction(false)
    setUnlockTextField(false)
    setError(false)
    setNewEmail(undefined)
    setNewPassword(undefined)
    passwordAttempt.current = undefined
  }

  // updates password or email as input changes
  const handlePasswordEmailChange = (event) => {
    const val = event.currentTarget.value
    if (menu === "password" && unlockTextField) {
      setNewPassword(val)
    } else if (menu === "email") {
      setNewEmail(val)
    } else {
      console.log(
        "Neither edit password nor email in the state...something weird happened."
      )
    }
  }

  const handleSubmit = async () => {
    let data = {}
    if (menu === "email" && !validateEmail(newEmail)) {
      setError(true)
      return
    }

    if (menu === "email" && validateEmail(newEmail)) {
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

    // send updated password to api
    await fecthData(routes.postUser, data, undefined, 1)

    data = {
      query: userQueryCodes.getByUserName,
      username: username,
    }

    // update user's information by fetching the updated data
    await fecthData(routes.postUser, data, setUser, 1)

    // reset states
    setAction(false)
    setUnlockTextField(false)
    setError(false)
    setNewEmail(undefined)
    setNewPassword(undefined)
    passwordAttempt.current = undefined
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
            helperText={
              menu === "email" && error ? "Incorrect email format" : ""
            }
            onChange={handlePasswordEmailChange}
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
  const [imageUrl, setImageUrl] = useState(user?.imageurl)
  const data = { query: userQueryCodes.getByUserName, username: user.username }

  useEffect(() => getUser(), [])

  const getUser = () => {
    fecthData(routes.postUser, data, setUser, 1)
  }

  const handleEdit = (edit) => {
    setMenuToEdit(edit)
    setAction(true)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const base64String = btoa(reader.result)
        formData.append("image", base64String)
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
            // console.log("API response ↓")
            // console.log(response)
            const imageUrl = response.data.data.display_url
            const data = {
              query: userQueryCodes.updateImageUrl,
              username: user.username,
              imageurl: imageUrl,
            }
            fecthData(routes.postUser, data, undefined, 1)
            setImageUrl(imageUrl)
            resolve(imageUrl)
          })
          .catch((error) => {
            console.log("API error ↓")
            console.log(error)
            reject(error)
          })
      }
    })
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
        <Grid item xs={8}>
            <img
              src={imageUrl ? imageUrl : "https://source.unsplash.com/random"}
              alt={"User Picture"}
              loading="lazy"
              style={{ width: "50vw" }}
            />
          <Grid item>
            <Button
              variant="contained"
              component="label"
              onChange={handleFileUpload}
            >
              Upload Image
              <input type="file" hidden />
            </Button>
          </Grid>
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
              {user?.administrator ? (
                <ListItemText
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
                />
              ) : (
                <ListItemText
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
                />
              )}
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
