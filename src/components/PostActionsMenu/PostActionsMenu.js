import { Button, Menu, MenuItem } from "@mui/material"
import { Delete, Edit, MoreHoriz } from "@mui/icons-material"
import { useState } from "react"

const PostActionsMenu = ({ postData, setToggleEdit, toggleEdit, deletePost }) => {

    const [anchorHome, setAnchorHome] = useState(null)
    const homeOpen = Boolean(anchorHome)

    const handleActionMenuClick = (e) => {
        setAnchorHome(e.currentTarget)
    }

    return (
        <div>
            <Button onClick={handleActionMenuClick} className="actionsButton"><MoreHoriz className="iconButton" /></Button>
            <Menu
                anchorEl={anchorHome}
                open={homeOpen}
                onClose={() => setAnchorHome(null)}>
                <MenuItem variant="darkMenuItemLeft" onClick={() => {
                    setToggleEdit(() => !toggleEdit)
                    setAnchorHome(null)
                }}><Edit className="darkIcon" />Edit Post</MenuItem>
                <MenuItem variant="darkMenuItemLeft" onClick={() => {
                    deletePost(postData)
                    setAnchorHome(null)
                }}><Delete className="darkIcon" />Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default PostActionsMenu