import { useItems } from "@/context/ItemsContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

import { Toaster } from "@/components/ui/toaster";

type AddItemFormProps = {
  type?: "To Do" | "In Progress" | "Done" | "Backlog";
};

const itemSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters",
    })
    .max(50, { message: "Title must be at most 50 characters" }),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters",
    })
    .max(200, {
      message: "Description must be at most 200 characters",
    }),
  assignee: z.string().default("You"),
  status: z.string().default("To Do"),
  priority: z.string(),
  createdDate: z.string().default(`${new Date().toDateString()}`),
  dueDate: z.string(),
});

const AddItemForm: React.FC<AddItemFormProps> = ({ type }) => {
  const { items, setItems } = useItems();

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      description: "",
      assignee: "You",
      status: type || "To Do",
      priority: "",
      createdDate: `${new Date().toDateString()}`,
      dueDate: "",
    },
  });

  const formSubmit = (values: z.infer<typeof itemSchema>) => {
    setItems([...items, values]);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmit)}
        className="h-full px-6 pb-6 flex flex-col justify-start gap-6"
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Title</FormLabel>
              <FormControl>
                <Input id="title" {...field} placeholder="Title" />
              </FormControl>
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  {...field}
                  placeholder="Description"
                />
              </FormControl>
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <p>Assignee: You</p>
        <FormField
          control={form.control}
          name={"status"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="status">Status</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue>{field.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status:</SelectLabel>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                      <SelectItem value="Backlog">Backlog</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"priority"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="priority">Priority</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue>{field.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"dueDate"}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="dueDate">Due Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Input id="dueDate" {...field} placeholder="Due Date" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      selected={new Date(field.value.toLocaleString())} /////////
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription></FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Add Item</Button>
      </form>
    </Form>
  );
};

export default AddItemForm;
