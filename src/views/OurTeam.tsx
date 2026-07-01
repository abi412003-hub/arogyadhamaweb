"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/router-compat";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { ChevronRight, User, X } from "lucide-react";
import aishwaryaSahu from "@/assets/team/aishwarya-sahu.jpg";
import drRNagarathna from "@/assets/team/dr-r-nagarathna.jpg";
import drAmitSingh from "@/assets/team/dr-amit-singh.jpg";
import amshumanYadav from "@/assets/team/amshuman-r-yadav.jpg";
import ankitaMishra from "@/assets/team/ankita-mishra.jpg";
import aparSaoji from "@/assets/team/apar-saoji.jpg";
import krupaA from "@/assets/team/krupa-a.jpg";
import arundatiGoley from "@/assets/team/arundati-goley.jpg";
import nagachaitanya from "@/assets/team/nagachaitanya.jpg";
import kritikaGupta from "@/assets/team/kritika-gupta.jpg";
import moulyaAppanna from "@/assets/team/moulya-appanna.jpg";
import medhiniShirsat from "@/assets/team/medhini-shirsat.jpg";
import naveenShankar from "@/assets/team/naveen-shankar.jpg";
import navyaShenoy from "@/assets/team/navya-shenoy.jpg";
import nibedita from "@/assets/team/nibedita.jpg";
import padminiTekur from "@/assets/team/padmini-tekur.jpg";
import pallaviV from "@/assets/team/pallavi-v.jpg";
import praveenKumarTR from "@/assets/team/praveen-kumar-t-r.jpg";
import promilaChoudhary from "@/assets/team/promila-choudhary.jpg";
import prashanthVMangalvedhe from "@/assets/team/prashanth-v-mangalvedhe.png";
import ranjiniMurthy from "@/assets/team/ranjini-murthy.jpg";
import sharadChaudhari from "@/assets/team/sharad-shivajirao-chaudhari.jpg";
import shishiraR from "@/assets/team/shishira-r.png";
import shriramaDongre from "@/assets/team/shrirama-dongre.jpg";
import sushmitaCT from "@/assets/team/sushmita-c-t.png";
import vaishaliMathapati from "@/assets/team/vaishali-mathapati.jpg";
import vaddeVenkataKarthik from "@/assets/team/vadde-venkata-karthik.png";
import vishwasPapanna from "@/assets/team/vishwas-papanna.jpg";
import bidyalaxmiSoraisham from "@/assets/team/bidyalaxmi-soraisham.jpg";
import jalandharBhatta from "@/assets/team/jalandhar-bhatta.jpg";
import kamkhayaNarayan from "@/assets/team/kamkhaya-narayan.jpg";
import mithaliSarkar from "@/assets/team/mithali-sarkar.jpg";
import prameshwarSome from "@/assets/team/prameshwar-some.jpg";
import shankarD from "@/assets/team/shankar-d.jpg";
import siddaNagaraju from "@/assets/team/sidda-nagaraju.jpg";
import sindhujaAnand from "@/assets/team/sindhuja-anand.jpg";
import subarnaMohanty from "@/assets/team/subarna-surajita-mohanty.jpg";
import sureshBabu from "@/assets/team/suresh-babu.jpg";
import surjitKar from "@/assets/team/surjit-kar.jpg";
import tankeshwarMeher from "@/assets/team/tankeshwar-meher.jpg";
import vikashKumar from "@/assets/team/vikash-kumar.jpg";
import yogendraKumar from "@/assets/team/yogendra-kumar.jpg";
import abhishek from "@/assets/team/abhishek.jpg";
import kiritiBhusanGhosh from "@/assets/team/kiriti-bhusan-ghosh.jpg";
import anujKumar from "@/assets/team/anuj-kumar.jpg";
import chandrika from "@/assets/team/chandrika.jpg";
import hanumanti from "@/assets/team/hanumanti.jpg";
import mahalinga from "@/assets/team/mahalinga.jpg";
import pavitra from "@/assets/team/pavitra.jpg";
import prabhavatiKumari from "@/assets/team/prabhavati-kumari.jpg";
import pranavRoy from "@/assets/team/pranav-roy.jpg";
import radhaCT from "@/assets/team/radha-c-t.jpg";
import ramesh from "@/assets/team/ramesh.jpg";
import ramya from "@/assets/team/ramya.jpg";
import raviRanjanKumar from "@/assets/team/ravi-ranjan-kumar.jpg";
import rinkiKumari from "@/assets/team/rinki-kumari.jpg";
import shanbhuKumar from "@/assets/team/shanbhu-kumar.jpg";
import umeshKumar from "@/assets/team/umesh-kumar.jpg";
import anjaliPacherwal from "@/assets/team/anjali-pacherwal.jpg";
import gudduKumar from "@/assets/team/guddu-kumar.jpg";
import hariNG from "@/assets/team/hari-n-g.jpg";
import kiranKumari from "@/assets/team/kiran-kumari.jpg";
import manjappa from "@/assets/team/manjappa.jpg";
import ranjini from "@/assets/team/ranjini.jpg";
import saraswatiKumari from "@/assets/team/saraswati-kumari.jpg";
import shivani from "@/assets/team/shivani.jpg";
import swati from "@/assets/team/swati.jpg";
import vikashKumarYadav from "@/assets/team/vikash-kumar-yadav.jpg";
import vishalKumar from "@/assets/team/vishal-kumar.jpg";
import adityaKumar from "@/assets/team/aditya-kumar.jpg";
import jyothirmai from "@/assets/team/jyothirmai.jpg";
import ranjitKumar from "@/assets/team/ranjit-kumar.jpg";
import ritaKumari from "@/assets/team/rita-kumari.jpg";
import { doctors as doctorsBase, yogaTherapists as yogaBase, ayurvedaTherapists as ayurvedaBase, naturopathyTherapists as naturopathyBase, physiotherapists as physioBase, slugify, type Member } from "@/lib/doctors";

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.href ? (
            <Link to={item.href} className="hover:text-gold transition-colors">{item.label}</Link>
          ) : (
            <span className="text-cream/90">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={12} />}
        </span>
      ))}
    </nav>
  );
}

