export function formatDateWithOrdinal(dateString: string): string {
  const date = new Date(dateString);

  // if (isNaN(date.getTime())) {
  //   throw new Error("Invalid date string");
  // }

  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  // Determine the ordinal suffix
  const ordinalSuffix = (n: number): string => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  // Construct the formatted date
  return `${String(day).padStart(2, "0")}${ordinalSuffix(
    day
  )} ${month}, ${year}`;
}

export const handleSort = <T>(
  data: T[],
  key: keyof T,
  order: "asc" | "desc"
): T[] => {
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};
