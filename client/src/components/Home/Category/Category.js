import "./Category.scss"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import DraftsIcon from "@mui/icons-material/Drafts"
import Avatar from '@mui/material/Avatar';

const Category = ({ size, left }) => {
  return (
    <div className="Category-main-container">
      <div className="left-div">
        <h1>$100.99</h1>
        <nav aria-label="secondary mailbox folders">
          <List sx={{overflowY:'scroll'}}>
          <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Track your daily activity and fitness goals with this advanced tracker." />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="By Name LastName" secondary='username'/>
                <Avatar>NL</Avatar>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Rating" secondary='4.9' />
              </ListItemButton>
            </ListItem>

          </List>
        </nav>
        <Divider />
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Seller" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </div>
      <div className="right-div"></div>
    </div>
  )
}

export default Category
