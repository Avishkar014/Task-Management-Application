import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/axios"

export const login = createAsyncThunk("auth/login", async creds => {
  const res = await api.post("/auth/login", creds)
  return res.data
})

export const register = createAsyncThunk("auth/register", async creds => {
  const res = await api.post("/auth/register", creds)
  return res.data
})

const saved = localStorage.getItem("token")
const initialState = { user: null, token: saved || null, status: "idle", error: null }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state){ state.user = null; state.token = null; localStorage.removeItem("token") }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user; state.token = action.payload.token; localStorage.setItem("token", action.payload.token)
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user; state.token = action.payload.token; localStorage.setItem("token", action.payload.token)
    })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
