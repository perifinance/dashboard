import Main from "./screens/Main";
import "./App.css";
import { RootState } from "reducers";
import { useSelector } from "react-redux";

const App = () => {
	const { stakeIsReady, dexIsReady, pynthsIsReady } = useSelector((state: RootState) => state.app);

	// todo loading spinner add
	// return <>{stakeIsReady || dexIsReady || pynthsIsReady ? <Main></Main> : <div>loading...</div>}</>;
	return <Main></Main>;
};

export default App;
