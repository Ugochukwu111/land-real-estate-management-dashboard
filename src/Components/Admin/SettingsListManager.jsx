import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

/*
  =========================================================
  SETTINGS LIST MANAGER COMPONENT
  =========================================================

  Reusable component for managing dynamic admin settings.

  Features:
  - Add new items
  - Remove items
  - Prevent duplicates
  - Prevent empty values
  - Reusable for:
      - Locations
      - Documents
      - Amenities
      - Categories
      - Tags
      - Facilities
  =========================================================
*/

export default function SettingsListManager({
  title,
  placeholder,
  items = [],
  setItems,
  icon,
}) {
  /*
    -------------------------------------------------------
    LOCAL STATE
    -------------------------------------------------------
  */

  const [inputValue, setInputValue] = useState("");
  const [errorMgs, setErrorMgs] = useState("");

  /*
    -------------------------------------------------------
    VALIDATION
    -------------------------------------------------------
  */

  const validateItem = (value) => {
    if (value.trim() === "") {
      return "Field cannot be empty";
    }

    const exists = items.some(
      (item) =>
        item.toLowerCase() === value.toLowerCase().trim(),
    );

    if (exists) {
      return `${title} already exists`;
    }

    return "";
  };

  /*
    -------------------------------------------------------
    ADD ITEM
    -------------------------------------------------------
  */

  const handleAddItem = (e) => {
    e.preventDefault();

    const error = validateItem(inputValue);

    if (error) {
      setErrorMgs(error);
      return;
    }

    setItems((prev) => [...prev, inputValue.trim()]);
    setInputValue("");
    setErrorMgs("");
  };

  /*
    -------------------------------------------------------
    REMOVE ITEM
    -------------------------------------------------------
  */

  const handleRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* ================================================= */}
      {/* INPUT SECTION */}
      {/* ================================================= */}

      <form onSubmit={handleAddItem}>
        <div className="flex flex-col input-container">
          {/* LABEL + ERROR */}
          <div className="flex justify-between items-center">
            <label>{title}</label>

            <span className="errorMsg text-fail">
              {errorMgs}
            </span>
          </div>

          {/* INPUT + BUTTON */}
          <div className="flex gap-1 input-wrapper ">
            <div className="input-container  flex-1">
              <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) =>
                  setInputValue(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="btn bg-primary text-inverse"
            >
              add
            </button>
          </div>
        </div>
      </form>

      {/* ================================================= */}
      {/* DESCRIPTION */}
      {/* ================================================= */}

      <p
        className="text-muted"
        style={{
          fontSize: "0.85rem",
          marginBottom: "1rem",
        }}
      >
        These values will appear as selectable options when
        creating a new listing.
      </p>

      {/* ================================================= */}
      {/* ITEMS LIST */}
      {/* ================================================= */}

      <div className="location-list flex flex-col gap-1">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={item}
              className="flex justify-between items-center p-1 bg-light rounded"
              style={{
                border: "1px solid #eee",
                padding: "10px 15px",
              }}
            >
              {/* ITEM */}
              <div className="flex items-center gap-1">
                {icon}

                <span style={{ fontWeight: "500" }}>
                  {item}
                </span>
              </div>

              {/* DELETE */}
              <button
                type="button"
                onClick={() =>
                  handleRemoveItem(index)
                }
                className="text-fail"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-muted">
            No items added yet.
          </p>
        )}
      </div>
    </div>
  );
}