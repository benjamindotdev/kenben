import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/SessionContext";
import { Link } from "react-router-dom";

type loginFormProps = {
    email: string;
    username: string;
    password: string;
};

const loginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }).optional(),
    username: z.string().min(5, {message: "Username must be at least 5 characters"}).optional(),
    password: z.string().min(5, {message: "Password must be at least 5 characters"})
}).refine(data => data.email || data.username, {
    message: "Either email or username must be provided",
    path: ["email", "username"],
});

    const LoginForm = () => {
        const { loggedIn, logIn } = useSession();
        const navigate = useNavigate();
        const [showUsername, setShowUsername] = useState(false);

        const form = useForm({
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: "",
                username: "",
                password: ""
            }
        });

        useEffect(() => {
            if (loggedIn) {
                navigate("/");
            }
        }, [loggedIn]);

        useEffect(() => {
            console.log(form.formState.errors);
        }, [form.formState.errors]);

        const onSubmit = async (data: loginFormProps) => {
            console.log(data);
            showUsername ? data.username : data.email;
            try {
                logIn(data);
                navigate("/");
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full w-full px-6 pb-6 flex flex-col justify-start items-start gap-6"
                >
                    {
                        showUsername ? (
                            <FormField
                                control={form.control}
                                name={"username"}
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel htmlFor="username">Username</FormLabel>
                                        <FormControl>
                                            <Input id="username" {...field} placeholder="Username" />
                                        </FormControl>
                                        <FormMessage>{String(form.formState.errors.username?.message || '')}</FormMessage>
                                        <FormDescription></FormDescription>
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField
                                control={form.control}
                                name={"email"}
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl>
                                            <Input id="email"  {...field} placeholder="Email" />
                                        </FormControl>
                                        <FormMessage>{String(form.formState.errors.email?.message || '')}</FormMessage>
                                        <FormDescription></FormDescription>
                                    </FormItem>
                                )}
                            />
                        )
                    }
                    <Button onClick={() => setShowUsername(!showUsername)}>
                        {showUsername ? "Use Email" : "Use Username"}
                    </Button>
                    <FormField
                        control={form.control}
                        name={"password"}
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <FormControl>
                                    <Input id="password" {...field} placeholder="Password" />
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                <FormDescription></FormDescription>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row justify-start gap-6 items-center">
                                            <Button
                                                type="submit"
                                            >
                                                Log In
                                            </Button>
                                            <Link to="/signup">or Sign Up</Link>
                                        </div>
                </form>
            </Form>
        )
    };

    export default LoginForm;