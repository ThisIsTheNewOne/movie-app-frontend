export async function removeFromUserList(movieId: string, token: string) {
    try {
      const response = await fetch(`/api/films/user/list/${movieId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to remove movie from user list");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error removing movie from user list:", error);
      return { error: "Failed to remove movie from user list" };
    }
  }
  