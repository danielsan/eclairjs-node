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

var DStream = require('./DStream.js');
var protocol = require('../kernel.js');
var Utils = require('../utils.js');
var request = require('request');

/**
 * @constructor
 * @classdesc Main entry point for Spark Streaming functionality. It provides methods used to create DStreams from various input sources.
 *  It can be either created by providing a Spark master URL and an appName, or from a org.apache.spark.SparkConf configuration 
 *  (see core Spark documentation), or from an existing org.apache.spark.SparkContext. The associated SparkContext can be accessed 
 *  using context.sparkContext. After creating and transforming DStreams, the streaming computation can be started and stopped using 
 *  context.start() and context.stop(), respectively. context.awaitTermination() allows the current thread to wait for the termination 
 *  of the context by stop() or by an exception.
 *  @param {SparkContex} sparkContext
 *  @param {Duration} duration
 */
function StreamingContext(sparkContext, duration) {
  this.context = sparkContext;

  var self = this;

  this.streamingContextP = new Promise(function(resolve, reject) {
    // generate the SQLContext source code
    self.context.kernelP.then(function(kernel) {
      var refId = "streamingContext";
      var templateStr = 'var {{refId}} = new StreamingContext(jsc, new Duration({{millis}}));';
      var code = Utils.processTemplate(templateStr, {refId: refId, millis: duration.millis});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    });
  });
};

/**
 * Wait for the execution to stop
 */
StreamingContext.prototype.awaitTermination = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.context.kernelP, self.streamingContextP]).then(function(values) {
      var kernel = values[0];
      var streamingContextId = values[1];
      var templateStr = '{{refId}}.awaitTermination();';
      var code = Utils.processTemplate(templateStr, {refId: streamingContextId});
      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
                            resolve,
                            reject);
    })
  })
};

/**
 * Wait for the execution to stop, or timeout
 * @param {long} millis
 * @returns {boolean}
 */
StreamingContext.prototype.awaitTerminationOrTimeout = function(millis) {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.context.kernelP, self.streamingContextP]).then(function(values) {
      var kernel = values[0];
      var streamingContextId = values[1];
      var templateStr = '{{refId}}.awaitTerminationOrTimeout({{millis}});';
      var code = Utils.processTemplate(templateStr, 
                                       {refId: streamingContextId,
                                        millis: millis});
      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
                            resolve,
                            reject);
    })
  })
};

/**
 * Start the execution of the streams.
 */
StreamingContext.prototype.start = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.context.kernelP, self.streamingContextP]).then(function(values) {
      var kernel = values[0];
      var streamingContextId = values[1];
      var templateStr = '{{refId}}.start();';
      var code = Utils.processTemplate(templateStr, 
                                       {refId: streamingContextId});
      protocol.verifyVoidResult(kernel.execute({code: code, silent: false}),
                                resolve,
                                reject);
    })
  })
};

/**
 * Stops the execution of the streams.
 */
StreamingContext.prototype.stop = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.context.kernelP, self.streamingContextP]).then(function(values) {
      var kernel = values[0];
      var streamingContextId = values[1];
      var templateStr = '{{refId}}.stop();';
      var code = Utils.processTemplate(templateStr, 
                                       {refId: streamingContextId});
      protocol.verifyVoidResult(kernel.execute({code: code, silent: false}),
                                resolve,
                                reject);
    })
  })
};

/**
 * Create a input stream from TCP source hostname:port.
 * @param {string} host
 * @param {string} port
 * @returns {DStream}
 */
StreamingContext.prototype.socketTextStream = function(host, port) {
  var refId = protocol.genVariable('dstream');
  var self = this;

  return new DStream(this.context.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.context.kernelP, self.streamingContextP]).then(function(values) {
      var kernel = values[0];
      var streamingContextId = values[1];

      var templateStr = 'var {{refId}} = {{streamingContextId}}.socketTextStream("{{host}}", {{port}});';
      var code = Utils.processTemplate(templateStr, {
        refId: refId,
        streamingContextId: streamingContextId,
        host: host,
        port: port
      });

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
                            resolve,
                            reject,
                            refId);
    }).catch(reject);
  }))
};

module.exports = StreamingContext;
