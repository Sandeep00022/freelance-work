"use client";

import React from "react";
import { Navbar, Avatar, Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiShoppingBag } from "react-icons/hi";
import Dance from "../components/images/Dance.jpg";  // Path for the logo
import Slider from "react-slick";  // Import for the slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
 // Custom styles for the courses
import "./Navbar.css"
// Course data for slider
const courses = [
  { id: 1, name: "Ballet", description: "Learn the art of graceful dance.", img: "image1.jpg" },
  { id: 2, name: "Hip-Hop", description: "Energetic street dance class.", img: "image2.jpg" },
  { id: 3, name: "Salsa", description: "Hot and spicy Latin dance.", img: "image3.jpg" },
];

export function CoursesPage() {
  const [attendingClasses, setAttendingClasses] = React.useState(3); // Example: User attending 3 classes

  // React Slick Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="mt-16 h-screen w-64 bg-gray-100 fixed">
        <Sidebar aria-label="Sidebar">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>Dashboard</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiInbox}>Inbox</Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>Products</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </aside>

      {/* Main Content */}
      <main className="ml-64 mt-16 p-8 w-full">
        {/* Navbar */}
        <header className="w-full shadow-lg bg-white fixed z-50">
          <Navbar fluid={true} rounded={true} className="container mx-auto">
            <Navbar.Brand href="#home">
              <img src={Dance} alt="Dance Logo" className="h-10 w-10 rounded-full" />
              <span className="self-center text-xl font-bold text-gray-800 ml-3">Dance Academy</span>
            </Navbar.Brand>

            {/* Class Info */}
            <div className="flex ml-auto items-center">
              <div className="mr-4">
                <p className="text-gray-800">Classes Attending:</p>
                <h3 className="text-2xl font-semibold text-red-500">{attendingClasses}</h3>
              </div>
              <Avatar img={Dance} alt="Profile Picture" className="cursor-pointer" />
            </div>
          </Navbar>
        </header>

        {/* Course Slider Section */}
        <section className="mt-24">
          <h2 className="text-xl font-semibold mb-6">Available Courses</h2>
          <Slider {...settings}>
            {courses.map(course => (
              <div key={course.id} className="p-4">
                <img src={course.img} alt={course.name} className="w-full h-48 object-cover rounded-lg shadow-lg mb-3" />
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            ))}
          </Slider>
        </section>
      </main>
    </div>
  );
}

export default CoursesPage;
