import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "../Components/Footer";

const Gallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  // Fetch JSON data
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setAllImages(data);
        setFilteredImages(data);
const uniqueCategories = ["All", ...new Set(data.map((item) => item.category).filter((cat) => cat.toLowerCase() !== "recommended"))];

        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Filter images by selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(allImages.filter((img) => img.category === selectedCategory));
    }
  }, [selectedCategory, allImages]);

  // Modal controls
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, filteredImages.length]);

  return (
    <div className="container mx-auto px-4 pt-12 space-y-20 bg-gradient-to-b from-rose-100 to-cyan-100">
      <span className="flex text-8xl justify-center">
        <span className="text-emerald-900 merienda">Photo</span>
        <span className="text-rose-800 philosopher-regular-italic mt-5">Gallery</span>
      </span>
      <p className="text-center text-gray-600 text-4xl mt-8 mb-5 mx-auto great-vibes-regular">
        Discover breathtaking destinations, unforgettable moments, and the beauty of travel through our curated gallery.
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg group cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
              <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium drop-shadow-lg">{image.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Carousel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="max-w-4xl max-h-[80vh] relative text-center">
            <img
              src={filteredImages[currentImageIndex]?.image}
              alt={filteredImages[currentImageIndex]?.title}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            <p className="text-white mt-4 text-lg">{filteredImages[currentImageIndex]?.title}</p>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20"
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

      <Footer />
    </div>
  );
};

export default Gallery;
