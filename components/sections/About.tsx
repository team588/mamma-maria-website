import Image from 'next/image';

export default function About() {
  const benefits = [
    {
      icon: '/icon-chef.svg',
      title: 'Hausgemacht & frisch',
      description: 'Pasta, Pinsa, italienisches Frühstück und kleine Gerichte – täglich frisch und mit viel Liebe zubereitet.',
    },
    {
      icon: '/icon-pasta.svg',
      title: 'Italienisches Lebensgefühl',
      description: 'Ein freundliches Lächeln, warme Atmosphäre und gute Gespräche – einfach typisch italienisch.',
    },
    {
      icon: '/icon-delivery.svg',
      title: 'Für Sie & zum Mitnehmen',
      description: 'Alle Speisen gibt es selbstverständlich auch „to go" – für Büro, Zuhause oder unterwegs.',
    },
  ];

  return (
    <section id="about" className="relative bg-[#667e77] py-20 md:py-32 overflow-hidden">
      {/* Mobile: Restaurant Image */}
      <div className="relative w-full max-w-md mx-auto mb-12 px-6 lg:hidden">
        <div className="relative w-full rounded-lg overflow-hidden">
          <Image
            src="/about-restaurant.png"
            alt="Mamma Maria Restaurant Interior"
            width={640}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Desktop Layout - Exact Figma Coordinates */}
      <div className="hidden lg:block relative min-h-[2400px]">
        {/* Silhouette icon - EXACT Figma position */}
        <div className="absolute left-[902px] top-[1120px] w-[114px] h-[172px] z-10">
          <Image
            src="/about-silhouette.svg"
            alt=""
            width={114}
            height={172}
            className="w-full h-auto"
          />
        </div>

        {/* Photo - EXACT Figma position */}
        <div className="absolute left-[100px] top-[1592px]">
          {/* Main image */}
          <div className="relative w-[640px] h-[800px] rounded-lg overflow-hidden">
            <Image
              src="/about-restaurant.png"
              alt="Mamma Maria Restaurant Interior"
              width={640}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Offset border - EXACT Figma position */}
        <div className="absolute left-[110px] top-[1602px] w-[640px] h-[800px] border border-[#667e77] rounded-lg pointer-events-none" />

        {/* "Dolce Vita" - EXACT Figma position */}
        <h2 className="absolute left-[709px] top-[1260px] text-white text-[150px] font-serif font-normal leading-[0.84]">
          Dolce Vita
        </h2>

        {/* "im Alltag" - EXACT Figma position */}
        <h3 className="absolute left-[836px] top-[1386px] text-[#d6bc97] text-[150px] font-serif font-normal leading-[0.84]">
          im Alltag
        </h3>

        {/* Description - EXACT Figma position */}
        <p className="absolute left-[960px] top-[1668px] w-[730px] text-white text-[24px] leading-[1.5] font-light whitespace-pre-wrap">
          Im "Mamma Maria" schenken wir Ihrem Alltag ein Stück Italien – mit warmem Licht, handgemachter Küche und echter Gastfreundschaft. Ein Ort für eine kleine Pause zwischendurch, einen starken Espresso oder ein entspanntes Gespräch.
        </p>

        {/* Benefit 1: Hausgemacht & frisch - EXACT Figma position */}
        <div className="absolute left-[960px] top-[1862px]">
          <Image
            src="/icon-chef.svg"
            alt=""
            width={64}
            height={64}
            className="w-16 h-16"
          />
        </div>
        <h4 className="absolute left-[1054px] top-[1862px] text-white text-[36px] font-serif font-normal leading-[1.4]">
          Hausgemacht & frisch
        </h4>
        <p className="absolute left-[1054px] top-[1913px] w-[636px] text-white text-[20px] leading-[1.5] font-light whitespace-pre-wrap">
          Pasta, Pinsa, italienisches Frühstück und kleine Gerichte – täglich frisch und mit viel Liebe zubereitet.
        </p>

        {/* Divider line 1 - EXACT Figma position */}
        <div className="absolute left-[960px] top-[2003px] w-[730px] border-t border-white/30" />

        {/* Benefit 2: Italienisches Lebensgefühl - EXACT Figma position */}
        <div className="absolute left-[960px] top-[2033px]">
          <Image
            src="/icon-pasta.svg"
            alt=""
            width={64}
            height={64}
            className="w-16 h-16"
          />
        </div>
        <h4 className="absolute left-[1054px] top-[2033px] text-white text-[36px] font-serif font-normal leading-[1.4]">
          Italienisches Lebensgefühl
        </h4>
        <p className="absolute left-[1054px] top-[2084px] w-[636px] text-white text-[20px] leading-[1.5] font-light whitespace-pre-wrap">
          Ein freundliches Lächeln, warme Atmosphäre und gute Gespräche – einfach typisch italienisch.
        </p>

        {/* Divider line 2 - EXACT Figma position */}
        <div className="absolute left-[960px] top-[2174px] w-[730px] border-t border-white/30" />

        {/* Benefit 3: Für Sie & zum Mitnehmen - EXACT Figma position */}
        <div className="absolute left-[960px] top-[2204px]">
          <Image
            src="/icon-delivery.svg"
            alt=""
            width={64}
            height={64}
            className="w-16 h-16"
          />
        </div>
        <h4 className="absolute left-[1054px] top-[2204px] text-white text-[36px] font-serif font-normal leading-[1.4]">
          Für Sie & zum Mitnehmen
        </h4>
        <p className="absolute left-[1054px] top-[2255px] w-[636px] text-white text-[20px] leading-[1.5] font-light whitespace-pre-wrap">
          Alle Speisen gibt es selbstverständlich auch „to go" – für Büro, Zuhause oder unterwegs.
        </p>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden px-6 space-y-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-white text-6xl md:text-8xl font-serif font-normal leading-[0.84] mb-4">
            Dolce Vita
          </h2>
          <h3 className="text-[#d6bc97] text-5xl md:text-7xl font-serif font-normal leading-[0.84]">
            im Alltag
          </h3>
        </div>

        {/* Description */}
        <p className="text-white text-lg leading-[1.5]">
          Im "Mamma Maria" schenken wir Ihrem Alltag ein Stück Italien – mit warmem Licht, handgemachter Küche und echter Gastfreundschaft. Ein Ort für eine kleine Pause zwischendurch, einen starken Espresso oder ein entspanntes Gespräch.
        </p>

        {/* Benefits */}
        <div className="space-y-6 pt-4">
          {benefits.map((benefit, index) => (
            <div key={index}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16">
                  <Image
                    src={benefit.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-2xl font-serif font-normal leading-[1.4] mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-white text-base leading-[1.5]">
                    {benefit.description}
                  </p>
                </div>
              </div>
              {index < benefits.length - 1 && (
                <div className="border-t border-white/30 mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
