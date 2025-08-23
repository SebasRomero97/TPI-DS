import { create } from 'zustand';

interface Permiso {
    user: string,
    pass: string,
    status: boolean,
    role: string,

    setUser: (user:string,pass:string) => void,
    loadUser: () => void,
    clearUser: () => void,
}

const setUserToStorage = (user: string, pass: string) => {
  const data = JSON.stringify({ user, pass, status: true });
  localStorage.setItem('session-storage', data);
};

const getUserFromStorage = (): { user: string; pass: string; status: boolean } | null => {
  const raw = localStorage.getItem('session-storage');
  return raw ? JSON.parse(raw) : null;
};

const clearUserFromStorage = () => {
  localStorage.removeItem('session-storage');
};


export const usePermission = create<Permiso>()(
    (set) => ({
        user: '',
        pass: '',
        status: false,
        role: '',

        setUser(user, pass) {
            setUserToStorage(user, pass);
            set({ user, pass, status: true });
        },

        loadUser() {
            const data = getUserFromStorage();
            if (data) {
            set({ ...data });
            }
        },

        clearUser() {
            clearUserFromStorage();
            set({ user: '', pass: '', status: false, role: '' });
        },

    }),
);
