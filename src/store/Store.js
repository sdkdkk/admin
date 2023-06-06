import { configureStore } from "@reduxjs/toolkit";

import reducer from "./Rootreducer";

export default configureStore({
    reducer,
});