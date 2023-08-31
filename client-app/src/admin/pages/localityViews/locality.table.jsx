import { useState, useEffect } from "react"
import { Table, TableHead, TableBody, MenuItem, InputLabel, Select } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import localityService from "../../../utils/service/locality.service";
import cityService from "../../../utils/service/city.service";
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

export const LocalityTable = () => {

    const [localityList, setLocalityList] = useState([]);
    const [pageRefresh, setPageRefresh] = useState(false);
    const [responseMsg, setResponseMsg] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [open, setOpen] = React.useState(false);
    const [cities, setCities] = useState([])
    const [associatedCity, setAssociatedCity] = useState(null)

    // dialog edit
    const [pincode, setPincode] = useState()
    const [editedLocality, setEditedLocality] = useState('')
    const [formValid, setFormValid] = useState(true)
    const [openEdit, setOpenEdit] = React.useState(false)
    // dialog box functions
    const handleEditOpen = (id) => {
        localityService.getById(id)
            .then((response) => {
                setEditedLocality(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        cityService.getAll()
            .then((response) => {
                setCities(response.data)
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
    const handleLocalityEdit = (data) => {
        setEditedLocality({ ...editedLocality, locality: data })
        if (data.trim().length === 0) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }

    const handlePinCode = (data) => {
        setEditedLocality({ ...editedLocality, pincode: data })
        if (data.trim().length === 0) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }

    const handleSaveSubmission = () => {
        if (formValid) {
            localityService.update({ ...editedLocality, cityId: associatedCity })
                .then((response) => {
                    setResponseMsg({ message: "Skill updated successfully" })
                    setAlertSeverity('success')
                })
                .catch((error) => {
                    console.log(error)
                    setResponseMsg({ message: "An error occured : could not update" })
                    setAlertSeverity('error')
                })
        } else {
            setResponseMsg({ message: "Invalid value" })
            setAlertSeverity('error')
        }
        handleEditClose()
        setOpen(true)
    }

    const handleChange = (event) => {
        setAssociatedCity(event.target.value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    // fetch data on load and change
    useEffect(() => {

        localityService.getAll().then((response) => {
            setLocalityList(response.data)
        })
    }, [pageRefresh, open])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell >Name</StyledTableCell>
                            <StyledTableCell >Pin code</StyledTableCell>
                            <StyledTableCell align="center" >ACTION</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {localityList.map((locality) => (
                            <StyledTableRow key={locality.id}>
                                <StyledTableCell component="th" scope="row">
                                    {locality.id}
                                </StyledTableCell>
                                <StyledTableCell>{locality.locality}</StyledTableCell>
                                <StyledTableCell>{locality.pincode}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button startIcon={<EditIcon />} onClick={() => {
                                        handleEditOpen(locality.id)
                                    }}>
                                        EDIT
                                    </Button>
                                    <Button startIcon={<DeleteIcon />} style={{ color: 'red' }} onClick={() => {
                                        localityService.delete(locality.id)
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
            {/* snack bar */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {responseMsg.message}
                </Alert>
            </Snackbar>
            {/* dialog */}
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Locality</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Locality Details
                    </DialogContentText>
                    <DialogContentText>
                        Locality ID : {editedLocality.id}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Locality name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedLocality.locality}
                        onChange={(event) => handleLocalityEdit(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="pin-code"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedLocality.pincode}
                        onChange={(event) => handlePinCode(event.target.value)}
                    />
                    <InputLabel id="City-label">City</InputLabel>
                    <Select
                        labelId="City-label"
                        id="CityDDL"
                        value={editedLocality.cityId}
                        label="City"
                        onChange={handleChange}
                        fullWidth={true}
                        required='true'
                    >
                        {cities.map((city) => <MenuItem value={city.id}>{city.city}</MenuItem>)}
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


