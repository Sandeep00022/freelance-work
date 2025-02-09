import { FaPlayCircle } from "react-icons/fa";  // Updated to FontAwesome's PlayCircle

export function LearnerSkillPage() {
  // Code remains the same
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-teal-500 to-indigo-500 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-8 relative">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Start Learning Dance Skills
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-bold text-teal-600 mb-2">{skill.name}</h3>
              <p className="text-lg text-gray-600 mb-4">{skill.description}</p>
              <div className="mb-4">
                <a
                  href={skill.tutorialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 flex items-center justify-center"
                >
                  <FaPlayCircle className="w-6 h-6 mr-2" /> Watch Tutorial  {/* Updated here */}
                </a>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-800">Your Progress</h4>
                <p className="text-sm text-gray-600">{learningProgress[skill.id]}</p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => updateProgress(skill.id, "In Progress")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all"
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={() => updateProgress(skill.id, "Completed")}
                  className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
