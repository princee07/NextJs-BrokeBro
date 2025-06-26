export type Internship = {
    id: number;
    slug: string;
    title: string;
    company: string;
    logo: string;
    tags: string[];
    views?: number;
    applied?: number;
    location?: string;
    stipend?: string;
    bgColor: string;
    pattern: string;
    updatedOn: string;
    daysLeft: number;
    eligibility: string[];
    responsibilities: string[];
    skills: string[];
    coreSkills: string[];
}
  
export const internships: Internship[] = [
    {
      id: 1,
      slug: 'mechanical-engineer-internship',
      title: 'Mechanical Engineer Internship',
      company: 'Himaakars Texofab Industries Pvt. Ltd.',
      logo: '/assets/images/broke-bro.png',
      tags: ['In Office', 'Actively Hiring'],
      applied: 13,
      stipend: '7K-10K/Month',
      location: 'Bhiwandi',
      bgColor: 'from-green-500/20 to-green-500/5',
      pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d399' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      updatedOn: 'Jun 24, 2025',
      daysLeft: 3,
      eligibility: ['Engineering Students', 'Postgraduate', 'Undergraduate', 'Fresher'],
      responsibilities: [
        'Assist in the design, development, and testing of mechanical systems and components.',
        'Support the analysis of existing mechanical systems to identify areas for improvement.',
        'Participate in the maintenance and troubleshooting of machinery and equipment.',
        'Collaborate with users on project-related tasks, including data collection and analysis.',
        'Gain experience in industrial engineering practices, including process optimization and efficiency improvements.'
      ],
      skills: [],
      coreSkills: ['Strong understanding of mechanical engineering principles.'],
    },
    {
      id: 2,
      slug: 'mern-stack-developer-intern',
      title: 'MERN Stack Developer Intern',
      company: 'AdEngage',
      logo: '/assets/images/broke-bro.png',
      tags: ['In Office'],
      views: 201,
      location: 'Thane, Navi Mumbai',
      stipend: '5K-8K/Month',
      bgColor: 'from-yellow-500/20 to-yellow-500/5',
      pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
      updatedOn: 'Jun 25, 2025',
      daysLeft: 4,
      eligibility: ['Computer Science Students', 'Web Development enthusiasts'],
      responsibilities: ['Develop and maintain web applications using the MERN stack.', 'Collaborate with the design team to implement UI/UX features.'],
      skills: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      coreSkills: ['JavaScript', 'HTML', 'CSS'],
    },
    {
      id: 3,
      slug: 'python-development-internship',
      title: 'Python Development Internship',
      company: 'AdEngage',
      logo: '/assets/images/broke-bro.png',
      tags: ['In Office'],
      views: 1652,
      location: 'Pan India',
      stipend: '10K-15K/Month',
      bgColor: 'from-blue-500/20 to-blue-500/5',
      pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      updatedOn: 'Jun 26, 2025',
      daysLeft: 5,
      eligibility: ['Data Science Students', 'Python enthusiasts'],
      responsibilities: ['Develop scripts for data automation and analysis.', 'Work with popular Python libraries like Pandas and NumPy.'],
      skills: ['Python', 'Pandas', 'NumPy', 'SQL'],
      coreSkills: ['Problem Solving', 'Data Structures'],
    },
    {
      id: 4,
      slug: 'n8n-automation-expert',
      title: 'n8n Automation Expert',
      company: 'LitLabs',
      logo: '/assets/images/broke-bro.png',
      tags: ['Online', 'Free'],
      views: 7002,
      location: 'Remote',
      stipend: 'Unpaid',
      bgColor: 'from-pink-500/20 to-pink-500/5',
      pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      updatedOn: 'Jun 27, 2025',
      daysLeft: 6,
      eligibility: ['Anyone interested in automation'],
      responsibilities: ['Create and manage complex workflows in n8n.', 'Integrate various APIs and services.'],
      skills: ['n8n', 'APIs', 'JSON', 'JavaScript'],
      coreSkills: ['Logical Thinking', 'Workflow Design'],
    },
] 