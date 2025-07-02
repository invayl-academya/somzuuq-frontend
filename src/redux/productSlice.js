import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constants";

const initialState = {
  product: {},
  products: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk("/products/all", async () => {
  const response = await axios.get(`${APP_URL}/products/all`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response?.data;
});

export const addProduct = createAsyncThunk(
  "/product/create",
  async (formdata) => {
    const response = await axios.post(`${APP_URL}/products/create`, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response?.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.products = [];
      });
    // ADD PRODUCT
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;
