import { Button } from "@/components/ui/button";
import React, { Fragment, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/common/Form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/redux/productSlice";
import { addProductFormElements } from "@/common";
import ProductImageUpload from "./components/ProductImageUpload";
import AdminProductCard from "./components/AdminProductCard";

const initialData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  countInStock: 0,
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const { products } = useSelector((state) => state.products);
  // console.log(products);

  const dispatch = useDispatch();

  const [formdata, setFormdata] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    const payload = {
      ...formdata,
      image: uploadedImageUrl,
    };

    const action = editMode
      ? updateProduct({ id: formdata._id, formdata: payload })
      : addProduct(payload);

    dispatch(action).then((result) => {
      if (result.payload) {
        dispatch(getProducts());
        toast.success(result.payload.message || "Product Saved");
        resetForm();
      }
    });

    // dispatch(
    //   addProduct({
    //     ...formdata,
    //     image: uploadedImageUrl,
    //   })
    // ).then((res) => {
    //   if (res.payload?.data) {
    //     console.log("res", res);
    //     setFormdata(initialData);
    //     dispatch(getProducts());
    //     setOpenCreateProductsDialog(false);
    //     setImageFile(null);
    //     toast.success(res.payload.message);
    //   }
    // });
  }

  function resetForm() {
    setOpenCreateProductsDialog(false);
    setEditMode(false);
    setFormdata(initialData);
    setUploadedImageUrl("");
    setImageFile(null);
  }

  const editHandler = (product) => {
    console.log("product", product);
    setEditMode(true);
    setFormdata(product);
    setUploadedImageUrl(product.image);
    setOpenCreateProductsDialog(true);
  };

  const deleteHandler = (productId) => {
    // console.log("productDLT", product);
    dispatch(deleteProduct(productId)).then((res) => {
      if (res.payload) {
        toast.success("product  deleted ....");
        dispatch(getProducts());
      }
    });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <Fragment>
      <div className="px-4 lg:px-8 py-6 space-y-6">
        {/* Button aligned right */}
        <div className="flex justify-end">
          <Button
            onClick={() => {
              resetForm();
              setOpenCreateProductsDialog(true);
            }}
          >
            Add New Product
          </Button>
        </div>

        {/* Product grid below the button */}
        <div className="grid gap-2 md:grid-cols-3  lg:grid-cols-3">
          {products && products.length > 0 ? (
            products?.map((product) => (
              <AdminProductCard
                key={product._id}
                product={product}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
              />
            ))
          ) : (
            <div>
              <h3>Products Not found</h3>
            </div>
          )}
        </div>
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent className="p-4 max-w-xl w-full max-h-screen overflow-y-auto">
          {" "}
          <SheetHeader>
            <SheetHeader>
              <SheetTitle className="text-3xl -mt-2">
                {editMode ? "edit product" : "Create Product"}
              </SheetTitle>
            </SheetHeader>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
          />
          <div className="mt-6 space-y-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formdata}
              setFormData={setFormdata}
              buttonText={"submit"}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
