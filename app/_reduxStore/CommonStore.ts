import { configureStore } from "@reduxjs/toolkit";
import { AppStartSlicer } from './reducers/appStartSlicer';
import { mtuServerSlicer } from './reducers/MtuServerSlicer';
import { FSUIPCSlicer } from './reducers/FSUIPCSlicer';
import { PhidgetsSlicer } from './reducers/PhidgetsSlicer';
import { ThrottleUpdatingValues } from './reducers/ThrottleUpdatingValuesSlicer';

export const initializeStore = configureStore({
  reducer: {
      appStart: AppStartSlicer.reducer,
      mtuServer: mtuServerSlicer.reducer,
      serviceFSUIPC: FSUIPCSlicer.reducer,    
      servicePHIDGETS: PhidgetsSlicer.reducer,
      throttleUpdatingValues: ThrottleUpdatingValues.reducer,
  }
})

export type RootState = ReturnType<typeof initializeStore.getState>;
export type AppDispatch = typeof initializeStore.dispatch;
export default initializeStore;