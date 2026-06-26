export {};

declare global {
  interface Date {
    toYyyyMmDd(): string;
    toSqlDateTime(): string;
  }
}
