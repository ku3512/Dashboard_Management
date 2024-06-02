import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Navigate } from 'react-router-dom'

export default function AlertDialog({
  dialogText,
  // setLoggedIn,
  setOpen,
  open,
  successTitle,
  successResult,
  errorTitle,
  errorResult,
}) {
  // console.log(`get id is ${getId}`)

  const handleClose = () => {
    setOpen(false)
    // refreshPage()
  }

  const redirectToDashboard = () => {
    // setLoggedIn(true)
<Navigate to='/' />
refreshPage()
    // console.log('hello')
  }

  function refreshPage() {
    window.location.reload(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textAlign: 'center' }}
      >
        {dialogText == true ? (
          <>
            <DialogTitle>
              <CheckCircleOutlineIcon
                color="success"
                sx={{ width: '60px', height: '60px' }}
              />

              <br />

              {successTitle}
            </DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {successResult}
              </DialogContentText>

              <br/>

              <DialogActions>
                {/* {successBtn} */}

                <Button
                  variant="contained"
                  color="success"
                  onClick={redirectToDashboard}
                >
                  Go to dashboard
                </Button>

                <Button variant="contained" onClick={handleClose}>
                  Back
                </Button>

                {/* <Button > Ok</Button> */}
              </DialogActions>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>
              <ErrorOutlineIcon
                color="error"
                sx={{ width: '60px', height: '60px' }}
              />

              <br />

              {errorTitle}
            </DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {errorResult}
              </DialogContentText>

              <DialogActions>
                <Button variant="contained" color="error" onClick={handleClose}>
                 
                 Ok
                </Button>
              </DialogActions>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  )
}
