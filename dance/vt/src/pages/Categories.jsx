import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCategory, fetchCategories } from "../redux/category/categorySlice";
import CategoryCard from "../components/CategoryCard";
import { motion } from "framer-motion";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const userRole = useSelector((state) => state?.user?.currentUser);
  console.log("user role", userRole);

  const [categoryData, setCategoryData] = useState({
    name: "",
    difficultyLevel: "",
    timeInterval: "",
    image: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !categoryData.name ||
      !categoryData.difficultyLevel ||
      !categoryData.timeInterval
    ) {
      toast.error("Please fill all fields");
      return;
    }
     console.log("cartes", categoryData)
    dispatch(addCategory(categoryData));
    toast.success("Category added successfully!");
    setCategoryData({ name: "", difficultyLevel: "", timeInterval: "", image: "" });
  };

  return (
    <div className="min-h-screen ml-[250px] mt-[100px] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
             <h2 className="text-white"> Dance Categories</h2>
            </span>
          </motion.h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-black sm:mt-4">
            Meet our team of expert professionals
          </p>
        </div>

      {/* Admin Add Category Form */}
      {userRole?.role === "admin" && (
        <div className="max-w-md mx-auto mb-6 p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Category</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Category Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter category name"
                value={categoryData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Difficulty Level</label>
              <select
                name="difficultyLevel"
                value={categoryData.difficultyLevel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="" disabled>Select Difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Time Interval (weeks)</label>
              <input
                type="text"
                name="timeInterval"
                placeholder="Enter duration in weeks"
                value={categoryData.timeInterval}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={categoryData.image}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Add Category
            </button>
          </form>
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-center text-blue-500">Loading categories...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Show Message if No Categories Exist */}
      {!loading && categories.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          <p className="text-lg font-semibold">No categories available yet. 🎭</p>
          {userRole?.role === "admin" ? (
            <p className="text-gray-600">Add a new category to get started!</p>
          ) : (
            <p className="text-gray-600">Stay tuned! New dance courses coming soon.</p>
          )}
        </div>
      )}

      {/* Category List */}
      {categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
             <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
