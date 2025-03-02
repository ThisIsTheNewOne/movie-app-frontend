export async function addToUserList(movieId: string, token: string) {
    try {
      const response = await fetch("/api/films/user/list/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: movieId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add movie to user list");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error adding movie to user list:", error);
      return { error: "Failed to add movie to user list" };
    }
  }