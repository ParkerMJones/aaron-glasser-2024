import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ChevronDown } from "react-feather";

const variants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
};

const Dropdown = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sm:ml-8 mt-2">
      <button
        className={clsx(
          "text-md w-fit rounded-lg px-3 py-2 hover:bg-neutral-200 text-neutral-900 leading-6 flex items-center gap-x-1.5 cursor-pointer",
          isOpen ? "bg-neutral-200" : "bg-transparent"
        )}
        onClick={handleToggle}
      >
        Abstract
        <ChevronDown
          className={clsx(
            "transition-transform duration-500",
            isOpen && "transform rotate-180"
          )}
          size={20}
        />
      </button>
      <motion.div
        className="sm:max-w-[80ch] text-neutral-800 leading-6 sm:leading-7 text-md ml-8 sm:pr-6 mt-4 text-left overflow-auto no-scrollbar"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    </div>
  );
};

export { Dropdown };
