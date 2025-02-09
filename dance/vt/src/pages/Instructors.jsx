import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  fetchInstructors,
  resetUserCreated,
} from "../redux/user/adminSlice";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPlus,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Instructors = () => {
  const dispatch = useDispatch();
  const { instructors, loading, error, userCreated } = useSelector(
    (state) => state.admin
  );
  const userRole = useSelector((state) => state?.user?.currentUser);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "instructor",
    image: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchInstructors());
  }, [dispatch]);

  useEffect(() => {
    if (userCreated) {
      setMessage("Instructor created successfully!");
      dispatch(fetchInstructors());
      dispatch(resetUserCreated());
      setTimeout(() => setMessage(""), 3000);
    }
  }, [userCreated, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "instructor",
      image: "",
    });
  };

  return (
    <div className="min-h-screen ml-[250px] mt-[100px] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
             <h2 className="text-white"> Our Instructors</h2>
            </span>
          </motion.h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-black sm:mt-4">
            Meet our team of expert professionals
          </p>
        </div>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg max-w-md mx-auto">
            {message}
          </div>
        )}

        {userRole?.role === "admin" && (
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-blue-500 p-3 rounded-full shadow-lg">
                <FaChalkboardTeacher className="text-white text-2xl" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">
                Add New Instructor
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-black">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL (optional)"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
              >
                <FaPlus className="inline-block mr-2" /> Create Instructor
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64 text-lg font-semibold">
            Loading...
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
            {instructors?.map((instructor) => (
              <div
                key={instructor._id}
                className="bg-white rounded-2xl shadow-lg transform transition-all hover:-translate-y-2 duration-300 hover:shadow-2xl"
              >
                <div className="p-6">
                  <div className="flex justify-center -mt-16">
                    <img
                      src={
                        instructor.image ||
                        "https://source.unsplash.com/random/400x400/?person"
                      }
                      alt={instructor.name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold text-gray-900 text-center">
                    {instructor.name}
                  </h3>
                  <div className="mt-4 text-gray-600 text-center">
                    <FaEnvelope className="inline-block mr-2 text-blue-500" />
                    <a
                      href={`mailto:${instructor.email}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {instructor.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors;
