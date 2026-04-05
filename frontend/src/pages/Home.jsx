import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Globe,
  Mail,
  ShieldCheck,
  Star,
  MapPinned,
  PhoneCall,
  Clock3,
  MessageCircle,
  Camera,
} from 'lucide-react';

const heroDestinations = [
  {
    title: 'Himachal',
    location: 'Manali • Kasol • Kullu',
    date: '18 May 2026',
    tagline: 'Snow valleys, pine air and a laid-back mountain circuit.',
    price: '₹16,999',
    button: 'Get Himachal details',
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Manali, Himachal Pradesh',
    location: 'Old Manali • Solang Valley',
    date: '22 May 2026',
    tagline: 'Snow-kissed peaks and cedar-lined mountain air',
    price: '₹17,500',
    button: 'Chase mountain calm',
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Goa Beaches',
    location: 'North Goa • South Goa',
    date: '14 June 2026',
    tagline: 'Tropical sunsets, music and ocean-blue mornings',
    price: '₹17,800',
    button: 'Book coastal vibe',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Jaipur, Rajasthan',
    location: 'Pink City',
    date: '8 July 2026',
    tagline: 'Royal courtyards, palaces and warm desert glow',
    price: '₹19,600',
    button: 'See royal routes',
    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Kerala Backwaters',
    location: 'Alleppey • Kumarakom',
    date: '21 August 2026',
    tagline: 'Houseboats, coconut palms and slow luxury',
    price: '₹21,400',
    button: 'Cruise the backwaters',
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Leh Ladakh',
    location: 'Ladakh Road Trip',
    date: '1 Oct 2026',
    duration: '11N/12D',
    tagline: 'Epic passes, monastery sunsets and a high-altitude expedition.',
    price: '₹29,999',
    button: 'Get Ladakh details',
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Amarnath Yatra',
    location: 'Pahalgam Route',
    date: '30 June 2026',
    tagline: 'A spiritual mountain journey with sacred views and guided support.',
    price: '₹18,000',
    button: 'Ask about the yatra',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Nivati Beach',
    location: 'Konkan',
    date: '9–12 April',
    duration: '3D/2N',
    tagline: 'A hidden Konkan shoreline with slow sunsets and easy beach days.',
    price: '₹4,999',
    button: 'See beach getaway',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
];

const services = [
  {
    icon: BedDouble,
    title: 'Trusted Travel Partner',
    text: 'Years of expertise, safe planning and thousands of happy travellers across India and beyond.',
  },
  {
    icon: CalendarDays,
    title: 'Personalized Experiences',
    text: 'Custom travel packages designed around your budget, interests and preferred style of journey.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe and Hassle-Free',
    text: 'Verified stays, trusted transport and smooth support for a worry-free travel experience.',
  },
];

const whyChoosePoints = [
  'Best Price Guarantee with strong hotel, transport and tour partnerships.',
  '24/7 customer support so help is available at every step of your journey.',
  'Seamless booking flow to explore, compare and book trips in just a few clicks.',
];

const movingReviews = [
  {
    name: 'Rhea & Kunal',
    trip: 'Honeymoon in Kerala',
    text: 'Every moment felt considered, from the spice market detour to our candle-lit houseboat dinner.',
  },
  {
    name: 'Arjun Mehta',
    trip: 'Friends trip to Goa',
    text: 'The site looks premium, and the vibe matches the trips: youthful, Indian and beautifully put together.',
  },
  {
    name: 'Meera Sharma',
    trip: 'Family holiday in Rajasthan',
    text: 'Hotels, transfers and sightseeing were planned so smoothly that we could simply enjoy the trip.',
  },
  {
    name: 'Kabir Singh',
    trip: 'Ladakh adventure',
    text: 'The itinerary balanced thrill and comfort perfectly, with support available whenever we needed it.',
  },
  {
    name: 'Naina Verma',
    trip: 'Weekend in Goa',
    text: 'Booking was quick, pricing was fair, and the whole journey felt effortless from start to finish.',
  },
];

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

const swipeConfidenceThreshold = 90;

const getWhatsappTripLink = (tripTitle) =>
  `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi Bharat Escapes, I want details of the ${tripTitle} trip.`
  )}`;

const Home = () => {
  const [activeHero, setActiveHero] = useState(2);

  const nextHero = () => setActiveHero((current) => (current + 1) % heroDestinations.length);
  const previousHero = () =>
    setActiveHero((current) => (current - 1 + heroDestinations.length) % heroDestinations.length);

  useEffect(() => {
    const timer = window.setInterval(nextHero, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const visibleCards = useMemo(() => {
    const offsets = [-2, -1, 0, 1, 2];
    return offsets.map((offset) => {
      const index = (activeHero + offset + heroDestinations.length) % heroDestinations.length;
      return {
        ...heroDestinations[index],
        index,
        offset,
      };
    });
  }, [activeHero]);

  const handleHeroDragEnd = (_, info) => {
    if (info.offset.x <= -swipeConfidenceThreshold) {
      nextHero();
    }

    if (info.offset.x >= swipeConfidenceThreshold) {
      previousHero();
    }
  };

  const handleHeroCardClick = (tripTitle) => {
    window.open(getWhatsappTripLink(tripTitle), '_blank', 'noopener,noreferrer');
  };

  return (
    <main id="top" className="relative overflow-hidden text-white">
      <video
        className="absolute inset-0 z-0 h-full w-full origin-center scale-[1.2] object-cover [object-position:72%_68%]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/back.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(3,8,20,0.9),rgba(3,8,20,0.9))]" />
      <div className="relative z-20">
      <section id="journeys" className="relative scroll-mt-28 min-h-[72svh] px-4 pb-6 pt-24 sm:min-h-[76vh] sm:px-6 sm:pb-8 sm:pt-28 lg:scroll-mt-32 lg:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1),transparent_30%)]" />
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-start sm:min-h-[64vh]">
          <div className="relative -mt-6 sm:-mt-8 lg:-mt-10">
            <div className="absolute left-1/2 top-1/2 hidden h-[440px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-cyan-400/18 blur-3xl lg:block" />

            <button
              type="button"
              onClick={previousHero}
              className="absolute left-0 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-slate-900/70 text-white shadow-[0_18px_40px_rgba(2,6,23,0.32)] backdrop-blur transition-all hover:scale-[1.04] hover:bg-white/12 lg:flex"
              aria-label="Previous location"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={nextHero}
              className="absolute right-0 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-slate-900/70 text-white shadow-[0_18px_40px_rgba(2,6,23,0.32)] backdrop-blur transition-all hover:scale-[1.04] hover:bg-white/12 lg:flex"
              aria-label="Next location"
            >
              <ChevronRight size={24} />
            </button>

            <div className="relative mx-auto flex h-[520px] w-full max-w-[90rem] items-center justify-center [perspective:1800px] sm:h-[600px] lg:h-[640px]">
              {visibleCards.map((card) => {
                const isActive = card.offset === 0;
                const rotateY = card.offset * -10;
                const rotateZ = card.offset * 1.5;
                const scale = isActive ? 1.08 : Math.max(0.72, 1 - Math.abs(card.offset) * 0.12);
                const opacity = isActive ? 1 : Math.max(0.22, 0.78 - Math.abs(card.offset) * 0.18);

                return (
                  <motion.div
                    key={card.title}
                    drag={isActive ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={isActive ? handleHeroDragEnd : undefined}
                    onClick={isActive ? () => handleHeroCardClick(card.title) : undefined}
                    onKeyDown={
                      isActive
                        ? (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              handleHeroCardClick(card.title);
                            }
                          }
                        : undefined
                    }
                    transition={{ duration: 0.78, ease: [0.25, 1, 0.5, 1] }}
                    animate={{
                      x:
                        card.offset === 0
                          ? '0rem'
                          : `calc(${card.offset} * clamp(4rem, 18vw, 18rem))`,
                      scale,
                      opacity,
                      y: isActive ? -18 : 12,
                      rotateY,
                      rotateZ,
                      zIndex: 10 - Math.abs(card.offset),
                    }}
                    className={`group absolute left-1/2 top-1/2 h-[420px] w-[292px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] border border-white/12 shadow-[0_24px_80px_rgba(2,6,23,0.55)] sm:h-[470px] sm:w-[326px] lg:h-[500px] lg:w-[338px] ${
                      isActive ? 'cursor-pointer' : 'pointer-events-none'
                    }`}
                    role={isActive ? 'link' : undefined}
                    tabIndex={isActive ? 0 : -1}
                    aria-label={isActive ? `Open WhatsApp chat for ${card.title}` : undefined}
                    style={{
                      transformStyle: 'preserve-3d',
                      filter: isActive ? 'none' : 'blur(1.3px) saturate(0.8)',
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${card.image})` }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.2)_34%,rgba(2,6,23,0.88)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%)]" />

                    <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                      <p className="text-xs uppercase tracking-[0.32em] text-white/72">Featured stay</p>
                      <h2 className="mt-3 text-[1.7rem] font-black uppercase tracking-[0.18em] text-white sm:text-[2rem]">
                        {card.title}
                      </h2>
                      {(card.location || card.date) && (
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.18em] text-white/58 sm:text-sm">
                          {card.location && <span>{card.location}</span>}
                          {card.date && <span>{card.date}</span>}
                        </div>
                      )}
                      <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                        {card.tagline}
                      </p>
                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/50">
                            Starting from
                          </p>
                          <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                            {card.price}
                          </p>
                        </div>
                        {card.duration && (
                          <div className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                            {card.duration}
                          </div>
                        )}
                      </div>
                      <a
                        href={getWhatsappTripLink(card.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/18"
                      >
                        {card.button}
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={previousHero}
                  className="rounded-full border border-white/15 bg-white/8 p-3 text-white backdrop-blur transition-colors hover:bg-white/16"
                  aria-label="Previous location"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={nextHero}
                  className="rounded-full border border-white/15 bg-white/8 p-3 text-white backdrop-blur transition-colors hover:bg-white/16"
                  aria-label="Next location"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              {heroDestinations.map((destination, index) => (
                <button
                  key={destination.title}
                  type="button"
                  onClick={() => setActiveHero(index)}
                  aria-label={`Show ${destination.title}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeHero ? 'w-10 bg-orange-400' : 'w-2.5 bg-white/28 hover:bg-white/42'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.section {...sectionMotion} id="why-us" className="scroll-mt-28 px-4 py-8 text-slate-900 sm:px-6 sm:py-10 lg:scroll-mt-32 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-none border border-transparent bg-transparent p-5 shadow-none sm:p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--ocean-blue)]">
                Why choose us
              </p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Why choose Bharat Travels for your next journey
              </h2>
              <p className="text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                At Bharat Travels, we bring years of expertise in crafting memorable journeys across
                India and beyond. Thousands of happy travelers trust us for safe, reliable and
                well-planned trips.
              </p>
              <div className="space-y-3">
                {whyChoosePoints.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleCheckBig className="mt-0.5 shrink-0 text-[var(--orange)]" size={20} />
                    <p className="text-white/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 md:gap-5">
              {services.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-none border border-transparent bg-transparent p-5 shadow-none sm:p-6"
                >
                  <div className="mb-5 inline-flex rounded-2xl bg-[linear-gradient(135deg,var(--saffron),var(--orange))] p-3 text-white shadow-lg shadow-orange-200/60">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionMotion} id="stories" className="scroll-mt-28 py-10 text-slate-900 sm:py-12 lg:scroll-mt-32">
        <div className="overflow-hidden">
          <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 px-4 sm:mb-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">
                Traveler reviews
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Moving stories from happy travellers
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
              Real feedback from couples, families and adventure seekers who booked their journeys with Bharat Travels.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-[linear-gradient(90deg,rgba(3,8,20,0.95),transparent)] sm:w-16 lg:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-[linear-gradient(270deg,rgba(3,8,20,0.95),transparent)] sm:w-16 lg:w-24" />
              <motion.div
                className="flex w-max gap-5"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              >
                {[...movingReviews, ...movingReviews].map((review, index) => (
                  <div
                    key={`${review.name}-${index}`}
                    className="w-[260px] shrink-0 border border-white/12 bg-white/6 p-5 backdrop-blur-md sm:w-[320px] sm:p-6 lg:w-[360px]"
                  >
                    <div className="mb-4 flex items-center gap-1 text-[var(--saffron)]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={`${review.name}-${index}-${starIndex}`} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm leading-6 text-white/80 sm:text-base sm:leading-7">"{review.text}"</p>
                    <div className="mt-5">
                      <p className="font-bold text-white">{review.name}</p>
                      <p className="text-sm text-white/60">{review.trip}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-[linear-gradient(90deg,rgba(3,8,20,0.95),transparent)] sm:w-16 lg:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-[linear-gradient(270deg,rgba(3,8,20,0.95),transparent)] sm:w-16 lg:w-24" />
              <motion.div
                className="flex w-max gap-5"
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              >
                {[...movingReviews.slice().reverse(), ...movingReviews.slice().reverse()].map((review, index) => (
                  <div
                    key={`${review.trip}-${index}`}
                    className="w-[250px] shrink-0 border border-white/10 bg-white/4 p-4 sm:w-[300px] sm:p-5 lg:w-[330px]"
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-orange-200">Verified review</p>
                    <p className="mt-4 text-base font-semibold text-white sm:text-lg">{review.name}</p>
                    <p className="mt-1 text-sm text-white/58">{review.trip}</p>
                    <p className="mt-4 text-sm leading-7 text-white/72">{review.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionMotion} id="contact" className="scroll-mt-28 px-4 pb-12 pt-10 text-white sm:px-6 sm:pb-14 sm:pt-12 lg:scroll-mt-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
              Contact
            </p>
            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Ready to launch your next Indian getaway?
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
              Use this demo section to capture leads for vacations, honeymoons, family holidays or
              last-minute long weekends.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+919876543210"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
              >
                <PhoneCall size={18} />
                Call now
              </a>
              <a
                href="mailto:hello@bharatescapes.com"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <Mail size={18} />
                Email us
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Call us', '+91 98765 43210', PhoneCall, 'tel:+919876543210'],
              ['Email', 'hello@bharatescapes.com', Mail, 'mailto:hello@bharatescapes.com'],
              ['Studio', 'Jaipur and Goa', MapPinned, null],
              ['Timing', 'Mon to Sat, 9 AM to 8 PM', Clock3, null],
            ].map(([label, value, Icon, href]) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 sm:p-5"
              >
                <div className="inline-flex shrink-0 rounded-full border border-white/14 bg-white/8 p-3 text-orange-300">
                  <Icon size={18} />
                </div>
                <div className="min-w-0 pt-1">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/55 sm:text-sm">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-2 block break-words text-lg font-bold text-white underline-offset-4 hover:text-orange-200 hover:underline sm:text-xl"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-2 break-words text-lg font-bold text-white sm:text-xl">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <footer className="px-4 pb-8 pt-4 text-white sm:px-6 sm:pb-10 lg:px-10">
        <div className="mx-auto max-w-7xl border-t border-white/12 pt-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <p className="text-lg font-bold tracking-tight">Bharat Escapes</p>
              <p className="max-w-xs text-sm leading-6 text-white/62">
                Premium travel planning for honeymoons, family holidays, weekend escapes and adventure trips.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Connect</p>
              <div className="space-y-2 text-sm text-white/72">
                <a href="https://wa.me/919876543210" className="flex items-center gap-2 hover:text-white">
                  <MessageCircle size={16} />
                  WhatsApp us
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white">
                  <PhoneCall size={16} />
                  +91 98765 43210
                </a>
                <a href="mailto:hello@bharatescapes.com" className="flex items-center gap-2 hover:text-white">
                  <Mail size={16} />
                  hello@bharatescapes.com
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Social</p>
              <div className="space-y-2 text-sm text-white/72">
                <a href="https://instagram.com" className="flex items-center gap-2 hover:text-white">
                  <Camera size={16} />
                  Instagram
                </a>
                <a href="https://facebook.com" className="flex items-center gap-2 hover:text-white">
                  <Globe size={16} />
                  Facebook
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Hours</p>
              <div className="space-y-2 text-sm text-white/72">
                <p className="flex items-center gap-2">
                  <Clock3 size={16} />
                  Mon to Sat, 9 AM to 8 PM
                </p>
                <p>Sunday: By appointment</p>
                <p>Jaipur and Goa studio support</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-white/54 md:flex-row md:items-center md:justify-between">
            <p>Copyright {new Date().getFullYear()} Bharat Escapes. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#journeys" className="hover:text-white">Trips</a>
              <a href="#why-us" className="hover:text-white">Reviews</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
};

export default Home;
