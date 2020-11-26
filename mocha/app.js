module.exports = {
  exersice1: function (txt) {
    var arr = txt.split(" ");
    var arr2 = [];
    var j = 0;
    for (var i = 0; i < txt.length; i++) {
      if (txt[i] > 0 && txt[i] < 10) {
        arr2[txt[i] - 1] = arr[j];
        j++;
      }
    }
    var newTxt="";
    for (x in arr2) {
      newTxt += arr2[x] + " ";
    }
    return newTxt;
  },
  exersice2: function (array1,array2) {
    let result = array2;

    var loopEnd = array1.length;
    if (array1.length > array2.length) {
      loopEnd = array2.length;
      result = array1;
    }
    for (var i = 0; i < loopEnd; i++) {
      result[i] = array1[i] + array2[i];
    }

    return result;
  },
  exersice3: function (array1,array2) {
    const result = [];
    for (i = 0; i < array1.length; i++) {
      for (j = 0; j < array2.length; j++) {
        if (array2[j].includes(array1[i])) {
          if (result.indexOf(array1[i]) === -1) result.push(array1[i]);
        }
      }
    }
    return result;
  },
};
