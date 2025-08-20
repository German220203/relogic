"use client";
import { useState } from "react";
import { AxiosResponse } from "axios";

export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function request(
    fn: () => Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T> | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(); // res es AxiosResponse<T>
      return res;             // ✅ mantenemos AxiosResponse completo
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { request, loading, error };
}
