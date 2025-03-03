import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CharacterSprite from "../CharacterSprite";
import { CHARACTER_CLASSES } from "../../constants/characters";
import { CHARACTER_COLORS } from "../../constants/characterColors";
import useGameStore from '../../store/characterStore';

// Replace the static COLOR_OPTIONS with a function
const getColorOptions = (selectedClass) => {
  if (!selectedClass?.spritesheet?.baseColors) return {};

  const options = {};
  
  Object.entries(selectedClass.spritesheet.baseColors).forEach(([part, baseColors]) => {
    // Create a Set to track unique color values
    const uniqueColors = new Set();
    
    // Start with the character's actual default color
    const defaultOption = {
      value: `#${baseColors[0]}`,
      scheme: "default"
    };
    uniqueColors.add(defaultOption.value);
    
    // Initialize the array with the default color
    options[part] = [defaultOption];
    
    // Add colors from CHARACTER_COLORS if they're not already included
    if (CHARACTER_COLORS[part]) {
      Object.entries(CHARACTER_COLORS[part]).forEach(([key, colors]) => {
        const colorValue = `#${colors[0]}`;
        if (!uniqueColors.has(colorValue)) {
          uniqueColors.add(colorValue);
          options[part].push({
            value: colorValue,
            scheme: key
          });
        }
      });
    }
  });

  return options;
};

