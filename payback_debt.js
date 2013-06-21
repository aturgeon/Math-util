for (var i = 0; i < 26; i++) {
  aaa[i+1] = {capital : aaa[i].capital - aaa[i].payment, payment : aaa[i].payment, rate : aaa[i].rate};
  aaa[i+1].interest = aaa[i].capital * (aaa[i].rate + 1);
  aaa[i+1].cumulatedInterest = aaa[i].cumulatedInterest + aaa[i+1].cumulatedInterest;
  if (i+1%13 == 0) {
    aaa[i+1].capital = aaa[i+1].capital + aaa[i].cumulatedInterest;
    aaa[i+1].cumulatedInterest = 0;
  }
}

