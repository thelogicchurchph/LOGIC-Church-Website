import React, { useState, useEffect, Suspense } from 'react'
import { PlayArrow } from '@mui/icons-material'
import 'animate.css'
import WelcomeHome from './WelcomeHome'
import EventsHome from './Event'
import Gallary from '../../components/Gallary'


// Tiny base64 placeholder for instant loading
const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNDQ0Ii8+PC9zdmc+"

const heroData = [
    {
    image: '/images/logic1.jpg',
    title: "Welcome to the LOGIC Church Port Harcourt",
    desc: "Here we preach the love of God for Us alone"
  },
  {
    image: '/images/DSC_7881.jpeg',
     title: "Worship in Spirit and Truth",
    desc: "Come as you are and experience the transforming power of worship"
  },
  {
    image: '/images/DSC_1730.jpg',
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },

   {
    image: '/images/DSC_1785.jpg',
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },
   {
    image: '/images/DSC_1869.jpg',
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },
   {
    image: '/images/DSC_3738.jpg',
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },
     {
    image: '/images/DSC_7975.jpeg',
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },

    {
    image: '/images/DSC_9900.jpeg',
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },
  
]

// Fast loading image component with progressive enhancement
const FastImage = ({ src, alt, className, loading, isActive }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(placeholderImage)

  useEffect(() => {
    if (isActive || loading === "eager") {
      // Preload the actual image
      const img = new Image()
      img.onload = () => {
        setCurrentSrc(src)
        setImageLoaded(true)
      }
      img.onerror = () => setImageError(true)
      img.src = src
    }
  }, [src, isActive, loading])

  return (
    <div className="relative w-full h-full">
      {/* Always show placeholder immediately */}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} transition-all duration-500 ${
          imageLoaded ? 'opacity-100 blur-0' : 'opacity-80 blur-sm'
        }`}
        style={{
          filter: imageLoaded ? 'none' : 'blur(2px) brightness(0.8)',
          transform: imageLoaded ? 'scale(1)' : 'scale(1.02)',
        }}
        loading={loading}
        decoding="async"
      />
      
      {/* Loading indicator only for non-loaded images */}
      {/* {!imageLoaded && !imageError && currentSrc === placeholderImage && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
        </div>
      )} */}
    </div>
  )
}

export default function HomeIndex() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [progress, setProgress] = useState(0)

  // Preload next and previous images for instant switching
  useEffect(() => {
    const preloadAdjacentImages = () => {
      const nextIndex = (currentSlide + 1) % heroData.length
      const prevIndex = currentSlide === 0 ? heroData.length - 1 : currentSlide - 1
      
      // Preload next image
      const nextImg = new Image()
      nextImg.src = heroData[nextIndex].image
      
      // Preload previous image
      const prevImg = new Image()
      prevImg.src = heroData[prevIndex].image
    }

    preloadAdjacentImages()
  }, [currentSlide])

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length)
      setDisplayedText('')
      setProgress(0)
    }, 10000)

    return () => clearInterval(slideInterval)
  }, [])

  useEffect(() => {
    const currentDesc = heroData[currentSlide].desc
    let index = 0
    setDisplayedText('')
    
    const textInterval = setInterval(() => {
      if (index < currentDesc.length) {
        setDisplayedText(currentDesc.slice(0, index + 1))
        index++
      } else {
        clearInterval(textInterval)
      }
    }, 50)

    return () => clearInterval(textInterval)
  }, [currentSlide])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [currentSlide])

  return (
    <>
    <Suspense 
      fallback={
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-3 border-white/40 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-lg font-medium">Preparing your experience...</p>
          </div>
        </div>
      }
    >
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Images */}
        {heroData.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <FastImage
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              isActive={index === currentSlide || Math.abs(index - currentSlide) <= 1}
            />
          </div>
        ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Title */}
          <h1 
            key={`title-${currentSlide}`}
            className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight animate__animated animate__fadeInUp"
          >
            {heroData[currentSlide].title}
          </h1>

          {/* Animated Description */}
          <p 
            key={`desc-${currentSlide}`}
            className="text-xl md:text-2xl lg:text-3xl text-gray-200 min-h-[2.5rem] md:min-h-[3rem] animate__animated animate__fadeInUp animate__delay-1s"
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Buttons */}
          <div  className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button className="bg-gradient-red text-white px-8 py-4 animate__animated animate__fadeInUp rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join us this Sunday
            </button>
            <button className="flex items-center gap-2 animate__animated animate__fadeInUp backdrop-blur-sm bg-white/10 border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              <PlayArrow className="text-2xl" />
              Watch Live
            </button>
          </div>
        </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-gradient-red transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Suspense>
    <WelcomeHome />
    <EventsHome />
    <Gallary />
    </>
  )
}
