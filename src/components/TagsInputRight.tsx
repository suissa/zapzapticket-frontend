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
    <div className="flex items-center flex-wrap"> {/* Contêiner Principal com Flex Wrap */}
      <div className="flex flex-wrap mr-2 max-w-lg"> {/* Limite de Largura e Margem */}
        {tags.map((tag, index) => (
          <span key={index} className="mr-2 mb-2 py-1 px-2 bg-purple-100 rounded-xl">
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
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className=""
        placeholder="Pressione Enter para adicionar uma tag"
      />
    </div>
  );
};

export default TagsInput;
