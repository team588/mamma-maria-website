import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt="Mamma Maria Restaurant Interior"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(17,29,29,0.52)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Mamma Maria Bistro Bar"
              width={244}
              height={84}
              className="w-auto h-16"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#speisekarte"
              className="text-white hover:text-white/80 transition-colors text-base"
            >
              Speisekarte
            </Link>
            <Link
              href="#about"
              className="text-white hover:text-white/80 transition-colors text-base"
            >
              Über uns
            </Link>
            <Link
              href="#kontakt"
              className="text-white hover:text-white/80 transition-colors text-base"
            >
              Kontakt
            </Link>
            <Link
              href="#visit"
              className="px-6 py-2 bg-[#6B7B65] hover:bg-[#7A8A74] text-white rounded-md transition-colors text-base"
            >
              Besuchen Sie uns
            </Link>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-white text-[120px] md:text-[200px] font-serif font-normal mb-4 leading-[0.84]">
              Dolce Vita
              <br />
              in Oberursel
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-2xl">
              Italienisches Frühstück, hausgemachte Pasta, Pizza & Pinsa – genießen Sie authentische italienische Gastfreundschaft.
            </p>
          </div>
        </div>

        {/* Contact Info + CTA - Bottom Right - ALL IN ONE CARD */}
        <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-sm rounded-2xl px-8 py-6 text-white space-y-4 min-w-[400px]">
          {/* Contact Info */}
          <div className="flex items-center gap-4 text-lg">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-normal">06171 629 820</span>
          </div>
          <div className="flex items-center gap-4 text-lg">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-normal">Mo–Fr 08:00–17:00</span>
          </div>

          {/* CTA Button - INSIDE the same card */}
          <Link
            href="#speisekarte"
            className="block w-full text-center px-8 py-4 bg-amber-100 hover:bg-amber-200 text-gray-900 rounded-lg transition-colors text-lg font-normal mt-6"
          >
            Unsere Speisekarte
          </Link>
        </div>
      </div>
    </section>
  );
}
