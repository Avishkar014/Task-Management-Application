import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/axios"

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await api.get("/tasks"); return res.data
})
export const createTask = createAsyncThunk("tasks/create", async payload => {
  const res = await api.post("/tasks", payload); return res.data
})
export const updateTask = createAsyncThunk("tasks/update", async ({ id, data }) => {
  const res = await api.put(`/tasks/${id}`, data); return res.data
})
export const deleteTask = createAsyncThunk("tasks/delete", async id => {
  await api.delete(`/tasks/${id}`); return id
})

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => { state.items = action.payload })
    builder.addCase(createTask.fulfilled, (state, action) => { state.items.push(action.payload) })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.items = state.items.map(t => (t._id || t.id) === (action.payload._id || action.payload.id) ? action.payload : t)
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => { state.items = state.items.filter(t => (t._id || t.id) !== action.payload) })
  }
})

export default tasksSlice.reducer
