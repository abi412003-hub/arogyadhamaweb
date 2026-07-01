"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight, ChevronDown, Search, X } from "lucide-react";

const FAQ_DATA = [
  {
    category: "Admission & Booking",
    color: "hsl(var(--forest))",
    bg: "hsl(var(--forest) / 0.07)",
    items: [
      {
        q: "How do I get admitted to Arogyadhama?",
        a: "Contact us by phone (997-287-1777 for IPD bookings) or fill out the online booking form at /book-now. Our team will contact you within 24 hours to discuss your condition, confirm availability, and guide you through the process.",
      },
      {
        q: "When are admissions conducted?",
        a: "IPD (inpatient) admissions are on Tuesdays only. The tariff week runs from Tuesday to Monday. Please arrive before 11:00 AM on your admission Tuesday. OPD consultations are available weekdays during OPD hours.",
      },
      {
        q: "Is a referral letter required?",
        a: "A referral letter is not mandatory, but bringing your previous medical reports, investigation results, and current medications greatly helps our doctors design your protocol from Day 1. We recommend bringing all available medical history.",
      },
      {
        q: "Can family members stay with the patient?",
        a: "Yes — family attendants can stay in Double Sharing or Suite Sharing rooms. Attendant tariff is applicable. Please inform us at the time of booking so we can make appropriate arrangements.",
      },
      {
        q: "Is there a waiting list?",
        a: "Yes, particularly for deluxe and suite rooms during peak seasons (October–February). We recommend booking at least 2–4 weeks in advance. Budget dormitory rooms generally have more immediate availability.",
      },
    ],
  },
  {
    category: "Tariff & Payment",
    color: "hsl(var(--gold))",
    bg: "hsl(var(--gold) / 0.07)",
    items: [
      {
        q: "What is included in the tariff?",
        a: "All tariffs include accommodation, three sattvic vegetarian meals daily, yoga therapy sessions, medical consultations with our doctors, and a yoga kit. Additional therapies (Naturopathy, Ayurveda, Physiotherapy, Acupuncture) are charged separately as per category.",
      },
      {
        q: "What is the minimum duration of stay?",
        a: "The minimum stay is 6 nights (one complete Tuesday-to-Monday week). Our doctors generally recommend a minimum of 2 weeks to see meaningful clinical improvement for chronic conditions.",
      },
      {
        q: "When is the bill settled?",
        a: "Bill settlement is required one day before discharge. Our accounts team will provide a detailed itemised bill. We accept cash, bank transfer, and major digital payment modes.",
      },
      {
        q: "Are there discounts for longer stays?",
        a: "The tariff is standardised per week. We do not currently offer week-on-week discounts, but our team can advise on the most cost-effective accommodation option for your duration and needs.",
      },
      {
        q: "Can I use health insurance?",
        a: "Insurance coverage depends on your specific policy. Integrative and yoga therapy may not be covered by all insurers. We recommend checking with your insurer before arrival. We can provide itemised receipts for insurance purposes.",
      },
    ],
  },
  {
    category: "Daily Life & Programme",
    color: "hsl(168 30% 28%)",
    bg: "hsl(168 30% 28% / 0.07)",
    items: [
      {
        q: "What is the daily schedule like?",
        a: "The day begins at 5:30 AM with Om Meditation and ends with dinner at 7:30 PM (Happy Assembly on Wed/Fri/Sun). The programme is structured but compassionate — if a patient is not able to participate in a session, alternatives are arranged by the therapy team.",
      },
      {
        q: "Are the meals vegetarian?",
        a: "Yes, all meals at Arogyadhama are sattvic vegetarian — carefully prepared by clinical nutritionists as part of the therapeutic diet. Therapeutic dietary modifications (low-sugar, low-sodium, etc.) are made based on each patient's condition.",
      },
      {
        q: "Can I bring my own food?",
        a: "Outside food is generally discouraged as it can interfere with the therapeutic diet protocol. Please speak to the nutrition team if you have specific dietary requirements — they will do their best to accommodate you.",
      },
      {
        q: "Is there internet / WiFi available?",
        a: "Limited WiFi is available in certain areas of the campus. However, we encourage patients to practise digital minimalism as part of the healing process. The programme is most effective when patients are fully present.",
      },
      {
        q: "Are there restrictions on mobile phone use?",
        a: "Mobile phones are permitted for personal use. However, we maintain silence between 9:00 PM and 5:30 AM to support restful healing. Please be mindful of other patients, especially in shared accommodation areas.",
      },
    ],
  },
  {
    category: "Medical & Therapies",
    color: "hsl(var(--sage))",
    bg: "hsl(var(--sage) / 0.07)",
    items: [
      {
        q: "Can I continue my current medications during the stay?",
        a: "Absolutely. Our doctors will review your medications on admission and advise accordingly. Do not discontinue any medications without medical supervision. Bring a complete list and sufficient supply of all your current medications.",
      },
      {
        q: "Which conditions are best treated at Arogyadhama?",
        a: "Our greatest clinical strengths are in: Diabetes & metabolic disorders, Chronic back and spinal conditions, Neurological conditions (stroke, Parkinson's, epilepsy), Cardiac rehabilitation, Psychiatric conditions (anxiety, depression), and Respiratory disorders (asthma, COPD). We also offer excellent programmes for general wellness and cancer supportive care.",
      },
      {
        q: "Are the therapies prescribed individually?",
        a: "Yes. On admission, every patient is assessed by our doctors who prescribe a personalised protocol — which therapies, at what intensity, and for how long. The 'Special Technique' sessions in the daily schedule are customised for each patient.",
      },
      {
        q: "How many doctors are on the team?",
        a: "Arogyadhama has a team of specialists across integrative medicine, yoga therapy, Ayurveda, naturopathy, physiotherapy, acupuncture, and conventional medicine. The exact team composition varies; please contact us for information about specialists currently available.",
      },
      {
        q: "Is emergency medical care available?",
        a: "Yes. Arogyadhama has 24/7 nursing care and access to emergency medical facilities. Being part of S-VYASA, we are connected to a network of partner hospitals for any case requiring higher-level intervention.",
      },
    ],
  },
  {
    category: "Facilities & Logistics",
    color: "hsl(200 55% 32%)",
    bg: "hsl(200 55% 32% / 0.07)",
    items: [
      {
        q: "How far is Arogyadhama from Bengaluru city?",
        a: "The campus is approximately 33–35 km from Bengaluru city centre, Kempegowda International Airport, and the main railway station. Travel time is typically 50–70 minutes depending on traffic. Campus cab services are available — call 990-218-0006 or 734-902-9157.",
      },
      {
        q: "Is there a laundry service?",
        a: "Yes, laundry service is available on campus. Most patients find 3–4 sets of comfortable clothing sufficient for a 2-week stay.",
      },
      {
        q: "Are there ATMs on campus?",
        a: "There is no ATM directly on campus. The nearest ATMs are in Jigani (~4 km) and Anekal (~6 km). We recommend arriving with sufficient cash or using digital payment methods.",
      },
      {
        q: "Can I take a 'virtual tour' of the campus?",
        a: "Yes! You can explore Prashanti Kutiram virtually at: https://turiya.co/360/SVYASA/ — a 360° tour of our campus, meditation halls, accommodation, and therapy centres.",
      },
      {
        q: "Are visitors allowed to meet patients?",
        a: "Yes, visitors are welcome during designated visiting hours. Please check with our reception for the current visiting schedule. Visitors are expected to respect the healing environment — please maintain quietude on campus.",
      },
    ],
  },
];

