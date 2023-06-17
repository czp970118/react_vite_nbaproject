import React, { createContext } from "react";
import User from '../class/User';

export const UserContext = createContext(new User())