import type { ReactNode } from "react";
import SignIn from "../../features/auth/sign-in/sign-in";
import SignUp from "../../features/auth/sign-up/sign-up";

export const ModalMapping = {
    'sign-in': SignIn,
    'sign-up': SignUp
}

export type ModalKey = keyof typeof ModalMapping;

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: string;  // ex: "500px", "50%", "max-w-xl"
    height?: string; // ex: "400px", "80vh"

};
