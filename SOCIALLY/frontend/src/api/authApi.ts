import { AuthResponse } from "@/hooks/useAuth";

export const fetchUser = async (
  url: string,
  payload: object
): Promise<AuthResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate");
  }

  const data: AuthResponse = await response.json();
  return data;
};
