import { useEffect, useRef, useState } from "react";
import resume from "../assets/resume.pdf";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowUpRight,
  Download,
  Moon,
  Sun,
  Sparkles,
  Mail,
} from "lucide-react";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiSocketdotio,
  SiPython,
} from "react-icons/si";

import { Button } from "@/components/ui/button";

/* ---------------- THEME ---------------- */

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    const system = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";

    const current = stored ?? system;

    setTheme(current);

    document.documentElement.classList.toggle(
      "dark",
      current === "dark"
    );
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    setTheme(next);

    localStorage.setItem("theme", next);

    document.documentElement.classList.toggle(
      "dark",
      next === "dark"
    );
  };

  return { theme, toggle };
}

/* ---------------- ANIMATIONS ---------------- */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
  },

  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function SectionTag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
      {children}
    </span>
  );
}

/* ---------------- SCROLL PROGRESS ---------------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-primary"
    />
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
    >
      <nav className="glass-panel flex items-center gap-3 rounded-full px-5 py-3">
        <a
          href="#top"
          className="font-display text-sm font-semibold"
        >
          Harshal.
        </a>

        <a
          href="#work"
          className="text-sm text-muted-foreground"
        >
          Work
        </a>

        <a
          href="#about"
          className="text-sm text-muted-foreground"
        >
          About
        </a>

        <a
          href="#contact"
          className="text-sm text-muted-foreground"
        >
          Contact
        </a>

        <button
          onClick={toggle}
          className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-border"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </nav>
    </motion.header>
  );
}

/* ---------------- HERO ARTWORK ---------------- */

function HeroArtwork() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [12, -12]
  );

  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [-18, 18]
  );

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full max-w-[520px]"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        <div className="absolute inset-0 rounded-[3rem] border border-border glass-panel" />

        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/40" />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 size-[320px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute left-0 top-1/2 size-3 rounded-full bg-primary shadow-[0_0_20px_var(--color-primary)]" />
        </motion.div>

        <div className="glass-panel absolute left-0 top-10 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
          systems_online
        </div>

        <div className="glass-panel absolute bottom-10 right-0 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
          AI × REALTIME
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ScrollProgress />
      <Navbar />

      <main>
        {/* HERO */}
        <section
          id="top"
          className="relative overflow-hidden pt-40 pb-24"
        >
          <div className="grid-mask absolute inset-0 -z-10" />

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="space-y-8"
            >
              <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                Available for ambitious builds
              </div>

              <h1 className="font-display text-6xl font-semibold leading-none tracking-tight sm:text-7xl">
                I engineer{" "}
                <span className="italic text-muted-foreground">
                  intelligence
                </span>{" "}
                into products.
              </h1>

              <p className="max-w-xl text-lg text-muted-foreground">
                Full Stack AI Engineer crafting
                high-performance SaaS platforms,
                agentic systems, and real-time
                digital experiences.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button variant="hero">
                  Explore selected work
                  <ArrowUpRight className="size-4" />
                </Button>



<a
  href={resume}
  download="Harshal_Mohite_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="glass">
    <Download className="size-4" />
    Resume
  </Button>
