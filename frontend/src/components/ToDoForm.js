import { useState } from "react"
import { useToDoContext } from "../hooks/useToDoContext"
import { useAuthContext } from "../hooks/useAuthContext"

function ToDoForm () {
    const { dispatch } = useToDoContext()
    const [title, setTitle] = useState('')
    const [completed, setCompleted] = useState('')
    const [descr, setDescr] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('Ooops! You must be logged in to add a task bomb')
            return
        }
        
        const toDo = { title, completed, descr }
        const res = await fetch('https://ticktocktodo.onrender.com/api/todos', {
            method: 'POST',
            body: JSON.stringify(toDo),
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await res.json()
        if (!res.ok) {
           setError(json.error)
           setEmptyFields(json.emptyFields)
        }
        if (res.ok) {
            setTitle('')
            setCompleted('')
            setDescr('')
            setError(null)
            setEmptyFields([])
            console.log('New Task Added',json)
            dispatch({type: 'ADD_TODO', payload: json})
        }
            
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3 className="form-title">Add a Task Bomb</h3>
            <label className="form-header" id="f-title">Give it a Jazzy Label</label>
            <input
                className={`form-input ${emptyFields.includes('title') ? 'error' : ''}`}
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label className="form-header">Add some Explosive Details</label>
            <textarea
                className={`form-input ${emptyFields.includes('descr') ? 'error' : ''}`}
                id="descr"
                type="text"
                required
                value={descr}
                onChange={(e) => setDescr(e.target.value)}
            />
            <label className="form-header">How much Bombshell Progress have you made on it?</label>
            <input
                className={`form-input ${emptyFields.includes('completed') ? 'error' : ''}`}
                type="text"
                required
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
            />
            <button>Add your Task Bomb</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ToDoForm;