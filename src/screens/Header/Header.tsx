import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { setClear } from "reducers/app";
import { Link, NavLink, useLocation } from "react-router-dom";

import "./Header.css";

const routerNames = {
	stake: "STAKING INFO",
	dex: "PERI DEX",
	pynths: "PYNTHS",
};

const Header = () => {
	const { stakeIsReady, dexIsReady, pynthsIsReady } = useSelector((state: RootState) => state.app);
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	useEffect(() => {
		setIsOpen(false);
		dispatch(setClear());
	}, [location]);

	return (
		<div className="relative lg:flex w-full lg:max-w-screen-xl lg:mx-auto lg:px-0 lg:gap-12">
			<div className="flex flex-none px-4 lg:px-0 lg:w-24 lg:h-16">
				<Link className="logo" to="/">
					<img className="w-8 h-8 lg:w-24 lg:h-16" alt="Logo" />
				</Link>
				<div className="text-xl block m-auto lg:hidden" onClick={() => setIsOpen(!isOpen)}>
					<div className="flex justify-center align-middle">
						<span>{routerNames[location.pathname.replace("/", "")]}</span>
						<img className="w-4 mx-2" src={`/images/icon/down_arrow.svg`} alt="reFresh"></img>
					</div>
				</div>
			</div>

			<div
				className={`absolute ${
					isOpen ? "flex" : "hidden lg:flex"
				} lg:relative flex-col lg:flex-row z-10 pt-4 lg:p-0 self-center bg-navy-700 text-xl w-full lg:w-auto lg:flex-auto font-normal`}
			>
				{Object.keys(routerNames).map((e) => {
					return (
						<NavLink
							className="active border-gray-700 text-gray-700 lg:text-white border-t lg:border-none px-3 py-2 whitespace-nowrap"
							to={e}
							key={e}
						>
							{routerNames[e]}
						</NavLink>
					);
				})}
			</div>
			<div className="hidden lg:flex text-sm text-gray-700 items-center text-right">
				<div className="w-60"></div>
				<div
					className="flex justify-center items-center w-7 h-7 bg-navy-500 rounded-full ml-2 cursor-pointer"
					onClick={() => {
						dispatch(setClear());
					}}
				>
					<img className={`w-4 h-4`} src={`/images/icon/refresh.svg`} alt="reFresh"></img>
				</div>
			</div>
		</div>
	);
};
export default Header;
