import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BiometricsState {
  doorBiometrics: boolean;
  fanBiometrics: boolean;
  lightBiometrics: boolean;
  pumpBiometrics: boolean;
  setDoorBiometrics: (value: boolean) => void;
  setFanBiometrics: (value: boolean) => void;
  setLightBiometrics: (value: boolean) => void;
  setPumpBiometrics: (value: boolean) => void;
}

export const useBiometricsStore = create<BiometricsState>()(
  persist(
    (set) => ({
      doorBiometrics: true,
      fanBiometrics: false,
      lightBiometrics: false,
      pumpBiometrics: false,
      setDoorBiometrics: (value: boolean) => set({ doorBiometrics: value }),
      setFanBiometrics: (value: boolean) => set({ fanBiometrics: value }),
      setLightBiometrics: (value: boolean) => set({ lightBiometrics: value }),
      setPumpBiometrics: (value: boolean) => set({ pumpBiometrics: value }),
    }),
    {
      name: 'biometrics-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        doorBiometrics: state.doorBiometrics,
        fanBiometrics: state.fanBiometrics,
        lightBiometrics: state.lightBiometrics,
        pumpBiometrics: state.pumpBiometrics,
      }),
    }
  )
);
