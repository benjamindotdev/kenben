import { useState, useEffect } from "react";
import { useSession } from "@/context/SessionContext"
import AccountRow from "./AccountRow";

const Account = () => {

    const { username, editUsernameRequest } = useSession();

    const [editingUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleUsernameChange = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            setNewUsername(e.currentTarget.value);
        } catch (error) {
            setUsernameError(true);
            console.log(error);
        }
    }

    const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            editUsernameRequest(newUsername);
            setNewUsername("");
        } catch (error) {
            setUsernameError(true);
            console.log(error);
        }
    }

    const handlePasswordChange = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            setNewPassword(e.currentTarget.value);
        } catch (error) {
            setPasswordError(true);
            console.log(error);
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //editPasswordRequest(newPassword);
            //res.data && setNewPassword("");
        } catch (error) {
            setPasswordError(false);
            console.log(error);
        }
    }

    useEffect(() => {
        editingUsername && console.log("Editing username");
    }, [editingUsername]);

    useEffect(() => {
        editPassword && console.log("Editing password");
    }, [editPassword]);

    useEffect(() => {
        newUsername !== "" && console.log("New username:",newUsername);
    }, [newUsername]);

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
