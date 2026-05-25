import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const [email, setEmail] = useState("");
    const [sigup,setSignup]=useState(false);
    const [logout,setLogout]=useState(false);
    const [changePassword,setChangePassword]=useState(false);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                email,
                setEmail,
                sigup,
                setSignup,
                logout,
                setLogout,
                changePassword,
                setChangePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
