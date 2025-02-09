import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all instructors (Admin Only)
export const fetchInstructors = createAsyncThunk(
  "admin/fetchInstructors",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/user/instructors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.instructors;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch instructors"
      );
    }
  }
);

// Assign role (Admin Only)
export const assignRole = createAsyncThunk(
  "admin/assignRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${API_BASE_URL}/user/assign-role`,
        {
          userId,
          role,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign role"
      );
    }
  }
);

// Create a new user (Admin Only)
export const createUser = createAsyncThunk(
  "admin/createUser",
  async ({ name, email, password, role, image }, { rejectWithValue }) => {
    console.log('====================================');
    console.log('name, email, password, role, image', name, email, password, role, image);
    console.log('====================================');
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_BASE_URL}/user/create-user`,
        {
          name,
          email,
          password,
          role,
          image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    instructors: [],
    loading: false,
    error: null,
    userCreated: null, // Track new user creation
  },
  reducers: {
    resetUserCreated: (state) => {
      state.userCreated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch instructors
      .addCase(fetchInstructors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.loading = false;
        state.instructors = action.payload;
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Assign role
      .addCase(assignRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(assignRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userCreated = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserCreated } = adminSlice.actions;
export default adminSlice.reducer;
