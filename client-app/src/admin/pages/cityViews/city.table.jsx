import { useState, useEffect } from "react"
import { Table, TableHead, TableBody, InputLabel, Select, MenuItem } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import cityService from "../../../utils/service/city.service";
import stateService from "../../../utils/service/state.service";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// Dialog imports
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CityTable = () => {

    const [cityList, setCityList] = useState([]);
    const [pageRefresh, setPageRefresh] = useState(false);
    const [responseMsg, setResponseMsg] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [open, setOpen] = React.useState(false);
    const [states, setStates] = useState([])
    const [associatedState, setAssociatedState] = useState(null)

    // dialog edit
    const [editedCity, setEditedCity] = useState('')
    const [formValid, setFormValid] = useState(true)
    const [openEdit, setOpenEdit] = React.useState(false)
    // dialog box functions
    const handleEditOpen = (id) => {
        cityService.getById(id)
            .then((response) => {
                setEditedCity(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        stateService.getAll()
            .then((response) => {
                setStates(response.data)
            })
            .catch((error) => {
                console.log(error)
                setResponseMsg({ message: "An error occured" })
                setAlertSeverity('error')
            })
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };
    // handle edit
    const handleCityEdit = (data) => {
        setEditedCity({ ...editedCity, city: data })
        if (data.trim().length === 0) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }

    const handleSaveSubmission = () => {
        if (formValid) {
            cityService.update({ ...editedCity, stateId: associatedState })
                .then((response) => {
                    setResponseMsg({ message: "Skill updated successfully" })
                    setAlertSeverity('success')
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            setResponseMsg({ message: "Invalid value" })
            setAlertSeverity('error')
        }
        handleEditClose()
        setOpen(true)
    }

    const handleChange = (event) => {
        setAssociatedState(event.target.value);
    }


    // fetch data on load and change
    useEffect(() => {
        cityService.getAll().then((response) => {
            setCityList(response.data)
        })
    }, [pageRefresh, open])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell >Name</StyledTableCell>
                            <StyledTableCell align="center" >ACTION</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cityList.map((city) => (
                            <StyledTableRow key={city.id}>
                                <StyledTableCell component="th" scope="row">
                                    {city.id}
                                </StyledTableCell>
                                <StyledTableCell>{city.city}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button startIcon={<EditIcon />} onClick={() => {
                                        handleEditOpen(city.id)
                                    }}>
                                        EDIT
                                    </Button>
                                    <Button startIcon={<DeleteIcon />} style={{ color: 'red' }} onClick={() => {
                                        cityService.delete(city.id)
                                            .then((response) => {
                                                setResponseMsg(response.data)
                                                setAlertSeverity('success')
                                            })
                                            .catch((error) => {
                                                console.log(error)
                                                setResponseMsg({message:"An error occured : could not delete"})
                                                setAlertSeverity('error')
                                            })
                                        setOpen(true)
                                    }}>
                                        DELETE
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {responseMsg.message}
                </Alert>
            </Snackbar>
            {/* dialog */}
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit City</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        City Details
                    </DialogContentText>
                    <DialogContentText>
                        City ID : {editedCity.id}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Category name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedCity.city}
                        onChange={(event) => handleCityEdit(event.target.value)}
                    />
                    <InputLabel id="State-label">State</InputLabel>
                    <Select
                        labelId="State-label"
                        id="StateDDL"
                        value={editedCity.stateId}
                        label="category"
                        onChange={handleChange}
                        fullWidth={true}
                        required='true'
                    >
                        {states.map((state) => <MenuItem value={state.id}>{state.state}</MenuItem>)}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleSaveSubmission}>SAVE</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


