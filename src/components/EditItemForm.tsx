import ItemForm from "./ItemForm";
import { useParams } from "react-router-dom";
import { useItems } from "../context/ItemsContext";

const EditItemForm = () => {
  const { id } = useParams();
  const item = useItems().items.find((item) => item.id === id);

  console.log(item);

  return <ItemForm editItem={item} />;
};

export default EditItemForm;
