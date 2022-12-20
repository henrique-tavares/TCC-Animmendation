import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** Object representing an Anime */
export type Anime = {
  __typename?: "Anime";
  ageClassification?: Maybe<AnimeAgeClassification>;
  alternativeTitles: Array<Scalars["String"]>;
  endDate?: Maybe<Scalars["DateTime"]>;
  episodes?: Maybe<Scalars["Int"]>;
  genres?: Maybe<Array<Scalars["String"]>>;
  id: Scalars["Int"];
  mediaType?: Maybe<AnimeMediaType>;
  nsfw?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
  popularity?: Maybe<Scalars["Int"]>;
  rank?: Maybe<Scalars["Int"]>;
  relatedAnime?: Maybe<Array<Scalars["String"]>>;
  releasedSeason?: Maybe<Scalars["String"]>;
  score: Scalars["Float"];
  source?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["DateTime"]>;
  status: AnimeStatus;
  studios?: Maybe<Array<Scalars["String"]>>;
  synopsis?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

/** The age classification of an Anime */
export enum AnimeAgeClassification {
  G = "G",
  Pg = "PG",
  Pg_13 = "PG_13",
  R = "R",
  Rx = "RX",
  RPlus = "R_PLUS",
}

/** Object representing an anime genre query */
export type AnimeGenre = {
  __typename?: "AnimeGenre";
  count: Scalars["Int"];
  genre: Scalars["String"];
};

/** The media type of an Anime */
export enum AnimeMediaType {
  Movie = "MOVIE",
  Ona = "ONA",
  Ova = "OVA",
  Special = "SPECIAL",
  Tv = "TV",
}

/** The seasons in which Animes are released */
export enum AnimeSeason {
  Fall = "FALL",
  Spring = "SPRING",
  Summer = "SUMMER",
  Winter = "WINTER",
}

/** Object representing an anime source query */
export type AnimeSource = {
  __typename?: "AnimeSource";
  count: Scalars["Int"];
  source: Scalars["String"];
};

/** The status of an Anime */
export enum AnimeStatus {
  Airing = "AIRING",
  Finished = "FINISHED",
}

/** Object representing an anime studio query */
export type AnimeStudio = {
  __typename?: "AnimeStudio";
  count: Scalars["Int"];
  studio: Scalars["String"];
};

/** Object representing an anime's titles */
export type AnimeTitles = {
  __typename?: "AnimeTitles";
  animeId: Scalars["Int"];
  title: Array<Scalars["String"]>;
};

/** method for querying data */
export enum DateMethod {
  Equal = "EQUAL",
  GreaterThan = "GREATER_THAN",
  GreaterThanOrEqual = "GREATER_THAN_OR_EQUAL",
  LessThan = "LESS_THAN",
  LessThanOrEqual = "LESS_THAN_OR_EQUAL",
}

export type Query = {
  __typename?: "Query";
  getAllAnimeTitles: Array<AnimeTitles>;
  getAnimeById: Anime;
  getAnimeBySeason: Array<Anime>;
  getAnimeByTitle: Array<Anime>;
  getAnimeGenres: Array<AnimeGenre>;
  getAnimeRecommendations: Array<Recommendation>;
  getAnimeSources: Array<AnimeSource>;
  getAnimeStudios: Array<AnimeStudio>;
  getGroupRecommendations: Array<Recommendation>;
  getTopAnime: Array<Anime>;
  getUser: User;
  getUserAnimeList: Array<UserAnimeRating>;
  listAnimeById: Array<Anime>;
};

export type QueryGetAnimeByIdArgs = {
  id: Scalars["Int"];
};

export type QueryGetAnimeBySeasonArgs = {
  amount?: InputMaybe<Scalars["Int"]>;
  hentai?: InputMaybe<Scalars["Boolean"]>;
  mediaTypes?: InputMaybe<Array<AnimeMediaType>>;
  method?: InputMaybe<TopAnimeMethod>;
  season: AnimeSeason;
  year: Scalars["Int"];
};

export type QueryGetAnimeByTitleArgs = {
  hentai?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
};

export type QueryGetAnimeGenresArgs = {
  amount?: InputMaybe<Scalars["Int"]>;
  hentai?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryGetAnimeRecommendationsArgs = {
  animeId: Scalars["Int"];
  excludedAnimeIds: Array<Scalars["Int"]>;
  k: Scalars["Int"];
};

export type QueryGetAnimeSourcesArgs = {
  amount?: InputMaybe<Scalars["Int"]>;
};

export type QueryGetAnimeStudiosArgs = {
  amount?: InputMaybe<Scalars["Int"]>;
};

export type QueryGetGroupRecommendationsArgs = {
  ages?: InputMaybe<Array<AnimeAgeClassification>>;
  amount: Scalars["Int"];
  animesId: Array<Scalars["Int"]>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  endDateMethod?: InputMaybe<DateMethod>;
  excludedAnimeIds: Array<Scalars["Int"]>;
  genres?: InputMaybe<Array<Scalars["String"]>>;
  hentai?: InputMaybe<Scalars["Boolean"]>;
  mediaTypes?: InputMaybe<Array<AnimeMediaType>>;
  nullEndDate?: InputMaybe<Scalars["Boolean"]>;
  sources?: InputMaybe<Array<Scalars["String"]>>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  startDateMethod?: InputMaybe<DateMethod>;
  studios?: InputMaybe<Array<Scalars["String"]>>;
};

export type QueryGetTopAnimeArgs = {
  ages?: InputMaybe<Array<AnimeAgeClassification>>;
  amount?: InputMaybe<Scalars["Int"]>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  endDateMethod?: InputMaybe<DateMethod>;
  genres?: InputMaybe<Array<Scalars["String"]>>;
  hentai?: InputMaybe<Scalars["Boolean"]>;
  mediaTypes?: InputMaybe<Array<AnimeMediaType>>;
  method: TopAnimeMethod;
  nullEndDate?: InputMaybe<Scalars["Boolean"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  sources?: InputMaybe<Array<Scalars["String"]>>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  startDateMethod?: InputMaybe<DateMethod>;
  status?: InputMaybe<AnimeStatus>;
  studios?: InputMaybe<Array<Scalars["String"]>>;
  title?: InputMaybe<Scalars["String"]>;
};

export type QueryListAnimeByIdArgs = {
  ids: Array<Scalars["Int"]>;
};

/** Object representing a single Anime recommendation */
export type Recommendation = {
  __typename?: "Recommendation";
  anime: Anime;
  rank: Scalars["Int"];
};

/** Criteria for getting popular Anime */
export enum TopAnimeMethod {
  Popularity = "POPULARITY",
  Score = "SCORE",
  Title = "TITLE",
}

/** Object representing an user */
export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  imageURL?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
};

/** Object representing an user's anime rating */
export type UserAnimeRating = {
  __typename?: "UserAnimeRating";
  anime: Anime;
  score: Scalars["Int"];
  status?: Maybe<UserRatingStatus>;
};

/** Status for an user's rating */
export enum UserRatingStatus {
  Completed = "COMPLETED",
  Dropped = "DROPPED",
  OnHold = "ON_HOLD",
  PlanToWatch = "PLAN_TO_WATCH",
  Watching = "WATCHING",
}

export type QueryAnimeFragment = {
  __typename?: "Anime";
  id: number;
  genres?: Array<string> | null;
  ageClassification?: AnimeAgeClassification | null;
  rank?: number | null;
  popularity?: number | null;
  title: string;
  score: number;
  picture?: string | null;
  mediaType?: AnimeMediaType | null;
  alternativeTitles: Array<string>;
  studios?: Array<string> | null;
  endDate?: any | null;
  source?: string | null;
};

export type GetAnimeBySeasonQueryVariables = Exact<{
  season: AnimeSeason;
  year: Scalars["Int"];
  method?: InputMaybe<TopAnimeMethod>;
  amount?: InputMaybe<Scalars["Int"]>;
  mediaTypes?: InputMaybe<Array<AnimeMediaType> | AnimeMediaType>;
}>;

export type GetAnimeBySeasonQuery = {
  __typename?: "Query";
  getAnimeBySeason: Array<{
    __typename?: "Anime";
    id: number;
    genres?: Array<string> | null;
    ageClassification?: AnimeAgeClassification | null;
    rank?: number | null;
    popularity?: number | null;
    title: string;
    score: number;
    picture?: string | null;
    mediaType?: AnimeMediaType | null;
    alternativeTitles: Array<string>;
    studios?: Array<string> | null;
    endDate?: any | null;
    source?: string | null;
  }>;
};

export type GetTopAnimeQueryVariables = Exact<{
  method: TopAnimeMethod;
  title?: InputMaybe<Scalars["String"]>;
  genres?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  mediaTypes?: InputMaybe<Array<AnimeMediaType> | AnimeMediaType>;
  ages?: InputMaybe<Array<AnimeAgeClassification> | AnimeAgeClassification>;
  sources?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  studios?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  startDateMethod?: InputMaybe<DateMethod>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  endDateMethod?: InputMaybe<DateMethod>;
  nullEndDate?: InputMaybe<Scalars["Boolean"]>;
  amount?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
}>;

export type GetTopAnimeQuery = {
  __typename?: "Query";
  getTopAnime: Array<{
    __typename?: "Anime";
    id: number;
    genres?: Array<string> | null;
    ageClassification?: AnimeAgeClassification | null;
    rank?: number | null;
    popularity?: number | null;
    title: string;
    score: number;
    picture?: string | null;
    mediaType?: AnimeMediaType | null;
    alternativeTitles: Array<string>;
    studios?: Array<string> | null;
    endDate?: any | null;
    source?: string | null;
  }>;
};

export type ListAnimeByIdQueryVariables = Exact<{
  ids: Array<Scalars["Int"]> | Scalars["Int"];
}>;

export type ListAnimeByIdQuery = {
  __typename?: "Query";
  listAnimeById: Array<{
    __typename?: "Anime";
    id: number;
    genres?: Array<string> | null;
    ageClassification?: AnimeAgeClassification | null;
    rank?: number | null;
    popularity?: number | null;
    title: string;
    score: number;
    picture?: string | null;
    mediaType?: AnimeMediaType | null;
    alternativeTitles: Array<string>;
    studios?: Array<string> | null;
    endDate?: any | null;
    source?: string | null;
  }>;
};

export type GetAnimeGenresQueryVariables = Exact<{
  amount?: InputMaybe<Scalars["Int"]>;
}>;

export type GetAnimeGenresQuery = {
  __typename?: "Query";
  getAnimeGenres: Array<{ __typename?: "AnimeGenre"; genre: string }>;
};

export type GetAnimeSourcesQueryVariables = Exact<{
  amount?: InputMaybe<Scalars["Int"]>;
}>;

export type GetAnimeSourcesQuery = {
  __typename?: "Query";
  getAnimeSources: Array<{ __typename?: "AnimeSource"; source: string }>;
};

export type GetAnimeStudioQueryVariables = Exact<{
  amount?: InputMaybe<Scalars["Int"]>;
}>;

export type GetAnimeStudioQuery = {
  __typename?: "Query";
  getAnimeStudios: Array<{ __typename?: "AnimeStudio"; studio: string }>;
};

export type GetAnimeRecommendationsQueryVariables = Exact<{
  id: Scalars["Int"];
  k: Scalars["Int"];
  excludedAnimeIds: Array<Scalars["Int"]> | Scalars["Int"];
}>;

export type GetAnimeRecommendationsQuery = {
  __typename?: "Query";
  getAnimeRecommendations: Array<{
    __typename?: "Recommendation";
    rank: number;
    anime: {
      __typename?: "Anime";
      id: number;
      genres?: Array<string> | null;
      ageClassification?: AnimeAgeClassification | null;
      rank?: number | null;
      popularity?: number | null;
      title: string;
      score: number;
      picture?: string | null;
      mediaType?: AnimeMediaType | null;
      alternativeTitles: Array<string>;
      studios?: Array<string> | null;
      endDate?: any | null;
      source?: string | null;
    };
  }>;
};

export type GetGroupRecomendationsQueryVariables = Exact<{
  animeIds: Array<Scalars["Int"]> | Scalars["Int"];
  excludedAnimeIds: Array<Scalars["Int"]> | Scalars["Int"];
  genres?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  mediaTypes?: InputMaybe<Array<AnimeMediaType> | AnimeMediaType>;
  ages?: InputMaybe<Array<AnimeAgeClassification> | AnimeAgeClassification>;
  sources?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  studios?: InputMaybe<Array<Scalars["String"]> | Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  startDateMethod?: InputMaybe<DateMethod>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  endDateMethod?: InputMaybe<DateMethod>;
  nullEndDate?: InputMaybe<Scalars["Boolean"]>;
  amount: Scalars["Int"];
}>;

export type GetGroupRecomendationsQuery = {
  __typename?: "Query";
  getGroupRecommendations: Array<{
    __typename?: "Recommendation";
    rank: number;
    anime: {
      __typename?: "Anime";
      id: number;
      genres?: Array<string> | null;
      ageClassification?: AnimeAgeClassification | null;
      rank?: number | null;
      popularity?: number | null;
      title: string;
      score: number;
      picture?: string | null;
      mediaType?: AnimeMediaType | null;
      alternativeTitles: Array<string>;
      studios?: Array<string> | null;
      endDate?: any | null;
      source?: string | null;
    };
  }>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser: {
    __typename?: "User";
    id: number;
    username: string;
    imageURL?: string | null;
  };
};

export type GetUserAnimeListQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserAnimeListQuery = {
  __typename?: "Query";
  getUserAnimeList: Array<{
    __typename?: "UserAnimeRating";
    score: number;
    status?: UserRatingStatus | null;
    anime: {
      __typename?: "Anime";
      id: number;
      popularity?: number | null;
      genres?: Array<string> | null;
      ageClassification?: AnimeAgeClassification | null;
      releasedSeason?: string | null;
      mediaType?: AnimeMediaType | null;
      source?: string | null;
      studios?: Array<string> | null;
    };
  }>;
};

export const QueryAnimeFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "QueryAnime" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Anime" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "genres" } },
          { kind: "Field", name: { kind: "Name", value: "ageClassification" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          { kind: "Field", name: { kind: "Name", value: "popularity" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "score" } },
          { kind: "Field", name: { kind: "Name", value: "picture" } },
          { kind: "Field", name: { kind: "Name", value: "mediaType" } },
          { kind: "Field", name: { kind: "Name", value: "alternativeTitles" } },
          { kind: "Field", name: { kind: "Name", value: "studios" } },
          { kind: "Field", name: { kind: "Name", value: "endDate" } },
          { kind: "Field", name: { kind: "Name", value: "source" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryAnimeFragment, unknown>;
export const GetAnimeBySeasonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAnimeBySeason" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "season" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AnimeSeason" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "year" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "method" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "TopAnimeMethod" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amount" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "mediaTypes" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "AnimeMediaType" },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAnimeBySeason" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "method" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "method" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "season" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "season" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "year" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "year" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "amount" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amount" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "mediaTypes" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "mediaTypes" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "QueryAnime" },
                },
              ],
            },
          },
        ],
      },
    },
    ...QueryAnimeFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  GetAnimeBySeasonQuery,
  GetAnimeBySeasonQueryVariables
