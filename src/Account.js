import React, {createContext} from "react";
import {Form, Button} from 'react-bootstrap';

import bcrypt from 'bcryptjs';
import { useCookies } from 'react-cookie';

import config from '../config';

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = config.poolData;

export const AccountContext = createContext();

const UserPool = new CognitoUserPool(poolData);

const Account = (props) => {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                })
            } else {
                reject();
            }
        })
    }

    const getData = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        user.getUserAttributes((err, result) => {
                            if (err) {
                                reject();
                            } else {
                                resolve(result);
                            }
                        })
                    }
                })
                
            } else {
                reject();
            }
        })
    }

    const authenticate = async (email, password) => {
    return await new Promise((resolve, reject) => {
        

        const userData = {
            Username: email,
            Pool: UserPool
        }

        const cognitoUser = new CognitoUser(userData);

        const authData = {
            Username: email,
            Password: password
        }

        const authDetails = new AuthenticationDetails(authData);

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log(data);
                resolve(data)
            },
            onFailure: (err) => {
                console.error(err);
                reject(err);
            },
            newPasswordRequired: (data) => {
                console.log(data)
                resolve(data);
            }
        })
    })

    

        
    }

    const logout = () => {
        const user = UserPool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    }
    
    return ( <AccountContext.Provider value={{ authenticate, getSession, logout, getData }}>
        {props.children}
    </AccountContext.Provider>)
}


export default Account;