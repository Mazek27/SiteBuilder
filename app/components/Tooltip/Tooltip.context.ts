import React from "react";
import {FormDefinitions} from "~/components/Forms";

type TooltipContextType = {
    activeForm: string | null,
    definitions: Record<string, Function>
}

export const defaultValue = {
    activeForm: null,
    definitions: FormDefinitions
}

export const TooltipContext = React.createContext<TooltipContextType>(defaultValue);