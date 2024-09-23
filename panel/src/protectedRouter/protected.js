import React from "react";
import { Navigate } from "react-router-dom";
import { is_auth } from '../services/Auth/Auth';

// Компонент ProtectedRoute
function ProtectedRoute({ element }) {
    return is_auth() ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;