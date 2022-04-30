import { Link } from "react-router-dom"
import PostedByDisplay from "../PostedByDisplay/PostedByDisplay"

const PostItem = ({ postData }) => {

    return (
        <Link to={`/comments/${postData.post_id}`} className="myLink">
            <div className="verticalBox">
                <PostedByDisplay username={postData.User.username} postedDate={postData.updatedAt} />
                <h1 className="postTitle">{postData.title}</h1>
                <div className="fade">
                    <pre className="postText">{postData.text}</pre>
                </div>
            </div>
        </Link>
    )
}

export default PostItem