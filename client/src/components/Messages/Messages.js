import "./Messages.scss"
import { useState, useRef, useEf, useEffect } from "react"
import TopBar from "../TopBar/TopBar"
//MUI Imports
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import InboxIcon from "@mui/icons-material/Inbox"
import SendIcon from "@mui/icons-material/Send"
import { Paper } from "@mui/material"

import {
  Typography,
  TextField,
  Avatar,
  IconButton,
  FormControl,
  OutlinedInput,
} from "@mui/material"

const ChatBubble = ({ text }) => {
  return (
    <>
      <List disablePadding>
        <ListItemButton
          className="lib"
          sx={{ padding: "10px", backgroundColor: "#EFF6FF" }}
        >
          <Avatar sx={{ position: "absolute", left: "10px", top: "6px" }}>
            UK
          </Avatar>
          <ListItemText
            sx={{ ml: "62px", wordWrap: "break-word" }}
            primary={`${text}`}
          />
        </ListItemButton>
      </List>
    </>
  )
}

const Messages = ({ setMenu, setCategory, menu }) => {
  const messageElement = useRef(null)
  const [messages, setMessages] = useState([])
  useEffect(() => {
    if (messageElement) {
      messageElement.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight, behavior: "smooth" })
      })
    }
  }, [])

  const handleSend = (event) => {
    const val = event.currentTarget.value
    if (event.key === "Enter") {
      event.preventDefault()
      if (val === "") return
      // send to database

      // display in chat box
      setMessages((m) => [...m, val])
      event.currentTarget.value = ""
    }
  }

  return (
    <div className="Messages-main-container">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} />
      <span style={{ marginTop: "10vh" }} />
      <div className="content">
        <Box className="chat-list" sx={{ bgcolor: "background.paper" }}>
          <nav aria-label="support">
            <List>
              <ListItem disablePadding divider>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Contact Support Team"
                    secondary="Leave feedback or report issues"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>

          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "bold" }}>
                      Your Messages
                    </Typography>
                  }
                />
              </ListItem>

              <Divider variant="middle" />

              <ListItem disablePadding>
                <ListItemButton>
                  <Avatar>UK</Avatar>
                  <ListItemText sx={{ ml: "10px" }} primary="Name Lastname" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <Avatar>UK</Avatar>
                  <ListItemText sx={{ ml: "10px" }} primary="Name Lastname" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <Avatar>UK</Avatar>
                  <ListItemText sx={{ ml: "10px" }} primary="Name Lastname" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <Avatar>UK</Avatar>
                  <ListItemText sx={{ ml: "10px" }} primary="Name Lastname" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <Avatar>UK</Avatar>
                  <ListItemText sx={{ ml: "10px" }} primary="Name Lastname" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
        <div className="message-container" >
          <Box
          ref={messageElement}
            className="messages"
            sx={{ width: "100%", bgcolor: "background.paper" }}
          >
            {messages.map((e, i) => {
              return <ChatBubble key={i} text={e} />
            })}
          </Box>

          <FormControl sx={{ width: "80%" }}>
            <OutlinedInput
              id="outlined-adornment-weight"
              placeholder="Type Message"
              maxRows={5}
              multiline
              endAdornment={
                <IconButton position="end">
                  <SendIcon />
                </IconButton>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              onKeyDown={handleSend}
            />
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default Messages
