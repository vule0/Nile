import "./ProductCard.scss"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"
import { getInitials } from "../../../utils/helperFunctions/helper"

const ProductCard = ({
  imageUrl,
  name,
  username,
  price,
  productName,
  onClick,
}) => {
  return (
    <div className="Category-main-container" onClick={onClick}>
      <div className="up-div">
        <img
          src={`${imageUrl}`}
          alt={"Product Picture"}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
