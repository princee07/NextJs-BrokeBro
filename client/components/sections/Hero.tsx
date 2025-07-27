import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center h-[300px] md:h-[420px] lg:h-[480px] !m-0 !p-0 !border-0">
      {/* Background image overlay */}
      <Image
        src="/assets/heromain.png"
        alt="Hero background"
        fill
        className="object-contain object-top pointer-events-none select-none"
        priority
      />
      {/* Decorative elements (optional, can be added as needed) */}
      {/* Main Content */}
    </section>
  );
}