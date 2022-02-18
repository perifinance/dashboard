import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {rateChanges: Object} = {
	rateChanges: {}
};

const sliceName = 'rateChanges';

export const rateChanges = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setRateChanges: (state, action: PayloadAction<Object>) => {
			state.rateChanges = action.payload;
		},
	},
});

export const {
	setRateChanges,
} = rateChanges.actions;

export default rateChanges.reducer;
