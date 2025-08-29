import { configureStore } from '@reduxjs/toolkit'
import cakeReducer from '../features/shop/cakeSlice'
import iceCreamReducer from '../features/shop/iceCreamSlice'
import usersReducer from '../features/users/usersSlice'
import themeReducer from '../features/theme/themeSlice'
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    users: usersReducer,
    theme: themeReducer,
  },
  middleware: (getDefault) =>
    process.env.NODE_ENV === 'development'
      ? getDefault({ serializableCheck: false }).concat(logger)
      : getDefault({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
})