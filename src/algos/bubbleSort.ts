import { BarMovement, BarProps } from '../types';

// const bubbleSort: Algo = function (bars: BarProps[], opts) {
//   const barsArray = bars.slice(0);

//   let wasSorted = true;
//   for (let passes = 0; passes < barsArray.length - 1; passes++) {
//     const amountSorted = passes; // One element is sorted in every pass.
//     console.log('Current pass: ', passes);

//     for (let i = 0; i < barsArray.length - 1 - amountSorted; i++) {
//       console.log(`In pass ${passes}, and iteration: ${i}`);
//       if (barsArray[i].height > barsArray[i + 1].height) {
//         wasSorted = false;

//         opts.addMovement(barsArray[i + 1].id, new BarMovement([i + 1, i]));
//         opts.addMovement(barsArray[i].id, new BarMovement([i, i + 1]));

//         [barsArray[i + 1], barsArray[i]] = [barsArray[i], barsArray[i + 1]];
//       }
//     }
//     // if (wasSorted) return console.log('No need for sorting in pass: ', passes);
//   }
// };

// export default bubbleSort;
