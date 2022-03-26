import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material'
import { SignUpContext } from '../../context/SignUpContext'
import { useContext } from 'react'

const SignUpFormDialog = () => {

  const { toggleSignUp, setToggleSignUp } = useContext(SignUpContext)

  return (
    <div>
      <Dialog open={toggleSignUp} onClose={() => setToggleSignUp(!toggleSignUp)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToggleSignUp(!toggleSignUp)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SignUpFormDialog