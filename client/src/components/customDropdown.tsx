import { ChevronDownIcon } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";

interface CustomDropdownProps {
  id: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  label,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    const event = {
      target: { name, value: option },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          className="relative w-full bg-gray-100  rounded-md  pl-3 pr-10 py-2 my-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate">{value || "Select an option"}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <motion.div
              animate={{
                rotate: isOpen ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </motion.div>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base  overflow-auto focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby={id}
          >
            {options.map((option, index) => (
              <li
                key={index}
                className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 ${
                  value === option
                    ? "text-blue-900 font-medium"
                    : "text-gray-900"
                }`}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={value === option}
              >
                <span
                  className={`block truncate ${
                    value === option ? "font-semibold" : "font-normal"
                  }`}
                >
                  {option}
                </span>
                {value === option && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
