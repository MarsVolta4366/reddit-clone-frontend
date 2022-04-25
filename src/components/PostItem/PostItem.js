import { PersonOutline } from "@mui/icons-material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"

const PostItem = ({ postData }) => {

    const { currentUser } = useContext(CurrentUserContext)

    const handleUsernameClicked = (e) => {
        e.preventDefault()
        window.location.href = `/profile/${postData.User.username}`
    }

    let postedByDisplay = (
        <span className="smGrayText">Posted by <span onClick={handleUsernameClicked} className="smGrayText underlineHover">u/{postData.User.username}</span></span>
    )

    if (currentUser) {
        if (currentUser.username === postData.User.username) {
            postedByDisplay = (
                <div className="iconAndTextBox">
                    <PersonOutline className="darkIcon" style={{ margin: "0" }} onClick={handleUsernameClicked} />
                    <p className="smLightText"><span onClick={handleUsernameClicked} className="smLightText underlineHover">u/{currentUser.username}</span> <span className="smGrayText">&#183; Posted by <span onClick={handleUsernameClicked} className="smGrayText underlineHover">u/{currentUser.username}</span></span></p>
                </div>
            )
        }
    }

    return (
        <Link to={`/comments/${postData.post_id}`} className="myLink">
            <div className="verticalBox">
                {postedByDisplay}
                <h1 className="postTitle">{postData.title}</h1>
                <pre className="postText">{postData.text}</pre>
            </div>
        </Link>
    )
}

export default PostItem