</a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="font-display text-2xl font-semibold">
                    50+
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Projects shipped
                  </div>
                </div>

                <div>
                  <div className="font-display text-2xl font-semibold">
                    8.2
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    CGPA · B.Tech
                  </div>
                </div>

                <div>
                  <div className="font-display text-2xl font-semibold">
                    03
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Engineers led
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <HeroArtwork />
            </div>
          </div>
        </section>

        {/* WORK */}
        <section
          id="work"
          className="mx-auto max-w-7xl px-6 py-32"
        >
          <SectionTag>
            Selected systems / 2024—26
          </SectionTag>

          <h2 className="mt-4 font-display text-5xl font-semibold">
            Built to matter.
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[
              {
                number: "01",
                title: "AI Interviewer",
                tags:
                  "VOICE AI · MERN · GEMINI",
                desc:
                  "Conversational AI mock-interview platform with intelligent feedback and voice interaction.",
              },

              {
                number: "02",
                title: "AI Finance Buddy",
                tags:
                  "FINTECH · PREDICTIVE AI · SAAS",
                desc:
                  "AI-powered finance workspace with predictive analytics and budgeting intelligence.",
              },
            ].map((project) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={project.title}
                className="glass-panel rounded-[2rem] p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.number}
                  </span>

                  <ArrowUpRight className="size-5" />
                </div>

                <h3 className="mt-10 font-display text-3xl font-semibold">
                  {project.title}
                </h3>

                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  {project.tags}
                </div>

                <p className="mt-8 text-muted-foreground">
                  {project.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="mx-auto max-w-7xl px-6 py-32"
        >
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionTag>About</SectionTag>

              <h2 className="mt-4 font-display text-5xl font-semibold leading-tight">
                Founder.
                <br />
                Builder.
                <br />
                <span className="italic text-muted-foreground">
                  Systems thinker.
                </span>
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Harshal is the founder of
                CodeVertex, a Pune-based Full
                Stack AI Engineer building
                scalable AI-native systems,
                SaaS platforms, and real-time
                experiences.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="glass-panel rounded-2xl p-6">
                  <Sparkles className="mb-4 size-5 text-primary" />

                  <h3 className="font-display text-lg font-semibold">
                    National Hackathon Finalist
                  </h3>
                </div>

                <div className="glass-panel rounded-2xl p-6">
                  <Sparkles className="mb-4 size-5 text-primary" />

                  <h3 className="font-display text-lg font-semibold">
                    Google Developer Groups Lead
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="mx-auto max-w-7xl px-6 py-32">
          <SectionTag>Tech Stack</SectionTag>

          <h2 className="mt-4 font-display text-5xl font-semibold">
            Tools I build with.
          </h2>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[
              [SiReact, "React"],
              [SiNextdotjs, "Next.js"],
              [SiTypescript, "TypeScript"],
              [SiNodedotjs, "Node.js"],
              [SiExpress, "Express"],
              [SiTailwindcss, "Tailwind"],
              [SiMongodb, "MongoDB"],
              [SiPostgresql, "PostgreSQL"],
              [SiSocketdotio, "Socket.IO"],
              [SiPython, "Python"],
            ].map(([Icon, label], i) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={i}
                className="glass-panel flex flex-col items-center rounded-2xl p-6 text-center"
              >
                <Icon className="size-8 text-primary" />

                <span className="mt-4 text-sm font-medium">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="mx-auto max-w-7xl px-6 py-32"
        >
          <div className="glass-panel rounded-[2rem] p-10">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <SectionTag>
                  Start a conversation
                </SectionTag>

                <h2 className="mt-4 font-display text-5xl font-semibold">
                  Let’s build the impossible.
                </h2>

                <p className="mt-6 text-muted-foreground">
                  Have an ambitious AI product
                  in mind? Let’s discuss it.
                </p>

                <a
                  href="mailto:harshalm844@gmail.com"
                  className="mt-8 inline-flex items-center gap-3 text-sm"
                >
                  <Mail className="size-4 text-primary" />
                  harshalm844@gmail.com
                </a>
              </div>

              <form className="space-y-4">
                <input
                  placeholder="Your name"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3"
                />

                <input
                  placeholder="Email"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3"
                />

                <input
                  placeholder="Phone"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3"
                />

                <textarea
                  rows={5}
                  placeholder="Project Brief"
                  className="w-full rounded-xl border border-border bg-transparent px-4 py-3"
                />

                <Button
                  variant="hero"
                  className="w-full"
                >
                  Send via WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border py-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-sm text-muted-foreground">
            <span>
              © 2026 Harshal Mohite
            </span>

            <span>
              Engineered with intent · Pune,
              India
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

