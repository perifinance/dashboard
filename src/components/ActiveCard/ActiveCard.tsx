const ActiveCard = ({children, isActive, onClick}) => {
    return <div className={`${isActive ? 'bg-navy-500 font-medium' : 'bg-transparent text-gray-700'} border border-navy-500 rounded-lg w-46 h-10 cursor-pointer`} onClick={onClick}>
            {children}
        </div>
}
export default ActiveCard;