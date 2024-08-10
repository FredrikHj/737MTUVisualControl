import { configureStore } from "@reduxjs/toolkit";
import { AppStartSlicer } from './redux/appStartSlicer';
import { mtuServerSlicer } from './redux/MtuServerSlicer';
import { FSUIPCSlicer } from './redux/FSUIPCSlicer';
import { PhidgetsSlicer } from './redux/PhidgetsSlicer';
import { ThrottleUpdatingValues } from './redux/ThrottleUpdatingValuesSlicer';

export const initializeStore = configureStore({
    reducer: {
        appStart: AppStartSlicer.reducer,
        mtuServer: mtuServerSlicer.reducer,
        serviceFSUIPC: FSUIPCSlicer.reducer,    
        servicePHIDGETS: PhidgetsSlicer.reducer,
        throttleUpdatingValues: ThrottleUpdatingValues.reducer,
    },
})
    
export type RootState = ReturnType<typeof initializeStore.getState>;
export type AppDispatch = typeof initializeStore.dispatch;
export default initializeStore;