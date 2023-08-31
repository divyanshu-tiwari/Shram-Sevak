import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import orderService from '../../../utils/service/order.service';
import { Table, TableHead, TableBody } from "@mui/material";
import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export const CustomerHistory = ({ setPage, navs, customerId }) => {

    const [history, setHistory] = useState([])

    useEffect(() => {
        orderService.getByCustomerId(customerId)
            .then((response) =>
                setHistory(response.data)
            )
            // .catch((error) => {
            //     console.log(error.response.data.message)
            // })
    }, [])

    return (
        <>
            <IconButton onClick={() => setPage(navs.customerDash)}>
                <ArrowBackIcon />
            </IconButton>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell >Title</StyledTableCell>
                            <StyledTableCell >Description</StyledTableCell>
                            <StyledTableCell >Status</StyledTableCell>
                            <StyledTableCell >Start Time</StyledTableCell>
                            <StyledTableCell >End Time</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((order) => (
                            <StyledTableRow key={order.id}>
                                <StyledTableCell component="th" scope="row">
                                    {order.id}
                                </StyledTableCell>
                                <StyledTableCell>{order.title}</StyledTableCell>
                                <StyledTableCell>{order.description}</StyledTableCell>
                                <StyledTableCell>{order.status}</StyledTableCell>
                                <StyledTableCell>{order.startTime}</StyledTableCell>
                                <StyledTableCell>{order.endTime}</StyledTableCell>
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

