import "./ProductCard.scss"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"
import { getInitials } from "../../../utils/helperFunctions/helper"

const ProductCard = ({ name, username, price, productName, onClick }) => {
  return (
    <div className="Category-main-container" onClick={onClick}>
      <div className="up-div">
        {/* Main Image */}
        <img
          src="https://source.unsplash.com/random"
          alt={"User Picture"}
          loading="lazy"
          style={{ width: "100%" }}
        />
      </div>
      <div className="bottom-div">
        <nav aria-label="secondary mailbox folders">
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold" }}>
                    {productName}
                  </Typography>
                }
                secondary={`By ${username}`}
              />
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
