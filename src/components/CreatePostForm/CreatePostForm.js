import { useState } from "react"
import { Button, Divider, Input, TextareaAutosize } from "@mui/material"

const CreatePostForm = () => {

    const [post, setPost] = useState({
        title: "",
        text: ""
    })
    let newPostForm = null
    const [postButtonDisabled, setPostButtonDisabled] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:4000/posts", {
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
                            inputProps={{ maxLength: 60 }}
                            name="title"
                            id="title"
                            variant="darkInput"
                            disableUnderline={true}
                            placeholder="Title"
                            value={post.title}
                            onChange={(e) => {
                                setPost({ ...post, title: e.target.value })
                                e.target.value ? setPostButtonDisabled(false) : setPostButtonDisabled(true)
                            }}
                            style={{ marginBottom: "10px", background: "none" }}
                        />
                        <TextareaAutosize
                            maxLength={1000}
                            placeholder="Text (optional)"
                            name="text"
                            id="text"
                            value={post.text}
                            onChange={(e) => setPost({ ...post, text: e.target.value })}
                            className="darkBackground whiteText"
                            style={{
                                padding: "10px",
                                width: "96%",
                                resize: "vertical",
                                height: "200px"
                            }} />
                        <Divider className="myDivider" />
                        <Button type="submit" className={`grayButton ${postButtonDisabled ? "no-drop" : ""}`}>Post</Button>
                    </form>
                </div>
            </div>
            <div className="verticalFlexRight">
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