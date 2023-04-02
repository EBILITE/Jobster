import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);

    // ==========OR========

    // try {
    //   const resp = await customFetch.post("/auth/register", user);
    //   return resp.data;
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.response.data.msg);
    // }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,

  //====================== Reducers=========
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      toast.success("Logout Successful!");
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },

  // ====================ExtraReducers ============
  // ==============================================
  extraReducers: {
    // =================RegisterUser============
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },

    // payload is anything we are returning in the regiterUser ie the resp.data

    [registerUser.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello there ${user.name}`);
    },

    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //============ LoginUser ==================

    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },

    // payload is anything we are returning in the regiterUser ie the resp.data

    [loginUser.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello there ${user.name}`);
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },

  // ================== UpdateUser ===================

  [updateUser.pending]: (state) => {
    state.isLoading = true;
  },
  [updateUser.fulfilled]: (state, { payload }) => {
    const { user } = payload;
    state.isLoading = false;
    state.user = user;

    addUserToLocalStorage(user);
    toast.success("User Updated");
  },
  [updateUser.rejected]: (state, { payload }) => {
    state.isLoading = false;
    toast.error(payload);
  },
  [clearStore.rejected]: () => {
    toast.error("There was an error");
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
