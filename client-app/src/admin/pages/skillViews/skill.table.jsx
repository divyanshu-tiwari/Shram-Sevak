import { useState, useEffect, Fragment } from "react"
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
import skillService from "../../../utils/service/skill.service";
import categoryService from "../../../utils/service/category.service";
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

export const SkillTable = ({ setPage, navs, historyFor }) => {

    const [skillList, setSkillList] = useState([]);
    const [pageRefresh, setPageRefresh] = useState(false);
    const [responseMsg, setResponseMsg] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [associatedCategory, setAssociatedCategory] = useState()

    // dialog edit
    const [editedSkill, setEditedSkill] = useState('')
    const [formValid, setFormValid] = useState(true)
    const [openEdit, setOpenEdit] = React.useState(false)
    // dialog box functions
    const handleEditOpen = (id) => {
        skillService.getById(id)
            .then((response) => {
                setEditedSkill(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        categoryService.getAll()
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                setResponseMsg(error.response.data.message)
                setAlertSeverity('error')
            })
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };
    // handle edit
    const handleSkillEdit = (data) => {
        setEditedSkill({ ...editedSkill, skillName: data })
        if (data.trim().length === 0) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }

    const handleSaveSubmission = () => {
        if (formValid) {
            skillService.update({...editedSkill, categoryId:associatedCategory})
                .then((response) => {
                    setResponseMsg({message:"Skill updated successfully"})
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
        setAssociatedCategory(event.target.value);
    }

    // fetch data on load and change
    useEffect(() => {
        skillService.getAll().then((response) => {
            setSkillList(response.data)
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
                        {skillList.map((skill) => (
                            <StyledTableRow key={skill.id}>
                                <StyledTableCell component="th" scope="row">
                                    {skill.id}
                                </StyledTableCell>
                                <StyledTableCell>{skill.skillName}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button startIcon={<EditIcon />} onClick={() => {
                                        handleEditOpen(skill.id)
                                    }}>
                                        EDIT
                                    </Button>
                                    <Button startIcon={<DeleteIcon />} style={{ color: 'red' }} onClick={() => {
                                        skillService.delete(skill.id)
                                            .then((response) => {
                                                setResponseMsg(response.data)
                                                setAlertSeverity('success')
                                            })
                                            .catch((error) => {
                                                console.log(error)
                                                setResponseMsg({message:"An error occured"})
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
            {/* snackbar */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {responseMsg.message}
                </Alert>
            </Snackbar>
            {/* dialog */}
            <Dialog open={openEdit} onClose={handleEditClose}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Category Details
                    </DialogContentText>
                    <DialogContentText>
                        Category ID : {editedSkill.id}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Category name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedSkill.skillName}
                        onChange={(event) => handleSkillEdit(event.target.value)}
                    />
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="categoryDDL"
                        value={editedSkill.categoryId}
                        label="category"
                        onChange={handleChange}
                        fullWidth={true}
                        required='true'
                    >
                        {categories.map((category) => <MenuItem value={category.id}>{category.categoryName}</MenuItem>)}
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
