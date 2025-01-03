import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction } from '../../redux/slices/users/usersSlice';
import AdminOnly from '../NotAuthorised/AdminOnly';


const AdminRoute = ({ children }) => {
    //dispatch
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch])
    //get user from store
    const { userAuth } = useSelector((state) => state?.users);
    const isAdmin = userAuth?.userInfo?.userFound?.isAdmin ? true : false;

    if (!isAdmin) return <AdminOnly />
    return <>
        {children}
    </>
}

export default AdminRoute;