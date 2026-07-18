export interface Member {
  name: string;
  qualifications: string;
  image?: string;
  designation?: string;
  bio?: string;
  ledBy?: boolean;
}

export const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const doctors: Member[] = [
  { name: "Dr. R. Nagarathna", qualifications: "MBBS, MD, FRCP (London, UK)", designation: "Medical Director", ledBy: true },
  { name: "Dr. Amit Singh", qualifications: "BAMS, MD, PhD", designation: "Medical Superintendent", ledBy: true },
  { name: "Padmini Tekur", qualifications: "MBBS, PhD" },
  { name: "Apar Saoji", qualifications: "BNYS, PhD" },
  { name: "Promila Choudhary", qualifications: "BAMS, MD", bio: "Dr. Promila Choudhary, BAMS, MD (Yoga and Rehabilitation), is an accomplished clinician and academician with extensive experience in integrative mental health care. As In-charge of the Department of Psychiatry, she has worked with a wide spectrum of psychiatric conditions including schizophrenia, mood disorders, anxiety disorders, and substance use disorders. Her clinical approach combines psychiatric understanding with evidence-based yogic interventions to support emotional balance, stress management, behavioral regulation, and overall psychological well-being. Her work in yoga-based mental health care includes yogic counselling and yogic psychotherapy, integrating traditional yogic principles, self-awareness practices, relaxation techniques, and mind–body approaches to address psychological distress, interpersonal conflicts, family and couple issues, and lifestyle-related mental health concerns. With over a decade of clinical, teaching, and research experience, she is dedicated to promoting a holistic and compassionate model of care that integrates conventional psychiatry with the healing potential of yoga for comprehensive wellness." },
  { name: "Prashanth V Mangalvedhe", qualifications: "BPT, MPT, MIAP", bio: "Masters in Physiotherapy with Community Physiotherapy specialization and 26 years of academic, clinical, and research experience. Currently serves as Associate Professor and Principal of the School of Physiotherapy at S-VYASA Deemed to be University." },
  { name: "Shrirama Dongre", qualifications: "BAMS, YIC" },
  { name: "Sharad Shivajirao Chaudhari", qualifications: "BNYS, PGDEMS, MD, PhD Scholar", bio: "As a young Naturopathic and Yoga Physician, Dr. Sharad Chaudhari seeks to treat each patient holistically by using the right treatment methods. Dr. Sharad is dedicated to encouraging healthy living and educating people about holistic health. His areas of specialisation include management of lifestyle disorders, pain management using Yoga and naturopathy intervention." },
  { name: "Arundati Goley", qualifications: "BNYS, MD", bio: "Assistant Professor, School of Yoga and Naturopathic Medicine, S-VYASA Yoga University, Bengaluru. Dr. Arundhati Goley is an academic, clinician, and researcher in the field of Yoga and Naturopathy with over five years of experience in teaching and integrative healthcare. She specializes in Yoga Medicine and the management of lifestyle disorders through evidence-based practices. As the physician-in-charge of the Rheumatology department at Arogyadhama, she integrates traditional wisdom with modern approaches for chronic conditions. Her research interests include yoga psychophysiology, stress modulation, and women's health, with ongoing and published work in reputed journals. She is a principal investigator for a funded clinical trial on yoga for childhood myopia and has participated in international faculty exchange programs. Dr. Goley is actively involved in curriculum development, postgraduate mentoring, and public health outreach, making her a strong advocate for holistic health through the AYUSH systems." },
  { name: "Ankita Mishra", qualifications: "BNYS, MD", bio: "Experienced medical professional specializing in metabolic disorders, cardiology, and pulmonology with expertise in Yoga and Naturopathy. Skilled in personalized diet planning, acupuncture, counseling, and holistic patient care. Dedicated to promoting preventive healthcare and lifestyle management through evidence-based natural therapies and integrative treatment approaches." },
  { name: "Nibedita", qualifications: "BNYS, MSc Yoga", bio: "Dr. K.S. Nibedita has working experience in the field of yoga and naturopathy for the past 7 years. She has treated patients with lifestyle disorders and is highly passionate about educating her patients on lifestyle modifications for healthy living. She strongly believes it is the need of the hour for prevention and management of psychosomatic diseases through yoga therapy and naturopathy. She has completed her BNYS and MSc (Yoga) from SVYASA University. She is currently working in SVYASA, Arogyadhama as a Senior Medical Officer." },
  { name: "Sushmita C T", qualifications: "BNYS, MD", bio: "Naturopathy and Yoga physician specializing in integrative, evidence-based approaches to chronic disease management, lifestyle disorders, and holistic patient care. Currently serves as a Consultant under the Departments of Oncology and Neurology at Arogyadhama Holistic Research Center, SVYASA. Clinical work focuses on integrating traditional Naturopathic principles and yogic therapies with contemporary medical care to support patients undergoing cancer treatment and neurological rehabilitation. Actively involved in clinical research, including randomized controlled trials, and contributes to the development of structured therapeutic protocols. In addition to patient care, conducts webinars, consultations, and academic sessions aimed at promoting preventive healthcare, mind-body medicine, and sustainable lifestyle interventions for long-term well-being." },
  { name: "Moulya Appanna", qualifications: "BNYS, MD", bio: "A dedicated naturopath passionate about holistic health and wellness, she completed her BNYS from Government Nature Cure and Yoga Medical College and Hospital and MD in Clinical Yoga from SDM College of Naturopathy and Yogic Sciences. She specializes in natural and holistic therapies aimed at promoting overall health and wellbeing. Her key areas of interest include stress management, pain management, women's health, and lifestyle disorders. She has counselled over 1000 patients, focusing on nutrition, lifestyle modifications, yoga therapy, energy medicine, and other complementary healing approaches. With a compassionate and patient-centered approach, she believes in addressing the root cause of illness and empowering individuals to achieve physical, mental, and emotional balance through sustainable natural healing practices." },
  { name: "Ranjini Murthy", qualifications: "BNYS, MD", bio: "Dr. Ranjini Murthy P serves as an Assistant Professor in the School of Yoga and Naturopathic Medicine and works as a Consultant in the Department of Gastroenterology, with 1.6 years of clinical experience. She has completed her Bachelor of Naturopathy and Yogic Sciences (BNYS) and holds an MD in Clinical Naturopathy. Her expertise lies in Integrative Medicine, where she combines conventional gastroenterology care with evidence-based naturopathy and lifestyle interventions. Her work emphasizes patient-centred, preventive, and sustainable healthcare across both academic and clinical settings." },
  { name: "Amshuman R Yadav", qualifications: "BNYS, MD" },
  { name: "Vaishali Mathapati", qualifications: "BNYS, MD", bio: "Naturopathy physician and educator with a strong commitment to integrative and lifestyle-based healthcare. Completed her BNYS and MD in Clinical Naturopathy from Sri Dharmasthala Manjunatheshwara College of Naturopathy and Yogic Sciences, securing first rank at Rajiv Gandhi University of Health Sciences in her postgraduate studies and maintaining consistent academic excellence during her undergraduate training. Currently works as an Assistant Professor at SVYASA and serves as the physician in charge of the Psychiatry Section at Arogyadhama. In her clinical practice, she works closely with individuals dealing with mental health concerns, stress-related and psychosomatic conditions, metabolic disorders, and lifestyle diseases. Her approach blends naturopathy, yoga therapy, hydrotherapy, chromotherapy, and magnetotherapy with evidence-based care. Alongside patient care, she actively engages in teaching, research, and collaborative clinical work, driven by a genuine interest in holistic healing and preventive health." },
  { name: "Navya Shenoy", qualifications: "BNYS, MD", bio: "Yoga Naturopathy physician specializing in yoga therapy, lifestyle disorders, and mental health. Currently serves as a Consultant in the Departments of Neurology and Oncology at Arogyadhama Holistic Research Center, SVYASA. Work focuses on combining evidence-based medicine with traditional yogic and naturopathic approaches. Actively involved in clinical research, including randomized controlled trials, and conducts webinars, consultations, and educational programs to promote preventive and therapeutic lifestyle interventions." },
  { name: "Shishira R", qualifications: "BNYS, MD", bio: "BNYS graduate and MD in Clinical Naturopathy from SDM College, affiliated with Rajiv Gandhi University of Health Sciences. Experienced in integrative clinical practice with exposure to metabolic care, patient assessment, diagnosis, and individualized treatment planning. Completed multidisciplinary rotatory postings across naturopathy and allopathic settings. Currently Assistant Professor in Clinical Naturopathy with prior teaching experience in hydrotherapy, community medicine, and philosophy of nature cure. Conducted RCT research on naturopathy-yoga interventions for metabolic syndrome with publications and conference presentations. Certified in clinical research writing, actively involved in community health education, yoga camps, and COVID-19 telemedicine support." },
  { name: "Naveen Shankar", qualifications: "BNYS, MD", bio: "Yoga and nature cure lifestyle consultant specializes in Traditional Chinese Acupuncture and has clinical expertise in Ozone Therapy, with particular proficiency in pain management through acupuncture. With over two years of clinical experience, actively involved in managing lifestyle-related and chronic disorders using integrative and evidence-based approaches by clinical research, especially in the area of non-communicable diseases (NCDs) and lifestyle-associated metabolic conditions. Have contributed to multiple academic publications and actively engages in research initiatives aimed at bridging traditional healing sciences with modern clinical frameworks. Possesses strong knowledge in functional medicine concepts, lifestyle modification strategies, and the understanding of behavioral and metabolic influences on long-term health outcomes. Firmly believes in preserving the depth of traditional healing theories while integrating them with scientific validation to ensure effective and sustainable patient care in precision manner." },
  { name: "Nagachaitanya", qualifications: "BNYS, MD", bio: "Passionate practitioner of Naturopathy and Yogic Sciences dedicated to holistic healing through natural therapies and lifestyle-based healthcare. Believes in the body's innate ability to heal when supported with the right care, nutrition, and balanced living. Experienced in hydrotherapy, mud therapy, massage therapy, yoga therapy, acupuncture, and diet therapy, with a patient-centered approach focused on addressing the root cause of illness rather than only managing symptoms. Committed to promoting physical, mental, and emotional well-being through safe, natural, and evidence-based healing practices while continuously enhancing clinical knowledge and skills." },
  { name: "Medhini Shirsat", qualifications: "BNYS, MD", bio: "Doctor specialized in Dietetics and Nutrition, with a strong interest in clinical nutrition and lifestyle medicine, with emphasis on Endocrinology and Gastroenterology. Having completed her MD, she is passionate about combining scientific knowledge with practical and sustainable approaches to health and wellness. She enjoys learning, researching, and sharing knowledge through teaching, public speaking, and meaningful interactions with people. Beyond academics and medicine, she loves hosting and emceeing events, where she focuses on creating a lively, warm, and engaging environment. She values empathy, communication, and genuine human connection just as much as professionalism, believing healthcare is not only about treating illness but also about improving overall quality of life. Ambitious and growth-oriented, she strives to make a positive impact through both her medical career and the relationships she builds along the way." },
  { name: "Vadde Venkata Karthik", qualifications: "BNYS, MD", bio: "Dr. Vadde Venkata Karthik, BNYS, MD (Clinical Yoga), is an Integrative Health Physician and Clinical Yoga Expert dedicated to holistic and evidence-based healthcare. He specializes in Yoga Therapy, Naturopathy, lifestyle medicine, and integrative approaches for managing stress, metabolic disorders, cardiovascular conditions, sleep disorders, and overall wellness. His approach combines therapeutic yoga, naturopathic treatments, lifestyle modification, and personalized diet planning to support natural healing and long-term health. Through patient care, research, and education, his mission is to make holistic healthcare scientific, accessible, and patient-centered while helping individuals achieve better physical, mental, and emotional well-being." },
  { name: "Aishwarya Sahu", qualifications: "BNYS, MD" },
  { name: "Praveen Kumar T R", qualifications: "BPT, MPT", bio: "Physiotherapist and Musculoskeletal Specialist bridging clinical expertise and academic excellence. With specialized training in Musculoskeletal Science, two years of dedicated clinical practice, and a year of academic experience, he is committed to delivering evidence-based patient care and shaping the future of physiotherapy education." },
  { name: "Kritika Gupta", qualifications: "BAMS", bio: "Dr. Kritika Gupta (BAMS) is a dedicated Ayurvedic physician passionate about holistic healing and patient-centered care. With knowledge of classical Ayurvedic principles and practical clinical exposure, she focuses on promoting wellness through natural therapies, lifestyle modification, and preventive healthcare. She has experience assisting in Ayurvedic treatments and Panchakarma therapies while ensuring compassionate and comfortable care for patients. Her area of interest lies particularly in Panchakarma therapies and holistic wellness management. Alongside her clinical approach, she believes in creating awareness about Ayurveda as a sustainable and effective way of living. Committed to continuous learning and professional growth, she strives to combine traditional Ayurvedic wisdom with modern healthcare understanding to improve patients' overall quality of life." },
  { name: "Krupa A", qualifications: "BNYS", bio: "BNYS graduate from S-VYASA Deemed to be University with training in integrative health sciences, combining naturopathy, yoga therapy, psychology, and expressive arts. Experienced in holistic patient care through clinical practice at S-VYASA Arogyadhama and multidisciplinary exposure at leading healthcare institutions including NIMHANS and Narayana Health. Passionate about integrative wellness, community health education, and creative therapeutic approaches, with experience in research, counseling, yoga outreach, and expressive arts therapy. Known for compassionate communication and a patient-centered approach to holistic healing." },
  { name: "Vishwas Papanna", qualifications: "BNYS, MD (Acu)", bio: "Dr. Vishwas Papanna specialises in yoga and naturopathy. He pursued his UG degree in Bachelor of Naturopathy and Yogic Sciences from SSYNM, S-VYASA Deemed to be University, and also completed his Integrative Medicine course from NIMHANS. He has expertise in lifestyle correction, holistic health, and acupuncture, and currently works as a Residential Medical Officer at Arogyadhama Holistic Health Research Center, S-VYASA. His approach leans more toward prevention than cure through lifestyle modifications such as diet, yoga, and meditation." },
  { name: "Titty George", qualifications: "BNYS, MBA" },
  { name: "Moodal Giri Shankara", qualifications: "BNYS, MD" },
  { name: "Prajwal Rao", qualifications: "BNYS, MD" },
  { name: "Pallavi V", qualifications: "BNYS, MD" },
];

