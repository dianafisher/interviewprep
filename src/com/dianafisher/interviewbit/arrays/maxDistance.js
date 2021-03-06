/* maxDistance.js


Given an array A of integers, find the maximum of j - i subjected to the constraint of A[i] <= A[j].

If there is no solution possible, return -1.

Example :

A : [3, 5, 4, 2]

Output : 2
for the pair (3, 4)

*/

module.exports = {

  //param A : array of integers
  //return an integer
  maximumGap : function(A){

    if (A.length == 0) return -1;
    if (A.length == 1) return 0;

    // create an array of length A.length and initilize with zeroes.
    var temp = [];
    for (var i = 0; i < A.length; i++) {
      temp.push(0);
    }
    var maxDiff = -1;

    // Set the first element as the minimum element
    var min = A[0];
    var maxDiff = 0;

    // Loop through the array and set temp[i] = 1 if A[i] is less than the minimum;
    for (var i = 0; i < A.length; i++) {
      if (A[i] > min) {
        temp[i] = 0;
      } else {
        min = A[i];
        temp[i] = 1;
      }
    }

    // console.log(temp);

    // Set i and j equal to the last index in the array
    i = A.length-1;
    var j = A.length-1;

    // Loop through the array backwards until we find A[j] that is greater than A[i].
    while(i >= 0) {
      if (temp[i] == 0) {
        i--;
        continue;
      }
      while(A[i] > A[j] && (j > i)) {
        // continue decreasing j as long as A[j] is less than A[i] and j > i
        j--;
      }
      var diff = j-i;
      maxDiff = Math.max(maxDiff, diff);
      i--;
    }

    return maxDiff;
  },

  secondAttempt: function(A){

    if (A.length == 0) return -1;
    if (A.length == 1) return 0;

    var n = A.length;
    var low = 0;
    var high = A.length-1;
    var mid = Math.floor((low + high) /2);
    // console.log('mid', mid);

    var left = A.slice(0, mid+1);
    var right = A.slice(mid+1);

    // console.log('left', left);
    // console.log('right', right);

    // console.log(`n: ${n}, left: ${left.length}, right: ${right.length}`);

    var maxDiff = Number.NEGATIVE_INFINITY;

    // want the minimum index in left that is <= max index in right
    for (var i = 0; i < left.length; i++) {
      for (var j = right.length - 1; j > -1; j--) {
        if (left[i] <= right[j]) {
          // console.log(`i: ${i}, left[i]: ${left[i]}, j: ${j}, right: ${right[j]}`);
          // var index = right.length + j + 1;
          // console.log('index', index);

          // var iidx = A.indexOf(left[i]);
          // var idx = A.indexOf(right[j]);
          // console.log('iidx', iidx);
          // console.log('idx', idx);
          // console.log(idx - iidx);
          // console.log('found at i = ', i, ' j = ', j+mid+1);
          var diff = (j+mid+1) - i;
          maxDiff = Math.max(maxDiff, diff);
        }
      }
    }

    maxDiff = Math.max(maxDiff, 0);
    return maxDiff;
  },

  bruteForce: function(A) {
    if (A.length == 0) return -1;

    var maxGap = Number.NEGATIVE_INFINITY;

    for (var i = 0; i < A.length; i++) {
      for (var j = i; j < A.length; j++) {
        if (A[i] <= A[j]) {
          var diff = j - i;
          maxGap = Math.max(maxGap, diff);
        }
      }
    }

    return maxGap;
  }
};

var A = [3, 5, 4, 2];
console.log(module.exports.maximumGap(A));  // expect 2

A = [3, 2, 1];
console.log(module.exports.maximumGap(A));

A = [1, 10];
console.log(module.exports.maximumGap(A));  // expect 1

