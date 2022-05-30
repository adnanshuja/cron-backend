import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {

    let user = JSON.parse(localStorage.getItem("user"));
    let redirectPath = '/login';
    let isAllowed = false;
    if(user){
        if( allowedRoles.includes(user.role)){
            isAllowed = true;
        } else {
            redirectPath = '/home'
        }
    }

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
