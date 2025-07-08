"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Target, Award, Zap } from "lucide-react";

const team = [
	{
		name: "Prince",
		role: "Developer",
		image: "/assets/people/prince.jpg",
		bio: "Core developer and builder at BrokeBro. Passionate about code, design, and making student life easier.",
		socials: {
			linkedin: "https://www.linkedin.com/in/prince-brokebro/",
			github: "https://github.com/prince-brokebro",
			instagram: "https://instagram.com/prince.brokebro",
		},
	},
	{
		name: "Mohit Luthra",
		role: "CEO & Marketing Head",
		image: "/assets/people/mohit .jpg",
		bio: "CEO and marketing lead at BrokeBro. Driving vision, growth, and brand partnerships for the student community.",
		socials: {
			linkedin: "https://www.linkedin.com/in/mohitluthra/",
			instagram: "https://instagram.com/mohit.brokebro",
		},
	},
	{
		name: "Lavanya",
		role: "Developer",
		image: "/assets/people/Lavanya.jpeg",
		bio: "Developer at BrokeBro. Loves building cool things for students and making tech accessible.",
		socials: {
			linkedin: "https://www.linkedin.com/in/lavanya-brokebro/",
			github: "https://github.com/lavanya-brokebro",
		},
	},
	{
		name: "Prachi",
		role: "Tech Lead",
		image: "/assets/people/prachi.jpg",
		bio: "Tech Lead at BrokeBro. Leading the engineering team and building robust solutions for students.",
		socials: {
			linkedin: "https://www.linkedin.com/in/prachi-brokebro/",
			instagram: "https://instagram.com/prachi.brokebro",
		},
	},
];

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		fill="currentColor"
		viewBox="0 0 24 24"
	>
		<path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.37-1.56 2.82-1.56 3.01 0 3.57 1.98 3.57 4.56v4.77z" />
	</svg>
);
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		fill="currentColor"
		viewBox="0 0 24 24"
	>
		<path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576 4.765-1.587 8.2-6.086 8.2-11.384 0-6.63-5.373-12-12-12z" />
	</svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		fill="currentColor"
		viewBox="0 0 24 24"
	>
		<path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
	</svg>
);

export default function TeamPage() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
	};
	return (
		<main className="bg-gradient-to-b from-[#0d1117] to-[#010409] min-h-screen pt-32">
			<section className="py-20 px-4">
				<div className="max-w-6xl mx-auto text-center">
					<motion.h1
						className="text-5xl md:text-6xl font-bold text-white mb-6"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Meet Our Team
					</motion.h1>
					<motion.p
						className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						The passionate team behind BrokeBro. We are a diverse group of
						students, techies, and dreamers dedicated to helping students save and
						succeed.
					</motion.p>
				</div>
			</section>
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{team.map((member) => (
							<motion.div
								key={member.name}
								className="bg-[#161b22] p-6 rounded-xl border border-gray-800 text-center hover:border-orange-500/50 transition-all flex flex-col items-center"
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
							>
								<div className="w-24 h-24 mx-auto mb-4 relative">
									<Image
										src={member.image}
										alt={member.name}
										fill
										className="rounded-full object-cover border-4 border-orange-500/30 shadow-lg"
									/>
								</div>
								<h3 className="text-xl font-bold text-white mb-1 mt-2">
									{member.name}
								</h3>
								<p className="text-orange-400 font-semibold mb-2">
									{member.role}
								</p>
								<p className="text-gray-400 text-sm mb-4">
									{member.bio}
								</p>
								<div className="flex justify-center gap-4 mt-auto">
									{member.socials?.linkedin && (
										<a
											href={member.socials.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="LinkedIn"
											className="hover:text-orange-400 transition-colors"
										>
											<LinkedInIcon className="w-6 h-6" />
										</a>
									)}
									{member.socials?.github && (
										<a
											href={member.socials.github}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="GitHub"
											className="hover:text-orange-400 transition-colors"
										>
											<GitHubIcon className="w-6 h-6" />
										</a>
									)}
									{member.socials?.instagram && (
										<a
											href={member.socials.instagram}
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Instagram"
											className="hover:text-orange-400 transition-colors"
										>
											<InstagramIcon className="w-6 h-6" />
										</a>
									)}
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</main>
	);
}
