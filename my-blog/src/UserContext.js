// import React from "react";
// export const  UserContext = React.createContext();
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [totalQty, setTotalQty] = useState(0);

  const updateTotalQty = (qty) => {
    setTotalQty(qty);
  };

  return (
    <UserContext.Provider value={{ totalQty, updateTotalQty }}>
      {children}
    </UserContext.Provider>
  );
};
