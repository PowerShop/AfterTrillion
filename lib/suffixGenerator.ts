/**
 * Suffix Generator for Idle Game Number Notation
 * Generates suffixes from 10^3 (k) to 10^303 (Centillion)
 */

export interface NumberData {
  exponent: number;
  scientific: string;
  suffix: string;
  fullName: string;
}

/**
 * Generate the game suffix for a given exponent
 */
export function getSuffix(exponent: number): string {
  // Tier 1: Standard suffixes
  if (exponent === 3) return 'k';
  if (exponent === 6) return 'M';
  if (exponent === 9) return 'B';
  if (exponent === 12) return 'T';
  
  // Tier 2: Single letter suffixes (Short)
  if (exponent === 15) return 'q'; // Quadrillion
  if (exponent === 18) return 'Q'; // Quintillion
  if (exponent === 21) return 's'; // Sextillion
  if (exponent === 24) return 'S'; // Septillion
  if (exponent === 27) return 'O'; // Octillion
  if (exponent === 30) return 'N'; // Nonillion
  if (exponent === 33) return 'd'; // Decillion
  
  // Tier 3: Compound Latin System (from 10^36 onwards)
  if (exponent >= 36 && exponent <= 303) {
    // Calculate the position in the Latin system
    // 10^36 is the first compound (Undecillion)
    // Each step increases by 3 in the exponent
    const position = (exponent - 36) / 3;
    
    // Get the units (0-9) and tens (0-9)
    const units = position % 10;
    const tens = Math.floor(position / 10);
    
    // Prefixes for units (1-9)
    const unitPrefixes = ['', 'U', 'd', 't', 'q', 'Q', 's', 'S', 'o', 'n'];
    
    // Roots for tens
    const rootMap: { [key: number]: string } = {
      0: 'Dc',  // Decillion (10^33 base, but compound starts at 36)
      1: 'Vg',  // Vigintillion (10^63)
      2: 'Tg',  // Trigintillion (10^93)
      3: 'QDR', // Quadragintillion (10^123) - SPECIAL CASE
      4: 'Qn',  // Quinquagintillion (10^153)
      5: 'Sx',  // Sexagintillion (10^183)
      6: 'Sp',  // Septuagintillion (10^213)
      7: 'Oc',  // Octogintillion (10^243)
      8: 'No',  // Nonagintillion (10^273)
    };
    
    const prefix = unitPrefixes[units];
    const root = rootMap[tens] || '';
    
    return prefix + root;
  }
  
  return '';
}

/**
 * Generate the full name for a given exponent
 */
export function getFullName(exponent: number): string {
  // Tier 1: Standard names
  if (exponent === 3) return 'Thousand';
  if (exponent === 6) return 'Million';
  if (exponent === 9) return 'Billion';
  if (exponent === 12) return 'Trillion';
  
  // Tier 2: Single letter names
  if (exponent === 15) return 'Quadrillion';
  if (exponent === 18) return 'Quintillion';
  if (exponent === 21) return 'Sextillion';
  if (exponent === 24) return 'Septillion';
  if (exponent === 27) return 'Octillion';
  if (exponent === 30) return 'Nonillion';
  if (exponent === 33) return 'Decillion';
  
  // Tier 3: Compound Latin names
  if (exponent >= 36 && exponent <= 303) {
    const position = (exponent - 36) / 3;
    const units = position % 10;
    const tens = Math.floor(position / 10);
    
    // Unit prefixes for full names
    const unitPrefixNames = [
      '',
      'un',
      'duo',
      'tre',
      'quattuor',
      'quin',
      'sex',
      'septen',
      'octo',
      'novem'
    ];
    
    // Root names for tens
    const rootNames: { [key: number]: string } = {
      0: 'decillion',
      1: 'vigintillion',
      2: 'trigintillion',
      3: 'quadragintillion',
      4: 'quinquagintillion',
      5: 'sexagintillion',
      6: 'septuagintillion',
      7: 'octogintillion',
      8: 'nonagintillion',
    };
    
    const unitPrefix = unitPrefixNames[units];
    const rootName = rootNames[tens] || '';
    
    // Capitalize the first letter
    const fullName = unitPrefix + rootName;
    return fullName.charAt(0).toUpperCase() + fullName.slice(1);
  }
  
  return '';
}

/**
 * Generate suffix for infinite exponents using letter combinations
 * After Centillion (10^303), use: aa, ab, ac, ... az, ba, bb, ... zz, aaa, aab, ...
 */
