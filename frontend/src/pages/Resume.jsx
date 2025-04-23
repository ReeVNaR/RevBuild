import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import React from 'react';

const PrintableResume = React.forwardRef((props, ref) => (
  <div 
    ref={ref} 
    className="bg-white p-[2cm]"
    style={{
      width: '21cm',
      minHeight: '29.7cm',
      margin: '0 auto',
    }}
  >
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-1">{props.resumeData.fullName || ' '}</h1>
      <p className="text-lg mb-2 text-gray-700">{props.resumeData.title || ' '}</p>
      <p className="text-sm text-gray-600 mb-1">
        {props.resumeData.email || ' '} | {props.resumeData.phone || ' '}
      </p>
      <p className="text-sm text-gray-600 flex justify-center gap-4">
        <span>{props.resumeData.links.github || ' '}</span> | <span>{props.resumeData.links.linkedin || ' '}</span> | <span>{props.resumeData.links.portfolio || ' '}</span>
      </p>
    </div>

    {/* Always show sections even if empty */}
    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 mb-3">EDUCATION</h2>
      {props.resumeData.education.map((edu, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              {edu.school && <p className="font-medium">{edu.school}</p>}
              {edu.degree && <p className="text-sm">{edu.degree}</p>}
              {edu.percentage && <p className="text-sm">Percentage: {edu.percentage}</p>}
            </div>
            <div className="text-right">
              {edu.location && <p className="text-sm">{edu.location}</p>}
              {edu.year && <p className="text-sm">{edu.year}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 mb-3">EXPERIENCE</h2>
      {props.resumeData.experience.map((exp, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              {exp.role && <p className="font-medium">{exp.role}</p>}
              {exp.company && <p className="text-sm">{exp.company}</p>}
              {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
            </div>
            <div className="text-right">
              {exp.location && <p className="text-sm">{exp.location}</p>}
              {exp.duration && <p className="text-sm">{exp.duration}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 mb-3">SKILLS</h2>
      <div className="grid gap-2">
        {props.resumeData.skills.programmingLanguages && (
          <p><span className="font-medium">Programming Languages:</span> {props.resumeData.skills.programmingLanguages}</p>
        )}
        {props.resumeData.skills.librariesFrameworks && (
          <p><span className="font-medium">Libraries/Frameworks:</span> {props.resumeData.skills.librariesFrameworks}</p>
        )}
        {props.resumeData.skills.toolsPlatforms && (
          <p><span className="font-medium">Tools/Platforms:</span> {props.resumeData.skills.toolsPlatforms}</p>
        )}
        {props.resumeData.skills.databases && (
          <p><span className="font-medium">Databases:</span> {props.resumeData.skills.databases}</p>
        )}
      </div>
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 mb-3">PROJECTS</h2>
      {props.resumeData.projects.map((project, index) => (
        <div key={index} className="mb-3">
          <div>
            {project.name && (
              <p className="font-medium">
                {project.name}
                {project.link && <a href={project.link} className="text-sm text-blue-600 ml-2">| Link</a>}
              </p>
            )}
            {project.techStack && <p className="text-sm text-gray-600">Tech Stack: {project.techStack}</p>}
            {project.description && <p className="text-sm">{project.description}</p>}
          </div>
        </div>
      ))}
    </div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold border-b border-gray-300 mb-3">CERTIFICATIONS</h2>
      {props.resumeData.certifications.length > 0 && (
        <ul className="list-disc list-inside">
          {props.resumeData.certifications.map((cert, index) => (
            <li key={index} className="text-sm mb-1">{cert}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
));

export default function Resume() {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: 21cm 29.7cm;
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

  const [resumeData, setResumeData] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    links: {
      github: '',
      linkedin: '',
      portfolio: '',
    },
    education: [
      { school: '', degree: '', percentage: '', location: '', year: '' }
    ],
    experience: [
      { company: '', role: '', duration: '', location: '', description: '' }
    ],
    skills: {
      programmingLanguages: '',
      librariesFrameworks: '',
      toolsPlatforms: '',
      databases: ''
    },
    projects: [
      { name: '', link: '', techStack: '', description: '' }
    ],
    certifications: []
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
      
      <div className="flex gap-4">
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
        <div className="w-[70%] bg-white shadow-lg rounded-lg overflow-y-auto">
          <div className="w-[21cm] mx-auto my-8">
            <PrintableResume ref={componentRef} resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
