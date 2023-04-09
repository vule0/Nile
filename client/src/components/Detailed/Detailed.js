import TopBar from "../TopBar/TopBar"
import "./Detailed.scss"
//MUI Imports
import { ImageList, ImageListItem } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemButton from "@mui/material/ListItemButton"
import Avatar from "@mui/material/Avatar"
import {Typography, Divider} from "@mui/material"
import MessageIcon from '@mui/icons-material/Message';
import Rating from '@mui/material/Rating';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Detailed = ({ category, setMenu, setCategory, menu, postId }) => {
  return (
    <div className="Detailed-main-div">
      <TopBar menu={menu} setMenu={setMenu} setCategory={setCategory} category={category} />
      <div>
        <ImageList
          sx={{ mt: "10vh", width: "60vw", minWidth: "510px" }}
          variant="masonry"
          cols={2}
          gap={8}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
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
            <ListItem sx={{ width: "30vw", minWidth:'300px'}}>
              <ListItemText
                primary={<Typography sx={{fontWeight:'bold', fontSize:'1.5rem'}}>Description</Typography>}
                secondary="Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text."
              />
            </ListItem>
            
            <Divider />
            
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  NL
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Sold By: Name LastName"
                secondary="username: username"
              />
            </ListItemButton>

            <Divider />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Price" secondary="$99.99" />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                 <ThumbUpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Seller Rating: 4.5"
                secondary={<Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />}
              />
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <RocketLaunchIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Items Sold" secondary="140" />
            </ListItem>

            <Divider />

            <ListItemButton component="a" href="#simple-list" >
              <ListItemAvatar>
                <Avatar>
                  <MessageIcon sx={{color:'#b9efff'}}/>
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
                secondary={<Rating name="half-rating-read" defaultValue={0} precision={0.5} />}
              />
            </ListItem>
        </div>
      </div>
    </div>
  )
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
]

export default Detailed
