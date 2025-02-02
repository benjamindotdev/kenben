import { useSession } from "@/context/SessionContext"
import { Button } from "./ui/button";

const Account = () => {

    const { loggedIn, email, username } = useSession();

    return (
        <>
            {loggedIn ? (
                <div className="grid grid-cols-1 grid-rows-4 gap-6 items-start justify-center">
                    <h1 className="text-2xl">Account</h1>
                    <div className="grid grid-cols-12 items-center">
                        <h1 className="col-span-4">Username:</h1>
                        <p className="col-span-6"> {username}</p>
                        <Button className="col-span-2">Edit</Button>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <h1 className="col-span-4">Email:</h1>
                        <p className="col-span-6"> {email}</p>
                        <Button className="col-span-2">Edit</Button>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <h1 className="col-span-4">Password:</h1>
                        <p className="col-span-6">*********</p>
                        <Button className="col-span-2">Edit</Button>
                    </div>
                </div>
            ) : (
                <h1>Not logged in</h1>
            )}
        </>
    );
}

export default Account;
