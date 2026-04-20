import React, { useState } from 'react'
import 'animate.css'
import Modal from '../../components/Modal'

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalBody, setModalBody] = useState(null)

  const openModal = (title, content) => {
    setModalTitle(title)
    setModalBody(content)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0">
          <img
            src="/images/logic1.jpg"
            alt="The LOGIC Church community"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center justify-center text-center h-full">
          {/* Pill */}
          <div className="animate__animated animate__fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/15 text-white text-sm font-medium shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-white/80"></span>
            Our Story
          </div>
          {/* Heading */}
          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight animate__animated animate__fadeInUp animate__delay-1s">
            <span className="text-white">About The LOGIC Church</span>
            <span className="block bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent">Port Harcourt</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg sm:text-xl md:text-2xl text-gray-200">
            Explore our story, mission, and the community that makes us who we are
          </p>

          {/* Discover More */}
          <a href="#our-story" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80">
            <div className="text-xs tracking-[0.3em] uppercase mb-3 animate__animated animate__fadeInUp animate__delay-2s">Discover More</div>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
              <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The LOGIC Church (Love Of God In Christ Church) Port Harcourt is a vibrant community of believers passionate about revealing Jesus and teaching the Gospel of God’s grace with clarity and simplicity.
                </p>
                <p>
                  Our culture is expressed in three simple but powerful words: <strong>Love. Life. Impact.</strong> Love is what we preach. Life is what we give. Impact is what we make. Led by Pastor Paul Chisom Udo and assisted by Pastor Rema Udo, we are dedicated to raising believers who understand their identity in Christ.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openModal(
                    'Our Story',
                    (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Love. Life. Impact.</h3>
                            <p className="text-gray-700 leading-relaxed">
                              The LOGIC Church (Love Of God In Christ Church) Port Harcourt is a vibrant community of believers passionate about revealing Jesus and teaching the Gospel of God’s grace with clarity and simplicity.
                            </p>
                            <p className="text-gray-700 leading-relaxed text-lg italic border-l-4 border-red-600 pl-4">
                              "Love is what we preach. Life is what we give. Impact is what we make."
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              Our mission is to raise believers who understand their identity in Christ and live transformed lives through the power of His love and grace. The church is led by <strong>Pastor Paul Chisom Udo</strong> (Lead Pastor) and assisted by <strong>Pastor Rema Udo</strong>.
                            </p>
                          </div>

                          <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-xl font-semibold text-gray-900">Vibrant Communities</h3>
                            <p className="text-gray-700 leading-relaxed">
                              Beyond our services, we nurture growth, fellowship, and purpose through vibrant communities including:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-red-600"></span>
                                  <span>Women In Christ & Men In Christ</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-red-600"></span>
                                  <span>Single and Complete (Singles)</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-red-600"></span>
                                  <span>LOGIC KidZone & Teens Church</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-red-600"></span>
                                  <span>Tech Hub & Creative Hub</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 italic">
                              Our Creative Hub includes actors, musicians, artists, poets, sports enthusiasts, and other creatives.
                            </p>
                          </div>

                          <div className="bg-gray-900 p-6 rounded-xl text-white mt-6 shadow-xl">
                            <h3 className="text-lg font-bold mb-3">Visit Us in Port Harcourt</h3>
                            <div className="space-y-3 text-sm text-gray-300">
                              <p className="flex items-start gap-2">
                                <span className="text-red-500">📍</span>
                                <span>The Marquee, Novotel Hotel, 3 Liberation Stadium Road, Rumuomasi, Port Harcourt</span>
                              </p>
                              <div className="flex flex-wrap gap-4 pt-2">
                                <div className="bg-white/10 px-3 py-2 rounded">
                                  <span className="block text-xs uppercase text-gray-400">Midweek Koinonia</span>
                                  <span className="font-bold">Thursday, 6:00 PM</span>
                                </div>
                                <div className="bg-red-600/20 px-3 py-2 rounded">
                                  <span className="block text-xs uppercase text-red-300">Experience Jesus</span>
                                  <span className="font-bold">Sunday, 9:00 AM</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    )
                  )
                }
                className="mt-3 inline-block text-red-600 font-semibold hover:text-red-700"
              >
                Read More →
              </button>
            </div>
            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
                <img src="/assets/DSC_3728.jpg" alt="Church family" className="w-full h-full object-cover aspect-[3/2]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center border-b-2 border-red-600 inline-block mx-auto pb-2 mb-8">Mission & Culture</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-8 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-red-600 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To raise believers who understand their identity in Christ and live transformed lives through the power of His love and grace.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-8 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-red-600 mb-4">Our Culture</h3>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our culture is expressed in three words: <strong>Love. Life. Impact.</strong>
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-widest text-red-600">
                  <div className="p-2 border border-red-100 rounded bg-red-50">Love</div>
                  <div className="p-2 border border-red-100 rounded bg-red-50">Life</div>
                  <div className="p-2 border border-red-100 rounded bg-red-50">Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative px-4">
        <div className="mx-auto max-w-5xl bg-neutral-900 border-y border-red-900/30 py-12 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 text-center text-white">
              <div className="flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">500+</div>
                <div className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-400">Active Members</div>
              </div>
              <div className="h-px w-12 md:h-12 md:w-px bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">1+</div>
                <div className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-400">Years Serving</div>
              </div>
              <div className="h-px w-12 md:h-12 md:w-px bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">2,000+</div>
                <div className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-400">Lives Touched</div>
              </div>
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 blur-[100px] pointer-events-none"></div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Our Leadership Team</h2>
          </div>
          <p className="mt-2 text-gray-600 text-center">Meet the dedicated leaders who guide our church community</p>

          {/* Alternating Rows */}
          <div className="mt-12 space-y-20">
            {/* Row 1: Image Left, Text Right */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  <img src="/assets/oCLMlBmR_400x400.jpg" alt="Apostle Flourish Peters" className="w-full h-full object-cover object-top aspect-[4/3]" />
                </div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Apostle Flourish Peters</h3>
                <p className="mt-1 text-red-600 font-semibold">Lead Pastor and Apostolic Head of The L.O.G.I.C Churches</p>
                <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Apostle Flourish Peters, popularly known as P.Flo, is the Lead Pastor and Apostolic Head of all Love of God in Christ (L.O.G.I.C) Churches, with expressions establish across various parts of Nigeria and the world. He is also the President of Flourish Peters Ministries.
                  </p>
                  <p>
                    P.Flo is a force of nature: an erudite teacher, dynamic speaker, spiritual leader, compassionate pastor, counsellor, musician, dependable friend, author, and a true "make-it-happen" man.
                  </p>
                  <p>
                    He holds a Bachelor's degree in Philosophy and Theology, as well as a Master's in Theology. His academic background, coupled with exposure to world-class leadership through the various organizations he has served in and partnered with, has shaped him into an exceptional leader.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const modalContent = (
                      <div className="space-y-6 text-gray-700 leading-relaxed">
                        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-red-600">
                            <img
                              src="/assets/oCLMlBmR_400x400.jpg"
                              alt="Apostle Flourish Peters"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Apostle Flourish Peters</h3>
                            <p className="text-red-600">Lead Pastor and Apostolic Head of The L.O.G.I.C Churches</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <p>
                            Apostle Flourish Peters, popularly known as <strong>P.Flo</strong>, is the Lead Pastor and Apostolic Head of all <strong>Love of God in Christ (L.O.G.I.C) Churches</strong>, with expressions established across various parts of Nigeria and the world. He is also the President of <strong>Flourish Peters Ministries</strong>.
                          </p>
                          <p>
                            P.Flo is a force of nature: an erudite teacher, dynamic speaker, spiritual leader, compassionate pastor, counsellor, musician, dependable friend, author, and a true "make-it-happen" man.
                          </p>
                          <p>
                            He holds a Bachelor's degree in Philosophy and Theology, as well as a Master's in Theology. His academic background, coupled with exposure to world-class leadership through the various organizations he has served in and partnered with, has shaped him into an exceptional leader.
                          </p>
                          <p>
                            A fourth-generation pastor, P.Flo has been in active ministry for over 22 years, even before his university education, passionately pastoring, serving, and learning under renowned leaders and ministers of the gospel. Their mentorship helped shape him into the remarkable leader and pastor he is today.
                          </p>
                          <p>
                            His purpose is clear: to preach <strong>The Love of God in Christ</strong>—the gospel of the grace of God—to a generation previously shackled by religion and the law.
                          </p>
                          <p>
                            Through his ministry, countless lives have been transformed—freed from addictions, depression, oppression, suicidal ideation, cultism, and skewed sexual orientations. His counselling ministry has also restored marriages on the brink of collapse and brought healing and freedom to those in physically and emotionally abusive relationships.
                          </p>
                          <p>
                            <strong>P.Flo</strong> represents a generation that believes one can be spiritually empowered, socially influential, economically productive, and politically relevant—a true nation builder. He is the author of <em>The Revelation Generation</em> and <em>Pray As You Go: Daily Christocentric Declarations</em>, both of which are rapidly becoming bestsellers in the Christian space.
                          </p>
                          <p>
                            In addition to his pastoral and teaching ministry, <strong>Apostle Flourish Peters</strong> is the convener of the annual <strong>Jesus Plus Nothing LOGIC Conference</strong>—a flagship gathering that draws ministers of the gospel and believers from across Nigeria and around the world. The purpose of the conference is to re-center the focus of believers on Jesus alone, not a mixture of grace and the law, as anchored in Matthew 17:5. This life-changing event has become a spiritual landmark within and beyond the LOGIC Nation, igniting a deeper revelation of Jesus Christ and the message of God's grace.
                          </p>
                          <p>
                            Pastor Flourish Peters is happily married to the beautiful Pastor Amaka Flourish-Peters, and they have two blessed children: Sozo and Salem Flourish-Peters.
                          </p>
                        </div>
                      </div>
                    );
                    openModal('Apostle Flourish Peters', modalContent);
                  }}
                  className="mt-3 inline-block text-red-600 font-semibold hover:text-red-700"
                >
                  Read More ·
                </button>
              </div>
            </div>

            {/* Row 2: Text Left, Image Right */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Pastor Paul Chisom Udo</h3>
                <p className="mt-1 text-red-600 font-semibold">Lead Pastor of The L.O.G.I.C Church Port Harcout</p>
                <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Pastor Paul Chisom Udo is a seasoned minister of the gospel and a dynamic leader with a passion for building lives through the word of God. As the Lead Pastor of The L.O.G.I.C Church Port Harcourt, he leads a vibrant community of believers with wisdom, grace, and an unwavering commitment to the message of God's love in Christ.
                  </p>
                  <p>
                    With a background in leadership and a heart for soul winning, Pastor Paul has been a pivotal part of the L.O.G.I.C Nation, contributing significantly to its growth and impact across various regions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const modalContent = (
                      <div className="space-y-6 text-gray-700 leading-relaxed">
                        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-red-600">
                            <img
                              src="/assets/pastor_paul.jpg"
                              alt="Pastor Paul Chisom Udo"
                              className="h-full w-full object-cover object-top"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Pastor Paul Chisom Udo</h3>
                            <p className="text-red-600">Lead Pastor of The L.O.G.I.C Church Port Harcout</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <p>
                            Pastor Paul Chisom Udo is a seasoned minister of the gospel and a dynamic leader with a passion for building lives through the word of God. As the Lead Pastor of The L.O.G.I.C Church Port Harcourt, he leads a vibrant community of believers with wisdom, grace, and an unwavering commitment to the message of God's love in Christ.
                          </p>
                          <p>
                            His ministry is characterized by a deep devotion to prayer, a profound understanding of the scriptures, and a genuine love for people. Under his leadership, the Port Harcourt branch has blossomed into a thriving hub of spiritual growth and community impact.
                          </p>
                          <p>
                            A key figure in the L.O.G.I.C Nation, Pastor Paul continues to inspire many with his dedication to the vision of building a family where grace and faith are preached, and the love of God in Christ is felt.
                          </p>
                        </div>
                      </div>
                    );
                    openModal('Pastor Paul Chisom Udo', modalContent);
                  }}
                  className="mt-3 inline-block text-red-600 font-semibold hover:text-red-700"
                >
                  Read More ·
                </button>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  <img src="/assets/pastor_paul.jpg" alt="Pastor Paul Chisom Udo" className="w-full h-full object-cover object-top aspect-[4/3]" />
                </div>
              </div>
            </div>

            {/* Row 3: Image Left, Text Right (Pastor Rema Udo) */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  <img src="/assets/pastor_rema.jpg" alt="Pastor Rema Udo" className="w-full h-full object-cover aspect-[4/3]" />
                </div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Pastor Rema Udo</h3>
                <p className="mt-1 text-red-600 font-semibold">Associate Pastor at L.O.G.I.C Church Port Harcourt</p>
                <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Pastor Rema Udo is a dedicated spiritual leader and Associate Pastor at The L.O.G.I.C Church Port Harcourt. She is known for her vibrant spirit, deep commitment to the word of God, and her passion for nurturing the spiritual growth of the congregation.
                  </p>
                  <p>
                    Working closely with the leadership team, Pastor Rema plays a vital role in the administration and spiritual direction of the Port Harcourt expression, helping to foster a warm and welcoming environment for all members.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const modalContent = (
                      <div className="space-y-6 text-gray-700 leading-relaxed">
                        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-red-600">
                            <img
                              src="/assets/pastor_rema.jpg"
                              alt="Pastor Rema Udo"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Pastor Rema Udo</h3>
                            <p className="text-red-600">Associate Pastor at L.O.G.I.C Church Port Harcourt</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <p>
                            Pastor Rema Udo is a dedicated spiritual leader and Associate Pastor at The L.O.G.I.C Church Port Harcourt. She is known for her vibrant spirit, deep commitment to the word of God, and her passion for nurturing the spiritual growth of the congregation.
                          </p>
                          <p>
                            Together with her husband, Pastor Paul Chisom Udo, they serve as a dynamic team leading the Port Harcourt family. Her ministry is focused on empowerment, discipleship, and sharing the message of God's grace with wisdom and love.
                          </p>
                        </div>
                      </div>
                    );
                    openModal('Pastor Rema Udo', modalContent);
                  }}
                  className="mt-3 inline-block text-red-600 font-semibold hover:text-red-700"
                >
                  Read More ·
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Want to Learn More?</h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
              We'd love to connect with you and answer any questions you might have about our church community.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {/* Contact Us Button */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-red-800 px-6 py-3 text-white font-semibold text-sm sm:text-base hover:bg-red-900 transition-colors duration-200 shadow-sm"
              >
                Contact Us
              </a>

              {/* Visit This Sunday Button */}
              <a
                href="/events"
                className="inline-flex items-center justify-center rounded-md border border-red-600 px-6 py-3 text-red-600 font-semibold text-sm sm:text-base hover:bg-red-50 transition-colors duration-200"
              >
                Visit This Sunday
              </a>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        maxWidth="max-w-4xl"
      >
        {modalBody}
      </Modal>
    </main>
  )
}
