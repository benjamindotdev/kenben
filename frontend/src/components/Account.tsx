import { useState, useEffect } from "react";
import { useSession } from "@/context/SessionContext"
import AccountRow from "./AccountRow";

const Account = () => {

    const { email, username, editEmail, editUsername } = useSession();

    const [editingUsername, setEditUsername] = useState(false);
    const [editingEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleUsername = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            setNewUsername(e.currentTarget.value);
            editUsername(newUsername);
        } catch (error) {
            setUsernameError(false);
            console.log(error);
        }
    }

    const handleEmail = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            setNewEmail(e.currentTarget.value);
            editEmail(newEmail);
        } catch (error) {
            setEmailError(false);
            console.log(error);
        }
    }

    useEffect(() => {
        editingUsername && console.log("Editing username");
    }, [editUsername]);

    useEffect(() => {
        editingEmail && console.log("Editing email");
    }, [editEmail]);

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
                handleNewValueChange={handleUsername}
                editingValue={editingUsername}
                setEditValue={setEditUsername}
                valueError={usernameError}
            />
            <AccountRow
                valueName="Email"
                value={email}
                newValue={newEmail}
                handleNewValueChange={handleEmail}
                editingValue={editingEmail}
                setEditValue={setEditEmail}
                valueError={emailError}
            />
            <AccountRow
                valueName="Password"
                value="********"
                newValue={newPassword}
                handleNewValueChange={() => setNewPassword}
                editingValue={editPassword}
                setEditValue={setEditPassword}
                valueError={passwordError}
            />
        </div>
    );
}

export default Account;
