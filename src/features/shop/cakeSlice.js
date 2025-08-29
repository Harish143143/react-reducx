import { createSlice } from '@reduxjs/toolkit'

const cakeSlice = createSlice({
  name: 'cake',
  initialState: { count: 10 },
  reducers: {
    ordered: (state) => { 
      if (state.count > 0) state.count-- 
    },
    restocked: (state, action) => { 
      state.count += action.payload || 1 
    }
  }
})

export const { ordered, restocked } = cakeSlice.actions
export default cakeSlice.reducer