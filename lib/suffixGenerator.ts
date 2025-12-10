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
 * Generate all number data from 10^3 to 10^303
 */
export function generateAllSuffixes(): NumberData[] {
  const data: NumberData[] = [];
  
  // Generate for every exponent that's a multiple of 3 from 3 to 303
  for (let exp = 3; exp <= 303; exp += 3) {
    const suffix = getSuffix(exp);
    const fullName = getFullName(exp);
    
    if (suffix && fullName) {
      data.push({
        exponent: exp,
        scientific: `1e${exp}`,
        suffix,
        fullName,
      });
    }
  }
  
  return data;
}
