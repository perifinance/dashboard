import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { circulatingSupply:bigint } = {
	circulatingSupply: 0n
}

const sliceName = 'circulatingSupply';

export const circulatingSupply = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setCirculatingSupply: (state, action: PayloadAction<bigint>) => {
            state.circulatingSupply = action.payload;
		},
	},
});

export const {
	setCirculatingSupply,
} = circulatingSupply.actions;

export default circulatingSupply.reducer;
