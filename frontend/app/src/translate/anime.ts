import type { AnimeMediaType, AnimeSeason } from "@/graphql/gen/generated";
import { translatorApi } from "./api";

export function seasonTranslator(season: AnimeSeason) {
  const map: Record<AnimeSeason, string> = {
    FALL: "outono",
    SPRING: "primavera",
    SUMMER: "verão",
    WINTER: "inverno",
  };

  return map[season];
}

export async function genresTranslator(genre: string) {
  const map: Record<string, string> = {
    Action: "ação",
    Shounen: "shounen",
    "Slice of Life": "slice of life",
    Seinen: "seinen",
    Shoujo: "shoujo",
    Military: "militar",
    Horror: "Terror",
    Psycological: "psicológico",
    Detective: "detetive",
    "Gap Humor": "humor de piada",
  };

  return (
    map[genre] ??
    (
      (await translatorApi.translate("en", "pt", genre)) ?? genre
    ).toLocaleLowerCase("pt-br")
  );
}

export function mediaTypeTranslator(mediaType: AnimeMediaType) {
  const map: Record<AnimeMediaType, string> = {
    MOVIE: "Filme",
    ONA: "ONA",
    OVA: "OVA",
    TV: "TV",
    SPECIAL: "Especial",
  };

  return map[mediaType];
}

export function sourcesTranslator(source: string) {
  const map: Record<string, string> = {
    manga: "mangá",
    visual_novel: "visual novel",
    light_novel: "light novel",
    game: "jogo",
    novel: "novel",
    other: "outro",
    "4_koma_manga": "mangá 4-koma",
    web_maga: "mangá web",
    book: "livro",
    card_game: "jogo de cartas",
  };

  return map[source] ?? source.replaceAll("_", " ");
}
