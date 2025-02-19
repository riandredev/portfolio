import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import Card from '@/components/about/card'

const experiences = [
    {
        id: 1,
        role: 'Freelancing',
        company: 'JB Decorative Concrete',
        period: 'Aug 2024 - Oct 2024',
        link: 'https://company.com'
    },
]

const education = [
    {
        id: 1,
        degree: 'Further Education and Training Certificate: Information Technology: Systems Development',
        institution: 'CTU Training Solutions',
        period: 'Jan 2024 - Dec 2024',
        link: 'https://ctutraining.ac.za'
    },
    {
        id: 2,
        degree: 'National Certificate: Information Technology',
        institution: 'CTU Training Solutions',
        period: 'Jan 2023 - Dec 2023',
        link: 'https://ctutraining.ac.za'
    },
]

const certifications = [
        {
                id: 1,
                name: 'Meta Certified Digital Marketing Associate',
                issuer: 'Meta',
                date: 'Nov 2024',
                link: 'https://www.credly.com/earner/earned/badge/2477fe4f-f774-4b34-8c77-2f08dbd4c72a'
        },
        {
                id: 2,
                name: 'IT Specialist - HTML and CSS',
                issuer: 'Certiport',
                date: 'Nov 2023',
                link: 'https://www.credly.com/badges/9d425dc8-1ef2-4d1a-a09e-94cc5c469db3'
        },
        {
                id: 3,
                name: 'Adobe Certified Professional in Visual Design',
                issuer: 'Adobe',
                date: 'Oct 2023',
                link: 'https://www.credly.com/badges/7a625f15-48ed-49e7-aeeb-1aa619daa7e0'
        },
        {
                id: 4,
                name: 'Adobe Certified Professional in Graphic Design & Illustration Using Adobe Illustrator',
                issuer: 'Adobe',
                date: 'Oct 2023',
                link: 'https://www.credly.com/badges/688e8c77-6650-4172-b373-e8edde08dd86'
        },
    {
        id: 5,
        name: 'Adobe Certified Professional in Visual Design Using Adobe Photoshop',
        issuer: 'Adobe',
        date: 'Jun 2023',
        link: 'https://www.credly.com/badges/f4d87b4a-7c8d-4015-aa57-f5e1dc4ce485'
    },
    {
        id: 6,
        name: 'Introduction to JavaScript',
        issuer: 'Sololearn',
        date: 'May 2023',
        link: 'https://www.sololearn.com/en/certificates/CC-QFKH7DYX'
    }
]

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-zinc-100 dark:bg-black pt-32 md:pt-40 pb-16">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto">
                    {/* Bio Section */}
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start mb-12 sm:mb-16">
                        <div className="shrink-0 mx-auto sm:mx-0">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
                                <Image
                                    src="/me.jpg"
                                    alt="Riandre van der Voorden"
                                    width={200}
                                    height={200}
                                    className="object-fill"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl font-light">Hello, world! 🌎</h1>
                            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                I&apos;m Riandre, a Frontend engineer with a passion for creating engaging user experiences.
                                Focused on building performant web applications using modern technologies.
                                Currently exploring the intersection of design systems and developer experience.
                            </p>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12 sm:space-y-16">
                        {/* Experience Section */}
                        <div className="space-y-6">
                            <h2 className="sm:text-2xl text-xl font-light mb-6">Experience</h2>
                            <div className="space-y-4">
                                {experiences.map((exp) => (
                                    <Card
                                        key={exp.id}
                                        title={exp.role}
                                        subtitle={exp.company}
                                        period={exp.period}
                                        link={exp.link}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="space-y-6 mt-16">
                            <h2 className="sm:text-2xl text-xl font-light mb-6">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <Card
                                        key={edu.id}
                                        title={edu.degree}
                                        subtitle={edu.institution}
                                        period={edu.period}
                                        link={edu.link}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Certifications Section */}
                        <div className="space-y-6 mt-16">
                            <h2 className="sm:text-2xl text-xl font-light mb-6">Certifications</h2>
                            <div className="space-y-4">
                                {certifications.map((cert) => (
                                    <Card
                                        key={cert.id}
                                        title={cert.name}
                                        subtitle={cert.issuer}
                                        period={cert.date}
                                        link={cert.link}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
