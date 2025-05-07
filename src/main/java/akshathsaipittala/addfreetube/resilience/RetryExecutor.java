/*
 * Copyright (c) 2025 Akshath Sai Pittala
 * All rights reserved.
 */
package akshathsaipittala.addfreetube.resilience;

@FunctionalInterface
public interface RetryExecutor<T> {

    T run() throws Exception;

}