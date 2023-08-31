import * as React from 'react';
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button, Select, MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import categoryService from "../../../utils/service/category.service";
import { useState, useEffect } from "react";
import skillService from '../../../utils/service/skill.service';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AddSkill = ({ setPage, navs }) => {

    const [skillToAdd, setSkillToAdd] = useState('')
    const [associatedCategory, setAssociatedCategory] = useState()
    const [responseMsg, setResponseMsg] = useState('')
    let alertSeverity = 'success'
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([]);

    useEffect(() => {
        categoryService.getAll()
        .then((response) => {
            setCategories(response.data)
        })
        .catch((error) => {
            setResponseMsg(error.response.data.message)
            alertSeverity='error'
        })
    }, [])

    const handleInput = (data) => {
        setSkillToAdd(data)
    }

    const handleChange = (event) => {
        setAssociatedCategory(event.target.value);
    }

    const addSkill = (e) => {
        e.preventDefault()
        const data = { skillName: skillToAdd, categoryId: associatedCategory }
        skillService.add(data).then((response) => {
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
                <form onSubmit={(e) => { addSkill(e); setOpen(true) }}>
                    <FormControl align='center' required='true' fullWidth={true}>
                        <InputLabel htmlFor="my-input">Skill Name</InputLabel>
                        <Input id="skill-name" aria-describedby="Enter skill" value={skillToAdd} onChange={(e) => handleInput(e.target.value)}  />
                        <FormHelperText id="my-helper-text">Example : Cleaning</FormHelperText>
                    </FormControl>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="categoryDDL"
                        value={associatedCategory}
                        label="category"
                        onChange={handleChange}
                        fullWidth={true}
                        required='true'
                    >
                        {categories.map((category) => <MenuItem value={category.id}>{category.categoryName}</MenuItem>)}
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

