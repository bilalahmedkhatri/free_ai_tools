/**
 * Retry function with exponential backoff and logging
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retry attempts
 * @param baseDelay - Base delay in milliseconds
 * @returns Promise that resolves with the result or rejects with the final error
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // Don't log on the final attempt
      if (i < maxRetries) {
        if (error instanceof Error) {
          console.warn(`Retry attempt ${i + 1} failed:`, error.message);
        } else {
          console.warn(`Retry attempt ${i + 1} failed:`, error);
        }
      }
      
      // If this is the last attempt, throw the error
      if (i === maxRetries) {
        throw lastError;
      }
      
      // Calculate exponential backoff delay
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Waiting ${delay}ms before retry ${i + 1}...`);
      
      // Wait for the calculated delay
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should never be reached, but TypeScript requires it
  throw lastError!;
}