import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error, loading, login} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="login-contain">
            
            <h2>Login</h2>
            <div className="input-fields">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="input-fields">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit" disabled={loading}>Login</button>
            {error && <div className="error">{error}</div>}
            </div>
        </form>
    )
}

export default Login;