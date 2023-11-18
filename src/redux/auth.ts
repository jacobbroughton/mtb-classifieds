import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    setUser: (state, { payload }) => {
      return {
        ...state,
        user: payload,
        loading: false,
      };
    },
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
