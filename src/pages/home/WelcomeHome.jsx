import React from 'react'
import { Favorite, ConnectWithoutContact, Public } from '@mui/icons-material'
import 'animate.css'

const welcomeData = [
  {
    title: "Love",
    desc: "What we preach — the message of grace, truth, and Jesus.",
    icon: <Favorite className="text-6xl" />,
    gradient: "from-red-500 to-pink-500",
    bgGradient: "from-red-500/10 to-pink-500/10",
    borderGradient: "from-red-500/30 to-pink-500/30"
  },
  {
    title: "Life", 
    desc: "What we give — a family where you grow, belong, and flourish.",
    icon: <ConnectWithoutContact className="text-6xl" />,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    borderGradient: "from-blue-500/30 to-cyan-500/30"
  },
  {
    title: "Impact",
    desc: "What we do — transforming lives and communities by the Spirit.",
    icon: <Public className="text-6xl" />,
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-500/10 to-indigo-500/10",
    borderGradient: "from-purple-500/30 to-indigo-500/30"
  }
]

export default function WelcomeHome() {
  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 animate__animated animate__fadeInUp text-white">
            Welcome to{' '}
            <span className="bg-gradient-red bg-clip-text text-transparent">
              The LOGIC Church
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
            We are a Word-based, Spirit-filled family where the Love Of God In Christ is lived out daily. 
            Here, you'll grow in grace, experience true worship, build real relationships, and encounter the power of God.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {welcomeData.map((item, index) => (
            <div
              key={item.title}
              className={`relative group overflow-hidden rounded-3xl p-8 backdrop-blur-sm border transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate__animated animate__fadeInUp bg-gradient-to-br ${item.bgGradient} border-gradient-to-r ${item.borderGradient} hover:shadow-2xl hover:shadow-white/10`}
              style={{
                animationDelay: `${(index + 2) * 0.3}s`
              }}
            >
              {/* Glowing effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl`}></div>
              
              {/* Icon */}
              <div className="relative flex justify-center mb-8">
                <div className={`p-6 rounded-full bg-gradient-to-br ${item.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className={`text-3xl font-black text-center mb-6 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 text-center leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300">
                {item.desc}
              </p>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 opacity-10">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.gradient} blur-lg`}></div>
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-12 opacity-10">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.gradient} blur-lg`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
