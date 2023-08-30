import { useState, useEffect } from "react"
import { CustomerTable } from './customerViews/customer.table'
import { CustomerHistory} from './customerViews/customer.history'
import { Typography } from "@mui/material"

export const CustomerBoard = () => {

    const [customerIdHistory, setCustomerIdHistory] = useState()

    const navigation = {
        customerDash: {name:'', href:'/'},
        history: {name:'History', href:'/history'},
    }
    const [currentPage, setCurrentPage] = useState({name:'', href:'/'})
        
    return (
        <>
        <Typography variant="h5">{currentPage.name}</Typography>
        {currentPage.href === '/' && <CustomerTable setPage={setCurrentPage} navs={navigation} historyFor = {setCustomerIdHistory}/>}
        {currentPage.href === '/history' && <CustomerHistory setPage={setCurrentPage} navs={navigation} customerId = {customerIdHistory}/>}
        </>
    )
}