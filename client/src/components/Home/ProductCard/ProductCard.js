import "./ProductCard.scss"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"

const getInitials = (name) => {
  const split = name.split(" ")
  return `${split[0][0]}${split[1][0]}`
}

const ProductCard = ({ name, username, price }) => {
  return (
    <div className="Category-main-container">
      <div className="up-div">{/* Main Image */}</div>
      <div className="bottom-div">
        <nav aria-label="secondary mailbox folders">
          <List disablePadding>
            <ListItem>
              <ListItemText primary={`By ${name}`} secondary={username} />
              <Avatar>{getInitials(name)}</Avatar>
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
