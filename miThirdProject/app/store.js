import { configureStore } from "@reduxjs/toolkit";
import detailSlice from "../reducers";

export default configureStore({
  reducer: {
    detail: detailSlice,
  },
});
