import { useSession } from "@/context/SessionContext"

const Account = () => {

    const { loggedIn, email, username } = useSession();

    return (
        <>
            {loggedIn ? (
                <div>
                    <h1>{username}</h1>
                    <h2>{email}</h2>
                </div>
            ) : (
                <h1>Not logged in</h1>
            )}
        </>
    );
}

export default Account;
