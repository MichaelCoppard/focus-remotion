---
name: Rendering Preferences
description: How to handle render commands — always give the terminal command, never run automatically
type: feedback
---

Never run render commands automatically (e.g. via Bash tool). Always give the user the command to paste into their own separate terminal.

**Why:** Running renders automatically wastes the user's API allowance and triggers unwanted downloads in the Remotion Studio. The user prefers to control when and what gets rendered.

**How to apply:** When the user asks to render anything, respond with the `npm run ...` command as a code block for them to run manually. Do not invoke it via Bash.

Also: when the user says "render all of them", clarify scope first (e.g. just the current script vs everything). Do not assume "all" means every composition ever created.
