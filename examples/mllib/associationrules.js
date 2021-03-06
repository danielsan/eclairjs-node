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

function exit() {
  process.exit();
}

function stop(e) {
  if (e) {
    console.log(e);
  }
  sc.stop().then(exit).catch(exit);
}

var spark = require('../../lib/index.js');

var sc = new spark.SparkContext("local[*]", "Association Rules");

var freqItemsets = sc.parallelize(
  [
    new spark.mllib.fpm.FPGrowth.FreqItemset(["a"], 15),
    new spark.mllib.fpm.FPGrowth.FreqItemset(["b"], 35),
    new spark.mllib.fpm.FPGrowth.FreqItemset(["a","b"], 12)
  ]
);

var arules = new spark.mllib.fpm.AssociationRules().setMinConfidence(0.8);
var results = arules.run(freqItemsets);

results.collect().then(function(results) {
  console.log(results);
  stop();
}).catch(stop);