export default function FAQs() {
  const [search, setSearch] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const searchLower = search.toLowerCase();

  const filteredData = FAQ_DATA.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchLower) ||
        item.a.toLowerCase().includes(searchLower)
    ),
  })).filter(
    (cat) =>
      (activeCategory === "all" || cat.category === activeCategory) &&
      cat.items.length > 0
  );

  const totalResults = filteredData.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(168 35% 24%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/plan-your-stay" className="hover:text-gold transition-colors">Plan Your Stay</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">FAQs</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
              Frequently Asked<br />
              <em className="not-italic text-gold">Questions</em>
            </h1>
            <p className="font-body text-cream/70 mt-4 max-w-lg">
              Everything you need to know about staying at Arogyadhama — from admission to daily life, therapies, and facilities.
            </p>

            {/* Search */}
            <div className="relative mt-8 max-w-xl">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sage" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search FAQs…"
                maxLength={100}
                className="w-full pl-10 pr-10 py-3.5 rounded-xl font-body text-sm text-forest outline-none border-2 border-transparent focus:border-gold bg-white"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sage hover:text-forest transition-colors p-1"
                  aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category filters */}
      <div className="sticky top-16 z-20 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-2 py-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}>
          <button onClick={() => setActiveCategory("all")}
            className="font-body text-sm px-4 py-1.5 rounded-full whitespace-nowrap transition-all border"
            style={{
              background: activeCategory === "all" ? "hsl(var(--forest))" : "white",
              color: activeCategory === "all" ? "hsl(var(--cream))" : "hsl(var(--forest) / 0.6)",
              borderColor: activeCategory === "all" ? "hsl(var(--forest))" : "hsl(var(--border))",
              fontWeight: activeCategory === "all" ? "600" : "400",
            }}>
            All Categories
          </button>
          {FAQ_DATA.map((cat) => (
            <button key={cat.category} onClick={() => setActiveCategory(cat.category)}
              className="font-body text-sm px-4 py-1.5 rounded-full whitespace-nowrap transition-all border"
              style={{
                background: activeCategory === cat.category ? cat.color : "white",
                color: activeCategory === cat.category ? "hsl(var(--cream))" : "hsl(var(--forest) / 0.6)",
                borderColor: activeCategory === cat.category ? cat.color : "hsl(var(--border))",
                fontWeight: activeCategory === cat.category ? "600" : "400",
              }}>
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-12">
        {search && (
          <p className="font-body text-sm text-sage">
            {totalResults} result{totalResults !== 1 ? "s" : ""} for "{search}"
          </p>
        )}

        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <p className="font-display font-bold text-forest text-xl mb-2">No results found</p>
            <p className="font-body text-sage text-sm">Try a different search term or browse by category.</p>
          </div>
        )}

        {filteredData.map((cat, ci) => (
          <motion.div key={cat.category}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: ci * 0.05 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: cat.color }} />
              <h2 className="font-display font-bold text-forest text-xl">{cat.category}</h2>
              <span className="font-body text-xs text-sage">({cat.items.length})</span>
            </div>

            <div className="space-y-2">
              {cat.items.map((item) => {
                const id = `${cat.category}::${item.q}`;
                const isOpen = openItem === id;
                return (
                  <div key={id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                    <button
                      onClick={() => setOpenItem(isOpen ? null : id)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left min-h-[44px]"
                      aria-expanded={isOpen}
                    >
                      <span className="font-body font-semibold text-forest text-sm leading-snug">{item.q}</span>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ background: isOpen ? cat.color : "hsl(var(--muted))" }}>
                        <ChevronDown size={14}
                          className="transition-transform duration-200"
                          style={{
                            color: isOpen ? "hsl(var(--cream))" : "hsl(var(--sage))",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}>
                          <div className="px-6 pb-5 pt-0 border-t border-border">
                            <p className="font-body text-sm text-forest/70 leading-relaxed mt-3">{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Still have questions CTA */}
        <motion.div className="rounded-3xl p-8 text-center border border-border"
          style={{ background: "hsl(var(--forest) / 0.04)" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="font-display font-bold text-forest text-2xl mb-2">Still Have Questions?</h3>
          <p className="font-body text-sage text-sm mb-6">Our team is ready to help — by phone, email, or WhatsApp.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:08022639963"
              className="flex items-center justify-center gap-2 font-body font-semibold px-6 py-3 rounded-xl transition-colors"
              style={{ background: "hsl(var(--forest))", color: "hsl(var(--cream))" }}>
              Call: 080-2263-9963
            </a>
            <a href="https://wa.me/919972871777" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-body font-semibold px-6 py-3 rounded-xl border-2 transition-colors"
              style={{ borderColor: "hsl(var(--forest) / 0.3)", color: "hsl(var(--forest))" }}>
              WhatsApp Us
            </a>
            <Link to="/contact"
              className="flex items-center justify-center gap-2 font-body font-semibold px-6 py-3 rounded-xl border-2 transition-colors"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--sage))" }}>
              Send an Enquiry
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}