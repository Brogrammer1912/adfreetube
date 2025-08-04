/*
 * Copyright (c) 2025 Akshath Sai Pittala
 * All rights reserved.
 */
package akshathsaipittala.addfreetube.yt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequestMapping("/youtube")
@RequiredArgsConstructor
public class YoutubeController {

    final YoutubeCrawler youtubeCrawler;
    final TimestampService timestampService;

    record TimestampRequest(String videoId, Integer timestamp) {}

    @ResponseBody
    @PostMapping("/timestamp")
    public void saveTimestamp(@RequestBody TimestampRequest request) {
        timestampService.saveTimestamp(request.videoId(), request.timestamp());
    }

    @GetMapping("/search")
    public String search(@RequestParam String query, Model model) {
        var videos = youtubeCrawler.searchVideos(query);
        model.addAttribute("results", videos);
        model.addAttribute("query", query);
        model.addAttribute("count", videos.size());
        return "search-results :: searchResults";
    }

    @GetMapping("/video")
    public String getVideo(@RequestParam("id") String videoId,
                           @RequestParam("title") String title,
                           Model model,
                           @RequestHeader(value = "HX-Request", required = false) String hxRequest) {
        model.addAttribute("videoId", videoId);
        model.addAttribute("title", title);
        Integer timestamp = timestampService.getTimestamp(videoId);
        model.addAttribute("timestamp", timestamp);

        if ("true".equals(hxRequest)) {
            // HTMX request: return only the fragment
            return "video-player :: videoPlayer";
        } else {
            // Full page load: return the main page, preload video info
            model.addAttribute("preloadVideo", true);
            return "index";
        }
    }

}