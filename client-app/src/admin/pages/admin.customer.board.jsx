import { useState, useEffect } from "react"
import { CustomerTable } from './customerViews/customer.table'
import { CustomerProfile} from './customerViews/customer.profile'
import { CustomerHistory} from './customerViews/customer.history'
import { CustomerAddresses} from './customerViews/customer.addresses'
import { Typography } from "@mui/material"

export const CustomerBoard = () => {

    const navigation = {
        customerDash: {name:'', href:'/'},
        profile: {name:'Profile', href:'/profile'},
        history: {name:'History', href:'/history'},
        addresses: {name:'Addresses', href:'/addresses'}
    }
    const [currentPage, setCurrentPage] = useState({name:'', href:'/'})
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    return (
        <>
        <Typography variant="h3">{currentPage.name}</Typography>
        {currentPage.href === '/' && <CustomerTable setPage={setCurrentPage} navs={navigation} />}
        {currentPage.href === '/profile' && <CustomerProfile setPage={setCurrentPage} navs={navigation} />}
        {currentPage.href === '/history' && <CustomerHistory setPage={setCurrentPage} navs={navigation} />}
        {currentPage.href === '/addresses' && <CustomerAddresses setPage={setCurrentPage} navs={navigation} />}
        </>
    )
}