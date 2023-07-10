import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { error, loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password, username);
    }
    return (
        <form className="signup" onSubmit={handleSubmit}>
            <div className="signup-contain">
                <h2>Sign Up</h2>
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
                <div className="input-fields">
                    <label htmlFor="username">Give yourself a Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>Sign Up</button>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
    )
}

export default SignUp;