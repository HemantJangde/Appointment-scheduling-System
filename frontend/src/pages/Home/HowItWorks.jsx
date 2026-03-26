import { motion } from "framer-motion";
import { FaUserPlus, FaUserMd, FaCalendarCheck, FaHeartbeat } from "react-icons/fa";

const steps = [
  { icon: <FaUserPlus />, title: "Register / Login" },
  { icon: <FaUserMd />, title: "Choose Doctor" },
  { icon: <FaCalendarCheck />, title: "Book Slot" },
  { icon: <FaHeartbeat />, title: "Get Treatment" },
];

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-b min-h-screen flex items-center justify-center from-base-100 to-base-200 py-20 px-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16"
        >
          How It Works
        </motion.h2>

        {/* Steps */}
        <div className="relative grid md:grid-cols-4 gap-10">

          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="relative z-10"
            >
              <div className="backdrop-blur-xl bg-white/60 border border-white/20 
                              rounded-2xl p-8 shadow-xl 
                              hover:shadow-2xl transition duration-300">

                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 
                                w-8 h-8 rounded-full bg-primary text-white 
                                flex items-center justify-center text-sm font-bold shadow-md">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="text-4xl text-primary mb-4 flex justify-center">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg">
                  {step.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;