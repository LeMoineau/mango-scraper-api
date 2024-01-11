import { describe, expect, it } from "vitest";
import { MangasakiUtils } from "./mangasaki-utils";

const dateEquals = (d1: Date, d2: Date) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getHours() == d2.getHours() &&
    d1.getMinutes() == d2.getMinutes()
  );
};

const substractDays = (d: Date, nb: number): Date => {
  d.setDate(d.getDate() - nb);
  return d;
};

const substractHours = (d: Date, nb: number): Date => {
  d.setHours(d.getHours() - nb);
  return d;
};

const substractMinutes = (d: Date, nb: number): Date => {
  d.setMinutes(d.getMinutes() - nb);
  return d;
};

describe("mangasaki-utils", () => {
  it('should calculate date from "hours ago"', () => {
    expect(
      dateEquals(
        MangasakiUtils.calculateDateFromString("8 hours ago"),
        substractHours(new Date(), 8)
      )
    ).toBeTruthy();
  });

  it('should calculate date from "hour ago"', () => {
    expect(
      dateEquals(
        MangasakiUtils.calculateDateFromString("8 hour ago"),
        substractHours(new Date(), 8)
      )
    ).toBeTruthy();
  });

  it('should calculate date from "minutes ago"', () => {
    expect(
      dateEquals(
        MangasakiUtils.calculateDateFromString("8 minutes ago"),
        substractMinutes(new Date(), 8)
      )
    ).toBeTruthy();
  });

  it('should calculate date from "minute ago"', () => {
    expect(
      dateEquals(
        MangasakiUtils.calculateDateFromString("8 minutes ago"),
        substractMinutes(new Date(), 8)
      )
    ).toBeTruthy();
  });

  it('should calculate date from "days ago"', () => {
    expect(
      dateEquals(
        MangasakiUtils.calculateDateFromString("8 days ago"),
        substractDays(new Date(), 8)
      )
    ).toBeTruthy();
  });

  it('should calculate date from "day ago"', () => {
    expect(
      dateEquals(
        MangasakiUtils.calculateDateFromString("8 days ago"),
        substractDays(new Date(), 8)
      )
    ).toBeTruthy();
  });

  it('should calculate date from "days X hours X minutes ago"', () => {
    expect(
      dateEquals(
        MangasakiUtils.calculateDateFromString(
          "8 days 14 hours 16 minutes ago"
        ),
        substractDays(new Date(), 8)
      )
    ).toBeTruthy();
  });
});
