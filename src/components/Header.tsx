import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import Logo from "@/components/Logo";
import { NAV } from "@/data/site";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  onDonate: () => void;
}

export const Header = ({ onDonate }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const positions = NAV.map((n) => {
        const el = document.querySelector<HTMLElement>(n.href);
        return {
          href: n.href,
          top: el ? el.getBoundingClientRect().top : Infinity,
        };
      }).filter((p) => p.top <= 160);
      if (positions.length) setActive(positions[positions.length - 1].href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b bg-background/90 py-3 backdrop-blur-md"
          : "border-b border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-5 lg:px-14">
        <Logo />

        <nav className="hidden items-center gap-7 text-[0.86rem] tracking-[0.02em] lg:flex">
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className={`story-link transition-colors ${
                active === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onDonate}
            className="hidden rounded-[var(--hero-radius)] bg-accent px-[22px] py-[11px] text-[0.9rem] font-semibold text-accent-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Помочь сейчас
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Меню"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--hero-radius)] border border-border lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[86vw] max-w-sm bg-background"
            >
              <div className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => go(item.href)}
                    className="border-b border-border/70 py-4 text-left font-display text-xl text-foreground"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setOpen(false);
                    onDonate();
                  }}
                  className="mt-6 rounded-[var(--hero-radius)] bg-accent px-6 py-3.5 font-semibold text-accent-foreground"
                >
                  Помочь сейчас
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
