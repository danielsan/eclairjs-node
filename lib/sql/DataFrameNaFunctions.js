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

var Utils = require('../utils.js');
var DataFrame = require('./DataFrame.js');

/**
 * @constructor
 * @classdesc Functionality for working with missing data in {@link DataFrame}.
 */
function DataFrameNaFunctions(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Returns a new {@link DataFrame} that drops rows containing any null or NaN values.
 *
 * @since EclairJS 0.1 Spark  1.3.1
 * @param {integer | string | string[]} arg1 Optional:
 * If "any", then drop rows containing any null or NaN values If "all", then drop rows only if every column is null or NaN for that row.
 * If integer Returns a new {@link DataFrame} that drops rows containing less than arg1 non-null and non-NaN values.
 * If array of column names
 * @param {string | string[]} arg2 Optional: array of column names, only valid if arg1 is string or integer value
 * @returns {DataFrame}
 */
DataFrameNaFunctions.prototype.drop = function(arg1, arg2) {
  var templateStr;

  if (arg1 || arg2) {
    if (arg2) {
      templateStr = 'var {{refId}} = {{inRefId}}.drop({{arg1}}, {{arg2}});';
    } else {
      templateStr = 'var {{refId}} = {{inRefId}}.drop({{arg1}});';
    }

  } else {
    templateStr = 'var {{refId}} = {{inRefId}}.drop();';
  }

  return Utils.generateAssignment(this, DataFrame, templateStr, {arg1: Utils.prepForReplacement(arg1), arg2: Utils.prepForReplacement(arg2)});
};

/**
 * Returns a new {@link DataFrame} that replaces null or NaN values.
 *
 * @since EclairJS 0.1 Spark  1.3.1
 * @param {number | string | object} value
 * If number replaces null or NaN values in numeric columns with `value`.
 * If string replaces null values in string columns with `value`.
 * If object, the object is expected to be a HashMap, the key of the map is the column name, and the value of the map is the replacement value.
 * The value must be of the following type: `number`or `String`.
 * @param {string[]} cols Optional, replaces null or NaN values in specified columns.  Not valid when value is a map.
 * If a specified column type does not match the values type, it is ignored.
 * @example
 * var hash = {"name": "missing", "age": "99"};
 * var result = naFunc.fill(hash);
 * @returns {DataFrame}
 */
DataFrameNaFunctions.prototype.fill = function(value, cols) {
  var templateStr;

  if (cols) {
    templateStr = 'var {{refId}} = {{inRefId}}.fill({{value}}, {{cols}});';
  } else {
    templateStr = 'var {{refId}} = {{inRefId}}.fill({{value}});';
  }

  return Utils.generateAssignment(this, DataFrame, templateStr, {value: Utils.prepForReplacement(value), cols: Utils.prepForReplacement(cols)});
};

/**
 * Replaces values matching keys in `replacement` map with the corresponding values.
 * Key and value of `replacement` map must have the same type, and can only be numbers or strings.
 * If `col` is "*", then the replacement is applied on all string columns or numeric columns.
 *
 * @example
 *  // Replace Michael with MichaelReplace and Andy with AndyReplace in the name column
 *   var hash = {"Michael": "MichaelReplace", "Andy": "AndyReplace"};
 *   var result = naFunc.replace("name", hash);
 *   // Replaces 1600.00 with 99.99, 500000000.11 with 11.11 and 29 with 0 in the age, income and networth columns
 *   var hash = {"1600.00": 99.99, "500000000.11": 11.11, "29": 0};
 *   var result = naFunc.replace(["age", "income", "networth"], hash);
 *
 * @param {string | string[]} col  name of the column to apply the value replacement
 * @param {object} replacement  value replacement map, as explained above
 *
 * @since EclairJS 0.1 Spark  1.3.1
 * @returns {DataFrame}
 */
DataFrameNaFunctions.prototype.replace = function(col, replacement) {
  var templateStr =  'var {{refId}} = {{inRefId}}.replace({{col}}, {{replacement}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {col: Utils.prepForReplacement(col), replacement: JSON.stringify(replacement)});
};

module.exports = DataFrameNaFunctions;
