from prisma.models import Recommendation

Recommendation.create_partial("RecommendationWithoutBaseAnimeId", exclude={"baseAnimeId"})
