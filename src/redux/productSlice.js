import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constants";

const initialState = {
  product: {},
  products: [],
  listProducts: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk("/products/all", async () => {
  const response = await axios.get(`${APP_URL}/products/all`, {
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });

  return response?.data;
});

export const fetchFilteredProducts = createAsyncThunk(
  "/products/filter",
  async ({ filteredParams, sortParams }) => {
    const params = new URLSearchParams();

    if (filteredParams && typeof filteredParams === "object") {
      for (const [key, value] of Object.entries(filteredParams)) {
        if (Array.isArray(value) && value.length > 0) {
          params.append(key, value.join(","));
        }
      }
    }

    if (sortParams) {
      params.append("sortBy", sortParams);
    }
    const response = await axios.get(
      `${APP_URL}/products/filter?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "/product/details",
  async (id) => {
    const response = await axios.get(
      `${APP_URL}/products/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response?.data;
  }
);

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

export const updateProduct = createAsyncThunk(
  "/product/update",
  async ({ id, formdata }) => {
    const response = await axios.put(
      `${APP_URL}/products/${id}/update`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // auth - login
      }
    );

    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk("/product/delete", async (id) => {
  const response = await axios.delete(`${APP_URL}/products/${id}/delete`, {
    withCredentials: true,
  });

  return response?.data;
});

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
      })

      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.listProducts = action.payload.products;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.listProducts = [];
      })
      // ADD PRODUCT

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
      })

      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => (product._id = action.payload._id)
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => {
          product._id !== action.payload.id;
        });
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;
