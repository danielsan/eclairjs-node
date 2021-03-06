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

var LinearRegressionModel = require('./LinearRegressionModel.js');

var kernelP;

/**
 * Construct a LinearRegression object with default parameters: {stepSize: 1.0, numIterations: 100, miniBatchFraction: 1.0}.
 * @constructor
 * @classdesc Train a linear regression model with no regularization using Stochastic Gradient Descent.
 * This solves the least squares regression formulation f(weights) = 1/n ||A weights-y||^2^ (which is the mean squared error).
 * Here the data matrix has n rows, and the input RDD holds the set of rows of A, each with its corresponding right hand side label y.
 * See also the documentation for the precise formulation.
 */
function LinearRegressionWithSGD() {
}

LinearRegressionWithSGD.DEFAULT_NUM_ITERATIONS = 100;

/**
 * Train a Linear Regression model given an RDD of (label, features) pairs. We run a fixed number
 * of iterations of gradient descent using the specified step size. Each iteration uses
 * `miniBatchFraction` fraction of the data to calculate a stochastic gradient. The weights used
 * in gradient descent are initialized using the initial weights provided.
 *
 * @param {RDD} input  RDD of (label, array of features) pairs. Each pair describes a row of the data
 *              matrix A as well as the corresponding right hand side label y
 * @param {number} numIterations  Number of iterations of gradient descent to run.
 * @param {number} stepSize  Step size to be used for each iteration of gradient descent.
 * @param {number} miniBatchFraction  Optional Fraction of data to be used per iteration.
 * @param {Vector} initialWeights  Optional Initial set of weights to be used. Array should be equal in size to
 *        the number of features in the data.
 *
 * @returns {LinearRegressionModel}
 */

LinearRegressionWithSGD.train = function(rdd, numIterations, miniBatchFraction, initialWeights) {
  var templateStr = 'var {{refId}} = LinearRegressionWithSGD.train({{rdd}}, {{numIterations}});';

  return Utils.evaluate(kernelP, LinearRegressionModel, templateStr, {rdd: Utils.prepForReplacement(rdd), numIterations: numIterations});
};

module.exports = function(kP) {
  kernelP = kP;
  return LinearRegressionWithSGD;
};

