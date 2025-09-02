import { configureStore } from "@reduxjs/toolkit";
import { appStartSlicer } from './reducers/appStartSlicer';
import { mtuServerSlicer } from './reducers/MtuServerSlicer';
import { fsuipcSlicer } from './reducers/FSUIPCSlicer';
import { phidgetsSlicer } from './reducers/PhidgetsSlicer';
import { mtuPartsPositionsSlicer } from './reducers/MTUPartsPositionsSlicer';

export const initializeStore = configureStore({
  reducer: {
      appStart: appStartSlicer.reducer,
      conStatusMTUServer: mtuServerSlicer.reducer,
      conStatusServiceFSUIPC: fsuipcSlicer.reducer,    
      conStatusServicePHIDGETS: phidgetsSlicer.reducer,
      /* valueSharesServerViwer: */
      mtuPartsPositions: mtuPartsPositionsSlicer.reducer,
  },
})

export type RootState = ReturnType<typeof initializeStore.getState>;
export type AppDispatch = typeof initializeStore.dispatch;
export default initializeStore;