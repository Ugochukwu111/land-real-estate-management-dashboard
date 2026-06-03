import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function DropDown({
  list = [],
  selected,
  setSelected,
  multiple = false,
  placeholder = "Select option",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleSelect = (opt) => {
    if (multiple) {
      const current = Array.isArray(selected) ? selected : [];

      const alreadySelected = current.includes(opt);

      const newValue = alreadySelected
        ? current.filter((item) => item !== opt) // remove
        : [...current, opt]; // add

      setSelected(newValue);
    } else {
      setSelected(opt);
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="dropdown">
      <button
        type="button"
        className="dropdown-trigger flex items-center gap-3"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* display value */}
        {multiple ? (
          Array.isArray(selected) && selected.length > 0 ? (
            selected.join(", ")
          ) : (
            <span className="text-muted">{placeholder}</span>
          )
        ) : (
          selected || <span className="text-muted">{placeholder}</span>
        )}

        <ChevronDown className="text-muted" size={18} />
      </button>

      <ul className={`dropdown-menu ${open ? "show" : ""}`}>
        {list.map((opt) => (
          <li key={opt} onClick={() => handleSelect(opt)}>
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}
