import PostItem from "../PostItem/PostItem"

const PostsGallery = ({ data }) => {

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