>;
export const GetTopAnimeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTopAnime" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "method" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TopAnimeMethod" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "genres" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "String" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "mediaTypes" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "AnimeMediaType" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ages" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "AnimeAgeClassification" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sources" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "String" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "studios" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "String" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startDateMethod" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateMethod" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endDateMethod" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateMethod" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nullEndDate" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amount" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getTopAnime" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "method" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "method" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "genres" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "genres" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "mediaTypes" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "mediaTypes" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ages" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ages" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sources" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sources" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "studios" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "studios" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "startDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDateMethod" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "startDateMethod" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "endDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "endDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "endDateMethod" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "endDateMethod" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "nullEndDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "nullEndDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "amount" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amount" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "QueryAnime" },
                },
              ],
            },
          },
        ],
      },
    },
    ...QueryAnimeFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetTopAnimeQuery, GetTopAnimeQueryVariables>;
export const ListAnimeByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListAnimeById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Int" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listAnimeById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ids" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ids" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "QueryAnime" },
                },
              ],
            },
          },
        ],
      },
    },
    ...QueryAnimeFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ListAnimeByIdQuery, ListAnimeByIdQueryVariables>;
export const GetAnimeGenresDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAnimeGenres" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amount" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAnimeGenres" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "amount" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amount" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "genre" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAnimeGenresQuery, GetAnimeGenresQueryVariables>;
export const GetAnimeSourcesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAnimeSources" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amount" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAnimeSources" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "amount" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amount" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "source" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAnimeSourcesQuery,
  GetAnimeSourcesQueryVariables
