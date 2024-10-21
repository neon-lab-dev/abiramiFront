type TStatusCardProps = {
    cardBg: string;
    iconBg: string;
    title: string;
    value: string | number;
    icon: string | undefined;
  };
  
  const StatusCard: React.FC<TStatusCardProps> = ({
    cardBg,
    iconBg,
    title,
    value,
    icon,
  }) => {
    return (
      <div className={`p-6 rounded-2xl w-[265px] font-Inter flex items-center justify-between ${cardBg}`}>
        <div className={`size-[52px] rounded-full bg-opacity-10 flex justify-center items-center ${iconBg}`}>
          <img src={icon} alt="" className="size-6" />
        </div>
  
        <div>
          <p className="text-neutral-5 text-xs leading-[18px]">{title}</p>
          <h1 className="text-black text-xl font-semibold leading-9 mt-2 text-end">
            {value}
          </h1>
        </div>
      </div>
    );
  };
  
  export default StatusCard;