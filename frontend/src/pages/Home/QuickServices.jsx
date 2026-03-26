import { FaCalendarCheck, FaUserMd, FaVideo, FaAmbulance } from "react-icons/fa";

const services = [
  {
    title: "Book Appointment",
    icon: <FaCalendarCheck size={26} />,
  },
  {
    title: "Check Availability",
    icon: <FaUserMd size={26} />,
  },
  {
    title: "Online Consultation",
    icon: <FaVideo size={26} />,
  },
  {
    title: "Emergency Help",
    icon: <FaAmbulance size={26} />,
  },
];

const QuickServices = () => {
  return (
    <section className="bg-gradient-to-b min-h-screen from-blue-50 to-white py-20 px-6 md:px-12 lg:px-20">
      
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Quick Services
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Access healthcare services instantly and efficiently
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-100 
                       rounded-2xl p-7 text-center 
                       shadow-sm hover:shadow-xl 
                       hover:-translate-y-2 
                       transition duration-300 ease-in-out cursor-pointer"
          >
            {/* Icon */}
            <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center 
                            rounded-xl bg-blue-50 text-blue-600 
                            group-hover:bg-blue-600 group-hover:text-white 
                            transition duration-300">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">
              {service.title}
            </h3>

            {/* Optional subtle description */}
            <p className="text-sm text-gray-400 mt-2">
              Quick and easy access
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickServices;