export function formatDateRange(
  start: string | Date,
  end: string | Date
): string {
  const firstDate = new Date(start);
  const secondDate = new Date(end);

  if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
    throw new Error("Invalid date(s) provided");
  }

  const datePart = firstDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const startTime = firstDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = secondDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} ${startTime} to ${endTime}`;
}
