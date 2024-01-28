import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "../constants";
import crypto from "crypto";
const initialState = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
  socketAccessKey: "123",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuItemClick: (state, action) => {
      console.log("menuItemClick payload:", action.payload);
      state.activeMenuItem = action.payload;
    },
    actionItemClick: (state, action) => {
      state.actionMenuItem = action.payload;
    },
    setSocketAccessKey: (state, action) => {
      state.socketAccessKey = action.payload;
    },
    generateSocketAccessKey: (state) => {
        state.socketAccessKey = crypto.randomBytes(7).toString("hex");
    },
  },
});

export const { menuItemClick, actionItemClick ,setSocketAccessKey,generateSocketAccessKey} = menuSlice.actions;

export default menuSlice.reducer;
