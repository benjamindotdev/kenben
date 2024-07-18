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
import { v4 as uuidv4 } from "uuid";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from "react-router-dom";

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

const AddItemForm = () => {
  const { items, setItems } = useItems();
  const type = useParams().type?.replace(/\+/g, " ");
  const id = useParams().id;
  const item = items.find((item) => item.id === id);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: item?.id || uuidv4(),
      title: item?.title || "",
      description: item?.description || "",
      assignee: item?.assignee || "You",
      status: item?.status || "To Do",
      priority: item?.priority || "",
      createdDate: item?.createdDate || `${new Date().toDateString()}`,
      dueDate: item?.dueDate || "",
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                  <PopoverTrigger className="flex flex-col">
                    <Input
                      id="dueDate"
                      placeholder="Due Date"
                      value={new Date(field.value).toLocaleDateString()}
                      onChange={field.onChange}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
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
