import React, { createContext, useState } from 'react'

export const UserContext = createContext(null)
export const EvInfoContext = createContext(null)

export const ProjectContextProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState(
        {
            id: Int16Array,
            userName: String,
            email: String,
            mainhubId: Int16Array,
        })
    const [evInfo, setEvInfo] = useState({id: 1})

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <EvInfoContext.Provider value={{ evInfo, setEvInfo }}>
                {children}
            </EvInfoContext.Provider>
        </UserContext.Provider>
    )
}