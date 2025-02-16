import { verifyToken } from "./jwt";

const getUsernameFromToken = (token: string) => {

    if (!token) {
        return "No token";
    }

    const decoded = verifyToken(token);
    const { username } = decoded;
    return username;
}

export default getUsernameFromToken;