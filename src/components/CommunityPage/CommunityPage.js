import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostItem from "../PostItem/PostItem"

const CommunityPage = () => {

    const { community_id } = useParams()
    const [communityPosts, setCommunityPosts] = useState([])
    const [communityName, setCommunityName] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:4000/posts/community/${community_id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            setCommunityPosts(data)
            setCommunityName(data[0].Community.community_name)
        }
        fetchPosts()
    }, [community_id])

    let communityPostsDisplay = communityPosts.map((post, index) => {
        return (
            <PostItem postData={post} key={`profilePost${index}`} />
        )
    })

    return (
        <div className="myContainer">
            <div className="verticalFlexLeft">
                <h2 className="whiteText">Posts in r/{communityName}</h2>
                <div className="whiteText">{communityPostsDisplay}</div>
            </div>
            <div className="verticalFlexRight whiteText hideOnMediaQuery">

            </div>
        </div>
    )
}

export default CommunityPage