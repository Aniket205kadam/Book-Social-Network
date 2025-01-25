// Save authentication state to localStorage
export const saveAuthenticationState = (state) => {
  try {
    if (!state) {
      throw new Error("State is null or undefined.");
    }
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authentication", serializedState);
  } catch (error) {
    console.error("Error saving authentication to localStorage:", error);
  }
};

// Load authentication state from localStorage
export const loadAuthenticationState = () => {
  try {
    const serializedState = localStorage.getItem("authentication");
    if (!serializedState) {
      return undefined; // Return undefined if no data is found
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading authentication from localStorage:", error);
    return undefined; // Return undefined in case of an error
  }
};
