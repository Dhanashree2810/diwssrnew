import Image from 'next/image';
import teamBanner from '@/assets/images/team-banner.png'

export default function TeamBanner() {
  return (
    <div className="relative bg-gray-50 mt-20">
      <div className="relative w-full">
        <Image
          src={teamBanner}
          alt="Meet Our People"
          className="w-full h-64 sm:h-80 md:h-96 object-cover shadow-lg"
          width={1920}
          height={1080}
        />
        <div className="absolute top-10 left-8 sm:top-16 sm:left-16 bg-gradient-to-r from-[#9333EA] to-[#609AF8] px-8 py-6 sm:px-16 sm:py-20 rounded-lg shadow-lg animate-fade-in-down">
          <h1 className="text-white text-3xl font-semibold tracking-wider">
            User List
          </h1>
        </div>
      </div>
      <div className="mt-10 px-8 md:px-16 lg:px-24 text-center animate-fade-in">
        <p className="text-gray-700 text-lg lg:text-2xl font-medium">
          What does it mean to “Get the Future You Want”? Hear from some of our people around the world.
        </p>
      </div>
    </div>
  );
}
