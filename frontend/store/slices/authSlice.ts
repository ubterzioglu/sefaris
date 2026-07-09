import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, User } from "@/lib/types";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

function initial(): AuthState {
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem("sefaris_auth");
      if (raw) return JSON.parse(raw) as AuthState;
    } catch {
      /* yoksay */
    }
  }
  return { token: null, refreshToken: null, user: null };
}

const authSlice = createSlice({
  name: "auth",
  initialState: initial(),
  reducers: {
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("sefaris_auth", JSON.stringify(state));
      }
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("sefaris_auth");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