>;
export const GetAnimeStudioDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAnimeStudio" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amount" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAnimeStudios" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "amount" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amount" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "studio" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAnimeStudioQuery, GetAnimeStudioQueryVariables>;
export const GetAnimeRecommendationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAnimeRecommendations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "k" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "excludedAnimeIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Int" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAnimeRecommendations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "animeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "k" },
                value: { kind: "Variable", name: { kind: "Name", value: "k" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "excludedAnimeIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "excludedAnimeIds" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "anime" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "QueryAnime" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "rank" } },
              ],
            },
          },
        ],
      },
    },
    ...QueryAnimeFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  GetAnimeRecommendationsQuery,
  GetAnimeRecommendationsQueryVariables
>;
export const GetGroupRecomendationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetGroupRecomendations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "animeIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Int" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "excludedAnimeIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Int" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "genres" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "String" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "mediaTypes" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "AnimeMediaType" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ages" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "AnimeAgeClassification" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sources" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "String" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "studios" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "String" },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startDateMethod" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateMethod" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endDateMethod" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateMethod" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nullEndDate" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amount" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getGroupRecommendations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "animesId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "animeIds" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "amount" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amount" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "excludedAnimeIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "excludedAnimeIds" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ages" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ages" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "endDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "endDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "endDateMethod" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "endDateMethod" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "genres" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "genres" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "mediaTypes" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "mediaTypes" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "nullEndDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "nullEndDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sources" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sources" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "startDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDateMethod" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "startDateMethod" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "studios" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "studios" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "anime" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "QueryAnime" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "rank" } },
              ],
            },
          },
        ],
      },
    },
    ...QueryAnimeFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  GetGroupRecomendationsQuery,
  GetGroupRecomendationsQueryVariables
>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "imageURL" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUserAnimeListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserAnimeList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUserAnimeList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "anime" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "popularity" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "genres" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ageClassification" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "releasedSeason" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mediaType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "studios" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUserAnimeListQuery,
  GetUserAnimeListQueryVariables
>;
