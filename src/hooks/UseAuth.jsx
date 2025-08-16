import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext.jsx/AuthContext';


const UseAuth = () => {
 const AuthInfo = useContext(AuthContext);
 return AuthInfo;
};

export default UseAuth;