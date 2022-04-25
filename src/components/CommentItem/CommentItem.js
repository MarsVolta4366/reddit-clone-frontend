import { Delete, Edit, MoreHoriz, PersonOutline } from "@mui/icons-material"
import { Button, Menu, MenuItem } from "@mui/material"
import { useContext, useState } from "react"
import { CurrentUserContext } from "../../context/CurrentUserContext"

const CommentItem = ({ comment, post_id }) => {

    const { currentUser } = useContext(CurrentUserContext)
    const [anchorCommentActions, setAnchorCommentActions] = useState(null)
    const commentActionsOpen = Boolean(anchorCommentActions)

    const deleteComment = async (comment) => {
        await fetch("http://localhost:4000/comments", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        window.location.href = `/comments/${post_id}`
    }

    const handleCommentActionsClicked = (e) => {
        setAnchorCommentActions(e.currentTarget)
    }

    const renderCommentActions = (comment) => {
        if (currentUser) {
            if (currentUser.username === comment.User.username) {
                return (
                    <form>
                        <Button onClick={handleCommentActionsClicked}><MoreHoriz className="iconButton" /></Button>
                        <Menu
                            anchorEl={anchorCommentActions}
                            open={commentActionsOpen}
                            onClose={() => setAnchorCommentActions(null)}>
                            <MenuItem variant="darkMenuItemLeft" onClick={() => {
                                setAnchorCommentActions(null)
                            }}><Edit className="darkIcon" />Edit</MenuItem>
                            <MenuItem variant="darkMenuItemLeft" onClick={() => {
                                deleteComment(comment)
                                setAnchorCommentActions(null)
                                // window.location.href = `/comments/${post_id}`
                            }}><Delete className="darkIcon" />Delete</MenuItem>
                        </Menu>
                    </form>
                )
            }
        }
    }

    return (
        <div className="whiteText commentBox">
            <div className="iconAndTextBox">
                <PersonOutline className="darkIcon" style={{ margin: "0" }} />
                <h2 className="commentUsername">{comment.User.username}</h2>
            </div>
            <pre className="commentText">{comment.text}</pre>
            {renderCommentActions(comment)}
        </div>
    )
}

export default CommentItem