const ColorPicker = ({ category, colors, selectedScheme, onSelect, mobile }) => {
  const [page, setPage] = useState(0);
  const colorsPerPage = window.innerWidth >= 1024 ? 16 : 10;
  
  // Reset page when colors change
  useEffect(() => {
    setPage(0);
  }, [colors.length]);

  // Calculate total pages based on the original colors array
  const totalPages = Math.ceil(colors.length / colorsPerPage);
  
  // Get current page colors without any reordering
  const currentColors = [...colors].slice(
    page * colorsPerPage,
    (page + 1) * colorsPerPage
  );

  // Calculate minimum height based on two rows of color options
  const colorSize = mobile ? "2rem" : "2.1rem"; // w-5/h-5 for mobile, w-6/h-6 for desktop
  const gap = "0.25rem"; // gap-1
  const minHeight = `calc((${colorSize} * 2) + ${gap})`;

  return (
    <div className="space-y-1 lg:space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-[0.55rem] lg:text-[1.2rem] font-bold text-[#8B4513] capitalize">
          {category.replace("_", " ")}
        </h4>
        {totalPages > 1 && (
          <div className="flex items-center gap-1 lg:gap-2 lg:pr-1">
            <button
              onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              disabled={page === 0}
              className={`transition-all duration-200 ${
                page === 0 ? "opacity-40" : "hover:scale-110"
              }`}
            >
              <img
                src="/assets/buttons/115_button UI.png"
                alt="Previous"
                className="w-3 lg:w-4 h-3 lg:h-4 -scale-x-100"
              />
            </button>
            <span className="text-[0.45rem] lg:text-[0.8rem] text-[#8B4513]">
              {page + 1}/{totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={page === totalPages - 1}
              className={`transition-all duration-200 ${
                page === totalPages - 1 ? "opacity-40" : "hover:scale-110"
              }`}
            >
              <img
                src="/assets/buttons/115_button UI.png"
                alt="Next"
                className="w-3 lg:w-4 h-3 lg:h-4"
              />
            </button>
          </div>
        )}
      </div>
      <div 
        className="grid grid-cols-5 lg:grid-cols-8 gap-1 lg:gap-1.5" 
        style={{ minHeight }}
      >
        {currentColors.map(({ value, scheme }) => (
          <ColorOption
            key={`${scheme}-${value}`}
            color={value}
            selected={scheme === selectedScheme}
            onClick={() => onSelect(category, scheme)}
          />
        ))}
      </div>
    </div>
  );
};

const ColorOption = ({ color, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-6 h-6 lg:w-8 lg:h-8 rounded-[0.25rem] lg:rounded-lg transition-all duration-200 border-[0.15rem] hover:scale-110
      ${
        selected
          ? "border-[#2A160C] shadow-lg scale-110"
          : "border-white/50 hover:border-[#2A160C]/50"
      }`}
    style={{ backgroundColor: color }}
  />
);

export default function CharacterCreationPanel({ 
  selectedClass, 
  setSelectedClass, 
  selectedColorScheme, 
  setSelectedColorScheme,
  setStats,
  setPointsRemaining
}) {

  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredButtonId, setHoveredButtonId] = useState(null);
  const [prevPage, setPrevPage] = useState(0);

  // Updated to match grid layout
  const classesPerPage = window.innerWidth >= 1024 ? 6 : 4;
  const totalPages = Math.ceil(CHARACTER_CLASSES.length / classesPerPage);
  const currentClasses = CHARACTER_CLASSES.slice(
    currentPage * classesPerPage,
    (currentPage + 1) * classesPerPage
  );

  const handlePageChange = (direction) => {
    setPrevPage(currentPage);  // Store the current page before changing it
    if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Get the category name from color hex
  const getCategoryAndScheme = (color) => {
    color = color.replace("#", "");
    for (const [category, schemes] of Object.entries(CHARACTER_COLORS)) {
      for (const [schemeName, colors] of Object.entries(schemes)) {
        if (colors[0] === color) {
          return { category, scheme: schemeName };
        }
      }
    }
    return null;
  };

  // Handle color selection
  const handleColorSelect = (category, scheme) => {
    setSelectedColorScheme((prev) => ({
      ...prev,
      [category]: scheme,
    }));
  };

  const getColorMap = () => {
    const character = CHARACTER_CLASSES.find((c) => c.id === selectedClass.id);
    if (!character?.spritesheet?.baseColors) return {};

    const colorMap = {};

    Object.entries(character.spritesheet.baseColors).forEach(([part, baseColors]) => {
      const selectedScheme = selectedColorScheme[part];
      
      // If default is selected, use the character's own base colors
      const newColors = selectedScheme === "default" 
        ? baseColors  // Use character's base colors directly
        : CHARACTER_COLORS[part][selectedScheme];  // Use colors from COLOR_COLORS for other schemes

      if (baseColors && newColors) {
        baseColors.forEach((baseColor, index) => {
          colorMap[baseColor] = selectedScheme === "default" 
            ? baseColor  // Keep original color for default
            : newColors[index];  // Use new color for other schemes
        });
      }
    });

    return colorMap;
  };

  // Instead, only initialize new color parts when class changes
  useEffect(() => {
    setSelectedColorScheme(prevSchemes => {
      const newSchemes = { ...prevSchemes };
      if (selectedClass?.spritesheet?.baseColors) {
        Object.keys(selectedClass.spritesheet.baseColors).forEach(part => {
          if (!newSchemes[part]) {
            newSchemes[part] = "default";
          }
        });
      }
      return newSchemes;
    });
  }, [selectedClass]);

  // Add useEffect to update store whenever selectedClass or selectedColorScheme changes
  useEffect(() => {
    const data = {
      selectedClassId: selectedClass.id,
      colorSchemes: selectedColorScheme
    };
    useGameStore.getState().setCharacterCreation(data);
  }, [selectedClass.id, selectedColorScheme]);

  const handleClassSelect = (characterClass) => {
    setSelectedClass(characterClass);
    
    // Reset stats to the new class defaults
    const initialStats = {};
    Object.entries(characterClass.baseStats).forEach(([stat, value]) => {
      initialStats[stat] = value;
    });
    setStats(initialStats);
    setPointsRemaining(8);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 h-full">
      {/* Top Section - Mobile Layout */}
      <div className="flex flex-row lg:hidden gap-2 h-32">
        {/* Character Preview */}
        <div className="w-[50%] min-w-[50%] aspect-square">
          <div className="h-full bg-[#E6D5BC] rounded-lg border-2 border-[#2A160C]/20 flex items-center justify-center group relative overflow-hidden">
            <div className="relative bottom-1 lg:bottom-0">
              <CharacterSprite
                characterId={selectedClass.id}
                action="idle"
                size={window.innerWidth >= 1024 ? "45rem" : "34rem"}
                colorMap={getColorMap()}
              />
            </div>
          </div>
        </div>

        {/* Portrait - Mobile */}
        <div className="w-[50%] bg-[#E6D5BC] rounded-md border border-[#2A160C]/20 overflow-hidden">
          {selectedClass.portrait ? (
            <img 
              src={selectedClass.portrait} 
              alt={`${selectedClass.name} portrait`}
              className="w-[126%] h-[126%] object-contain relative -top-4"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-center text-[#8B4513]/50">
              No portrait
            </div>
          )}
        </div>
      </div>

      {/* Mobile Color Customization */}
      <div className="lg:hidden">
        <div className="bg-[#E6D5BC] rounded-md p-2 border border-[#2A160C]/20">
          <div className="grid grid-cols-2 gap-2 min-h-[12rem]">
            {Object.entries(getColorOptions(selectedClass)).map(([category, colors]) => (
              <ColorPicker
                key={category}
                category={category}
                colors={colors}
                selectedScheme={selectedColorScheme[category]}
                onSelect={handleColorSelect}
                mobile={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Character Preview - Hidden on Mobile */}
      <div className="hidden lg:block lg:w-1/3 aspect-auto">
        <div className="h-full min-w-[23.5rem] bg-[#E6D5BC] rounded-xl border-2 border-[#2A160C]/20 flex items-center justify-center overflow-hidden">
          <div className="relative bottom-0 lg:bottom-14">
            <CharacterSprite
              characterId={selectedClass.id}
              action="idle"
              size="43rem"
              colorMap={getColorMap()}
            />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-2/3 flex flex-col gap-2 lg:gap-4">
        {/* Class Selection */}
        <div className="flex flex-col gap-2 lg:gap-4">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: prevPage < currentPage ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prevPage < currentPage ? 150 : -150 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-4 lg:grid-cols-6 gap-1.5 lg:gap-3 bg-[#E6D5BC] border border-[#2A160C]/20 rounded-lg lg:rounded-xl p-2 lg:p-4"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(velocity.x) * offset.x;
                  if (swipe < -1000 && currentPage < totalPages - 1) {
                    handlePageChange("next");
                  } else if (swipe > 1000 && currentPage > 0) {
                    handlePageChange("prev");
                  }
                }}
              >
                {currentClasses.map((characterClass) => (
                  <button
                    key={characterClass.id}
                    onClick={() => handleClassSelect(characterClass)}
                    onMouseEnter={() => setHoveredButtonId(characterClass.id)}
                    onMouseLeave={() => setHoveredButtonId(null)}
                    className={`relative aspect-square rounded-md lg:rounded-lg overflow-hidden transition-all duration-200
                      ${
                        selectedClass.id === characterClass.id
                          ? "bg-[#c6b59a] border border-[#2A160C]/20 lg:border-2 shadow-lg"
                          : "bg-[#E6D5BC] border border-[#2A160C]/20 lg:border-2 hover:bg-[#2A160C]/5 hover:border-[#2A160C]/40"
                      }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`scale-[0.5] lg:scale-[0.65] transition-transform duration-200 relative top-1 ${
                          selectedClass.id === characterClass.id ||
                          hoveredButtonId === characterClass.id
                            ? "scale-[0.55] lg:scale-[0.7]"
                            : "hover:scale-[0.53] lg:hover:scale-[0.68]"
                        }`}
                      >
                        <CharacterSprite
                          characterId={characterClass.id}
                          action="idle"
                          size={window.innerWidth >= 1024 ? "16rem" : "32rem"}
                          colorMap={
                            selectedClass.id === characterClass.id 
                              ? getColorMap()
                              : undefined
                          }
                          isDisabled={selectedClass.id !== characterClass.id && hoveredButtonId !== characterClass.id}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Adjusted for mobile */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 -mt-4 relative top-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPrevPage(currentPage);
                    if (index > currentPage) {
                      handlePageChange("next");
                    } else if (index < currentPage) {
                      handlePageChange("prev");
                    }
                  }}
                  className={`w-6 h-1 rounded-full transition-all duration-200 my-2 lg:my-0 ${
                    currentPage === index 
                      ? "bg-[#2A160C] scale-110" 
                      : "bg-[#2A160C]/20 hover:bg-[#2A160C]/40"
                  }`}
                  aria-label={`Page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Class Description - More compact on mobile */}
        <div className="bg-[#E6D5BC] rounded-md lg:rounded-lg p-2 lg:p-4 border border-[#2A160C]/20 lg:border-2 h-full">
          <h3 className="text-[0.65rem] lg:text-[1.3rem] font-bold text-[#2A160C] mb-1 lg:mb-2">
            {selectedClass.name}
          </h3>
          <p className="text-[0.55rem] lg:text-[1.2rem] text-[#8B4513]">
            {selectedClass.description}
          </p>
        </div>

        {/* Desktop Color Customization */}
        <div className="hidden lg:block">
          <div className="bg-[#E6D5BC] rounded-md lg:rounded-xl p-2 lg:p-4 border border-[#2A160C]/20 lg:border-2">
            <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:min-h-[15rem]">
              {Object.entries(getColorOptions(selectedClass)).map(([category, colors]) => (
                <ColorPicker
                  key={category}
                  category={category}
                  colors={colors}
                  selectedScheme={selectedColorScheme[category]}
                  onSelect={handleColorSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
