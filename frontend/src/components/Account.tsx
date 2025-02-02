import { useState, useEffect } from "react";
import { useSession } from "@/context/SessionContext"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
            <form className="grid grid-cols-12 items-center gap-4">
                <h1 className="col-span-3">Username:</h1>
                {
                    editingUsername ? (
                        <>
                            <Input
                                className="col-span-7 px-0 py-0"
                                value={newUsername}
                                onChange={handleUsername}
                            />
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <Button
                                    className="col-span-1"
                                    type="button"
                                    onClick={() => {
                                        setEditUsername(!editingUsername);
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="col-span-1"
                                    type="button"
                                    onClick={() => {
                                        setEditUsername(!editingUsername);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-span-7 h-10 px-0 py-0 flex items-center space-between">
                                <p> {username}</p>
                                {
                                    usernameError &&
                                        <p className="text-red-500">Unable to update username</p>
                                }
                            </div>
                            <Button
                                className="col-span-2"
                                type="button"
                                onClick={() => {
                                    setEditUsername(!editingUsername);
                                }}
                                >
                                Edit
                            </Button>
                        </>
                    )
                }
            </form>
            <form className="grid grid-cols-12 items-center">
                <h1 className="col-span-4">Email:</h1>
                <p className="col-span-6"> {email}</p>
                <Button className="col-span-2">Edit</Button>
            </form>
            <form className="grid grid-cols-12 items-center">
                <h1 className="col-span-4">Password:</h1>
                <p className="col-span-6">*********</p>
                <Button className="col-span-2">Edit</Button>
            </form>
        </div>
    );
}

export default Account;
