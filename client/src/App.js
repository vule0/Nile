import "./App.css"
import { useState } from "react"
import Home from "./components/Home/Home"
import Messages from "./components/Messages/Messages"
import User from "./components/User/User"
import Showcase from "./components/Showcase/Showcase"
import Detailed from "./components/Detailed/Detailed"
import Signin from "./components/Signin/Signin"
import { menus, productCategory } from "./utils/enum"
function App() {
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
        <Messages menu={menu} setMenu={setMenu} setCategory={setCategory} user={seller} />
      )}
      {menu === menus.user && (
        <User menu={menu} setMenu={setMenu} setCategory={setCategory} />
      )}
      {menu === menus.signin && (
        <Signin menu={menu} setMenu={setMenu} setCategory={setCategory} />
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
    </div>
  )
}

export default App
