import { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add Student
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
      {/*
      Main Container
       * Button
       * Search Box
       * Student Table Placeholder
       */}
    </div>
  );
};

export default Dashboard;
