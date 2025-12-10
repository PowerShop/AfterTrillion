'use client';

import { generateAllSuffixes, NumberData } from '@/lib/suffixGenerator';
import { useMemo } from 'react';

export default function Home() {
  // Generate all suffixes
  const numberData = useMemo(() => generateAllSuffixes(), []);
  
  // Highlight exponent (10^129 - the user's current level)
  const highlightExponent = 129;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Idle Game Number Reference
          </h1>
          <p className="text-gray-300 text-lg">
            Complete suffix table from 10³ (Thousand) to 10³⁰³ (Centillion)
          </p>
          <div className="mt-4 inline-block bg-purple-800/30 border border-purple-500/50 rounded-lg px-6 py-3">
            <p className="text-sm text-purple-300">
              🎯 <span className="font-semibold">Current Level:</span> 10¹²⁹ (dQDR - Duoquadragintillion)
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
            <h2 className="text-2xl font-bold">Number Suffix Reference Table</h2>
          </div>

          {/* Scrollable Table */}
          <div className="overflow-auto max-h-[70vh]">
            <table className="w-full">
              <thead className="bg-gray-900 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider border-b border-gray-700">
                    Scientific Notation
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider border-b border-gray-700">
                    Game Suffix
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider border-b border-gray-700">
                    Full Name
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {numberData.map((data: NumberData) => {
                  const isHighlighted = data.exponent === highlightExponent;
                  
                  return (
                    <tr
                      key={data.exponent}
                      className={`
                        transition-all duration-200
                        ${isHighlighted 
                          ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 border-l-4 border-purple-400 shadow-lg shadow-purple-500/50' 
                          : 'hover:bg-gray-700/30'
                        }
                      `}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`font-mono text-sm ${isHighlighted ? 'text-purple-200 font-bold' : 'text-gray-300'}`}>
                            {data.scientific}
                          </span>
                          {isHighlighted && (
                            <span className="ml-3 px-2 py-1 bg-purple-500 text-white text-xs rounded-full font-semibold animate-pulse">
                              YOU ARE HERE
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-bold text-lg ${isHighlighted ? 'text-pink-300 text-xl' : 'text-purple-400'}`}>
                          {data.suffix}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${isHighlighted ? 'text-white font-semibold' : 'text-gray-300'}`}>
                          {data.fullName}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Total entries: {numberData.length}</span>
              <span>Range: 10³ to 10³⁰³</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <h3 className="font-bold text-purple-400 mb-2">Tier 1: Standard</h3>
            <p className="text-gray-300">k, M, B, T (10³ to 10¹²)</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <h3 className="font-bold text-purple-400 mb-2">Tier 2: Short Form</h3>
            <p className="text-gray-300">Single letters: q, Q, s, S, O, N, d (10¹⁵ to 10³³)</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <h3 className="font-bold text-purple-400 mb-2">Tier 3: Compound Latin</h3>
            <p className="text-gray-300">Prefix + Root format (10³⁶ to 10³⁰³)</p>
          </div>
        </div>
      </div>
    </main>
  );
}
