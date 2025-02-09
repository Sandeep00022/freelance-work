import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    return (
        <div className="container mx-auto p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Have any questions or need assistance? Get in touch with us!
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card className="shadow-lg p-6 rounded-2xl border text-center flex flex-col items-center">
            <FaPhone className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Call Us</h2>
            <p className="text-gray-600 mb-4">+1 234 567 890</p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">Call Now</Button>
          </Card>
  
          <Card className="shadow-lg p-6 rounded-2xl border text-center flex flex-col items-center">
            <FaEnvelope className="text-6xl text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Email Us</h2>
            <p className="text-gray-600 mb-4">support@danceverse.com</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">Send Email</Button>
          </Card>
  
          <Card className="shadow-lg p-6 rounded-2xl text-center justify-center flex flex-col items-center">
            <FaMapMarkerAlt className="text-6xl text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Visit Us</h2>
            <p className="text-gray-600 mb-4">123 Dance Street, NY, USA</p>
            <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">Get Directions</Button>
          </Card>
        </div>
      </div>
    );
  }