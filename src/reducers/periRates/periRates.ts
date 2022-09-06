import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: object = {
	
};

const sliceName = 'periRates';

export const periRates = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setPeriRates: (state, action: PayloadAction<object>) => {
            Object.keys(action.payload).forEach(e => {
                state[e] = action.payload[e];
            })
		},
	},
});

export const {
	setPeriRates,
} = periRates.actions;

export default periRates.reducer;
