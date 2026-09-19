import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Send, CheckCircle, 
  Linkedin, Instagram, Github, MessageCircle,
  Clock, Users, Building2, ExternalLink,
  Phone, Calendar
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    topic: 'General Inquiry', 
    message: '' 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', topic: 'General Inquiry', message: '' });
      }, 4000);
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/programmers-club-aiktc/',
      icon: Linkedin,
      color: 'hover:bg-blue-600',
      description: 'Follow our professional updates'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/aiktc_programmers_club/',
      icon: Instagram,
      color: 'hover:bg-pink-600',
      description: 'See our latest events & activities'
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'pc@aiktc.ac.in',
      description: 'Official email for inquiries',
      color: 'text-[#7bc142]'
    },
    {
      icon: Building2,
      title: 'Visit Us',
      value: 'AIKTC Campus, Panvel',
      description: 'Computer Department Block',
      color: 'text-[#8fd147]'
    }
  ];

  return (
    <div className="w-full">
      <PageHeader
        title="Get In Touch"
        description="Have questions? Want to collaborate? We'd love to hear from you. Reach out through any of the channels below."
        breadcrumbs={['Contact']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Quick Contact Methods */}
        <section className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#151519] border border-[#2a2a30] rounded-xl p-6 hover:border-[#7bc142]/50 transition-colors"
              >
                <method.icon className={`w-8 h-8 ${method.color} mb-4`} />
                <h3 className="text-white font-semibold mb-1">{method.title}</h3>
                <p className="text-[#7bc142] text-sm mb-1">{method.value}</p>
                <p className="text-gray-400 text-xs">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Media Links */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white font-[Poppins] mb-6 text-center md:text-left">
            Connect With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#151519] border border-[#2a2a30] rounded-xl p-6 flex items-start space-x-4 hover:border-[#7bc142] ${social.color} transition-all group`}
              >
                <div className="bg-[#0b0b0f] p-3 rounded-lg group-hover:bg-white/10 transition-colors">
                  <social.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{social.name}</h3>
                  <p className="text-gray-400 text-sm">{social.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <span>Visit Profile</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Main Content: Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#151519] border border-[#2a2a30] rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold text-white font-[Poppins] mb-6">
              Send us a Message
            </h2>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle className="w-16 h-16 text-[#7bc142] mb-4" />
                <h3 className="text-2xl font-semibold text-white font-[Poppins] mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 24-48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-[#0b0b0f] border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7bc142] focus:border-transparent transition-all ${
                      errors.name ? 'border-red-500' : 'border-[#2a2a30]'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-[#0b0b0f] border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7bc142] focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-[#2a2a30]'
                    }`}
                    placeholder="john@aiktc.ac.in"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                    Topic
                  </label>
                  <select
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-[#0b0b0f] border border-[#2a2a30] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7bc142] focus:border-transparent transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Event Collaboration</option>
                    <option>Workshop Proposal</option>
                    <option>Membership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-[#0b0b0f] border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7bc142] focus:border-transparent transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-[#2a2a30]'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#7bc142] hover:bg-[#6bae38] text-[#0b0b0f] font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Map & Location */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-[#151519] border border-[#2a2a30] rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-[#2a2a30]">
                <h2 className="text-2xl font-semibold text-white font-[Poppins] mb-2">
                  Find Us On Campus
                </h2>
                <p className="text-gray-400">
                  Visit us at AIKTC campus during office hours
                </p>
              </div>
              
              <div className="aspect-video bg-[#0b0b0f] relative flex-grow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4416.043288486219!2d73.10570014535936!3d19.002251596678363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e83a36fbf179%3A0xbbb0905051e8c56e!2sAnjuman-I-Islam's%20Kalsekar%20Technical%20Campus!5e0!3m2!1sen!2sin!4v1789828083874!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0"
                  title="AIKTC Campus Location"
                ></iframe>
              </div>
              
              <div className="p-6">
                <a
                  href="https://maps.google.com/?q=Anjuman-I-Islam's+Kalsekar+Technical+Campus+Panvel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#7bc142] hover:text-[#8fd147] transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Open in Google Maps
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}