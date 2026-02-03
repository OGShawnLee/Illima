export type Result<Data, Error> =
  | { data: null; failed: true; error: Error }
  | { data: Data; failed: false; error: null };

export async function useAwait<T, E = unknown>(getter: () => Promise<T>): Promise<Result<T, E>> {
  try {
    return { data: await getter(), failed: false, error: null };
  } catch (error) {
    return { data: null, failed: true, error: error as E };
  }
}
