import React from 'react'
import 'animate.css'

export default function LFC() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
     <section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-red-900 min-h-[40vh] flex items-center justify-center">
  <div className="w-full flex flex-col items-center justify-center">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white text-center animate__animated animate__fadeInUp">
      LOGIC Foundation Class
    </h1>
    <p className="mt-6 max-w-3xl text-base sm:text-lg text-white/90 text-center animate__animated animate__fadeInUp animate__delay-1s">
      Build a solid foundation in Christian faith and biblical principles
    </p>
  </div>
</section>
      {/* Content */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">Course Overview</h2>
          <p className="mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">
            The LOGIC Foundation Class (LFC) is the cornerstone of spiritual development at The LOGIC Church. This transformative course is carefully designed to establish new believers in their faith and strengthen the spiritual foundation of existing Christians. It lays down essential principles rooted in the doctrines of God's grace, offering an enriching and practical experience in the fundamentals of the Christian faith.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">
            LFC students are encouraged to cultivate a wholesome and fulfilling relationship with God, which is not based on transactional ideation but borne out of revelation and a deep understanding of the finished work; through prayer, continued study, and reflection. Impartation sessions are also incorporated into the classes, ensuring that participants not only gain knowledge but also experience personal growth and transformation in their spiritual journey.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">
            Whether you're just beginning your walk with God or looking to deepen your understanding, this comprehensive program provides the building blocks for a thriving spiritual life. Our experienced instructors guide participants through timeless biblical truths that have transformed lives across generations.
          </p>

          {/* Program Details (stacked) */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Program Details</h3>
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h4 className="font-semibold text-gray-900">Duration & Schedule</h4>
              <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                <li>Length: 4–8 weeks (Standard), or 5–7 days (Accelerated)</li>
                <li>Frequency: Quarterly</li>
                <li>Session Duration: 3 to 4 hours</li>
                <li>Format: Interactive teaching with Q & A sessions</li>
                <li>Prerequisites: None</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h4 className="font-semibold text-gray-900">Core Curriculum</h4>
              <p className="mt-3 text-gray-700 text-base sm:text-lg">The Foundation Class curriculum explores fundamental Christocentric teachings, basic biblical principles from the perspective of the New Testament, and the core values that define us as a Church. Topics covered under the LFC include (but are not limited to) the following:</p>
              <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                <li>The Core values, Mission & Vision of the Church</li>
                <li>Salvation, Good works & Dead works</li>
                <li>Spiritual Gifts</li>
                <li>Effective Christocentric prayers</li>
                <li>The Principles of Honor</li>
              </ul>
            </div>
          </div>

          {/* Learning Outcomes (left-accent items) */}
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold">Learning Outcomes</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">Our Foundation Class is designed with specific, measurable outcomes that ensure every participant leaves equipped for continued spiritual growth and effective Christian living.</p>

            <div className="mt-6 space-y-8">
              {/* Spiritual Foundation */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900">Spiritual Foundation</h4>
                <p className="mt-2 text-gray-700">Develop a rock-solid understanding of core Christian beliefs, biblical authority, and the nature of God that will anchor your faith through life's challenges.</p>
              </div>

              {/* Spiritual Disciplines */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900">Spiritual Disciplines</h4>
                <p className="mt-2 text-gray-700">Establish consistent, life-giving practices of prayer, Bible study, and worship that will fuel your ongoing relationship with God.</p>
              </div>

              {/* Community Integration */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900">Community Integration</h4>
                <p className="mt-2 text-gray-700">Understand your vital role in the body of Christ and develop meaningful connections within the church community.</p>
              </div>

              {/* Evangelistic Confidence */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900">Evangelistic Confidence</h4>
                <p className="mt-2 text-gray-700">Gain the knowledge and confidence to naturally share your faith story and the gospel message with others in your sphere of influence.</p>
              </div>

              {/* Continued Growth Path */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-full"></div>
                <h4 className="font-semibold text-gray-900">Continued Growth Path</h4>
                <p className="mt-2 text-gray-700">Be fully prepared and excited to continue your spiritual journey through our Discipleship Class and other advanced training opportunities.</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Who Should Attend</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              {/* New Believers */}
              <div className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-gradient-to-br from-rose-50 to-red-100">
                <div className="h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold mb-4">New</div>
                <h4 className="font-semibold text-gray-900">New Believers</h4>
                <p className="mt-2 text-gray-700">Recently accepted Christ and want to understand the fundamentals of faith</p>
              </div>

              {/* Seekers */}
              <div className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mb-4">?</div>
                <h4 className="font-semibold text-gray-900">Seekers</h4>
                <p className="mt-2 text-gray-700">Exploring Christianity and want to learn more about the faith</p>
              </div>

              {/* Returning Christians */}
              <div className="rounded-2xl p-6 shadow-sm border border-gray-200 bg-gradient-to-br from-green-50 to-emerald-100">
                <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold mb-4">↻</div>
                <h4 className="font-semibold text-gray-900">Returning Christians</h4>
                <p className="mt-2 text-gray-700">Coming back to faith and need to rebuild your spiritual foundation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
