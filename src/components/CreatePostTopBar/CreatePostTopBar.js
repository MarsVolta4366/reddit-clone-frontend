import { PersonOutline, FiberManualRecord, Image, Link as MuiLink } from "@mui/icons-material"
import { Button, Input } from '@mui/material'
import { useContext } from "react"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { Link } from "react-router-dom"

const CreatePostTopBar = () => {

    const { currentUser } = useContext(CurrentUserContext)

    let createPostInput = (
        <h2 className="whiteText">Popular posts</h2>
    )

    if (currentUser) {
        createPostInput = (
            <div className="createPostContentBox">
                <Button>
                    <PersonOutline style={{ color: "gray", fontSize: "30px" }} />
                    <FiberManualRecord style={{ color: "#46D160", fontSize: "15px", marginLeft: "-15px", marginTop: "13px", border: "1px solid #212222", borderRadius: "50%", padding: "0px", backgroundColor: "#212222" }} />
                </Button>
                <Link to="/createPost" style={{ width: "100%" }} className="myLink">
                    <Input
                        variant="darkInput"
                        disableUnderline={true}
                        placeholder="Create Post" />
                </Link>
                <Link to="/createPost">
                    <Image className="contentIcon" />
                </Link>
                <Link to="/createPost">
                    <MuiLink className="contentIcon" />
                </Link>
            </div>
        )
    }

    return createPostInput
}

export default CreatePostTopBar