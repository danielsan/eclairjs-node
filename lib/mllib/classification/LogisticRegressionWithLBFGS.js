/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Utils = require('../../utils.js');

var LogisticRegressionModel = require('./LogisticRegressionModel.js');

var kernelP;

/**
 * Train a classification model for Multinomial/Binary Logistic Regression using
 * Limited-memory BFGS. Standard feature scaling and L2 regularization are used by default.
 * NOTE: Labels used in Logistic Regression should be {0, 1, ..., k - 1}
 * for k classes multi-label classification problem.
 * @classdesc
 */
function LogisticRegressionWithLBFGS(P) {
  this.kernelP = kernelP;

  var templateStr = 'var {{refId}} = new LogisticRegressionWithLBFGS();';
  this.refIdP = Utils.evaluate(kernelP, LogisticRegressionWithLBFGS, templateStr, null, true);
}

/**
 * Set the number of possible outcomes for k classes classification problem in
 * Multinomial Logistic Regression.
 * By default, it is binary logistic regression so k will be set to 2.
 * @param {number} numClasses
 * @returns {LogisticRegressionWithLBFGS}
 */
LogisticRegressionWithLBFGS.prototype.setNumClasses = function(numClasses) {
  var templateStr = 'var {{refId}} = {{inRefId}}.setNumClasses({{numClasses}});';

 return Utils.generateAssignment(this, LogisticRegressionWithLBFGS, templateStr, {numClasses : numClasses});
};

LogisticRegressionWithLBFGS.prototype.run = function(input, initialWeights) {
  var templateStr = initialWeights ? 'var {{refId}} = {{inRefId}}.run({{input}}, {{initialWeights}});' : 'var {{refId}} = {{inRefId}}.run({{input}});';

  return Utils.generateAssignment(this, LogisticRegressionModel, templateStr, {input: Utils.prepForReplacement(input), initialWeights: Utils.prepForReplacement(initialWeights)});
};

module.exports = function(kP) {
  kernelP = kP;

  return LogisticRegressionWithLBFGS;
};

