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

var Utils = require('../utils.js');
var DataFrame = require('./DataFrame.js');

/**
 * :: Experimental ::
 * Statistic functions for {@link DataFrame}s.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @classdesc
 */

function DataFrameStatFunctions(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Calculate the sample covariance of two numerical columns of a DataFrame.
 * @param {string} col1  the name of the first column
 * @param {string} col2  the name of the second column
 *
 * @example
 *    val df = sc.parallelize(0 until 10).toDF("id").withColumn("rand1", rand(seed=10))
 *      .withColumn("rand2", rand(seed=27))
 *    df.stat.cov("rand1", "rand2")
 *    res1: Double = 0.065...
 *
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Promise.<number>}  the covariance of the two columns.
 */
DataFrameStatFunctions.prototype.cov = function(col1, col2) {
  function _resolve(result, resolve, reject) {
    var returnValue = parseInt(result);
    resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.cov({{col1}}, {{col2}});';

  return Utils.generateResultPromise(this, templateStr, {col1: Utils.prepForReplacement(col1), col2: Utils.prepForReplacement(col2)}, _resolve);
};

/**
 * Calculates the correlation of two columns of a DataFrame. Currently only supports the Pearson
 * Correlation Coefficient. For Spearman Correlation, consider using RDD methods found in
 * MLlib's Statistics.
 *
 * @param {string} col1  the name of the column
 * @param {string} col2  the name of the column to calculate the correlation against
 * @param {string} method Optional currently only supports the "pearson"
 *
 * @example
 *    val df = sc.parallelize(0 until 10).toDF("id").withColumn("rand1", rand(seed=10))
 *      .withColumn("rand2", rand(seed=27))
 *    df.stat.corr("rand1", "rand2")
 *    res1: Double = 0.613...
 *
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Promise.<number>}  The Pearson Correlation Coefficient as a Double.
 */
DataFrameStatFunctions.prototype.corr = function(col1, col2, method) {
  function _resolve(result, resolve, reject) {
    var returnValue = parseInt(result);
    resolve(returnValue);
  }

  var templateStr = method ? '{{inRefId}}.corr({{col1}}, {{col2}}, {{method}});' : '{{inRefId}}.corr({{col1}}, {{col2}});';

  return Utils.generateResultPromise(this, templateStr, {col1: Utils.prepForReplacement(col1), col2: Utils.prepForReplacement(col2), method: Utils.prepForReplacement(method)}, _resolve);
};

/**
 * Computes a pair-wise frequency table of the given columns. Also known as a contingency table.
 * The number of distinct values for each column should be less than 1e4. At most 1e6 non-zero
 * pair frequencies will be returned.
 * The first column of each row will be the distinct values of `col1` and the column names will
 * be the distinct values of `col2`. The name of the first column will be `$col1_$col2`. Counts
 * will be returned as `Long`s. Pairs that have no occurrences will have zero as their counts.
 * Null elements will be replaced by "null", and back ticks will be dropped from elements if they
 * exist.
 *
 *
 * @param {string} col1  The name of the first column. Distinct items will make the first item of
 *             each row.
 * @param {string} col2  The name of the second column. Distinct items will make the column names
 *             of the DataFrame.
 *
 * @example
 *    val df = sqlContext.createDataFrame(Seq((1, 1), (1, 2), (2, 1), (2, 1), (2, 3), (3, 2),
 *      (3, 3))).toDF("key", "value")
 *    val ct = df.stat.crosstab("key", "value")
 *    ct.show()
 *    +---------+---+---+---+
 *    |key_value|  1|  2|  3|
 *    +---------+---+---+---+
 *    |        2|  2|  0|  1|
 *    |        1|  1|  1|  0|
 *    |        3|  0|  1|  1|
 *    +---------+---+---+---+
 *
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {DataFrame}  A DataFrame containing for the contingency table.
 */
DataFrameStatFunctions.prototype.crosstab = function(col1, col2) {
  var templateStr = 'var {{refId}} = {{inRefId}}.crosstab({{col1}}, {{col2}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {col1: Utils.prepForReplacement(col1), col2: Utils.prepForReplacement(col2)});
};

/**
 * Finding frequent items for columns, possibly with false positives. Using the
 * frequent element count algorithm described in
 * [[http://dx.doi.org/10.1145/762471.762473, proposed by Karp, Schenker, and Papadimitriou]].
 * The `support` should be greater than 1e-4.
 *
 * This function is meant for exploratory data analysis, as we make no guarantee about the
 * backward compatibility of the schema of the resulting {@link DataFrame}.
 *
 * @param {string[]} cols  the names of the columns to search frequent items in.
 * @param {number} support  Optional The minimum frequency for an item to be considered `frequent`. Should be greater
 *                than 1e-4. defaults to 1% (0.01)
 *
 * @example
 *    // find the items with a frequency greater than 0.4 (observed 40% of the time) for columns
 *    // "a" and "b"
 *    var freqSingles = df.stat.freqItems(["a", "b"]), 0.4)
 *    freqSingles.show()
 *    +-----------+-------------+
 *    |a_freqItems|  b_freqItems|
 *    +-----------+-------------+
 *    |    [1, 99]|[-1.0, -99.0]|
 *    +-----------+-------------+
 *
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {DataFrame}  A Local DataFrame with the Array of frequent items for each column.
 */
DataFrameStatFunctions.prototype.freqItems = function(cols, support) {
  var templateStr = support ? 'var {{refId}} = {{inRefId}}.freqItems({{cols}}, {{support}});' : 'var {{refId}} = {{inRefId}}.freqItems({{cols}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {cols: Utils.prepForReplacement(cols), support: Utils.prepForReplacement(support)});
};

/**
 * Returns a stratified sample without replacement based on the fraction given on each stratum.
 * @param {string} col  column that defines strata
 * @param {object} fractions is expected to be a HashMap, the key of the map is the column name, and the value of the map is the replacement value.
 * The value must be of the following type: `number`or `String`.
 * @param {integer} seed  random seed
 *
 * @example
 *    var df = sqlContext.createDataFrame([[1,1], [1,2], [2,1], [2,1], [2,3], [3,2], [3,3]], schema).toDF("key", "value");
 *    var fractions = {"1": 1.0, "3": 0.5);
 *    df.stat.sampleBy("key", fractions, 36L).show()
 *    +---+-----+
 *    |key|value|
 *    +---+-----+
 *    |  1|    1|
 *    |  1|    2|
 *    |  3|    2|
 *    +---+-----+
 *
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {DataFrame}  a new [[DataFrame]] that represents the stratified sample
 */
DataFrameStatFunctions.prototype.sampleBy = function(col, fractions, seed) {
  var templateStr = 'var {{refId}} = {{inRefId}}.sampleBy({{col}}, {{fractions}}, {{seed}});';

 return Utils.generateAssignment(this, DataFrame, templateStr, {col: Utils.prepForReplacement(col), fractions: JSON.stringify(fractions), seed: seed});
};

module.exports = DataFrameStatFunctions;
