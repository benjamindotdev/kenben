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

type ItemFormProps = {
  editItem?: Item;
  addItemStatus?: string;
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
  assignee: z.string(),
  status: z.string(),
  priority: z.string(),
  createdDate: z.string().date(),
  dueDate: z.string().date(),
});

const ItemForm: React.FC<ItemFormProps> = ({ editItem, addItemStatus }) => {
  const { items, setItems } = useItems();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: editItem?.id ?? Math.max(items.length + 1, 1).toString(),
      title: editItem?.title ?? "",
      description: editItem?.description ?? "",
      assignee: editItem?.assignee ?? "You",
      status: editItem?.status ?? addItemStatus ?? "",
      priority: editItem?.priority ?? "",
      createdDate:
        editItem?.createdDate ?? `${new Date().toLocaleDateString()}`,
      dueDate: editItem?.dueDate ?? `${new Date().toLocaleDateString()}`,
    },
  });

  // console.log(items, "items");

  useEffect(() => {
    form.reset({
      id: editItem?.id ?? Math.max(items.length + 1, 1).toString(),
      title: editItem?.title ?? "",
      description: editItem?.description ?? "",
      assignee: editItem?.assignee ?? "You",
      status: editItem?.status ?? addItemStatus ?? "",
      priority: editItem?.priority ?? "",
      createdDate:
        editItem?.createdDate ?? `${new Date().toLocaleDateString()}`,
      dueDate: editItem?.dueDate ?? `${new Date().toLocaleDateString()}`,
    });
  }, [items]);

  const onSubmit = (values: z.infer<typeof itemSchema>) => {
    if (editItem) {
      const updatedItems = items.map((item: Item) =>
        item.id === editItem.id ? values : item
      );
      setItems(updatedItems);
    } else if (addItemStatus) {
      const newItem = { ...values, status: addItemStatus };
      setItems([...items, newItem]);
    }
    form.reset();
    navigate(-1);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
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
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
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
          render={({ field }) => {
            console.log("field", field.value);
            return (
              <FormItem>
                <FormLabel htmlFor="dueDate">Due Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger className="flex flex-col">
                      <Input
                        id="dueDate"
                        placeholder="Due Date"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            );
          }}
        />
        <Button type="submit">{editItem ? "Edit" : "Add"} Item</Button>
      </form>
    </Form>
  );
};

export default ItemForm;
