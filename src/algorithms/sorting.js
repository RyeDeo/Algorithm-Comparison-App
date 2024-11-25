// Sorting algorithms

export const bubbleSort = (arr) => {
    const array = [...arr];
    let comparisons = 0;
  
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        comparisons++;
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
  
    return { sortedArray: array, comparisons };
  };
  
  export const mergeSort = (arr) => {
    let comparisons = 0;
  
    const merge = (left, right) => {
      let result = [];
      while (left.length && right.length) {
        comparisons++;
        if (left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
      }
      return result.concat(left, right);
    };
  
    const sort = (array) => {
      if (array.length <= 1) return array;
      const mid = Math.floor(array.length / 2);
      const left = sort(array.slice(0, mid));
      const right = sort(array.slice(mid));
      return merge(left, right);
    };
  
    return { sortedArray: sort([...arr]), comparisons };
  };
  
  export const quickSort = (arr) => {
    let comparisons = 0;
  
    const sort = (array) => {
      if (array.length <= 1) return array;
      const pivot = array[array.length - 1];
      const left = array.slice(0, -1).filter((el) => {
        comparisons++;
        return el <= pivot;
      });
      const right = array.slice(0, -1).filter((el) => {
        comparisons++;
        return el > pivot;
      });
      return [...sort(left), pivot, ...sort(right)];
    };
  
    return { sortedArray: sort([...arr]), comparisons };
  };
  