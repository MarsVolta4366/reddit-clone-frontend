import { PersonOutline } from "@mui/icons-material"
import PostedAgo from "../PostedAgo/PostedAgo"

const PostedByDisplay = ({ username, postedDate }) => {

    let postedMessage
    if (postedDate) {
        postedMessage = <PostedAgo postedDate={postedDate} />
    }

    const handleUsernameClicked = (e) => {
        e.preventDefault()
        window.location.href = `/profile/${username}`
    }

    return (
        <div className="iconAndTextBox">
            <PersonOutline className="darkIcon cursorPointer" style={{ margin: "0" }} onClick={handleUsernameClicked} />
            <p className="smLightText"><span onClick={handleUsernameClicked} className="smLightText underlineHover cursorPointer">u/{username}</span> <span className="smGrayText">&#183; Posted by <span onClick={handleUsernameClicked} className="smGrayText underlineHover cursorPointer">u/{username}</span>{postedMessage}</span></p>
        </div>
    )
}

export default PostedByDisplay