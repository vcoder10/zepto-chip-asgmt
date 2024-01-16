import React, { useState } from "react";
import { data } from "../constants/itemlist";
const Searchbar = () => {
  const [input, setInput] = useState("");
  const [chipItems, setChipItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [availableItems, setAvailableItems] = useState(data);
  console.log("rendering...");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setChipItems([...chipItems, input]);
      //data = data.filter((item) => item !== input);
      setInput("");
      console.log("enter");
    }
  };
  const handleRemove = (chip) => {
    setAvailableItems([...availableItems, chip]);
    setChipItems(chipItems.filter((item, index) => item !== chip));
  };
  const handleAddItem = (suggestedItem) => {
    setChipItems([...chipItems, suggestedItem]);
    setInput("");
    setAvailableItems(availableItems.filter((item) => item !== suggestedItem));
    setShowSuggestions(false);
  };
  const filterItems = (searchText) => {
    return availableItems.filter((item) =>
      item.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };
  return (
    <div>
      <div className="flex flex-wrap m-2">
        {chipItems.map((item, index) => (
          <div
            className="px-2 py-2 m-1 text-black bg-gray-200 rounded-lg"
            key={index}
          >
            {item}
            <button className="px-1 py-1 " onClick={() => handleRemove(item)}>
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        placeholder="Search..."
        className="w-full p-2 rounded-lg"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => setShowSuggestions(true)}
        // onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && (
        <div className="flex flex-col mt-2 bg-white rounded-lg shadow-lg">
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