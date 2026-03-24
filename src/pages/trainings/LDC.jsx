import React from 'react'
import 'animate.css'

export default function LDC() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-red-900">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white text-center animate__animated animate__fadeInUp">
      LOGIC Discipleship Class
    </h1>
    <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/90 text-center animate__animated animate__fadeInUp animate__delay-1s">
      Deepen your relationship with Christ through structured discipleship training
    </p>
  </div>
</section>

      {/* Content */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold animate__animated animate__fadeInUp">Program Overview</h2>
          <p className="mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">
            Building upon the foundation laid in LFC, The LOGIC Discipleship Class is carefully crafted to prepare participants for effective evangelism, both in their professional endeavors, and within the realm of ministry. The class adopts a holistic approach to discipleship, by teaching the students to seamlessly integrate fundamental Christian doctrines in business and ministry, thus empowering them for purposeful living and effective service, and ultimately equipping them for active leadership roles within the business place and in various areas of ministry.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">
            Going beyond theoretical knowledge, this class places strong emphasis on practical discipleship. Specialised preaching sessions are incorporated into the curriculum, to deepen the students' understanding of their faith, while also aiding the development of requisite skills for the effective communication of the Gospel.
          </p>
         <div className="mt-4 relative bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg max-w-3xl mx-auto">
  <p className="text-blue-800 text-sm sm:text-base italic leading-relaxed">
    "And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others." - 2 Timothy 2:2
  </p>
</div>
          {/* Program Details (stacked) */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 animate__animated animate__fadeInUp">Program Details</h3>

            <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-3">Duration & Schedule</h4>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Duration: 4–8 weeks (Standard), or 7–10 days (Accelerated)</li>
                <li>Frequency: Quarterly</li>
                <li>Session Length: 3 to 4 hours each</li>
                <li>Prerequisites: Foundation Class Completion</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-3">Core Curriculum</h4>
              <p className="text-gray-700 mb-3">The participants delve into advanced teachings across key areas, some of which are as follows:</p>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Spiritual Mapping</li>
                <li>Spiritual Consciousness</li>
                <li>Replication & Sustainability in Leadership</li>
                <li>The Reprogramming of the Mind</li>
                <li>Practising the Consciousness of God's Presence in Ministry & Business</li>
              </ul>
            </div>
          </div>

          {/* Transformational Outcomes (stacked) */}
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold animate__animated animate__fadeInUp">Transformational Outcomes</h2>
            <p className="mt-4 text-gray-700 leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">The Discipleship Class is designed to produce mature, equipped disciples who can effectively multiply their faith and leadership in others. Our comprehensive approach ensures graduates are prepared for significant ministry roles and leadership responsibilities.</p>

            <div className="mt-6 space-y-6">
              {/* Spiritual Awareness */}
              <div className="relative pl-6 pb-6 animate__animated animate__fadeInUp">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Spiritual Awareness</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    <li>Apply advanced spiritual concepts such as spiritual mapping, mental renewal, and spiritual consciousness to daily life</li>
                    <li>Cultivate a heightened awareness of God's presence in both ministry and business settings</li>
                    <li>Reflect deeply on personal spiritual growth through structured class summaries and real-life application</li>
                  </ul>
                </div>
              </div>

              {/* Leadership Competency */}
              <div className="relative pl-6 pb-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-full"></div>
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Leadership Competency</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    <li>Integrate Christian doctrines into leadership within both professional and ministry contexts</li>
                    <li>Lead effectively in ministry and the marketplace with integrity, purpose, and vision</li>
                    <li>Model holistic discipleship and reproduce sustainable leadership in others</li>
                  </ul>
                </div>
              </div>

              {/* Ministry Skills */}
              <div className="relative pl-6 animate__animated animate__fadeInUp animate__delay-2s">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-full"></div>
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                  <h4 className="font-semibold text-gray-900 text-lg mb-3">Ministry Skills</h4>
                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    <li>Communicate the gospel clearly through structured preaching sessions and personal testimonies</li>
                    <li>Deliver impactful sermons with confidence, relevance, and scriptural depth</li>
                    <li>Receive and apply feedback to refine ministry presentation and grow in preaching effectiveness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}