import { useEffect, useState } from "react"
import PostItem from "../PostItem/PostItem"

const PostsGallery = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://reddit-clone-backend-dfs.onrender.com/posts")
            const resData = await response.json()
            setData(resData)
        }
        fetchData()
    }, [])

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