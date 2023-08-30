import { Typography } from "@mui/material"
import { useState } from "react";
import { AdminActionMenu } from "./adminActionViews/action.menu";
import { AddCategory } from "./adminActionViews/add.category";
import { AddSkill } from "./adminActionViews/add.skill";
import { AddState } from "./adminActionViews/add.state";
import { AddCity } from "./adminActionViews/add.city";
import { AddLocality } from "./adminActionViews/add.locality";


export const AdminDashboardHome = () => {

    const navigation = {
        dashboard: { name: '', href: '/' },
        addCategory: { name: 'Add Category', href: '/categories-add' },
        addSkill: { name: 'Add Skill', href: '/skill-add' },
        addState: { name: 'Add State', href: '/state-add' },
        addCity: { name: 'Add City', href: '/city-add' },
        addLocality: { name: 'Add Locality', href: '/locality-add' },
    }

    const [currentPage, setCurrentPage] = useState({ name: '', href: '/' })
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    // {currentPage.href === '/categories-add' && <AddCategory />}
    return (
        <>
            <Typography variant="h5" align="center">{currentPage.name}</Typography>
            {currentPage.href === '/' && <AdminActionMenu setPage={setCurrentPage} navs={navigation} />}
            {currentPage.href === '/categories-add' && <AddCategory setPage={setCurrentPage} navs={navigation} />}
            {currentPage.href === '/skill-add' && <AddSkill setPage={setCurrentPage} navs={navigation} />}
            {currentPage.href === '/state-add' && <AddState setPage={setCurrentPage} navs={navigation} />}
            {currentPage.href === '/city-add' && <AddCity setPage={setCurrentPage} navs={navigation} />}
            {currentPage.href === '/locality-add' && <AddLocality setPage={setCurrentPage} navs={navigation} />}
        </>
    )
}
