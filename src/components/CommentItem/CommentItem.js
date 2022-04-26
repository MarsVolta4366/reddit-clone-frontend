import { Delete, Edit, MoreHoriz, PersonOutline } from "@mui/icons-material"
import { Button, Menu, MenuItem, TextareaAutosize } from "@mui/material"
import { useContext, useState } from "react"
import { CurrentUserContext } from "../../context/CurrentUserContext"

const CommentItem = ({ comment, post_id }) => {

    const { currentUser } = useContext(CurrentUserContext)
    const [anchorCommentActions, setAnchorCommentActions] = useState(null)
    const commentActionsOpen = Boolean(anchorCommentActions)
    const [toggleCommentEdit, setToggleCommentEdit] = useState(false)
    const [editedComment, setEditedComment] = useState({ comment_id: comment.comment_id, text: comment.text })

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

    const updateComment = async () => {
        await fetch("http://localhost:4000/comments", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedComment)
        })
    }

    let commentEditForm = (
        <form onSubmit={updateComment}>
            <TextareaAutosize
                maxLength={1000}
                placeholder="Text (optional)"
                className="darkBackground whiteText"
                value={editedComment.text}
                onChange={(e) => setEditedComment({ ...editedComment, text: e.target.value })}
                style={{
                    padding: "10px",
                    width: "96%",
                    resize: "vertical",
                    height: "200px"
                }} />
            <Button className="lightTextButton" onClick={() => setToggleCommentEdit(false)}>Cancel</Button>
            <Button type="submit" className="grayButton">Save</Button>
        </form>
    )

    return (
        <div className="whiteText commentBox">
            <div className="iconAndTextBox">
                <PersonOutline className="darkIcon" style={{ margin: "0" }} />
                <h2 className="commentUsername">{comment.User.username}</h2>
            </div>
            {toggleCommentEdit ? commentEditForm : <pre className="commentText">{comment.text}</pre>}
            {renderCommentActions(comment)}
        </div>
    )
}

export default CommentItem