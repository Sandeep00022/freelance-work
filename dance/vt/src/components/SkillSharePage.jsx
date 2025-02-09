import React, { useState } from "react";
import { HiPlusCircle, HiCheckCircle } from "react-icons/hi";
import "./SkillSharePage.css";

export function SkillSharePage() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: "",
    description: "",
    credentials: "",
    certificate: null,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);

  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  const addSkill = async () => {
    if (!newSkill.name || !newSkill.description || !newSkill.credentials || !certificateFile) {
      alert("Please fill in all fields and upload a certificate.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newSkill.name);
    formData.append("description", newSkill.description);
    formData.append("credentials", newSkill.credentials);
    formData.append("certificate", certificateFile);

    try {
      const response = await fetch("/add-skill", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSkills([...skills, result.skill]);
        setSuccessMessage("Skill Added Successfully!");
        setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
        setNewSkill({ name: "", description: "", credentials: "", certificate: null });
        setCertificateFile(null);
      } else {
        alert(result.message || "Error adding skill");
      }
    } catch (error) {
      alert("An error occurred while adding the skill.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r mt-[100px] from-teal-500 to-indigo-500 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-8 relative">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Share Your Premium Dance Skills</h1>

        {successMessage && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center text-green-600 p-4 rounded-lg shadow-lg bg-green-50 animate__animated animate__fadeIn">
            <HiCheckCircle className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">{successMessage}</span>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Teach Your Premium Dance Moves</h2>

          <div className="flex gap-4 mt-4 justify-center">
            <input
              type="text"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 text-lg flex-1 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Skill Name (e.g., Ballet, Salsa)"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <input
              type="text"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 text-lg flex-1 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Skill Description"
              value={newSkill.description}
              onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Add your credentials (e.g., Instructor qualifications, experience, etc.)"
              value={newSkill.credentials}
              onChange={(e) => setNewSkill({ ...newSkill, credentials: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <input
              type="file"
              className="bg-teal-500 text-white px-6 py-3 rounded-md file:mr-2 file:rounded-l-full file:bg-teal-300 file:text-white file:px-6"
              onChange={handleFileChange}
            />
            {certificateFile && (
              <p className="text-sm mt-2 text-gray-700">Uploaded Certificate: {certificateFile.name}</p>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={addSkill}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 shadow-lg flex items-center"
            >
              <HiPlusCircle className="w-5 h-5 mr-2" /> Add Your Skill
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Premium Dance Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-bold text-teal-600 mb-2">{skill.name}</h3>
                <p className="text-lg text-gray-600 mb-4">{skill.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-800">Credentials</h4>
                  <p className="text-sm text-gray-600">{skill.credentials}</p>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800">Certificate</h4>
                  <p className="text-sm text-gray-600">{skill.certificate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillSharePage;
