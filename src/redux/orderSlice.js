import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constants";

const initialState = {
  myOrders: [],
  allOrders: [],
  orderDetails: {},
  paypalClientId: null,
  paypalLoading: false,
  loading: false,
  success: false,
  order: null,
  error: null,
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

export const fetchPaypalClientId = createAsyncThunk(
  "orders/payaplclient",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APP_URL}/config/paypal`, {
        withCredentials: true,
      });

      return response.data.clientId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to create order"
      );
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APP_URL}/orders/all`, {
        withCredentials: true, // must send Cookie
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
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

      // fetch all orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "failed to fetch orders";
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
      })

      // fetch paypal client id
      .addCase(fetchPaypalClientId.pending, (state) => {
        state.paypalLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchPaypalClientId.fulfilled, (state, action) => {
        state.paypalLoading = false;
        state.success = true;
        state.paypalClientId = action.payload;
      })
      .addCase(fetchPaypalClientId.rejected, (state, action) => {
        state.paypalLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
