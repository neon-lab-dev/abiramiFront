import { ICONS } from "../../assets";
import { Category } from "../../types/category";

const CatagoryCard = ({
  onClick,
  category,
}: {
  onClick?: (id: string) => void;
  category: Category;
}) => {
  return (
    <div
      onClick={() => onClick && onClick(category.id)}
      className="cursor-pointer w-full mx-auto p-4 border rounded-lg shadow-md hover:shadow-lg via-white flex transition-shadow duration-300 relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0  pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-row items-center gap-4">
        <div className=" bg-primary-10   p-4 rounded-full">
          <img src={ICONS.InventoryIcon} alt={""} />
        </div>
        <div>
          <p className="text-xs font-normal font-Inter flex-1 m-1">Category</p>
          <h2 className="text-xl font-semibold flex-1 m-1">{category.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default CatagoryCard;
