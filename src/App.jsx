import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import Spline from "@splinetool/react-spline";
import AOS from "aos";
import "aos/dist/aos.css";

const listTools = [
  {
    id: 1,
    gambar: "./assets/tools/vscode.png",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: "./assets/tools/reactjs.png",
    nama: "React",
    ket: "Frontend Library",
    dad: "200",
  },
  {
    id: 3,
    gambar: "./assets/tools/tailwind.png",
    nama: "Tailwind",
    ket: "CSS Framework",
    dad: "300",
  },
  {
    id: 4,
    gambar: "./assets/tools/js.png",
    nama: "JavaScript",
    ket: "Language",
    dad: "400",
  },
];

const listProyek = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    title: "E-Commerce Dashboard",
    subtitle: "React & Tailwind CSS",
    fullDescription:
      "A comprehensive e-commerce dashboard with real-time analytics, inventory management, and sales tracking. Features include dynamic charts, product filtering, and customer insights.",
    url: "https://github.com",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    title: "AI Chat Application",
    subtitle: "React, Node.js & WebSocket",
    fullDescription:
      "Real-time chat application with AI-powered message suggestions and sentiment analysis. Supports file sharing, group conversations, and message encryption.",
    url: "https://github.com",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    title: "Mobile Fitness Tracker",
    subtitle: "React Native & Firebase",
    fullDescription:
      "Cross-platform fitness tracking app with workout logging, progress analytics, and social features. Includes integration with wearable devices and health APIs.",
    url: "https://github.com",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    title: "Portfolio Website",
    subtitle: "Next.js, Tailwind & Framer Motion",
    fullDescription:
      "Modern portfolio website with smooth animations, dark mode support, and optimized performance. Features dynamic content management and SEO optimization.",
    url: "https://github.com",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    title: "Project Management Tool",
    subtitle: "Vue.js & MongoDB",
    fullDescription:
      "Collaborative project management platform with Kanban boards, team collaboration, task automation, and real-time notifications.",
    url: "https://github.com",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    title: "Data Visualization Dashboard",
    subtitle: "D3.js & Python Backend",
    fullDescription:
      "Interactive data visualization platform for business intelligence. Displays complex datasets through dynamic charts, maps, and custom reports.",
    url: "https://github.com",
  },
];

AOS.init({ once: true, offset: 50 });

