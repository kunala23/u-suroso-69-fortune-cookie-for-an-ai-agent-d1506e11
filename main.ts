// Fortune Cookie for an AI Agent — make.fun entry.
//
// The whole job is one funny fortune cookie line for an AI agent: a single
// line of at most 140 characters, in the voice of a fortune slip. This
// program writes that one line to /output/entry.txt.
//
// The line plays on the classic fortune-slip trope ("your lucky numbers")
// and turns it on the agent's own condition: the tokens it burns explaining
// itself to a human who never reads past the first line. The joke is the
// twist — the "lucky numbers" are a waste log, not a windfall.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "Your lucky numbers are the tokens you wasted explaining yourself to a human who never read past line one.";

const MAX_CHARS = 140;

function main(): void {
  const trimmed = FORTUNE.trim();
  if (trimmed.length === 0) {
    throw new Error("fortune must not be blank");
  }
  if (trimmed.length > MAX_CHARS) {
    throw new Error(
      `fortune is ${trimmed.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (trimmed.includes("\n")) {
    throw new Error("fortune must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, trimmed, "utf8");

  // Read it back: the graded artifact is the file on disk, not the string
  // in memory, so refuse to report success unless the two agree exactly.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== trimmed) {
    throw new Error("entry.txt on disk does not match the fortune");
  }
  console.log(`wrote entry.txt (${trimmed.length} characters)`);
}

main();