export const yogaTherapists: Member[] = [
  { name: "Jalandhar Bhatta", qualifications: "MSc Yoga" },
  { name: "Prameshwar Some", qualifications: "PGDYT, MSc, PhD (Scholar)" },
  { name: "Kiriti Bhusan Ghosh", qualifications: "PGDYT, MSc, PhD (Scholar)" },
  { name: "Surjit Kar", qualifications: "BSc, MSc" },
  { name: "Sidda Nagaraju", qualifications: "MSc, PhD (Scholar)" },
  { name: "Shankar D", qualifications: "MA, PGDYT, MSc Yoga" },
  { name: "Tankeshwar Meher", qualifications: "BSc, MSc" },
  { name: "Suresh Babu", qualifications: "MSc Yoga" },
  { name: "Subarna Surajita Mohanty", qualifications: "MSc Yoga" },
  { name: "Kamkhaya Narayan", qualifications: "MSc Yoga" },
  { name: "Vikash Kumar", qualifications: "BSc, MSc" },
  { name: "Yogendra Kumar", qualifications: "BSc Yoga" },
  { name: "Abhishek", qualifications: "BSc, MSc" },
  { name: "Bidyalaxmi Soraisham", qualifications: "MSc Yoga" },
  { name: "Sindhuja Anand", qualifications: "MSc Yoga" },
  { name: "Mithali Sarkar", qualifications: "MSc Yoga" },
];

