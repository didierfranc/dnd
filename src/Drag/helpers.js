export const order = (currentIndex, selectedIndex, newSelectedIndex, max) =>
  currentIndex === selectedIndex
    ? newSelectedIndex > max ? max : newSelectedIndex
    : selectedIndex < currentIndex && newSelectedIndex >= currentIndex
      ? currentIndex - 1
      : selectedIndex > currentIndex && newSelectedIndex <= currentIndex
        ? currentIndex + 1
        : currentIndex
