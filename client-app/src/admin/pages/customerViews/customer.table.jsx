import { useState, useEffect } from "react"
import CustomerService from "../../../utils/service/customer.service";
import { Table, TableHead, TableBody } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';

export const CustomerTable = ({ setPage, navs, historyFor }) => {

    const [customerList, setCustomerList] = useState([]);
    const [pageRefresh, setPageRefresh] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
        CustomerService.getAll().then((response) => {
            setCustomerList(response.data)
        })
    }, [pageRefresh])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell >First Name</StyledTableCell>
                            <StyledTableCell >Last Name</StyledTableCell>
                            <StyledTableCell >Email</StyledTableCell>
                            <StyledTableCell >Contact</StyledTableCell>
                            <StyledTableCell >Gender</StyledTableCell>
                            <StyledTableCell >Status</StyledTableCell>
                            <StyledTableCell align="center" >ACTION</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerList.map((customer) => (
                            <StyledTableRow key={customer.id}>
                                <StyledTableCell component="th" scope="row">
                                    {customer.id}
                                </StyledTableCell>
                                <StyledTableCell>{customer.firstName}</StyledTableCell>
                                <StyledTableCell>{customer.lastName}</StyledTableCell>
                                <StyledTableCell>{customer.email}</StyledTableCell>
                                <StyledTableCell>{customer.contact}</StyledTableCell>
                                <StyledTableCell>{customer.gender}</StyledTableCell>
                                <StyledTableCell>{customer.status}</StyledTableCell>
                                <StyledTableCell>
                                    <Button startIcon={<HistoryIcon />} onClick={() => {
                                        historyFor(customer.id)
                                        setPage(navs.history)
                                        }}>
                                        ORDER HISTORY
                                    </Button>

                                    {customer.status ==='ACTIVE' && <Button style={{color:'red'}} startIcon={<BlockIcon  />} onClick={() => {
                                        CustomerService.suspendAccount(customer.id)
                                        setPageRefresh(!pageRefresh)
                                        }} >
                                        SUSPEND ACCOUNT
                                    </Button>}
                                    {customer.status === 'SUSPENDED' && <Button style={{color:'green'}} startIcon={<CheckIcon  />} onClick={() => {
                                        CustomerService.activateAccount(customer.id)
                                        setPageRefresh(!pageRefresh)
                                        }} >
                                        ACTIVATE ACCOUNT
                                    </Button>}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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


