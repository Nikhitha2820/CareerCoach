import {createContext, useContext, useState, ReactNode} from 'react';

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (email:string,password:string) => Promise<void>;
    register: (email:string,password:string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (email: string, password: string) => {
        // Simulate an API call
        console.log(`Logging in with ${email}`);
        setIsAuthenticated(true);
    };

    const register = async (email: string, password: string) => {
        // Simulate an API call
        console.log(`Registering with ${email}`);
        setIsAuthenticated(true);
    };

    const logout = () => {
        console.log('Logging out');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
