import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-2xl mt-[10%] shadow-lg transform transition-all hover:-translate-y-2 duration-300 hover:shadow-2xl">
      <div className="p-6">
        <div className="flex justify-center -mt-16">
          <img
            src={category.image || "https://via.placeholder.com/300"}
            alt={category.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <h3 className="mt-8 text-2xl font-bold text-gray-900 text-center">
          {category.name}
        </h3>
        <p className="mt-2 text-gray-600 text-center font-medium">
          <span className="font-semibold">Difficulty:</span>{" "}
          {category.difficultyLevel}
        </p>
        <p className="text-gray-600 text-center font-medium">
          <span className="font-semibold">Time:</span> {category.timeInterval}{" "}
          weeks
        </p>
        <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
