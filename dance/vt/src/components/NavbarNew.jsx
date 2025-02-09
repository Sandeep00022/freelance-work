import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";


import "./Navbar.css";
import { useDispatch,  } from "react-redux";

const courses = [
  { id: 1, name: "Ballet", description: "Learn the art of graceful dance.", timeSpent: 60, img: "https://cdn.blackpoolgrand.co.uk/app/uploads/2015/10/Nutcracker-small.jpg" },
  { id: 2, name: "Hip-Hop", description: "Energetic street dance class.", timeSpent: 50, img: "https://media.ipassio.com/media/ckeditor_image/2024/04/22/latin-jazz.webp" },
  { id: 3, name: "Bollywood", description: "Groovy Indian-style dancing.", timeSpent: 50, img: "https://shorturl.at/niBCL" },
];

const todayClasses = [
  { id: 1, name: "Ballet Class", time: "6:00 PM - 7:00 PM" },
  { id: 2, name: "Hip-Hop Class", time: "7:00 PM - 8:00 PM" },
  { id: 3, name: "Bollywood Class", time: "8:00 PM - 9:00 PM" },
];



export function MainWithSidebar() {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  
    const dispatch =  useDispatch()
    const totalCourses = courses.length;
    const totalMinutes = courses.reduce((acc, course) => acc + course.timeSpent, 0);
  

    

    return (
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <div className="flex">
          {/* Sidebar */}
          
  
          {/* Main Content */}
          <div className="ml-64 flex-1 bg-gradient-to-b from-gray-900 to-black text-white p-8 pt-24">
            {/* Statistics */}
            <div className="flex justify-between bg-gray-800 p-4 rounded-lg mb-8">
              <div>
                <h3 className="text-2xl">{totalCourses}</h3>
                <p className="text-gray-400">Total Courses</p>
              </div>
              <div>
                <h3 className="text-2xl">{totalMinutes}</h3>
                <p className="text-gray-400">Minutes Spent</p>
              </div>
            </div>
  
            {/* Video Section */}
            <iframe
              src="https://www.youtube.com/embed/gaf6iwsXqMA?autoplay=1&mute=1"
              className="w-full rounded-lg shadow-lg mb-8"
              height="400"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
  
            {/* Courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white text-gray-900 rounded-lg shadow-lg">
                  <img src={course.img} alt={course.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{course.name}</h4>
                    <p className="text-sm">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Today’s Classes */}
            <div className="bg-gray-800 text-white p-6 rounded-lg mt-8">
              <h3 className="text-2xl font-semibold mb-4">Today’s Classes</h3>
              <div>
                {todayClasses.map((classItem) => (
                  <div key={classItem.id} className="bg-gray-900 p-4 rounded-lg mb-2">
                    <div className="flex justify-between">
                      <span>{classItem.name}</span>
                      <span className="text-gray-400">{classItem.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* New Unique Sections Below */}
            
            {/* Upcoming Events */}
            <div className="bg-gray-800 text-white p-6 rounded-lg mt-8">
              <h3 className="text-2xl font-semibold mb-4">Upcoming Events</h3>
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <h4 className="font-medium">Dance Battle Night</h4>
                <p className="text-sm text-gray-400">Join us for an exciting night of friendly dance battles on the 20th of January!</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <h4 className="font-medium">Choreography Workshop</h4>
                <p className="text-sm text-gray-400">Master the latest choreography moves with our expert instructor on the 25th of January.</p>
              </div>
            </div>
  
            {/* Quick Poll */}
            <div className="bg-gray-800 text-white p-6 rounded-lg mt-8">
              <h3 className="text-2xl font-semibold mb-4">Quick Poll: Which Dance Style Do You Prefer?</h3>
              <div className="flex gap-4">
                <button className="bg-teal-500 py-2 px-4 rounded-md">Ballet</button>
                <button className="bg-teal-500 py-2 px-4 rounded-md">Hip-Hop</button>
                <button className="bg-teal-500 py-2 px-4 rounded-md">Bollywood</button>
              </div>
            </div>
  
            {/* Daily Dance Tips */}
            <div className="bg-gray-800 text-white p-6 rounded-lg mt-8">
              <h3 className="text-2xl font-semibold mb-4">Today's Dance Tip</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <p className="text-sm">Remember to always warm up before your class to prevent injury and get the most out of your session!</p>
              </div>
            </div>
  
            {/* Student Spotlight */}
            <div className="bg-gray-800 text-white p-6 rounded-lg mt-8">
              <h3 className="text-2xl font-semibold mb-4">Student Spotlight</h3>
              <div className="bg-gray-900 p-4 rounded-lg mb-2">
                <p className="font-medium">John Doe</p>
                <p className="text-sm">Congratulations to John for completing the Ballet course with 100% progress! Keep dancing!</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg mb-2">
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm">Great job to Jane for mastering the Hip-Hop routine in record time!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default MainWithSidebar;
  