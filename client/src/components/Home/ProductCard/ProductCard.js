import "./ProductCard.scss"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"
const getInitials = (name) => {
  const split = name.split(" ")
  return `${split[0][0]}${split[1][0]}`
}

const ProductCard = ({ name, username, price, productName, onClick }) => {
  return (
    <div className="Category-main-container" onClick={onClick}>
      <div className="up-div">{/* Main Image */}</div>
      <div className="bottom-div">
        <nav aria-label="secondary mailbox folders">
          <List disablePadding>
            <ListItem>
              <ListItemText primary={<Typography sx={{fontWeight:'bold'}}>{productName}</Typography>} secondary={`By ${username}`} />
              <Avatar> {getInitials(name)} </Avatar>
            </ListItem>
            <Divider variant="middle" />
            <ListItem>
              <ListItemText primary="Price" secondary={`$${price}`} />
            </ListItem>
          </List>
        </nav>
      </div>
    </div>
  )
}

export default ProductCard
