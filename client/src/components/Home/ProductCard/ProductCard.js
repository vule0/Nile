import "./ProductCard.scss"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"

const ProductCard = ({ size, left }) => {
  return (
    <div className="Category-main-container">
      <div className="up-div">
        {/* Main Image */}
      </div>
      <div className="bottom-div">
        <nav aria-label="secondary mailbox folders">
          <List disablePadding>
            <ListItem>
              <ListItemText primary="By Name LastName" secondary="username" />
              <Avatar>NL</Avatar>
            </ListItem>
            <Divider variant="middle"/>
            <ListItem>
              <ListItemText primary="Price" secondary="$100.99" />
            </ListItem>
          </List>
        </nav>
      </div>
    </div>
  )
}

export default ProductCard
