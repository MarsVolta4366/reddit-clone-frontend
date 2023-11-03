import { Button, Menu, MenuItem } from "@mui/material"
import { Delete, Edit, MoreHoriz } from "@mui/icons-material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const PostActionsMenu = ({ postData, setToggleEdit, toggleEdit }) => {

    const [anchorHome, setAnchorHome] = useState(null)
    const homeOpen = Boolean(anchorHome)
    const navigate = useNavigate()

    const handleActionMenuClick = (e) => {
        setAnchorHome(e.currentTarget)
    }

    const deletePost = async (postData) => {
        const deletedPost = await fetch(`https://reddit-clone-backend-dfs.onrender.com/posts/${postData.post_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        await deletedPost.json()
        navigate(-1)
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