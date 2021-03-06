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
var RDD = require('../rdd/RDD.js');
var DataFrame = require('./DataFrame.js');

/**
 * @constructor
 * @classdesc Interface used to load a DataFrame from external storage systems (e.g. file systems, key-value stores, etc).
 * Use SQLContext.read to access this.
 */
function DataFrameReader(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Specifies the input data source format.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string}
 * @returns {DataFrameReader}
 */
DataFrameReader.prototype.format = function(source) {
  var templateStr = 'var {{refId}} = {{inRefId}}.format({{source}});';

  return Utils.generateAssignment(this, DataFrameReader, templateStr , {source: Utils.prepForReplacement(source)});
};

/**
 * Specifies the input schema. Some data sources (e.g. JSON) can infer the input schema
 * automatically from data. By specifying the schema here, the underlying data source can
 * skip the schema inference step, and thus speed up data loading.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {StructType}
 * @returns {DataFrameReader}
 */
DataFrameReader.prototype.schema = function(schema) {
  var templateStr = 'var {{refId}} = {{inRefId}}.schema({{schema}});';

  return Utils.generateAssignment(this, DataFrameReader, templateStr , {schema: schema.toString()});
};

/**
 * Adds an input option for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} key
 * @param {string} value
 * @returns {DataFrameReader}
 */
DataFrameReader.prototype.option = function(key, value) {
  var templateStr = 'var {{refId}} = {{inRefId}}.option({{key}}, {{value}});';

  return Utils.generateAssignment(this, DataFrameReader, templateStr , {key: Utils.prepForReplacement(key), value : Utils.prepForReplacement(value)});
};

/**
 * Adds input options for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Map}
 * @returns {DataFrameReader}
 */
DataFrameReader.prototype.options = function(options) {
  var templateStr = 'var {{refId}} = {{inRefId}}.options({{options}});';

 return Utils.generateAssignment(this, DataFrameReader, templateStr , {options: JSON.stringify(options)});
};

/**
 * Loads input in as a {@link DataFrame}, for data sources that require a path (e.g. data backed by
 * a local or distributed file system).
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} path optional, Loads data sources that require a path (e.g. data backed by
 * a local or distributed file system). If not specified loads data sources that don't require a path (e.g. external
 * key-value stores). * @returns {DataFrame}
 */
DataFrameReader.prototype.load = function(path) {
  var templateStr = path ? 'var {{refId}} = {{inRefId}}.load({{path}});' : 'var {{refId}} = {{inRefId}}.load();';

  return Utils.generateAssignment(this, DataFrame, templateStr , {path: Utils.prepForReplacement(path)});
};

/**
 * Construct a {@link DataFrame} representing the database table accessible via JDBC URL
 * @example
 * // url named table and connection properties.
 * var url="jdbc:mysql://localhost:3306/eclairjstesting";
 * var table = "people";
 * var connectionProperties = {"user" : "root", "password": "mypassword"};
 * var predicates = ["age > 20"];
 *
 * // url named table and connection properties.
 * var peopleDF = sqlContext.read().jdbc(url, table, connectionProperties);
 *
 * // or
 * // Partitions of the table will be retrieved in parallel based on the parameters
 * // passed to this function.
 * // Don't create too many partitions in parallel on a large cluster; otherwise Spark might crash
 * //your external database systems.
 * var peopleDF = sqlContext.read().jdbc(url,table,columnName,lowerBound,upperBound,numPartitions,connectionProperties);
 *
 * // or
 * // url named table using connection properties. The `predicates` parameter gives a list
 * // expressions suitable for inclusion in WHERE clauses; each one defines one partition of the {@link DataFrame}.
 * // Don't create too many partitions in parallel on a large cluster; otherwise Spark might crash
 * // your external database systems.
 * var peopleDF = sqlContext.read().jdbc(url,table,predicates,connectionProperties);
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} url
 * @param {string} table
 * @param {object | string | string[]} connectionPropertiesMap|columnName|predicates
 * If connectionPropertiesMap connectionProperties  JDBC database connection arguments, a map of arbitrary string tag/value.
 * Normally at least a "user" and "password" property should be included.
 * If columnName  the name of a column of integral type that will be used for partitioning.
 * If predicates Condition in the where clause for each partition.
 * @param {number | object} lowerBound|connectionPropertiesMap
 * If lowerBound the minimum value of `columnName` used to decide partition stride
 * If connectionProperties  JDBC database connection arguments, a list of arbitrary string
 * tag/value. Normally at least a "user" and "password" property should be included.
 * @param {number} upperBound  the maximum value of `columnName` used to decide partition stride
 * @param {number} numPartitions  the number of partitions.  the range `minValue`-`maxValue` will be split
 *                      evenly into this many partitions
 * @param {object} connectionProperties  JDBC database connection arguments, a list of arbitrary string
 *                             tag/value. Normally at least a "user" and "password" property
 *                             should be included.

 * @returns {DataFrame}
 */
