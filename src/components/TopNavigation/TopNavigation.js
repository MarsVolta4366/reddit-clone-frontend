import "./TopNavigation.css"
import { KeyboardArrowDownOutlined, PersonOutline, Search } from "@mui/icons-material"
import { Button, Input, InputAdornment } from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material"
import { useContext } from "react"
import { SignUpContext } from "../../context/SignUpContext"

const theme = createTheme({
    components: {
        MuiInput: {
            variants: [
                {
                    props: {
                        variant: "darkInput"
                    },
                    style: {
                        color: "white",
                        backgroundColor: "#353538",
                        border: "1px solid #424242",
                        borderRadius: "5px",
                        width: "600px",
                        marginLeft: "auto",
                        height: "35px",
                        "&:hover": {
                            border: "1px solid white",
                            backgroundColor: "#212222"
                        },
                        "&.Mui-focused": {
                            border: "1px solid white",
                            backgroundColor: "#212222"
                        }
                    }
                }
            ]
        },
        MuiButton: {
            variants: [
                {
                    props: {
                        variant: "darkButton"
                    },
                    style: {
                        height: "35px",
                        padding: "0",
                        margin: "0 10px 0 10px",
                        "&:hover": {
                            border: "1px solid #424242"
                        }
                    }
                }
            ]
        }
    }
})

const TopNavigation = () => {

    const { toggleSignUp, setToggleSignUp } = useContext(SignUpContext)

    return (
        <header id="topNavigation">

            <div id="redditLogoContainer">
                <img src="./Reddit-Logo.png" alt="Reddit logo" id="redditLogo" />
            </div>

            <ThemeProvider theme={theme}>
                <Input
                    variant="darkInput"
                    disableUnderline={true}
                    placeholder="Search Reddit"
                    startAdornment={
                        <InputAdornment position="start">
                            <Search style={{ color: "gray", fontSize: "30px" }} />
                        </InputAdornment>
                    } />

                <Button id="logInButton">Log In</Button>
                <Button id="signUpButton" onClick={() => setToggleSignUp(!toggleSignUp)}>Sign Up</Button>

                <Button variant="darkButton">
                    <PersonOutline style={{ color: "gray", fontSize: "30px" }} />
                    <KeyboardArrowDownOutlined style={{ color: "gray", fontSize: "25px" }} />
                </Button>
            </ThemeProvider>
        </header>
    )
}

export default TopNavigation