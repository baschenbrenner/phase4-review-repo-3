import { Alert, Snackbar } from "@mui/material";
// import makeStyles from "@mui/material";
import React from "react";

function Notification(props) {
  const {notify, setNotify} = props;

//   const useStyles = makeStyles(theme=>({
//     root:{
//         top: theme.spacing(9)
//     }
//   }));

  function handleClose(event, reason) {
    if(reason === 'clickaway'){
        return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  }

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    //   className={useStyles.root}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
