export default async function usePlatform(): Promise<boolean> {
  const platform = await import("platform");
  return platform.os?.family === "iOS" || platform.os?.family === "Android";
}
