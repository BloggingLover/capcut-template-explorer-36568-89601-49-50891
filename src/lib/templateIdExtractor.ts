/**
 * Extracts a 19-digit CapCut template ID from various input formats:
 * - Direct 19-digit number: "7329169223194823954"
 * - Full message text: "Hey! I found this awesome template 7329169223194823954 on the CapCut..."
 * - CapCut URL: "https://www.capcut.com/template-detail/7231843171783757057?use_new_ui=1..."
 */
export function extractTemplateId(input: string): string | null {
  if (!input) return null;

  const trimmed = input.trim();

  // Pattern to match 19-digit numbers
  const templateIdPattern = /\b(\d{19})\b/;
  
  // Try to find a 19-digit number in the input
  const match = trimmed.match(templateIdPattern);
  
  if (match) {
    return match[1];
  }

  return null;
}

/**
 * Checks if the input is a valid template ID (exactly 19 digits)
 */
export function isTemplateId(input: string): boolean {
  return /^\d{19}$/.test(input.trim());
}
