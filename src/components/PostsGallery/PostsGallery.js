import { useEffect } from "react"
import PostItem from "../PostItem/PostItem"

const PostsGallery = ({ setFetchTo, data }) => {

    useEffect(() => {
        setFetchTo("posts")
    }, [setFetchTo])

    let postsDisplay = data.map((post, index) => {
        return (
            <PostItem postData={post} key={`post${index}`} />
        )
    })

    return (
        <div>
            {postsDisplay}
        </div>
    )
}

export default PostsGallery