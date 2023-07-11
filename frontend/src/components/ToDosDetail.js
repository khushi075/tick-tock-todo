import { useToDoContext } from "../hooks/useToDoContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext";

function ToDosDetail ({toDo}) {
    const { dispatch } = useToDoContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const res = await fetch(`/api/todos/${toDo._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await res.json()
        if (res.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    return (
        <div className="toDo-details">
            <p className="remove" onClick={handleClick}>
                <span id="text">delete </span>
                {/* <span className="material-symbols-rounded" id="symbol">delete</span> */}
            </p>
            <div className="upper-part">   
            <h4>{toDo.title}</h4>
            <p className="status"><strong>Status: </strong>{toDo.completed}</p>
            </div>
            <p className="descr">{toDo.descr}</p>
            <p className="timestamp">{formatDistanceToNow(new Date(toDo.createdAt),{addSuffix:true})}</p>
        </div>
    )
}

export default ToDosDetail;