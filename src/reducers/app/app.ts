import { createSlice } from "@reduxjs/toolkit";

export type AppSliceState = {
	stakeIsReady: boolean;
	dexIsReady: boolean;
	pynthsIsReady: boolean;
	loadings: boolean;
};

const initialState: AppSliceState = {
	stakeIsReady: false,
	dexIsReady: false,
	pynthsIsReady: false,
	loadings: false,
};

const sliceName = "app";

export const appSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setStakeIsReady: (state) => {
			state.stakeIsReady = true;
		},
		setDexIsReady: (state) => {
			state.dexIsReady = true;
		},
		setPynthsIsReady: (state) => {
			state.pynthsIsReady = true;
		},
		setClear: (state) => {
			state.stakeIsReady = false;
			state.dexIsReady = false;
			state.pynthsIsReady = false;
		},
		setLoading: (state, action) => {
			state.loadings = action.payload;
		},
	},
});

export const { setStakeIsReady, setDexIsReady, setPynthsIsReady, setClear, setLoading } = appSlice.actions;

export default appSlice.reducer;