function App() {
  const aboutRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => setSelectedProject(project);
  const handleCloseModal = () => setSelectedProject(null);

  return (
    <>
      {/* พื้นหลัง */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,138,4,0.15),rgba(0,0,0,0))]"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-100 pb-20">
        {/* --- HERO SECTION --- */}
        <div className="hero grid md:grid-cols-2 items-center pt-16 xl:gap-0 gap-10 grid-cols-1 min-h-[85vh]">
          <div className="animate__animated animate__fadeInUp">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-white">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-200 bg-clip-text text-transparent">
                Alzheimer
              </span>
            </h1>

            <p className="mb-10 text-gray-400 text-lg leading-relaxed max-w-lg">
              A passionate application and web developer dedicated to crafting
              modern, elegant digital experiences.
            </p>

            <div className="flex items-center sm:gap-5 gap-3">
              <a
                href="#"
                className="font-bold bg-yellow-500 text-black py-4 px-8 rounded-full shadow-[0_4px_14px_0_rgba(234,179,8,0.39)] hover:bg-yellow-400 hover:shadow-[0_6px_20px_rgba(234,179,8,0.23)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Download CV
              </a>
              <a
                href="#project"
                className="font-semibold bg-transparent py-4 px-8 rounded-full border border-white/20 text-white hover:border-yellow-500 hover:text-yellow-500 transition-colors"
              >
                Explore Projects
              </a>
            </div>
          </div>

          <div className="md:ml-auto w-full max-w-sm mx-auto">
            <ProfileCard
              name=""
              title=""
              handle="Alzheimer_DEV"
              status="Online"
              contactText="Contact Me"
              avatarUrl="./assets/business-man-illustration-ai-generative-png.png"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => (window.location.href = "#contact")}
            />
          </div>
        </div>

        {/* --- ABOUT SECTION --- */}
        <div
          className="mt-20 mx-auto w-full rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-14 relative overflow-hidden shadow-2xl"
          id="about"
          ref={aboutRef}
        >
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10"
            data-aos="fade-up"
          >
            <div className="basis-full md:basis-7/12 md:pr-12 md:border-r border-white/10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                About Me
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                I’m Alzheimer, a full-stack developer passionate about building
                modern, high-performance applications that solve real-world
                problems.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 w-full text-left">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                    20<span className="text-yellow-500">+</span>
                  </h3>
                  <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                    Projects
                  </p>
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                    3<span className="text-yellow-500">+</span>
                  </h3>
                  <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                    Years Exp.
                  </p>
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                    3.81<span className="text-yellow-500 text-2xl">/4</span>
                  </h3>
                  <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">
                    GPA
                  </p>
                </div>
              </div>
            </div>

            {/* 🚀 Spline 3D Model */}
            <div className="basis-full md:basis-5/12 flex justify-center items-center min-h-[400px] md:min-h-[500px] w-full relative">
              <Spline
                scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
              />
            </div>
          </div>
        </div>

        {/* --- TOOLS SECTION --- */}
        <div className="tools mt-40">
          <div className="flex flex-col items-center mb-12" data-aos="fade-up">
            <span className="text-yellow-500 font-semibold tracking-widest uppercase text-sm mb-2">
              Tech Stack
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white">
              Tools & Technologies
            </h2>
          </div>
          <div className="tools-box grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {listTools.map((tool) => (
              <div
                key={tool.id}
                data-aos="fade-up"
                data-aos-delay={tool.dad}
                className="flex items-center gap-5 p-5 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-yellow-500/50 transition-all duration-300 group shadow-lg"
              >
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={tool.gambar}
                    alt={tool.nama}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-200 group-hover:text-yellow-400 transition-colors">
                    {tool.nama}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PROJECTS SECTION --- */}
        <div className="proyek mt-40 py-10" id="project">
          <div className="flex flex-col items-center mb-16" data-aos="fade-up">
            <span className="text-yellow-500 font-semibold tracking-widest uppercase text-sm mb-2">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white">
              Featured Projects
            </h2>
          </div>
          <div
            data-aos="zoom-in"
            className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-4 shadow-2xl"
          >
            <ChromaGrid
              items={listProyek}
              onItemClick={handleProjectClick}
              radius={500}
              damping={0.45}
            />
          </div>
        </div>

        {/* --- CONTACT SECTION --- */}
        <div className="kontak mt-40 mb-32" id="contact">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Let's Work Together
            </h2>
            <p className="text-gray-400">
              Have a project in mind? Send me a message!
            </p>
          </div>
          <div
            className="max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <form
              action="https://formsubmit.co/pokpong.padjunreed@gmail.com"
              method="POST"
              className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl shadow-2xl"
            >
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  name="Name"
                  placeholder="Your Name"
                  className="bg-black/50 border border-white/10 p-4 rounded-xl focus:border-yellow-500 outline-none text-white transition-colors placeholder:text-gray-600"
                  required
                />
                <input
                  type="email"
                  name="Email"
                  placeholder="Your Email Address"
                  className="bg-black/50 border border-white/10 p-4 rounded-xl focus:border-yellow-500 outline-none text-white transition-colors placeholder:text-gray-600"
                  required
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="How can I help you?"
                  className="bg-black/50 border border-white/10 p-4 rounded-xl focus:border-yellow-500 outline-none text-white transition-colors placeholder:text-gray-600 resize-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="mt-4 font-bold text-lg bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl transition-all duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}

export default App;
