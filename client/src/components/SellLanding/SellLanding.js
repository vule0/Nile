import { useState, useEffect } from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Alert } from "@mui/material"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { productCategory, productQueryCodes, routes } from "../../utils/enum"
import { fecthData } from "../../utils/helperFunctions/helper"
import AddIcon from "@mui/icons-material/Add"
import TopBar from "../TopBar/TopBar"
import Sell from "./Sell/Sell"

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const theme = createTheme()

const SellLanding = ({ user, setMenu, setCategory, menu, administrator }) => {
  const [postings, setPostings] = useState([])
  const [posting, setPosting] = useState(undefined)
  const [action, setAction] = useState(true)

  const handleEdit = (e) => {
    setAction(false)
    setPosting(e)
  }

  const handleDelete = (e) => {
    setPostings(arr => arr.filter(x => x !== e))
    fecthData(routes.postProduct, {query: productQueryCodes.deletePost, id: e.id}, undefined, 1)
  }

  const handleNewPosting = () => {
    setAction(false)
    setPosting(undefined)
  }

  useEffect(() => {
    if (action) {
      fecthData(
        routes.postProduct,
        { query: productQueryCodes.getByUserName, username: user.username },
        undefined,
        1
      ).then((data) => {
        if (data.status) setPosting([])
        else setPostings(data)
      })
    }
  }, [action])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <TopBar
          user={user}
          category={productCategory.misc}
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
        />
      </AppBar>
      {action && (
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Sell Station
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Here you can add, edit, or delete postings.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={handleNewPosting} disabled={!user?.verified}>
                  Create New Posting <AddIcon />
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Your Postings
            </Typography>
            <Grid container spacing={4}>
              {postings.length === 0 ? (
                <Grid item xs={100}>
                  <Alert className="empty" severity="info">
                    {user?.verified ? 'No Postings Yet' : 'We are still reviewing your information. In order to have postings you need to be a verified user.'}
                  </Alert>
                </Grid>
              ) : (
                postings.map((card, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        style={{ width: "100%", height: "100%", objectFit:"contain"}}
                        image={card?.imageurl ? card.imageurl : 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200'}
                        alt="product image"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card["product name"]}
                        </Typography>
                        <Typography>${card.price}</Typography>
                        <Typography>{card.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleEdit(card)}>
                          Edit
                        </Button>
                        <Button
                          color={"error"}
                          size="small"
                          onClick={() => handleDelete(card)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Container>
        </main>
      )}
      {!action && user?.verified && (
        <Sell user={user} postingObj={posting} setAction={setAction} />
      )}
    </ThemeProvider>
  )
}

export default SellLanding
