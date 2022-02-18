import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: object = {
	
};

const sliceName = 'exchangeRates';

export const exchangeRates = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setExchangeRates: (state, action: PayloadAction<object>) => {
            Object.keys(action.payload).forEach(e => {
                state[e] = action.payload[e];
            })
		},
	},
});

export const {
	setExchangeRates,
} = exchangeRates.actions;

export default exchangeRates.reducer;
