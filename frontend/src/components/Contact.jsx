import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Me</h2>
        <div className="max-w-lg mx-auto">
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
            <textarea placeholder="Message" rows="4" className="w-full p-2 border rounded"></textarea>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
