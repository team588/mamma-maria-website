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
    <section id="about" className="relative bg-[#667e77] py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Restaurant Image */}
          <div className="relative">
            {/* Silhouette icon */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 lg:block hidden">
              <Image
                src="/about-silhouette.svg"
                alt=""
                width={128}
                height={128}
                className="w-full h-auto"
              />
            </div>

            {/* Restaurant Image */}
            <div className="relative rounded-lg overflow-hidden border-2 border-[#667e77]/50">
              <Image
                src="/about-restaurant.png"
                alt="Mamma Maria Restaurant Interior"
                width={640}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            {/* Heading */}
            <div>
              <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-normal leading-[0.84] mb-4">
                Dolce Vita
              </h2>
              <h3 className="text-[#d6bc97] text-4xl md:text-6xl lg:text-7xl font-serif font-normal leading-[0.84]">
                im Alltag
              </h3>
            </div>

            {/* Description */}
            <p className="text-white text-lg md:text-xl leading-relaxed max-w-2xl">
              Im "Mamma Maria" schenken wir Ihrem Alltag ein Stück Italien – mit warmem Licht, handgemachter Küche und echter Gastfreundschaft. Ein Ort für eine kleine Pause zwischendurch, einen starken Espresso oder ein entspanntes Gespräch.
            </p>

            {/* Benefits */}
            <div className="space-y-6 pt-4">
              {benefits.map((benefit, index) => (
                <div key={index}>
                  <div className="flex items-start gap-4">
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
                      <h4 className="text-white text-2xl md:text-3xl font-serif font-normal leading-tight mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-white/90 text-base md:text-lg leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  {/* Divider line (except for last item) */}
                  {index < benefits.length - 1 && (
                    <div className="border-t border-white/20 mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
