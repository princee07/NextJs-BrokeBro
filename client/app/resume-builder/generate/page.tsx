'use client';
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CheckCircle, Upload, Download, AlertCircle } from 'lucide-react';

const templates = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' },
  { id: 'creative', name: 'Creative' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'professional', name: 'Professional' },
];

const initialResume = {
  name: 'Your Name',
  title: 'Your Title',
  summary: 'Short professional summary goes here.',
  education: [
    { year: '2020 - 2024', degree: 'B.Tech', school: 'Your University' },
  ],
  experience: [
    { year: '2023', role: 'Intern', company: 'Company Name', desc: 'Describe your work...' },
  ],
  contact: {
    phone: '123-456-7890',
    email: 'your@email.com',
  },
  skills: ['Skill 1', 'Skill 2'],
  image: '', // profile image as data URL
};

const fontFamilies = [
  { label: 'Sans Serif', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
  { label: 'Monospace', value: 'monospace' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Roboto', value: 'Roboto, Arial, sans-serif' },
  { label: 'Lato', value: 'Lato, Arial, sans-serif' },
  { label: 'Open Sans', value: 'Open Sans, Arial, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, Arial, sans-serif' },
  { label: 'Courier New', value: 'Courier New, Courier, monospace' },
];

const defaultFieldStyles = {
  fontFamily: 'sans-serif',
  fontSize: 24,
  color: '#222',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
};

export default function ResumeBuilder() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [resume, setResume] = useState(initialResume);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [font, setFont] = useState('sans-serif');
  const [color, setColor] = useState('#222');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  // For text editing
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [fieldStyles, setFieldStyles] = useState<Record<string, any>>({});
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Download PDF handler
  const handlePrint = useReactToPrint({
    // @ts-ignore
    content: () => resumeRef.current,
    documentTitle: resume.name + '_resume',
  } as any);

  // Editable field handler
  const handleField = (field: string, value: any) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleField('image', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Resume handler
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    if (!isAuthenticated) {
      setUploadError('Please log in to upload your resume');
      return;
    }

    setUploadLoading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      setUploadedResume(file);
      setUploadSuccess(true);
      setShowUploadInput(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload resume';
      setUploadError(errorMessage);
    } finally {
      setUploadLoading(false);
    }
  };

  // Clear error messages when user starts a new upload
  const handleUploadButtonClick = () => {
    setUploadError(null);
    setUploadSuccess(false);
    setShowUploadInput(true);
  };

  // Text editing handlers
  const handleStyleChange = (styleKey: string, value: any) => {
    if (!selectedField) return;
    setFieldStyles((prev) => ({
      ...prev,
      [selectedField]: {
        ...(defaultFieldStyles as any),
        ...prev[selectedField],
        [styleKey]: value,
      },
    }));
  };
  const toggleStyle = (styleKey: string, value: any) => {
    if (!selectedField) return;
    setFieldStyles((prev) => {
      const current = prev[selectedField] || (defaultFieldStyles as any);
      return {
        ...prev,
        [selectedField]: {
          ...current,
          [styleKey]: current[styleKey] === value ? (defaultFieldStyles as any)[styleKey] : value,
        },
      };
    });
  };

  // Simulate AI generation for 5 main sections
  const handleAIGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      setResume(prev => ({
        ...prev,
        contact: {
          phone: '+91 98765 43210',
          email: 'prince.student@email.com',
        },
        name: 'Prince Kumar',
        title: 'Computer Science Student',
        summary: 'Motivated computer science student with 2 years of experience in web development. Skilled in C++, HTML, CSS, React, Express.js. Achieved 90% in 12th class. Passionate about building impactful products and learning new technologies.',
        education: [
          { year: '2021 - 2025', degree: 'B.Tech in Computer Science', school: 'BS Map School, Faridabad, Haryana' },
        ],
        experience: [
          { year: '2023', role: 'Web Development Intern', company: 'Tech Solutions', desc: 'Developed and maintained web applications using React and Express.js. Collaborated with a team to deliver high-quality software.' },
        ],
        skills: ['C++', 'HTML', 'CSS', 'React', 'Express.js', 'Teamwork', 'Problem Solving'],
      }));
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#010409] flex pt-40 pb-10">
      {/* Left Sidebar */}
      <aside className="w-80 bg-[#181c23] border-r border-gray-800 p-6 flex flex-col gap-6 ml-8">
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Sections</h2>
          <ul className="text-gray-300 space-y-2">
            <li>Personal Information</li>
            <li>Professional Summary</li>
            <li>Employment History</li>
            <li>Education</li>
            <li>Skills</li>
            <li>Hobbies</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Templates</h2>
          <select
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
            value={selectedTemplate}
            onChange={e => setSelectedTemplate(e.target.value)}
          >
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Upload Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-white" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Describe yourself or paste your CV</label>
          <textarea
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 mb-2"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="e.g. I am a CS student with internship experience in web development..."
          />
        </div>
        <div>
          <button
            className="w-full bg-orange-600 text-white font-bold py-2 rounded-lg mt-4 disabled:opacity-60 cursor-pointer"
            onClick={handleAIGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Resume with AI'}
          </button>
        </div>
      </aside>

      {/* Center Resume Preview */}
      <section className="flex-1 flex justify-center items-start p-8">
        <div
          ref={resumeRef}
          className="bg-white rounded-2xl shadow-2xl p-12 w-[800px] min-h-[900px] border border-gray-200"
          style={{ fontFamily: font, color }}
        >
          {/* Header: Image, Name, Title */}
          <div className="flex items-center gap-8 mb-10 border-b border-gray-200 pb-8">
            {resume.image ? (
              <img
                src={resume.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl font-bold">IMG</div>
            )}
            <div>
              <input
                className="text-5xl font-extrabold text-black bg-transparent outline-none mb-2 cursor-pointer"
                value={resume.name}
                onChange={e => handleField('name', e.target.value)}
                style={fieldStyles['name'] || defaultFieldStyles}
                onClick={() => setSelectedField('name')}
              />
              <input
                className="text-2xl font-semibold text-gray-700 bg-transparent outline-none cursor-pointer"
                value={resume.title}
                onChange={e => handleField('title', e.target.value)}
                style={fieldStyles['title'] || defaultFieldStyles}
                onClick={() => setSelectedField('title')}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            {/* Left: Contact, Education, Skills */}
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-800 tracking-wide">Contact</h3>
              <div className="mb-6">
                <input className="block bg-transparent outline-none text-gray-700 mb-1 cursor-pointer" value={resume.contact.phone} onChange={e => handleField('contact', { ...resume.contact, phone: e.target.value })} style={fieldStyles['phone'] || defaultFieldStyles} onClick={() => setSelectedField('phone')} />
                <input className="block bg-transparent outline-none text-gray-700 cursor-pointer" value={resume.contact.email} onChange={e => handleField('contact', { ...resume.contact, email: e.target.value })} style={fieldStyles['email'] || defaultFieldStyles} onClick={() => setSelectedField('email')} />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-800 tracking-wide">Education</h3>
              <div className="mb-6">
                {resume.education.map((ed, i) => (
                  <div key={i} className="mb-3">
                    <input className="font-semibold bg-transparent outline-none text-gray-900 cursor-pointer" value={ed.year} onChange={e => {
                      const newEd = [...resume.education];
                      newEd[i].year = e.target.value;
                      handleField('education', newEd);
                    }} style={fieldStyles[`education-year-${i}`] || defaultFieldStyles} onClick={() => setSelectedField(`education-year-${i}`)} />
                    <input className="block bg-transparent outline-none text-gray-700 cursor-pointer" value={ed.degree} onChange={e => {
                      const newEd = [...resume.education];
                      newEd[i].degree = e.target.value;
                      handleField('education', newEd);
                    }} style={fieldStyles[`education-degree-${i}`] || defaultFieldStyles} onClick={() => setSelectedField(`education-degree-${i}`)} />
                    <input className="block text-sm bg-transparent outline-none text-gray-500 cursor-pointer" value={ed.school} onChange={e => {
                      const newEd = [...resume.education];
                      newEd[i].school = e.target.value;
                      handleField('education', newEd);
                    }} style={fieldStyles[`education-school-${i}`] || defaultFieldStyles} onClick={() => setSelectedField(`education-school-${i}`)} />
                  </div>
                ))}
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-800 tracking-wide">Skills</h3>
              <input className="w-full bg-transparent outline-none text-gray-700 cursor-pointer" value={resume.skills.join(', ')} onChange={e => handleField('skills', e.target.value.split(','))} style={fieldStyles['skills'] || defaultFieldStyles} onClick={() => setSelectedField('skills')} />
            </div>
            {/* Right: Profile, Experience */}
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-800 tracking-wide">Profile</h3>
              <textarea
                className="w-full bg-transparent outline-none resize-none text-gray-700 mb-8 min-h-[120px] cursor-pointer"
                value={resume.summary}
                onChange={e => handleField('summary', e.target.value)}
                style={fieldStyles['summary'] || defaultFieldStyles}
                onClick={() => setSelectedField('summary')}
              />
              <h3 className="font-bold text-lg mb-3 text-gray-800 tracking-wide">Experience</h3>
              <div className="min-h-[200px] flex flex-col justify-start">
                {resume.experience.map((ex, i) => (
                  <div key={i} className="mb-5">
                    <input className="font-semibold bg-transparent outline-none text-gray-900 cursor-pointer" value={ex.year} onChange={e => {
                      const newEx = [...resume.experience];
                      newEx[i].year = e.target.value;
                    }} style={fieldStyles[`experience-year-${i}`] || defaultFieldStyles} onClick={() => setSelectedField(`experience-year-${i}`)} />
                    <input className="block bg-transparent outline-none text-gray-700 cursor-pointer" value={ex.role} onChange={e => {
                      const newEx = [...resume.experience];
                      newEx[i].role = e.target.value;
                      handleField('experience', newEx);
                    }} style={fieldStyles[`experience-role-${i}`] || defaultFieldStyles} onClick={() => setSelectedField(`experience-role-${i}`)} />
                    <input className="block text-sm bg-transparent outline-none text-gray-500 cursor-pointer" value={ex.company} onChange={e => {
                      const newEx = [...resume.experience];
                      newEx[i].company = e.target.value;
                      handleField('experience', newEx);
                    }} style={fieldStyles[`experience-company-${i}`] || defaultFieldStyles} onClick={() => setSelectedField(`experience-company-${i}`)} />
                    <textarea className="block w-full text-xs bg-transparent outline-none text-gray-600 mt-1 min-h-[60px] cursor-pointer" value={ex.desc} onChange={e => {
                      const newEx = [...resume.experience];
                      newEx[i].desc = e.target.value;
                      handleField('experience', newEx);
                    }} style={fieldStyles[`experience-desc-${i}`] || defaultFieldStyles} onClick={() => setSelectedField(`experience-desc-${i}`)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Sidebar */}
      <aside className="w-64 bg-[#181c23] border-l border-gray-800 p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Text Editing</h2>
          <label className="block text-gray-300 mb-2">Font Family</label>
          <select
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 mb-4"
            value={selectedField && fieldStyles[selectedField]?.fontFamily || defaultFieldStyles.fontFamily}
            onChange={e => handleStyleChange('fontFamily', e.target.value)}
            disabled={!selectedField}
          >
            {fontFamilies.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <label className="block text-gray-300 mb-2">Font Size</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 mb-4"
            value={selectedField && fieldStyles[selectedField]?.fontSize || defaultFieldStyles.fontSize}
            onChange={e => handleStyleChange('fontSize', Number(e.target.value))}
            disabled={!selectedField}
            min={10}
            max={60}
          />
          <label className="block text-gray-300 mb-2">Text Color</label>
          <input
            type="color"
            className="w-12 h-8 p-0 border-0 bg-transparent mb-4"
            value={selectedField && fieldStyles[selectedField]?.color || defaultFieldStyles.color}
            onChange={e => handleStyleChange('color', e.target.value)}
            disabled={!selectedField}
          />
          <div className="flex gap-2 mb-4">
            <button type="button" className={`px-2 py-1 rounded ${selectedField && fieldStyles[selectedField]?.fontWeight === 'bold' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-200'}`} onClick={() => toggleStyle('fontWeight', 'bold')} disabled={!selectedField}>B</button>
            <button type="button" className={`px-2 py-1 rounded ${selectedField && fieldStyles[selectedField]?.fontStyle === 'italic' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-200'}`} onClick={() => toggleStyle('fontStyle', 'italic')} disabled={!selectedField}>I</button>
            <button type="button" className={`px-2 py-1 rounded ${selectedField && fieldStyles[selectedField]?.textDecoration === 'underline' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-200'}`} onClick={() => toggleStyle('textDecoration', 'underline')} disabled={!selectedField}>U</button>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">Actions</h2>

          {/* Download PDF Button */}
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            onClick={handlePrint}
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>

          {/* Upload Resume Section */}
          <div className="space-y-2">
            {!showUploadInput ? (
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                onClick={handleUploadButtonClick}
                disabled={!isAuthenticated}
              >
                <Upload className="w-5 h-5" />
                Upload Resume
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={uploadLoading}
                  className="w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                />
                <button
                  onClick={() => {
                    setShowUploadInput(false);
                    setUploadError(null);
                    setUploadSuccess(false);
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm"
                  disabled={uploadLoading}
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Upload Loading State */}
            {uploadLoading && (
              <div className="flex items-center gap-2 p-2 bg-blue-900/30 border border-blue-600 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                <span className="text-blue-300 text-sm">Uploading...</span>
              </div>
            )}

            {/* Upload Success Message */}
            {uploadSuccess && (
              <div className="flex items-center gap-2 p-2 bg-green-900/30 border border-green-600 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-300 text-sm">Resume uploaded successfully!</span>
              </div>
            )}

            {/* Upload Error Message */}
            {uploadError && (
              <div className="flex items-center gap-2 p-2 bg-red-900/30 border border-red-600 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm">{uploadError}</span>
              </div>
            )}

            {/* Uploaded File Info */}
            {uploadedResume && !uploadLoading && (
              <div className="p-2 bg-gray-800/50 border border-gray-600 rounded-lg">
                <div className="text-gray-300 text-sm">
                  <strong>Uploaded:</strong> {uploadedResume.name}
                </div>
                <div className="text-gray-400 text-xs">
                  Size: {(uploadedResume.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            )}

            {/* Authentication Warning */}
            {!isAuthenticated && (
              <div className="p-2 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                <span className="text-yellow-300 text-sm">Please log in to upload your resume</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500 mb-4"></div>
            <span className="text-lg font-bold text-gray-800">Generating your resume with AI...</span>
          </div>
        </div>
      )}
    </main>
  );
} 