DataFrameReader.prototype.jdbc = function() {
  if (arguments.length == 3) {
    var templateStr = 'var {{refId}} = {{inRefId}}.jdbc({{url}}, {{table}}, {{properties}});';

    var url = arguments[0];
    var table = arguments[1];
    var properties = JSON.stringify(arguments[2]);

    return Utils.generateAssignment(this, DataFrame, templateStr , {url: Utils.prepForReplacement(url), table: Utils.prepForReplacement(table), properties: properties});
  } else if (arguments.length == 4) {
    var templateStr = 'var {{refId}} = {{inRefId}}.jdbc({{url}}, {{table}}, {{predicates}}, {{properties}});';

    var url = arguments[0];
    var table = arguments[1];
    var predicates = arguments[2];
    var properties = JSON.stringify(arguments[3]);

    return Utils.generateAssignment(this, DataFrame, templateStr , {url: Utils.prepForReplacement(url), table: Utils.prepForReplacement(table), predicates: Utils.prepForReplacement(predicates), properties: properties});
  } else if (arguments.length == 7) {
    var templateStr = 'var {{refId}} = {{inRefId}}.jdbc({{url}}, {{table}}, {{columnName}}, {{lowerBound}}, {{upperBound}}, {{numPartitions}}, {{properties}});';

    var url = arguments[0];
    var table = arguments[1];
    var columnName = arguments[2];
    var lowerBound = arguments[3];
    var upperBound = arguments[4];
    var numPartitions = arguments[5];
    var properties = JSON.stringify(arguments[6]);

    return Utils.generateAssignment(this, DataFrame, templateStr , {url: Utils.prepForReplacement(url), table: Utils.prepForReplacement(table), columnName: Utils.prepForReplacement(columnName), lowerBound: lowerBound, upperBound: upperBound, numPartitions: numPartitions, properties: properties});
  } else {
    throw "DataFrameReader.jdbc() invalid number of arguments.";
  }
};

/**
 * Loads a JSON file, or RDD[String] storing JSON objects (one object per line) and returns the result as a DataFrame.
 * @param {string | RDD}
 * @returns {DataFrame}
 */
DataFrameReader.prototype.json = function(input) {
  var templateStr = (input instanceof RDD) ? 'var {{refId}} = {{inRefId}}.json({{input}});' : 'var {{refId}} = {{inRefId}}.json("{{input}}");';

  var inputP = (input instanceof RDD) ? input.refIdP : Promise.resolve(input);

  return Utils.generateAssignment(this, DataFrame, templateStr, {input: inputP});
};

/**
 * Loads a Parquet file, returning the result as a {@link DataFrame}. This function returns an empty
 * {@link DataFrame} if no paths are passed in.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} paths,...paths
 * @returns {DataFrame}
 */
DataFrameReader.prototype.parquet = function() {
  var args = Array.prototype.slice.call(arguments);

  var templateStr = 'var {{refId}} = {{inRefId}}.parquet({{paths}});';

  var paths = [];
  args.forEach(function(arg) {
    paths.push('"'+arg+'"');
  });

 return Utils.generateAssignment(this, DataFrame, templateStr , {paths: paths.join(',')});
};

/**
 * Loads an ORC file and returns the result as a {@link DataFrame}.
 *
 * @param {string} path  input path
 * @since EclairJS 0.1 Spark  1.5.0
 * @note Currently, this method can only be used together with `HiveContext`.
 * @returns {DataFrame}
 */
DataFrameReader.prototype.orc = function(path) {
  var templateStr = 'var {{refId}} = {{inRefId}}.orc({{path}});';

 return Utils.generateAssignment(this, DataFrame, templateStr , {path: Utils.prepForReplacement(path)});
};

/**
 * Returns the specified table as a {@link DataFrame}.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string}
 * @returns {DataFrame}
 */
DataFrameReader.prototype.table = function(tableName) {
  var templateStr = 'var {{refId}} = {{inRefId}}.table({{tableName}});';

 return Utils.generateAssignment(this, DataFrame, templateStr , {tableName: Utils.prepForReplacement(tableName)});
};

module.exports = DataFrameReader;
