import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container flex flex-col mx-auto p-6 items-center justify-center">
    <h1 className="text-4xl font-bold text-center mb-6">About DanceVerse</h1>
    <p className="text-center text-lg text-gray-600 mb-10">
      Welcome to DanceVerse – the ultimate platform for dance enthusiasts! Join a variety of dance courses or become a mentor to share your expertise.
    </p>
    
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="shadow-lg p-6 rounded-2xl border">
        <div className="flex flex-col items-center text-center">
          <FaUsers className="text-6xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Join Dance Courses</h2>
          <p className="text-gray-600 mb-4">
            Explore multiple dance styles and learn from the best mentors. Enroll in courses that match your passion and skill level.
          </p>
          <Link to={'/signup'} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">Explore Courses</Link>
        </div>
      </Card>

      <Card className="shadow-lg p-6 rounded-2xl border">
        <div className="flex flex-col items-center text-center">
          <FaChalkboardTeacher className="text-6xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Become a Mentor</h2>
          <p className="text-gray-600 mb-4">
            Share your dance skills with learners worldwide. Join as a mentor and inspire the next generation of dancers.
          </p>
          <Link to={'/signup'} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">Join as Mentor</Link>
        </div>
      </Card>
    </div>
  </div>
  );
}
