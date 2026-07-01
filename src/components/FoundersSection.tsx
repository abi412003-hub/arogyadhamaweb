"use client";
import { motion } from "framer-motion";
import { Award, BookOpen, Globe, Star } from "lucide-react";
import founderNagendra from "@/assets/founder-nagendra.jpg";
import founderNagarathna from "@/assets/founder-nagarathna.jpg";

/* ─── Decorative SVG lotus ─── */
function LotusDecor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none">
      <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a}
          cx={60 + Math.cos((a * Math.PI) / 180) * 42}
          cy={60 + Math.sin((a * Math.PI) / 180) * 42}
          rx="10" ry="22"
          transform={`rotate(${a}, ${60 + Math.cos((a * Math.PI) / 180) * 42}, ${60 + Math.sin((a * Math.PI) / 180) * 42})`}
          stroke="currentColor" strokeWidth="0.6" opacity="0.3"
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((a) => (
        <ellipse key={a}
          cx={60 + Math.cos((a * Math.PI) / 180) * 22}
          cy={60 + Math.sin((a * Math.PI) / 180) * 22}
          rx="6" ry="14"
          transform={`rotate(${a}, ${60 + Math.cos((a * Math.PI) / 180) * 22}, ${60 + Math.sin((a * Math.PI) / 180) * 22})`}
          stroke="currentColor" strokeWidth="0.5" opacity="0.25"
        />
      ))}
    </svg>
  );
}

/* ─── Founder profile avatar ─── */
function FounderAvatar({ initials, bg, photo }: { initials: string; bg: string; photo?: string }) {
  if (photo) {
    return (
      <div className="relative w-56 mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-card-hover aspect-[3/4] border border-gold/20">
          <img src={photo} alt={initials} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full" style={{ background: "hsl(var(--gold))" }} />
      </div>
    );
  }
  return (
    <div className="relative w-40 h-40 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-dashed" style={{ borderColor: "hsl(var(--gold) / 0.5)", animation: "spin 30s linear infinite" }} />
      <div className="absolute inset-3 rounded-full border" style={{ borderColor: "hsl(var(--gold) / 0.3)" }} />
      <div className={`absolute inset-4 rounded-full flex items-center justify-center ${bg}`}>
        <span className="font-display font-bold text-cream text-3xl">{initials}</span>
      </div>
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full" style={{ background: "hsl(var(--gold))" }} />
    </div>
  );
}

/* ─── Founder Card ─── */
interface FounderProps {
  initials: string;
  avatarBg: string;
  photo?: string;
  prefix?: string;
  name: string;
  qualifications?: string;
  title: string;
  institution: string;
  quote: string;
  achievements: { icon: typeof Award; label: string; desc: string }[];
  bio: string[];
  reversed?: boolean;
  index: number;
}

