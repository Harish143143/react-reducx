import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { api } from './api.js'

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState({ 
  status: 'idle', 
  error: null,
  editingUser: null,
  updateStatus: 'idle'
})

// Async thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await api.get('/users')
  return res.data
})

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      // just return updated data
      return { id, ...userData }
    } catch (error) {
      return rejectWithValue('Failed to update user')
    }
  }
)

// Delete user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      return userId
    } catch (error) {
      return rejectWithValue('Failed to delete user')
    }
  }
)

// Create user
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const newUser = { ...userData, id: Date.now() }
      console.log('Created user:', newUser)
      return newUser
    } catch (error) {
      return rejectWithValue('Failed to create user')
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setEditingUser: (state, action) => {
      state.editingUser = action.payload
    },
    clearEditingUser: (state) => {
      state.editingUser = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => { 
        state.status = 'loading' 
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        usersAdapter.setAll(state, action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      
    // Update user
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded'
        usersAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        })
        state.editingUser = null
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = 'failed'
        state.error = action.payload
      })
      
    // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload
      })
      
    // Create user
      .addCase(createUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export const { setEditingUser, clearEditingUser, clearError } = usersSlice.actions

export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(state => state.users)