import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  alertMsg: null,
  alertType: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  sidebarCalender: false,
  settings: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, { payload }) {
      state.user = payload;
    },
    isLoggedOut(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
    setAlert(state, { payload }) {
      state.alertType = payload.type;
      state.alertMsg =
        payload.type === "error"
          ? payload.msg.data?.message || payload.msg.error
          : payload.msg;
    },
    clearAlert(state) {
      state.alertType = null;
      state.alertMsg = null;
    },
    setTokens(state, { payload }) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    setInst(state, { payload }) {
      state.institution = payload;
    },
    setSidebarCalender(state, { payload }) {
      state.sidebarCalender = payload;
    },
    setSettings(state, { payload }) {
      state.settings = payload;
    },

    resetUser() {
      return initialState;
    },
  },
});

export const {
  getUser,
  isLoggedOut,
  setAlert,
  clearAlert,
  resetUser,
  setTokens,
  setSidebarCalender,
  setSettings,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
