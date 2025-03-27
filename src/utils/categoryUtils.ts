type CategoryImages = {
  [key: string]: string;
};

type CategoryColors = {
  [key: string]: string;
};

export const getCategoryImage = (category?: string): string => {
  // Default image for fallback
  const defaultImage = "/images/default-event.jpg";

  if (!category) {
    return defaultImage;
  }

  // Map of category keywords to images
  const categoryMap: CategoryImages = {
    music: "/images/categories/music.jpg",
    sports: "/images/categories/sports.jpg",
    museum: "/images/categories/museum.jpg",
    family: "/images/categories/family.jpg",
  };

  // Try exact match first
  const lowerCategory = category.toLowerCase().trim();
  if (categoryMap[lowerCategory]) {
    return categoryMap[lowerCategory];
  }

  // Try partial match
  for (const [keyword, image] of Object.entries(categoryMap)) {
    if (lowerCategory.includes(keyword)) {
      return image;
    }
  }

  return defaultImage;
};

export const getCategoryColor = (category?: string): string => {
  if (!category) return "#ec20ec"; // Default color

  const colorMap: CategoryColors = {
    music: "#2196f3", // blue
    sports: "#ff9800", // orange
    family: "#4caf50", // green
    "museum visit": "#9c27b0", // purple
  };
  return colorMap[category.toLowerCase()] || "#ec20ec"; // purple for others
};
