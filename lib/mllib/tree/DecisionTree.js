/*
 * Copyright 2016 IBM Corp.
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

var DecisionTreeModel = require('./model/DecisionTreeModel.js');
var RDD = require('../../rdd/RDD.js');

var kernelP;

/**
 * A class which implements a decision tree learning algorithm for classification and regression.
 * It supports both continuous and categorical features.
 * @param strategy The configuration parameters for the tree algorithm which specify the type
 *                 of algorithm (classification, regression, etc.), feature type (continuous,
 *                 categorical), depth of the tree, quantile calculation strategy, etc.
 * @classdesc
 */

function DecisionTree(strategy) {
  this.kernelP = kernelP;

  var templateStr = 'var {{refId}} = new DecisionTree();';

  this.refIdP = Utils.evaluate(kernelP, DecisionTree, templateStr, null, true);
}

/**
 * Method to train a decision tree model over an RDD
 * @param {RDD} input  Training data: RDD of {@link LabeledPoint}
 * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
 */
DecisionTree.prototype.run = function(input) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.run({{input}});';
//
// return Utils.generateAssignment(this, DecisionTreeModel, templateStr , {input : input});
};

module.exports = DecisionTree;
//
// static methods
//


/**
 * Method to train a decision tree model.
 * The method supports binary and multiclass classification and regression.
 *
 * Note: Using [[org.apache.spark.mllib.tree.DecisionTree$#trainClassifier]]
 *       and [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
 *       is recommended to clearly separate classification and regression.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 *              For classification, labels should take values {0, 1, ..., numClasses-1}.
 *              For regression, labels are real numbers.
 * @param {Strategy} strategy  The configuration parameters for the tree algorithm which specify the type
 *                 of algorithm (classification, regression, etc.), feature type (continuous,
 *                 categorical), depth of the tree, quantile calculation strategy, etc.
 * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
 */
DecisionTree.train0 = function(input,strategy) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = DecisionTree.train({{input}},{{strategy}});';
//
// return Utils.generateAssignment(this, DecisionTreeModel, templateStr , {input : input,strategy : strategy});
};


/**
 * Method to train a decision tree model.
 * The method supports binary and multiclass classification and regression.
 *
 * Note: Using [[org.apache.spark.mllib.tree.DecisionTree$#trainClassifier]]
 *       and [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
 *       is recommended to clearly separate classification and regression.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 *              For classification, labels should take values {0, 1, ..., numClasses-1}.
 *              For regression, labels are real numbers.
 * @param {Algo} algo  algorithm, classification or regression
 * @param {Impurity} impurity  impurity criterion used for information gain calculation
 * @param {number} maxDepth  Maximum depth of the tree.
 *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
 * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
 */
DecisionTree.train1 = function(input,algo,impurity,maxDepth) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = DecisionTree.train({{input}},{{algo}},{{impurity}},{{maxDepth}});';
//
// return Utils.generateAssignment(this, DecisionTreeModel, templateStr , {input : input,algo : algo,impurity : impurity,maxDepth : maxDepth});
};


/**
 * Method to train a decision tree model.
 * The method supports binary and multiclass classification and regression.
 *
 * Note: Using [[org.apache.spark.mllib.tree.DecisionTree$#trainClassifier]]
 *       and [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
 *       is recommended to clearly separate classification and regression.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 *              For classification, labels should take values {0, 1, ..., numClasses-1}.
 *              For regression, labels are real numbers.
 * @param {Algo} algo  algorithm, classification or regression
 * @param {Impurity} impurity  impurity criterion used for information gain calculation
 * @param {number} maxDepth  Maximum depth of the tree.
 *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
 * @param {number} numClasses  number of classes for classification. Default value of 2.
 * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
 */
DecisionTree.train2 = function(input,algo,impurity,maxDepth,numClasses) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = DecisionTree.train({{input}},{{algo}},{{impurity}},{{maxDepth}},{{numClasses}});';
//
// return Utils.generateAssignment(this, DecisionTreeModel, templateStr , {input : input,algo : algo,impurity : impurity,maxDepth : maxDepth,numClasses : numClasses});
};


/**
 * Method to train a decision tree model.
 * The method supports binary and multiclass classification and regression.
 *
 * Note: Using [[org.apache.spark.mllib.tree.DecisionTree$#trainClassifier]]
 *       and [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
 *       is recommended to clearly separate classification and regression.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 *              For classification, labels should take values {0, 1, ..., numClasses-1}.
 *              For regression, labels are real numbers.
 * @param {Algo} algo  classification or regression
 * @param {Impurity} impurity  criterion used for information gain calculation
 * @param {number} maxDepth  Maximum depth of the tree.
 *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
 * @param {number} numClasses  number of classes for classification. Default value of 2.
 * @param {number} maxBins  maximum number of bins used for splitting features
 * @param {QuantileStrategy} quantileCalculationStrategy   algorithm for calculating quantiles
 * @param {Map} categoricalFeaturesInfo  Map storing arity of categorical features.
 *                                E.g., an entry (n -> k) indicates that feature n is categorical
 *                                with k categories indexed from 0: {0, 1, ..., k-1}.
 * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
 */
