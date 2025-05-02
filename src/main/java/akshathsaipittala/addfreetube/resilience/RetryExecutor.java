package akshathsaipittala.addfreetube.resilience;

@FunctionalInterface
public interface RetryExecutor<T> {

    T run() throws Exception;

}