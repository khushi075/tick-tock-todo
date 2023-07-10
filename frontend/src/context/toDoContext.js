import { createContext,  useReducer } from "react";

export const ToDoContext = createContext();

export const toDoReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                toDos: action.payload
            }
        case 'ADD_TODO':
            return {
                toDos: [action.payload, ...state.toDos]
            }
        case 'DELETE_TODO':
            return {
                toDos: state.toDos.filter((td)=> td._id !== action.payload._id)
            }
        default:
            return state;
}}

export const ToDoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(toDoReducer, {
        toDos: null
    })

    return (
        <ToDoContext.Provider value={{...state, dispatch}}>
            {children}
        </ToDoContext.Provider>
    )
}