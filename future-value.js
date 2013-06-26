futureValuePthlyAnnuityImmediate : function(annualContribution, periodsPerYear, contributionsPerYear, annualRate) {
  var annualEffectiveRate = Math.pow(1 + annualRate/periodsPerYear, periodsPerYear) - 1;
  var contributionEffectiveRate = Math.pow(1 + annualEffectiveRate, 1/contributionsPerYear) - 1;
  return annualContribution/contributionsPerYear * annualEffectiveRate/contributionEffectiveRate;
}

futureValuePthlyAnnuityDue : function((annualContribution, periodsPerYear, contributionsPerYear, annualRate) {
  var annualEffectiveRate = Math.pow(1 + annualRate/periodsPerYear, periodsPerYear) - 1;
  var contributionEffectiveRate = Math.pow(1 + annualEffectiveRate, 1/contributionsPerYear) - 1;
  return annualContribution/contributionsPerYear * annualEffectiveRate/contributionEffectiveRate * (contributionEffectiveRate + 1);
}

futureValueCompoundIncreasingAnnuityImmediate : function(payment, periods, ratePerPeriod, factorPerPeriod) {
  var accumulatedValueFactor = ((Math.pow(1 + ratePerPeriod, periods) - Math.pow(1+factorPerPeriod, periods))/(ratePerPeriod - factorPerPeriod));
  return accumulatedValueFactor * payment;
}

futureValueCompoundIncreasingAnnuityDue : function(payment, periods, ratePerPeriod, factorPerPeriod) {
  return futureValueCompoundIncreasingAnnuityImmediate(payment, periods, ratePerPeriod, factorPerPeriod) * (1 + ratePerPeriod);
}

accumulatedValueStartOfMonth : function(startingValue, years, annualRate, inflation, annualContribution) {
  var effectiveAnnualRate = Math.pow(1 + annualRate/12, 12) - 1;
  var effectiveAnnualContribution = futureValueCompoundIncreasingAnnuityDue(annualContribution/12, 12, annualRate/12, 0);
  var futureValue = futureValueCompoundIncreasingAnnuityImmediate(effectiveAnnualContribution, years, effectiveAnnualRate, inflation) + startingValue * Math.pow(1 + effectiveAnnualRate, years); 
  return futureValue;
}

accumulatedValueEndOfMonth : function(startingValue, years, annualRate, inflation, annualContribution) {
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
  var effectiveAnnualContribution = (futureValue - startingValue * Math.pow(1 + effectiveAnnualRate, years)) / annualFactor;
  var contribution = effectiveAnnualContribution / monthlyFactor;
  return contribution;
}

contributionEndOfMonth : function(startingValue, years, annualRate, inflation, futureValue) {
  var monthlyRate = 1 + annualRate/12;
  var effectiveAnnualRate = Math.pow(monthlyRate, 12) - 1;
  var annualFactor = futureValueCompoundIncreasingAnnuityImmediate(1, years, effectiveAnnualRate, inflation);
  var monthlyFactor = futureValueCompoundIncreasingAnnuityImmediate(1, 12, monthlyRate-1, 0);
  var effectiveAnnualContribution = (futureValue - startingValue * Math.pow(1 + effectiveAnnualRate, years)) / annualFactor;
  var contribution = effectiveAnnualContribution / monthlyFactor;
  return contribution;
}

presentValuePthlyAnnuityImmediate : function(annualPayment, periodsPerYear, paymentsPerYear, annualRate) {
  var annualEffectiveRate = Math.pow(1 + annualRate/periodsPerYear, periodsPerYear) - 1;
  var paymentEffectiveRate = Math.pow(1 + annualEffectiveRate, 1/paymentsPerYear) - 1;
  var discountFactor = 1/(1+annualEffectiveRate);
  return annualPayment / paymentsPerYear * (1 - discountFactor) / paymentEffectiveRate;
}

presentValuePthlyAnnuityDue : function(annualPayment, periodsPerYear, paymentsPerYear, annualRate) {
  var annualEffectiveRate = Math.pow(1 + annualRate/periodsPerYear, periodsPerYear) - 1;
  var discountFactor = 1/(1+annualEffectiveRate);
  return annualPayment / paymentsPerYear * (1 - discountFactor) / (1 - Math.pow(discountFactor, 1/paymentsPerYear));
}

presentValueCompoundIncreasingAnnuityImmediate : function(payment, periods, ratePerPeriod, factorPerPeriod) {
  return presentValueCompoundIncreasingAnnuityDue(payment, periods, ratePerPeriod, factorPerPeriod) / (1 + ratePerPeriod);
}

presentValueCompoundIncreasingAnnuityDue : function(payment, periods, ratePerPeriod, factorPerPeriod) {
  var effectiveRatePerPeriod = (1 + ratePerPeriod)/(1 + factorPerPeriod) - 1;
  var discountFactor = 1/(1+effectiveRatePerPeriod);
  var presentValueFactor = (1 - Math.pow(discountFactor, periods)) / (1 - discountFactor);
  return presentValueFactor * payment;
}