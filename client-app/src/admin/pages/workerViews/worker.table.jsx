import { useState, useEffect } from "react"
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
import workerService from "../../../utils/service/worker.service";

export const WorkerTable = ({ setPage, navs, historyFor }) => {

    const [workerList, setWorkerList] = useState([]);
    const [pageRefresh, setPageRefresh] = useState(false);

    useEffect(() => {
        workerService.getAll().then((response) => {
            setWorkerList(response.data)
        })
        .catch((error) => {
            console.log(error)
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
                        {workerList.map((worker) => (
                            <StyledTableRow key={worker.id}>
                                <StyledTableCell component="th" scope="row">
                                    {worker.id}
                                </StyledTableCell>
                                <StyledTableCell>{worker.firstName}</StyledTableCell>
                                <StyledTableCell>{worker.lastName}</StyledTableCell>
                                <StyledTableCell>{worker.email}</StyledTableCell>
                                <StyledTableCell>{worker.contact}</StyledTableCell>
                                <StyledTableCell>{worker.gender}</StyledTableCell>
                                <StyledTableCell>{worker.status}</StyledTableCell>
                                <StyledTableCell>
                                    <Button startIcon={<HistoryIcon />} onClick={() => {
                                        historyFor(worker.id)
                                        setPage(navs.history)
                                        }}>
                                        ORDER HISTORY
                                    </Button>

                                    {worker.status ==='ACTIVE' && <Button style={{color:'red'}} startIcon={<BlockIcon  />} onClick={() => {
                                        workerService.suspendAccount(worker.id)
                                        setPageRefresh(!pageRefresh)
                                        }} >
                                        SUSPEND ACCOUNT
                                    </Button>}
                                    {worker.status === 'SUSPENDED' && <Button style={{color:'green'}} startIcon={<CheckIcon  />} onClick={() => {
                                        workerService.activateAccount(worker.id)
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


