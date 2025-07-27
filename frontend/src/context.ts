import { createContext, type Dispatch, type SetStateAction } from "react";

export const CurrencyContext = createContext<{
    currentCurrencyId: number | null;
    setCurrentCurrencyId: Dispatch<SetStateAction<number | null>>;
}>({
    currentCurrencyId: null,
    setCurrentCurrencyId: () => {},
});
