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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Item } from "@/types/Item";
import { useForm } from "react-hook-form";
import { useItems } from "@/context/ItemsContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/context/SessionContext";
import axios from "axios";

const loginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    username: z.string().min(5, {message: "Username must be at least 5 characters"}),
    password: z.string().min(5, {message: "Password must be at least 5 characters"})
});

    const LoginForm = () => {
        const { loggedIn, setLoggedIn } = useSession();
        const navigate = useNavigate();

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

        // useEffect(() => {
        //     form.reset();
        // }), [form];

        useEffect(() => {
            console.log(form.formState.errors);
        }, [form.formState.errors]);

        const onSubmit = async (data: any) => {
            console.log(data);
            const res = await axios.post("http://localhost:3001/login", data);
            console.log(res.data);
            res.data && setLoggedIn(true);
        };

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full px-6 pb-6 flex flex-col justify-start gap-6"
                >
                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                    <Input id="email" {...field} placeholder="Email" />
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
                            <FormItem>
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
                            <FormItem>
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

    export default LoginForm;