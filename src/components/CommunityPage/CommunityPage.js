import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostItem from "../PostItem/PostItem"

const CommunityPage = () => {

    const { community_name } = useParams()
    const [communityPosts, setCommunityPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:4000/posts/community/${community_name}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            setCommunityPosts(data)
        }
        fetchPosts()
    }, [community_name])

    let communityPostsDisplay = communityPosts.map((post, index) => {
        return (
            <PostItem postData={post} key={`profilePost${index}`} />
        )
    })

    return (
        <div className="myContainer">
            <div className="verticalFlexLeft">
                <h2 className="whiteText">Posts in r/{community_name}</h2>
                <div className="whiteText">{communityPostsDisplay}</div>
            </div>
            <div className="verticalFlexRight whiteText hideOnMediaQuery">
                <div className="verticalBoxCenteredNoHover">
                    <h2>About Community</h2>
                </div>
            </div>
        </div>
    )
}

export default CommunityPage