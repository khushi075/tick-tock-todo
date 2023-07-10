import { useEffect } from "react";
import { useToDoContext } from "../hooks/useToDoContext";
import ToDosDetail from "../components/ToDosDetail";
import ToDoForm from "../components/ToDoForm";
import {useAuthContext} from "../hooks/useAuthContext";

function Home() {
    const {toDos,dispatch}= useToDoContext()
    const {user} = useAuthContext()

    useEffect (() => {
        const fetchToDo = async () => {
            const res = await fetch('/api/todos',{
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await res.json()

            if (res.ok) {
                dispatch({type: 'GET_TODOS', payload: json})
            }
        }
        if(user){
            fetchToDo()
        }
    },[dispatch,user])

    return (
        <div className="Home">
            <div className="toDos">
                {toDos && toDos.map((toDo) => (
                    <ToDosDetail key={toDo._id} toDo={toDo}/>
                ))}
            </div>
            <div className="addToDos">
                <ToDoForm />
            </div>
        </div>
    )
}

export default Home;