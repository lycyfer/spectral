import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [product, setProduct] = useState(null);
    console.log(currentUser)
    const updateUser = (data) => {
        setCurrentUser(data);
    };
    const updateProduct = (data) => {
        setProduct(data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, updateUser, product, updateProduct }}>
            {children}
        </AuthContext.Provider>
    );
};