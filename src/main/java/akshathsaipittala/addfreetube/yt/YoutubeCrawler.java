/*
 * Copyright (c) 2025 Akshath Sai Pittala
 * All rights reserved.
 */
package akshathsaipittala.addfreetube.yt;

import akshathsaipittala.addfreetube.resilience.RetryService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@Service
public class YoutubeCrawler {

    private static final Pattern polymerInitialDataRegex = Pattern.compile("(window\\[\"ytInitialData\"]|var ytInitialData)\\s*=\\s*(.*);");

    public List<YouTubeResponse> searchVideos(String searchQuery) {
        Content content = crawlSearchResults(searchQuery);
        List<Content> contentList = new ArrayList<>(
                content
                        .twoColumnSearchResultsRenderer
                        .primaryContents
                        .sectionListRenderer
                        .contents.getFirst().itemSectionRenderer.contents
        );

        return contentList.stream()
                .filter(content1 -> content1.videoRenderer() != null)
                .map(content1 -> new YouTubeResponse(
                        content1.videoRenderer().title().runs().getFirst().text,
                        content1.videoRenderer().videoId,
                        null,
                        content1.videoRenderer().longBylineText.runs.getFirst().text,
                        null,
                        content1.videoRenderer().viewCountText.simpleText,
                        null,
                        null))
                .collect(Collectors.toList());
    }


    public List<YouTubeResponse> getVideos(String searchQuery) {
        Content content = crawlSearchResults(searchQuery);
        List<Content> contentList = new ArrayList<>(
                content
                        .twoColumnSearchResultsRenderer
                        .primaryContents
                        .sectionListRenderer
                        .contents.getFirst().itemSectionRenderer.contents
        );

        return contentList.stream()
        .filter(content1 -> content1.videoRenderer() != null)
        .map(content1 -> new YouTubeResponse(
                content1.videoRenderer().title().runs().getFirst().text,
                content1.videoRenderer().videoId,
                content1.videoRenderer().thumbnail.thumbnails.getFirst().url,
                content1.videoRenderer().longBylineText.runs.getFirst().text,
                content1.videoRenderer().lengthText.simpleText,
                content1.videoRenderer().viewCountText.simpleText,
                content1.videoRenderer().publishedTimeText.simpleText,
                getSnippetText(content1.videoRenderer())
        ))
        .collect(Collectors.toList());
    }

    private Content crawlSearchResults(String searchQuery) {
        RetryService<Content> retryService = new RetryService<>();

        return retryService.retry(() -> {
            Document document = Jsoup.connect("https://www.youtube.com/results?search_query=" + searchQuery)
                    .get();
            Matcher matcher = polymerInitialDataRegex.matcher(document.html());
            if (!matcher.find()) {
                log.warn("Failed to match ytInitialData JSON object");
            }

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(matcher.group(2));
            JsonNode contents = jsonNode.get("contents");
            return Objects.requireNonNull(objectMapper.treeToValue(contents, Content.class));
        });
    }

    private String getSnippetText(VideoRenderer videoRenderer) {
        if (videoRenderer.detailedMetadataSnippets == null || videoRenderer.detailedMetadataSnippets.isEmpty()) {
            return "";
        }
        DetailedMetadataSnippet snippet = videoRenderer.detailedMetadataSnippets.getFirst();
        return joinSnippetTexts(snippet.snippetText.runs);
    }

    private String joinSnippetTexts(ArrayList<Run> runs) {
        if (runs == null || runs.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        for (Run run : runs) {
            sb.append(run.text);
        }
        return sb.toString();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Content(
            ItemSectionRenderer itemSectionRenderer,
            VideoRenderer videoRenderer,
            TwoColumnSearchResultsRenderer twoColumnSearchResultsRenderer
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record ItemSectionRenderer(
            ArrayList<Content> contents
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record VideoRenderer(
            String videoId,
            Title title,
            Thumbnail thumbnail,
            LongBylineText longBylineText,
            LengthText lengthText,
            ViewCountText viewCountText,
            PublishedTimeText publishedTimeText,
            ArrayList<DetailedMetadataSnippet> detailedMetadataSnippets
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record LongBylineText(ArrayList<Run> runs) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record LengthText(
            //Accessibility accessibility,
            String simpleText){
    }

    /*@JsonIgnoreProperties(ignoreUnknown = true)
    record Accessibility(AccessibilityData accessibilityData){}

    @JsonIgnoreProperties(ignoreUnknown = true)
    record AccessibilityData(String label){}*/

    @JsonIgnoreProperties(ignoreUnknown = true)
    record ViewCountText(String simpleText){}

    @JsonIgnoreProperties(ignoreUnknown = true)
    record PublishedTimeText(String simpleText){}

    @JsonIgnoreProperties(ignoreUnknown = true)
    record DetailedMetadataSnippet(
         SnippetText snippetText,
         //SnippetHoverText snippetHoverText,
         boolean maxOneLine){
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record SnippetText(ArrayList<Run> runs){}

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Thumbnail(
            ArrayList<Thumbnails> thumbnails
    ){}

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Thumbnails(
            String url,
            String width,
            String height
    ){}

    @JsonIgnoreProperties(ignoreUnknown = true)
    record TwoColumnSearchResultsRenderer(
            PrimaryContents primaryContents
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record PrimaryContents(
            SectionListRenderer sectionListRenderer
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record SectionListRenderer(
            ArrayList<Content> contents
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Title(
            ArrayList<Run> runs
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    record Run(
            String text
    ) {
    }
}
