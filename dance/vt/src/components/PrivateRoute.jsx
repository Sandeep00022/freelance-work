import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("currentUser:", currentUser);
    setLoading(false);
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
