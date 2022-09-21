import Main from "./screens/Main";
import "./App.css";
import { RootState } from "reducers";
import { useSelector } from "react-redux";
import Loading from "components/Loading";

const App = () => {
	return (
		<>
			<Loading />
			<Main></Main>
		</>
	);
};

export default App;
