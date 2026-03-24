import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'
import 'animate.css'

// Custom styles for left-stacked cards
const customStyles = `
.swiper-cards-gallery {
  max-width: 100% !important;
  overflow: visible !important;
}

.swiper-cards-gallery .swiper-cards-container {
  left: 0 !important;
  transform-origin: left center !important;
  max-width: 100% !important;
}

.swiper-cards-gallery .swiper-slide {
  transform-origin: left center !important;
  left: 0 !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

.swiper-cards-gallery .swiper-slide:not(.swiper-slide-active) {
  transform-origin: left center !important;
}

.swiper-cards-gallery .swiper-slide-shadow-cards {
  background: linear-gradient(to right, rgba(0,0,0,0.5), transparent) !important;
}

.swiper-cards-gallery .swiper-wrapper {
  max-width: 100% !important;
}

.swiper-cards-gallery img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}
`

// Import gallery images
import img1 from '/assets/DSC_1709.jpg'
import img2 from '/assets/DSC_1730.jpg'
import img3 from '/assets/DSC_1869.jpg'
import img4 from '/assets/DSC_1975.jpg'
import img5 from '/assets/DSC_2015.jpg'
import img6 from '/assets/DSC_3706.jpg'
import img7 from '/assets/DSC_3716.jpg'

import img8 from '/assets/DSC_3718-2.jpg'
import img9 from '/assets/DSC_6208.jpg'
import img10 from '/assets/DSC_7916.jpeg'
import img11 from '/assets/DSC_7966.jpeg'
import img12 from '/assets/DSC_7975.jpeg'
import img13 from '/assets/DSC_9889.jpeg'
import img14 from '/assets/DSC_9940.jpeg'


const galleryImages = [
  { src: img1, alt: "Church gathering moment 1" },
  { src: img2, alt: "Worship service moment" },
  { src: img3, alt: "Community fellowship" },
  { src: img4, alt: "Church gathering moment 2" },
  { src: img5, alt: "Special church event" },
  { src: img6, alt: "Church gathering moment 3" },
  { src: img7, alt: "Prayer session" },
  { src: img8, alt: "Youth ministry" },
    { src: img9, alt: "Church gathering moment 3" },
  { src: img10, alt: "Prayer session" },
  { src: img11, alt: "Youth ministry" },
    { src: img12, alt: "Church gathering moment 3" },
  { src: img13, alt: "Prayer session" },
  { src: img14, alt: "Youth ministry" },

]

import api from '../api/axios'

export default function Gallary() {
  const [swiper, setSwiper] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await api.get('/gallery')
        setImages(data)
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  return (
    <>
      {/* Inject custom styles */}
      <style>{customStyles}</style>
      
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
        {/* Centered Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight animate__animated animate__fadeInUp text-gray-800">
            <span className="bg-gradient-red bg-clip-text text-transparent">
              GALLERY
            </span>
          </h2>
        </div>

        {/* Main Content - Text Left, Images Right */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Description Text - Left Side */}
          <div className="lg:w-1/2 flex items-center justify-center lg:justify-start">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed animate__animated animate__fadeInUp animate__delay-1s text-center lg:text-left">
              Feed your eyes with our amazing moments, with a smile face
            </p>
          </div>

          {/* Gallery Container - Right Side */}
          <div className="lg:w-1/2 relative max-w-full">
            {/* Overflow container to show stacked cards */}
            <div className="relative w-full" style={{ paddingRight: '43px' }}>
            {/* Custom Navigation Arrows */}
            <div className="hidden md:block">
              <button
                onClick={() => swiper?.slidePrev()}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="text-gray-800 text-2xl" />
              </button>
              <button
                onClick={() => swiper?.slideNext()}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="text-gray-800 text-2xl" />
              </button>
            </div>

            {/* Swiper Container with Stacked Cards Effect */}
             <div className="w-full max-w-md h-90 md:h-80 lg:h-96" style={{ overflow: 'visible' }}>
             <Swiper
             effect="cards"
             grabCursor={true}
             modules={[EffectCards, Navigation, Pagination]}
             className="w-full h-full swiper-cards-gallery"
             onSwiper={setSwiper}
             cardsEffect={{
             perSlideOffset: 6,
             perSlideRotate: 2,
             rotate: true,
             slideShadows: true,
             }}
             style={{
             '--swiper-navigation-color': '#fff',
             '--swiper-pagination-color': '#fff',
             overflow: 'visible'
            }}
            >
                {(images.length > 0 ? images : galleryImages).map((image, index) => (
               <SwiperSlide key={index} className="rounded-2xl overflow-hidden shadow-2xl">
               <div className="w-full h-full relative">
               <img
               src={image.image_url ? (image.image_url.startsWith('http') ? image.image_url : `http://localhost:8000${image.image_url}`) : image.src}
             alt={image.alt || "Church gallery image"}
             className="w-full h-full object-cover object-center"
            />
            </div>
            </SwiperSlide>
            ))}
            </Swiper>
            </div>

              {/* Mobile Swipe Indicator */}
              <div className="md:hidden text-center mt-4">
                <p className="text-sm text-gray-500">Swipe to navigate</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}
