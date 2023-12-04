import { INewUser } from '@/types';
import {
    useMutation,
} from '@tanstack/react-query';
import { createUser, signInAccount } from '../api';

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUser(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user)
    })
}



