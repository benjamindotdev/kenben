import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setLoggedIn } = useSession();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoggedIn(true);
        navigate("/");
    }
    return (
        <form className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <button
                onClick={handleSubmit}
            >
                Login
            </button>
        </form>
    );
};

    export default Login;