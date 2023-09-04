import * as React from 'react';
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button, Select, MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import cityService from "../../../utils/service/city.service";
import { useState, useEffect } from "react";
import localityService from '../../../utils/service/locality.service';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AddLocality = ({ setPage, navs }) => {

    const [localityToAdd, setLocalityToAdd] = useState('')
    const [associatedCity, setAssociatedCity] = useState()
    const [pincode, setPincode] = useState()
    const [responseMsg, setResponseMsg] = useState('')
    let alertSeverity = 'success'
    const [open, setOpen] = React.useState(false);
    const [cities, setCities] = React.useState([]);

    useEffect(() => {
        cityService.getAll()
        .then((response) => {
            setCities(response.data)
        })
        .catch((error) => {
            setResponseMsg(error.response.data.message)
            alertSeverity='error'
        })
    }, [])

    const handleInput = (data) => {
        setLocalityToAdd(data)
    }

    const handleChange = (event) => {
        setAssociatedCity(event.target.value);
    }

    const handlePinCode = (data) => {
        setPincode(data)
    }

    const addLocality = (e) => {
        e.preventDefault()
        const data = { locality: localityToAdd, pincode: pincode, cityId: associatedCity }
        localityService.add(data).then((response) => {
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
                <form onSubmit={(e) => { addLocality(e); setOpen(true) }}>
                    <FormControl align='center' required='true' fullWidth={true}>
                        <InputLabel htmlFor="my-input">Locality Name</InputLabel>
                        <Input id="locality-name" aria-describedby="Enter name of the Locality" value={localityToAdd} onChange={(e) => handleInput(e.target.value)}  />
                    </FormControl>
                    <FormControl align='center' required='true' fullWidth={true}>
                        <InputLabel htmlFor="my-input">Pin code</InputLabel>
                        <Input type='number' id="pincode" aria-describedby="Enter pin code" value={pincode} onChange={(e) => handlePinCode(e.target.value)}  />
                    </FormControl>
                    <InputLabel id="city-label">City</InputLabel>
                    <Select
                        labelId="city"
                        id="cityDDL"
                        value={associatedCity}
                        label="city"
                        onChange={handleChange}
                        fullWidth={true}
                        required='true'
                    >
                        {cities.map((city) => <MenuItem value={city.id}>{city.city}</MenuItem>)}
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

