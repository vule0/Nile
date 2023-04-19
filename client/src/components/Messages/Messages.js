import "./Messages.scss"
import { useState, useRef, useEffect } from "react"
import TopBar from "../TopBar/TopBar"
// local imports
import { fecthData, getInitials } from "../../utils/helperFunctions/helper"
import { routes, messageQueryCodes, productCategory } from "../../utils/enum"
//MUI Imports
import InboxIcon from "@mui/icons-material/Inbox"
import SendIcon from "@mui/icons-material/Send"
import {
  Typography,
  Avatar,
  IconButton,
  FormControl,
  OutlinedInput,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"

const Messages = ({ seller, setMenu, setCategory, menu, administrator }) => {
  const [otherParties, setOtherParties] = useState([])
  const [otherPartyName, setOtherPartyName] = useState("Support")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // initial data fetch
    fecthData(
      routes.postMessage,
      { query: messageQueryCodes.getOtherParties },
      setOtherParties
    ).then((otherParties) => {
      let otherPartiesFlat = otherParties.flat()
      let data = {}
      if (seller === undefined) { // not contancting specific seller form product
        data = {
          query: messageQueryCodes.getByOtherParty,
          otherParty: otherPartiesFlat[0],
        }
        setOtherPartyName(otherPartiesFlat[0])
      } else {
          const idx = otherPartiesFlat.findIndex(e => e === seller)
          // if user previously communicated
          if (idx !== -1) {
            const e = otherPartiesFlat[idx]
            delete otherPartiesFlat[idx]
            otherPartiesFlat.unshift(e)
            setOtherParties(otherPartiesFlat)
            setOtherPartyName(otherPartiesFlat[0])
            data = {
              query: messageQueryCodes.getByOtherParty,
              otherParty: otherPartiesFlat[0],
            }
        }
        // otherwise
        else {
          setOtherParties((x) => [seller, ...x])
          setOtherPartyName(seller)
          data = {
            query: messageQueryCodes.getByOtherParty,
            otherParty: seller,
          }
        }
      }
      fecthData(routes.postMessage, data, setMessages, 1)
    })
  }, [])

  const handleRecipientClick = (event) => {
    // changes the recipient
    const primaryText = event.currentTarget.children[1].children[0].textContent // get text from ListItemText
    setOtherPartyName(primaryText)
    const data = {
      query: messageQueryCodes.getByOtherParty,
      otherParty: primaryText,
    }
    fecthData(routes.postMessage, data, setMessages, 1)
  }

  return (
    <div className="Messages-main-container">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} category={productCategory.misc} administrator={administrator} />
      <span style={{ marginTop: "10vh" }} />
      <div className="content">
        <Box className="chat-list" sx={{ bgcolor: "background.paper" }}>
          <nav aria-label="support">
            <List>
              <ListItem disablePadding divider>
                <ListItemButton className={otherPartyName === 'Support' ? 'active' : ''} onClick={() => {setMessages([]); setOtherPartyName('Support')}}>
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

              {otherParties.flat().map((e, i) => {
                return (
                  <ListItem disablePadding key={i}>
                    <ListItemButton
                      onClick={handleRecipientClick}
                      className={
                        otherParties.flat()[i] === otherPartyName
                          ? "active"
                          : ""
                      }
                    >
                      <Avatar>{getInitials(e)}</Avatar>
                      <ListItemText sx={{ ml: "10px" }} primary={e} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </nav>
        </Box>

        <ChatBox
          currentOtherParty={otherPartyName}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  )
}

const ChatBox = ({ currentOtherParty, messages, setMessages }) => {
  const messageElement = useRef(null)

  useEffect(() => {
    // handles scroll to bottom when new message is entered
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
      //  data.text, data.date, data.self, data.name, data.uname, data.rating
      const newMessage = {
        query: messageQueryCodes.createMessage,
        name: currentOtherParty,
        username: "username",
        self: true,
        rating: 4.8,
        text: val,
        date: "feb 14th, 2023",
      }

      fecthData(routes.postMessage, newMessage, undefined, 1)
      // display in chat box
      setMessages((m) => [...m, newMessage])
      event.currentTarget.value = ""
    }
  }

  return (
    <div className="message-container">
      <Box
        ref={messageElement}
        className="messages"
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        {messages.map((e, i) => {
          return (
            <ChatBubble
              key={i}
              self={e.self}
              username={e.self ? "Name Lastname" : currentOtherParty}
              text={e.text}
            />
          )
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
  )
}

const ChatBubble = ({ text, username = "UNKNOWN" }) => {
  return (
    <>
      <List disablePadding>
        <ListItem
          className={"lib"}
          sx={{ padding: "10px", paddingLeft: "5vw" }}
        >
          <Avatar sx={{ position: "absolute", left: "4vw", top: "6px" }}>
            UK
          </Avatar>
          <ListItemText
            sx={{ ml: "50px", wordWrap: "break-word" }}
            primary={
              <Typography sx={{ fontWeight: "bold" }}>{username}:</Typography>
            }
            secondary={text}
          />
        </ListItem>
      </List>
    </>
  )
}

export default Messages
