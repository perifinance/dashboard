const ColorVerticalLabel = ({ color, text, per, size = "lg" }) => {
	return (
		<div className={`flex flex-col justify-end text-gray-700 w-26 bg-600 ${size === "sm" ? "justify-center lg:w-20" : "justify-start lg:w-27"}`}>
			<div className="text-[10px] ss:text-xs sm:text-sm font-normal self-center">{text}</div>
			<div className={`flex ${size === "sm" ? "flex-row" : "flex-row"} items-start gap-[2px] xs:gap-1`}>
				<div className={`${color} rounded-sm w-2 h-2 xs:w-3 xs:h-3 selection:${size === "sm" ? " ss:w-4 ss:h-4" : " ss:w-4 ss:h-4 sm:w-5 sm:h-5"} mx-1 my-1 lg:my-0`}/>
				<div className={`text-[11px] xs:text-sm ss:text-base sm:text-lg ${size === "sm" ? "lg:text-base" : "lg:text-xl"} lg:leading-none font-medium`}>{per}%</div>
			</div>
		</div>
	);
};
export default ColorVerticalLabel;
