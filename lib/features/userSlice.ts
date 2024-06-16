import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Eip1193Provider } from "ethers";

interface IUser {
  address: `0x${string}` | null;
  walletProvider: Eip1193Provider | null;
  pledgedAmount: number;
}

const initialState = {
  address: null,
  walletProvider: null,
  pledgedAmount: 0,
} satisfies IUser as IUser;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: { payload: IUser }) {
      state.address = payload.address;
      state.walletProvider = payload.walletProvider;
      state.pledgedAmount = payload.pledgedAmount;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
