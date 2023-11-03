import { useState } from "react"
import { Button, Divider, Input } from "@mui/material"

const CreatePostForm = () => {

    const [post, setPost] = useState({
        title: "",
        text: "",
        community_name: ""
    })
    let newPostForm = null
    const [postButtonDisabled, setPostButtonDisabled] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("https://reddit-clone-backend-dfs.onrender.com/posts", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })

        await response.json()
        window.location = "/"
    }

    newPostForm = (
        <div className="myContainer">
            <div className="verticalFlexLeft">
                <h1 className="whiteText darkHeader" style={{ marginBottom: "10px" }}>Create a post</h1>
                <Divider className="myDivider" />
                <div className="createPostFormBox">
                    <form onSubmit={handleSubmit}>
                        <Input
                            required
                            inputProps={{ maxLength: 21 }}
                            name="community_name"
                            id="community_name"
                            variant="darkInput"
                            disableUnderline={true}
                            placeholder="Community"
                            style={{ marginBottom: "10px", background: "none" }}
                            value={post.community_name}
                            onChange={(e) => {
                                setPost({ ...post, community_name: e.target.value })
                                e.target.value && post.title ? setPostButtonDisabled(false) : setPostButtonDisabled(true)
                            }} />
                        <Input
                            required
                            inputProps={{ maxLength: 60 }}
                            name="title"
                            id="title"
                            variant="darkInput"
                            disableUnderline={true}
                            placeholder="Title"
                            value={post.title}
                            onChange={(e) => {
                                setPost({ ...post, title: e.target.value })
                                e.target.value && post.community_name ? setPostButtonDisabled(false) : setPostButtonDisabled(true)
                            }}
                            style={{ marginBottom: "10px", background: "none" }}
                        />
                        <textarea
                            maxLength={10000}
                            rows="10"
                            placeholder="Text (optional)"
                            name="text"
                            id="text"
                            value={post.text}
                            onChange={(e) => setPost({ ...post, text: e.target.value })}
                            className="darkTextarea"></textarea>
                        <Divider className="myDivider" />
                        <Button type="submit" className={`grayButton ${postButtonDisabled ? "no-drop" : ""}`}>Post</Button>
                    </form>
                </div>
            </div>
            <div className="verticalFlexRight hideOnMediaQuery">
                <div className="verticalBox" id="topCommunities">
                    <h2 className="whiteText darkHeader">Posting to Reddit</h2>
                    <Divider className="myListDivider" />
                    <p className="whiteText">1.Remember the human</p>
                    <Divider className="myListDivider" />

                    <p className="whiteText">2.Behave like you would in real life</p>
                    <Divider className="myListDivider" />

                    <p className="whiteText">3.Look for the original source of content</p>
                    <Divider className="myListDivider" />

                    <p className="whiteText">4.Search for duplicates before posting</p>
                    <Divider className="myListDivider" />

                    <p className="whiteText">5.Read the community's rules</p>
                    <Divider className="myListDivider" />

                </div>
            </div>
        </div>
    )

    return newPostForm
}

export default CreatePostForm