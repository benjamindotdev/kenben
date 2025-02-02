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
    password: string;
};

type loginFormResponse = {
    username: string;
    email: string;
};

const loginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(5, {message: "Password must be at least 5 characters"})
});

    const LoginForm = () => {
        const [error, setError] = useState("");
        const { loggedIn, logIn } = useSession();
        const navigate = useNavigate();

        const form = useForm({
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: "",
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

        useEffect(() => {
            setError('');
        }, [form.formState.isSubmitted, form.watch('email'), form.watch('password')]);

        const onSubmit = async (data: loginFormProps) => {
            console.log(data);
            try {
                const response = await logIn(data);
                console.log(response);
                if (response.username !== "" && response.email !== "") {
                    navigate(`/${response.username}`);
                } else {
                    setError("Invalid email or password");
                }
            } catch (error: any) {
                setError(form.formState.errors.email?.message || error.message);
                console.log(error);
            }
        };

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full w-full px-6 pb-6 flex flex-col justify-center items-start gap-6"
                >
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
                        {
                            error && <p className="text-red-500 animate-pulse">{error}</p>
                        }
                    </div>
                </form>
            </Form>
        )
    };

    export default LoginForm;