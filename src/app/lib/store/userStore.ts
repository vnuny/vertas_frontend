"use client";
import { create } from "zustand";

export type User = {
  name: string;
  email: string;
  avatar: string;
  isPaid: boolean;
  createdAt: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const testUser: User = {
  name: "Diaa Ali",
  email: "vnun.b2b@gmail.com",
  avatar:
    "https://i.pinimg.com/736x/ec/69/ed/ec69ed716a89b933fa4a50583beedde7.jpg",
  isPaid: true,
  createdAt: "2024-01-01T00:00:00.000Z"
};

export const useUserStore = create<UserStore>((set) => ({
  user: testUser,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}));
