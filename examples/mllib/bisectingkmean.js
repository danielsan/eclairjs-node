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

var Vectors = spark.mllib.linalg.Vectors;

var sc = new spark.SparkContext("local[*]", "Bisecting K Mean");

var localData = [
  Vectors.dense(0.1, 0.1), Vectors.dense(0.3, 0.3),
  Vectors.dense(10.1, 10.1), Vectors.dense(10.3, 10.3),
  Vectors.dense(20.1, 20.1), Vectors.dense(20.3, 20.3),
  Vectors.dense(30.1, 30.1), Vectors.dense(30.3, 30.3)
];

var data = sc.parallelize(localData, 2);

var bkm = new spark.mllib.clustering.BisectingKMeans().setK(4);

var model = bkm.run(data);

var promises = [];

promises.push(model.computeCost(data));
promises.push(model.clusterCenters());

Promise.all(promises).then(function(results) {
  console.log("Compute cost:", results[0]);

  var promises2 = [];
  results[1].forEach(function(v) {
    promises2.push(v.toString());
  });

  Promise.all(promises2).then(function(vectors) {
    vectors.forEach(function(v, i) {
      console.log("Cluster_Center "+i, v);
    });

    stop();
  }).catch(stop);
}).catch(stop);
