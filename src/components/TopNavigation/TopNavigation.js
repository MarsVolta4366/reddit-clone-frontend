import { KeyboardArrowDownOutlined, PersonOutline, Search, Login, FiberManualRecord, Logout } from "@mui/icons-material"
import { Button, Input, InputAdornment, Menu, MenuItem } from '@mui/material'
import { useContext, useState } from "react"
import { AuthenticationContext } from "../../context/AuthenticationContext"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import NavDropDownMenu from "../NavDropDownMenu/NavDropDownMenu"
import { Link } from "react-router-dom"

const TopNavigation = () => {

    const { setToggleSignUp, setToggleLogIn } = useContext(AuthenticationContext)
    const { currentUser } = useContext(CurrentUserContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const logoutUser = async () => {
        await fetch("http://localhost:4000/authentication/logout", {
            credentials: "include"
        })
        window.location = "/"
    }

    let logInActions = (
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            <Button id="logInButton" onClick={() => setToggleLogIn(true)}>Log In</Button>
            <Button id="signUpButton" onClick={() => setToggleSignUp(true)}>Sign Up</Button>

            <div>
                <Button
                    onClick={handleClick} variant="darkButton">
                    <PersonOutline style={{ color: "gray", fontSize: "30px" }} />
                    <KeyboardArrowDownOutlined style={{ color: "gray", fontSize: "25px" }} />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => {
                        setToggleLogIn(true)
                        setAnchorEl(null)
                    }} variant="darkMenuItem"><Login style={{ marginRight: "5px" }} />Log In / Sign Up</MenuItem>
                </Menu>
            </div>
        </div>
    )

    if (currentUser) {
        logInActions = (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <Button
                    onClick={handleClick} variant="darkButton">
                    <PersonOutline style={{ color: "gray", fontSize: "30px" }} />
                    <FiberManualRecord style={{ color: "#46D160", fontSize: "15px", marginLeft: "-15px", marginTop: "13px", border: "1px solid #212222", borderRadius: "50%", padding: "0px", backgroundColor: "#212222" }} />
                    <span className="whiteText usernameDisplay">{currentUser.username}</span>
                    <KeyboardArrowDownOutlined style={{ color: "gray", fontSize: "25px" }} />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}>
                    <Link to={`/profile/${currentUser.username}`} className="myLink">
                        <MenuItem variant="darkMenuItem" onClick={() => {
                            setAnchorEl(null)
                        }}><PersonOutline style={{ marginRight: "5px" }} />Profile</MenuItem>
                    </Link>
                    <MenuItem variant="darkMenuItem" onClick={() => {
                        logoutUser()
                        setAnchorEl(null)
                    }}><Logout style={{ marginRight: "5px" }} />Log Out</MenuItem>
                </Menu>
            </div>
        )
    }

    return (
        <header id="topNavigation">

            <div className="redditLogoContainer" id="redditLogoSm">
                <Link to="/">
                    <img src="/reddit-logo-sm-screen.webp" alt="Reddit logo" id="redditLogo" />
                </Link>
            </div>
            {currentUser ? <NavDropDownMenu /> : null}
            <Input
                variant="darkInput"
                disableUnderline={true}
                placeholder="Search Reddit"
                startAdornment={
                    <InputAdornment position="start">
                        <Search style={{ color: "gray", fontSize: "30px" }} />
                    </InputAdornment>
                } />

            {logInActions}
        </header>
    )
}

export default TopNavigation