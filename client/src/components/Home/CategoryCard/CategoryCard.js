import "./CategoryCard.scss"
import { Button } from "@mui/material"
import { menus, productCategory } from "../../../utils/enum"


import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import Typography from "@mui/material/Typography"

const CategoryCard = ({setMenu, setCategory, category, img}) => {
    const images = [
        {
          url: `${img}`,
          title: `${category}`,
          width: "100%",
          height: '400px'
        },
      ]
      
      const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: "relative",
        height: 200,
        [theme.breakpoints.down("sm")]: {
          width: "100% !important", // Overrides inline-style
          height: "100% !important",
        },
        "&:hover, &.Mui-focusVisible": {
          zIndex: 1,
          // transform: 'scale(1.02)',
          "& .MuiImageBackdrop-root": {
            opacity: 0.15,
          },
          "& .MuiImageMarked-root": {
            opacity: 0,
          },
          "& .MuiTypography-root": {
            border: "4px solid currentColor",
          },
        },
      }))
      
      const ImageSrc = styled("span")({
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      })
      
      const Image = styled("span")(({ theme }) => ({
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.common.white,
      }))
      
      const ImageBackdrop = styled("span")(({ theme }) => ({
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create("opacity"),
      }))
      
      const ImageMarked = styled("span")(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: "absolute",
        bottom: -2,
        left: "calc(50% - 9px)",
        transition: theme.transitions.create("opacity"),
      }))
    
    return (
      <Box sx={{mt:'10px', mb:'10px', display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} onClick={
          () => {
              setCategory(category)
              setMenu(menus.showcase)
          }
      }>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
              height: image.height
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                The "{category}" Category"
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
    )
  }

export default CategoryCard



