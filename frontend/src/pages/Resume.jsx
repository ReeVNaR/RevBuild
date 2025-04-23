import { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import React from 'react';

const PrintableResume = React.forwardRef(({ resumeData }, ref) => (
  <div 
    ref={ref}
    className="bg-white"
    style={{
      width: '210mm',
      minHeight: '297mm',
      padding: '15mm',
      margin: '0 auto',
      boxSizing: 'border-box',
    }}
  >
    <div className="space-y-3">
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="text-2xl font-bold mb-1">{resumeData.fullName || ' '}</h1>
        <p className="text-lg mb-1 text-gray-700">{resumeData.title || ' '}</p>
        <p className="text-base text-gray-600">{resumeData.email || ' '} | {resumeData.phone || ' '}</p>
        <div className="text-base text-gray-600 flex justify-center gap-2">
          <span>{resumeData.links.github || ' '}</span> | <span>{resumeData.links.linkedin || ' '}</span> | <span>{resumeData.links.portfolio || ' '}</span>
        </div>
      </div>

      {/* Education */}
      <div className="mb-3">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-2">EDUCATION</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-start text-sm">
              <div>
                <p className="font-semibold">{edu.school}</p>
                <p>{edu.degree}</p>
              </div>
              <div className="text-right">
                <p>{edu.location}</p>
                <p>{edu.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-3">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-2">EXPERIENCE</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-1.5">
            <div className="flex justify-between items-start">
              <div className="text-sm">
                <p className="font-semibold">{exp.role}</p>
                <p>{exp.company}</p>
                <p className="text-gray-600 mt-0.5 leading-tight">{exp.description}</p>
              </div>
              <div className="text-right text-sm">
                <p>{exp.location}</p>
                <p>{exp.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-3">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-2">SKILLS</h2>
        <div className="grid gap-1 text-sm">
          {resumeData.skills.programmingLanguages && (
            <p><span className="font-semibold">Programming:</span> {resumeData.skills.programmingLanguages}</p>
          )}
          {resumeData.skills.librariesFrameworks && (
            <p><span className="font-semibold">Libraries/Frameworks:</span> {resumeData.skills.librariesFrameworks}</p>
          )}
          {resumeData.skills.toolsPlatforms && (
            <p><span className="font-semibold">Tools:</span> {resumeData.skills.toolsPlatforms}</p>
          )}
          {resumeData.skills.databases && (
            <p><span className="font-semibold">Databases:</span> {resumeData.skills.databases}</p>
          )}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-3">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-2">PROJECTS</h2>
        <div className="grid gap-2">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="text-sm">
              <p className="font-semibold flex justify-between">
                {project.name}
                {project.link && <a href={project.link} className="text-blue-600">Link</a>}
              </p>
              <p className="text-gray-600">Tech: {project.techStack}</p>
              <p className="leading-snug">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-3">
        <h2 className="text-lg font-bold border-b border-gray-300 mb-2">CERTIFICATIONS</h2>
        {resumeData.certifications.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 text-sm">
            {resumeData.certifications.map((cert, index) => (
              <p key={index} className="mb-1">• {cert}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
));

export default function Resume() {
  const componentRef = useRef();

  const [resumeData, setResumeData] = useState({
    fullName: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8900',
    links: {
      github: 'github.com/johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      portfolio: 'johndoe.dev'
    },
    education: [
      {
        school: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        percentage: '85%',
        location: 'New York, USA',
        year: '2018-2022'
      }
    ],
    experience: [
      {
        company: 'Tech Solutions Inc.',
        role: 'Software Developer',
        duration: 'Jan 2022 - Present',
        location: 'San Francisco, CA',
        description: 'Developed and maintained full-stack web applications using React and Node.js. Implemented responsive designs and RESTful APIs.'
      }
    ],
    skills: {
      programmingLanguages: 'JavaScript, Python, Java, C++',
      librariesFrameworks: 'React, Node.js, Express, Django',
      toolsPlatforms: 'Git, Docker, AWS, Linux',
      databases: 'MongoDB, PostgreSQL, MySQL'
    },
    projects: [
      {
        name: 'E-commerce Platform',
        link: 'github.com/johndoe/ecommerce',
        techStack: 'React, Node.js, MongoDB, Express',
        description: 'Built a full-stack e-commerce platform with features like user authentication, product management, and payment integration.'
      }
    ],
    certifications: ['AWS Certified Developer', 'MongoDB Certified Developer']
  });

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resumeData.fullName || 'Resume'}_${new Date().toLocaleDateString()}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const [collapsedSections, setCollapsedSections] = useState({
    personal: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
    certifications: true
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setResumeData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setResumeData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', percentage: '', location: '', year: '' }]
    }));
  };

  const removeEducation = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', duration: '', location: '', description: '' }]
    }));
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSkillsChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value
      }
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', link: '', techStack: '', description: '' }]
    }));
  };

  const removeProject = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, '']
    }));
  };

  const removeCertification = (index) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleCertificationChange = (index, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? value : cert
      )
    }));
  };

  return (
    <div className="h-[calc(100vh-64px)] container mx-auto px-4 pt-4 overflow-hidden">
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
      <div className="flex gap-4 h-[calc(100%-3rem)]">
        {/* Left Form Section */}
        <div className="w-[30%] bg-white shadow-lg p-4 rounded-lg overflow-y-auto">
          <form className="space-y-6">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('personal')}
              >
                <h2 className="text-xl font-bold">Personal Details</h2>
                <svg 
                  className={`w-6 h-6 transform transition-transform ${collapsedSections.personal ? '-rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!collapsedSections.personal && (
                <>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full border rounded-md p-2"
                    value={resumeData.fullName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title (e.g. Software Developer)"
                    className="w-full border rounded-md p-2"
                    value={resumeData.title}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="border rounded-md p-2"
                      value={resumeData.email}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      className="border rounded-md p-2"
                      value={resumeData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="links.github"
                      placeholder="GitHub"
                      className="w-full border rounded-md p-2"
                      value={resumeData.links.github}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="links.linkedin"
                      placeholder="LinkedIn"
                      className="w-full border rounded-md p-2"
                      value={resumeData.links.linkedin}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="links.portfolio"
                      placeholder="Portfolio"
                      className="w-full border rounded-md p-2"
                      value={resumeData.links.portfolio}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div 
                  className="flex items-center cursor-pointer flex-grow"
                  onClick={() => toggleSection('education')}
                >
                  <h2 className="text-xl font-bold">Education</h2>
                  <svg 
                    className={`w-6 h-6 transform transition-transform ml-2 ${collapsedSections.education ? '-rotate-90' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {!collapsedSections.education && (
                <>
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={addEducation}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Add Education
                    </button>
                  </div>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="space-y-2 p-4 border rounded-md">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Percentage/CGPA"
                          value={edu.percentage}
                          onChange={(e) => handleEducationChange(index, 'percentage', e.target.value)}
                          className="border rounded-md p-2"
                        />
                        <input
                          type="text"
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                          className="border rounded-md p-2"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Location"
                        value={edu.location}
                        onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Experience Section */}
            <div className="space-y-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('experience')}
              >
                <h2 className="text-xl font-bold">Experience</h2>
                <svg 
                  className={`w-6 h-6 transform transition-transform ${collapsedSections.experience ? '-rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!collapsedSections.experience && (
                <>
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={addExperience}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Add Experience
                    </button>
                  </div>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="space-y-2 p-4 border rounded-md">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                      <input
                        type="text"
                        placeholder="Role/Position"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Duration"
                          value={exp.duration}
                          onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                          className="border rounded-md p-2"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                          className="border rounded-md p-2"
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        className="w-full border rounded-md p-2"
                        rows="3"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('skills')}
              >
                <h2 className="text-xl font-bold">Skills</h2>
                <svg 
                  className={`w-6 h-6 transform transition-transform ${collapsedSections.skills ? '-rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!collapsedSections.skills && (
                <>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Programming Languages"
                      value={resumeData.skills.programmingLanguages}
                      onChange={(e) => handleSkillsChange('programmingLanguages', e.target.value)}
                      className="w-full border rounded-md p-2"
                    />
                    <input
                      type="text"
                      placeholder="Libraries/Frameworks"
                      value={resumeData.skills.librariesFrameworks}
                      onChange={(e) => handleSkillsChange('librariesFrameworks', e.target.value)}
                      className="w-full border rounded-md p-2"
                    />
                    <input
                      type="text"
                      placeholder="Tools/Platforms"
                      value={resumeData.skills.toolsPlatforms}
                      onChange={(e) => handleSkillsChange('toolsPlatforms', e.target.value)}
                      className="w-full border rounded-md p-2"
                    />
                    <input
                      type="text"
                      placeholder="Databases"
                      value={resumeData.skills.databases}
                      onChange={(e) => handleSkillsChange('databases', e.target.value)}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Projects Section */}
            <div className="space-y-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('projects')}
              >
                <h2 className="text-xl font-bold">Projects</h2>
                <svg 
                  className={`w-6 h-6 transform transition-transform ${collapsedSections.projects ? '-rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!collapsedSections.projects && (
                <>
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={addProject}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Add Project
                    </button>
                  </div>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="space-y-2 p-4 border rounded-md">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeProject(index)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                      <input
                        type="text"
                        placeholder="Project Link"
                        value={project.link}
                        onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                      <input
                        type="text"
                        placeholder="Tech Stack"
                        value={project.techStack}
                        onChange={(e) => handleProjectChange(index, 'techStack', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                      <textarea
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                        className="w-full border rounded-md p-2"
                        rows="3"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Certifications Section */}
            <div className="space-y-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('certifications')}
              >
                <h2 className="text-xl font-bold">Certifications</h2>
                <svg 
                  className={`w-6 h-6 transform transition-transform ${collapsedSections.certifications ? '-rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!collapsedSections.certifications && (
                <>
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={addCertification}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
                    >
                      Add Certification
                    </button>
                  </div>
                  {resumeData.certifications.map((cert, index) => (
                    <div key={index} className="space-y-2 p-4 border rounded-md">
                      <div className="flex justify-between">
                        <input
                          type="text"
                          placeholder="Certification Name"
                          value={cert}
                          onChange={(e) => handleCertificationChange(index, e.target.value)}
                          className="flex-1 border rounded-md p-2"
                        />
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="text-red-500 text-sm ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </form>
        </div>

        {/* Right Preview Section */}
        <div className="w-[70%] bg-gray-100 shadow-lg rounded-lg overflow-y-auto p-8">
          <div className="shadow-lg bg-white">
            <PrintableResume ref={printRef} resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
