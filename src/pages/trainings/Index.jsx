import React from 'react'
import 'animate.css'

export default function TrainingsIndex() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/DSC_7881.jpeg" alt="Training Hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-blue-300 uppercase animate__animated animate__fadeInUp">LOGICAcademy</p>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white animate__animated animate__fadeInUp animate__delay-1s">Explore our discipleship journey</h1>
        </div>
      </section>

      {/* Overview */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">The LOGIC Academy</h2>
          <p className="mt-4 text-gray-700 leading-relaxed max-w-4xl text-base sm:text-lg">
            The LOGIC Academy is a dynamic hub within the Church, dedicated to providing members of the Church with transformative Christocentric training experiences, to create a purposeful and enriching discipleship journey. The Academy has a carefully curated three-step Discipleship programme aimed at guiding members on a transformative journey of faith, towards achieving deeper understanding of the Gospel and other fundamental Christian doctrines - from the foundational understanding of faith, through the nurturing of discipleship, to the training of Ministers.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* LFC Card */}
            <article className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <img src="/assets/DSC_7886.jpeg" alt="LFC" className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">LOGIC Foundation Class</h3>
                <p className="mt-2 text-gray-700">The LOGIC Foundation Class (LFC) is the cornerstone of spiritual development at The LOGIC Church.</p>
                <a href="/trainings/lfc" className="mt-4 inline-flex items-center text-blue-600 font-medium hover:underline">Learn More</a>
              </div>
            </article>

            {/* LDC Card */}
            <article className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <img src="/assets/DSC_7916.jpeg" alt="LDC" className="h-48 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">LOGIC Discipleship Class</h3>
                <p className="mt-2 text-gray-700">Building upon the foundation laid in LFC, The LOGIC Discipleship Class is carefully crafted to prepare participants for effective ministry.</p>
                <a href="/trainings/ldc" className="mt-4 inline-flex items-center text-blue-600 font-medium hover:underline">Learn More</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
