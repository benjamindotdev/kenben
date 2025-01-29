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

type signUpFormProps = {
    email: string;
    username: string;
    password: string;
};

const signUpchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    username: z.string().min(5, {message: "Username must be at least 5 characters"}),
    password: z.string().min(5, {message: "Password must be at least 5 characters"})
});

    const SignUpForm = () => {
        const { loggedIn, setLoggedIn } = useSession();
        const navigate = useNavigate();

        const form = useForm({
            resolver: zodResolver(signUpchema),
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

        // useEffect(() => {
        //     form.reset();
        // }), [form];

        useEffect(() => {
            console.log(form.formState.errors);
        }, [form.formState.errors]);

        const onSubmit = async (data: signUpFormProps) => {
            console.log(data);
            const res = await axios.post("http://localhost:3001/signup", {
                email: data.email,
                username: data.username,
                password: data.password
            });
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            res.data && setLoggedIn(true);
        };

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full w-full px-6 pb-6 flex flex-col justify-start items-start gap-6"
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
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                <FormDescription></FormDescription>
                            </FormItem>
                        )}
                    />
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
                    <Button
                        type="submit"
                    >
                        Login
                        </Button>
                </form>
            </Form>
        )
    };

    export default SignUpForm;