import "./App.css"
import { useState } from "react"
import Home from "./components/Home/Home"
import Messages from "./components/Messages/Messages"
import User from "./components/User/User"
import { menus, productCategory } from "./utils/enum"
function App() {
  const [menu, setMenu] = useState(menus.home)

  return (
    <div className="App">
      {menu === menus.home && <Home/>}
      {menu === menus.messages && <Messages/>}
      {menu === menus.user && <User/>}
      
    </div>
  )
}

export default App
