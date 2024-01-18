export function asset(path: string): string {
  return `/${String(path).replace(/^\/+/, "")}`;
}
