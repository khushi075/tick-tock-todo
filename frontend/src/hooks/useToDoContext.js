import { ToDoContext } from "../context/toDoContext";
import { useContext } from "react";

export const useToDoContext = () => {
    const context = useContext(ToDoContext);

    if (!context) {
        throw Error('useToDoContext must be used within a ToDoProvider')
    }
    return context; 
}