A = [ 46158044, 9306314, 51157916, 93803496, 20512678, 55668109, 488932, 24018019, 91386538, 68676911, 92581441, 66802896, 10401330, 57053542, 42836847, 24523157, 50084224, 16223673, 18392448, 61771874, 75040277, 30393366, 1248593, 71015899, 20545868, 75781058, 2819173, 37183571, 94307760, 88949450, 9352766, 26990547, 4035684, 57106547, 62393125, 74101466, 87693129, 84620455, 98589753, 8374427, 59030017, 69501866, 47507712, 84139250, 97401195, 32307123, 41600232, 52669409, 61249959, 88263327, 3194185, 10842291, 37741683, 14638221, 61808847, 86673222, 12380549, 39609235, 98726824, 81436765, 48701855, 42166094, 88595721, 11566537, 63715832, 21604701, 83321269, 34496410, 48653819, 77422556, 51748960, 83040347, 12893783, 57429375, 13500426, 49447417, 50826659, 22709813, 33096541, 55283208, 31924546, 54079534, 38900717, 94495657, 6472104, 47947703, 50659890, 33719501, 57117161, 20478224, 77975153, 52822862, 13155282, 6481416, 67356400, 36491447, 4084060, 5884644, 91621319, 43488994, 71554661, 41611278, 28547265, 26692589, 82826028, 72214268, 98604736, 60193708, 95417547, 73177938, 50713342, 6283439, 79043764, 52027740, 17648022, 33730552, 42851318, 13232185, 95479426, 70580777, 24710823, 48306195, 31248704, 24224431, 99173104, 31216940, 66551773, 94516629, 67345352, 62715266, 8776225, 18603704, 7611906 ];
console.log(module.exports.maximumGap(A));  // expect 130

A = [ 83564666, 2976674, 46591497, 24720696, 16376995, 63209921, 25486800, 49369261, 20465079, 64068560, 7453256, 14180682, 65396173, 45808477, 10172062, 28790225, 82942061, 88180229, 62446590, 77573854, 79342753, 2472968, 74250054, 17223599, 47790265, 24757250, 40512339, 24505824, 30067250, 82972321, 32482714, 76111054, 74399050, 65518880, 94248755, 76948016, 76621901, 46454881, 40376566, 13867770, 76060951, 71404732, 21608002, 26893621, 27370182, 35088766, 64827587, 67610608, 90182899, 66469061, 67277958, 92926221, 58156218, 44648845, 37817595, 46518269, 44972058, 27607545, 99404748, 39262620, 98825772, 89950732, 69937719, 78068362, 78924300, 91679939, 52530444, 71773429, 57678430, 75699274, 5835797, 74160501, 51193131, 47950620, 4572042, 85251576, 49493188, 77502342, 3244395, 51211050, 44229120, 2135351, 47258209, 77312779, 37416880, 59038338, 96069936, 20766025, 35497532, 67316276, 38312269, 38357645, 41600875, 58590177, 99257528, 99136750, 4796996, 84369137, 54237155, 64368327, 94789440, 40718847, 12226041, 80504660, 8177227, 85151842, 36165763, 72764013, 36326808, 80969323, 22947547, 76322099, 7536094, 18346503, 65759149, 45879388, 53114170, 92521723, 15492250, 42479923, 20668783, 64053151, 68778592, 3669297, 73903133, 28973293, 73195487, 64588362, 62227726, 17909010, 70683505, 86982984, 64191987, 71505285, 45949516, 28244755, 33863602, 18256044, 25110337, 23997763, 81020611, 10135495, 925679, 98158797, 73400633, 27282156, 45863518, 49288993, 52471826, 30553639, 76174500, 28828417, 41628693, 80019078, 64260962, 5577578, 50920883, 16864714, 54950300, 9267396, 56454292, 40872286, 33819401, 75369837, 6552946, 26963596, 22368984, 43723768, 39227673, 98188566, 1054037, 28292455, 18763814, 72776850, 47192134, 58393410, 14487674, 4852891, 44100801, 9755253, 37231060, 42836447, 38104756, 77865902, 67635663, 43494238, 76484257, 80555820, 8632145, 3925993, 81317956, 12645616, 23438120, 48241610, 20578077, 75133501, 46214776, 35621790, 15258257, 20145132, 32680983, 94521866, 43456056, 19341117, 29693292, 38935734, 62721977, 31340268, 91841822, 22303667, 96935307, 29160182, 61869130, 33436979, 32438444, 87945655, 43629909, 88918708, 85650550, 4201421, 11958347, 74203607, 37964292, 56174257, 20894491, 33858970, 45292153, 22249182, 77695201, 34240048, 36320401, 64890030, 81514017, 58983774, 88785054, 93832841, 12338671, 46297822, 26489779, 85959340 ];
console.log(module.exports.maximumGap(A));