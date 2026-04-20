import React, { useState } from 'react'
import 'animate.css'
import { Send, Phone, Person, Message } from '@mui/icons-material'

const requestTypes = ['Prayer', 'Counselling', 'Questions', 'Others']
const genders = ['Male', 'Female', 'Other']

export default function TalkToPPC() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    gender: 'Male',
    requestType: 'Prayer',
    message: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder for backend submission
    setTimeout(() => {
      alert('Your message has been sent to Pastor Paul Chisom (PPC). You will hear from us soon!')
      setLoading(false)
      setForm({ name: '', phone: '', gender: 'Male', requestType: 'Prayer', message: '' })
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[60vh] md:min-h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="/images/DSC_1869.jpg"
            alt="Pastor Paul Chisom"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center text-center h-full">
          <div className="animate__animated animate__fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/15 text-white text-sm font-medium shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
            Direct Access
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight animate__animated animate__fadeInUp animate__delay-1s text-white">
            Talk 2 <span className="text-red-500">PPC</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-200 animate__animated animate__fadeInUp animate__delay-2s">
            Direct communication with our Lead Pastor, Paul Chisom. Whatever is on your heart, PPC is here to listen, pray, and guide.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* ── Pastor Profile ─────────────────────────────── */}
          <div className="animate__animated animate__fadeInLeft">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="h-8 w-1.5 rounded bg-red-600 block"></span>
              Meet Pastor Paul Chisom (PPC)
            </h2>
            <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
              <p>
                Pastor Paul Chisom Udo, affectionately known as <strong>PPC</strong>, is the Lead Pastor of The LOGIC Church Port Harcourt. A visionary leader, dynamic teacher of the Word, and a passionate worship leader, PPC is committed to revealing Jesus and the simplicity of God&apos;s grace.
              </p>
              <p>
                His ministry is defined by a deep love for people and a burden to see believers live transformed lives through the power of Christ&apos;s finished work. Under his leadership, The LOGIC Church PH has become a vibrant community where <strong>Love</strong> is preached, <strong>Life</strong> is given, and <strong>Impact</strong> is made.
              </p>
              <p>
                PPC believes that every soul matters and that no one should walk through life alone. Whether you have a question about the gospel, need pastoral counselling, or simply want someone to stand with you in prayer, your voice is heard here.
              </p>
              <div className="bg-neutral-50 px-6 py-6 rounded-2xl border border-gray-100 italic text-red-600 font-medium text-lg">
                &ldquo;You are never alone on this journey. My heart is open to listen, and my hands are extended to serve you.&rdquo;
              </div>
            </div>
          </div>

          {/* ── Contact Form ─────────────────────────────── */}
          <div className="animate__animated animate__fadeInRight">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send a Direct Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                       <Person className="text-gray-400" fontSize="small" /> Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                       <Phone className="text-gray-400" fontSize="small" /> Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. +234..."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
                  <div className="flex flex-wrap gap-2">
                    {genders.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setForm({...form, gender: g})}
                        className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                          form.gender === g
                            ? 'bg-red-600 text-white border-red-600 shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Request Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">What are you reaching out for?</label>
                  <div className="flex flex-wrap gap-2">
                    {requestTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({...form, requestType: type})}
                        className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                          form.requestType === type
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Message className="text-gray-400" fontSize="small" /> Your Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your request or share your heart..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all duration-300 text-lg shadow-lg flex items-center justify-center gap-2 hover:shadow-red-200"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Message <Send fontSize="small" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                  Your privacy is important to us. Direct messages are handled with pastoral confidentiality.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
