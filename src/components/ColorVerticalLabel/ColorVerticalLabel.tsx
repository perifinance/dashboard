const ColorVerticalLabel = ({ color, text, per, size = "lg" }) => {
	return (
		<div className={`flex items-end text-gray-700 w-24 bg-600 ${size === "sm" ? "items-center lg:w-36" : "items-start lg:w-27"}`}>
			<div className={`${color} rounded-md ${size === "sm" ? "lg:w-4 lg:h-4" : "w-5 h-5"} mx-2 my-1 lg:my-0`}></div>
			<div className={`flex ${size === "sm" ? "flex-row" : "flex-col"} items-center gap-1`}>
				<div className="text-sm font-normal leading-none self-start">{text}</div>
				<div className={`text-lg ${size === "sm" ? "lg:text-base" : "lg:text-xl"} lg:leading-none font-medium`}>{per}%</div>
			</div>
		</div>
	);
};
export default ColorVerticalLabel;
