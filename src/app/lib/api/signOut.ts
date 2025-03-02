export async function signOut(token: string) {
    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to sign out");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error signing out:", error);
      return { error: "Failed to sign out" };
    }
}