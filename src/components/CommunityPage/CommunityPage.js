import { useEffect } from "react"
import { useParams } from "react-router-dom"
import PostItem from "../PostItem/PostItem"

const CommunityPage = ({ setFetchTo, data }) => {

    const { community_name } = useParams()

    useEffect(() => {
        setFetchTo(`posts/community/${community_name}`)
    }, [community_name, setFetchTo, data])

    let communityPostsDisplay = data.map((post, index) => {
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
                    {/* <p className="postText" style={{ marginBottom: "0" }}>Created: {postedAgoText}</p> */}
                </div>
            </div>
        </div>
    )
}

export default CommunityPage