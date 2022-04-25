import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useContext, useState } from "react"
import { AuthenticationContext } from "../../context/AuthenticationContext"
import { CurrentUserContext } from '../../context/CurrentUserContext'

const LogInFormDialogue = () => {

    const {
        toggleLogIn, setToggleLogIn, setToggleSignUp, validateUsername
    } = useContext(AuthenticationContext)
    const [credentials, setCredentials] = useState(() => {
        return {
            username: "",
            password: ""
        }
    })
    const [loginIncorrect, setLoginIncorrect] = useState(() => false)
    const [usernameValid, setUsernameValid] = useState(() => true)

    const { setCurrentUser } = useContext(CurrentUserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const usernameValidated = validateUsername(credentials.username, setUsernameValid)

        if (usernameValidated) {
            const response = await fetch("http://localhost:4000/authentication", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            const userData = await response.json()

            // IF LOGIN SUCCESS, SET CURRENT USER CONTEXT, ELSE DISPLAY TO USER USERNAME OR PASSWORD INCORRECT
            if (response.status === 200) {
                setCurrentUser(userData)
                setToggleLogIn(false)
            } else {
                setLoginIncorrect(true)
            }
        }
    }

    return (
        <div>
            <Dialog
                open={toggleLogIn}
                onClose={() => setToggleLogIn(false)}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        By continuing, you are setting up a Reddit account and agree to our User Agreement
                        and Privacy Policy.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            inputProps={{ minLength: 3, maxLength: 20 }}
                            error={loginIncorrect || !usernameValid}
                            helperText={loginIncorrect ? "Incorrect username or password" : "" || usernameValid ? "" : "Letters, numbers, dashes, and underscores only."}
                            autoFocus
                            margin="dense"
                            id="username"
                            name="username"
                            label="USERNAME"
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            value={credentials.username}
                            onChange={(e) => {
                                setCredentials({ ...credentials, username: e.target.value })
                                setLoginIncorrect(false)
                                setUsernameValid(true)
                                validateUsername(e.target.value, setUsernameValid)
                            }}
                        />
                        <TextField
                            inputProps={{ minLength: 8, maxLength: 50 }}
                            error={loginIncorrect}
                            margin="dense"
                            id="password"
                            name="password"
                            label="PASSWORD"
                            type="password"
                            fullWidth
                            variant="outlined"
                            required
                            value={credentials.password}
                            onChange={(e) => {
                                setCredentials({ ...credentials, password: e.target.value })
                                setLoginIncorrect(false)
                            }}
                        />
                        <Button
                            variant="blueButton"
                            type="submit"
                        >Log In</Button>
                    </form>

                    <DialogContentText>
                        New to Reddit?<Button onClick={() => {
                            setToggleLogIn(false)
                            setToggleSignUp(true)
                        }}>SIGN UP</Button>
                    </DialogContentText>
                </DialogContent>
                <DialogActions variant="myDialogActions">
                    <Button onClick={() => setToggleLogIn(false)}><Close style={{ color: "gray", fontSize: "30px" }} /></Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LogInFormDialogue