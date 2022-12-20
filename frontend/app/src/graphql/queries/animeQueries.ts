import {
  AnimeAgeClassification,
  AnimeMediaType,
  AnimeSeason,
  DateMethod,
  GetAnimeBySeasonDocument,
  GetAnimeGenresDocument,
  GetAnimeSourcesDocument,
  GetAnimeStudioDocument,
  GetGroupRecomendationsDocument,
  GetTopAnimeDocument,
  ListAnimeByIdDocument,
  TopAnimeMethod,
  type Anime,
} from "@/graphql/gen/generated";
import { seasonTranslator } from "@/translate/anime";
import { useLazyQuery } from "@vue/apollo-composable";
import { promissifyQueryResult } from "../../utils/apolloQueryWrapper";
import { getCurrentSeason, getPastSeason } from "../../utils/seasonHandler";
import _ from "lodash";

export type QueryAnime = Pick<
  Anime,
  | "id"
  | "ageClassification"
  | "genres"
  | "mediaType"
  | "picture"
  | "popularity"
  | "rank"
  | "score"
  | "title"
  | "alternativeTitles"
>;

export type ComposedAnimeQueryResponse = {
  popularity: AnimeQueryResponse;
  score: AnimeQueryResponse;
};

export type AnimeQueryResponse = {
  title: string;
  animes: QueryAnime[];
};

export type AnimeQuery<T extends Record<string, any> | void = void> =
  T extends void
    ? () => Promise<AnimeQueryResponse>
    : (variables: T) => Promise<AnimeQueryResponse>;

const bySeasonQuery: AnimeQuery<{
  season: "current" | "past";
  method: TopAnimeMethod;
  mediaTypes: AnimeMediaType[];
  amount?: number;
}> = async ({ season, method, amount, mediaTypes }) => {
  const seasonMapper = {
    current: getCurrentSeason(),
    past: getPastSeason(),
  };

  const querySeason = seasonMapper[season];

  const { getAnimeBySeason: animes } = await promissifyQueryResult(
    useLazyQuery(GetAnimeBySeasonDocument, {
      season: querySeason.season,
      year: querySeason.year,
      method,
      mediaTypes,
      amount,
    })
  );

  return {
    title: `Os Animes mais ${
      method == TopAnimeMethod.Popularity ? "populares" : "bem avaliados"
    } da temporada ${
      season == "current" ? "atual" : "passada"
    } - ${_.capitalize(seasonTranslator(querySeason.season))} ${
      querySeason.year
    }`,
    animes,
  };
};

const topAnimeQuery: AnimeQuery<{
  title: string;
  method: TopAnimeMethod;
  ages?: AnimeAgeClassification[];
  genres?: string[];
  mediaTypes?: AnimeMediaType[];
  sources?: string[];
  studios?: string[];
  startDate?: Date;
  startDateMethod?: DateMethod;
  endDate?: Date;
  endDateMethod?: DateMethod;
  nullEndDate?: boolean;
  amount?: number;
}> = async ({
  title,
  method,
  ages,
  genres,
  mediaTypes,
  sources,
  studios,
  startDate,
  startDateMethod,
  endDate,
  endDateMethod,
  nullEndDate,
  amount,
}) => {
  const { getTopAnime: animes } = await promissifyQueryResult(
    useLazyQuery(GetTopAnimeDocument, {
      method,
      ages,
      genres,
      mediaTypes,
      sources,
      studios,
      endDate,
      startDate,
      startDateMethod,
      endDateMethod,
      nullEndDate,
      amount,
    })
  );

  return {
    title,
    animes,
  };
};

const yourNextAnimeQuery: AnimeQuery<{
  title: string;
  animeIds: number[];
  excludedAnimeIds: number[];
  ages?: AnimeAgeClassification[];
  genres?: string[];
  mediaTypes?: AnimeMediaType[];
  sources?: string[];
  studios?: string[];
  startDate?: Date;
  startDateMethod?: DateMethod;
  endDate?: Date;
  endDateMethod?: DateMethod;
  nullEndDate?: boolean;
  amount: number;
}> = async ({
  title,
  animeIds,
  excludedAnimeIds,
  ages,
  amount,
  endDate,
  endDateMethod,
  genres,
  mediaTypes,
  nullEndDate,
  sources,
  startDate,
  startDateMethod,
  studios,
}) => {
  const { getGroupRecommendations: groupRecommendations } =
    await promissifyQueryResult(
      useLazyQuery(GetGroupRecomendationsDocument, {
        animeIds,
        amount,
        excludedAnimeIds,
        ages,
        endDate,
        endDateMethod,
        genres,
        mediaTypes,
        nullEndDate,
        sources,
        startDate,
        startDateMethod,
        studios,
      })
    );

  // const sortedGroupRecomendations = groupRecommendations
  //   .concat()
  //   .sort((a, b) => a.rank - b.rank);
  // console.log(
  //   "🚀 ~ file: animeQueries.ts:142 ~ sortedGroupRecomendations",
  //   sortedGroupRecomendations
  // );

  return {
    title,
    animes: groupRecommendations.map((rec) => rec.anime),
  };
};

async function getAnimeGenres(amount: number) {
  const { getAnimeGenres: genres } = await promissifyQueryResult(
    useLazyQuery(GetAnimeGenresDocument, {
      amount,
    })
  );

  return genres.map((genre) => genre.genre);
}

async function getAnimeSources(amount: number) {
  const { getAnimeSources: sources } = await promissifyQueryResult(
    useLazyQuery(GetAnimeSourcesDocument, {
      amount,
    })
  );

  return sources.map((source) => source.source);
}

async function getAnimeStudios(amount: number) {
  const { getAnimeStudios: studios } = await promissifyQueryResult(
    useLazyQuery(GetAnimeStudioDocument, {
      amount,
    })
  );

  return studios.map((studio) => studio.studio);
}

async function getAnimeData(
  type: "genre" | "source" | "studio",
  amount: number
) {
  const map: Record<typeof type, (amount: number) => Promise<string[]>> = {
    genre: getAnimeGenres,
    source: getAnimeSources,
    studio: getAnimeStudios,
  };

  return await map[type](amount);
}

export default {
  bySeasonQuery,
  topAnimeQuery,
  yourNextAnimeQuery,
  getAnimeData,
} as const;

// export const queries: Record<AnimeQueryActions, AnimeQuery> = {
//   currentSeasonQuery: {

//   } as AnimeQuery<{aaa: number}>,
// pastSeasonQuery:
// topRankQuery: () => {},
// topPopularityQuery: () => {},
// topGenreQuery: () => {},
// topAgeClassificationQuery: () => {},
// topTvQuery: () => {},
// topMovieQuery: () => {},
// topAdaptaionQuery: () => {},
// topOriginalQuery: () => {},
// topFromGenreQuery: () => {},
// yourNextAnimeQuery: () => {},
// randomTop10Query: () => {},
// };
