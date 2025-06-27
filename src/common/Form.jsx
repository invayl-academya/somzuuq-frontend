import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectContent, SelectItem, SelectValue } from "@radix-ui/react-select";
import React from "react";

const types = {
  input: "input",
  select: "select",
  textarea: "textarea",
};

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputComponents = (getControlItem) => {
    let element = null;

    const value = formData[getControlItem?.name] || "";

    switch (getControlItem.componentType) {
      case types.input:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      case types.select:
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem>{optionItem.label}</SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case types.textarea:
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
          />
        );

        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            type={getControlItem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-2 ">
        {formControls.map((cntrlItem) => (
          <div className="grid w-full gap-1.5" key={cntrlItem.name}>
            <label>{cntrlItem.label}</label>
            {renderInputComponents(cntrlItem)}
          </div>
        ))}
      </div>

      <Button className="mt-3">{buttonText || "submit"}</Button>
    </form>
  );
};

export default CommonForm;
