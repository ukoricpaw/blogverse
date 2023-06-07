export const calculatePaginationRange = (count: number, currentPage: number) => {
  const currentPageRange = [];
  let start = currentPage - 2;
  let end = currentPage + 2;
  if (currentPage < 3) {
    if (count > 5) {
      currentPageRange.push(...[1, 2, 3, 4, 5])
    }
    else {
      for (let i = 1; i <= count; i++) {
        currentPageRange.push(i);
      }
    }
  }
  else if (currentPage > count || (currentPage <= count && currentPage > count - 3)) {
    if (count > 5) {
      currentPageRange.push(...[count - 4, count - 3, count - 2, count - 1, count])
    }
    else {
      for (let i = 1; i <= count; i++) {
        currentPageRange.push(i);
      }
    }
  }
  else {
    for (let i = start; i <= end; i++) {
      currentPageRange.push(i)
    }

  }

  return currentPageRange;
}