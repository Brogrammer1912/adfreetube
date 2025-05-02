package akshathsaipittala.addfreetube.crawler;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/youtube")
@RequiredArgsConstructor
public class YoutubeController {

    final YoutubeCrawler youtubeCrawler;

    @GetMapping("/search")
    public String getYoutube(Model model) {
        model.addAttribute("videos", youtubeCrawler.getVideos("test"));
        return "search-results :: results";
    }
}
