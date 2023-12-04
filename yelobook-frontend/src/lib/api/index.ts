import { INewUser } from "@/types";
import axios from "axios";

export const createUser = async (user: INewUser) => {
    const { data } = await axios.post("/auth/register", user);
    return data;
}

export const signInAccount = async (user: {email: string; password: string}) => {
    const {data} = await axios.post("/auth/login", user);
    return data;
}

export const getCurrentAccount = async () => {
    const {data} = await axios.get("/users/", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if(data) return data;
    throw new Error("No user found");
}

