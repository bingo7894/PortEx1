import React, { useState, useEffect, useRef } from "react";
import { FiX, FiGithub } from "react-icons/fi"; // Install react-icons jika belum: npm install react-icons

const ProjectModal = ({ isOpen, onClose, project }) => {
  // State untuk mengontrol animasi penutupan
  const [isClosing, setIsClosing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  // Fungsi untuk menangani penutupan dengan animasi
  const handleClose = () => {
    setIsClosing(true);
    // Tunggu animasi selesai (300ms) sebelum memanggil onClose dari props
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset state untuk pembukaan berikutnya
    }, 300);
  };

  // Handle mouse move untuk efek 3D tilt
  const handleMouseMove = (e) => {
    if (!modalRef.current) return;

    const rect = modalRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  // Mencegah scroll di background saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate 3D rotation based on mouse position
  const rotateX = (mousePosition.y - 0.5) * 5;
  const rotateY = (mousePosition.x - 0.5) * -5;

  return (
    // Overlay
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      {/* Modal Content with 3D effect */}
      <div
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
        className={`relative w-full max-w-lg transform transition-all duration-300 ${isClosing ? "animate-out" : "animate-in"}`}
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isClosing ? "none" : "transform 0.1s ease-out",
        }}
      >
        {/* Glow background layers */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/30 to-yellow-600/20 rounded-2xl blur-xl opacity-30 -z-10"></div>

        {/* Main Modal */}
        <div className="bg-slate-950 border border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden relative group">
          {/* --- PROJECT IMAGE --- */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          <div className="p-8 flex flex-col gap-6 relative">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                  {project.title}
                </h2>
                <p className="text-sm font-medium text-yellow-500/70">
                  {project.subtitle || "Project Details"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-yellow-400 hover:text-yellow-300 transition-all p-2 rounded-lg hover:bg-yellow-500/10 duration-200 flex-shrink-0"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {project.fullDescription}
            </p>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 font-semibold text-black bg-yellow-400 hover:bg-yellow-300 p-3 px-5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/30"
              >
                <FiGithub size={18} />
                <span>View Code</span>
              </a>
              <button
                onClick={handleClose}
                className="px-6 font-semibold text-yellow-400 border border-yellow-500/40 rounded-lg hover:bg-yellow-500/10 hover:border-yellow-500/60 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS untuk animasi */}
      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95) rotateX(10deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes scaleOut {
          from {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
          to {
            transform: scale(0.95) rotateX(-10deg);
            opacity: 0;
          }
        }
        
        .animate-in {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
