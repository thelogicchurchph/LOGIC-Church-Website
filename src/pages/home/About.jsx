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
            <span className="text-white">About The LOGIC</span>
            <span className="block bg-gradient-to-r from-red-600 to-rose-400 bg-clip-text text-transparent">Church</span>
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
                  LOGIC is an acronym for <em className="italic font-medium">The Love of God in Christ</em>. The LOGIC Church stands as a beacon of God's love in Christ Jesus, here in Lagos, Nigeria, and to the world at large. We are a place of love, peace, and joy for all who join us.
                </p>
                <p>
                  Our community is richly diverse, with people of different ages and backgrounds coming together to worship and hear the message of the gospel of God's grace. We welcome all individuals seeking God's love, and our doors are open to every soul desiring to welcome Jesus into their heart and live out their in-Christ realities.
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
                          <h3 className="text-xl font-semibold text-gray-900">Our Foundation</h3>
                          <p className="text-gray-700 leading-relaxed">
                            LOGIC is an acronym for <em className="italic font-medium">The Love of God in Christ</em>. The LOGIC Church stands as a beacon of God's love in Christ Jesus, here in Lagos, Nigeria, and to the world at large. We are a place of love, peace, and joy for all who join us.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Our community is richly diverse, with people of different ages and backgrounds coming together to worship and hear the message of the gospel of God's grace. We welcome all individuals seeking God's love, and our doors are open to every soul desiring to welcome Jesus into their heart and live out their in-Christ realities.
                          </p>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-6 mt-6">
                          <h3 className="text-xl font-semibold text-gray-900">Our Humble Beginnings</h3>
                          <p className="text-gray-700 leading-relaxed">
                            The early days of The LOGIC Church can be traced back to several vigils led by the set man of the ministry, Apostle Dr. Flourish Peters, held in a private home between 2017 and 2019. In 2019, a group of believers who had shared fellowship in the early days of their respective marriages urged Apostle Flourish Peters to begin leading them in weekly prayer meetings.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            These gatherings were initially hosted in a small office space in Lekki Phase 1, Lagos. Within a matter of weeks, the prayer meetings began to blossom—growing rapidly in both attendance and spiritual impact. The growth was remarkable and unexpected.
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Launch & Growth</h3>
                          <p className="text-gray-700 leading-relaxed">
                            Later in 2019, Apostle Flourish Peters responded to the promptings of the Holy Spirit and officially birthed The LOGIC Church. The church held its first service on December 31, 2019, at the Kairos Hub on Providence Street, Lekki Phase 1. This inaugural gathering, which also served as the crossover service into the New Year, drew an attendance of approximately 200 people. The first Sunday service followed on January 5, 2020.
                          </p>
                          <p className="text-gray-700 leading-relaxed mt-3">
                            Since its inception, The LOGIC Church has witnessed extraordinary growth. What began as a small gathering has blossomed into a thriving and vibrant community, with multiple expressions established across major cities locally and internationally. This rapid expansion reflects not only the relevance and resonance of the gospel message but also the undeniable impact of Apostle Flourish Peters' leadership and vision. The church continues to grow in influence, touching lives and transforming communities through the power of God's love and grace.
                          </p>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Mission & Vision</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-md">
              <h3 className="text-lg font-semibold text-red-600">Our Mission</h3>
              <p className="mt-2 text-gray-700">
                To build a family where grace and faith are preached, and the love of God in Christ is felt — a home for everyone.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-md">
              <h3 className="text-lg font-semibold text-red-600">Our Vision</h3>
              <p className="mt-2 text-gray-700">
                To preach the gospel of God's Grace to our generation through the help of the Spirit, empowering and impacting lives to flourish in every area of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative">
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold">5,000+</div>
                <div className="mt-1 text-sm sm:text-base text-white/90">Active Members</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold">5+</div>
                <div className="mt-1 text-sm sm:text-base text-white/90">Years Serving</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold">10+</div>
                <div className="mt-1 text-sm sm:text-base text-white/90">Branches</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold">300,000+</div>
                <div className="mt-1 text-sm sm:text-base text-white/90">Lives Touched</div>
              </div>
            </div>
          </div>
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
                  <img src="/assets/DSC_9940.jpeg" alt="Apostle Flourish Peters" className="w-full h-full object-cover aspect-[4/3]" />
                </div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Apostle Flourish Peters</h3>
                <p className="mt-1 text-red-600 font-semibold">Lead Pastor and Apostolic Head of The L.O.G.I.C Churches</p>
                <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Apostle Flourish Peters, popularly known as P.Flo, is the Lead Pastor and Apostolic Head of all Love of God in Christ (L.O.G.I.C) Churches, with headquarters in Lekki, Lagos, and branches across various parts of Nigeria and the world. He is also the President of Flourish Peters Ministries.
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
                              src="/assets/DSC_9940.jpeg" 
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
                            Apostle Flourish Peters, popularly known as <strong>P.Flo</strong>, is the Lead Pastor and Apostolic Head of all <strong>Love of God in Christ (L.O.G.I.C) Churches</strong>, with headquarters in Lekki, Lagos, and branches across various parts of Nigeria and the world. He is also the President of <strong>Flourish Peters Ministries</strong>.
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
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Pastor Amaka Flourish Peters</h3>
                <p className="mt-1 text-red-600 font-semibold">Associate Pastor at L.O.G.I.C Church Global</p>
                <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Pastor Amaka Flourish-Peters is a dynamic and visionary leader, serving as the Associate Pastor at the LOGIC Church Global and the Head of Women in Christ Ministries - The vibrant women’s ministry arm of the church. With a heart deeply rooted in the gospel of God’s grace, prayer, love and compassion, she is passionate about raising godly leaders through discipleship, empowering women, and advancing the kingdom of God with wisdom and grace.
                  </p>
                  <p>
                    With over a decade of senior managerial experience and executive consultancy across a plethora of African startups, Pastor Amaka brings a rare blend of spiritual insight and strategic acumen to Ministry. She holds a Bachelor’s degree in Finance from the University of Texas, Arlington, and a Master of Science from Georgetown University in Washington, DC.
                  </p>
                  <p>
                    At the LOGIC Church, Pastor Amaka plays a vital role in shaping vision, driving growth, and influencing strategic direction. As the head of Women in Christ Ministries, she leads with compassion, fostering a strong community of faith, and global impact. Her expertise in strategic planning, financial stewardship, and organizational leadership has helped position the LOGIC Church for continued global influence.
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
                              src="/assets/DSC_9970.jpeg" 
                              alt="Pastor Amaka Flourish-Peters" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Pastor Amaka Flourish-Peters</h3>
                            <p className="text-red-600">Associate Pastor at L.O.G.I.C Church Global</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <p>
                            Pastor Amaka Flourish-Peters is a dynamic and visionary leader, serving as the Associate Pastor at the LOGIC Church Global and the Head of Women in Christ Ministries - The vibrant women's ministry arm of the church. With a heart deeply rooted in the gospel of God's grace, prayer, love and compassion, she is passionate about raising godly leaders through discipleship, empowering women, and advancing the kingdom of God with wisdom and grace.
                          </p>
                          <p>
                            With over a decade of senior managerial experience and executive consultancy across a plethora of African startups, Pastor Amaka brings a rare blend of spiritual insight and strategic acumen to Ministry. She holds a Bachelor's degree in Finance from the University of Texas, Arlington, and a Master of Science from Georgetown University in Washington, DC.
                          </p>
                          <p>
                            At the LOGIC Church, Pastor Amaka plays a vital role in shaping vision, driving growth, and influencing strategic direction. As the head of Women in Christ Ministries, she leads with compassion, fostering a strong community of faith, and global impact. Her expertise in strategic planning, financial stewardship, and organizational leadership has helped position the LOGIC Church for continued global influence.
                          </p>
                          <p>
                            Affectionately known as <strong>PMaks</strong>, Pastor Amaka is a passionate teacher of God's Word. Her life and ministry continue to inspire many to live and walk boldly in their God-given calling.
                          </p>
                        </div>
                      </div>
                    );
                    openModal('Pastor Amaka Flourish-Peters', modalContent);
                  }}
                  className="mt-3 inline-block text-red-600 font-semibold hover:text-red-700"
                >
                  Read More ·
                </button>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                  <img src="/assets/DSC_9970.jpeg" alt="Pastor Amaka Flourish Peters" className="w-full h-full object-cover aspect-[4/3]" />
                </div>
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
