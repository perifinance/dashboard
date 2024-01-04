import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Ticker = {
    lastPrice: bigint;
    low24hr: bigint;
    high24hr: bigint;
    change: bigint;
    timestamp: number;
};

const initialState: Ticker = {
    lastPrice: 0n,
    low24hr: 0n,
    high24hr: 0n,
    change: 0n,
    timestamp: 0,
};

export const periTicker = createSlice({
    name: "periChartRates",
    initialState,
    reducers: {
        setPeriTicker: (state, action: PayloadAction<Ticker>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setPeriTicker } = periTicker.actions;

export default periTicker.reducer;
