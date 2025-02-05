/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const formatNumber = (num: number) => {
  if (num == null) return ""; // Handle null or undefined

  const [integerPart, decimalPart] = num.toString().split(".");

  // Format the integer part
  const lastThree = integerPart?.slice(-3);
  const otherNumbers = integerPart?.slice(0, -3);
  const formattedInteger = otherNumbers
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;

  // Combine formatted integer and fractional part (if any)
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const convertNumberToWords = (num: number) => {
  const a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  if (num?.toString().length > 9) return "overflow";
  let n: any = "";
  n = ("000000000" + num)
    ?.slice(-9)
    ?.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  let str = "";
  str +=
    Number(n[1]) != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
      : "";
  str +=
    Number(n[2]) != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
      : "";
  str +=
    Number(n[3]) != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
      : "";
  str +=
    Number(n[4]) != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
      : "";
  str +=
    Number(n[5]) != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
      : "";
  str += "Only";
  return str;
};

export const isObjectEmpty = (data: object): boolean => {
  return Object.values(data).some(
    (value) => !value || value.toString().trim() === ""
  );
};
