import { configureStore } from "@reduxjs/toolkit";
import { AppStartSlicer } from './reducers/appStartSlicer';
import { mtuServerSlicer } from './reducers/MtuServerSlicer';
import { FSUIPCSlicer } from './reducers/FSUIPCSlicer';
import { PhidgetsSlicer } from './reducers/PhidgetsSlicer';
import { ThrottleUpdatingValues } from './reducers/ThrottleUpdatingValuesSlicer';

export const initializeStore = configureStore({
  reducer: {
      appStart: AppStartSlicer.reducer,
      conStatusMTUServer: mtuServerSlicer.reducer,
      conStatusServiceFSUIPC: FSUIPCSlicer.reducer,    
      conStatusServicePHIDGETS: PhidgetsSlicer.reducer,
      /* valueSharesServerViwer: */
      throttleUpdatingValues: ThrottleUpdatingValues.reducer,
  }
})

export type RootState = ReturnType<typeof initializeStore.getState>;
export type AppDispatch = typeof initializeStore.dispatch;
export default initializeStore;