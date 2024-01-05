import React, { useState } from "react";

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      setTags([...tags, input]);
      setInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex items-center">
      <div className="flex flex-wrap"> {/* Container para as Tags */}
        {tags.map((tag, index) => (
          <span key={index} className="mr-2 mb-2 mt-z py-1 px-2 bg-purple-200 rounded-xl">
            {tag}
            <button onClick={() => removeTag(index)} className="ml-1 text-red-500">
              x
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        style={{ width: '200px' }}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="flex-1 ml-2 focus:outline-none focus:border-none bg-gray-200 rounded-xl py-1 px-2 mt-2"
        placeholder="Pressione Enter para adicionar uma tag"
      />
    </div>
  );
};

export default TagsInput;
