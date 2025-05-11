import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Footer } from "../Components/Footer"

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [filteredImages, setFilteredImages] = useState([])

  // Sample image data with categories
  const images = [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Mountain landscape with snow peaks",
      category: "mountains",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Tropical beach with palm trees",
      category: "beaches",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Ancient temple ruins",
      category: "temples",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Historic monument",
      category: "monuments",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Mountain valley view",
      category: "mountains",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Sandy beach sunset",
      category: "beaches",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Buddhist temple",
      category: "temples",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Famous city monument",
      category: "monuments",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Mountain hiking trail",
      category: "mountains",
    },
    {
      id: 10,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Secluded beach cove",
      category: "beaches",
    },
    {
      id: 11,
      src: "/placeholder.svg?height=600&width=800",
      alt: "Hindu temple architecture",
      category: "temples",
    },
    {
      id: 12,
      src: "/placeholder.svg?height=600&width=800",
      alt: "War memorial monument",
      category: "monuments",
    },
  ]

  // Categories for filter buttons
  const categories = [
    { id: "all", label: "All" },
    { id: "mountains", label: "Mountains" },
    { id: "beaches", label: "Beaches" },
    { id: "temples", label: "Temples" },
    { id: "monuments", label: "Monuments" },
  ]

  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(images)
    } else {
      setFilteredImages(images.filter((image) => image.category === selectedCategory))
    }
  }, [selectedCategory])

  // Open modal with selected image
  const openModal = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    // Re-enable scrolling
    document.body.style.overflow = "auto"
  }

  // Navigate to next image in carousel
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1))
  }

  // Navigate to previous image in carousel
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1))
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return

      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") closeModal()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, filteredImages.length])

  return (
    <div className="container mx-auto px-4 pt-12 gap-20 space-y-20 bg-gradient-to-b from-rose-100 to-cyan-100">
      <span className="flex text-8xl w-full flex justify-center">
            <span className="text-emerald-900 merienda ">Photo</span>
            <span className="text-rose-800 philosopher-regular-italic mt-5">Gallery</span>
          </span>
          <p className="text-center text-gray-600 text-4xl  mt-8 mb-5 mx-auto  great-vibes-regular">
  Discover breathtaking destinations, unforgettable moments, and the beauty of travel through our curated gallery.
</p>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === category.id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-200"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg group cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
              <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium drop-shadow-lg">{image.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal/Carousel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="max-w-4xl max-h-[80vh] relative">
            <img
              src={filteredImages[currentImageIndex]?.src || "/placeholder.svg"}
              alt={filteredImages[currentImageIndex]?.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="text-white text-center mt-4">{filteredImages[currentImageIndex]?.alt}</p>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1">
            {filteredImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${currentImageIndex === index ? "bg-white" : "bg-gray-500"}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    
    
    <Footer></Footer>
    
    </div>
  )
}

export default Gallery
