'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MapPin, Search } from 'lucide-react';
import { getSavedZip, saveZipToSession } from '@/lib/zipLookup';

export default function ZipSearch({
  className = '',
  inputClassName = '',
  buttonClassName = '',
  compact = false,
  redirectToResults = true,
  onSearch,
  defaultZip = '',
}) {
  const router = useRouter();
  const [zip, setZip] = useState(defaultZip);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!defaultZip && router.query.zip) {
      setZip(String(router.query.zip));
    } else if (!defaultZip) {
      setZip(getSavedZip());
    }
  }, [defaultZip, router.query.zip]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const cleaned = zip.replace(/\D/g, '').slice(0, 5);
    if (cleaned.length !== 5) {
      setError('Please enter a valid 5-digit ZIP code.');
      return;
    }
    setError('');
    saveZipToSession(cleaned);
    if (onSearch) {
      onSearch(cleaned);
      return;
    }
    if (redirectToResults) {
      router.push(`/results?zip=${cleaned}`);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <div className="relative flex-grow flex items-center">
          <MapPin className="absolute left-4 text-teal-600 w-5 h-5" />
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
              setError('');
            }}
            placeholder="Enter your ZIP Code"
            id="zip-input"
            className={`w-full bg-transparent pl-12 pr-4 py-3 outline-none text-gray-800 font-bold placeholder-gray-400 ${inputClassName}`}
          />
        </div>
        {error && <p className="text-red-600 text-sm font-bold mt-2 px-2">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="glass-card p-2 rounded-[2rem] shadow-xl shadow-teal-900/5 flex flex-col sm:flex-row gap-2 max-w-lg">
        <div className="relative flex-grow flex items-center">
          <MapPin className="absolute left-4 text-teal-600 w-5 h-5" />
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
              setError('');
            }}
            placeholder="Enter your ZIP Code"
            id="zip-input"
            className={`w-full bg-transparent pl-12 pr-4 py-3 outline-none text-gray-800 font-bold placeholder-gray-400 ${inputClassName}`}
          />
        </div>
        <button
          type="submit"
          className={`bg-gradient-to-r from-[#00875A] to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center transition-all transform hover:scale-105 whitespace-nowrap ${buttonClassName}`}
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </button>
      </div>
      {error && <p className="text-red-600 text-sm font-bold mt-2">{error}</p>}
    </form>
  );
}
