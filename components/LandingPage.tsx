"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Globe,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Code,
  Database,
  Wifi,
  Layers,
  Smartphone,
  Bot,
  Cloud,
  Workflow
} from "lucide-react";

// Dictionary type definition for better TS support (optional but good practice)
type Dictionary = any; // simplified for now

const Navbar = ({ dict, lang }: { dict: Dictionary, lang: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    const path = window.location.pathname.replace(`/${lang}`, `/${newLang}`);
    window.location.href = path;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-white to-primary origin-left z-[60]"
        style={{ scaleX }}
      />
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-2" : "bg-transparent py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-10 h-10"
              >
                <Image
                  src="/logo.png"
                  alt="Mirutec Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                />
              </motion.div>
              <span className="font-bold text-2xl tracking-tighter text-white">
                MIRUTEC
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {Object.entries(dict.nav.items).map(([key, label]) => (
                  <a key={key} href={`#${key}`} className="group relative text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm font-medium">
                    {label as string}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                ))}

                {/* Language Switcher */}
                <button onClick={toggleLang} className="text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm font-medium flex items-center gap-2 cursor-pointer">
                  <Globe className="w-4 h-4" />
                  {lang.toUpperCase()}
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all border border-white/10"
                >
                  {dict.nav.cta}
                </motion.button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {Object.entries(dict.nav.items).map(([key, label]) => (
                <a key={key} href={`#${key}`} className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">
                  {label as string}
                </a>
              ))}
              <div className="px-3 py-2">
                <button onClick={toggleLang} className="text-gray-300 hover:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Cambiar a {lang === 'es' ? 'English' : 'Español'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

const Hero = ({ dict }: { dict: Dictionary }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">

      {/* Static Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/hero.png"
          alt="IoT Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      </div>

      {/* Decorative Grid on top of image but behind text */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-[1]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-8 shadow-inner shadow-white/5"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary shadow-[0_0_10px_#06b6d4]"></span>
            </span>
            <span className="text-sm font-bold text-gray-200 uppercase tracking-widest">{dict.hero.badge}</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-tight drop-shadow-2xl">
            {dict.hero.title_prefix} <br />
            <motion.span
              initial={{ backgroundSize: "100%" }}
              animate={{ backgroundSize: "200%" }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-primary bg-[length:200%_auto]"
            >
              {dict.hero.title_highlight}
            </motion.span>
          </h1>

          <p
            className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md"
            dangerouslySetInnerHTML={{ __html: dict.hero.description }}
          />

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">{dict.hero.cta_primary} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-10 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black/30 border border-white/20 hover:border-white/40 text-white rounded-full font-bold text-lg transition-all backdrop-blur-md"
            >
              {dict.hero.cta_secondary}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden backdrop-blur-sm"
  >
    {/* Hover Gradient Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute -inset-px bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />

    <div className="relative z-10">
      <div className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xl">
        <Icon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const Services = ({ dict }: { dict: Dictionary }) => {
  // Mapping icons to new services:
  // 1. App Dev -> Smartphone
  // 2. AI Agents -> Bot
  // 3. n8n -> Workflow
  // 4. IoT -> Wifi
  // 5. Cloud -> Cloud
  // 6. Integration -> Code (or we can use Layers)

  const icons = [Smartphone, Bot, Workflow, Wifi, Cloud, Code];

  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {dict.services.title_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">{dict.services.title_highlight}</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{dict.services.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dict.services.items.map((s: any, i: number) => (
            <ServiceCard key={i} title={s.title} description={s.description} icon={icons[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TechStack = ({ dict }: { dict: Dictionary }) => {
  return (
    <section className="py-24 border-y border-white/5 bg-white/[0.02] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl text-gray-500 mb-12 font-mono tracking-[0.2em]">{dict.techConnect.title}</h3>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 items-center opacity-80">
          {/* Text placeholders for logos with heavy styling */}
          {["Next.js", "React Native", "OpenAI", "n8n", "AWS", "Python", "Kubernetes", "Terraform"].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, color: "#ffffff", textShadow: "0 0 20px rgba(255,255,255,0.5)" }}
              className="text-2xl md:text-3xl font-bold text-white/30 hover:text-white transition-all cursor-default select-none"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ dict }: { dict: Dictionary }) => {
  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-16 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-white to-primary opacity-50" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">{dict.contact.title_prefix} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">{dict.contact.title_highlight}</span></h2>
              <p className="text-gray-400 text-lg mb-8">{dict.contact.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Globe className="w-5 h-5 text-secondary" />
                  </div>
                  <span>{dict.contact.support}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <span>{dict.contact.nda}</span>
                </div>
              </div>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 ml-1">{dict.contact.form.name}</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:bg-white/10 transition-all placeholder:text-gray-600" placeholder={dict.contact.form.name_placeholder} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 ml-1">{dict.contact.form.email}</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:bg-white/10 transition-all placeholder:text-gray-600" placeholder={dict.contact.form.email_placeholder} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 ml-1">{dict.contact.form.message}</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary focus:bg-white/10 transition-all placeholder:text-gray-600 resize-none" placeholder={dict.contact.form.message_placeholder} />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary/80 hover:to-red-600/80 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20"
              >
                {dict.contact.form.submit}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ dict }: { dict: Dictionary }) => {
  return (
    <footer className="bg-black py-12 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-tight text-lg">MIRUTEC</span>
        </div>

        <div className="text-gray-600 text-sm font-mono">
          © {new Date().getFullYear()} {dict.footer.rights} <span className="hidden sm:inline">|</span> {dict.footer.tagline}
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors transform hover:-translate-y-1 inline-block">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage({ dict, lang }: { dict: Dictionary, lang: string }) {
  return (
    <main className="min-h-screen bg-black">
      <Navbar dict={dict} lang={lang} />
      <Hero dict={dict} />
      <Services dict={dict} />
      <TechStack dict={dict} />
      <Contact dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
