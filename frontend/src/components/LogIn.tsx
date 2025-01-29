import LoginForm from './LoginForm';
import { useSession } from '@/context/SessionContext';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const { loggedIn } = useSession();
    const navigate = useNavigate();

    if (loggedIn) {
        navigate('/');
    }

    return (
        <LoginForm />
    );
};

export default LogIn;