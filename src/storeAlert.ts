import { create } from "zustand";

interface AlertStore {
  message: string;
  code: number;
  showAlert: (message: string, code: number) => void;
  reset: () => void;
}

const useAlert = create<AlertStore>((set) => ({
  message: "",
  code: 0,
  showAlert: (message, code = 0) => {
    set(() => ({ message, code }));
    setTimeout(() => {
      set(() => ({ message: "", code: 0 }));
    }, 3000);
  },
  reset: () => set(() => ({ message: "", code: 0 })),
}));

export default useAlert;
