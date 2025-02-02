import { Button } from "./ui/button";
import { Input } from "./ui/input";

type AccountRowProps = {
    valueName: string;
    value: string
    newValue: string;
    handleNewValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editingValue: boolean;
    setEditValue: (value: boolean) => void;
    valueError: boolean;
};

const AccountRow: React.FC<AccountRowProps> = ({
    valueName,
    value,
    newValue,
    handleNewValueChange,
    editingValue,
    setEditValue,
    valueError
}) => {

    return (
        <form className="grid grid-cols-12 items-center gap-4">
                <h1 className="col-span-3">{valueName}:</h1>
                {
                    editingValue ? (
                        <>
                            <Input
                                className="col-span-7 px-0 py-0"
                                value={newValue}
                                onChange={handleNewValueChange}
                            />
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                                <Button
                                    className="col-span-1"
                                    type="button"
                                    onClick={() => {
                                        setEditValue(!editingValue);
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="col-span-1"
                                    type="button"
                                    onClick={() => {
                                        setEditValue(!editingValue);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-span-7 h-10 px-0 py-0 flex items-center space-between">
                                <p> {value}</p>
                                {
                                    valueError &&
                                        <p className="text-red-500">Unable to update {valueName}</p>
                                }
                            </div>
                            <Button
                                className="col-span-2"
                                type="button"
                                onClick={() => {
                                    setEditValue(!editingValue);
                                }}
                                >
                                Edit
                            </Button>
                        </>
                    )
                }
            </form>

    )
}

export default AccountRow;