"use client";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { doctors as doctorsBase, slugify, type Member } from "@/lib/doctors";

import amshumanYadav from "@/assets/team/amshuman-r-yadav.jpg";
import ankitaMishra from "@/assets/team/ankita-mishra.jpg";
import arundatiGoley from "@/assets/team/arundati-goley.jpg";
import medhiniShirsat from "@/assets/team/medhini-shirsat.jpg";
import moulyaAppanna from "@/assets/team/moulya-appanna.jpg";
import nagachaitanya from "@/assets/team/nagachaitanya.jpg";
import naveenShankar from "@/assets/team/naveen-shankar.jpg";
import navyaShenoy from "@/assets/team/navya-shenoy.jpg";
import nibedita from "@/assets/team/nibedita.jpg";
import padminiTekur from "@/assets/team/padmini-tekur.jpg";
import pallaviV from "@/assets/team/pallavi-v.jpg";
import promilaChoudhary from "@/assets/team/promila-choudhary.jpg";
import ranjiniMurthy from "@/assets/team/ranjini-murthy.jpg";
import sharadChaudhari from "@/assets/team/sharad-shivajirao-chaudhari.jpg";
import shishiraR from "@/assets/team/shishira-r.png";
import shriramaDongre from "@/assets/team/shrirama-dongre.jpg";
import sushmitaCT from "@/assets/team/sushmita-c-t.png";
import vaddeVenkataKarthik from "@/assets/team/vadde-venkata-karthik.png";
import vaishaliMathapati from "@/assets/team/vaishali-mathapati.jpg";
import vishwasPapanna from "@/assets/team/vishwas-papanna.jpg";

const FALLBACKS: Record<string, string> = {
  "amshuman-r-yadav": amshumanYadav,
  "ankita-mishra": ankitaMishra,
  "arundati-goley": arundatiGoley,
  "medhini-shirsat": medhiniShirsat,
  "moulya-appanna": moulyaAppanna,
  "nagachaitanya": nagachaitanya,
  "naveen-shankar": naveenShankar,
  "navya-shenoy": navyaShenoy,
  "nibedita": nibedita,
  "padmini-tekur": padminiTekur,
  "pallavi-v": pallaviV,
  "promila-choudhary": promilaChoudhary,
  "ranjini-murthy": ranjiniMurthy,
  "sharad-shivajirao-chaudhari": sharadChaudhari,
  "shishira-r": shishiraR,
  "shrirama-dongre": shriramaDongre,
  "sushmita-c-t": sushmitaCT,
  "vadde-venkata-karthik": vaddeVenkataKarthik,
  "vaishali-mathapati": vaishaliMathapati,
  "vishwas-papanna": vishwasPapanna,
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

const NAME_ALIASES: Record<string, string> = {
  "Sharad Chaudhary": "Sharad Shivajirao Chaudhari",
  "Navya": "Navya Shenoy",
  "Sushmitha": "Sushmita C T",
  "Vaishali Matapathi": "Vaishali Mathapati",
  "Arundhati": "Arundati Goley",
  "Naveen Sankar": "Naveen Shankar",
  "Sriram Dongre": "Shrirama Dongre",
  "Medini Shirsat": "Medhini Shirsat",
  "Pallavi": "Pallavi V",
};

// deptKey (from DepartmentPageTemplate ALL_DEPTS) -> doctor display names
export const DEPT_DOCTORS_BY_KEY: Record<string, string[]> = {
  neurology: ["Sharad Chaudhary", "Navya", "Sushmitha"],
  oncology: ["Sharad Chaudhary", "Navya", "Sushmitha"],
  pulmonology: ["Titty George", "Moodal Giri Shankara", "Prajwal Rao"],
  cardiology: ["Titty George", "Moodal Giri Shankara", "Prajwal Rao"],
  psychiatry: ["Promila Choudhary", "Vaishali Matapathi", "Vadde Venkata Karthik"],
  rheumatology: ["Arundhati", "Naveen Sankar", "Nagachaitanya"],
  spinal: ["Padmini Tekur", "Sriram Dongre", "Moulya Appanna", "Vishwas Papanna"],
  diabetes: ["Ankita Mishra", "Amshuman R Yadav"],
  gastroenterology: ["Ranjini Murthy", "Medini Shirsat", "Pallavi"],
  endocrinology: ["Nibedita", "Shishira R"],
  "positive-health": ["Nibedita", "Shishira R"],
};

interface ResolvedDoctor {
  displayName: string;
  designation?: string;
  qualifications?: string;
  image?: string;
}

function resolve(name: string, photoMap: Record<string, string>): ResolvedDoctor {
  const canonical = NAME_ALIASES[name] ?? name;
  const match = doctorsBase.find((d) => d.name.toLowerCase() === canonical.toLowerCase());
  const displayName = `Dr. ${name}`;
  if (!match) return { displayName };
  const slug = slugify(match.name);
  return {
    displayName,
    designation: getDesignation(match),
    qualifications: match.qualifications,
    image: photoMap[slug] ?? FALLBACKS[slug],
  };
}

function DoctorCard({ doc, index }: { doc: ResolvedDoctor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className="bg-white border border-border rounded-2xl p-5 text-center shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
    >
      <div className="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden bg-forest/5 border-2 border-gold/30 flex items-center justify-center">
        {doc.image ? (
          <img
            src={doc.image}
            alt={doc.displayName}
            className="w-full h-full object-cover scale-[1.35] origin-top"
            style={{ objectPosition: "center top" }}
          />
        ) : (
          <User className="w-10 h-10 text-forest/30" strokeWidth={1.25} />
        )}
      </div>
      <h4 className="font-display font-semibold text-forest text-base leading-tight">{doc.displayName}</h4>
      {doc.qualifications && (
        <p className="font-body text-xs text-forest/60 mt-1">{doc.qualifications}</p>
      )}
      {doc.designation && (
        <p className="font-body text-[11px] text-gold font-semibold uppercase tracking-wider mt-2">{doc.designation}</p>
      )}
    </motion.div>
  );
}

function usePhotoMap(): Record<string, string> {
  // Photos are served from static local assets (FALLBACKS). No remote fetch.
  return {};
}

/** Grid of consulting doctors for a specific department. Returns null if no doctors are mapped for the key. */
export function DepartmentDoctorsGrid({ deptKey }: { deptKey: string }) {
  const photoMap = usePhotoMap();
  const names = DEPT_DOCTORS_BY_KEY[deptKey];
  if (!names || names.length === 0) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {names.map((n, i) => (
        <DoctorCard key={n} doc={resolve(n, photoMap)} index={i} />
      ))}
    </div>
  );
}

export function hasDeptDoctors(deptKey: string) {
  return !!DEPT_DOCTORS_BY_KEY[deptKey]?.length;
}