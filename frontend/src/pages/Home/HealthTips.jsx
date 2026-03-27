import { WobbleCard } from "../../components/ui/wobble-card";

const HealthTips = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-primary">
      <h1 className="text-3xl font-bold  text-center mt-8 mb-12">Health Tips</h1>

      <div className="grid grid-cols-1 b lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4">
        {/* Tip 1: Nutrition */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-auto bg-green-700 min-h-[350px] md:min-h-[400px] lg:min-h-[300px] relative overflow-hidden"
        >
          <div className="max-w-xs md:max-w-sm p-4">
            <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Eat a Balanced Diet
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Include plenty of fruits, vegetables, whole grains, and lean proteins
              in your meals to boost immunity and overall health.
            </p>
          </div>
          {/* <img
            src="/healthy_food.webp"
            width={400}
            height={400}
            alt="healthy food"
            className="absolute -right-4 md:-right-20 lg:-right-[40%] -bottom-8 md:-bottom-10 object-contain rounded-2xl w-40 md:w-48 lg:w-60"
          /> */}
        </WobbleCard>

        {/* Tip 2: Exercise */}
        <WobbleCard
          containerClassName="col-span-1 min-h-[300px] md:min-h-[350px] bg-orange-600 relative overflow-hidden p-4"
        >
          <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Stay Active Daily
          </h2>
          <p className="mt-4 max-w-full md:max-w-[26rem] text-left text-base/6 text-neutral-200">
            Engage in at least 30 minutes of moderate exercise every day to keep your
            heart healthy and reduce stress.
          </p>
        </WobbleCard>

        {/* Tip 3: Sleep & Hydration */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-3 bg-blue-800 min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] relative overflow-hidden p-4"
        >
          <div className="max-w-sm md:max-w-lg">
            <h2 className="text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Prioritize Sleep and Hydration
            </h2>
            <p className="mt-4 max-w-full md:max-w-[26rem] text-left text-base/6 text-neutral-200">
              Aim for 7-9 hours of sleep each night and drink plenty of water to
              keep your body functioning optimally.
            </p>
          </div>
          {/* <img
            src="/sleep_hydration.webp"
            width={400}
            height={400}
            alt="sleep and hydration"
            className="absolute -right-4 md:-right-20 lg:-right-[20%] -bottom-8 md:-bottom-10 object-contain rounded-2xl w-40 md:w-48 lg:w-60"
          /> */}
        </WobbleCard>
      </div>
    </div >
  );
};

export default HealthTips;