import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostedAgo from "../PostedAgo/PostedAgo"
import PostItem from "../PostItem/PostItem"

const CommunityPage = () => {

    const { community_name } = useParams()
    const [communityPosts, setCommunityPosts] = useState([])
    const [postedAgoText, setPostedAgoText] = useState("")

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
            setPostedAgoText(<PostedAgo postedDate={data[0].Community.createdAt} />)
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
                <div className="verticalBoxNoHover">
                    <h1 className="postText">About Community</h1>
                    <p className="postText" style={{ marginBottom: "0" }}>Created: {postedAgoText}</p>
                </div>
            </div>
        </div>
    )
}

export default CommunityPage