import React, { useState } from "react";
import { data } from "../constants/itemlist"; // imported data from constants file

const Searchbar = () => {
  const [input, setInput] = useState("");
  const [chipItems, setChipItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [availableItems, setAvailableItems] = useState(data);
  const [highlightLastChip, setHighlightLastChip] = useState(false);
  console.log("rendering...");

  // add item if i click enter (i will also add new item)
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && input === "" && chipItems.length > 0) {
      e.preventDefault();
      if (highlightLastChip) {
        // If the last chip is highlighted, delete it and move the cursor to the previous chip
        const lastChip = chipItems[chipItems.length - 1];
        handleRemove(lastChip);
      } else {
        // If not highlighted, highlight the last chip
        setHighlightLastChip(true);
      }
    }
  };

  // remove item i click on cross icon
  const handleRemove = (chip) => {
    setAvailableItems([...availableItems, chip]);
    setChipItems(chipItems.filter((item, index) => item !== chip));
    setHighlightLastChip(false);
  };

  // add item if i click on suggested item
  const handleAddItem = (suggestedItem) => {
    setChipItems([...chipItems, suggestedItem]);
    setInput("");
    setAvailableItems(availableItems.filter((item) => item !== suggestedItem));
    setShowSuggestions(false);
  };

  // filter items based on search text
  const filterItems = (searchText) => {
    return availableItems.filter((item) =>
      item.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };
  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="Search..."
        className="w-full p-2 rounded-lg"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 500)}
      />
      <div className="flex flex-wrap m-2">
        {chipItems.map((item, index) => (
          <div
            className={`px-2 py-2 m-1 text-black bg-gray-200 rounded-lg ${
              highlightLastChip && index === chipItems.length - 1
                ? "bg-red-500"
                : ""
            }`}
            key={index}
          >
            {item}
            <button className="px-1 py-1 " onClick={() => handleRemove(item)}>
              ×
            </button>
          </div>
        ))}
      </div>
      {showSuggestions && (
        <div className="flex flex-col mt-2 overflow-y-auto bg-white rounded-lg shadow-lg h-72">
          <ul>
            {filterItems(input).map((filterItem, index) => (
              <li
                className="p-2 px-4 my-1 text-black cursor-pointer hover:bg-gray-200"
                key={index}
                onClick={() => {
                  handleAddItem(filterItem);
                }}
              >
                {filterItem}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
