// Test script to verify the algorithm
import { getSuffix, getFullName } from './lib/suffixGenerator';

console.log('Testing key suffixes:');
console.log('---');

// Test Tier 1
console.log(`10^3: ${getSuffix(3)} (${getFullName(3)})`);
console.log(`10^6: ${getSuffix(6)} (${getFullName(6)})`);
console.log(`10^12: ${getSuffix(12)} (${getFullName(12)})`);

// Test Tier 2
console.log(`10^15: ${getSuffix(15)} (${getFullName(15)})`);
console.log(`10^33: ${getSuffix(33)} (${getFullName(33)})`);

// Test Tier 3 - Critical validation
console.log('---');
console.log('Tier 3 Compound Latin:');
console.log(`10^36: ${getSuffix(36)} (${getFullName(36)})`);
console.log(`10^63: ${getSuffix(63)} (${getFullName(63)})`);
console.log(`10^93: ${getSuffix(93)} (${getFullName(93)})`);
console.log(`10^123: ${getSuffix(123)} (${getFullName(123)})`);

// THE CRITICAL TEST
console.log('---');
console.log('🎯 CRITICAL VALIDATION:');
console.log(`10^129: ${getSuffix(129)} (${getFullName(129)})`);
console.log('Expected: dQDR (Duoquadragintillion)');
console.log(`✅ Match: ${getSuffix(129) === 'dQDR' && getFullName(129) === 'Duoquadragintillion'}`);

// More tests
console.log('---');
console.log(`10^153: ${getSuffix(153)} (${getFullName(153)})`);
console.log(`10^183: ${getSuffix(183)} (${getFullName(183)})`);
console.log(`10^303: ${getSuffix(303)} (${getFullName(303)})`);
