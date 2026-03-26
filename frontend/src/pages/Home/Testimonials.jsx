const testimonials = [
  {
    name: "Amit Kumar",
    role: "Patient",
    review: "Very easy booking and great doctors!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Neha Singh",
    role: "Patient",
    review: "Loved the consultation experience.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

import { AnimatedTestimonials } from  "../../components/ui/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
  {
    quote:
      "Booking an appointment was super easy and the doctor was very professional. Highly recommended!",
    name: "Amit Kumar",
    designation: "Patient",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  
  },
  {
    quote:
      "The consultation experience was excellent. The doctor explained everything clearly and patiently.",
    name: "Neha Singh",
    designation: "Patient",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "I was able to find a specialist near me quickly and the online booking system is very convenient.",
    name: "Rohit Sharma",
    designation: "Patient",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The doctors are very responsive and the support team helped me with my queries instantly.",
    name: "Priya Verma",
    designation: "Patient",
   src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Highly satisfied with the service. Scheduling appointments and follow-ups has never been easier.",
    name: "Karan Mehta",
    designation: "Patient",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
 },
];
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-8">
    Patient Reviews
  </h2>
  <AnimatedTestimonials testimonials={testimonials} />
</div>
  );
}
