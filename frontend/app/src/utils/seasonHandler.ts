import { AnimeSeason } from "@/graphql/gen/generated";
import { subMonths } from "date-fns";
import { padStart } from "lodash";

const monthToSeason: Record<number, AnimeSeason> = {
  0: AnimeSeason.Winter,
  1: AnimeSeason.Winter,
  2: AnimeSeason.Winter,
  3: AnimeSeason.Spring,
  4: AnimeSeason.Spring,
  5: AnimeSeason.Spring,
  6: AnimeSeason.Summer,
  7: AnimeSeason.Summer,
  8: AnimeSeason.Summer,
  9: AnimeSeason.Fall,
  10: AnimeSeason.Fall,
  11: AnimeSeason.Fall,
};

export function getCurrentSeason() {
  const today = new Date();

  return {
    season: monthToSeason[today.getMonth()],
    year: today.getFullYear(),
  };
}

export function getPastSeason() {
  const pastSeasonDate = subMonths(new Date(), 3);
  return {
    season: monthToSeason[pastSeasonDate.getMonth()],
    year: pastSeasonDate.getFullYear(),
  };
}

export function getEndOfSeason(season: AnimeSeason, year: number) {
  const map: Record<AnimeSeason, Date> = {
    FALL: new Date(`${year}-12-31`),
    SPRING: new Date(`${year}-06-30`),
    SUMMER: new Date(`${year}-09-30`),
    WINTER: new Date(`${year}-03-31`),
  };

  return map[season];
}

export function getBeginningOfSeason(season: AnimeSeason, year: number) {
  const map: Record<AnimeSeason, Date> = {
    FALL: new Date(`${year}-10-01`),
    SPRING: new Date(`${year}-04-01`),
    SUMMER: new Date(`${year}-07-01`),
    WINTER: new Date(`${year}-01-01`),
  };

  return map[season];
}
