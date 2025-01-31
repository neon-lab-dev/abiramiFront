import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Shared/Button/Button";
import CatagoryCard from "../../Components/Inventory/CatagoryCard";
import InputField from "../Shared/InputField/InputField";
import { ICONS } from "../../assets";
import { createCategory, getCategories } from "../../api/api";
import Loader from "../../lib/loader";

const CatagoryList = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ Catagory: "", inventory: [] });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    const data = {
      name: formData.Catagory,
      inventory: formData.inventory,
    };
    setIsSubmitting(true);
    try {
      const response = await createCategory(data);
      console.log("Client created successfully:", response.data);
      alert("Category created successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      toggleEditModal();
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`/inventory/InventoryTable/${id}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data: any[] = await getCategories();
        setCategories(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="border-t-2 border-dashed">
          {/* Header Section */}
          <div className="w-full py-2 mb-2 flex justify-between items-center">
            <h3 className="font-bold px-2">Inventory List Page</h3>
            <div className="flex flexrow gap-4 ">
              <div className="rounded-md p-1 px-2 bg-none bg-secondary-120 flex gap-2 justify-center items-center">
                <img src={ICONS.InputField} alt="Search Icon" />
                <input
                  type="search"
                  placeholder="Search"
                  className="border-0 hidden md:block outline-0 md:w-[170px] lg:w-[200px] bg-transparent text-black placeholder:text-black"
                />
              </div>
              <Button
                text="Create Category"
                imgSrc={ICONS.clientOutline}
                color="bg-secondary-120 text-[14px] text-secondary-125"
                iconClassName="h-[24px] w-[24px]"
                onClick={toggleEditModal}
              />
            </div>
          </div>

          {/* Category Cards Section */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories?.length > 0 &&
              categories?.map((category) => (
                <CatagoryCard onClick={handleCardClick} category={category} />
              ))}
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
              <div className="bg-white rounded-3xl p-6 w-[70%] h-[350px] shadow-lg  ">
                {/* Modal Header */}
                <div className="flex justify-between pb-4">
                  <span className="font-Inter font-[600] text-sm">Edit</span>
                  <img
                    src={ICONS.close}
                    alt="Close"
                    onClick={toggleEditModal}
                    className="cursor-pointer"
                  />
                </div>

                {/* Client Information Section */}
                <div>
                  <span className="font-Inter font-[600] text-sm">
                    Category Information
                  </span>
                  <div className="w-full pt-[22px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
                    <InputField
                      label="Catagory"
                      inputBg=""
                      required={true}
                      type="text"
                      placeholder="Enter Catagory"
                      name="Catagory"
                      value={formData.Catagory}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="col-span-3 flex justify-center gap-4 my-8">
                  <Button
                    text="Clear Form"
                    type="reset"
                    color="text-primary-10 bg-none"
                  />
                  <Button
                    text={isSubmitting ? "Updating..." : "Update Category"}
                    type="submit"
                    onClick={handleSubmit}
                    color="bg-primary-10 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CatagoryList;
