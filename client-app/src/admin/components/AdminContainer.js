import { useState } from "react";

import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminContainer(){

    const [adminLoginStatus, setAdminLoginStatus] = useState(false)

    return (
        <>
        {adminLoginStatus === false?<AdminLogin isLoggedin={adminLoginStatus} />:<AdminDashboard/>}
        </>
    );
}