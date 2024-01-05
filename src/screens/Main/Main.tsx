import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header";
import Stake from "pages/Stake";
import Dex from "pages/Dex";
import Pynths from "pages/Pynths";

const Main = () => {
	return (
		<div className="bg-navy-700 h-full xl:h-screen text-white font-light lg:ml-5 lg:mr-5">
			<div className="2xl:container py-4 xl:pt-6 2xl:pt-14 mx-auto">
				<Router>
					<Header></Header>
					<div className="flex justify-center py-4 w-full lg:max-w-screen-xl xl:pt-6 2xl:pt-14 mx-auto">
						<Routes>
							<Route path="/stake" element={<Stake />} />
							<Route path="/dex" element={<Dex />} />
							<Route path="/pynths" element={<Pynths />} />
							<Route path="/" element={<Navigate to="/stake" />} />
						</Routes>
					</div>
				</Router>
			</div>
		</div>
	);
};
export default Main;
