import "./App.css"
import { useState, useEffect } from "react"
import Home from "./components/Home/Home"
import Messages from "./components/Messages/Messages"
import User from "./components/User/User"
import Showcase from "./components/Showcase/Showcase"
import Detailed from "./components/Detailed/Detailed"
import SellLanding from "./components/SellLanding/SellLanding"
import Signup from "./components/Signup/Signup"
import Signin from "./components/Signin/Signin"
import Administrator from "./components/Administrator/Administrator"
import { menus, productCategory, routes, userQueryCodes } from "./utils/enum"

function App() {
  // const [user, setUser] = useState({
  //   name: "Liam Sullivan",
  //   username: "lsullivan",
  //   rating: 4.7,
  //   verified: true,
  //   email: "lsullivan@example.com",
  //   items_sold: 121,
  //   password: '123'
  // }) // sample user...this should be retieved from the signin page
  const [user, setUser] = useState(undefined)
  const [menu, setMenu] = useState(menus.signin)
  const [postId, setPostId] = useState(0)
  const [category, setCategory] = useState(productCategory.misc)
  const [seller, setSeller] = useState(undefined)

  return (
    <div className="App">
      {menu === menus.home && (
        <Home
          user={user}
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
          seller={seller}
        />
      )}
      {menu === menus.user && (
        <User
          user={user}
          setUser={setUser}
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
        />
      )}
      {menu === menus.signin && <Signin setUser={setUser} setMenu={setMenu} />}

      {menu === menus.signup && <Signup setMenu={setMenu} setUser={setUser} />}

      {menu === menus.showcase && (
        <Showcase
          user={user}
          menu={menu}
          setMenu={setMenu}
          setCategory={setCategory}
          category={category}
          setPostId={setPostId}
        />
      )}
      {menu === menus.detailed && (
        <Detailed
          user={user}
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

      {menu === menus.administrator && (
        <Administrator
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