export const ayurvedaTherapists: Member[] = [
  { name: "Anuj Kumar", qualifications: "Ayurveda Therapist" },
  { name: "Chandrika", qualifications: "Ayurveda Therapist" },
  { name: "Hanumanti", qualifications: "Ayurveda Therapist" },
  { name: "Mahalinga", qualifications: "Ayurveda Therapist" },
  { name: "Pavitra", qualifications: "Ayurveda Therapist" },
  { name: "Prabhavati Kumari", qualifications: "Ayurveda Therapist" },
  { name: "Pranav Roy", qualifications: "Ayurveda Therapist" },
  { name: "Radha C T", qualifications: "Ayurveda Therapist" },
  { name: "Ramesh", qualifications: "Ayurveda Therapist" },
  { name: "Ramya", qualifications: "Ayurveda Therapist" },
  { name: "Ravi Ranjan Kumar", qualifications: "Ayurveda Therapist" },
  { name: "Rinki Kumari", qualifications: "Ayurveda Therapist" },
  { name: "Shanbhu Kumar", qualifications: "Ayurveda Therapist" },
  { name: "Umesh Kumar", qualifications: "Ayurveda Therapist" },
];

export const naturopathyTherapists: Member[] = [
  { name: "Manjappa", qualifications: "Naturopathy Therapist & Surabhi Block Manager" },
  { name: "Anjali Pacherwal", qualifications: "Naturopathy Therapist" },
  { name: "Guddu Kumar", qualifications: "Naturopathy Therapist" },
  { name: "Hari N G", qualifications: "Naturopathy Therapist" },
  { name: "Kiran Kumari", qualifications: "Naturopathy Therapist" },
  { name: "Ranjini", qualifications: "Naturopathy Therapist" },
  { name: "Saraswati Kumari", qualifications: "Naturopathy Therapist" },
  { name: "Shivani", qualifications: "Naturopathy Therapist" },
  { name: "Swati", qualifications: "Naturopathy Therapist" },
  { name: "Vikash Kumar Yadav", qualifications: "Naturopathy Therapist" },
  { name: "Vishal Kumar", qualifications: "Naturopathy Therapist" },
];

export const physiotherapists: Member[] = [
  { name: "Aditya Kumar", qualifications: "Physiotherapist" },
  { name: "Jyothirmai", qualifications: "Physiotherapist" },
  { name: "Ranjit Kumar", qualifications: "Physiotherapist" },
  { name: "Rita Kumari", qualifications: "Physiotherapist" },
];

