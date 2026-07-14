"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import Layout from "@/components/Layout";
import { ChevronRight, FlaskConical, ExternalLink, Download } from "lucide-react";

/* ── Data (from the Arogyadhama / S-VYASA research publications list) ── */
type Paper = { title: string; authors: string; journal: string; year: string; doi?: string };

const DIVISIONS: { division: string; papers: Paper[] }[] = [
  {
    division: "Yoga & Life Sciences",
    papers: [
      { title: "Changes in Electrical Activities of the Brain Associated with Cognitive Functions in Type 2 Diabetes Mellitus: A Systematic Review", authors: "Kanthi A, Singh D, Manjunath NK, Nagarathna R", journal: "Clinical EEG and Neuroscience", year: "2022", doi: "10.1177/15500594221089106" },
      { title: "Transcranial Doppler studies in Type 2 Diabetes mellitus: A systematic review", authors: "Vidyashree M, Deepeshwar S, Bathala L, et al.", journal: "Diabetes Research and Clinical Practice", year: "2022" },
      { title: "Beneficial Effect of Yoga-based Lifestyle Intervention on Anxiety and Depression in Young Adults: Non-randomized Controlled Study", authors: "Deepeshwar S, Kumar D", journal: "International Journal of Medicine and Public Health", year: "2022" },
      { title: "Development and validation of Vikrti measuring scale — A pilot study", authors: "Patil SS, Singh A, Nagarathna R, Nagendra HR", journal: "Indian Journal of Ayurveda & Integrative Medicine KLEU", year: "2021" },
      { title: "The role of trataka in ameliorating visual strain and promoting psychological well-being during prolonged use of digital displays: A randomized controlled trial", authors: "Saoji AA, Swathi PS, Raghavendra BR", journal: "Work", year: "2021" },
      { title: "Yoga based lifestyle intervention for type 2 diabetes: a prospective single blind randomized controlled study", authors: "Bista S, Jasti N, Bhargav H, et al.", journal: "Frontiers in Public Health", year: "2021" },
      { title: "Medical Application of Gas Discharge Visualization Imaging in Health and Disease: A Systematic Review of Literature", authors: "Bista S, Jasti N, Bhargav H, et al.", journal: "Alternative Therapies in Health and Medicine", year: "2021" },
      { title: "Ayurveda and Yoga Therapy for Allergy and Asthma", authors: "Tripathi S, Metri KG, Sharma P, et al.", journal: "Textbook of Allergy for the Clinician (CRC Press)", year: "2021" },
      { title: "Does Yoga Reduce the Risk of Conversion from Prediabetes to Diabetes by Improving Acute Phase Insulin Release? An Observation from an RCT", authors: "Nagarathna R, Kurian J, Vijayakumar V, et al.", journal: "Diabetes", year: "2021" },
    ],
  },
  {
    division: "Yoga & Humanities",
    papers: [
      { title: "The Problem of Ethics in Business: Does Vedanta have a solution?", authors: "Sinha A", journal: "Reimagining Faith and Management (Routledge)", year: "2021" },
    ],
  },
  {
    division: "Yoga & Spirituality",
    papers: [
      { title: "A study of Muthuswami Dikshitar's expertise on Veena reflected in his compositions: a conceptual study", authors: "Utpala K", journal: "Sangeet Galaxy", year: "2022" },
      { title: "Siddhi: Modern Science and Indian Spirituality", authors: "Soneji R, Hankey A", journal: "Vaidika Vag Jyotih", year: "2021" },
      { title: "Spiritual–Scientific Yoga based Model of Siddhi", authors: "Soneji R, Sridhar MK, Hankey A", journal: "Shodh Sanchar Bulletin", year: "2021" },
      { title: "Development of Siddhi: An analysis of Shiva Samhita", authors: "Soneji R, Hankey A, Sridhar MK", journal: "Shodh Sarita", year: "2021" },
    ],
  },
];

// Link to the exact paper on PubMed — by DOI when available (precise), else by title.
const pubmedUrl = (p: Paper) =>
  `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(p.doi || p.title)}`;

const TOTAL = DIVISIONS.reduce((n, d) => n + d.papers.length, 0);

export default function ResearchPapers() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 60%, hsl(200 40% 26%) 100%)" }}>
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--terracotta)), transparent)" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center gap-1.5 font-body text-xs text-cream/60 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/knowledge-hub" className="hover:text-gold transition-colors">Knowledge Hub</Link>
              <ChevronRight size={12} />
              <span className="text-cream/90">Research Papers</span>
            </nav>
            <h1 className="font-display text-cream font-bold" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}>
              Research Publications
            </h1>
            <p className="font-body text-cream/70 mt-4 max-w-2xl leading-relaxed">
              Peer-reviewed studies from S-VYASA University and Arogyadhama on yoga, Ayurveda, and integrative medicine. Click any paper to open it on PubMed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Papers */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-12">
        {DIVISIONS.map((group) => (
          <div key={group.division}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-0.5 rounded" style={{ background: "hsl(var(--gold))" }} />
              <h2 className="font-display font-bold text-forest text-xl">{group.division}</h2>
              <span className="font-body text-xs text-sage">{group.papers.length} paper{group.papers.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="rounded-2xl border border-border shadow-card overflow-hidden bg-white divide-y divide-border">
              {group.papers.map((p) => (
                <a
                  key={p.title}
                  href={pubmedUrl(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-6 hover:bg-cream/40 transition-colors"
                >
                  <FlaskConical size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-forest text-sm leading-snug mb-1 group-hover:text-gold transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      <span className="font-body text-xs text-gold">{p.journal}</span>
                      <span className="font-body text-xs text-sage">{p.authors}</span>
                      <span className="font-body text-xs text-sage">{p.year}</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-sage flex-shrink-0 mt-0.5 group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Footer: PDF download */}
        <div className="text-center pt-2">
          <a href="/research-publications.pdf" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-forest hover:text-gold transition-colors">
            <Download size={14} /> Download the full publications list (PDF)
          </a>
          <p className="font-body text-xs text-sage mt-2">{TOTAL} publications listed.</p>
        </div>
      </div>
    </Layout>
  );
}