function FounderCard(props: FounderProps) {
  const { initials, avatarBg, photo, prefix, name, qualifications, title, institution, quote, achievements, bio, reversed, index } = props;

  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{ background: index % 2 === 0 ? "hsl(var(--cream))" : "hsl(168 15% 97%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-start ${reversed ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>

          {/* Left: Profile visual */}
          <div>
            {photo ? (
              /* Photo-led card with gradient overlay */
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover border border-gold/20 aspect-[3/4]">
                <img src={photo} alt={name} className="absolute inset-0 w-full h-full object-cover" />
                {/* Gold top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 z-20" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)))" }} />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/80 via-40% to-transparent" />

                {/* Text content over gradient */}
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8 z-10">
                  {prefix && (
                    <div className="inline-block font-body text-[10px] tracking-[0.25em] uppercase text-gold bg-gold/15 backdrop-blur-sm px-3 py-1 rounded-full mb-3 border border-gold/30">
                      {prefix}
                    </div>
                  )}
                  <h2 className="font-display font-bold text-cream leading-tight" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)" }}>
                    {name}
                  </h2>
                  {qualifications && (
                    <p className="font-body text-gold/90 text-xs mt-1 font-medium">{qualifications}</p>
                  )}
                  <div className="h-px w-12 my-3" style={{ background: "hsl(var(--gold))" }} />
                  <p className="font-display font-semibold text-cream/95 text-sm">{title}</p>
                  <p className="font-body text-cream/65 text-xs mt-0.5">{institution}</p>

                  {/* Quote */}
                  <div className="mt-5 relative pl-5 border-l-2 border-gold/60">
                    <div className="font-quote text-4xl leading-none text-gold/40 absolute -top-2 -left-1 select-none">&ldquo;</div>
                    <p className="font-quote italic text-cream/85 leading-relaxed text-sm">
                      {quote}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Fallback initials card */
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-card-hover">
                <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)))" }} />
                <div className="relative px-8 pt-12 pb-8 text-center">
                  <LotusDecor className="absolute top-4 right-4 w-24 h-24 text-gold opacity-20" />
                  <FounderAvatar initials={initials} bg={avatarBg} />
                  <div className="mt-6">
                    {prefix && (
                      <div className="inline-block font-body text-xs tracking-[0.25em] uppercase text-gold bg-gold/10 px-3 py-1 rounded-full mb-3">
                        {prefix}
                      </div>
                    )}
                    <h2 className="font-display font-bold text-forest leading-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                      {name}
                    </h2>
                    {qualifications && (
                      <p className="font-body text-sage text-sm mt-1 font-medium">{qualifications}</p>
                    )}
                    <div className="h-px w-16 mx-auto my-4" style={{ background: "hsl(var(--gold))" }} />
                    <p className="font-display font-semibold text-forest/80 text-base">{title}</p>
                    <p className="font-body text-sage text-sm mt-0.5">{institution}</p>
                  </div>
                  <div className="absolute inset-0 rounded-3xl border-2 border-gold/20 pointer-events-none" />
                </div>
                <div className="px-8 pb-8">
                  <div className="bg-cream rounded-2xl p-6 border border-border relative">
                    <div className="font-quote text-5xl leading-none text-gold/20 absolute -top-2 left-4 select-none">&ldquo;</div>
                    <p className="font-quote italic text-forest/75 leading-relaxed text-base pt-3">
                      {quote}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Detailed bio */}
          <div>
            <div className="space-y-6">
              {/* Achievements grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={ach.label}
                    className="bg-white rounded-2xl p-5 border border-border shadow-card flex gap-4 items-start"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--gold) / 0.12)" }}>
                      <ach.icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-forest text-sm leading-tight mb-0.5">{ach.label}</div>
                      <div className="font-body text-forest/55 text-xs leading-relaxed">{ach.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bio paragraphs */}
              <div className="space-y-4 font-body text-forest/70 leading-relaxed text-base">
                {bio.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ─── Founders data ─── */
export const founders = [
  {
    initials: "HN",
    avatarBg: "bg-forest-gradient",
    photo: founderNagendra,
    prefix: "Padma Shri",
    name: "Dr. H. R. Nagendra",
    qualifications: "B.E., M.Tech (IIT), PhD",
    title: "President",
    institution: "S-VYASA, Bengaluru",
    quote:
      "Yoga is not a religion. It is a science — a science of well-being, of youthfulness, of integrating body, mind, and soul. The ancient sages were our first scientists.",
    achievements: [
      {
        icon: Award,
        label: "Padma Shri (2016)",
        desc: "India's fourth-highest civilian honour for contributions to Yoga science",
      },
      {
        icon: Globe,
        label: "International Yoga Day",
        desc: "Designed the official UN protocol for June 21st — adopted by 177 nations",
      },
      {
        icon: BookOpen,
        label: "200+ Publications",
        desc: "Authored landmark texts on Yoga therapy, Pranayama, and integrative healing",
      },
      {
        icon: Star,
        label: "IIT Alumni",
        desc: "B.E. Mechanical, M.Tech IIT Bombay — science at the root of his Yoga journey",
      },
    ],
    bio: [
      "Dr. H. R. Nagendra is the founding father of Arogyadhama and the architect of S-VYASA University. An aerospace engineer by training — with degrees from IIT Bombay — Dr. Nagendra's encounter with Swami Vivekananda's teachings redirected his extraordinary intellect from machines to the human body and mind.",
      "In 1981, he co-founded the organisation that would become S-VYASA, with a singular conviction: that Yoga could be subjected to scientific scrutiny and, validated thus, could heal conditions that conventional medicine struggled with. Forty years later, that conviction has produced over 400 peer-reviewed papers.",
      "Dr. Nagendra's role in the establishment of International Yoga Day was seminal. When Prime Minister Modi proposed the concept to the UN in 2014, it was Dr. Nagendra's team at S-VYASA that designed the evidence-based yoga protocols adopted globally. In 2016, the Government of India recognised his life's work with the Padma Shri.",
      "Today, as President of S-VYASA, Dr. Nagendra continues to lead with the rare combination of scientific rigor and spiritual depth that defines Arogyadhama.",
    ],
  },
  {
    initials: "RN",
    avatarBg: "bg-sage-gradient",
    photo: founderNagarathna,
    prefix: undefined,
    name: "Dr. R. Nagarathna",
    qualifications: "MBBS, MD, FRCP (London, UK)",
    title: "Chief Medical Director",
    institution: "Arogyadhama, S-VYASA",
    quote:
      "When a patient arrives with diabetes and leaves having transformed their lifestyle, their stress response, their relationship with their body — that is not just medicine. That is true healing.",
    achievements: [
      {
        icon: Award,
        label: "Kannada Rajyotsava Award (2019)",
        desc: "Karnataka's highest state honour for distinguished service in medicine and public health",
      },
      {
        icon: BookOpen,
        label: "FRCP London",
        desc: "Fellow of the Royal College of Physicians, London — the highest British medical distinction",
      },
      {
        icon: Globe,
        label: "Diabetes Reversal Pioneer",
        desc: "Led the clinical research establishing Yoga's evidence-base for Type 2 diabetes management",
      },
      {
        icon: Star,
        label: "40+ Years in Practice",
        desc: "Four decades of clinical integrative medicine blending MBBS, MD, and Yoga science",
      },
    ],
    bio: [
      "Dr. R. Nagarathna is the clinical heart of Arogyadhama. As Chief Medical Director, she has, for over four decades, translated the institution's research excellence into real-world healing for tens of thousands of patients. Her qualifications span both worlds: an MBBS and MD from conventional medicine, and a Fellowship from the Royal College of Physicians in London — among the most prestigious medical credentials in the world.",
      "Dr. Nagarathna co-founded the institution alongside Dr. Nagendra in 1981, but where he provided the scientific framework, she provided the clinical vision. Her specialisation in integrative approaches to Non-Communicable Diseases — particularly diabetes, hypertension, and respiratory disorders — has produced some of Arogyadhama's most cited research.",
      "Her landmark work demonstrating Yoga's measurable effects on blood glucose in Type 2 diabetes — published in peer-reviewed journals — has been cited worldwide and influenced clinical guidelines. She is one of the few clinicians globally to have conducted large-scale, randomised controlled trials on Yoga therapy.",
      "In 2019, the Government of Karnataka honoured her with the Kannada Rajyotsava Award for distinguished contributions to medicine. Under her clinical leadership, Arogyadhama's treatment protocols have maintained an exceptional safety record while pioneering a new paradigm of evidence-based integrative care.",
    ],
  },
];

/* ─── Reusable Founders Section ─── */
export default function FoundersSection({ showIntro = true }: { showIntro?: boolean }) {
  return (
    <>
      {showIntro && (
        <section className="py-14 bg-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">The Visionaries</span>
              <p className="font-body text-forest/65 mt-6 leading-relaxed text-lg">
                Arogyadhama was born from the confluence of two extraordinary minds — a scientist-sage and a physician-healer — united by a shared conviction that ancient India's healing wisdom deserved rigorous scientific validation. Their partnership has produced an institution unlike any other in the world.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {founders.map((f, i) => (
        <FounderCard key={f.name} {...f} reversed={i % 2 === 1} index={i} />
      ))}
    </>
  );
}