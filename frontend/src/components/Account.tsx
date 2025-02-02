import { useState, useEffect } from "react";
import { useSession } from "@/context/SessionContext"
import AccountRow from "./AccountRow";
import axios from "axios";

const Account = () => {

    const { email, username, editEmailRequest, editUsernameRequest } = useSession();

    const [editingUsername, setEditUsername] = useState(false);
    const [editingEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleUsernameChange = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            setNewUsername(e.currentTarget.value);
            editUsernameRequest(newUsername);
        } catch (error) {
            setUsernameError(false);
            console.log(error);
        }
    }

    const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3001/${username}/username`, {
                username: newUsername
            });
            res.data && setNewUsername("");
        } catch (error) {
            setUsernameError(false);
            console.log(error);
        }
    }

    const handleEmailChange = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            setNewEmail(e.currentTarget.value);
            editEmailRequest(newEmail);
        } catch (error) {
            setEmailError(false);
            console.log(error);
        }
    }

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3001/${username}/email`, {
                email: newEmail
            });
            res.data && setNewEmail("");
        } catch (error) {
            setEmailError(false);
            console.log(error);
        }
    }

    const handlePasswordChange = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            setNewPassword(e.currentTarget.value);
        } catch (error) {
            setPasswordError(false);
            console.log(error);
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3001/${username}/password`, {
                password: newPassword
            });
            res.data && setNewPassword("");
        } catch (error) {
            setPasswordError(false);
            console.log(error);
        }
    }

    useEffect(() => {
        editingUsername && console.log("Editing username");
    }, [editingUsername]);

    useEffect(() => {
        editingEmail && console.log("Editing email");
    }, [editingEmail]);

    useEffect(() => {
        editPassword && console.log("Editing password");
    }, [editPassword]);

    useEffect(() => {
        newUsername !== "" && console.log("New username:",newUsername);
    }, [newUsername]);

    useEffect(() => {
        newEmail !== "" && console.log("New email:",newEmail);
    }, [newEmail]);

    useEffect(() => {
        newPassword !== "" && console.log("New password:",newPassword);
    }, [newPassword]);

    return (
        <div className="grid grid-cols-1 grid-rows-4 gap-6 items-start justify-center">
            <h1 className="text-2xl">Account</h1>
            <AccountRow
                valueName="Username"
                value={username}
                newValue={newUsername}
                handleNewValueChange={handleUsernameChange}
                handleNewValueSubmit={handleUsernameSubmit}
                editingValue={editingUsername}
                setEditValue={setEditUsername}
                valueError={usernameError}
            />
            <AccountRow
                valueName="Email"
                value={email}
                newValue={newEmail}
                handleNewValueChange={handleEmailChange}
                handleNewValueSubmit={handleEmailSubmit}
                editingValue={editingEmail}
                setEditValue={setEditEmail}
                valueError={emailError}
            />
            <AccountRow
                valueName="Password"
                value="********"
                newValue={newPassword}
                handleNewValueChange={handlePasswordChange}
                handleNewValueSubmit={handlePasswordSubmit}
                editingValue={editPassword}
                setEditValue={setEditPassword}
                valueError={passwordError}
            />
        </div>
    );
}

export default Account;
