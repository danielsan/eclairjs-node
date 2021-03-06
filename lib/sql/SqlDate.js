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
 * @classdesc A thin wrapper around a millisecond value that allows JDBC to identify this as an SQL DATE value.
 * A milliseconds value represents the number of milliseconds that have passed since January 1, 1970 00:00:00.000 GMT.
 * To conform with the definition of SQL DATE, the millisecond values wrapped by a java.sql.Date instance must be 'normalized'
 * by setting the hours, minutes, seconds, and milliseconds to zero in the particular time zone with which the instance is associated.
 * @param {number | string | Date} number of millisecond, string date representation, or Date object
 */
function SqlDate(kernelP, refIdP, sqldate) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.sqldate = sqldate;
};

/**
 * Tests if this date is after the specified date.
 * @param {SqlDate} when
 * @returns {boolean}
 */
SqlDate.prototype.after = function(when) {
  var templateStr = '{{inRefId}}.after({{when}});';

  return Utils.generateResultPromise(this, templateStr, {when: when});
};

/**
 * Tests if this date is before the specified date.
 * @param {SqlDate} when
 * @returns {boolean}
 */
SqlDate.prototype.before = function(when) {
  var templateStr = '{{inRefId}}.before({{when}});';

  return Utils.generateResultPromise(this, templateStr, {when: when});
};

/**
 * Return a copy of this object.
 * @returns {SqlDate}
 */
SqlDate.prototype.clone = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.clone();';

  return Utils.generateAssignment(this, SqlDate, templateStr);
};

/**
 * Compares two Dates for ordering
 * @param {SqlDate} anotherDate
 * @returns {integer}
 */
SqlDate.prototype.compareTo = function(anotherDate) {
  var templateStr = '{{inRefId}}.compareTo({{anotherDate}});';

  return Utils.generateResultPromise(this, templateStr, {anotherDate: anotherDate});
};

/**
 * Compares two dates for equality.
 * @param {SqlDate} when
 * @returns {boolean}
 */
SqlDate.prototype.equals = function(when) {
  var templateStr = '{{inRefId}}.equals({{when}});';

  return Utils.generateResultPromise(this, templateStr, {when: when});
};

/**
 * Sets an existing Date object using the given milliseconds time value.
 * @param milliseconds
 */
SqlDate.prototype.setTime = function(milliseconds) {
  var templateStr = '{{inRefId}}.setTime({{milliseconds}});';

  return Utils.generateResultPromise(this, templateStr, {milliseconds: milliseconds});
};

/**
 * Formats a date in the date escape format yyyy-mm-dd.
 * @returns {string}
 */
SqlDate.prototype.toJSON = function() {
  var templateStr = '{{inRefId}}.toJSON();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * Formats a date in the date escape format yyyy-mm-dd.
 * @returns {string}
 */
SqlDate.prototype.toString = function() {
  var templateStr = '{{inRefId}}.toString();';

  return Utils.generateResultPromise(this, templateStr);
};

module.exports = SqlDate;
