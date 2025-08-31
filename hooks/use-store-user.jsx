import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";

export function useStoreUser() {
  const { isSignedIn, has } = useAuth();
  const storeUser = useMutation(api.users.store);
  const updateUserPlan = useMutation(api.users.updateUserPlan);

  useEffect(() => {
    if (isSignedIn) {
      // Store the user first
      storeUser().catch(console.error);
      
      // Check if user has pro plan and update accordingly
      const isPro = has?.({ plan: "pro_user" }) || false;
      console.log("User plan status:", isPro ? "pro" : "free");
      
      if (isPro) {
        updateUserPlan({ plan: "pro" }).catch(console.error);
      } else {
        updateUserPlan({ plan: "free" }).catch(console.error);
      }
    }
  }, [isSignedIn, has, storeUser, updateUserPlan]);

  return { isSignedIn };
}