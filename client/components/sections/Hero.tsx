import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center h-[220px] xs:h-[260px] sm:h-[300px] md:h-[420px] lg:h-[480px] !m-0 !p-0 !border-0">
      {/* Background image overlay */}
      <Image
        src="/assets/heromain.png"
        alt="Hero background"
        fill
        className="object-cover object-top pointer-events-none select-none transition-transform duration-500 scale-150 md:scale-100"
        priority
      />
      {/* Heading overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] w-full flex justify-center items-center z-10 px-2 sm:px-4">
        <h1
          className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center drop-shadow-lg font-sans rounded-xl px-2 py-2 sm:px-4 sm:py-3 leading-tight max-w-[98vw] sm:max-w-3xl"
          style={{
            fontFamily: 'Montserrat, Arial Rounded MT Bold, Arial, sans-serif',
            letterSpacing: '-0.03em',
          }}
        >
          India&apos;s largest student discount platform
        </h1>
      </div>
      {/* Decorative elements (optional, can be added as needed) */}
      {/* Main Content */}S
    </section>
  );
}