import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constants";

const initialState = {
  myOrders: [],
  allOrders: [],
  orderDetails: {},
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APP_URL}/orders/create`, orderData, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to create order"
      );
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  "orders/myorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APP_URL}/orders/mine`, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to create order"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/orderdetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APP_URL}/orders/${orderId}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to create order"
      );
    }
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.order = action.payload.createOrder;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get my orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get orer by Id
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
