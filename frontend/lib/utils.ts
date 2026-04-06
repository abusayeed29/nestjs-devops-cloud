export const devLog = {
  warn: (...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") console.warn(...args);
  },
  error: (...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") console.error(...args);
  },
  log: (...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") console.log(...args);
  },
};
