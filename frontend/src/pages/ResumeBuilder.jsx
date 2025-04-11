import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    socialLinks: {
      github: '',
      linkedin: '',
      portfolio: ''
    },
    education: [
      { school: '', location: '', degree: '', year: '', score: '' }
    ],
    experience: [
      { company: '', location: '', position: '', duration: '', achievements: '' }
    ],
    skills: {
      programming: '',
      frameworks: '',
      tools: '',
      databases: ''
    },
    projects: [
      { name: '', technologies: '', description: '', link: '' }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested object updates
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value
        }
      }));
    } 
    // Handle array updates
    else if (name.includes('[')) {
      const [arrayName, indexStr, field] = name.match(/(\w+)\[(\d+)\]\.(\w+)/).slice(1);
      const index = parseInt(indexStr);
      
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }));
    }
    // Handle simple updates
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const previewRef = useRef(null);

  const handleDownloadPDF = () => {
    const element = previewRef.current;
    const opt = {
      margin: 1,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Resume Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[800px]">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Personal Information */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </section>

              {/* Social Links */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                <div className="space-y-4">
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleChange}
                    placeholder="GitHub URL"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn URL"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="url"
                    name="socialLinks.portfolio"
                    value={formData.socialLinks.portfolio}
                    onChange={handleChange}
                    placeholder="Portfolio URL"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded mb-4">
                    <input
                      type="text"
                      name={`education[${index}].school`}
                      value={edu.school}
                      onChange={handleChange}
                      placeholder="School/University"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name={`education[${index}].location`}
                      value={edu.location}
                      onChange={handleChange}
                      placeholder="Location"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name={`education[${index}].degree`}
                      value={edu.degree}
                      onChange={handleChange}
                      placeholder="Degree"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name={`education[${index}].year`}
                      value={edu.year}
                      onChange={handleChange}
                      placeholder="Year"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name={`education[${index}].score`}
                      value={edu.score}
                      onChange={handleChange}
                      placeholder="Score/CGPA"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </section>

              {/* Skills */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="skills.programming"
                    value={formData.skills.programming}
                    onChange={handleChange}
                    placeholder="Programming Languages"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="skills.frameworks"
                    value={formData.skills.frameworks}
                    onChange={handleChange}
                    placeholder="Libraries/Frameworks"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="skills.tools"
                    value={formData.skills.tools}
                    onChange={handleChange}
                    placeholder="Tools/Platforms"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="skills.databases"
                    value={formData.skills.databases}
                    onChange={handleChange}
                    placeholder="Databases"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </section>

              {/* Projects */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Projects</h2>
                {formData.projects.map((project, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded mb-4">
                    <input
                      type="text"
                      name={`projects[${index}].name`}
                      value={project.name}
                      onChange={handleChange}
                      placeholder="Project Name"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name={`projects[${index}].technologies`}
                      value={project.technologies}
                      onChange={handleChange}
                      placeholder="Technologies Used"
                      className="w-full p-2 border rounded"
                    />
                    <textarea
                      name={`projects[${index}].description`}
                      value={project.description}
                      onChange={handleChange}
                      placeholder="Project Description"
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                    <input
                      type="url"
                      name={`projects[${index}].link`}
                      value={project.link}
                      onChange={handleChange}
                      placeholder="Project Link"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </section>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Preview</h2>
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Download PDF
              </button>
            </div>
            <div ref={previewRef} className="border rounded-md p-6 min-h-[800px] bg-white">
              {/* Preview content will mirror the form structure */}
              <div className="space-y-6">
                <header className="text-center">
                  <h1 className="text-2xl font-bold">{`${formData.firstName} ${formData.lastName}`}</h1>
                  <p>{formData.email} | {formData.phone}</p>
                  <div className="flex justify-center gap-4 mt-2">
                    <a href={formData.socialLinks.github}>GitHub</a>
                    <a href={formData.socialLinks.linkedin}>LinkedIn</a>
                    <a href={formData.socialLinks.portfolio}>Portfolio</a>
                  </div>
                </header>

                <section>
                  <h2 className="text-lg font-semibold border-b">Education</h2>
                  {formData.education.map((edu, index) => (
                    <div key={index} className="mt-2">
                      <div className="flex justify-between">
                        <strong>{edu.school}</strong>
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{edu.degree}</span>
                        <span>{edu.score}</span>
                      </div>
                      <p className="text-sm text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </section>

                <section>
                  <h2 className="text-lg font-semibold border-b">Skills</h2>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <strong>Programming Languages:</strong>
                      <p>{formData.skills.programming}</p>
                    </div>
                    <div>
                      <strong>Libraries/Frameworks:</strong>
                      <p>{formData.skills.frameworks}</p>
                    </div>
                    <div>
                      <strong>Tools/Platforms:</strong>
                      <p>{formData.skills.tools}</p>
                    </div>
                    <div>
                      <strong>Databases:</strong>
                      <p>{formData.skills.databases}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold border-b">Projects</h2>
                  {formData.projects.map((project, index) => (
                    <div key={index} className="mt-2">
                      <div className="flex justify-between">
                        <strong>{project.name}</strong>
                        <a href={project.link} className="text-blue-600">Link</a>
                      </div>
                      <p className="text-sm">{project.technologies}</p>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
