import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider
} from '@mui/material'
import { AuthenticationContext } from '../../context/AuthenticationContext'
import { useContext, useState } from 'react'
import { Close } from '@mui/icons-material'
import { CurrentUserContext } from '../../context/CurrentUserContext'

const SignUpFormDialog = () => {

  const {
    toggleSignUp, setToggleSignUp, setToggleLogIn, validateUsername
  } = useContext(AuthenticationContext)
  const { setCurrentUser } = useContext(CurrentUserContext)
  const [toggleContinue, setToggleContinue] = useState(() => false)
  const [user, setUser] = useState(() => {
    return {
      email: "",
      username: "",
      password: ""
    }
  })
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(() => false)
  const [emailValid, setEmailValid] = useState(() => true)
  const [usernameAlreadyInUse, setUsernameAlreadyInUse] = useState(() => false)
  const [usernameValid, setUsernameValid] = useState(() => true)

  // CHECK EMAIL FOR INVALID CHARACTERS, CALLED ONCHANGE AND IN checkEmailOnContinue
  const validateEmail = (email) => {
    const emailPattern = new RegExp(/^[a-zA-Z0-9_@.?-]*$/)
    const emailValidated = emailPattern.test(email)
    if (emailValidated) {
      return emailValidated
    } else {
      setEmailValid(false)
      return emailValidated
    }
  }

  const checkEmailOnContinue = async (e) => {
    e.preventDefault()

    const emailValidated = validateEmail(user.email)
    if (emailValidated) {
      // IF USER INPUT EMAIL, CHECK THAT EMAIL ISN'T ALREADY IN USE, OTHERWISE PROCEED WITH SIGN UP WITHOUT EMAIL
      if (user.email) {
        const checkUserEmail = await fetch(`https://reddit-clone-backend-dfs.herokuapp.com/users/checkEmail/${user.email}`)
        const response = await checkUserEmail.json()

        // IF EMAIL ISN'T TAKEN, PROCEED WITH SIGN UP, ELSE DISPLAY TO USER THAT EMAIL IS TAKEN
        if (response["email"] === user.email) {
          setToggleContinue(true)
          setToggleSignUp(false)
        } else {
          setEmailAlreadyInUse(true)
        }
      } else {
        setToggleContinue(true)
        setToggleSignUp(false)
      }
    }
  }

  // SUBMIT NEW USER
  const handleSubmit = async (e) => {
    e.preventDefault()

    const usernameValidated = validateUsername(user.username, setUsernameValid)

    if (usernameValidated) {
      const submitUser = await fetch("https://reddit-clone-backend-dfs.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const response = await submitUser.json()

      // DISPLAY TO USER IF USERNAME IS ALREADY TAKEN
      if (response["message"] === "username or email already in use") {
        setUsernameAlreadyInUse(true)
      } else {
        setToggleContinue(false)
        // LOG USER IN AFTER SIGN UP
        const credentials = {
          username: user.username,
          password: user.password
        }
        const responselogin = await fetch("https://reddit-clone-backend-dfs.herokuapp.com/authentication", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        })

        const userData = await responselogin.json()
        setCurrentUser(userData)
        window.location = "/"
      }
    }
  }

  return (
    <div>
      <Dialog
        open={toggleSignUp}
        onClose={() => setToggleSignUp(false)}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By continuing, you are setting up a Reddit account and agree to our User Agreement
            and Privacy Policy.
          </DialogContentText>

          <form onSubmit={checkEmailOnContinue}>
            <TextField
              inputProps={{ maxLength: 30 }}
              error={emailAlreadyInUse || !emailValid}
              helperText={emailAlreadyInUse ? "This email is already in use" : "" || emailValid ? "" : "Email invalid, try again without special characters"}
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="EMAIL"
              type="email"
              fullWidth
              variant="outlined"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value })
                setEmailAlreadyInUse(false)
                setEmailValid(true)
                validateEmail(e.target.value)
              }}
            />
            <Button
              variant="blueButton"
              type="submit"
            >Continue</Button>
          </form>

          <DialogContentText>
            Already a redditor? <Button onClick={() => {
              setToggleSignUp(false)
              setToggleLogIn(true)
            }}>LOG IN</Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions variant="myDialogActions">
          <Button onClick={() => setToggleSignUp(false)}><Close style={{ color: "gray", fontSize: "30px" }} /></Button>
        </DialogActions>
      </Dialog>

      {/* SIGN UP AFTER CONTINUE BUTTON IS CLICKED */}
      <Dialog
        open={toggleContinue}
        onClose={() => setToggleContinue(false)}
        variant="signUp">
        <DialogTitle>Choose your username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your username is how other community members will see you. This name will be
            used to credit you for things you share on Reddit. What should we call you?
          </DialogContentText>
          <Divider />
          <form onSubmit={handleSubmit}>
            <TextField
              inputProps={{ minLength: 3, maxLength: 20 }}
              error={usernameAlreadyInUse || !usernameValid}
              helperText={usernameAlreadyInUse ? "That username is already taken" : "" || usernameValid ? "" : "Letters, numbers, dashes, and underscores only."}
              autoFocus
              margin="dense"
              id="username"
              name="username"
              label="CHOOSE A USERNAME"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value })
                setUsernameAlreadyInUse(false)
                setUsernameValid(true)
                validateUsername(e.target.value, setUsernameValid)
              }}
            />
            <TextField
              inputProps={{ minLength: 8, maxLength: 50 }}
              margin="dense"
              id="password"
              name="password"
              label="PASSWORD"
              type="password"
              fullWidth
              variant="outlined"
              required
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
            <Button variant="blueButton" type="submit">Sign Up</Button>
          </form>
        </DialogContent>
        <DialogActions variant="myDialogActions">
          <Button onClick={() => setToggleContinue(false)}><Close style={{ color: "gray", fontSize: "30px" }} /></Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SignUpFormDialog