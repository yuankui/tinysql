import { ReactNode } from "react";

export interface Action {
    title ?: string,
    confirmMessage ?: string,
    icon ?: ReactNode,
    onClick: () => any,
}