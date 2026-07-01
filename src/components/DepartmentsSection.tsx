"use client";
import { motion } from "framer-motion";
import { Link } from "@/lib/router-compat";
import {
  Brain,
  Ribbon,
  Heart,
  Wind,
  Smile,
  Bone,
  SparklesIcon,
  BarChart3,
  Utensils,
  Activity,
  Sun,
} from "lucide-react";

const departments = [
  {
    icon: Brain,
    name: "Neurology",
    href: "/departments/neurology",
    desc: "Neurological disorders, stroke rehabilitation, epilepsy",
  },
  {
    icon: Ribbon,
    name: "Oncology",
    href: "/departments/oncology",
    desc: "Integrative cancer care, chemotherapy support, palliative wellness",
  },
  {
    icon: Heart,
    name: "Cardiology",
    href: "/departments/cardiology",
    desc: "Hypertension, cardiac rehabilitation, heart disease management",
  },
  {
    icon: Wind,
    name: "Pulmonology",
    href: "/departments/pulmonology",
    desc: "Asthma, COPD, respiratory wellness through Pranayama & yoga",
  },
  {
    icon: Smile,
    name: "Psychiatry",
    href: "/departments/psychiatry",
    desc: "Anxiety, depression, stress disorders, PTSD, mental wellness",
  },
  {
    icon: Bone,
    name: "Rheumatology",
    href: "/departments/rheumatology",
    desc: "Arthritis, autoimmune conditions, joint inflammation management",
  },
  {
    icon: Activity,
    name: "Spinal Disorders",
    href: "/departments/spinal",
    desc: "Back pain, disc herniation, spondylosis, postural disorders",
  },
  {
    icon: BarChart3,
    name: "Diabetes & Metabolic",
    href: "/departments/diabetes",
    desc: "Type 2 diabetes, thyroid disorders, metabolic syndrome",
  },
  {
    icon: Utensils,
    name: "Gastroenterology",
    href: "/departments/gastroenterology",
    desc: "IBS, liver conditions, digestive disorders, gut health",
  },
  {
    icon: SparklesIcon,
    name: "Endocrinology",
    href: "/departments/endocrinology",
    desc: "Hormonal imbalances, PCOS, adrenal & thyroid conditions",
  },
  {
    icon: Sun,
    name: "Positive Health",
    href: "/departments/positive-health",
    desc: "Preventive care, wellness programmes, longevity & vitality",
  },
];

export default function DepartmentsSection() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Clinical Departments</span>
          <h2 className="font-display text-display-md text-forest mt-4">
            Comprehensive Care Across{" "}
            <em className="not-italic text-gold">11 Specialisations</em>
          </h2>
          <p className="font-body text-forest/60 mt-4 max-w-xl mx-auto text-base">
            Each department integrates the best of conventional medicine with time-tested traditional healing modalities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="dept-card"
            >
              <div className="p-6">
                <h3 className="font-display font-semibold text-forest text-base mb-1.5">{dept.name}</h3>
                <p className="font-body text-forest/55 text-xs leading-relaxed">{dept.desc}</p>
              </div>
              {/* Hover overlay */}
              <div className="dept-overlay">
                <Link
                  to={dept.href}
                  className="w-full text-center bg-gold text-forest-dark font-body font-semibold text-sm py-2.5 rounded-lg hover:bg-gold-light transition-colors"
                >
                  Explore Department →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 font-body font-semibold text-forest hover:text-gold transition-colors"
          >
            View All Departments →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}