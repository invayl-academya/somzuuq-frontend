import { filterOptions } from "@/common";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { Fragment } from "react";

const FilterProducts = ({ filters, handleFilter }) => {
  return (
    <div className="bg-slate-100 rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2>Filter products</h2>
      </div>
      {Object.keys(filterOptions)?.map((keyItem) => (
        <Fragment key={keyItem}>
          <div className="py-4 ml-2 ">
            <h3>{keyItem}</h3>
            <div className="">
              {filterOptions[keyItem]?.map((option) => (
                <Label
                  key={option.id}
                  className="flex items-center font-normal my-3"
                >
                  <Checkbox
                    checked={
                      Array.isArray(filters[keyItem]) &&
                      filters[keyItem].includes(option.id)
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default FilterProducts;
