import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

const Login = () => {
    const { setLoggedIn } = useSession();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoggedIn(true);
        navigate("/");
    }
    return (
        <LoginForm />
    );
};

    export default Login;