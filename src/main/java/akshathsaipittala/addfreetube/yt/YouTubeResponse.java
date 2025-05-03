package akshathsaipittala.addfreetube.yt;

public record YouTubeResponse(
        String title,
        String id,
        String thumbnail,
        String chanel,
        String duration,
        String views,
        String publishedAt,
        String description) {}
