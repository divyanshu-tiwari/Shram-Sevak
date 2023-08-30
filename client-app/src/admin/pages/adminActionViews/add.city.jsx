import * as React from 'react';
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button, Select, MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import stateService from "../../../utils/service/state.service";
import { useState, useEffect } from "react";
import cityService from '../../../utils/service/city.service';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AddCity = ({ setPage, navs }) => {

    const [cityToAdd, setCityToAdd] = useState('')
    const [associatedState, setAssociatedState] = useState()
    const [responseMsg, setResponseMsg] = useState('')
    let alertSeverity = 'success'
    const [open, setOpen] = React.useState(false);
    const [states, setStates] = React.useState([]);

    useEffect(() => {
        stateService.getAll()
        .then((response) => {
            setStates(response.data)
        })
        .catch((error) => {
            setResponseMsg(error.response.data.message)
            alertSeverity='error'
        })
    }, [])

    const handleInput = (data) => {
        setCityToAdd(data)
    }

    const handleChange = (event) => {
        setAssociatedState(event.target.value);
    }

    const addCity = (e) => {
        e.preventDefault()
        const data = { city: cityToAdd, stateId: associatedState }
        cityService.add(data).then((response) => {
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
                <form onSubmit={(e) => { addCity(e); setOpen(true) }}>
                    <FormControl align='center' required='true' fullWidth={true}>
                        <InputLabel htmlFor="my-input">City Name</InputLabel>
                        <Input id="city-name" aria-describedby="Enter name of the city" value={cityToAdd} onChange={(e) => handleInput(e.target.value)}  />
                        <FormHelperText id="my-helper-text">Example : Nashik</FormHelperText>
                    </FormControl>
                    <InputLabel id="state-label">State</InputLabel>
                    <Select
                        labelId="state"
                        id="stateDDL"
                        value={associatedState}
                        label="state"
                        onChange={handleChange}
                        fullWidth={true}
                        required='true'
                    >
                        {states.map((state) => <MenuItem value={state.id}>{state.state}</MenuItem>)}
                    </Select>
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

