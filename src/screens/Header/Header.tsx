import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { setClear } from "reducers/app";
import { Link, NavLink, useLocation } from "react-router-dom";

import "./Header.css";

const routerNames = {
	stake: "ECOSYSTEM",
	dex: "DEX TRADE",
	pynths: "PERI PYNTHS",
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
	
    const menuRef = useRef<HTMLDivElement>(null);
    const closeModalHandler = useCallback(
        (e) => {
            if (
                isOpen &&
                e.target.id !== "menu_caller" &&
                !menuRef.current?.contains(e.target)
            ) {
                setIsOpen(false);
            }
        },
        [isOpen]
    );

	useEffect(() => {
        window.addEventListener("click", closeModalHandler);

        return () => {
            window.removeEventListener("click", closeModalHandler);
        };
    }, [closeModalHandler]);

	return (
		<div className="relative md:flex md:mx-auto w-full justify-center px-5 lg:max-w-screen-xl ">
			<div className="flex justify-between items-center w-full md:w-2/12 md:h-16 lg:px-0">
				<Link className="logo" to="/">
					<img className="w-8 h-8 md:w-24 md:h-16" alt="Logo" />
				</Link>
				<div className="text-xl block m-auto md:hidden">
					<div className="flex justify-center align-middle">
						<span>{routerNames[location.pathname.replace("/", "")]}</span>
					</div>
				</div>
				<div id="menu_caller" className="flex justify-center items-center md:hidden" onClick={() => setIsOpen(!isOpen)}>
					<img id="menu_caller" className="w-4 mx-2" src={`/images/icon/drawer.svg`} alt="mobil_menu"></img>
				</div>
			</div>
			

			<div
				className={`absolute md:relative md:w-9/12 ${
					isOpen ? "flex" : "hidden md:flex"
				} flex-col md:flex-row z-10 self-center border-[0.5px] md:border-none border-gray-900 rounded-md md:rounded-none right-5 bg-navy-700 text-xs md:text-xl w-fit md:w-auto font-normal`}
			>
				{Object.keys(routerNames).map((e) => {
					return (
						<NavLink
							className="active border-gray-700 text-gray-700 px-3 py-2 whitespace-nowrap"
							to={e}
							key={e}
						>
							{routerNames[e]}
						</NavLink>
					);
				})}
			</div>
			<div className="hidden md:flex text-sm text-gray-700 items-center justify-end w-1/12">
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
