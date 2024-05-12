import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppMenuBar from "../features/appbar/AppMenuBar";

function PrivateRoute({ children, path }) {
    const loggedInUser = JSON.parse(window.localStorage.getItem("token"));
    const userPermission = JSON.parse(
        window.localStorage.getItem("userPermission")
    );


    const { pathname } = useLocation();

    const checkLoggedIn = () => {
        if (
            loggedInUser !== null &&
            loggedInUser !== undefined &&
            loggedInUser.token !== undefined &&
            loggedInUser.token !== null &&
            loggedInUser.token !== ""
        )
            return true;
        return false;
    };

    if (pathname === "/" && checkLoggedIn() === false) {
        return <React.Fragment>{children}</React.Fragment>;
    } else if (pathname === "/" && checkLoggedIn() === true) {
        return <Navigate to="/form_management" replace />;
    }
    else if (
        userPermission !== null &&
        userPermission !== undefined &&
        userPermission.includes(pageUrl[pathname]) == false
    ) {
        return <Navigate to="/page_not_found" replace />;
    }
    else if (checkLoggedIn()) {
        return (
            <React.Fragment>
                <AppMenuBar />
                {children}
            </React.Fragment>
        );
    }

    else return <Navigate to="/" replace />;
}
export default PrivateRoute;
