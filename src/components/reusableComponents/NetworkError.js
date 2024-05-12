import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function NetworkError({ setOpen, open }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleRefresh = () => {
        window.location.reload();
    };
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            message="You are currently offline."
            action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleRefresh} style={{ textTransform: 'none' }}>
                        Refresh
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    )
}
