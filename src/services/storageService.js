

const STORAGE_KEY = "santaverse_data";

export const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load data from storage", error);
    return null;
  }
};

/**
 * Save data to storage
 * @param {{ deeds: Array, score: number }} data
 */
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save data to storage", error);
  }
};

/**
 * Clear all stored data (optional utility)
 */
export const clearData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear storage", error);
  }
};
