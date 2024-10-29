// services/useLogActivity.ts
import { useMutation } from "@tanstack/react-query";
import { logActivity } from "./activityService";

export const useLogActivity = () => {
  return useMutation({
    mutationFn: logActivity,
  });
};
