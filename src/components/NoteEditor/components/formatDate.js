export function formatEditedAt(dateString) {
  const dateObj = new Date(dateString);
  const nowDate = new Date();

  const isSameYear = nowDate.getFullYear() === dateObj.getFullYear();
  const isSameMonth = nowDate.getMonth() === dateObj.getMonth();
  const isSameDay = nowDate.getDate() === dateObj.getDate();

  if (!isSameYear) {
    return dateObj.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  if (isSameYear && isSameMonth && isSameDay) {
    return dateObj.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return dateObj.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });
}