function PageHero() {
  return (
    <section
      className="relative pt-28 pb-14 overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 55%, hsl(var(--forest-light)) 100%)" }}
    >
      <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-gold/15 hidden lg:block" />
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-gold/10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our Team" }]} />
          <h1 className="font-display text-cream mt-5 font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
            Our Team
          </h1>
          <p className="font-body text-cream/70 mt-4 max-w-xl">
            Meet the doctors, consultants, and yoga therapists who bring decades of clinical experience and devoted practice to every patient's care.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const IMG_STYLE_OVERRIDES: Record<string, React.CSSProperties> = {
  "rinki-kumari": { objectPosition: "65% top" },
  "prabhavati-kumari": { objectPosition: "65% top" },
};

const SCALE_OVERRIDES: Record<string, string> = {
  "aishwarya-sahu": "scale-[1.15]",
  "dr-r-nagarathna": "scale-[1.15]",
  "dr-amit-singh": "scale-[1.5]",
  "amshuman-r-yadav": "scale-[1.15]",
  "ankita-mishra": "scale-[1.15]",
  "apar-saoji": "scale-[1.15]",
};

function getDesignation(member: Member): string {
  if (member.designation) return member.designation;
  const q = member.qualifications.toUpperCase();
  if (q.includes("MPT") || q.includes("BPT")) return "Physiotherapist";
  if (q.includes("BAMS")) return "Ayurveda Consultant";
  if (q.includes("MBBS")) return "Senior Medical Consultant";
  if (q.includes("YOGA")) return "Yoga Therapist";
  if (q.includes("BNYS")) return "Consultant Physician — Naturopathy & Yoga";
  return "Consultant";
}

function getBio(member: Member): string {
  if (member.bio) return member.bio;
  const designation = getDesignation(member);
  return `${member.name} is a dedicated ${designation.toLowerCase()} at Arogyadhama, bringing years of clinical experience in integrative healing. With a strong foundation in ${member.qualifications}, the focus is on personalised, evidence-informed care that combines traditional wisdom with modern practice.`;
}

