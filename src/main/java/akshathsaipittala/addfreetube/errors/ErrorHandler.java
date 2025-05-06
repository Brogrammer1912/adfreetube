package akshathsaipittala.addfreetube.errors;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;

@Slf4j
@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(NullPointerException.class)
    public Object handleNullPointerException(NullPointerException ex, HttpServletRequest request) {
        log.error("NullPointerException: {}", ex.getMessage(), ex);

        // Check if request expects JSON response
//        if (isRestRequest(request)) {
//            return createJsonErrorResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR);
//        } else {
            return createErrorModelAndView(ex, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }

    /** private boolean isRestRequest(HttpServletRequest request) {
        String acceptHeader = request.getHeader("Accept");
        return acceptHeader != null &&
               (acceptHeader.contains("application/json") ||
                acceptHeader.contains("application/xml"));
    }

    private ResponseEntity<Map<String, Object>> createJsonErrorResponse(Exception ex, HttpStatus status) {
        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("timestamp", LocalDateTime.now().toString());
        errorDetails.put("status", status.value());
        errorDetails.put("error", status.getReasonPhrase());
        errorDetails.put("message", ex.getMessage());

        return new ResponseEntity<>(errorDetails, status);
    }*/

    private ModelAndView createErrorModelAndView(Exception ex, HttpStatus status) {
        ModelAndView modelAndView = new ModelAndView("error");
        modelAndView.addObject("timestamp", LocalDateTime.now().toString());
        modelAndView.addObject("status", status.value());
        modelAndView.addObject("error", status.getReasonPhrase());
        modelAndView.addObject("message", ex.getMessage());
        modelAndView.addObject("exception", ex.getClass().getSimpleName());

        return modelAndView;
    }
}