import "remixicon/fonts/remixicon.css";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const Footer = () => {
  const items = [
    {
      icon: <VscHome size={20} />,
      label: "Home",
      onClick: () =>
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <VscAccount size={20} />,
      label: "About Me",
      onClick: () =>
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <VscArchive size={20} />,
      label: "Project",
      onClick: () =>
        document
          .getElementById("project")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  return (
    <footer className="mt-20 py-10 border-t-2 border-yellow-500/40 flex flex-col items-center relative z-10 bg-black/40 backdrop-blur-sm rounded-t-[3rem]">
      <div className="w-full max-w-7xl px-6 flex flex-col md:flex-row items-center md:justify-between gap-8">
        {/* Logo/Title */}
        <h1 className="text-2xl font-bold order-1 md:order-none tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
          Pokpong<span className="text-yellow-400">.dev</span>
        </h1>

        {/* Social Icons */}
        <div className="flex gap-5 order-2 md:order-none text-yellow-600">
          <a
            href="https://github.com/rissss21"
            className="hover:text-yellow-400 hover:-translate-y-1 transition-all"
          >
            <i className="ri-github-fill ri-xl"></i>
          </a>
          <a
            href="https://www.instagram.com/farisedrikprayoga/"
            className="hover:text-yellow-400 hover:-translate-y-1 transition-all"
          >
            <i className="ri-instagram-fill ri-xl"></i>
          </a>
          <a
            href="https://www.youtube.com/@FarisEdrikPrayoga"
            className="hover:text-yellow-400 hover:-translate-y-1 transition-all"
          >
            <i className="ri-youtube-fill ri-xl"></i>
          </a>
        </div>

        {/* Mac OS Style Dock */}
        <div className="order-3 md:order-none mt-4 md:mt-0">
          <Dock
            items={items}
            panelHeight={45}
            baseItemSize={50}
            magnification={80}
          />
        </div>
      </div>
      <p className="mt-10 text-yellow-600/60 text-sm text-center w-full">
        © {new Date().getFullYear()} Pokpong. All rights reserved. 💛
      </p>
    </footer>
  );
};

export default Footer;