function MemberCard({ member, index, onOpen }: { member: Member; index: number; onOpen: (m: Member) => void }) {
  const slug = slugify(member.name);
  const imgStyle = IMG_STYLE_OVERRIDES[slug];
  const scaleClass = SCALE_OVERRIDES[slug] ?? "scale-[1.35]";
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(member)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
      className="bg-cream border border-forest/10 rounded-2xl p-3 sm:p-6 text-center hover:shadow-lg hover:border-gold/40 transition-all text-left w-full focus:outline-none focus:ring-2 focus:ring-gold/50"
    >
      <div
        className="mx-auto bg-forest/5 border-2 border-gold/30 flex items-center justify-center overflow-hidden mb-4 w-[120px] h-[150px] sm:w-[200px] sm:h-[240px]"
        style={{ borderRadius: 12 }}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className={`block w-full h-full rounded-[8px] object-cover mx-auto ${scaleClass} origin-top`}
            style={{ ...imgStyle, objectPosition: imgStyle?.objectPosition ?? "center top" }}
          />
        ) : (
          <User className="w-12 h-12 text-forest/30" strokeWidth={1.25} />
        )}
      </div>
      <h3 className="font-display text-lg text-forest font-semibold leading-tight text-center">{member.name}</h3>
      {member.designation && (
        <p className="font-body text-xs text-gold font-medium mt-1 text-center">{member.designation}</p>
      )}
      <div className="mt-3 pt-3 border-t border-forest/10">
        <p className="font-body text-sm text-forest/60 text-center">{member.qualifications}</p>
      </div>
    </motion.button>
  );
}

