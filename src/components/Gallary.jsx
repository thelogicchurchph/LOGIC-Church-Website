import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'animate.css'

// Custom styles for clean slider
const customStyles = `
.swiper-simple-gallery {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}
.swiper-simple-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 1rem;
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

import api, { getAssetUrl } from '../api/axios'

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
                Experience the joy, worship, and vibrant community life that defines our church family.
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

                {/* Swiper Container */}
                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl h-80 md:h-96 rounded-2xl shadow-xl overflow-hidden relative">
                  {loading ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-2xl">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mb-3"></div>
                      <p className="text-sm text-gray-400">Loading gallery...</p>
                    </div>
                  ) : !loading && images.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 shadow-sm p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-700 mb-2">Check Back Later</h3>
                      <p className="text-sm text-gray-500">We are currently curating amazing moments for our gallery.</p>
                    </div>
                  ) : (
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                    }}
                    grabCursor={true}
                    modules={[Navigation, Pagination, Autoplay]}
                    className="swiper-simple-gallery bg-gray-900"
                    onSwiper={setSwiper}
                    style={{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                    }}
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index} className="w-full h-full">
                        <div className="w-full h-full relative">
                          <img
                            src={image.image_url ? getAssetUrl(image.image_url) : image.src}
                            alt={image.alt || "Church gallery image"}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  )}
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
