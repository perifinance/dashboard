const Progress = ({text, per}) => {
    return <div className="flex flex-col w-full">
            <div className="text-gray-700 font-normal leading-none">{text}</div>
            <div className="w-full">
                <div className="mt-2 bg-blue-600 rounded-full">
                    <div className="mt-2 bg-blue-500 py-1 rounded-full" style={{width: `${per}%`}}></div>
                </div>
            </div>
            <div className="self-end text-gray-700 font-medium">{per}%</div>
        </div>
}
export default Progress;