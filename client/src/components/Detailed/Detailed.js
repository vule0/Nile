import TopBar from "../TopBar/TopBar"
import "./Detailed.scss"
import { fecthData } from "../../utils/helperFunctions/helper"
import { menus, productQueryCodes, routes } from "../../utils/enum"
import { getInitials } from "../../utils/helperFunctions/helper"
import { useEffect, useState } from "react"
//MUI Imports
import { ImageList, ImageListItem } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemButton from "@mui/material/ListItemButton"
import Avatar from "@mui/material/Avatar"
import { Typography, Divider } from "@mui/material"
import MessageIcon from "@mui/icons-material/Message"
import Rating from "@mui/material/Rating"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"

const Detailed = ({ user, category, setMenu, setCategory, menu, postId, setSeller }) => {
  const [postArr, setPost] = useState([])

  useEffect(() => {
    const data = { query: productQueryCodes.getByProductId, productId: postId }
    fecthData(routes.postProduct, data, setPost, 1).then(data => {
    })
  }, [])

  return (
    <div className="Detailed-main-div">
      <TopBar
        user={user}
        menu={menu}
        setMenu={setMenu}
        setCategory={setCategory}
        category={category}
      />
      <div>
        <ImageList
          sx={{ mt: "10vh", width: "60vw", minWidth: "510px" }}
          variant="masonry"
          cols={2}
          gap={8}
        >
          {postArr.length > 0 && <ImageListItem >
              <img
                src={postArr[0].imageurl ? postArr[0].imageurl : 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200'}
                alt={postArr[0]['product name']}
                loading="lazy"
              />
            </ImageListItem>}
          {itemData.map((item, i) => (
            <ImageListItem key={i}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      <div className="info-div">
        <div className="description">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem sx={{ width: "30vw", minWidth: "300px" }}>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    {postArr.length === 0 ? "UNKNOWN" : postArr[0]["product name"]}
                  </Typography>
                }
                secondary={postArr.length === 0 ? "UNKNOWN" : postArr[0].description}
              />
            </ListItem>

            <Divider />

            <ListItemButton>
              <ListItemAvatar>
                <Avatar>{getInitials(`${postArr.length === 0 ? "UNKNOWN" : postArr[0].seller.name}`)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Sold By: ${
                  postArr.length === 0 ? "UNKNOWN" : postArr[0].seller.name
                }`}
                secondary={`username: ${
                  postArr.length === 0 ? "UNKNOWN" : postArr[0].seller.username
                }`}
              />
            </ListItemButton>

            <Divider />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Price"
                secondary={`$${postArr.length === 0 ? "UNKNOWN" : postArr[0].price}`}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThumbUpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Seller Rating: ${
                  postArr.length === 0 ? "UNKNOWN" : postArr[0].seller.rating
                }`}
                secondary={
                  <Rating
                    name="half-rating-read"
                    value={postArr.length === 0 ? 0 : postArr[0].seller.rating}
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
              <ListItemText primary="Items Sold" secondary={"140"} />
            </ListItem>

            <Divider />

            <ListItemButton component="a" href="#simple-list" onClick={() => {
              setSeller(`${postArr[0].seller.name}`)
              setMenu(menus.messages)
            }}>
              <ListItemAvatar>
                <Avatar>
                  <MessageIcon sx={{ color: "#b9efff" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Contact Seller" />
            </ListItemButton>
          </List>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ThumbUpIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Rate Your Experience"
              secondary={
                <Rating
                  name="half-rating-read"
                  defaultValue={0}
                  precision={0.5}
                />
              }
            />
          </ListItem>
        </div>
      </div>
    </div>
  )
}

const itemData = [
  {
    img: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
  },
  {
    img: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
  },
  {
    img: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
  },
  {
    img: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
  },
  {
    img: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
  }
]

// const itemData = [
//   {
//     img: "https://source.unsplash.com/random",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//   },
// ]

export default Detailed
