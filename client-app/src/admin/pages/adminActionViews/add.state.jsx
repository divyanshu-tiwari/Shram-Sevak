import * as React from 'react';
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button, Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import stateService from "../../../utils/service/state.service";
import { useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AddState = ({ setPage, navs }) => {

    const [stateToAdd, setStateToAdd] = useState('')
    const [responseMsg, setResponseMsg] = useState('')
    let alertSeverity = 'success'
    const [open, setOpen] = React.useState(false);

    const handleInput = (data) => {
        setStateToAdd(data)
    }

    const addState = (e) => {
        e.preventDefault()
        const data = {state: stateToAdd}
        stateService.add(data).then((response) => {
            setResponseMsg(response.data)
            alertSeverity = 'success'
        }).catch((error) => {
            setResponseMsg(error.response.data.message)
            alertSeverity = 'error'
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={() => setPage(navs.dashboard)}>
                <ArrowBackIcon />
            </IconButton>
            <Container>
                <form onSubmit={(e) => {addState(e); setOpen(true)}}>
                    <FormControl align='center' sx={8} required='true' fullWidth={true}>
                        <InputLabel htmlFor="my-input">State Name</InputLabel>
                        <Input id="state-name" aria-describedby="Enter name of the state" value={stateToAdd} onChange={(e) => handleInput(e.target.value)} />
                        <FormHelperText id="my-helper-text">Example : Goa</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Button type="submit">ADD</Button>
                    </FormControl>
                </form>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {responseMsg.message}
                </Alert>
            </Snackbar>
        </>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
