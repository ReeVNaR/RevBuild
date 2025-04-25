import React from 'react';

const About = ({ description }) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
