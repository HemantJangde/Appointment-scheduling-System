const FeaturedDoctors = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Top Doctors
          </h2>
          <p className="text-gray-600 mt-2">
            Find specialists with proven experience and high patient ratings
          </p>
        </div>

        {/* Scroll / Grid Container */}
        <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {topDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 min-w-[260px] md:min-w-0"
            >
              {/* Doctor Image */}
              <div className="flex justify-center pt-6">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-primary"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{doc.specialty}</p>
                <p className="text-sm text-gray-400 mt-1">{doc.experience}</p>

                {/* Rating */}
                <div className="flex justify-center items-center gap-1 mt-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-700 font-medium">{doc.rating}</span>
                </div>

                {/* Button */}
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold hover:scale-105 transition transform">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const topDoctors = [
  {
    id: 1,
    name: "Dr. Aarav Mehta",
    specialty: "Neurologist",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4.9,
    experience: "12 yrs",
  },
  {
    id: 2,
    name: "Dr. Ishita Roy",
    specialty: "Gynecologist",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    rating: 4.8,
    experience: "10 yrs",
  },
  {
    id: 3,
    name: "Dr. Kabir Khan",
    specialty: "ENT Specialist",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    rating: 4.7,
    experience: "8 yrs",
  },
  {
    id: 4,
    name: "Dr. Meera Joshi",
    specialty: "Psychiatrist",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5.0,
    experience: "15 yrs",
  },
];
export default FeaturedDoctors;