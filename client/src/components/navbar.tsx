import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import CustomIconButton from "./customIconButton";

export default function Navbar() {
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
          background: `radial-gradient(circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(190, 242, 100, 0.3), transparent 30%)`,
        }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?semt=ais_hybrid"
            alt="logo"
            className="w-10 h-10 rounded-full border-2 border-lime-400"
            width={40}
            height={40}
          />
          <span className="text-[#F5F5F5] font-bold text-xl">
            Mitesh Maurya
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="sm:flex items-center space-x-2 bg-lime-400 hover:bg-lime-500 rounded-full px-3 py-1">
            <CustomIconButton>
              <LogOut className="w-5 h-5 text-white" />
            </CustomIconButton>
            <span className="hidden sm:block text-[#F5F5F5]">Logout</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
