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
  createdDate: z.date(),
  dueDate: z.date(),
});

const ItemForm: React.FC<ItemFormProps> = ({ editItem, addItemStatus }) => {
  const { items, setItems } = useItems();
  const navigate = useNavigate();

  let editCreatedDate, editDueDate;
  if (editItem) {
    editCreatedDate = new Date(editItem.createdDate);
    editDueDate = new Date(editItem.dueDate);
  }
  const form = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: editItem?.id || Math.max(items.length + 1, 1).toString(),
      title: editItem?.title || "",
      description: editItem?.description || "",
      assignee: editItem?.assignee || "You",
      status: editItem?.status || addItemStatus || "",
      priority: editItem?.priority || "",
      createdDate: editItem ? editCreatedDate : new Date(),
      dueDate: editItem?.dueDate ? editDueDate : new Date(),
    },
  });

  useEffect(() => {
    form.reset({
      id: editItem?.id || Math.max(items.length + 1, 1).toString(),
      title: editItem?.title || "",
      description: editItem?.description || "",
      assignee: editItem?.assignee || "You",
      status: editItem?.status || addItemStatus || "",
      priority: editItem?.priority || "",
      createdDate: editItem ? new Date(editItem.createdDate) : new Date(),
      dueDate: editItem?.dueDate ? new Date(editItem.dueDate) : new Date(),
    });
  }, [items]);

  const onSubmit = (values: z.infer<typeof itemSchema>) => {
    const createdDateString = new Date()
      .toLocaleDateString()
      .replace(/\//g, "-");
    const dueDateString = values.dueDate
      .toLocaleDateString()
      .replace(/\//g, "-");

    if (editItem) {
      const updatedItem = items.find((item) => item.id === editItem.id);
      if (updatedItem) {
        const updatedItems = items.filter((item) => item.id !== editItem.id);
        const newItem = {
          ...values,
          createdDate: createdDateString,
          dueDate: dueDateString,
        };
        setItems([...updatedItems, newItem]);
      }
    } else if (addItemStatus) {
      const newItem = {
        ...values,
        status: addItemStatus,
        createdDate: createdDateString,
        dueDate: dueDateString,
      };
      setItems([...items, newItem]);
    }
    form.reset();
  };

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

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
            return (
              <FormItem>
                <FormLabel htmlFor="dueDate">Due Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger className="flex flex-col">
                      <Input
                        id="dueDate"
                        placeholder="Due Date"
                        value={field.value.toLocaleString()}
                        onChange={field.onChange}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value.toLocaleString()}
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
