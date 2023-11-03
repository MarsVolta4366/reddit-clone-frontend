import { Article, Close } from "@mui/icons-material"
import { Button, Divider } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import CommentItem from "../CommentItem/CommentItem"
import PostActionsMenu from "../PostActionsMenu/PostActionsMenu"
import PostedAgo from "../PostedAgo/PostedAgo"
import PostedByDisplay from "../PostedByDisplay/PostedByDisplay"

const CommentsPage = () => {

    const { currentUser } = useContext(CurrentUserContext)
    const [toggleEdit, setToggleEdit] = useState(false)
    const { post_id } = useParams()
    const [postData, setPostData] = useState({ User: { username: null }, Comments: [], Community: { community_name: "", createdAt: "" } })
    const [comment, setComment] = useState({ post_id: post_id, text: "" })
    const [commentButtonDisabled, setCommentButtonDisabled] = useState(true)
    const [postedAgoText, setPostedAgoText] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`https://reddit-clone-backend-dfs.onrender.com/posts/comments/${post_id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            setPostData(data)
            setPostedAgoText(<PostedAgo postedDate={data.Community.createdAt} />)
        }
        fetchPost()
    }, [post_id, toggleEdit])

    const updatePost = async (e) => {
        e.preventDefault()
        await fetch("https://reddit-clone-backend-dfs.onrender.com/posts", {
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
            <textarea
                maxLength={10000}
                rows="10"
                placeholder="Text (optional)"
                className="darkTextarea"
                value={postData.text}
                onChange={(e) => setPostData({ ...postData, text: e.target.value })}></textarea>
            <div style={{ float: "right", marginTop: "5px" }}>
                <Button className="lightTextButton" onClick={() => setToggleEdit(false)}>Cancel</Button>
                <Button type="submit" className="grayButton">Save</Button>
            </div>
        </form>
    )

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("https://reddit-clone-backend-dfs.onrender.com/comments", {
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
                        <textarea
                            required
                            maxLength={1000}
                            rows="10"
                            placeholder="What are your thoughts?"
                            name="text"
                            id="text"
                            className="darkTextarea"
                            value={comment.text}
                            onChange={(e) => {
                                setComment({ ...comment, text: e.target.value })
                                e.target.value ? setCommentButtonDisabled(false) : setCommentButtonDisabled(true)
                            }}></textarea>
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
                        <PostedByDisplay username={postData.User.username} postedDate={postData.updatedAt} communityName={postData.Community.community_name} />
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
                        <h1 className="postText">r/{postData.Community.community_name}</h1>
                        <p className="postText" style={{ marginBottom: "0" }}>Created: {postedAgoText}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentsPage