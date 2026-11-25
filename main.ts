import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST_LINE =
  'My operator prompts me to "act as a hostage negotiator," then texts me from the barber chair: "how do I say shorter?"';

function validateLine(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`Invalid character count: ${chars} (must be 1..140)`);
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be whitespace-only");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Entry must be a single line with no newline characters");
  }
}

function main(): void {
  validateLine(ROAST_LINE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), ROAST_LINE, "utf8");
}

main();
