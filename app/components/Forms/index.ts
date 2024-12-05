import React from 'react';
import { PageForm } from '~/components/Layout/Header/components/Pages.desktop';

export const FormDefinitions: Record<string, Function> = {
    headerPages: PageForm,
};

type FormContextType = {
    activeForm: string | null;
    definitions: Record<string, Function>;
};

export const defaultValue = {
    activeForm: null,
    definitions: FormDefinitions,
};

export const FormContext = React.createContext<FormContextType>(defaultValue);
