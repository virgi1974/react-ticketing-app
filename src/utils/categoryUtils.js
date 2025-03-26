export const getCategoryImage = (category) => {
  // Default image for fallback
  const defaultImage = "/images/default-event.jpg";

  if (!category) {
    return defaultImage;
  }

  // Map of category keywords to images
  const categoryMap = {
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

export const getCategoryColor = (category) => {
  const colorMap = {
    music: "#2196f3", // blue
    sports: "#ff9800", // orange
    family: "#4caf50", // green
    "museum visit": "#9c27b0", // green
  };
  return colorMap[category.toLowerCase()] || "#ec20ec"; // purple for others
};
