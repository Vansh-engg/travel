import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Menu, Phone, X } from 'lucide-react';

const links = ['Journeys', 'Why Us', 'Stories', 'Contact'];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const getTargetId = (label) => label.toLowerCase().replace(/\s+/g, '-');
  const scrollToSection = (targetId) => {
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const navbarOffset = window.innerWidth >= 1024 ? 120 : 104;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarOffset;

    window.history.replaceState(null, '', `#${targetId}`);
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    });
  };

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    closeMenu();
    scrollToSection(targetId);
  };

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
        className="rounded-[2rem] border border-white/10 bg-slate-950/72 px-4 py-3 text-white shadow-[0_22px_60px_rgba(2,6,23,0.38)] backdrop-blur-xl md:rounded-full md:px-6"
      >
        <div className="flex items-center justify-between gap-3">
          <a href="#top" onClick={(event) => handleNavClick(event, 'top')} className="flex min-w-0 items-center gap-2">
            <div className="rounded-2xl bg-[linear-gradient(135deg,var(--saffron),var(--orange))] p-2 text-white shadow-lg shadow-orange-500/30">
              <Compass size={18} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/70 sm:text-[0.68rem] sm:tracking-[0.3em]">
                Bharat Escapes
              </p>
              <p className="truncate text-sm font-bold tracking-tight text-white sm:text-base">
                Travel atelier for India
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((item) => (
              <a
                key={item}
                href={`#${getTargetId(item)}`}
                onClick={(event) => handleNavClick(event, getTargetId(item))}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(event) => handleNavClick(event, 'contact')}
              className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.03] sm:flex"
            >
              <Phone size={16} />
              Plan my trip
            </a>
            <button
              className="rounded-full p-2 text-white md:hidden"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="rounded-3xl border border-white/10 bg-slate-900/95 p-3 shadow-lg">
                <div className="flex flex-col">
                  {links.map((item) => (
                    <a
                      key={item}
                      href={`#${getTargetId(item)}`}
                      onClick={(event) => handleNavClick(event, getTargetId(item))}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item}
                    </a>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={(event) => handleNavClick(event, 'contact')}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  <Phone size={16} />
                  Plan my trip
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
