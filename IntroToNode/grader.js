function average(arrScore){
    var l= arrScore.length;
    var total = 0;
    for(var i = 0; i<l; i++ ){
        total += arrScore[i];
    }
    var avg = Math.round(total/l);
    console.log(avg);
}

var scores = [90,98,89,100,100,86,94];
average(scores);

var scores2 = [40,65,77,82,80,54,73,63,95,49];
average(scores2);
