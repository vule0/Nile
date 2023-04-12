import { useState } from "react"
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
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { menus, productCategory } from "../../utils/enum"
import AddIcon from '@mui/icons-material/Add';
import TopBar from "../TopBar/TopBar"
import Sell from "./Sell/Sell"

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const theme = createTheme()

const SellLanding = ({ category, setMenu, setCategory, menu }) => {
  const x = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
  const [action, setAction] = useState(true)

  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <TopBar
          category={productCategory.misc}
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
        />
      </AppBar>
      {action && <main>
        {/* Hero unit */}
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
              <Button variant="contained" onClick={() => setAction(false)}> Create New Posting <AddIcon /> </Button>
            </Stack>
          </Container>

        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Product Name
                    </Typography>
                    <Typography>
                      $99.99
                    </Typography>
                    <Typography>
                      Product Description
                      Product Description
                      Product Description
                      Product Description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => setAction(false)}>Edit</Button>
                    <Button color={'error'} size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>}
      {!action && <Sell setAction={setAction} />

      }
    </ThemeProvider>
  )
}

export default SellLanding
