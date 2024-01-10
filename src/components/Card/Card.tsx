const Card = ({ children }) => {
  const className = "bg-blue-950 rounded-lg p-[10px] ss:p-4 sm-p5 lg:px-8 w-full h-full min-w-[310px] xs:min-w-0";
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};
export default Card;
