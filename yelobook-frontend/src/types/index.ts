import React from "react";

export type INewUser = {
    username: string;
    email: string;
    password: string;
}

export type IUser = {
    id: string;
    username: string;
    email: string;
}

export type IAuthContext = {
    user: IUser;
    token: string;
    isPending: boolean;
    isAuthenticated: boolean,
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}