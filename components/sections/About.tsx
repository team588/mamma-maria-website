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
      <div className="container mx-auto px-6 relative">
        {/* Silhouette icon - Centered at top */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-28 h-44 hidden lg:block z-10">
          <Image
            src="/about-silhouette.svg"
            alt=""
            width={114}
            height={172}
            className="w-full h-auto"
          />
        </div>

        {/* Main content wrapper */}
        <div className="relative pt-20 lg:pt-32">
          {/* Restaurant Image with offset border - Left side */}
          <div className="absolute left-0 lg:left-[100px] top-20 lg:top-32 w-full max-w-[640px] hidden lg:block">
            {/* Offset border/outline */}
            <div className="absolute left-[10px] top-[10px] w-full h-[800px] border border-[#667e77] rounded-lg" />

            {/* Main image */}
            <div className="relative w-full h-[800px] rounded-lg overflow-hidden">
              <Image
                src="/about-restaurant.png"
                alt="Mamma Maria Restaurant Interior"
                width={640}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Centered heading */}
          <div className="text-center lg:text-left lg:absolute lg:left-[50%] lg:-translate-x-1/2 lg:top-36 mb-12 lg:mb-0 lg:w-[500px]">
            <h2 className="text-white text-6xl md:text-8xl lg:text-[150px] font-serif font-normal leading-[0.84] mb-4">
              Dolce Vita
            </h2>
            <h3 className="text-[#d6bc97] text-5xl md:text-7xl lg:text-[150px] font-serif font-normal leading-[0.84]">
              im Alltag
            </h3>
          </div>

          {/* Right side - Description and Benefits */}
          <div className="lg:ml-auto lg:w-[730px] space-y-8 lg:absolute lg:right-0 lg:top-72">
            {/* Description */}
            <p className="text-white text-lg md:text-2xl leading-[1.5] max-w-[730px]">
              Im "Mamma Maria" schenken wir Ihrem Alltag ein Stück Italien – mit warmem Licht, handgemachter Küche und echter Gastfreundschaft. Ein Ort für eine kleine Pause zwischendurch, einen starken Espresso oder ein entspanntes Gespräch.
            </p>

            {/* Benefits */}
            <div className="space-y-8 pt-8">
              {benefits.map((benefit, index) => (
                <div key={index}>
                  <div className="flex items-start gap-6">
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
                      <h4 className="text-white text-3xl md:text-4xl font-serif font-normal leading-[1.4] mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-white text-lg md:text-xl leading-[1.5]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  {/* Divider line (except for last item) */}
                  {index < benefits.length - 1 && (
                    <div className="border-t border-white/30 mt-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Restaurant Image */}
        <div className="relative w-full max-w-md mx-auto mb-12 lg:hidden">
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
      </div>

      {/* Add enough padding at bottom to accommodate absolute positioned content */}
      <div className="h-[600px] lg:h-[900px]" />
    </section>
  );
}
