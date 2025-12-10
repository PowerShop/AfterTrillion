'use client';

import { generateNumberData, NumberData, getSuffix, getFullName, parseFromSuffix } from '@/lib/suffixGenerator';
import { useState, useRef, useCallback, useEffect } from 'react';

export default function Home() {
  // Infinite scroll state
  const [displayedData, setDisplayedData] = useState<NumberData[]>([]);
  const [currentExponent, setCurrentExponent] = useState(3);
  const ITEMS_PER_LOAD = 30;
  
  // Power input state
  const [powerInput, setPowerInput] = useState('');
  const [highlightExponent, setHighlightExponent] = useState<number | null>(129);
  const highlightRef = useRef<HTMLTableRowElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  // Load initial data
  useEffect(() => {
    loadMoreItems();
  }, []);

  // Load more items
  const loadMoreItems = useCallback(() => {
    if (isLoadingRef.current) return;
    
    isLoadingRef.current = true;
    
    // Generate next batch of data
    const newItems = generateNumberData(currentExponent, ITEMS_PER_LOAD);
    
    if (newItems.length > 0) {
      setDisplayedData(prev => [...prev, ...newItems]);
      setCurrentExponent(currentExponent + (ITEMS_PER_LOAD * 3));
    }
    
    setTimeout(() => {
      isLoadingRef.current = false;
    }, 100);
  }, [currentExponent]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoadingRef.current) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreItems]);

  // Handle power input
  const handlePowerSearch = () => {
    const input = powerInput.trim();
    
    if (!input) {
      alert('กรุณากรอกข้อมูล');
      return;
    }

    let roundedExponent: number;

    // Check if input contains letters (suffix format)
    if (/[a-zA-Z]/.test(input)) {
      // Parse from suffix
      const exponent = parseFromSuffix(input);
      
      if (exponent === null) {
        alert('ไม่พบ suffix ที่ตรงกัน! ลองใช้ k, M, B, T, dQDR, aa, ab เป็นต้น');
        return;
      }
      
      roundedExponent = exponent;
    } else {
      // Parse as number
      const power = parseFloat(input);
      
      if (isNaN(power) || power < 0) {
        alert('กรุณากรอกตัวเลขที่ถูกต้อง');
        return;
      }

      // Calculate the exponent from the power value
      const exponent = Math.floor(Math.log10(power));
      
      // Round to nearest multiple of 3
      roundedExponent = Math.floor(exponent / 3) * 3;
      
      if (roundedExponent < 3) {
        alert('ค่าพลังต่ำเกินไป! กรุณากรอกค่าที่มากกว่า 1,000');
        return;
      }
    }

    setHighlightExponent(roundedExponent);
    
    // Load data up to the highlighted item if not loaded yet
    const targetIndex = displayedData.findIndex(d => d.exponent === roundedExponent);
    if (targetIndex === -1 || roundedExponent >= currentExponent) {
      // Calculate how many items needed
      const itemsNeeded = Math.ceil((roundedExponent - 3) / 3) + 10;
      const newData = generateNumberData(3, itemsNeeded);
      setDisplayedData(newData);
      setCurrentExponent(3 + (itemsNeeded * 3));
    }
  };

  // Scroll to highlighted position
  const scrollToHighlight = () => {
    if (highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            ตารางอ้างอิงตัวเลขเกม Idle
          </h1>
          <p className="text-gray-300 text-lg">
            ตารางคำต่อท้ายตัวเลขครบถ้วนไม่สิ้นสุด - เลื่อนลงเพื่อโหลดเพิ่ม
          </p>
        </div>

        {/* Power Input Section */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-300">🔍 ค้นหาตำแหน่งจากค่าพลังหรือ Suffix</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={powerInput}
                onChange={(e) => setPowerInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePowerSearch()}
                placeholder="กรอกค่าพลัง (1.5e129) หรือ suffix (dQDR, aa, ab)"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handlePowerSearch}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
              >
                ค้นหา
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              💡 ตัวอย่าง: <span className="text-purple-300">dQDR</span>, <span className="text-purple-300">1.5dQDR</span>, <span className="text-purple-300">aa</span>, <span className="text-purple-300">5.2ab</span>, <span className="text-purple-300">1e129</span>
            </div>
            {highlightExponent && (
              <div className="mt-4 p-4 bg-purple-900/30 border border-purple-500/50 rounded-lg">
                <p className="text-sm text-purple-200">
                  🎯 <span className="font-semibold">ตำแหน่งปัจจุบัน:</span> 10<sup>{highlightExponent}</sup> ({getSuffix(highlightExponent)} - {getFullName(highlightExponent)})
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
            <h2 className="text-2xl font-bold">ตารางอ้างอิงคำต่อท้ายตัวเลข</h2>
          </div>

          {/* Scrollable Table */}
          <div ref={tableContainerRef} className="overflow-auto max-h-[70vh]">
            <table className="w-full">
              <thead className="bg-gray-900 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider border-b border-gray-700">
                    รูปแบบวิทยาศาสตร์
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider border-b border-gray-700">
                    คำต่อท้ายในเกม
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider border-b border-gray-700">
                    ชื่อเต็ม
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {displayedData.map((data: NumberData) => {
                  const isHighlighted = data.exponent === highlightExponent;
                  
                  return (
                    <tr
                      key={data.exponent}
                      ref={isHighlighted ? highlightRef : null}
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
                              คุณอยู่ที่นี่
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
            
            {/* Loading Indicator */}
            <div ref={observerTarget} className="flex justify-center py-8">
              <div className="flex items-center space-x-2 text-purple-400">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                <span className="text-sm">กำลังโหลดข้อมูล...</span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-gray-900 px-6 py-4 border-t border-gray-700">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>แสดง: {displayedData.length} รายการ</span>
              <span>เลื่อนลงเพื่อโหลดเพิ่ม ∞</span>
            </div>
          </div>
        </div>

        {/* Floating Button to Jump to Current Position */}
        {highlightExponent && (
          <button
            onClick={scrollToHighlight}
            className="fixed bottom-8 right-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 hover:scale-105 flex items-center gap-2 z-50"
          >
            <span className="text-2xl">🎯</span>
            <span>กลับสู่ตำแหน่งปัจจุบัน</span>
          </button>
        )}

        {/* Legend */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <h3 className="font-bold text-purple-400 mb-2">ระดับ 1: มาตรฐาน</h3>
            <p className="text-gray-300">k, M, B, T (10³ ถึง 10¹²)</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <h3 className="font-bold text-purple-400 mb-2">ระดับ 2: รูปแบบสั้น</h3>
            <p className="text-gray-300">ตัวอักษรเดี่ยว: q, Q, s, S, O, N, d (10¹⁵ ถึง 10³³)</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <h3 className="font-bold text-purple-400 mb-2">ระดับ 3: ระบบละตินผสม</h3>
            <p className="text-gray-300">รูปแบบ คำนำหน้า + ราก (10³⁶ ถึง 10³⁰³)</p>
          </div>
        </div>
      </div>
    </main>
  );
}
