/**
 * UnreadBadge
 * Shows red count badge. Displays "9+" if count exceeds 9.
 * Renders nothing if count is 0 or falsy.
 */
const UnreadBadge = ({ count }) => {
  if (!count) return null;

  return (
    <span
      className="ml-auto flex items-center justify-center rounded-full text-white font-bold"
      style={{
        background: "#ef4444",
        fontSize: "10px",
        minWidth: "18px",
        height: "18px",
        padding: "0 5px",
      }}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
};

export default UnreadBadge;
