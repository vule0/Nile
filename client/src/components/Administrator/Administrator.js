import { routes, userQueryCodes } from "../../utils/enum"
import { fecthData } from "../../utils/helperFunctions/helper"
import TopBar from "../TopBar/TopBar"
import "./Administrator.scss"
import { useState, useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Checkbox, Button, Alert } from "@mui/material"

const Administrator = ({
  user,
  category,
  setMenu,
  setCategory,
  menu,
  administrator,
}) => {
  const [unverified, setUnverified] = useState([])
  const [selected, setSelected] = useState([])

  const data = { query: userQueryCodes.filterByVerified, isVerified: false }
  const getUnverified = () => {
    fecthData(routes.postUser, data, setUnverified, 1).then((data) => {
      if (data?.status === -1) setUnverified([]) // status -1 means no data from database
    })
  }

  useEffect(() => getUnverified(), [])

  const handleChange = (user) => {
    if (selected.includes(user)) {
      setSelected(selected.filter((selected) => selected != user))
    } else {
      setSelected([...selected, user])
    }
  }

  const handleSubmit = async () => {
    let data = {
      query: userQueryCodes.updateVerified,
      username: undefined,
      isVerified: true,
    }

    for (const user of selected) {
      data.username = await user.username
      await fecthData(routes.postUser, data, undefined, 1).catch((e) =>
        console.log("Error in fetching: ", e)
      )
      setUnverified(unverified.filter((e) => e !== user))
    }

    let updateVerified = unverified
    for (const verified of selected) {
      updateVerified = updateVerified.filter((e) => e !== verified)
    }

    setUnverified(updateVerified)
    setSelected([])
  }

  return (
    <div className="showcase-main-container">
      <TopBar
        user={user}
        menu={menu}
        setMenu={setMenu}
        setCategory={setCategory}
        category={category}
      />
      <div className="content" style={{ paddingTop: 75 }}>
        {unverified.length > 0 ? (
          <>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>E-Mail</TableCell>
                  <TableCell>Verify</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unverified.map((unverified) => (
                  <TableRow key={unverified.username}>
                    <TableCell>{unverified.name}</TableCell>
                    <TableCell>{unverified.username}</TableCell>
                    <TableCell>{unverified.email}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(unverified)}
                        onChange={() => handleChange(unverified)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="contained"
              disabled={!selected.length}
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </>
        ) : <Alert>All Caught up. No Users to Review</Alert>}
      </div>
    </div>
  )
}

export default Administrator
