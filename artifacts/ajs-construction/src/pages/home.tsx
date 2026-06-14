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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Approach", href: "#approach" },
    { name: "Work", href: "#work" },
    { name: "Questions", href: "#questions" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 h-[60px] md:h-20 transition-all duration-300" data-testid="layout-header">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="z-50" data-testid="link-home-logo">
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

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          data-testid="button-mobile-menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 top-[60px] bg-background flex flex-col p-6 z-40"
            >
              <ul className="flex flex-col gap-6 text-xl font-serif">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="block py-2 text-primary hover:text-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pb-[100px] flex flex-col gap-4">
                <a 
                  href="tel:+15165819706" 
                  className="flex items-center justify-between p-4 border border-border text-primary"
                >
                  <span className="font-medium">Call Now</span>
                  <Phone className="w-5 h-5" />
                </a>
                <Button asChild className="w-full py-6 text-lg rounded-none bg-primary text-primary-foreground">
                  <a href="#contact" onClick={() => setIsOpen(false)}>Discuss Your Project</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
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
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-accent"></div>
              <span className="text-sm font-medium tracking-widest uppercase text-muted">Residential Construction in Westbury, New York</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[1.1] tracking-tight">
              Build With a Clearer Plan.
            </h1>
            <p className="text-lg text-primary/80 max-w-md leading-relaxed">
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
            className="lg:col-span-7 relative h-[400px] md:h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-secondary/20 -translate-x-4 translate-y-4"></div>
            <img 
              src="/src/assets/images/hero.png" 
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
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">Structured Services for Residential Projects</h2>
          <div className="w-16 h-[2px] bg-accent"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Service 1 - With Image */}
          <motion.div 
            className="group relative overflow-hidden bg-background p-8 border border-border/50 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-48 mb-8 overflow-hidden relative shrink-0">
              <img src="/src/assets/images/service-1.png" alt="New Home Construction" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-4 flex items-center justify-between">
              New Home Construction
              <ArrowRight className="w-5 h-5 text-accent opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            </h3>
            <p className="text-primary/70 leading-relaxed text-sm mb-6 flex-grow">
              Discuss residential home building goals, property requirements, project scope, and the next stages required to move the project forward.
            </p>
            <div className="space-y-4 text-sm mt-auto">
              <div>
                <p className="font-bold text-primary mb-2">Typical considerations:</p>
                <ul className="space-y-1 text-primary/70">
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Lot size and zoning</li>
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Square footage goals</li>
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Architectural style</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="font-medium text-primary mb-1">What to discuss on the first call:</p>
                <p className="text-primary/70 italic text-xs">Timeline, general scope, location</p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mt-4 hover:gap-3 transition-all" data-testid="link-service-1-cta">
                Start the Conversation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Service 2 */}
          <motion.div 
            className="bg-primary text-primary-foreground p-8 md:p-12 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-2xl font-serif font-bold mb-4">General Contracting</h3>
            <p className="text-primary-foreground/80 leading-relaxed text-sm mb-8 flex-grow">
              Coordinate residential construction work through organized planning, communication, scheduling, and project execution.
            </p>
            <div className="space-y-4 text-sm mt-auto">
              <div>
                <p className="font-bold text-primary-foreground mb-2">Typical considerations:</p>
                <ul className="space-y-1 text-primary-foreground/70">
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Multiple trades scheduling</li>
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Material procurement</li>
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Site management</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-primary-foreground/20">
                <p className="font-medium text-primary-foreground mb-1">What to discuss on the first call:</p>
                <p className="text-primary-foreground/70 italic text-xs">Project scale, existing conditions, budget range</p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mt-4 hover:gap-3 transition-all" data-testid="link-service-2-cta">
                Start the Conversation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Service 3 */}
          <motion.div 
            className="bg-background p-8 md:p-12 border border-border flex flex-col relative overflow-hidden h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 blueprint-grid opacity-20 transform rotate-45 translate-x-16 -translate-y-16 pointer-events-none"></div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4 relative z-10">Bathroom Remodeling</h3>
            <p className="text-primary/70 leading-relaxed text-sm relative z-10 mb-8 flex-grow">
              Plan and build a more functional bathroom space through coordinated construction, fixture placement, surface work, and finishing details.
            </p>
            <div className="space-y-4 text-sm mt-auto relative z-10">
              <div>
                <p className="font-bold text-primary mb-2">Typical considerations:</p>
                <ul className="space-y-1 text-primary/70">
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Plumbing relocation</li>
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Custom tile work</li>
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Fixture upgrades</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="font-medium text-primary mb-1">What to discuss on the first call:</p>
                <p className="text-primary/70 italic text-xs">Current layout, desired changes, timeline</p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mt-4 hover:gap-3 transition-all" data-testid="link-service-3-cta">
                Start the Conversation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Service 4 */}
          <motion.div 
            className="bg-background p-8 border border-border border-l-4 border-l-accent flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-serif font-bold text-primary mb-4">Construction Consultation</h3>
            <p className="text-primary/70 leading-relaxed text-sm mb-8 flex-grow">
              Speak directly with the company about the property, project goals, construction considerations, and possible next steps.
            </p>
            <div className="space-y-4 text-sm mt-auto">
              <div>
                <p className="font-bold text-primary mb-2">Typical considerations:</p>
                <ul className="space-y-1 text-primary/70">
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Feasibility of ideas</li>
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Constructability reviews</li>
                  <li className="flex items-start"><span className="mr-2 text-accent">-</span> Sequencing strategies</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="font-medium text-primary mb-1">What to discuss on the first call:</p>
                <p className="text-primary/70 italic text-xs">Property address, current planning stage, specific concerns</p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mt-4 hover:gap-3 transition-all" data-testid="link-service-4-cta">
                Start the Conversation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* 2 NEW lighter-weight service tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-background/50 border border-border p-6 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-3">
              <span className="text-[0.65rem] uppercase tracking-widest text-muted border border-border px-2 py-1">Discussion Category</span>
            </div>
            <h4 className="text-lg font-serif font-bold text-primary mb-3">Residential Improvements</h4>
            <p className="text-sm text-primary/70 leading-relaxed">
              Residential improvement projects may involve coordinated construction work across multiple areas. Discuss the property condition, intended changes, and project priorities to determine possible next steps.
            </p>
          </motion.div>

          <motion.div 
            className="bg-background/50 border border-border p-6 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-3">
              <span className="text-[0.65rem] uppercase tracking-widest text-muted border border-border px-2 py-1">Discussion Category</span>
            </div>
            <h4 className="text-lg font-serif font-bold text-primary mb-3">Project Planning Support</h4>
            <p className="text-sm text-primary/70 leading-relaxed">
              Early-stage projects often benefit from an organized conversation about scope, property conditions, and construction sequencing. Contact the company to begin a focused planning discussion.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const Planning = () => {
  const topics = [
    { num: "01", title: "Property and Project Overview", desc: "Prepare the property address, current conditions, and a short explanation of what you want to build, remodel, or improve." },
    { num: "02", title: "Goals and Priorities", desc: "Identify the main result you want from the project, the most important features, and any major concerns." },
    { num: "03", title: "Timeline and Budget", desc: "Share your preferred timeline and an approximate budget range so the initial conversation can remain practical." },
    { num: "04", title: "Plans and Permit Status", desc: "Mention whether drawings, sketches, architectural plans, or permit information already exist." },
  ];

  return (
    <section id="planning" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Planning a Residential Construction Project</h2>
          <p className="text-primary/70 text-lg max-w-2xl">
            A few basic details can make your first project conversation more focused and productive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, idx) => (
            <motion.div
              key={idx}
              className="border-t-2 border-accent pt-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <span className="text-2xl font-serif text-accent font-bold opacity-50 leading-none">{topic.num}</span>
              <h3 className="text-lg font-serif font-bold text-primary leading-snug">{topic.title}</h3>
              <p className="text-primary/70 text-sm leading-relaxed">{topic.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 pt-10 border-t border-border flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button asChild size="lg" className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            <a href="#contact">Discuss Your Project <ArrowRight className="w-4 h-4 ml-2" /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-none border-primary text-primary hover:bg-secondary">
            <a href="tel:+15165819706">Call (516) 581 9706</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const AboutAndProcess = () => {
  return (
    <section id="approach" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full blueprint-grid opacity-30 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* About */}
          <motion.div 
            id="about"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8 leading-tight">
              Residential Construction With a Direct Approach
            </h2>
            <div className="prose prose-lg text-primary/80 mb-8">
              <p>
                AJS Construction Corp. is based in Westbury, New York. Public business listings categorize the company as a home builder, general contractor, construction consultant, and bathroom remodeling contractor.
              </p>
            </div>
            <div className="flex items-start gap-4 p-6 bg-secondary/50 border-l-2 border-accent">
              <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <p className="font-medium text-primary">Headquarters</p>
                <p className="text-primary/70">141 E Cabot Ln<br/>Westbury, NY 11590</p>
              </div>
            </div>
          </motion.div>

          {/* Process */}
          <motion.div 
            id="process"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[1px] bg-accent"></div>
              <span className="text-sm font-medium tracking-widest uppercase text-muted">Approach</span>
            </div>
            
            <div className="space-y-8">
              {[
                { num: "01", title: "Initial Project Conversation", desc: "Discuss the property address, intended project type, general goals, and current planning stage to determine whether AJS Construction Corp. is the right fit." },
                { num: "02", title: "Property and Scope Review", desc: "Review the physical site, existing conditions, general design direction, and what the construction work is likely to involve." },
                { num: "03", title: "Planning and Coordination", desc: "Clarify the proposed scope of work, discuss scheduling considerations, define responsibilities, and establish a clear set of next steps." },
                { num: "04", title: "Construction Execution", desc: "Move through the approved construction scope with organized site communication, coordination between trades, and progress documentation." },
                { num: "05", title: "Project Review and Completion", desc: "Review the completed work against the agreed scope, address any outstanding items, and confirm the project is ready to close." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-3xl font-serif text-accent font-bold opacity-50 pt-1">{step.num}</div>
                  <div className="pb-8 border-b border-border/50 flex-1">
                    <h4 className="text-xl font-serif font-bold text-primary mb-2">{step.title}</h4>
                    <p className="text-primary/70 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const ProjectsWorthDiscussing = () => {
  const projects = [
    { title: "Building a New Home", desc: "Property owners considering new residential construction can discuss the site, intended home size, general design direction, and the stages required to move the project toward active planning." },
    { title: "Managing a Residential Renovation", desc: "Renovation projects involving multiple construction areas may benefit from coordinated general contracting. Discuss the property, intended scope, and construction phasing." },
    { title: "Updating a Bathroom", desc: "Bathroom remodeling projects can range from targeted fixture updates to full spatial redesigns. Discuss the current layout, desired changes, and available timeline." },
    { title: "Reviewing an Early Construction Idea", desc: "Early-stage ideas benefit from a direct conversation about feasibility, scope, and possible next steps before committing to a full project plan." }
  ];

  return (
    <section id="project-types" className="py-24 bg-primary text-primary-foreground">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx} 
              className="bg-primary-foreground/5 p-8 border border-primary-foreground/10 flex flex-col h-full hover:bg-primary-foreground/10 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-4xl font-serif text-accent mb-6 font-bold">{(idx + 1).toString().padStart(2, '0')}</div>
              <h3 className="text-xl font-serif font-bold mb-4">{project.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-8 flex-grow">{project.desc}</p>
              <a href="#contact" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all mt-auto" data-testid={`link-project-discuss-${idx}`}>
                Discuss This Project <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Showcase = () => {
  const images = [
    { src: "/src/assets/images/showcase-1.png", alt: "New residential construction / modern framing" },
    { src: "/src/assets/images/showcase-2.png", alt: "Structural framing / construction in progress" },
    { src: "/src/assets/images/showcase-3.png", alt: "Modern bathroom remodel" },
    { src: "/src/assets/images/showcase-4.png", alt: "Interior construction detail" },
    { src: "/src/assets/images/showcase-5.png", alt: "Residential exterior work" },
    { src: "/src/assets/images/showcase-6.png", alt: "Finished living space" },
  ];

  return (
    <section id="work" className="py-24 bg-primary text-primary-foreground">
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
    <section id="what-to-expect" className="py-24 bg-secondary">
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
    <section id="contact" className="py-24 bg-secondary">
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
                          <Input placeholder="John Doe" className="rounded-none border-border focus-visible:ring-accent" {...field} />
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
                          <Input placeholder="(555) 123-4567" className="rounded-none border-border focus-visible:ring-accent" {...field} />
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
                          <Input type="email" placeholder="john@example.com" className="rounded-none border-border focus-visible:ring-accent" {...field} />
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
                          <Input placeholder="123 Main St, City, NY" className="rounded-none border-border focus-visible:ring-accent" {...field} />
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
                            <SelectTrigger className="rounded-none border-border focus:ring-accent">
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
                          <Input placeholder="e.g., Next 3 months, ASAP" className="rounded-none border-border focus-visible:ring-accent" {...field} />
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
                          className="rounded-none border-border focus-visible:ring-accent min-h-[120px]" 
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
    <section id="questions" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          className="text-3xl md:text-5xl font-serif text-primary mb-12 text-center"
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
    <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
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
        <Planning />
        <AboutAndProcess />
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
