const Card = ({ children }) => {
  const className = "bg-navy-500 rounded-lg p-[10px] ss:p-4 sm-p5 lg:px-8 w-full h-full min-w-[310px]";
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};
export default Card;
