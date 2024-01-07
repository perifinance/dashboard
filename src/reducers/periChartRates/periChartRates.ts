import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type tick = {
	price: string
	low: string
	high: string
	formatPrice: string
	formatLow: string
	formatHigh: string
	timestamp: number
	time: string
} 


const initialState: {rates: Array<tick>} = {
	rates: []
};

const sliceName = 'periChartRates';

export const periChartRates = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setPeriChartRates: (state, action: PayloadAction<Array<tick>>) => {
			state.rates = action.payload;
		},
	},
});

export const {
	setPeriChartRates,
} = periChartRates.actions;

export default periChartRates.reducer;