function BioModal({ member, onClose }: { member: Member | null; onClose: () => void }) {
  useEffect(() => {
    if (!member) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} bio`}
            className="relative bg-cream rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gold/30 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 p-2 rounded-full text-forest/60 hover:text-forest hover:bg-forest/5 transition-colors z-10"
            >
              <X size={20} />
            </button>
            {member.image && (
              <div
                className="mx-auto bg-forest/5 border-2 border-gold/30 flex items-center justify-center overflow-hidden mb-5 w-[160px] h-[200px]"
                style={{ borderRadius: 12 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className={`block w-full h-full rounded-[8px] object-cover mx-auto ${SCALE_OVERRIDES[slugify(member.name)] ?? "scale-[1.35]"} origin-top`}
                  style={{ objectPosition: "center top" }}
                />
              </div>
            )}
            <h3 className="font-display text-2xl text-forest font-bold pr-8 leading-tight text-center">{member.name}</h3>
            <p className="font-body text-sm text-forest/70 mt-2 text-center">{member.qualifications}</p>
            <p className="font-body text-sm text-gold font-semibold uppercase tracking-wider mt-1 text-center">
              {getDesignation(member)}
            </p>
            <div className="mt-4 pt-4 border-t border-forest/10">
              <p className="font-body text-[15px] text-forest/80 leading-relaxed">{getBio(member)}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TeamSection({ title, subtitle, members, onOpen }: { title: string; subtitle: string; members: Member[]; onOpen: (m: Member) => void }) {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-gold" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-gold">{subtitle}</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-display-md text-forest font-bold">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {members.map((m, i) => (
            <MemberCard key={m.name} member={m} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

const FALLBACKS: Record<string, string> = {
  "aishwarya-sahu": aishwaryaSahu,
  "dr-r-nagarathna": drRNagarathna,
  "dr-amit-singh": drAmitSingh,
  "amshuman-r-yadav": amshumanYadav,
  "ankita-mishra": ankitaMishra,
  "apar-saoji": aparSaoji,
  "krupa-a": krupaA,
  "arundati-goley": arundatiGoley,
  "nagachaitanya": nagachaitanya,
  "kritika-gupta": kritikaGupta,
  "moulya-appanna": moulyaAppanna,
  "medhini-shirsat": medhiniShirsat,
  "naveen-shankar": naveenShankar,
  "navya-shenoy": navyaShenoy,
  "nibedita": nibedita,
  "padmini-tekur": padminiTekur,
  "pallavi-v": pallaviV,
  "praveen-kumar-t-r": praveenKumarTR,
  "promila-choudhary": promilaChoudhary,
  "prashanth-v-mangalvedhe": prashanthVMangalvedhe,
  "ranjini-murthy": ranjiniMurthy,
  "sharad-shivajirao-chaudhari": sharadChaudhari,
  "shishira-r": shishiraR,
  "shrirama-dongre": shriramaDongre,
  "sushmita-c-t": sushmitaCT,
  "vaishali-mathapati": vaishaliMathapati,
  "vadde-venkata-karthik": vaddeVenkataKarthik,
  "vishwas-papanna": vishwasPapanna,
  "bidyalaxmi-soraisham": bidyalaxmiSoraisham,
  "jalandhar-bhatta": jalandharBhatta,
  "kamkhaya-narayan": kamkhayaNarayan,
  "mithali-sarkar": mithaliSarkar,
  "prameshwar-some": prameshwarSome,
  "shankar-d": shankarD,
  "sidda-nagaraju": siddaNagaraju,
  "sindhuja-anand": sindhujaAnand,
  "subarna-surajita-mohanty": subarnaMohanty,
  "suresh-babu": sureshBabu,
  "surjit-kar": surjitKar,
  "tankeshwar-meher": tankeshwarMeher,
  "vikash-kumar": vikashKumar,
  "yogendra-kumar": yogendraKumar,
  "abhishek": abhishek,
  "kiriti-bhusan-ghosh": kiritiBhusanGhosh,
  "anuj-kumar": anujKumar,
  "chandrika": chandrika,
  "hanumanti": hanumanti,
  "mahalinga": mahalinga,
  "pavitra": pavitra,
  "prabhavati-kumari": prabhavatiKumari,
  "pranav-roy": pranavRoy,
  "radha-c-t": radhaCT,
  "ramesh": ramesh,
  "ramya": ramya,
  "ravi-ranjan-kumar": raviRanjanKumar,
  "rinki-kumari": rinkiKumari,
  "shanbhu-kumar": shanbhuKumar,
  "umesh-kumar": umeshKumar,
  "anjali-pacherwal": anjaliPacherwal,
  "guddu-kumar": gudduKumar,
  "hari-n-g": hariNG,
  "kiran-kumari": kiranKumari,
  "manjappa": manjappa,
  "ranjini": ranjini,
  "saraswati-kumari": saraswatiKumari,
  "shivani": shivani,
  "swati": swati,
  "vikash-kumar-yadav": vikashKumarYadav,
  "vishal-kumar": vishalKumar,
  "aditya-kumar": adityaKumar,
  "jyothirmai": jyothirmai,
  "ranjit-kumar": ranjitKumar,
  "rita-kumari": ritaKumari,
};

export default function OurTeam() {
  const [selected, setSelected] = useState<Member | null>(null);

  // Photos are served from static local assets (FALLBACKS). No remote fetch.
  const enrich = (list: Member[], withTitle = false): Member[] =>
    list.map((m) => {
      const slug = slugify(m.name);
      const displayName = withTitle && !/^dr\.?\s/i.test(m.name) ? `Dr. ${m.name}` : m.name;
      return { ...m, name: displayName, image: FALLBACKS[slug] ?? m.image };
    });

  const allDoctors = enrich(doctorsBase, true);
  const leaders = allDoctors.filter((m) => m.ledBy);
  const otherDoctors = allDoctors.filter((m) => !m.ledBy);

  return (
    <Layout>
      <PageHero />
      {leaders.length > 0 && (
        <TeamSection title="Our Guiding Physicians" subtitle="Clinical Leadership" members={leaders} onOpen={setSelected} />
      )}
      <TeamSection title="Doctors & Consultants" subtitle="Our Consultants" members={otherDoctors} onOpen={setSelected} />
      <div className="bg-forest/5 h-px max-w-7xl mx-auto" />
      <TeamSection title="Yoga Therapists" subtitle="Practice & Therapy" members={enrich(yogaBase)} onOpen={setSelected} />
      <div className="bg-forest/5 h-px max-w-7xl mx-auto" />
      <TeamSection title="Ayurveda Therapists" subtitle="Panchakarma & Therapy" members={enrich(ayurvedaBase)} onOpen={setSelected} />
      <div className="bg-forest/5 h-px max-w-7xl mx-auto" />
      <TeamSection title="Naturopathy Therapists" subtitle="Naturopathy & Therapy" members={enrich(naturopathyBase)} onOpen={setSelected} />
      <div className="bg-forest/5 h-px max-w-7xl mx-auto" />
      <TeamSection title="Physiotherapists" subtitle="Physiotherapy & Rehabilitation" members={enrich(physioBase)} onOpen={setSelected} />
      <BioModal member={selected} onClose={() => setSelected(null)} />
    </Layout>
  );
}