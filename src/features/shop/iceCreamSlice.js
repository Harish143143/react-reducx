import { createSlice } from '@reduxjs/toolkit'

const iceCreamSlice = createSlice({
  name: 'iceCream',
  initialState: { count: 20 },
  reducers: {
    ordered: (state) => { 
      if (state.count > 0) state.count-- 
    },
    restocked: (state, action) => { 
      state.count += action.payload || 1 
    }
  }
})

export const { ordered, restocked } = iceCreamSlice.actions
export default iceCreamSlice.reducer