import { Article, Close, PersonOutline } from "@mui/icons-material"
import { Button, Divider, TextareaAutosize } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import CommentItem from "../CommentItem/CommentItem"
import PostActionsMenu from "../PostActionsMenu/PostActionsMenu"

const CommentsPage = () => {

    const { currentUser } = useContext(CurrentUserContext)
    const [toggleEdit, setToggleEdit] = useState(false)
    const { post_id } = useParams()
    const [postData, setPostData] = useState({ User: { username: null }, Comments: [] })
    const [comment, setComment] = useState({ post_id: post_id, text: "" })
    const [commentButtonDisabled, setCommentButtonDisabled] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:4000/posts/comments/${post_id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            setPostData(data)
        }
        fetchPost()
    }, [post_id, toggleEdit])

    const updatePost = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:4000/posts", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        window.location.reload()
    }

    let editForm = (
        <form onSubmit={updatePost}>
            <TextareaAutosize
                maxLength={1000}
                placeholder="Text (optional)"
                className="darkBackground whiteText"
                value={postData.text}
                onChange={(e) => setPostData({ ...postData, text: e.target.value })}

                style={{
                    padding: "10px",
                    width: "96%",
                    resize: "vertical",
                    height: "200px"
                }} />
            <div style={{ float: "right", marginTop: "5px" }}>
                <Button className="lightTextButton" onClick={() => setToggleEdit(false)}>Cancel</Button>
                <Button type="submit" className="grayButton">Save</Button>
            </div>
        </form>
    )

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/comments", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        await response.json()
        window.location.reload()
    }

    const renderCommentForm = () => {
        if (currentUser) {
            return (
                <div>
                    <p className="smLightText" style={{ marginTop: "20px", marginBottom: "5px" }}>Comment as {currentUser.username}</p>
                    <form onSubmit={handleCommentSubmit}>
                        <TextareaAutosize
                            required
                            maxLength={1000}
                            placeholder="What are your thoughts?"
                            name="text"
                            id="text"
                            className="darkBackground whiteText"
                            value={comment.text}
                            onChange={(e) => {
                                setComment({ ...comment, text: e.target.value })
                                e.target.value ? setCommentButtonDisabled(false) : setCommentButtonDisabled(true)
                            }}
                            style={{
                                padding: "10px",
                                width: "96%",
                                resize: "vertical",
                                height: "200px",
                                marginBottom: "10px"
                            }} />
                        <Button type="submit" className={`grayButton ${commentButtonDisabled ? "no-drop" : ""}`}>Comment</Button>
                    </form>
                </div>
            )
        }
    }

    let commentsDisplay = postData.Comments.map((comment, index) => {
        return (
            <CommentItem comment={comment} post_id={post_id} key={`comment${index}`} />
        )
    })

    const renderPostActions = () => {
        if (currentUser) {
            if (currentUser.username === postData.User.username) {
                return (
                    <PostActionsMenu postData={postData} setToggleEdit={setToggleEdit} toggleEdit={toggleEdit} />
                )
            }
        }
    }

    const exitShowPage = () => {
        navigate(-1)
    }

    return (
        <div>
            <div className="myContainer">
                <div className="verticalFlexLeft">
                    <p className="postText iconAndTextBox"><Article className="darkIcon" /><span className="hideOnMediaQuery">{postData.title}</span></p>
                </div>
                <div className="verticalFlexRight">
                    <Button onClick={exitShowPage} className="closePostButton"><Close className="darkIcon" />Close</Button>
                </div>
            </div>
            <div className="myContainerSmMarginTop">
                <div className="verticalFlexLeft">
                    <div className="verticalShowPageBox">
                        <div className="iconAndTextBox">
                            <Link to={`/profile/${postData.User.username}`} className="myLink">
                                <PersonOutline className="darkIcon" style={{ margin: "0" }} />
                            </Link>
                            <Link to={`/profile/${postData.User.username}`} className="myLink">
                                <span className="smLightText underlineHover">u/{postData.User.username}</span>
                            </Link>
                            <Link to="#" className="myLink" style={{ cursor: "context-menu" }}>
                                <span className="smGrayText">&nbsp;&#183; Posted by&nbsp;</span>
                            </Link>
                            <Link to={`/profile/${postData.User.username}`} className="myLink">
                                <span className="smGrayText underlineHover">u/{postData.User.username}</span>
                            </Link>
                        </div>
                        <h1 className="postTitle">{postData.title}</h1>
                        {toggleEdit ? editForm : <pre className="postText">{postData.text}</pre>}
                        {renderPostActions()}
                        {renderCommentForm()}
                        <Divider className="myDivider" />
                        {commentsDisplay}
                    </div>
                </div>
                <div className="verticalFlexRight whiteText hideOnMediaQuery">
                    <div className="verticalBoxNoHover" style={{ marginTop: "0px" }}>
                        Community
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentsPage