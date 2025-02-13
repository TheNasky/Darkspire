import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CharacterSprite from "../CharacterSprite";

const ITEM_CATEGORIES = {
  POTIONS: 'potions',
  SUPPLIES: 'supplies',
  TOOLS: 'tools',
  SCROLLS: 'scrolls'
};



export default function GeneralStore() {
  const [selectedCategory, setSelectedCategory] = useState(ITEM_CATEGORIES.POTIONS);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const ItemCard = ({ item }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedItem(item)}
      className={`bg-[#E6D5BC] rounded-lg border-2 border-[#2A160C]/20 p-3 cursor-pointer
        hover:bg-[#D4C3AA] transition-all duration-200 ${
        selectedItem?.id === item.id ? 'bg-[#D4C3AA] border-[#2A160C]/40' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.icon}</span>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-[#2A160C] font-bold text-sm">{item.name}</h3>
            <span className="px-2 py-1 rounded bg-[#2A160C]/10 text-[#8B4513] text-xs">
              {item.price} 💰
            </span>
          </div>
          <p className="text-[#8B4513] text-xs mt-0.5">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full flex flex-col p-6">
      {/* Top Section - Merchant Portrait and Info */}
      <div className="flex gap-6 mb-6">
        {/* Merchant Portrait */}
        <div className="w-64 h-64 bg-[#E6D5BC] rounded-lg border-2 border-[#2A160C]/20 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="scale-[2] relative bottom-0">
              <CharacterSprite
                characterId="general_merchant"
                action="idle"
                size="24rem"
                colorMap={{
                  "b07040": "8b0a1a", 
                }}
              />
            </div>
          </div>
        </div>

        {/* Merchant Info & Categories */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#2A160C] mb-4">General Store</h2>
          <p className="text-[#8B4513] mb-6">Welcome to my humble shop, adventurer! Browse my wares and stock up for your journey.</p>
          
          <div className="flex gap-2 flex-wrap">
            {Object.values(ITEM_CATEGORIES).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#2A160C] text-[#E6D5BC]'
                    : 'bg-[#2A160C]/10 text-[#2A160C] hover:bg-[#2A160C]/20'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shop Inventory */}
      <div className="flex-1 bg-[#D4C3AA] border-2 border-[#2A160C]/20 p-4 flex flex-col rounded-lg">
        <h3 className="text-[#2A160C] font-bold mb-3 font-pixel text-sm w-full">Shop Inventory</h3>
        <div className="inline-grid grid-cols-12 grid-rows-6 overflow-hidden border-4 border-[#2A160C]/20 rounded-lg">
          {[...Array(72)].map((_, i) => (
            <div
              key={i}
              className="w-[4.25rem] h-[4.2rem] bg-[#E6D5BC] border border-[#2A160C]/20 
                       hover:bg-[#C4B39A] transition-all duration-200 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
} 