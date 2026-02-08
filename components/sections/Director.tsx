import Image from 'next/image';

export default function Director() {
  return (
    <section className="relative bg-[#667e77] py-20 md:py-32">
      {/* Desktop Layout - Exact Figma Coordinates (relative to section start at y=2552) */}
      <div className="hidden lg:block relative h-[760px]">
        {/* Photo with arch shape - EXACT Figma position */}
        <div className="absolute left-[770px] top-[20px] w-[380px] h-[380px] rounded-t-[300px] rounded-b-lg overflow-hidden">
          <Image
            src="/director-photo.png"
            alt="Gianfranco Pilurzi"
            width={545}
            height={726}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Outline border 1 - EXACT Figma position (offset 10px) */}
        <div className="absolute left-[760px] top-[10px] w-[400px] h-[380px] border border-[#667e77] rounded-t-[300px] rounded-b-lg pointer-events-none" />

        {/* Outline border 2 - EXACT Figma position (offset 20px) */}
        <div className="absolute left-[750px] top-[0px] w-[420px] h-[380px] border border-[#667e77] rounded-t-[300px] rounded-b-lg pointer-events-none" />

        {/* Quote - EXACT Figma position */}
        <p className="absolute left-[460px] top-[430px] w-[1000px] text-white text-[70px] font-serif italic leading-[1.1] text-center">
          "Wir stehen für Qualität, Herzlichkeit und eine entspannte Atmosphäre – italienisch, familiär, mit Stil."
        </p>

        {/* Name and title - EXACT Figma position */}
        <div className="absolute left-[1186px] top-[691px] text-white">
          <p className="text-[28px] font-normal leading-[1.5]">Gianfranco Pilurzi</p>
          <p className="text-[20px] font-light leading-[1.5] text-[#d6bc97]">und das Mamma-Maria-Team</p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden px-6 space-y-8">
        {/* Photo with arch shape */}
        <div className="mx-auto w-64 h-64 rounded-t-full rounded-b-lg overflow-hidden">
          <Image
            src="/director-photo.png"
            alt="Gianfranco Pilurzi"
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quote */}
        <p className="text-white text-3xl md:text-4xl font-serif italic leading-tight text-center">
          "Wir stehen für Qualität, Herzlichkeit und eine entspannte Atmosphäre – italienisch, familiär, mit Stil."
        </p>

        {/* Name and title */}
        <div className="text-center text-white">
          <p className="text-xl font-normal">Gianfranco Pilurzi</p>
          <p className="text-base font-light text-[#d6bc97]">und das Mamma-Maria-Team</p>
        </div>
      </div>
    </section>
  );
}
