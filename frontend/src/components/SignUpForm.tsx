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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/SessionContext";
import axios from "axios";
import { Link } from "react-router-dom";

type signUpFormProps = {
    username: string;
    password: string;
};

const signUpchema = z.object({
    username: z.string().min(5, {message: "Username must be at least 5 characters"}),
    password: z.string().min(5, {message: "Password must be at least 5 characters"})
});

    const SignUpForm = () => {
        const { loggedIn, setLoggedIn } = useSession();
        const navigate = useNavigate();

        const form = useForm({
            resolver: zodResolver(signUpchema),
            defaultValues: {
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

        const onSubmit = async (data: signUpFormProps) => {
            console.log(data);
            const res = await axios.post("http://localhost:3001/signup", {
                user: {
                    username: data.username,
                    password: data.password
                }
            });
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            res.data && setLoggedIn(true);
        };

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full w-full px-6 pb-6 flex flex-col justify-center items-start gap-6"
                >
                    <FormField
                        control={form.control}
                        name={"username"}
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <FormControl>
                                    <Input id="username" {...field} placeholder="Username" />
                                </FormControl>
                                <FormMessage>{form.formState.errors.username?.message}</FormMessage>
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
                            Sign Up
                        </Button>
                        <Link to="/login">or Login</Link>
                    </div>
                </form>
            </Form>
        )
    };

    export default SignUpForm;