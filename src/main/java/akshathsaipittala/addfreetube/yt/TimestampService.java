package akshathsaipittala.addfreetube.yt;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TimestampService {

    private final Map<String, Integer> videoTimestamps = new ConcurrentHashMap<>();

    public void saveTimestamp(String videoId, Integer timestamp) {
        videoTimestamps.put(videoId, timestamp);
    }

    public Integer getTimestamp(String videoId) {
        return videoTimestamps.getOrDefault(videoId, 0);
    }
}