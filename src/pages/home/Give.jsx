import React, { useState } from 'react'
import 'animate.css'
import { ContentCopy, Check } from '@mui/icons-material'

const accounts = [
  {
    id: 'offering',
    label: 'Offering / General',
    number: '1307061170',
    name: 'THE LOGIC CHURCH PORT HARCOURT',
    bank: 'Providus Bank',
  },
  {
    id: 'projects',
    label: 'Projects',
    number: '1307317554',
    name: 'THE LOGIC CHURCH PORT HARCOURT',
    bank: 'Providus Bank',
  },
]

const categories = ['Offering', 'Projects', 'Partnership']

export default function Give() {
  const [copied, setCopied] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Offering')
  const [form, setForm] = useState({ name: '', email: '', amount: '' })

  const handleCopy = (number, id) => {
    navigator.clipboard.writeText(number)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Payment gateway coming soon! Please use bank transfer for now.')
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[70vh] md:min-h-screen">
        <div className="absolute inset-0">
          <img
            src="/assets/DSC_7829.jpeg"
            alt="Worship at LOGIC Church Port Harcourt"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 sm:py-40 flex flex-col items-center justify-center text-center h-full">
          <div className="animate__animated animate__fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/15 text-white text-sm font-medium shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-white/80"></span>
            Hilarious Generosity
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight animate__animated animate__fadeInUp animate__delay-1s">
            <span className="text-white">Worship Through</span>
            <span className="block bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent">Giving</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-200 animate__animated animate__fadeInUp animate__delay-2s">
            Your giving fuels the gospel — it is an act of worship, an expression of love, and a seed for impact.
          </p>
          <a href="#ways-to-give" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80">
            <div className="text-xs tracking-[0.3em] uppercase mb-3 animate__animated animate__fadeInUp animate__delay-2s">Give Now</div>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* ── Ways to Give ─────────────────────────────────── */}
      <section id="ways-to-give" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ways to Give</h2>
            <div className="mt-2 mx-auto h-1 w-16 rounded bg-red-600"></div>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Choose the most convenient way to give. All transfers go directly to The LOGIC Church Port Harcourt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* LEFT: Bank Transfers */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="h-6 w-1 rounded bg-red-600 inline-block"></span>
                Bank Transfer (Naira)
              </h3>
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 flex items-center justify-between hover:border-red-200 hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-600 mb-1 bg-red-50 px-2 py-0.5 rounded">
                        {account.label}
                      </span>
                      <div className="text-2xl font-bold text-gray-900 tracking-wide mt-1">
                        {account.number}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{account.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5 font-medium">{account.bank}</div>
                    </div>
                    <button
                      onClick={() => handleCopy(account.number, account.id)}
                      title="Copy account number"
                      className="ml-4 p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 flex-shrink-0"
                    >
                      {copied === account.id ? (
                        <Check className="text-green-500" fontSize="small" />
                      ) : (
                        <ContentCopy fontSize="small" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400 text-center">
                Please send us a confirmation after your transfer — thank you!
              </p>
            </div>

            {/* RIGHT: Online Giving Form Placeholder */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="h-6 w-1 rounded bg-red-600 inline-block"></span>
                Give Online
              </h3>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="give-name">Full Name</label>
                    <input
                      id="give-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="John Emeka"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="give-email">Email Address</label>
                    <input
                      id="give-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="john@example.com"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="give-amount">Amount (₦)</label>
                    <input
                      id="give-amount"
                      name="amount"
                      type="number"
                      min="100"
                      value={form.amount}
                      onChange={handleFormChange}
                      placeholder="₦ 5,000"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Giving</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                            selectedCategory === cat
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors duration-200 text-base shadow-sm"
                  >
                    Give Now →
                  </button>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span className="text-xs text-gray-400">Coming soon:</span>
                    <span className="text-xs font-semibold text-gray-500">Paystack</span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-xs font-semibold text-gray-500">Flutterwave</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Joy of Generous Giving ───────────────────── */}
      <section className="bg-neutral-100 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">The Joy of Generous Giving</h2>
          <div className="mt-2 mx-auto h-1 w-16 rounded bg-red-600"></div>
          <div className="mt-8 space-y-5 text-gray-700 leading-relaxed text-base sm:text-lg">
            <p>
              At The LOGIC Church Port Harcourt, we believe that <strong>giving is not a duty — it is a delight</strong>. The scripture says, <em>&ldquo;God loves a cheerful giver&rdquo;</em> (2 Corinthians 9:7). The word &ldquo;cheerful&rdquo; in the original Greek is <strong>hilaros</strong> — which literally means hilarious. God loves a hilarious giver!
            </p>
            <p>
              Giving is one of the most powerful expressions of love. When you give, you are not just supporting a programme — you are partnering with the gospel. You are funding a seat in the room where someone&apos;s life changes forever. You are planting a seed into the ministry that has planted into your own life.
            </p>
            <p>
              Our culture at LOGIC is <strong>Love. Life. Impact.</strong> — and your generosity makes all three possible. Thank you for being a part of what God is doing here in Port Harcourt and beyond.
            </p>
            <p className="text-red-600 font-semibold text-xl italic">
              &ldquo;The Gospel thrives on our generosity.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h3 className="text-xl font-bold text-gray-900">Have questions about giving?</h3>
          <p className="mt-3 text-gray-600">Feel free to reach out to us and we&apos;d be happy to help.</p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-white font-semibold text-sm hover:bg-red-700 transition-colors duration-200 shadow-sm"
          >
            Contact Us
          </a>
        </div>
      </section>

    </main>
  )
}
