import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


function Navbar() {
    const { logout } = useLogout();
    const {user} = useAuthContext();

    const handleClick = () => {
        logout()
    }

    return (
        <div className="navbar">
            <Link to="/" className="title">
                TickTockTodo
            </Link>
            {/* <div className=""> */}
            {user && (
                <div className="links">
                    <div className="profile">{user.username}</div>
                    <button className="logout" onClick={handleClick}>Logout</button>
                </div>
            )}
            {!user && (
                <div className="links">
                    <Link to="/login" className='profile'>Login</Link>
                    <Link to="/signup" className='logout'>Signup</Link>
                </div>
            )}
            {/* </div> */}
        </div>
    )
}

export default Navbar