DecisionTree.train3 = function(input,algo,impurity,maxDepth,numClasses,maxBins,quantileCalculationStrategy,categoricalFeaturesInfo) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = DecisionTree.train({{input}},{{algo}},{{impurity}},{{maxDepth}},{{numClasses}},{{maxBins}},{{quantileCalculationStrategy}},{{categoricalFeaturesInfo}});';
//
// return Utils.generateAssignment(this, DecisionTreeModel, templateStr , {input : input,algo : algo,impurity : impurity,maxDepth : maxDepth,numClasses : numClasses,maxBins : maxBins,quantileCalculationStrategy : quantileCalculationStrategy,categoricalFeaturesInfo : categoricalFeaturesInfo});
};


/**
 * Method to train a decision tree model for binary or multiclass classification.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 *              Labels should take values {0, 1, ..., numClasses-1}.
 * @param {number} numClasses  number of classes for classification.
 * @param {object} categoricalFeaturesInfo  object name key pair map storing arity of categorical features.
 *                                E.g., an entry (n -> k) indicates that feature n is categorical
 *                                with k categories indexed from 0: {0, 1, ..., k-1}.
 * @param {string} impurity  Criterion used for information gain calculation.
 *                 Supported values: "gini" (recommended) or "entropy".
 * @param {number} maxDepth  Maximum depth of the tree.
 *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
 *                  (suggested value: 5)
 * @param {number} maxBins  maximum number of bins used for splitting features
 *                 (suggested value: 32)
 * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
 */
DecisionTree.trainClassifier = function(input,numClasses,categoricalFeaturesInfo,impurity,maxDepth,maxBins) {
  var templateStr = 'var {{refId}} = DecisionTree.trainClassifier({{input}},{{numClasses}},{{categoricalFeaturesInfo}},{{impurity}},{{maxDepth}},{{maxBins}});';

  return Utils.evaluate(kernelP, DecisionTreeModel, templateStr, {input: Utils.prepForReplacement(input), numClasses :numClasses, categoricalFeaturesInfo: JSON.stringify(categoricalFeaturesInfo), impurity: Utils.prepForReplacement(impurity), maxDepth: maxDepth, maxBins: maxBins});
};

/**
 * Method to train a decision tree model for regression.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
 *              Labels are real numbers.
 * @param {Map} categoricalFeaturesInfo  Map storing arity of categorical features.
 *                                E.g., an entry (n -> k) indicates that feature n is categorical
 *                                with k categories indexed from 0: {0, 1, ..., k-1}.
 * @param {string} impurity  Criterion used for information gain calculation.
 *                 Supported values: "variance".
 * @param {number} maxDepth  Maximum depth of the tree.
 *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
 *                  (suggested value: 5)
 * @param {number} maxBins  maximum number of bins used for splitting features
 *                 (suggested value: 32)
 * @returns {DecisionTreeModel}  DecisionTreeModel that can be used for prediction
 */
DecisionTree.trainRegressorwithnumber = function(input,categoricalFeaturesInfo,impurity,maxDepth,maxBins) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = DecisionTree.trainRegressor({{input}},{{categoricalFeaturesInfo}},{{impurity}},{{maxDepth}},{{maxBins}});';
//
// return Utils.generateAssignment(this, DecisionTreeModel, templateStr , {input : input,categoricalFeaturesInfo : categoricalFeaturesInfo,impurity : impurity,maxDepth : maxDepth,maxBins : maxBins});
};


/**
 * Java-friendly API for [[org.apache.spark.mllib.tree.DecisionTree$#trainRegressor]]
 * @param {JavaRDD} input
 * @param {Map} categoricalFeaturesInfo
 * @param {string} impurity
 * @param {number} maxDepth
 * @param {number} maxBins
 * @returns {DecisionTreeModel}
 */
DecisionTree.trainRegressorwithnumber = function(input,categoricalFeaturesInfo,impurity,maxDepth,maxBins) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = DecisionTree.trainRegressor({{input}},{{categoricalFeaturesInfo}},{{impurity}},{{maxDepth}},{{maxBins}});';
//
// return Utils.generateAssignment(this, DecisionTreeModel, templateStr , {input : input,categoricalFeaturesInfo : categoricalFeaturesInfo,impurity : impurity,maxDepth : maxDepth,maxBins : maxBins});
};

module.exports = function(kP) {
  kernelP = kP;

  return DecisionTree;
};