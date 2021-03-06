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

/**
 *
 * @constructor
 * @classdesc Metadata is a wrapper over Map[String, Any] that limits the value type to simple ones:
 * Boolean, Long, Double, String, Metadata, Array[Boolean], Array[Long], Array[Double], Array[String], and Array[Metadata].
 * JSON is used for serialization.
 * The default constructor is private. User should use either MetadataBuilder or Metadata.fromJson() to create Metadata instances.
 * @protected
 */
function Metadata(kernelP, refIdP, metadata) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.metadata = metadata;
};

/**
 * Tests whether this Metadata contains a binding for a key.
 * @param {string} key
 * @returns {boolean}
 * @ignore
 */
Metadata.prototype.contains = function(key) {
};

/**
 * Returns an empty Metadata.
 * @static
 * @returns {Metadata}
 * @ignore
 */
Metadata.prototype.empty = function() {
};

/**
 *
 * @param {object} obj
 * @returns {boolean}
 * @ignore
 */
Metadata.prototype.equals = function(obj) {
};

/**
 * Creates a Metadata instance from JSON
 * @static
 * @param {string} json
 * @returns {Metadata}
 * @ignore
 */
Metadata.prototype.fromJson = function(json) {
};

/**
 * Gets a Boolean.
 * @param {string} key
 * @returns {boolean}
 * @ignore
 */
Metadata.prototype.getBoolean = function(key) {
};

/**
 * Gets a Boolean array.
 * @param {string} key
 * @returns {boolean[]}
 * @ignore
 */
Metadata.prototype.getBooleanArray = function(key) {
};

/**
 * Gets a Double.
 * @param {string} key
 * @returns {double}
 * @ignore
 */
Metadata.prototype.getDouble = function(key) {
};

/**
 * Gets a Double array.
 * @param {string} key
 * @returns {double[]}
 * @ignore
 */
Metadata.prototype.getDoubleArray = function(key) {
};

/**
 * Gets a Long.
 * @param {string} key
 * @returns {long}
 * @ignore
 */
Metadata.prototype.getLong = function(key) {
};

/**
 * Gets a Long array.
 * @param {string} key
 * @returns {long[]}
 * @ignore
 */
Metadata.prototype.getLongArray = function(key) {
};

/**
 * Gets a Metadata.
 * @param {string} key
 * @returns {Metadata}
 * @ignore
 */
Metadata.prototype.getMetadata = function(key) {
};

/**
 * Gets a Metadata array.
 * @param {string} key
 * @returns {Metadata[]}
 * @ignore
 */
Metadata.prototype.getMetadataArray = function(key) {
};

/**
 * Gets a String..
 * @param {string} key
 * @returns {string}
 */
Metadata.prototype.getString = function(key) {
var templateStr = '{{inRefId}}.getString("{{key}}");';

  return Utils.generateResultPromise(this, templateStr, {key: key});
};

/**
 * Gets a String array..
 * @param {string} key
 * @returns {string[]}
 * @ignore
 */
Metadata.prototype.getStringArray = function(key) {
};

/**
 * @returns {integer}
 * @ignore
 */
Metadata.prototype.hashCode = function() {
};

/**
 * Converts to its JSON representation.
 * @returns {string}
 */
Metadata.prototype.json = function() {
  var templateStr = '{{inRefId}}.json();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 *
 * @returns {map}
 * @ignore
 */
Metadata.prototype.map = function() {
};

Metadata.prototype.toJSON = function() {
};

Metadata.prototype.toString = function() {
};
