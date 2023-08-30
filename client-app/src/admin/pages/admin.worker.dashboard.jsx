import { useState, useEffect } from "react"
import { CustomerHistory } from './customerViews/customer.history'
import { Typography } from "@mui/material"
import { WorkerTable } from "./workerViews/worker.table"
import { WorkerHistory } from "./workerViews/worker.history"

export const WorkerBoard = () => {

    const [workerIdHistory, setWorkerIdHistory] = useState()

    const navigation = {
        customerDash: {name:'', href:'/'},
        history: {name:'History', href:'/history'},
    }
    const [currentPage, setCurrentPage] = useState({name:'', href:'/'})

    return (
        <>
        <Typography variant="h5">{currentPage.name}</Typography>
        {currentPage.href === '/' && <WorkerTable setPage={setCurrentPage} navs={navigation} historyFor = {setWorkerIdHistory} />}
        {currentPage.href === '/history' && <WorkerHistory setPage={setCurrentPage} navs={navigation} workerId={workerIdHistory} />}
        </>
    )
}