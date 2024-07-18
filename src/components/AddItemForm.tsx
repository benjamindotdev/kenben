import ItemForm from "./ItemForm";
import { useSearchParams } from "react-router-dom";

const AddItemForm = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") ?? undefined;

  return <ItemForm addItemStatus={status} />;
};

export default AddItemForm;
