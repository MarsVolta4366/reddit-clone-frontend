import { Delete, Edit, MoreHoriz, PersonOutline } from "@mui/icons-material"
import { Button, Menu, MenuItem } from "@mui/material"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import PostedAgo from "../PostedAgo/PostedAgo"

const CommentItem = ({ comment, post_id }) => {

    const { currentUser } = useContext(CurrentUserContext)
    const [anchorCommentActions, setAnchorCommentActions] = useState(null)
    const commentActionsOpen = Boolean(anchorCommentActions)
    const [toggleCommentEdit, setToggleCommentEdit] = useState(false)
    const [editedComment, setEditedComment] = useState({ comment_id: comment.comment_id, text: comment.text })
    const postedMessage = <PostedAgo postedDate={comment.updatedAt} />

    const deleteComment = async (comment) => {
        await fetch("https://reddit-clone-backend-dfs.onrender.com/comments", {
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
                        <Button onClick={handleCommentActionsClicked} className="actionsButton"><MoreHoriz className="iconButton" /></Button>
                        <Menu
                            anchorEl={anchorCommentActions}
                            open={commentActionsOpen}
                            onClose={() => setAnchorCommentActions(null)}>
                            <MenuItem variant="darkMenuItemLeft" onClick={() => {
                                setToggleCommentEdit(!toggleCommentEdit)
                                setAnchorCommentActions(null)
                            }}><Edit className="darkIcon" />Edit</MenuItem>
                            <MenuItem variant="darkMenuItemLeft" onClick={() => {
                                deleteComment(comment)
                                setAnchorCommentActions(null)
                            }}><Delete className="darkIcon" />Delete</MenuItem>
                        </Menu>
                    </form>
                )
            }
        }
    }

    const updateComment = async (e) => {
        e.preventDefault()
        await fetch("https://reddit-clone-backend-dfs.onrender.com/comments", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedComment)
        })
        window.location.reload()
    }

    let commentEditForm = (
        <form onSubmit={updateComment}>
            <textarea
                maxLength={1000}
                rows="10"
                placeholder="Text (optional)"
                className="darkTextarea"
                value={editedComment.text}
                onChange={(e) => setEditedComment({ ...editedComment, text: e.target.value })}></textarea>
            <div style={{ float: "right", marginTop: "5px" }}>
                <Button className="lightTextButton" onClick={() => setToggleCommentEdit(false)}>Cancel</Button>
                <Button type="submit" className="grayButton">Save</Button>
            </div>
        </form>
    )

    return (
        <div className="whiteText commentBox">
            <div className="iconAndTextBox">
                <Link to={`/profile/${comment.User.username}`} className="myLink">
                    <PersonOutline className="darkIcon" style={{ margin: "0" }} />
                </Link>
                <Link to={`/profile/${comment.User.username}`} className="myLink">
                    <h2 className="commentUsername underlineHover">{comment.User.username}</h2>
                </Link>
                <span className="smGrayText">&nbsp;&#183; {postedMessage}</span>
            </div>
            {toggleCommentEdit ? commentEditForm : <pre className="commentText">{comment.text}</pre>}
            {renderCommentActions(comment)}
        </div>
    )
}

export default CommentItem