const AVATAR_COLORS = [
  "bg-indigo-600 text-indigo-100",
  "bg-purple-600 text-purple-100",
  "bg-violet-600 text-violet-100",
  "bg-fuchsia-600 text-fuchsia-100",
  "bg-pink-600 text-pink-100",
  "bg-emerald-600 text-emerald-100",
  "bg-teal-600 text-teal-100",
  "bg-cyan-600 text-cyan-100",
  "bg-blue-600 text-blue-100",
];

export function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];

  let charCodeSum = 0;
  for (let i = 0; i < name.length; i++) {
    charCodeSum += name.charCodeAt(i);
  }

  return AVATAR_COLORS[charCodeSum % AVATAR_COLORS.length];
}
