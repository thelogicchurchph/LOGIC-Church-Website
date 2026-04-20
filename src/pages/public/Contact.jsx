import React, { useState } from 'react';
import 'animate.css';
import { Send, Phone, Email, LocationOn } from '@mui/icons-material';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Thank you for contacting L.O.G.I.C. Church Port Harcourt. We will get back to you shortly.');
      setLoading(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ── Header / Hero ─────────────────────────────────── */}
      <section className="bg-neutral-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white animate__animated animate__fadeInDown">
            Get in <span className="text-red-500">Touch</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto animate__animated animate__fadeInUp">
            We would love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* ── Contact Details ─────────────────────────────── */}
            <div className="lg:col-span-1 space-y-8 animate__animated animate__fadeInLeft">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                      <LocationOn fontSize="small" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Our Venue</h3>
                      <p className="text-gray-600 text-sm mt-1">THE MARQUEE NOVOTEL HOTEL, 3 Liberation stadium road, Rumuomasi, Port Harcourt</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Phone fontSize="small" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Phone</h3>
                      <p className="text-gray-600 text-sm mt-1">+234 809 668 2229</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                      <Email fontSize="small" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Email</h3>
                      <p className="text-gray-600 text-sm mt-1">hello@thelogicchurch.org</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Message Form ─────────────────────────────── */}
            <div className="lg:col-span-2 animate__animated animate__fadeInRight">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="6"
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-10 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all duration-300 text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Message <Send fontSize="small" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
