"use client"
import { logout } from "@/modules/close/logout";
import { useEffect } from "react";


function Logout() {

    useEffect(
        () => {
            logout();
        }, []
    );

    return (<> </>);
}

export default Logout;