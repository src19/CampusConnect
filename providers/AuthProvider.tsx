import { PropsWithChildren, createContext, useEffect } from "react";

type AuthData = {};
const AuthContext = createContext<AuthData>({});

export default function AuthProvider({children}: PropsWithChildren) {
    useEffect(() => {
        
    }, []);


    return <AuthContext.Provider value={{}}> {children} </AuthContext.Provider>;
}