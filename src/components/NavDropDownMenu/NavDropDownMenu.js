import { Link, useLocation } from "react-router-dom"
import { Button, Menu, MenuItem } from "@mui/material"
import { Home, Add, KeyboardArrowDownOutlined, PersonOutline } from "@mui/icons-material"
import { useEffect, useState } from "react"

const NavDropDownMenu = () => {

    const [anchorHome, setAnchorHome] = useState(null)
    const homeOpen = Boolean(anchorHome)
    const [buttonDisplay, setButtonDisplay] = useState("")
    let location = useLocation()

    useEffect(() => {
        if (location.pathname === "/" || location.pathname.startsWith("/comments")) {
            setButtonDisplay(
                <>
                    <Home className="darkIcon" />
                    <span className="whiteText hideOnMediaQuery">
                        Home
                    </span>
                </>
            )
        } else if (location.pathname === "/createPost") {
            setButtonDisplay(
                <>
                    <Add className="darkIcon" />
                    <span className="whiteText hideOnMediaQuery" style={{ whiteSpace: "nowrap" }}>
                        Create Post
                    </span>
                </>
            )
        } else if (location.pathname.startsWith(`/profile`)) {
            const username = location.pathname.slice(8)
            setButtonDisplay(
                <>
                    <PersonOutline className="darkIcon" />
                    <span className="whiteText hideOnMediaQuery">
                        u/{username}
                    </span>
                </>
            )
        }
    }, [location])

    const handleHomeClick = (event) => {
        setAnchorHome(event.currentTarget)
    }

    return (
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            <Button onClick={handleHomeClick} id="homeButton">
                {buttonDisplay}
                <KeyboardArrowDownOutlined className="darkIcon hideOnMediaQuery" style={{ marginLeft: "auto", marginRight: "0" }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorHome}
                open={homeOpen}
                onClose={() => setAnchorHome(null)}>
                <Link to="/" className="myLink">
                    <MenuItem variant="darkMenuItemLeft" onClick={() => {
                        setAnchorHome(null)
                    }}><Home style={{ marginRight: "5px" }} />Home</MenuItem>
                </Link>
                <Link to="/createPost" className="myLink">
                    <MenuItem variant="darkMenuItemLeft" onClick={() => {
                        setAnchorHome(null)
                    }}><Add style={{ marginRight: "5px" }} />Create Post</MenuItem>
                </Link>
            </Menu>
        </div>
    )
}

export default NavDropDownMenu