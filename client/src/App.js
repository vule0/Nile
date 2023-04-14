import "./App.css"
import { useState, useEffect } from "react"
import Home from "./components/Home/Home"
import Messages from "./components/Messages/Messages"
import User from "./components/User/User"
import Showcase from "./components/Showcase/Showcase"
import Detailed from "./components/Detailed/Detailed"
import SellLanding from "./components/SellLanding/SellLanding"
import { menus, productCategory, routes, userQueryCodes } from "./utils/enum"
import { fecthData } from "./utils/helperFunctions/helper"
// import Signin from "./components/Signin/Signin"
import Signup from "./components/Signup/Signup"

function App() {
  const [user, setUser] = useState({
    name: "Liam Sullivan",
    username: "lsullivan",
    rating: 4.7,
    verified: true,
    email: "lsullivan@example.com",
    items_sold: 121,
  }) // sample user...this should be retieved from the signin page
  const [menu, setMenu] = useState(menus.home)
  const [postId, setPostId] = useState(0)
  const [category, setCategory] = useState(productCategory.misc)
  const [seller, setSeller] = useState(undefined)

  return (
    <div className="App">
      {menu === menus.home && (
        <Home
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
          setPostId={setPostId}
          category={category}
        />
      )}
      {menu === menus.messages && (
        <Messages
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
          user={seller}
        />
      )}
      {menu === menus.user && (
        <User menu={menu} setMenu={setMenu} setCategory={setCategory} />
      )}
      
      {menu === menus.signup && (
        <Signup menu={menu} setMenu={setMenu} setCategory={setCategory} />
      )}

      {menu === menus.showcase && (
        <Showcase
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
          category={category}
          setPostId={setPostId}
        />
      )}
      {menu === menus.detailed && (
        <Detailed
          setSeller={setSeller}
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
          postId={postId}
          category={category}
        />
      )}
      {menu === menus.sell && (
        <SellLanding
          user={user}
          category={category}
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
        />
      )}
    </div>
  )
}

export default App
