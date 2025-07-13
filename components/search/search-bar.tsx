'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = "Search..." }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative transition-all duration-200 ${
      isFocused ? 'ring-2 ring-green-500' : ''
    }`}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none text-lg"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}