function getInfiniteSuffix(exponent: number): string {
  // Calculate position after 10^303
  const position = (exponent - 306) / 3;
  
  // Convert number to letter combination (like Excel columns)
  let suffix = '';
  let num = position;
  
  while (num >= 0) {
    suffix = String.fromCharCode(97 + (num % 26)) + suffix;
    num = Math.floor(num / 26) - 1;
  }
  
  return suffix;
}

/**
 * Generate full name for infinite exponents
 */
function getInfiniteFullName(exponent: number): string {
  const position = (exponent - 306) / 3;
  return `Level ${position + 1} (10^${exponent})`;
}

/**
 * Generate number data on demand (infinite generator)
 */
export function generateNumberData(startExp: number, count: number): NumberData[] {
  const data: NumberData[] = [];
  
  for (let i = 0; i < count; i++) {
    const exp = startExp + (i * 3);
    let suffix: string;
    let fullName: string;
    
    if (exp <= 303) {
      // Use original system
      suffix = getSuffix(exp);
      fullName = getFullName(exp);
      
      if (!suffix || !fullName) continue;
    } else {
      // Use infinite system
      suffix = getInfiniteSuffix(exp);
      fullName = getInfiniteFullName(exp);
    }
    
    data.push({
      exponent: exp,
      scientific: `1e${exp}`,
      suffix,
      fullName,
    });
  }
  
  return data;
}

/**
 * Parse suffix and return the exponent
 * Supports formats like: "dQDR", "1.5dQDR", "aa", "5.2ab", etc.
 */
export function parseFromSuffix(input: string): number | null {
  // Remove whitespace
  const trimmed = input.trim();
  
  // Extract suffix part (remove numbers and decimal points from the beginning)
  const suffixMatch = trimmed.match(/([a-zA-Z]+)$/);
  if (!suffixMatch) return null;
  
  const suffix = suffixMatch[1];
  
  // Check Tier 1: Standard suffixes
  const tier1Map: { [key: string]: number } = {
    'k': 3,
    'M': 6,
    'B': 9,
    'T': 12,
  };
  
  if (tier1Map[suffix]) {
    return tier1Map[suffix];
  }
  
  // Check Tier 2: Single letter suffixes
  const tier2Map: { [key: string]: number } = {
    'q': 15,
    'Q': 18,
    's': 21,
    'S': 24,
    'O': 27,
    'N': 30,
    'd': 33,
  };
  
  if (tier2Map[suffix]) {
    return tier2Map[suffix];
  }
  
  // Check Tier 3: Compound Latin System
  // Format: [Prefix][Root]
  const rootMap: { [key: string]: number } = {
    'Dc': 0,   // Decillion base (starting at 10^36)
    'Vg': 1,   // Vigintillion (10^63)
    'Tg': 2,   // Trigintillion (10^93)
    'QDR': 3,  // Quadragintillion (10^123)
    'Qn': 4,   // Quinquagintillion (10^153)
    'Sx': 5,   // Sexagintillion (10^183)
    'Sp': 6,   // Septuagintillion (10^213)
    'Oc': 7,   // Octogintillion (10^243)
    'No': 8,   // Nonagintillion (10^273)
  };
  
  const prefixMap: { [key: string]: number } = {
    'U': 1, 'd': 2, 't': 3, 'q': 4, 'Q': 5, 's': 6, 'S': 7, 'o': 8, 'n': 9
  };
  
  // Try to match compound Latin suffixes
  for (const [root, tensValue] of Object.entries(rootMap)) {
    if (suffix.endsWith(root)) {
      const prefix = suffix.substring(0, suffix.length - root.length);
      
      if (prefix === '') {
        // No prefix, e.g., "Dc" = 10^36
        const exponent = 36 + (tensValue * 30);
        return exponent;
      }
      
      // Has prefix
      const unitsValue = prefixMap[prefix];
      if (unitsValue !== undefined) {
        const position = (tensValue * 10) + unitsValue;
        const exponent = 36 + (position * 3);
        return exponent;
      }
    }
  }
  
  // Check if it's an infinite suffix (aa, ab, ac, etc.)
  if (/^[a-z]+$/.test(suffix)) {
    // Convert letter combination to position
    let position = 0;
    for (let i = 0; i < suffix.length; i++) {
      position = position * 26 + (suffix.charCodeAt(i) - 97 + 1);
    }
    position -= 1; // Zero-indexed
    
    const exponent = 306 + (position * 3);
    return exponent;
  }
  
  return null;
}

/**
 * Generate all number data from 10^3 to 10^303 (for backwards compatibility)
 */
export function generateAllSuffixes(): NumberData[] {
  return generateNumberData(3, 101);
}
