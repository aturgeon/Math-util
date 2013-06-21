futureValueCompoundIncreasingAnnuityImmediate : function(payment, periods, ratePerPeriod, factorPerPeriod) {
  var accumulatedValueFactor = ((Math.pow(1 + ratePerPeriod, years) - Math.pow(1+factorPerPeriod, years))/(ratePerPeriod - factorPerPeriod));
  return accumulatedValueFactor * payment;
}

futureValueCompoundIncreasingAnnuityDue : function(payment, periods, ratePerPeriod, factorPerPeriod) {
  return futureValueCompoundIncreasingAnnuityImmediate(payment, periods, ratePerPeriod, factorPerPeriod) * (1 + ratePerPeriod
}

futureValueStartOfMonth : function(startingValue, years, annualRate, inflation, annualContribution) {
  var effectiveAnnualRate = Math.pow(1 + annualRate/12, 12) - 1;
  var effectiveAnnualContribution = futureValueCompoundIncreasingAnnuityDue(annualContribution/12, 12, annualRate/12, 0);
  var futureValue = futureValueCompoundIncreasingAnnuityImmediate(effectiveAnnualContribution, years, effectiveAnnualRate, inflation) + startingValue * Math.pow(1 + effectiveAnnualRate, years); 
  return futureValue;
}

futureValueEndOfMonth : function(startingValue, years, annualRate, inflation, annualContribution) {
  var effectiveAnnualRate = Math.pow(1 + annualRate/12, 12) - 1;
  var effectiveAnnualContribution = futureValueCompoundIncreasingAnnuityImmediate(annualContribution/12, 12, annualRate/12, 0);
  var futureValue = futureValueCompoundIncreasingAnnuityImmediate(effectiveAnnualContribution, years, effectiveAnnualRate, inflation) + startingValue * Math.pow(1 + effectiveAnnualRate, years); 
  return futureValue;
}

startingValueStartOfMonth : function(years, annualRate, inflation, annualContribution, futureValue) {
  var effectiveAnnualRate = Math.pow(1 + annualRate/12, 12) - 1;
  var effectiveAnnualContribution = futureValueCompoundIncreasingAnnuityDue(annualContribution/12, 12, annualRate/12, 0);
  var startingValue = (futureValue - futureValueCompoundIncreasingAnnuityImmediate(effectiveAnnualContribution, years, effectiveAnnualRate, inflation)) / Math.pow(1 + effectiveAnnualRate, years); 
  return startingValue;
}

startingValueEndOfMonth : function(years, annualRate, inflation, annualContribution, futureValue) {
  var effectiveAnnualRate = Math.pow(1 + annualRate/12, 12) - 1;
  var effectiveAnnualContribution = futureValueCompoundIncreasingAnnuityImmediate(annualContribution/12, 12, annualRate/12, 0);
  var startingValue = (futureValue - futureValueCompoundIncreasingAnnuityImmediate(effectiveAnnualContribution, years, effectiveAnnualRate, inflation)) / Math.pow(1 + effectiveAnnualRate, years); 
  return startingValue;
}

contributionStartOfMonth : function(startingValue, years, annualRate, inflation, futureValue) {
  var monthlyRate = 1 + annualRate/12;
  var effectiveAnnualRate = Math.pow(monthlyRate, 12) - 1;
  var annualFactor = futureValueCompoundIncreasingAnnuityImmediate(1, years, effectiveAnnualRate, inflation);
  var monthlyFactor = futureValueCompoundIncreasingAnnuityDue(1, 12, monthlyRate-1, 0);
  
  var interestWithInflation = (1 + effectiveAnnualRate)/(1 + inflation) - 1;
  var effectiveAnnualContribution =  (futureValue - startingValue * Math.pow(1 + effectiveAnnualRate, years)) * ((1+effectiveAnnualRate) * interestWithInflation) / ((1 + interestWithInflation) * (Math.pow(1 + interestWithInflation, years) - 1));
  var contribution = effectiveAnnualContribution * (monthlyRate - 1) / (Math.pow(monthlyRate, 13) - monthlyRate);
  return contribution;
}

contributionEndOfMonth : function(startingValue, years, annualRate, inflation, futureValue) {
  var monthlyRate = 1 + annualRate/12;
  var effectiveAnnualRate = Math.pow(monthlyRate, 12) - 1;
  var interestWithInflation = (1 + effectiveAnnualRate)/(1 + inflation) - 1;
  var effectiveAnnualContribution =  (futureValue - startingValue * Math.pow(1 + effectiveAnnualRate, years)) * ((1+effectiveAnnualRate) * interestWithInflation) / ((1 + interestWithInflation) * (Math.pow(1 + interestWithInflation, years) - 1));
  var contribution = effectiveAnnualContribution * (monthlyRate - 1) / (Math.pow(monthlyRate, 12) - 1);
  return contribution;
}

accumulatedValueAnnuityDue : function(years, rate) {
  return (Math.pow(1 + rate, years) - 1) * (1 + rate)/rate;
}

accumulatedValueAnnuityImmediate : function(years, rate) {
  return (Math.pow(1 + rate, years) - 1)/rate;
}