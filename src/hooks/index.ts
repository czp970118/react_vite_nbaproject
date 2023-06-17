import React from "react";
import { UserContext } from '../context/user-context'

export const useStore = () => {
	return React.useContext(UserContext)
}