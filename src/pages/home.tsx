import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight, Check, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Brand Mark Component
const BrandMark = () => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 relative border-2 border-primary flex items-center justify-center">
      <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-accent transform translate-x-1 -translate-y-1 opacity-50" />
      <div className="w-full h-full bg-transparent border-[0.5px] border-primary/30 transform rotate-45 scale-75" />
    </div>
    <div className="flex flex-col">
      <span className="font-serif font-bold text-2xl tracking-tighter leading-none text-primary">AJS</span>
      <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-muted leading-none mt-1">Construction Corp.</span>
    </div>
  </div>
);

// Sections
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setIsOpen(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Approach", href: "#approach" },
    { name: "Work", href: "#work" },
    { name: "Questions", href: "#questions" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50 h-[60px] md:h-20 transition-all duration-300" data-testid="layout-header">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="z-50 shrink-0" data-testid="link-home-logo">
            <BrandMark />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm font-medium text-primary/80 hover:text-accent transition-colors" data-testid={`link-nav-${link.name.toLowerCase()}`}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-l border-border pl-6">
              <a href="tel:+15165819706" className="text-sm font-medium flex items-center gap-2 text-primary hover:text-accent transition-colors" data-testid="link-phone-header">
                <Phone className="w-4 h-4" />
                <span>(516) 581 9706</span>
              </a>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-6" data-testid="button-discuss-project-header">
                <a href="#contact">Discuss Your Project</a>
              </Button>
            </div>
          </nav>

          {/* Mobile Toggle — aria-label for accessibility */}
          <button
            className="md:hidden p-3 -mr-1 text-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            data-testid="button-mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu — rendered OUTSIDE <header> to avoid backdrop-filter containing block */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — tap outside to close */}
            <motion.div
              className="fixed inset-0 z-[55] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,100vw)] bg-background border-l border-border z-[60] flex flex-col md:hidden"
            >
              {/* Menu header row */}
              <div className="flex items-center justify-between px-6 h-[60px] border-b border-border shrink-0">
                <BrandMark />
                <button
                  onClick={close}
                  className="p-2 text-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close navigation menu"
                  data-testid="button-mobile-menu-close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-col px-6 pt-8 gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="block py-3 text-2xl font-serif text-primary hover:text-accent transition-colors border-b border-border/40"
                      onClick={close}
                      data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom actions */}
              <div className="px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-6 flex flex-col gap-3 border-t border-border shrink-0">
                <a
                  href="tel:+15165819706"
                  className="flex items-center justify-between p-4 border border-border text-primary min-h-[52px]"
                  data-testid="link-mobile-phone"
                >
                  <span className="font-medium">Call Now</span>
                  <Phone className="w-5 h-5 text-accent" />
                </a>
                <Button asChild className="w-full py-3 text-base rounded-none bg-primary text-primary-foreground min-h-[52px]">
                  <a href="#contact" onClick={close} data-testid="button-mobile-discuss">Discuss Your Project</a>
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div className="absolute inset-0 blueprint-grid opacity-50 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-6 h-[1px] bg-accent shrink-0"></div>
              <span className="text-xs sm:text-sm font-medium tracking-wider sm:tracking-widest uppercase text-muted">Residential Construction in Westbury, New York</span>
            </div>
            <h1 className="text-[clamp(2.25rem,8vw,4.5rem)] font-serif text-primary leading-[1.1] tracking-tight">
              Build With a Clearer Plan.
            </h1>
            <p className="text-base md:text-lg text-primary/80 max-w-md leading-relaxed">
              AJS Construction Corp. provides residential building, general contracting, remodeling, and construction consultation services from Westbury, New York.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                <a href="#contact">Discuss Your Project</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-primary text-primary hover:bg-secondary">
                <a href="tel:+15165819706">Call (516) 581 9706</a>
              </Button>
            </div>
            <p className="text-xs text-muted mt-2 font-medium">
              Home Building · General Contracting · Bathroom Remodeling · Construction Consultation
            </p>
          </motion.div>
          <motion.div 
            className="lg:col-span-7 relative h-[280px] sm:h-[380px] md:h-[520px] lg:h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-secondary/20 -translate-x-4 translate-y-4"></div>
            <img 
              src="/assets/images/hero.png" 
              alt="Modern new home under construction" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-125"
            />
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-background"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-background"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const compactServices = [
    { num: "01", title: "General Contracting", desc: "Coordinate residential construction through organized planning, scheduling, and project execution." },
    { num: "02", title: "Bathroom Remodeling", desc: "Plan and build a more functional bathroom with coordinated construction and finishing work." },
    { num: "03", title: "Construction Consultation", desc: "Discuss the property, project goals, and possible next steps directly with the company." },
    { num: "04", title: "Residential Improvements", desc: "Coordinate improvement work across multiple areas of an existing residential property." },
    { num: "05", title: "Project Planning Support", desc: "Organize scope, conditions, and construction sequencing for an early-stage project idea." }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-serif text-primary mb-6">Structured Services for Residential Projects</h2>
          <div className="w-16 h-[2px] bg-accent"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Featured Service */}
          <motion.div 
            className="group relative overflow-hidden bg-background p-6 md:p-8 border border-border/50 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-64 md:h-80 mb-8 overflow-hidden relative shrink-0">
              <img src="/assets/images/service-1.png" alt="New Home Construction" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center justify-between">
              New Home Construction
            </h3>
            <p className="text-primary/70 leading-relaxed text-sm mb-8 flex-grow max-w-sm">
              Discuss property requirements, project scope, and the stages needed to move a home build forward.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all mt-auto" data-testid="link-service-featured-cta">
              Start the Conversation <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Compact Services Rows */}
          <div className="flex flex-col h-full justify-between gap-4">
            {compactServices.map((service, idx) => (
              <motion.div 
                key={idx}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 md:p-6 bg-background/50 border border-border/50 hover:bg-background transition-colors hover:translate-x-1 duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-xl font-serif text-accent font-bold opacity-50 shrink-0 w-8">{service.num}</div>
                <div className="flex-grow">
                  <h4 className="text-lg font-serif font-bold text-primary mb-1">{service.title}</h4>
                  <p className="text-primary/70 text-sm leading-relaxed">{service.desc}</p>
                </div>
                <a href="#contact" className="shrink-0 text-accent p-2 rounded-full hover:bg-accent/10 transition-colors" data-testid={`link-service-compact-${idx}`}>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PathToConstruction = () => {
  const stages = [
    { num: "01", title: "Share the Project", desc: "Property location, project type, and general goals." },
    { num: "02", title: "Review the Scope", desc: "Existing conditions, design needs, budget expectations, and timing." },
    { num: "03", title: "Define the Plan", desc: "Responsibilities, coordination requirements, and practical next steps." },
    { num: "04", title: "Move Forward", desc: "Begin the agreed construction scope with organized communication." }
  ];

  return (
    <section id="approach" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full blueprint-grid opacity-20 z-0 hidden md:block"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Text & Process */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6 leading-tight">
                A Clearer Path From Idea to Construction
              </h2>
              <p className="text-primary/70 text-lg mb-8 max-w-lg">
                Every residential project begins with a clear understanding of the property, priorities, scope, and next step.
              </p>
              
              <div className="p-6 bg-secondary border-l-2 border-accent">
                <p className="text-primary/80 text-sm mb-4">
                  AJS Construction Corp. is based in Westbury, New York and is publicly categorized as a home builder, general contractor, construction consultant, and bathroom remodeling contractor.
                </p>
                <p className="text-primary/90 text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" /> 141 E Cabot Ln, Westbury, NY 11590
                </p>
              </div>
            </motion.div>

            {/* Stages */}
            <div className="space-y-8">
              {stages.map((stage, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-4xl font-serif text-accent font-bold opacity-50 pt-1 leading-none">{stage.num}</div>
                  <div className="pb-6 border-b border-border/50 flex-1">
                    <h4 className="text-xl font-serif font-bold text-primary mb-2">{stage.title}</h4>
                    <p className="text-primary/70 text-sm">{stage.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <motion.div 
            className="hidden md:block relative h-full min-h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-secondary/20 translate-x-4 translate-y-4"></div>
            <img 
              src="/assets/images/hero.png" 
              alt="Construction progress" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-125"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};


const ProjectsWorthDiscussing = () => {
  const projects = [
    { title: "Building a New Home", desc: "Discuss the site, intended home size, general design direction, and the stages required to move the project toward active planning.", img: "/assets/images/showcase-1.png", span: "lg:col-span-1 lg:row-span-3" },
    { title: "Managing a Residential Renovation", desc: "Renovation projects involving multiple construction areas may benefit from coordinated general contracting.", img: "/assets/images/showcase-4.png", span: "lg:col-span-1 lg:row-span-1" },
    { title: "Updating a Bathroom", desc: "Bathroom remodeling projects can range from targeted fixture updates to full spatial redesigns.", img: "/assets/images/showcase-3.png", span: "lg:col-span-1 lg:row-span-1" },
    { title: "Reviewing an Early Construction Idea", desc: "Early-stage ideas benefit from a direct conversation about feasibility, scope, and possible next steps.", img: "/assets/images/showcase-2.png", span: "lg:col-span-1 lg:row-span-1" }
  ];

  return (
    <section id="project-types" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Projects Worth Discussing</h2>
          <p className="text-primary-foreground/70 text-lg">Exact scope and availability must be confirmed directly with AJS Construction Corp.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-3 gap-4 md:gap-6 mb-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx} 
              className={`group relative overflow-hidden bg-primary-foreground/5 min-h-[300px] ${project.span || ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent group-hover:from-primary/80 transition-colors duration-500"></div>
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-serif font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-sm">{project.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all" data-testid={`link-project-discuss-${idx}`}>
                  Discuss This Project <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <p className="text-xs text-primary-foreground/50 italic border-l border-primary-foreground/20 pl-3">
          Images are representative design placeholders and do not show confirmed AJS Construction Corp. projects.
        </p>
      </div>
    </section>
  );
};

const Showcase = () => {
  const images = [
    { src: "/assets/images/showcase-1.png", alt: "New residential construction / modern framing" },
    { src: "/assets/images/showcase-2.png", alt: "Structural framing / construction in progress" },
    { src: "/assets/images/showcase-3.png", alt: "Modern bathroom remodel" },
    { src: "/assets/images/showcase-4.png", alt: "Interior construction detail" },
    { src: "/assets/images/showcase-5.png", alt: "Residential exterior work" },
    { src: "/assets/images/showcase-6.png", alt: "Finished living space" },
  ];

  return (
    <section id="work" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Residential Construction Possibilities</h2>
            <div className="w-16 h-[2px] bg-accent"></div>
          </div>
          <p className="text-sm text-primary-foreground/50 max-w-xs border-l border-primary-foreground/20 pl-4 italic">
            Images are representative design placeholders and do not show confirmed AJS Construction Corp. projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div 
              key={i} 
              className="aspect-square relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={img.src} 
                alt={img.alt} 
                loading="lazy"
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhatToExpect = () => {
  const blocks = [
    { title: "Clear Project Information", desc: "Each conversation focuses on the property and project specifically, rather than general contractor information." },
    { title: "Property-Specific Discussion", desc: "Site conditions, local considerations, and construction requirements vary by property. Expect a conversation focused on the details that matter for the specific project." },
    { title: "Defined Next Steps", desc: "After the initial conversation, the goal is a clearer understanding of what the project involves and what the next stage would require." },
    { title: "Direct Contact", desc: "AJS Construction Corp. can be reached by phone at (516) 581 9706 or through the project inquiry form below." }
  ];

  return (
    <section id="what-to-expect" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">A More Organized Project Conversation</h2>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto">
            AJS Construction Corp. aims to give homeowners clear information about their project, property, and possible next steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {blocks.map((block, idx) => (
            <motion.div 
              key={idx}
              className="pt-6 border-t-2 border-accent flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-sm font-bold text-accent mb-4">{(idx + 1).toString().padStart(2, '0')}</div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">{block.title}</h3>
              <p className="text-primary/80 leading-relaxed">{block.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const formSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    email: z.string().email("Valid email is required"),
    address: z.string().optional(),
    projectType: z.string({ required_error: "Please select a project type" }),
    timeline: z.string().optional(),
    description: z.string().optional(),
    contactMethod: z.enum(["Phone", "Email"], { required_error: "Please select a contact method" })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      timeline: "",
      description: "",
      contactMethod: "Phone"
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">Discuss Your Project</h2>
          <p className="text-primary/70 max-w-2xl mx-auto">
            Provide details about your property and construction needs.
          </p>
        </motion.div>

        <motion.div 
          className="bg-background p-8 md:p-12 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-primary mb-4">Information Received</h3>
              <p className="text-primary/70 mb-8 max-w-md mx-auto">
                This demonstration form is ready to connect to AJS Construction Corp.'s preferred email or project management system before launch.
              </p>
              <div className="p-6 bg-secondary text-primary inline-block">
                <p className="text-sm uppercase tracking-widest font-medium mb-2">Prefer to call?</p>
                <a href="tel:+15165819706" className="text-2xl font-serif font-bold text-accent hover:text-primary transition-colors">(516) 581 9706</a>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="rounded-none border-border focus-visible:ring-accent text-[16px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" className="rounded-none border-border focus-visible:ring-accent text-[16px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" className="rounded-none border-border focus-visible:ring-accent text-[16px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, City, NY" className="rounded-none border-border focus-visible:ring-accent text-[16px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-border focus:ring-accent text-[16px]">
                              <SelectValue placeholder="Select a project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-none">
                            <SelectItem value="New Home Construction">New Home Construction</SelectItem>
                            <SelectItem value="General Contracting">General Contracting</SelectItem>
                            <SelectItem value="Bathroom Remodeling">Bathroom Remodeling</SelectItem>
                            <SelectItem value="Construction Consultation">Construction Consultation</SelectItem>
                            <SelectItem value="Other Residential Project">Other Residential Project</SelectItem>
                            <SelectItem value="Not Sure Yet">Not Sure Yet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Timeline</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Next 3 months, ASAP" className="rounded-none border-border focus-visible:ring-accent text-[16px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about the scope of your project..." 
                          className="rounded-none border-border focus-visible:ring-accent min-h-[120px] text-[16px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred Contact Method *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Phone" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Phone</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Email" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Email</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full md:w-auto px-12 py-6 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground text-lg" data-testid="button-submit-form">
                  Submit Inquiry
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "What types of projects can I discuss with AJS Construction Corp.?",
      a: "Public business listings categorize AJS as a home builder, general contractor, construction consultant, and bathroom remodeler. Call to confirm whether the company is the right fit for your project."
    },
    {
      q: "Can I contact AJS about building a new home?",
      a: "Yes. Public business information identifies AJS as a home builder, and one public review references a home building experience. Contact the company to discuss the property and project stage."
    },
    {
      q: "Does AJS handle bathroom remodeling?",
      a: "Bathroom remodeling appears in public contractor directory categories. Call to confirm the exact scope and current availability."
    },
    {
      q: "How do I discuss a project?",
      a: "Call the company directly or complete the project inquiry form with the location, project type, and a short description."
    },
    {
      q: "Where is AJS Construction Corp. located?",
      a: "The business is located at 141 E Cabot Ln, Westbury, New York 11590."
    },
    {
      q: "What are the business hours?",
      a: "A public directory lists Monday through Friday from 8:00 AM to 5:00 PM. Confirm current availability directly by phone."
    },
    {
      q: "What information should I prepare before calling?",
      a: "Having the property address, a brief description of the intended project, and a general sense of the desired timeline makes the first conversation more productive. Permits, drawings, or design plans are helpful if they exist."
    },
    {
      q: "Can I contact AJS during the early planning stage?",
      a: "Yes. Early-stage conversations can help clarify what the project involves and what the next step would require. Call or use the project inquiry form to start the discussion."
    },
    {
      q: "Can I discuss a residential renovation project?",
      a: "General contracting and residential renovation work are listed in public business categories for AJS Construction Corp. Call to confirm current availability and whether the specific project is a fit."
    },
    {
      q: "Does the website form send my request directly?",
      a: "This demonstration form requires connection to AJS Construction Corp.'s preferred email or project management system before public launch. Until then, call (516) 581 9706 to reach the company directly."
    }
  ];

  return (
    <section id="questions" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          className="text-[clamp(1.75rem,5vw,3rem)] font-serif text-primary mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left font-serif text-lg text-primary hover:text-accent hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-primary/70 text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section id="location" className="border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12 lg:p-24 bg-secondary flex flex-col justify-center">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif text-primary mb-6">Location & Hours</h2>
            <div className="w-12 h-[2px] bg-accent"></div>
          </motion.div>
          
          <motion.div 
            className="space-y-8 mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <p className="font-serif font-bold text-xl text-primary mb-2">AJS Construction Corp.</p>
              <p className="text-primary/70 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                141 E Cabot Ln, Westbury, NY 11590
              </p>
            </div>
            <div>
              <p className="text-primary/70 flex items-center gap-2">
                <Phone className="w-5 h-5 text-accent" />
                (516) 581 9706
              </p>
            </div>
            <div>
              <p className="text-primary/70 flex items-start gap-2">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>
                  Monday–Friday: 8:00 AM – 5:00 PM<br/>
                  <span className="text-xs italic opacity-80">(Publicly listed hours — confirm by phone)</span>
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="tel:+15165819706">Call Now</a>
            </Button>
            <Button asChild variant="outline" className="rounded-none border-primary text-primary hover:bg-background">
              <a href="https://maps.google.com/?q=141+E+Cabot+Ln+Westbury+NY+11590" target="_blank" rel="noopener noreferrer">Get Directions</a>
            </Button>
            <Button asChild variant="ghost" className="rounded-none text-primary hover:text-accent hover:bg-transparent">
              <a href="#contact">Discuss Your Project</a>
            </Button>
          </motion.div>
        </div>
        <div className="h-[400px] lg:h-auto w-full bg-muted">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-73.5790%2C40.7476%2C-73.5614%2C40.7556&layer=mapnik&marker=40.7516%2C-73.5702"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            title="Map location for AJS Construction Corp. at 141 E Cabot Ln, Westbury, NY 11590"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Planning a Residential Construction Project?</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-2">
            Speak with AJS Construction Corp. about the property, intended work, project stage, and possible next step.
          </p>
          <p className="text-sm text-primary-foreground/50 max-w-2xl mx-auto mb-10">
            Have the property address and a short project description ready when calling.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-none bg-accent hover:bg-accent/90 text-primary-foreground px-8 py-6 text-lg">
              <a href="#contact">Discuss Your Project</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg">
              <a href="tel:+15165819706">Call (516) 581 9706</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="mb-6">
              <BrandMark />
            </div>
            <p className="text-sm text-primary/70">
              Residential construction services in Westbury, NY. Precision-built, directly managed.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-primary mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-primary/70">
              <li><a href="#services" className="hover:text-accent transition-colors">New Home Construction</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">General Contracting</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Bathroom Remodeling</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Construction Consultation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-primary mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-primary/70">
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#approach" className="hover:text-accent transition-colors">Approach</a></li>
              <li><a href="#work" className="hover:text-accent transition-colors">Work</a></li>
              <li><a href="#questions" className="hover:text-accent transition-colors">Questions</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-primary mb-6">Contact</h4>
            <address className="not-italic text-sm text-primary/70 space-y-3">
              <p>141 E Cabot Ln<br/>Westbury, NY 11590</p>
              <p>
                <a href="tel:+15165819706" className="hover:text-accent transition-colors inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (516) 581 9706
                </a>
              </p>
              <p>
                <a href="https://maps.google.com/?q=141+E+Cabot+Ln+Westbury+NY+11590" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Get Directions
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary/50">
          <p>&copy; {new Date().getFullYear()} AJS Construction Corp. All rights reserved.</p>
          <p className="bg-secondary px-3 py-1 text-primary/60 border border-border/50">Private sales demonstration. Not a live business website.</p>
        </div>
      </div>
    </footer>
  );
};

const MobileActionBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16">
        <a href="tel:+15165819706" className="flex-1 flex items-center justify-center gap-2 font-medium text-primary hover:bg-secondary transition-colors border-r border-border">
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a href="#contact" className="flex-1 flex items-center justify-center font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Project Inquiry
        </a>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-background md:pb-0 pb-16">
      <Header />
      <main id="main-content" className="flex-1 flex flex-col">
        <Hero />
        <Services />
        <PathToConstruction />
        <ProjectsWorthDiscussing />
        <Showcase />
        <WhatToExpect />
        <ContactForm />
        <FAQ />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
