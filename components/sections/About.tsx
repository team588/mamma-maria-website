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

      {/* Desktop Layout - Using Grid */}
      <div className="hidden lg:block max-w-[1800px] mx-auto px-[100px] relative">
        {/* Silhouette icon - Positioned above heading */}
        <div className="absolute left-[902px] top-0 w-[114px] h-[172px] z-10">
          <Image
            src="/about-silhouette.svg"
            alt=""
            width={114}
            height={172}
            className="w-full h-auto"
          />
        </div>

        {/* Photo with offset border */}
        <div className="absolute left-0 top-[472px]">
          {/* Offset border */}
          <div className="absolute left-[10px] top-[10px] w-[640px] h-[800px] border border-[#667e77] rounded-lg" />

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

        {/* Heading - Center positioning */}
        <div className="absolute left-[609px] top-[140px]">
          <h2 className="text-white text-[150px] font-serif font-normal leading-[0.84]">
            Dolce Vita
          </h2>
          <h3 className="text-[#d6bc97] text-[150px] font-serif font-normal leading-[0.84] pl-[127px]">
            im Alltag
          </h3>
        </div>

        {/* Right side content - Description and Benefits */}
        <div className="absolute left-[860px] top-[548px] w-[730px]">
          {/* Description */}
          <p className="text-white text-[24px] leading-[1.5] mb-[194px] font-light">
            Im "Mamma Maria" schenken wir Ihrem Alltag ein Stück Italien – mit warmem Licht, handgemachter Küche und echter Gastfreundschaft. Ein Ort für eine kleine Pause zwischendurch, einen starken Espresso oder ein entspanntes Gespräch.
          </p>

          {/* Benefits */}
          <div className="space-y-[171px]">
            {benefits.map((benefit, index) => (
              <div key={index}>
                <div className="flex items-start gap-[30px]">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16">
                    <Image
                      src={benefit.icon}
                      alt=""
                      width={64}
                      height={64}
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-white text-[36px] font-serif font-normal leading-[1.4] mb-[13px]">
                      {benefit.title}
                    </h4>
                    <p className="text-white text-[20px] leading-[1.5] font-light w-[636px]">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Divider line (except for last item) */}
                {index < benefits.length - 1 && (
                  <div className="border-t border-white/30 mt-[170px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for desktop content */}
      <div className="hidden lg:block h-[1400px]" />

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
