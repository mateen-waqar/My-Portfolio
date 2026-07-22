export const ABOUT_STORY = `I'm a Computer Science student at COMSATS University Islamabad, Lahore
Campus, and a full-stack + AI engineer who'd rather ship something real than
just read about it. Most of what I know came from building — a ticketing
platform with real seat-locking logic, a computer-vision tool that turns a
webcam into a mouse, small games, small businesses' internal tools — and
fixing what broke along the way.`;

export const ABOUT_MISSION =
  "Turn a vague idea into software that actually holds up — correct data model, honest edge cases, an interface that doesn't need a manual.";

export const ABOUT_APPROACH =
  "Start from the data. Sketch the schema and the failure cases before the UI, because that's where most bugs are born. Ship a working slice early, then layer in polish.";

export const ABOUT_VALUES = [
  {
    title: "Ownership",
    description: "I build the whole thing — schema, API, UI, deploy — not just the parts that are fun.",
  },
  {
    title: "Clarity over cleverness",
    description: "Code and interfaces should be obvious in six months, including to me.",
  },
  {
    title: "Ship, then refine",
    description: "A working v1 teaches you more than a perfect plan ever will.",
  },
] as const;

// TODO: adjust these once you've got a solid count — kept conservative for now.
export const ABOUT_STATS = [
  { label: "Projects shipped", value: 4, suffix: "+" },
  { label: "Technologies used", value: 18, suffix: "+" },
  { label: "GitHub repositories", value: 12, suffix: "+" },
  { label: "Years writing code", value: 3, suffix: "+" },
] as const;
