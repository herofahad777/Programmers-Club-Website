import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Tag, FileText, CheckCircle, AlertCircle, Send, 
  Lightbulb, Users, Clock, Info
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

export default function SuggestEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Workshop',
    additionalInfo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Character limits
  const MAX_DESC_LENGTH = 500;
  const MAX_ADDITIONAL_LENGTH = 300;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Event description is required';
    if (!formData.date) newErrors.date = 'Suggested date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Frontend-only submission simulation
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ title: '', description: '', date: '', category: 'Workshop', additionalInfo: '' });
      }, 4000);
    }
  };

  const inputClasses = "w-full bg-[#0b0b0f] border border-[#2a2a30] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7bc142] focus:border-transparent transition-all placeholder:text-gray-600";
  const errorInputClasses = "w-full bg-[#0b0b0f] border border-red-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-600";

  return (
    <div className="w-full">
      <PageHeader
        title="Suggest an Event"
        description="Have an idea for a workshop, hackathon, or coding contest? Share it with us and help shape the club's future activities."
        breadcrumbs={['Suggest Event']}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-[#151519] border border-[#2a2a30] rounded-2xl p-12 text-center"
          >
            <div className="inline-flex items-center justify-center bg-[#7bc142]/10 p-4 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-[#7bc142]" />
            </div>
            <h3 className="text-3xl font-bold text-white font-[Poppins] mb-3">Idea Submitted!</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Thank you for your suggestion. The technical team will review it and get back to you if we need more details.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Form Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-[#151519] border border-[#2a2a30] rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-xl font-semibold text-white font-[Poppins] mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#7bc142]" />
                Event Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={errors.title ? errorInputClasses : inputClasses}
                    placeholder="e.g., Advanced React Hooks Workshop"
                  />
                  {errors.title && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
                    </p>
                  )}
                </div>

                {/* Category & Date Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                      >
                        <option>Workshop</option>
                        <option>Bootcamp</option>
                        <option>Project Showcase</option>
                        <option>CTF (Capture The Flag)</option>
                        <option>UI/UX Sprint</option>
                        <option>Seminar</option>
                        <option>Group Discussion</option>
                        <option>Game Jam</option>
                        <option>Tech Trivia</option>
                        <option>Group Study</option>
                        <option>Other</option>
                      </select>
                      <Tag className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                      Suggested Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={errors.date ? errorInputClasses : inputClasses}
                    />
                    {errors.date && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                      </p>
                    )}
                  </div>
                </div>

                {/* Event Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Event Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    maxLength={MAX_DESC_LENGTH}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={errors.description ? errorInputClasses : inputClasses}
                    placeholder="Briefly describe what the event is about and what participants will learn..."
                  />
                  <div className="flex justify-between mt-1.5">
                    {errors.description ? (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
                      </p>
                    ) : <span></span>}
                    <span className={`text-xs ${formData.description.length >= MAX_DESC_LENGTH ? 'text-red-400' : 'text-gray-500'}`}>
                      {formData.description.length}/{MAX_DESC_LENGTH}
                    </span>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Information <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="additionalInfo"
                    rows={3}
                    maxLength={MAX_ADDITIONAL_LENGTH}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className={inputClasses}
                    placeholder="Any specific requirements, potential speakers, or resources needed..."
                  />
                  <div className="flex justify-end mt-1.5">
                    <span className={`text-xs ${formData.additionalInfo.length >= MAX_ADDITIONAL_LENGTH ? 'text-red-400' : 'text-gray-500'}`}>
                      {formData.additionalInfo.length}/{MAX_ADDITIONAL_LENGTH}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#7bc142] hover:bg-[#6bae38] text-[#0b0b0f] font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-[0_0_20px_rgba(123,193,66,0.3)] mt-2"
                >
                  <span>Submit Suggestion</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

            {/* Sidebar: Tips & Guidelines */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-[#151519] border border-[#2a2a30] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white font-[Poppins] mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#7bc142]" />
                  Tips for a Great Suggestion
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-[#7bc142]/10 p-1.5 rounded-md mt-0.5">
                      <FileText className="w-4 h-4 text-[#7bc142]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">Be Specific</p>
                      <p className="text-xs text-gray-400 mt-0.5">Clearly state the topic, target audience (e.g., beginners, advanced), and expected outcomes.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-[#7bc142]/10 p-1.5 rounded-md mt-0.5">
                      <Clock className="w-4 h-4 text-[#7bc142]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">Propose a Realistic Timeline</p>
                      <p className="text-xs text-gray-400 mt-0.5">Suggest a date that aligns with the academic calendar, avoiding major exam weeks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-[#7bc142]/10 p-1.5 rounded-md mt-0.5">
                      <Users className="w-4 h-4 text-[#7bc142]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">Mention Resources</p>
                      <p className="text-xs text-gray-400 mt-0.5">If you know a potential guest speaker or specific tools needed, mention them here.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-[#7bc142]/5 border border-[#7bc142]/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#7bc142] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#8fd147] mb-1">Note on Submissions</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      All suggestions are reviewed by the Programmers Club Technical Team. Due to the volume of requests, we may not be able to implement every idea, but we read every single one!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
}