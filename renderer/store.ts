import { configureStore } from "@reduxjs/toolkit";
import { AppStartSlicer } from './redux/appStartSlicer';
import { mtuServerSlicer } from './redux/MtuServerSlicer';
import { FSUIPCSlicer } from './redux/FSUIPCSlicer';
import { PhidgetsSlicer } from './redux/PhidgetsSlicer';
import { ThrottleReadySlicer } from './redux/ThrottleReadySlicer';
import { Throttle737FlapsSlicer } from './redux/Throttle737FlapsSlicer';
import { Throttle737SpeedBrakeSlicer } from './redux/Throttle737SpeedBrakeSlicer';
import { Throttle737TH1_RevSlicer } from './redux/Throttle737TH1_RevSlicer';
import { Throttle737TH2_RevSlicer } from './redux/Throttle737TH2_RevSlicer';

export const initializeStore = configureStore({
    reducer: {
        appStart: AppStartSlicer.reducer,
        mtuServer: mtuServerSlicer.reducer,
        serviceFSUIPC: FSUIPCSlicer.reducer,    
        servicePHIDGETS: PhidgetsSlicer.reducer,
        throttleReady: ThrottleReadySlicer.reducer,
        Throttle737Flaps: Throttle737FlapsSlicer.reducer,
        Throttle737SpeedBrake: Throttle737SpeedBrakeSlicer.reducer,
        Throttle737TH1_Rev: Throttle737TH1_RevSlicer.reducer,
        Throttle737TH2_Rev: Throttle737TH2_RevSlicer.reducer,
    },
})
    
export type RootState = ReturnType<typeof initializeStore.getState>;
export type AppDispatch = typeof initializeStore.dispatch;
export default initializeStore;