import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Shared/Button/Button";
import CatagoryCard from "../../Components/Inventory/CatagoryCard";
import InputField from "../Shared/InputField/InputField";
import { ICONS } from "../../assets";
import { createCategory, getCategories } from "../../api/api";
import Loader from "../../lib/loader";
import { useSearch } from "../../context/SearchContext";
import { Category, CategoryResponse } from "../../types/category";
import { getSearchFunction } from "../../utils/searchUtils";

const CatagoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CategoryResponse | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ Catagory: "", inventory: [] });
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>();
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
        const data: CategoryResponse = await getCategories();
        setCategories(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setSearchQuery("");
    setSearchResults(null);
  }, [location]);
  useEffect(() => {
    setSearchResults(null);
  }, [searchQuery, setSearchResults]);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setSearching(true);

      const searchFunction = getSearchFunction(location.pathname);
      if (searchFunction) {
        try {
          const results = await searchFunction(searchQuery);
          if (results.data.length === 0) {
            alert("No data found!!!");
            return;
          }
          setSearchResults(results);
        } catch (error: unknown) {
          type ErrorResponse = {
            status: number;
          };
          const err = error as ErrorResponse;
          if (err.status === 404) {
            alert("Data not found!!!");
            return;
          } else {
            console.error("Search API error:", error);
          }
        } finally {
          setSearching(false);
        }
      } else {
        console.warn("No search function available for this route.");
      }
    }
  };
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
            <div className="flex flex-row gap-4 items-center ">
              {searching && (
                <>
                  <div>
                    <Loader w={5} h={5} />
                  </div>
                </>
              )}
              <div className="rounded-md p-1 px-2 bg-none bg-secondary-120 flex gap-2 justify-center items-center">
                <img src={ICONS.InputField} alt="Search Icon" />
                <input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
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
            {searchQuery.trim() === "" || searchResults === null ? (
              <>
                {categories &&
                  categories?.length > 0 &&
                  categories?.map((category: Category, index) => (
                    <CatagoryCard
                      key={index}
                      onClick={handleCardClick}
                      category={category}
                    />
                  ))}
              </>
            ) : (
              <>
                {searchResults &&
                  searchResults?.data?.length > 0 &&
                  searchResults?.data?.map(
                    (category: Category, index: number) => (
                      <CatagoryCard
                        key={index}
                        onClick={handleCardClick}
                        category={category}
                      />
                    )
                  )}
              </>
            )}
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
