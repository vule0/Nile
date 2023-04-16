import { menus, routes, userQueryCodes } from "../../utils/enum"
import { fecthData } from "../../utils/helperFunctions/helper"
import TopBar from "../TopBar/TopBar"
import "./Administrator.scss"
import { useState, useEffect } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Checkbox, Button} from "@mui/material"



const Administrator = ({ user, category, setMenu, setCategory, menu, administrator}) => {
    const [unverified, setUnverified] = useState([])
    const [selected, setSelected] = useState([])

    const query = {query: userQueryCodes.filterByVerified, isVerified:false}
    const getUnverified = () => {
        fecthData(routes.postUser, query, setUnverified, 1)
    }

    useEffect(() => getUnverified(), [])
    // console.log(unverified)

    // console.log(unverified)
    const handleChange = (user) => {
        if (selected.includes(user)){
            setSelected(selected.filter(selected => selected != user))
        } else{
            setSelected([...selected, user]);
        }
        console.log(selected)
    }

    const handleSubmit= () => {
        console.log(selected)
        selected.forEach(user => {
            const query = {query: userQueryCodes.updateVerified, username:user.username, isVerified: true}
            fecthData(routes.postUser, query, undefined, 1).then(response => {
                console.log(response, user)
            })
            .catch(error =>{
                console.log("ERROR")
            })
            // changeVerification(user)
        })
        setMenu(menus.home)
    }

    return (
        <div className="showcase-main-container">
            <TopBar user={user} menu={menu} setMenu={setMenu} setCategory={setCategory} category={category} administrator={administrator} />
            <div className="content" style={{paddingTop: 75}}>
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
                                <Checkbox checked={selected.includes(unverified)} onChange={() => handleChange(unverified)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" disabled={!selected.length} onClick={handleSubmit} fullWidth>Submit</Button>
        </div>
    </div>
    )







}

export default Administrator