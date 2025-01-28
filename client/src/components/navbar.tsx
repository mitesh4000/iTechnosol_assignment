import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGlowPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <nav className="relative bg-[#424242] rounded-xl p-4 m-2 overflow-hidden">
      <div
        className="absolute inset-0 blur-3xl"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(72, 207, 203, 0.3), transparent 30%)`,
        }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?semt=ais_hybrid"
            alt="logo"
            className="w-10 h-10 rounded-full border-2 border-[#48CFCB]"
            width={40}
            height={40}
          />
          <span className="text-[#F5F5F5] font-bold text-xl hidden sm:inline">
            Mitesh Maurya
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-[#229799] rounded-full px-3 py-1">
            <LogOut className="w-5 h-5 text-[#F5F5F5]" />
            <span className="text-[#F5F5F5]">Logout</span>
          </div>
          <button
            className="md:hidden text-[#F5F5F5] focus:outline-none cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <a
            href="#"
            className="block text-[#F5F5F5] hover:text-[#48CFCB] transition-colors py-2"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-[#F5F5F5] hover:text-[#48CFCB] transition-colors py-2"
          >
            About
          </a>
          <a
            href="#"
            className="block text-[#F5F5F5] hover:text-[#48CFCB] transition-colors py-2"
          >
            Services
          </a>
          <a
            href="#"
            className="block text-[#F5F5F5] hover:text-[#48CFCB] transition-colors py-2"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
