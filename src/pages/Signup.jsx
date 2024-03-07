import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const reqBody = { email, password, name };
        axios
          .post("http://localhost:5005/auth/signup", reqBody)
          .then(() => {
            navigate("/login");
          })
          .catch((error) => {
            const errorDescription = error.data.message;
            setError(errorDescription);
          });
      };

    return (
        <div>
            <form onSubmit={handleSignUpSubmit}>
                <div >
                    <label >Name</label>
                    <input
                        type="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div >
                    <label >Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
