package akshathsaipittala.addfreetube.web;

import akshathsaipittala.addfreetube.yt.YoutubeCrawler;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

    final YoutubeCrawler youtubeCrawler;

    @GetMapping("/")
    @Cacheable("suggested")
    public String home(Model model) {
        var videos = youtubeCrawler.getVideos("trailer");
        model.addAttribute("videos", videos);
        model.addAttribute("preloadVideo", false);
        return "index";
    }
}
