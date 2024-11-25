// Searching algorithms

export const linearSearch = (arr, key) => {
    let comparisons = 0;
  
    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      if (arr[i] === key) return { index: i, comparisons };
    }
    return { index: -1, comparisons };
  };
  
  export const binarySearch = (arr, key) => {
    let comparisons = 0;
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      comparisons++;
  
      if (arr[mid] === key) return { index: mid, comparisons };
      if (arr[mid] < key) left = mid + 1;
      else right = mid - 1;
    }
  
    return { index: -1, comparisons };
  };
  