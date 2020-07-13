require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "updates/" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "updates/" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "f51a2dc5618e2d2d5833";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"server": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./chunks/" + ({"vendors~about~admin~contact~home~login~not-found~privacy~register":"vendors~about~admin~contact~home~login~not-found~privacy~register","about~admin~contact~home~login~not-found~privacy~register":"about~admin~contact~home~login~not-found~privacy~register","about":"about","admin":"admin","contact":"contact","home":"home","login":"login","not-found":"not-found","privacy":"privacy","register":"register"}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chunk-manifest.json":
/***/ (function(module, exports) {

module.exports = require("./chunk-manifest.json");

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/routes/error/ErrorPage.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nhtml {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding: 0 32px;\n  padding: 0 2rem;\n  height: 100%;\n  font-family: sans-serif;\n  text-align: center;\n  color: #888;\n}\n\nbody {\n  margin: 0;\n}\n\nh1 {\n  font-weight: 400;\n  color: #555;\n}\n\npre {\n  white-space: pre-wrap;\n  text-align: left;\n}\n", "", {"version":3,"sources":["/Users/amitjain/top-trend/src/routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,qBAAqB;EACrB,cAAc;EACd,uBAAuB;MACnB,oBAAoB;EACxB,sBAAsB;MAClB,wBAAwB;EAC5B,gBAAgB;EAChB,gBAAgB;EAChB,aAAa;EACb,wBAAwB;EACxB,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,UAAU;CACX;;AAED;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,sBAAsB;EACtB,iBAAiB;CAClB","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nhtml {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding: 0 32px;\n  padding: 0 2rem;\n  height: 100%;\n  font-family: sans-serif;\n  text-align: center;\n  color: #888;\n}\n\nbody {\n  margin: 0;\n}\n\nh1 {\n  font-weight: 400;\n  color: #555;\n}\n\npre {\n  white-space: pre-wrap;\n  text-align: left;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/isomorphic-style-loader/lib/insertCss.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"web\",\"version\":\"0.0.0\",\"private\":true,\"engines\":{\"node\":\">=6.13.1\",\"npm\":\">=3.10.10\"},\"browserslist\":[\">1%\",\"last 4 versions\",\"Firefox ESR\",\"not ie < 9\"],\"dependencies\":{\"@babel/polyfill\":\"^7.0.0-beta.42\",\"apollo-cache-inmemory\":\"^1.1.4\",\"apollo-client\":\"^2.0.4\",\"apollo-link\":\"^1.0.7\",\"apollo-link-error\":\"^1.0.3\",\"apollo-link-http\":\"^1.3.2\",\"apollo-link-logger\":\"^1.1.0\",\"apollo-link-schema\":\"^1.0.1\",\"bluebird\":\"^3.5.1\",\"body-parser\":\"^1.18.2\",\"classnames\":\"^2.2.5\",\"cookie-parser\":\"^1.4.3\",\"core-js\":\"^2.5.3\",\"express\":\"^4.16.3\",\"express-graphql\":\"^0.6.12\",\"express-jwt\":\"^5.3.1\",\"express-request-language\":\"^1.1.12\",\"graphql\":\"^0.13.2\",\"graphql-tag\":\"^2.6.1\",\"graphql-tools\":\"^2.16.0\",\"history\":\"^4.7.2\",\"intl\":\"^1.2.5\",\"intl-locales-supported\":\"^1.0.0\",\"isomorphic-style-loader\":\"^4.0.0\",\"jsonwebtoken\":\"^8.2.0\",\"lodash\":\"^4.17.5\",\"node-fetch\":\"^2.1.1\",\"normalize.css\":\"^8.0.0\",\"passport\":\"^0.4.0\",\"passport-facebook\":\"^2.1.1\",\"pretty-error\":\"^2.1.1\",\"prop-types\":\"^15.6.1\",\"query-string\":\"^6.0.0\",\"react\":\"^16.2.0\",\"react-apollo\":\"^2.0.4\",\"react-dom\":\"^16.2.0\",\"react-intl\":\"^2.4.0\",\"react-redux\":\"^5.0.6\",\"redux\":\"^3.7.2\",\"redux-devtools-extension\":\"^2.13.2\",\"redux-logger\":\"^3.0.6\",\"redux-thunk\":\"^2.2.0\",\"sequelize\":\"^4.37.3\",\"serialize-javascript\":\"^1.4.0\",\"source-map-support\":\"^0.5.4\",\"sqlite3\":\"^4.0.0\",\"universal-router\":\"^6.0.0\",\"whatwg-fetch\":\"^2.0.3\"},\"devDependencies\":{\"@babel/core\":\"^7.7.2\",\"@babel/node\":\"^7.7.0\",\"@babel/plugin-proposal-class-properties\":\"^7.7.0\",\"@babel/plugin-syntax-dynamic-import\":\"^7.0.0\",\"@babel/plugin-transform-react-constant-elements\":\"^7.0.0\",\"@babel/plugin-transform-react-inline-elements\":\"^7.0.0\",\"@babel/preset-env\":\"^7.7.1\",\"@babel/preset-flow\":\"^7.0.0\",\"@babel/preset-react\":\"^7.7.0\",\"babel-core\":\"^7.0.0-bridge.0\",\"babel-eslint\":\"^10.0.3\",\"babel-jest\":\"^24.9.0\",\"babel-loader\":\"^8.0.0\",\"babel-plugin-transform-react-remove-prop-types\":\"^0.4.18\",\"babel-plugin-react-intl\":\"^2.3.1\",\"browser-sync\":\"^2.23.6\",\"chokidar\":\"^2.0.2\",\"css-loader\":\"^0.28.11\",\"enzyme\":\"^3.3.0\",\"eslint\":\"^4.19.0\",\"eslint-config-airbnb\":\"^16.1.0\",\"eslint-config-prettier\":\"^2.9.0\",\"eslint-import-resolver-node\":\"^0.3.2\",\"eslint-loader\":\"^2.0.0\",\"eslint-plugin-css-modules\":\"^2.7.5\",\"eslint-plugin-flowtype\":\"^2.46.1\",\"eslint-plugin-import\":\"^2.9.0\",\"eslint-plugin-jsx-a11y\":\"^6.0.3\",\"eslint-plugin-prettier\":\"^2.6.0\",\"eslint-plugin-react\":\"^7.7.0\",\"file-loader\":\"^1.1.11\",\"flow-bin\":\"^0.68.0\",\"front-matter\":\"^2.3.0\",\"glob\":\"^7.1.2\",\"husky\":\"^0.14.3\",\"identity-obj-proxy\":\"^3.0.0\",\"jest\":\"^22.4.3\",\"jest-codemods\":\"^0.13.9\",\"jest-transform-graphql\":\"^2.1.0\",\"jscodeshift\":\"^0.5.0\",\"lint-staged\":\"^7.0.0\",\"markdown-it\":\"^8.4.1\",\"mkdirp\":\"^0.5.1\",\"null-loader\":\"^0.1.1\",\"opn-cli\":\"^3.1.0\",\"pixrem\":\"^4.0.1\",\"pleeease-filters\":\"^4.0.0\",\"postcss\":\"^6.0.20\",\"postcss-calc\":\"^6.0.1\",\"postcss-color-function\":\"^4.0.1\",\"postcss-custom-media\":\"^6.0.0\",\"postcss-custom-properties\":\"^7.0.0\",\"postcss-custom-selectors\":\"^4.0.1\",\"postcss-flexbugs-fixes\":\"^3.3.0\",\"postcss-import\":\"^11.1.0\",\"postcss-loader\":\"^2.1.3\",\"postcss-media-minmax\":\"^3.0.0\",\"postcss-nested\":\"^3.0.0\",\"postcss-nesting\":\"^4.2.1\",\"postcss-pseudoelements\":\"^5.0.0\",\"postcss-selector-matches\":\"^3.0.1\",\"postcss-selector-not\":\"^3.0.1\",\"prettier\":\"^1.11.1\",\"raw-loader\":\"^0.5.1\",\"react-deep-force-update\":\"^2.1.1\",\"react-dev-utils\":\"^5.0.0\",\"react-error-overlay\":\"^4.0.0\",\"react-test-renderer\":\"^16.2.0\",\"redux-mock-store\":\"^1.4.0\",\"rimraf\":\"^2.6.2\",\"stylelint\":\"^9.1.3\",\"stylelint-config-standard\":\"^18.2.0\",\"stylelint-order\":\"^0.8.1\",\"svg-url-loader\":\"^2.3.2\",\"url-loader\":\"^1.0.1\",\"webpack\":\"^4.2.0\",\"webpack-assets-manifest\":\"^2.0.0\",\"webpack-bundle-analyzer\":\"^2.11.1\",\"webpack-dev-middleware\":\"^3.0.1\",\"webpack-hot-middleware\":\"^2.21.2\",\"webpack-node-externals\":\"^1.6.0\"},\"lint-staged\":{\"*.{js,jsx}\":[\"eslint --no-ignore --fix\",\"git add --force\"],\"*.{md,graphql}\":[\"prettier --write\",\"git add --force\"],\"*.{css,less,styl,scss,sass,sss}\":[\"stylelint --fix\",\"git add --force\"]},\"scripts\":{\"precommit\":\"lint-staged\",\"lint-js\":\"eslint --ignore-path .gitignore --ignore-pattern \\\"!**/.*\\\" .\",\"lint-css\":\"stylelint \\\"src/**/*.{css,less,styl,scss,sass,sss}\\\"\",\"lint\":\"yarn run lint-js && yarn run lint-css\",\"fix-js\":\"yarn run lint-js --fix\",\"fix-css\":\"yarn run lint-css --fix\",\"fix\":\"yarn run fix-js && yarn run fix-css\",\"flow\":\"flow\",\"flow:check\":\"flow check\",\"test\":\"jest\",\"test-watch\":\"yarn run test --watch --notify\",\"test-cover\":\"yarn run test --coverage\",\"coverage\":\"yarn run test-cover && opn coverage/lcov-report/index.html\",\"clean\":\"babel-node tools/run clean\",\"copy\":\"babel-node tools/run copy\",\"messages\":\"babel-node tools/run messages\",\"bundle\":\"babel-node tools/run bundle\",\"build\":\"babel-node tools/run build\",\"build-stats\":\"yarn run build --release --analyse\",\"deploy\":\"babel-node tools/run deploy\",\"render\":\"babel-node tools/run render\",\"serve\":\"babel-node tools/run runServer\",\"start\":\"babel-node tools/run start\"}}");

/***/ }),

/***/ "./src/actions/intl.graphql":
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"intl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"intl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"message"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":82}};
    doc.loc.source = {"body":"query intl($locale: String!) {\n  intl(locale: $locale) {\n    id\n    message\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

    // Collect any fragment/type references from a node, adding them to the refs Set
    function collectFragmentReferences(node, refs) {
      if (node.kind === "FragmentSpread") {
        refs.add(node.name.value);
      } else if (node.kind === "VariableDefinition") {
        var type = node.type;
        if (type.kind === "NamedType") {
          refs.add(type.name.value);
        }
      }

      if (node.selectionSet) {
        node.selectionSet.selections.forEach(function(selection) {
          collectFragmentReferences(selection, refs);
        });
      }

      if (node.variableDefinitions) {
        node.variableDefinitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }

      if (node.definitions) {
        node.definitions.forEach(function(def) {
          collectFragmentReferences(def, refs);
        });
      }
    }

    var definitionRefs = {};
    (function extractReferences() {
      doc.definitions.forEach(function(def) {
        if (def.name) {
          var refs = new Set();
          collectFragmentReferences(def, refs);
          definitionRefs[def.name.value] = refs;
        }
      });
    })();

    function findOperation(doc, name) {
      for (var i = 0; i < doc.definitions.length; i++) {
        var element = doc.definitions[i];
        if (element.name && element.name.value == name) {
          return element;
        }
      }
    }

    function oneQuery(doc, operationName) {
      // Copy the DocumentNode, but clear out the definitions
      var newDoc = {
        kind: doc.kind,
        definitions: [findOperation(doc, operationName)]
      };
      if (doc.hasOwnProperty("loc")) {
        newDoc.loc = doc.loc;
      }

      // Now, for the operation we're running, find any fragments referenced by
      // it or the fragments it references
      var opRefs = definitionRefs[operationName] || new Set();
      var allRefs = new Set();
      var newRefs = new Set();

      // IE 11 doesn't support "new Set(iterable)", so we add the members of opRefs to newRefs one by one
      opRefs.forEach(function(refName) {
        newRefs.add(refName);
      });

      while (newRefs.size > 0) {
        var prevRefs = newRefs;
        newRefs = new Set();

        prevRefs.forEach(function(refName) {
          if (!allRefs.has(refName)) {
            allRefs.add(refName);
            var childRefs = definitionRefs[refName] || new Set();
            childRefs.forEach(function(childRef) {
              newRefs.add(childRef);
            });
          }
        });
      }

      allRefs.forEach(function(refName) {
        var op = findOperation(doc, refName);
        if (op) {
          newDoc.definitions.push(op);
        }
      });

      return newDoc;
    }

    module.exports = doc;
    
        module.exports["intl"] = oneQuery(doc, "intl");
        


/***/ }),

/***/ "./src/actions/intl.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIntl", function() { return getIntl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocale", function() { return setLocale; });
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/constants/index.js");
/* harmony import */ var _intl_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/actions/intl.graphql");
/* harmony import */ var _intl_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_intl_graphql__WEBPACK_IMPORTED_MODULE_2__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable import/prefer-default-export */




function getIntlFromState(state) {
  const intl = state && state.intl || {};
  const {
    initialNow,
    locale,
    messages
  } = intl;
  const localeMessages = messages && messages[locale] || {};
  const provider = new react_intl__WEBPACK_IMPORTED_MODULE_0__["IntlProvider"]({
    initialNow,
    locale,
    messages: localeMessages,
    defaultLocale: 'en-US'
  });
  return provider.getChildContext().intl;
}

function getIntl() {
  return (dispatch, getState) => getIntlFromState(getState());
}
function setLocale({
  locale
}) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (dispatch, getState, {
      client,
      history
    }) {
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_1__["SET_LOCALE_START"],
        payload: {
          locale
        }
      });

      try {
        // WARNING !!
        // do not use client.networkInterface except you want skip Apollo store
        // use client.query if you want benefit from Apollo caching mechanisms
        const {
          data
        } = yield client.query({
          query: _intl_graphql__WEBPACK_IMPORTED_MODULE_2___default.a,
          variables: {
            locale
          }
        });
        const messages = data.intl.reduce((msgs, msg) => {
          msgs[msg.id] = msg.message; // eslint-disable-line no-param-reassign

          return msgs;
        }, {});
        dispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_1__["SET_LOCALE_SUCCESS"],
          payload: {
            locale,
            messages
          }
        }); // remember locale for every new request

        if (false) {} // return bound intl instance at the end


        return getIntlFromState(getState());
      } catch (error) {
        dispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_1__["SET_LOCALE_ERROR"],
          payload: {
            locale,
            error
          }
        });
        return null;
      }
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

/***/ }),

/***/ "./src/actions/runtime.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRuntimeVariable", function() { return setRuntimeVariable; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/constants/index.js");
/* eslint-disable import/prefer-default-export */

function setRuntimeVariable({
  name,
  value
}) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__["SET_RUNTIME_VARIABLE"],
    payload: {
      name,
      value
    }
  };
}

/***/ }),

/***/ "./src/components/App.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/Users/amitjain/top-trend/src/components/App.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






const ContextType = _objectSpread(_objectSpread({
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  // Universal HTTP client
  fetch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  pathname: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  query: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
}, react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"].childContextTypes), {}, {
  // Apollo Client
  client: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  // ReactIntl
  intl: react_intl__WEBPACK_IMPORTED_MODULE_2__["IntlProvider"].childContextTypes.intl,
  locale: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
});
/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */


class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  getChildContext() {
    return this.props.context;
  } // NOTE: This methods are not needed if you update URL by setLocale action.
  //
  //  componentDidMount() {
  //    const store = this.props.context && this.props.context.store;
  //    if (store) {
  //      this.lastLocale = store.getState().intl.locale;
  //      this.unsubscribe = store.subscribe(() => {
  //        const state = store.getState();
  //        const { newLocale, locale } = state.intl;
  //        if (!newLocale && this.lastLocale !== locale) {
  //          this.lastLocale = locale;
  //          this.forceUpdate();
  //        }
  //      });
  //    }
  //  }
  //
  //  componentWillUnmount() {
  //    if (this.unsubscribe) {
  //      this.unsubscribe();
  //      this.unsubscribe = null;
  //    }
  //  }


  render() {
    // Here, we are at universe level, sure? ;-)
    const {
      client
    } = this.props.context; // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_4__["ApolloProvider"], {
      client: client,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 7
      }
    }, this.props.children);
  }

}

_defineProperty(App, "propTypes", {
  context: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape(ContextType).isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element.isRequired
});

_defineProperty(App, "childContextTypes", ContextType);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/components/Html.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("serialize-javascript");
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/amitjain/top-trend/src/components/Html.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




/* eslint-disable react/no-danger */

class Html extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    const {
      title,
      description,
      styles,
      scripts,
      app,
      children
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("html", {
      className: "no-js",
      lang: app.lang,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("head", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
      charSet: "utf-8",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
      httpEquiv: "x-ua-compatible",
      content: "ie=edge",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 11
      }
    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
      name: "description",
      content: description,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 11
      }
    }), scripts.map(script => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
      key: script,
      rel: "preload",
      href: script,
      as: "script",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 13
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
      rel: "manifest",
      href: "/site.webmanifest",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
      rel: "apple-touch-icon",
      href: "/icon.png",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 11
      }
    }), styles.map(style => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", {
      key: style.id,
      id: style.id,
      dangerouslySetInnerHTML: {
        __html: style.cssText
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 13
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("body", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "app",
      dangerouslySetInnerHTML: {
        __html: children
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62,
        columnNumber: 11
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `window.App=${serialize_javascript__WEBPACK_IMPORTED_MODULE_2___default()(app)}`
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 11
      }
    }), scripts.map(script => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      key: script,
      src: script,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 13
      }
    })), _config__WEBPACK_IMPORTED_MODULE_3___default.a.analytics.googleTrackingId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + `ga('create','${_config__WEBPACK_IMPORTED_MODULE_3___default.a.analytics.googleTrackingId}','auto');ga('send','pageview')`
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 13
      }
    }), _config__WEBPACK_IMPORTED_MODULE_3___default.a.analytics.googleTrackingId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      src: "https://www.google-analytics.com/analytics.js",
      async: true,
      defer: true,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 13
      }
    })));
  }

}

_defineProperty(Html, "propTypes", {
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  styles: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    cssText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired),
  scripts: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired),
  // eslint-disable-next-line react/forbid-prop-types
  app: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
});

_defineProperty(Html, "defaultProps", {
  styles: [],
  scripts: []
});

/* harmony default export */ __webpack_exports__["default"] = (Html);

/***/ }),

/***/ "./src/config.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
if (false) {}

module.exports = {
  // default locale is the first one
  locales: [
  /* @intl-code-template '${lang}-${COUNTRY}', */
  'en-US', 'cs-CZ'
  /* @intl-code-template-end */
  ],
  // Node.js app
  port: process.env.PORT || 3000,
  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`
  },
  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',
  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X

  },
  // Authentication
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'React Starter Kit'
    },
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  }
};

/***/ }),

/***/ "./src/constants/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_RUNTIME_VARIABLE", function() { return SET_RUNTIME_VARIABLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOCALE_START", function() { return SET_LOCALE_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOCALE_SUCCESS", function() { return SET_LOCALE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOCALE_ERROR", function() { return SET_LOCALE_ERROR; });
/* eslint-disable import/prefer-default-export */
const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
const SET_LOCALE_START = 'SET_LOCALE_START';
const SET_LOCALE_SUCCESS = 'SET_LOCALE_SUCCESS';
const SET_LOCALE_ERROR = 'SET_LOCALE_ERROR';

/***/ }),

/***/ "./src/core/createApolloClient/createApolloClient.server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createApolloClient; });
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("apollo-client");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("apollo-link");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_link_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("apollo-link-error");
/* harmony import */ var apollo_link_error__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_link_error__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_link_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("apollo-link-schema");
/* harmony import */ var apollo_link_schema__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_link_schema__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _createCache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/core/createApolloClient/createCache.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






function createApolloClient(schema) {
  const link = Object(apollo_link__WEBPACK_IMPORTED_MODULE_1__["from"])([Object(apollo_link_error__WEBPACK_IMPORTED_MODULE_2__["onError"])(({
    graphQLErrors,
    networkError
  }) => {
    if (graphQLErrors) graphQLErrors.map(({
      message,
      locations,
      path
    }) => console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
    if (networkError) console.warn(`[Network error]: ${networkError}`);
  }), new apollo_link_schema__WEBPACK_IMPORTED_MODULE_3__["SchemaLink"](_objectSpread({}, schema))]);
  return new apollo_client__WEBPACK_IMPORTED_MODULE_0__["ApolloClient"]({
    link,
    cache: Object(_createCache__WEBPACK_IMPORTED_MODULE_4__["default"])(),
    ssrMode: true,
    queryDeduplication: true
  });
}

/***/ }),

/***/ "./src/core/createApolloClient/createCache.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createCache; });
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("apollo-cache-inmemory");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_0__);


function dataIdFromObject(obj) {
  switch (obj.__typename) {
    case 'IntlMessage':
      // Do not use id as identifier for message because it's not unique between languages
      // instead instruct cache to build path and index identifier for cache key
      return null;

    case 'NewsItem':
      return obj.link ? `NewsItem:${obj.link}` : Object(apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_0__["defaultDataIdFromObject"])(obj);

    default:
      return Object(apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_0__["defaultDataIdFromObject"])(obj);
  }
}

function createCache() {
  // https://www.apollographql.com/docs/react/basics/caching.html#configuration
  return new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_0__["InMemoryCache"]({
    dataIdFromObject
  });
}

/***/ }),

/***/ "./src/createFetch.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch, {
  baseUrl,
  cookie,
  schema,
  graphql
}) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST',
    // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: _objectSpread({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, cookie ? {
      Cookie: cookie
    } : null)
  };
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (url, options) {
      const isGraphQL = url.startsWith('/graphql');

      if (schema && graphql && isGraphQL) {
        // We're SSR, so route the graphql internal to avoid latency
        const query = JSON.parse(options.body);
        const result = yield graphql(schema, query.query, {
          request: {}
        }, // fill in request vars needed by graphql
        null, query.variables);
        return Promise.resolve({
          status: result.errors ? 400 : 200,
          json: () => Promise.resolve(result)
        });
      }

      return isGraphQL || url.startsWith('/api') ? fetch(`${baseUrl}${url}`, _objectSpread(_objectSpread(_objectSpread({}, defaults), options), {}, {
        headers: _objectSpread(_objectSpread({}, defaults.headers), options && options.headers)
      })) : fetch(url, options);
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

/* harmony default export */ __webpack_exports__["default"] = (createFetch);

/***/ }),

/***/ "./src/data/graphql/Database/schema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return schema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queries", function() { return queries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _users_GetAllUsers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/graphql/Database/users/GetAllUsers.js");
/* harmony import */ var _users_GetLoggedInUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/data/graphql/Database/users/GetLoggedInUser.js");
/* harmony import */ var _users_CreateUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/data/graphql/Database/users/CreateUser.js");

/** * Queries ** */



/** * Mutations ** */


const schema = [..._users_GetAllUsers__WEBPACK_IMPORTED_MODULE_1__["schema"], ..._users_CreateUser__WEBPACK_IMPORTED_MODULE_3__["schema"]];
const queries = [..._users_GetAllUsers__WEBPACK_IMPORTED_MODULE_1__["queries"], ..._users_GetLoggedInUser__WEBPACK_IMPORTED_MODULE_2__["queries"]];
const mutations = [..._users_CreateUser__WEBPACK_IMPORTED_MODULE_3__["mutation"]];
const resolvers = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])(_users_GetAllUsers__WEBPACK_IMPORTED_MODULE_1__["resolvers"], _users_GetLoggedInUser__WEBPACK_IMPORTED_MODULE_2__["resolvers"], _users_CreateUser__WEBPACK_IMPORTED_MODULE_3__["resolvers"]);

/***/ }),

/***/ "./src/data/graphql/Database/users/CreateUser.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return schema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutation", function() { return mutation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data/models/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


const schema = [`
  # User profile data for creating a new local database user account
  input UserProfile {
    # A display name for the logged-in user
    displayName: String!

    # A profile picture URL
    picture: String

    # The user's gender
    gender: String

    # The user's location
    location: String

    # A website URL
    website: String
  }
`];
const mutation = [`
  # Creates a new user and profile in the local database
  databaseCreateUser(
    # The email of the new user, this email must be unique in the database
    email: String!

    # User profile information for creating a new local database user account
    profile: UserProfile!
  ): DatabaseUser
`];
const resolvers = {
  Mutation: {
    databaseCreateUser(parent, args) {
      return _asyncToGenerator(function* () {
        // If user already exists, throw error
        const lookupUser = yield data_models__WEBPACK_IMPORTED_MODULE_0__["User"].findOne({
          where: {
            email: args.email
          }
        });

        if (lookupUser) {
          // eslint-disable-next-line no-throw-literal
          throw 'User already exists!';
        } // Create new user with profile in database


        const user = yield data_models__WEBPACK_IMPORTED_MODULE_0__["User"].create({
          email: args.email,
          profile: _objectSpread({}, args.profile)
        }, {
          include: [{
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserProfile"],
            as: 'profile'
          }]
        });
        return user;
      })();
    }

  }
};

/***/ }),

/***/ "./src/data/graphql/Database/users/GetAllUsers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return schema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queries", function() { return queries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data/models/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


const schema = [`
  # A user stored in the local database
  type DatabaseUser {
    id: String
    email: String
    emailConfirmed: Boolean
    logins: [DatabaseUserLogin]
    claims: [DatabaseUserClaim]
    profile: DatabaseUserProfile
    updatedAt: String
    createdAt: String
  }

  type DatabaseUserLogin {
    name: String
    key: String
    createdAt: String
    updatedAt: String
    userId: String
  }

  type DatabaseUserClaim {
    id: Int
    type: String
    value: String
    createdAt: String
    updatedAt: String
    userId: String
  }

  type DatabaseUserProfile {
    userId: String
    displayName: String
    picture: String
    gender: String
    location: String
    website: String
    createdAt: String
    updatedAt: String
  }
`];
const queries = [`
  # Retrieves all users stored in the local database
  databaseGetAllUsers: [DatabaseUser]

  # Retrieves a single user from the local database
  databaseGetUser(
    # The user's email address
    email: String!
  ): DatabaseUser
`];
const resolvers = {
  RootQuery: {
    databaseGetAllUsers() {
      return _asyncToGenerator(function* () {
        const users = yield data_models__WEBPACK_IMPORTED_MODULE_0__["User"].findAll({
          include: [{
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserLogin"],
            as: 'logins'
          }, {
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserClaim"],
            as: 'claims'
          }, {
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserProfile"],
            as: 'profile'
          }]
        });
        return users;
      })();
    },

    databaseGetUser(parent, {
      email
    }) {
      return _asyncToGenerator(function* () {
        const user = yield data_models__WEBPACK_IMPORTED_MODULE_0__["User"].findOne({
          where: {
            email
          },
          include: [{
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserLogin"],
            as: 'logins'
          }, {
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserClaim"],
            as: 'claims'
          }, {
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserProfile"],
            as: 'profile'
          }]
        });
        return user;
      })();
    }

  }
};

/***/ }),

/***/ "./src/data/graphql/Database/users/GetLoggedInUser.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queries", function() { return queries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data/models/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


const queries = [`
  # Retrieves information about the currently logged-in user
  databaseGetLoggedInUser: DatabaseUser
`];
const resolvers = {
  RootQuery: {
    databaseGetLoggedInUser(parent, args, context) {
      return _asyncToGenerator(function* () {
        // Throw error if user is not authenticated
        if (!context.user) {
          return null;
        } // Find logged in user from database


        const dbUser = yield data_models__WEBPACK_IMPORTED_MODULE_0__["User"].findOne({
          where: {
            email: context.user.email
          },
          include: [{
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserLogin"],
            as: 'logins'
          }, {
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserClaim"],
            as: 'claims'
          }, {
            model: data_models__WEBPACK_IMPORTED_MODULE_0__["UserProfile"],
            as: 'profile'
          }]
        });
        return dbUser;
      })();
    }

  }
};

/***/ }),

/***/ "./src/data/graphql/Intl/schema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return schema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queries", function() { return queries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("bluebird");
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const schema = [`
  type IntlMessage {
    id: String!
    defaultMessage: String!
    message: String
    description: String
    files: [String]
  }
`];
const queries = [`
  # Supported locales: "${_config__WEBPACK_IMPORTED_MODULE_3__["locales"].join('", "')}"
  intl(locale: String!): [IntlMessage]
`];
const MESSAGES_DIR = process.env.MESSAGES_DIR || Object(path__WEBPACK_IMPORTED_MODULE_1__["join"])(__dirname, './messages');

const readFile = bluebird__WEBPACK_IMPORTED_MODULE_2___default.a.promisify(fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile);

const resolvers = {
  RootQuery: {
    intl(parent, {
      locale
    }) {
      return _asyncToGenerator(function* () {
        if (!_config__WEBPACK_IMPORTED_MODULE_3__["locales"].includes(locale)) {
          throw new Error(`Locale '${locale}' not supported`);
        }

        let localeData;

        try {
          localeData = yield readFile(Object(path__WEBPACK_IMPORTED_MODULE_1__["join"])(MESSAGES_DIR, `${locale}.json`));
        } catch (err) {
          if (err.code === 'ENOENT') {
            throw new Error(`Locale '${locale}' not found`);
          }
        }

        return JSON.parse(localeData);
      })();
    }

  }
};

/***/ }),

/***/ "./src/data/graphql/News/reactjsnews.com/GetAllReactJSNews.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return schema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queries", function() { return queries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);

const schema = [`
  # A single news article from [https://reactjsnews.com/](https://reactjsnews.com/)
  type ReactJSNewsItem {
    # The news item's title
    title: String

    # A direct link URL to this news item on reactjsnews.com
    link: String

    # The name of the news item's author
    author: String

    # The date this news item was published
    pubDate: String

    # News article in HTML format
    content: String
  }
`];
const queries = [`
  # Retrieves the latest ReactJS News
  reactjsGetAllNews: [ReactJSNewsItem]
`]; // React.js News Feed (RSS)

const url = 'https://api.rss2json.com/v1/api.json' + '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';
let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);
const resolvers = {
  RootQuery: {
    reactjsGetAllNews() {
      if (lastFetchTask) {
        return lastFetchTask;
      }

      if (new Date() - lastFetchTime > 1000 * 60 * 10
      /* 10 mins */
      ) {
          lastFetchTime = new Date();
          lastFetchTask = node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(url).then(response => response.json()).then(data => {
            if (data.status === 'ok') {
              items = data.items;
            }

            lastFetchTask = null;
            return items;
          }).catch(err => {
            lastFetchTask = null;
            throw err;
          });

          if (items.length) {
            return items;
          }

          return lastFetchTask;
        }

      return items;
    }

  }
};

/***/ }),

/***/ "./src/data/graphql/News/schema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schema", function() { return schema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queries", function() { return queries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reactjsnews_com_GetAllReactJSNews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/graphql/News/reactjsnews.com/GetAllReactJSNews.js");

/** * Queries ** */


const schema = [..._reactjsnews_com_GetAllReactJSNews__WEBPACK_IMPORTED_MODULE_1__["schema"]];
const queries = [..._reactjsnews_com_GetAllReactJSNews__WEBPACK_IMPORTED_MODULE_1__["queries"]];
const resolvers = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])(_reactjsnews_com_GetAllReactJSNews__WEBPACK_IMPORTED_MODULE_1__["resolvers"]);

/***/ }),

/***/ "./src/data/models/User.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/sequelize.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const User = _sequelize__WEBPACK_IMPORTED_MODULE_1__["default"].define('User', {
  id: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.UUID,
    defaultValue: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.UUIDV1,
    primaryKey: true
  },
  email: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(255),
    validate: {
      isEmail: true
    }
  },
  emailConfirmed: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.BOOLEAN,
    defaultValue: false
  }
}, {
  indexes: [{
    fields: ['email']
  }]
});
/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ }),

/***/ "./src/data/models/UserClaim.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/sequelize.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const UserClaim = _sequelize__WEBPACK_IMPORTED_MODULE_1__["default"].define('UserClaim', {
  type: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING
  },
  value: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.INTEGER
  }
});
/* harmony default export */ __webpack_exports__["default"] = (UserClaim);

/***/ }),

/***/ "./src/data/models/UserLogin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/sequelize.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const UserLogin = _sequelize__WEBPACK_IMPORTED_MODULE_1__["default"].define('UserLogin', {
  name: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(50),
    primaryKey: true
  },
  key: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(100),
    primaryKey: true
  }
});
/* harmony default export */ __webpack_exports__["default"] = (UserLogin);

/***/ }),

/***/ "./src/data/models/UserProfile.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/sequelize.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const UserProfile = _sequelize__WEBPACK_IMPORTED_MODULE_1__["default"].define('UserProfile', {
  userId: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.UUID,
    primaryKey: true
  },
  displayName: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(100)
  },
  picture: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(255)
  },
  gender: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(50)
  },
  location: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(100)
  },
  website: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(255)
  }
});
/* harmony default export */ __webpack_exports__["default"] = (UserProfile);

/***/ }),

/***/ "./src/data/models/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data/sequelize.js");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/models/User.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _User__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _UserLogin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/data/models/UserLogin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserLogin", function() { return _UserLogin__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _UserClaim__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/data/models/UserClaim.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserClaim", function() { return _UserClaim__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _UserProfile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/data/models/UserProfile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserProfile", function() { return _UserProfile__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





_User__WEBPACK_IMPORTED_MODULE_1__["default"].hasMany(_UserLogin__WEBPACK_IMPORTED_MODULE_2__["default"], {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});
_User__WEBPACK_IMPORTED_MODULE_1__["default"].hasMany(_UserClaim__WEBPACK_IMPORTED_MODULE_3__["default"], {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});
_User__WEBPACK_IMPORTED_MODULE_1__["default"].hasOne(_UserProfile__WEBPACK_IMPORTED_MODULE_4__["default"], {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return _sequelize__WEBPACK_IMPORTED_MODULE_0__["default"].sync(...args);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  sync
});


/***/ }),

/***/ "./src/data/schema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("graphql-tools");
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tools__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _graphql_News_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/data/graphql/News/schema.js");
/* harmony import */ var _graphql_Database_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/data/graphql/Database/schema.js");
/* harmony import */ var _graphql_Intl_schema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/data/graphql/Intl/schema.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const RootQuery = [`
  # # React-Starter-Kit Querying API
  # ### This GraphQL schema was built with [Apollo GraphQL-Tools](https://github.com/apollographql/graphql-tools)
  # _Build, mock, and stitch a GraphQL schema using the schema language_
  #
  # **[Schema Language Cheet Sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)**
  #
  # 1. Use the GraphQL schema language to [generate a schema](https://www.apollographql.com/docs/graphql-tools/generate-schema.html) with full support for resolvers, interfaces, unions, and custom scalars. The schema produced is completely compatible with [GraphQL.js](https://github.com/graphql/graphql-js).
  # 2. [Mock your GraphQL API](https://www.apollographql.com/docs/graphql-tools/mocking.html) with fine-grained per-type mocking
  # 3. Automatically [stitch multiple schemas together](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html) into one larger API
  type RootQuery {
    ${_graphql_News_schema__WEBPACK_IMPORTED_MODULE_2__["queries"]}
    ${_graphql_Database_schema__WEBPACK_IMPORTED_MODULE_3__["queries"]}
    ${_graphql_Intl_schema__WEBPACK_IMPORTED_MODULE_4__["queries"]}
  }
`];
const Mutation = [`
  # # React-Starter-Kit Mutating API
  # ### This GraphQL schema was built with [Apollo GraphQL-Tools](https://github.com/apollographql/graphql-tools)
  # _Build, mock, and stitch a GraphQL schema using the schema language_
  #
  # **[Schema Language Cheet Sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)**
  #
  # 1. Use the GraphQL schema language to [generate a schema](https://www.apollographql.com/docs/graphql-tools/generate-schema.html) with full support for resolvers, interfaces, unions, and custom scalars. The schema produced is completely compatible with [GraphQL.js](https://github.com/graphql/graphql-js).
  # 2. [Mock your GraphQL API](https://www.apollographql.com/docs/graphql-tools/mocking.html) with fine-grained per-type mocking
  # 3. Automatically [stitch multiple schemas together](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html) into one larger API
  type Mutation {
    ${_graphql_Database_schema__WEBPACK_IMPORTED_MODULE_3__["mutations"]}
  }
`];
const SchemaDefinition = [`
  schema {
    query: RootQuery
    mutation: Mutation
  }
`]; // Merge all of the resolver objects together
// Put schema together into one array of schema strings

const resolvers = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])(_graphql_News_schema__WEBPACK_IMPORTED_MODULE_2__["resolvers"], _graphql_Database_schema__WEBPACK_IMPORTED_MODULE_3__["resolvers"], _graphql_Intl_schema__WEBPACK_IMPORTED_MODULE_4__["resolvers"]);
const schema = [...SchemaDefinition, ...RootQuery, ...Mutation, ..._graphql_News_schema__WEBPACK_IMPORTED_MODULE_2__["schema"], ..._graphql_Database_schema__WEBPACK_IMPORTED_MODULE_3__["schema"], ..._graphql_Intl_schema__WEBPACK_IMPORTED_MODULE_4__["schema"]];
/* harmony default export */ __webpack_exports__["default"] = (Object(graphql_tools__WEBPACK_IMPORTED_MODULE_1__["makeExecutableSchema"])(_objectSpread({
  typeDefs: schema,
  resolvers
},  true ? {
  log: e => console.error(e.stack)
} : undefined)));

/***/ }),

/***/ "./src/data/sequelize.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_0___default.a(_config__WEBPACK_IMPORTED_MODULE_1___default.a.databaseUrl, {
  define: {
    freezeTableName: true
  }
});
/* harmony default export */ __webpack_exports__["default"] = (sequelize);

/***/ }),

/***/ "./src/passport.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_facebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("passport-facebook");
/* harmony import */ var passport_facebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_facebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/data/models/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */




/**
 * Sign in with Facebook.
 */

passport__WEBPACK_IMPORTED_MODULE_0___default.a.use(new passport_facebook__WEBPACK_IMPORTED_MODULE_1__["Strategy"]({
  clientID: _config__WEBPACK_IMPORTED_MODULE_3___default.a.auth.facebook.id,
  clientSecret: _config__WEBPACK_IMPORTED_MODULE_3___default.a.auth.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';

  const fooBar = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* () {
      if (req.user) {
        const userLogin = yield _data_models__WEBPACK_IMPORTED_MODULE_2__["UserLogin"].findOne({
          attributes: ['name', 'key'],
          where: {
            name: loginName,
            key: profile.id
          }
        });

        if (userLogin) {
          // There is already a Facebook account that belongs to you.
          // Sign in with that account or delete it, then link it with your current account.
          done();
        } else {
          const user = yield _data_models__WEBPACK_IMPORTED_MODULE_2__["User"].create({
            id: req.user.id,
            email: profile._json.email,
            logins: [{
              name: loginName,
              key: profile.id
            }],
            claims: [{
              type: claimType,
              value: profile.id
            }],
            profile: {
              displayName: profile.displayName,
              gender: profile._json.gender,
              picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
            }
          }, {
            include: [{
              model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserLogin"],
              as: 'logins'
            }, {
              model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserClaim"],
              as: 'claims'
            }, {
              model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserProfile"],
              as: 'profile'
            }]
          });
          done(null, {
            id: user.id,
            email: user.email
          });
        }
      } else {
        const users = yield _data_models__WEBPACK_IMPORTED_MODULE_2__["User"].findAll({
          attributes: ['id', 'email'],
          where: {
            '$logins.name$': loginName,
            '$logins.key$': profile.id
          },
          include: [{
            attributes: ['name', 'key'],
            model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserLogin"],
            as: 'logins',
            required: true
          }]
        });

        if (users.length) {
          const user = users[0].get({
            plain: true
          });
          done(null, user);
        } else {
          let user = yield _data_models__WEBPACK_IMPORTED_MODULE_2__["User"].findOne({
            where: {
              email: profile._json.email
            }
          });

          if (user) {
            // There is already an account using this email address. Sign in to
            // that account and link it with Facebook manually from Account Settings.
            done(null);
          } else {
            user = yield _data_models__WEBPACK_IMPORTED_MODULE_2__["User"].create({
              email: profile._json.email,
              emailConfirmed: true,
              logins: [{
                name: loginName,
                key: profile.id
              }],
              claims: [{
                type: claimType,
                value: accessToken
              }],
              profile: {
                displayName: profile.displayName,
                gender: profile._json.gender,
                picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
              }
            }, {
              include: [{
                model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserLogin"],
                as: 'logins'
              }, {
                model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserClaim"],
                as: 'claims'
              }, {
                model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserProfile"],
                as: 'profile'
              }]
            });
            done(null, {
              id: user.id,
              email: user.email
            });
          }
        }
      }
    });

    return function fooBar() {
      return _ref.apply(this, arguments);
    };
  }();

  fooBar().catch(done);
}));
/* harmony default export */ __webpack_exports__["default"] = (passport__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "./src/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/reducers/user.js");
/* harmony import */ var _runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/reducers/runtime.js");
/* harmony import */ var _intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/reducers/intl.js");




/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  user: _user__WEBPACK_IMPORTED_MODULE_1__["default"],
  runtime: _runtime__WEBPACK_IMPORTED_MODULE_2__["default"],
  intl: _intl__WEBPACK_IMPORTED_MODULE_3__["default"]
}));

/***/ }),

/***/ "./src/reducers/intl.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return intl; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/constants/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function intl(state = null, action) {
  if (state === null) {
    return {
      initialNow: Date.now()
    };
  }

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["SET_LOCALE_START"]:
      {
        const locale = state[action.payload.locale] ? action.payload.locale : state.locale;
        return _objectSpread(_objectSpread({}, state), {}, {
          locale,
          newLocale: action.payload.locale
        });
      }

    case _constants__WEBPACK_IMPORTED_MODULE_0__["SET_LOCALE_SUCCESS"]:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          locale: action.payload.locale,
          newLocale: null,
          messages: _objectSpread(_objectSpread({}, state.messages), {}, {
            [action.payload.locale]: action.payload.messages
          })
        });
      }

    case _constants__WEBPACK_IMPORTED_MODULE_0__["SET_LOCALE_ERROR"]:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          newLocale: null
        });
      }

    default:
      {
        return state;
      }
  }
}

/***/ }),

/***/ "./src/reducers/runtime.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return runtime; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/constants/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function runtime(state = {}, action) {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__["SET_RUNTIME_VARIABLE"]:
      return _objectSpread(_objectSpread({}, state), {}, {
        [action.payload.name]: action.payload.value
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/user.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return user; });
function user(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/***/ }),

/***/ "./src/router.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var universal_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("universal-router");
/* harmony import */ var universal_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(universal_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/routes/index.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


/* harmony default export */ __webpack_exports__["default"] = (new universal_router__WEBPACK_IMPORTED_MODULE_0___default.a(_routes__WEBPACK_IMPORTED_MODULE_1__["default"], {
  resolveRoute(context, params) {
    if (typeof context.route.load === 'function') {
      return context.route.load().then(action => action.default(context, params));
    }

    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }

    return undefined;
  }

}));

/***/ }),

/***/ "./src/routes/error/ErrorPage.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/routes/error/ErrorPage.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if ( true && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/routes/error/ErrorPage.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/routes/error/ErrorPage.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/routes/error/ErrorPage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorPageWithoutStyle", function() { return ErrorPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ErrorPage_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/routes/error/ErrorPage.css");
/* harmony import */ var _ErrorPage_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ErrorPage_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/amitjain/top-trend/src/routes/error/ErrorPage.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





class ErrorPage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    if ( true && this.props.error) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 9
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 11
        }
      }, this.props.error.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 11
        }
      }, this.props.error.stack));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }
    }, "Error"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 9
      }
    }, "Sorry, a critical error occurred on this page."));
  }

}

_defineProperty(ErrorPage, "propTypes", {
  error: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    stack: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  })
});

_defineProperty(ErrorPage, "defaultProps", {
  error: null
});


/* harmony default export */ __webpack_exports__["default"] = (isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_ErrorPage_css__WEBPACK_IMPORTED_MODULE_3___default.a)(ErrorPage));

/***/ }),

/***/ "./src/routes/error/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ErrorPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/routes/error/ErrorPage.js");
var _jsxFileName = "/Users/amitjain/top-trend/src/routes/error/index.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



function action() {
  return {
    title: 'Demo Error',
    component: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ErrorPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 16
      }
    })
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ }),

/***/ "./src/routes/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
// The top-level (parent) route
const routes = {
  path: '',
  // Keep in mind, routes are evaluated in order
  children: [{
    path: '',
    load: () => Promise.all(/* import() | home */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("home")]).then(__webpack_require__.bind(null, "./src/routes/home/index.js"))
  }, {
    path: '/contact',
    load: () => Promise.all(/* import() | contact */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("contact")]).then(__webpack_require__.bind(null, "./src/routes/contact/index.js"))
  }, {
    path: '/login',
    load: () => Promise.all(/* import() | login */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("login")]).then(__webpack_require__.bind(null, "./src/routes/login/index.js"))
  }, {
    path: '/register',
    load: () => Promise.all(/* import() | register */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("register")]).then(__webpack_require__.bind(null, "./src/routes/register/index.js"))
  }, {
    path: '/about',
    load: () => Promise.all(/* import() | about */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about")]).then(__webpack_require__.bind(null, "./src/routes/about/index.js"))
  }, {
    path: '/privacy',
    load: () => Promise.all(/* import() | privacy */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("privacy")]).then(__webpack_require__.bind(null, "./src/routes/privacy/index.js"))
  }, {
    path: '/admin',
    load: () => Promise.all(/* import() | admin */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("admin")]).then(__webpack_require__.bind(null, "./src/routes/admin/index.js"))
  }, // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    path: '(.*)',
    load: () => Promise.all(/* import() | not-found */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("not-found")]).then(__webpack_require__.bind(null, "./src/routes/not-found/index.js"))
  }],

  action({
    next
  }) {
    return _asyncToGenerator(function* () {
      // Execute each child route until one of them return the result
      const route = yield next(); // Provide default values for title, description etc.

      route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`;
      route.description = route.description || '';
      return route;
    })();
  }

}; // The error page is available by permanent url for development mode

if (true) {
  routes.children.unshift({
    path: '/error',
    action: __webpack_require__("./src/routes/error/index.js").default
  });
}

/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./src/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("bluebird");
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express_request_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("express-request-language");
/* harmony import */ var express_request_language__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express_request_language__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("express-jwt");
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("express-graphql");
/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(express_graphql__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var pretty_error__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("pretty-error");
/* harmony import */ var pretty_error__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(pretty_error__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _serverIntlPolyfill__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./src/serverIntlPolyfill.js");
/* harmony import */ var _core_createApolloClient__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./src/core/createApolloClient/createApolloClient.server.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./src/components/App.js");
/* harmony import */ var _components_Html__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./src/components/Html.js");
/* harmony import */ var _routes_error_ErrorPage__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./src/routes/error/ErrorPage.js");
/* harmony import */ var _routes_error_ErrorPage_css__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./src/routes/error/ErrorPage.css");
/* harmony import */ var _routes_error_ErrorPage_css__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_routes_error_ErrorPage_css__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _createFetch__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./src/createFetch.js");
/* harmony import */ var _passport__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./src/passport.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./src/router.js");
/* harmony import */ var _data_models__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./src/data/models/index.js");
/* harmony import */ var _data_schema__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("./src/data/schema.js");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("./chunk-manifest.json");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("./src/store/configureStore.js");
/* harmony import */ var _actions_runtime__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("./src/actions/runtime.js");
/* harmony import */ var _actions_intl__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("./src/actions/intl.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_31__);
var _this = undefined,
    _jsxFileName = "/Users/amitjain/top-trend/src/server.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


























 // import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved

 // eslint-disable-line import/no-unresolved





process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason); // send entire app down. Process manager will restart it

  process.exit(1);
}); //
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
const app = express__WEBPACK_IMPORTED_MODULE_2___default()(); //
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------

app.set('trust proxy', _config__WEBPACK_IMPORTED_MODULE_31___default.a.trustProxy); //
// Register Node.js middleware
// -----------------------------------------------------------------------------

app.use(express__WEBPACK_IMPORTED_MODULE_2___default.a.static(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(__dirname, 'public')));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_3___default()());
app.use(express_request_language__WEBPACK_IMPORTED_MODULE_4___default()({
  languages: _config__WEBPACK_IMPORTED_MODULE_31___default.a.locales,
  queryName: 'lang',
  cookie: {
    name: 'lang',
    options: {
      path: '/',
      maxAge: 3650 * 24 * 3600 * 1000 // 10 years in miliseconds

    },
    url: '/lang/{language}'
  }
}));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.urlencoded({
  extended: true
}));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.json()); //
// Authentication
// -----------------------------------------------------------------------------

app.use(express_jwt__WEBPACK_IMPORTED_MODULE_6___default()({
  secret: _config__WEBPACK_IMPORTED_MODULE_31___default.a.auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
})); // Error handler for express-jwt

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof express_jwt__WEBPACK_IMPORTED_MODULE_6__["UnauthorizedError"]) {
    console.error('[express-jwt-error]', req.cookies.id_token); // `clearCookie`, otherwise user can't use web-app until cookie expires

    res.clearCookie('id_token');
  }

  next(err);
});
app.use(_passport__WEBPACK_IMPORTED_MODULE_23__["default"].initialize());
app.get('/login/facebook', _passport__WEBPACK_IMPORTED_MODULE_23__["default"].authenticate('facebook', {
  scope: ['email', 'user_location'],
  session: false
}));
app.get('/login/facebook/return', _passport__WEBPACK_IMPORTED_MODULE_23__["default"].authenticate('facebook', {
  failureRedirect: '/login',
  session: false
}), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days

  const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_9___default.a.sign(req.user, _config__WEBPACK_IMPORTED_MODULE_31___default.a.auth.jwt.secret, {
    expiresIn
  });
  res.cookie('id_token', token, {
    maxAge: 1000 * expiresIn,
    httpOnly: true
  });
  res.redirect('/');
}); //
// Register API middleware
// -----------------------------------------------------------------------------
// https://github.com/graphql/express-graphql#options

const graphqlMiddleware = express_graphql__WEBPACK_IMPORTED_MODULE_8___default()(req => ({
  schema: _data_schema__WEBPACK_IMPORTED_MODULE_26__["default"],
  graphiql: true,
  rootValue: {
    request: req
  },
  pretty: true
}));
app.use('/graphql', graphqlMiddleware); //
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

app.get('*', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const css = new Set(); // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader

      const insertCss = (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      };

      const apolloClient = Object(_core_createApolloClient__WEBPACK_IMPORTED_MODULE_17__["default"])({
        schema: _data_schema__WEBPACK_IMPORTED_MODULE_26__["default"],
        rootValue: {
          request: req
        }
      }); // Universal HTTP client

      const fetch = Object(_createFetch__WEBPACK_IMPORTED_MODULE_22__["default"])(node_fetch__WEBPACK_IMPORTED_MODULE_10___default.a, {
        baseUrl: _config__WEBPACK_IMPORTED_MODULE_31___default.a.api.serverUrl,
        cookie: req.headers.cookie,
        apolloClient,
        schema: _data_schema__WEBPACK_IMPORTED_MODULE_26__["default"],
        graphql: graphql__WEBPACK_IMPORTED_MODULE_7__["graphql"]
      });
      const initialState = {
        user: req.user || null
      };
      const store = Object(_store_configureStore__WEBPACK_IMPORTED_MODULE_28__["default"])(initialState, {
        cookie: req.headers.cookie,
        apolloClient,
        fetch,
        // I should not use `history` on server.. but how I do redirection? follow universal-router
        history: null
      });
      store.dispatch(Object(_actions_runtime__WEBPACK_IMPORTED_MODULE_29__["setRuntimeVariable"])({
        name: 'initialNow',
        value: Date.now()
      }));
      store.dispatch(Object(_actions_runtime__WEBPACK_IMPORTED_MODULE_29__["setRuntimeVariable"])({
        name: 'availableLocales',
        value: _config__WEBPACK_IMPORTED_MODULE_31___default.a.locales
      }));
      const locale = req.language;
      const intl = yield store.dispatch(Object(_actions_intl__WEBPACK_IMPORTED_MODULE_30__["setLocale"])({
        locale
      })); // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html

      const context = {
        insertCss,
        fetch,
        // The twins below are wild, be careful!
        pathname: req.path,
        query: req.query,
        // You can access redux through react-redux connect
        store,
        storeSubscription: null,
        // Apollo Client for use with react-apollo
        client: apolloClient,
        // intl instance as it can be get with injectIntl
        intl,
        locale
      };
      const route = yield _router__WEBPACK_IMPORTED_MODULE_24__["default"].resolve(context);

      if (route.redirect) {
        res.redirect(route.status || 302, route.redirect);
        return;
      }

      const data = _objectSpread({}, route);

      const rootComponent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_18__["default"], {
        context: context,
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 232,
          columnNumber: 27
        }
      }, route.component);
      yield Object(react_apollo__WEBPACK_IMPORTED_MODULE_13__["getDataFromTree"])(rootComponent); // this is here because of Apollo redux APOLLO_QUERY_STOP action

      yield bluebird__WEBPACK_IMPORTED_MODULE_1___default.a.delay(0);
      data.children = yield react_dom_server__WEBPACK_IMPORTED_MODULE_12___default.a.renderToString(rootComponent);
      data.styles = [{
        id: 'css',
        cssText: [...css].join('')
      }];
      const scripts = new Set();

      const addChunk = chunk => {
        if (_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_27___default.a[chunk]) {
          _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_27___default.a[chunk].forEach(asset => scripts.add(asset));
        } else if (true) {
          throw new Error(`Chunk with name '${chunk}' cannot be found`);
        }
      };

      addChunk('client');
      if (route.chunk) addChunk(route.chunk);
      if (route.chunks) route.chunks.forEach(addChunk);
      data.scripts = Array.from(scripts); // Furthermore invoked actions will be ignored, client will not receive them!

      if (true) {
        // eslint-disable-next-line no-console
        console.log('Serializing store...');
      }

      data.app = {
        apiUrl: _config__WEBPACK_IMPORTED_MODULE_31___default.a.api.clientUrl,
        state: context.store.getState(),
        lang: locale,
        apolloState: context.client.extract()
      };
      const html = react_dom_server__WEBPACK_IMPORTED_MODULE_12___default.a.renderToStaticMarkup( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_components_Html__WEBPACK_IMPORTED_MODULE_19__["default"], _extends({}, data, {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 264,
          columnNumber: 48
        }
      })));
      res.status(route.status || 200);
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); //
// Error handling
// -----------------------------------------------------------------------------

const pe = new pretty_error__WEBPACK_IMPORTED_MODULE_14___default.a();
pe.skipNodeFiles();
pe.skipPackage('express'); // eslint-disable-next-line no-unused-vars

app.use((err, req, res, next) => {
  const locale = req.language;
  console.error(pe.render(err));
  const html = react_dom_server__WEBPACK_IMPORTED_MODULE_12___default.a.renderToStaticMarkup( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_components_Html__WEBPACK_IMPORTED_MODULE_19__["default"], {
    title: "Internal Server Error",
    description: err.message,
    styles: [{
      id: 'css',
      cssText: _routes_error_ErrorPage_css__WEBPACK_IMPORTED_MODULE_21___default.a._getCss()
    }] // eslint-disable-line no-underscore-dangle
    ,
    app: {
      lang: locale
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 284,
      columnNumber: 5
    }
  }, react_dom_server__WEBPACK_IMPORTED_MODULE_12___default.a.renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["IntlProvider"], {
    locale: locale,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 291,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_routes_error_ErrorPage__WEBPACK_IMPORTED_MODULE_20__["ErrorPageWithoutStyle"], {
    error: err,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 292,
      columnNumber: 11
    }
  })))));
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
}); //
// Launch the server
// -----------------------------------------------------------------------------

const promise = _data_models__WEBPACK_IMPORTED_MODULE_25__["default"].sync().catch(err => console.error(err.stack));

if (false) {} //
// Hot Module Replacement
// -----------------------------------------------------------------------------


if (true) {
  app.hot = module.hot;
  module.hot.accept("./src/router.js", function() { /* harmony import */ _router__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./src/router.js");
 });
}

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./src/serverIntlPolyfill.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var intl_locales_supported__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("intl-locales-supported");
/* harmony import */ var intl_locales_supported__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intl_locales_supported__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);



if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!intl_locales_supported__WEBPACK_IMPORTED_MODULE_0___default()(_config__WEBPACK_IMPORTED_MODULE_1__["locales"])) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    const IntlPolyfill = __webpack_require__("intl"); // eslint-disable-line global-require


    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = __webpack_require__("intl"); // eslint-disable-line global-require
}

/***/ }),

/***/ "./src/store/configureStore.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_devtools_extension_developmentOnly__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("redux-devtools-extension/developmentOnly");
/* harmony import */ var redux_devtools_extension_developmentOnly__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension_developmentOnly__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t("./package.json", 1);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/reducers/index.js");
/* harmony import */ var _createHelpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/store/createHelpers.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/store/logger/logger.server.js");







function configureStore(initialState, helpersConfig) {
  const helpers = Object(_createHelpers__WEBPACK_IMPORTED_MODULE_5__["default"])(helpersConfig);
  const middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a.withExtraArgument(helpers)];
  let enhancer;

  if (true) {
    middleware.push(Object(_logger__WEBPACK_IMPORTED_MODULE_6__["default"])()); // https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production

    const composeEnhancers = Object(redux_devtools_extension_developmentOnly__WEBPACK_IMPORTED_MODULE_2__["composeWithDevTools"])({
      // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
      name: `${_package_json__WEBPACK_IMPORTED_MODULE_3__["name"]}@${_package_json__WEBPACK_IMPORTED_MODULE_3__["version"]}`
    }); // https://redux.js.org/docs/api/applyMiddleware.html

    enhancer = composeEnhancers(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(...middleware));
  } else {} // https://redux.js.org/docs/api/createStore.html


  const store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], initialState, enhancer); // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)

  if (true) {
    module.hot.accept("./src/reducers/index.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/reducers/index.js");
(() => // Don't forget to remove `()` if you change reducers back to normal rootReducer.
    // eslint-disable-next-line global-require
    store.replaceReducer(__webpack_require__("./src/reducers/index.js").default()))(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
  }

  return store;
}

/***/ }),

/***/ "./src/store/createHelpers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createHelpers; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const graphqlRequestDeprecatedMessage = `\`graphqlRequest\` has been deprecated.
You should use Apollo: \`client.query({ query, variables...})\` or \`client.mutate()\`
Don't forget to enclose your query to gql\`…\` tag or import *.graphql file.
See docs at http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient\\.query`;

function createGraphqlRequest(apolloClient) {
  return /*#__PURE__*/function () {
    var _graphqlRequest = _asyncToGenerator(function* (queryOrString, variables) {
      if (true) {
        // eslint-disable-next-line no-console
        console.error(graphqlRequestDeprecatedMessage);
      } // const { skipCache } = options;


      let query = queryOrString;

      if (typeof queryOrString === 'string') {
        const gql = yield Promise.resolve(/* require.ensure */).then((require => __webpack_require__("graphql-tag")).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        query = gql([queryOrString]);
      }

      let isMutation = false;

      if (query.definitions) {
        isMutation = query.definitions.some(definition => definition && definition.operation === 'mutation');
      }

      if (isMutation) {
        return apolloClient.mutate({
          mutation: query,
          variables
        });
      }

      return apolloClient.query({
        query,
        variables
      });
    });

    function graphqlRequest(_x, _x2) {
      return _graphqlRequest.apply(this, arguments);
    }

    return graphqlRequest;
  }();
}

function createHelpers({
  apolloClient,
  fetch,
  history
}) {
  return {
    client: apolloClient,
    history,
    fetch,
    // @deprecated('Use `client` instead')
    apolloClient,
    // @deprecated('Use `client.query()` or `client.mutate()` instead')
    graphqlRequest: createGraphqlRequest(fetch)
  };
}

/***/ }),

/***/ "./src/store/logger/logger.server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createLogger; });
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("util");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);


function inspectObject(object) {
  return Object(util__WEBPACK_IMPORTED_MODULE_0__["inspect"])(object, {
    colors: true
  });
}

function singleLine(str) {
  return str.replace(/\s+/g, ' ');
}

const actionFormatters = {
  // This is used at feature/apollo branch, but it can help you when implementing Apollo
  APOLLO_QUERY_INIT: a => `queryId:${a.queryId} variables:${inspectObject(a.variables)}\n   ${singleLine(a.queryString)}`,
  APOLLO_QUERY_RESULT: a => `queryId:${a.queryId}\n   ${singleLine(inspectObject(a.result))}`,
  APOLLO_QUERY_STOP: a => `queryId:${a.queryId}`,
  SET_LOCALE_SUCCESS: a => `locale ${a.payload.locale}: ${Object.keys(a.payload.messages).length} messages`
}; // Server side redux action logger

function createLogger() {
  // eslint-disable-next-line no-unused-vars
  return store => next => action => {
    let formattedPayload = '';
    const actionFormatter = actionFormatters[action.type];

    if (typeof actionFormatter === 'function') {
      formattedPayload = actionFormatter(action);
    } else if (action.toString !== Object.prototype.toString) {
      formattedPayload = action.toString();
    } else if (typeof action.payload !== 'undefined') {
      formattedPayload = inspectObject(action.payload);
    } else {
      formattedPayload = inspectObject(action);
    }

    console.log(` * ${action.type}: ${formattedPayload}`); // eslint-disable-line no-console

    return next(action);
  };
}

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("@babel/polyfill");
module.exports = __webpack_require__("./src/server.js");


/***/ }),

/***/ "@babel/polyfill":
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "apollo-cache-inmemory":
/***/ (function(module, exports) {

module.exports = require("apollo-cache-inmemory");

/***/ }),

/***/ "apollo-client":
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),

/***/ "apollo-link":
/***/ (function(module, exports) {

module.exports = require("apollo-link");

/***/ }),

/***/ "apollo-link-error":
/***/ (function(module, exports) {

module.exports = require("apollo-link-error");

/***/ }),

/***/ "apollo-link-schema":
/***/ (function(module, exports) {

module.exports = require("apollo-link-schema");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/helpers/slicedToArray":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ "bluebird":
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "classnames":
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-graphql":
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),

/***/ "express-jwt":
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),

/***/ "express-request-language":
/***/ (function(module, exports) {

module.exports = require("express-request-language");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "graphql":
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-tag":
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "graphql-tools":
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "history/createBrowserHistory":
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),

/***/ "intl":
/***/ (function(module, exports) {

module.exports = require("intl");

/***/ }),

/***/ "intl-locales-supported":
/***/ (function(module, exports) {

module.exports = require("intl-locales-supported");

/***/ }),

/***/ "isomorphic-style-loader/lib/withStyles":
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),

/***/ "jsonwebtoken":
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "node-fetch":
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "passport":
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-facebook":
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pretty-error":
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-apollo":
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-intl":
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension/developmentOnly":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension/developmentOnly");

/***/ }),

/***/ "redux-thunk":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "sequelize":
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "serialize-javascript":
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "universal-router":
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),

/***/ "util":
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3dlYnBhY2svYm9vdHN0cmFwIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcIi4vY2h1bmstbWFuaWZlc3QuanNvblwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3MiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9hY3Rpb25zL2ludGwuZ3JhcGhxbCIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2FjdGlvbnMvaW50bC5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2FjdGlvbnMvcnVudGltZS5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2NvbXBvbmVudHMvQXBwLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvY29tcG9uZW50cy9IdG1sLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvY29uZmlnLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvY29uc3RhbnRzL2luZGV4LmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvY29yZS9jcmVhdGVBcG9sbG9DbGllbnQvY3JlYXRlQXBvbGxvQ2xpZW50LnNlcnZlci5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2NvcmUvY3JlYXRlQXBvbGxvQ2xpZW50L2NyZWF0ZUNhY2hlLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvY3JlYXRlRmV0Y2guanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9kYXRhL2dyYXBocWwvRGF0YWJhc2Uvc2NoZW1hLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvZGF0YS9ncmFwaHFsL0RhdGFiYXNlL3VzZXJzL0NyZWF0ZVVzZXIuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9kYXRhL2dyYXBocWwvRGF0YWJhc2UvdXNlcnMvR2V0QWxsVXNlcnMuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9kYXRhL2dyYXBocWwvRGF0YWJhc2UvdXNlcnMvR2V0TG9nZ2VkSW5Vc2VyLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvZGF0YS9ncmFwaHFsL0ludGwvc2NoZW1hLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvZGF0YS9ncmFwaHFsL05ld3MvcmVhY3Rqc25ld3MuY29tL0dldEFsbFJlYWN0SlNOZXdzLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvZGF0YS9ncmFwaHFsL05ld3Mvc2NoZW1hLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvZGF0YS9tb2RlbHMvVXNlci5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2RhdGEvbW9kZWxzL1VzZXJDbGFpbS5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2RhdGEvbW9kZWxzL1VzZXJMb2dpbi5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2RhdGEvbW9kZWxzL1VzZXJQcm9maWxlLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvZGF0YS9tb2RlbHMvaW5kZXguanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9kYXRhL3NjaGVtYS5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2RhdGEvc2VxdWVsaXplLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvcGFzc3BvcnQuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9yZWR1Y2Vycy9pbmRleC5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL3JlZHVjZXJzL2ludGwuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9yZWR1Y2Vycy9ydW50aW1lLmpzIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvcmVkdWNlcnMvdXNlci5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3M/YjJlMSIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9yb3V0ZXMvZXJyb3IvaW5kZXguanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9yb3V0ZXMvaW5kZXguanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9zZXJ2ZXIuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9zZXJ2ZXJJbnRsUG9seWZpbGwuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9zdG9yZS9jb25maWd1cmVTdG9yZS5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL3N0b3JlL2NyZWF0ZUhlbHBlcnMuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9zdG9yZS9sb2dnZXIvbG9nZ2VyLnNlcnZlci5qcyIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJAYmFiZWwvcG9seWZpbGxcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJhcG9sbG8tY2FjaGUtaW5tZW1vcnlcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJhcG9sbG8tY2xpZW50XCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwiYXBvbGxvLWxpbmtcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJhcG9sbG8tbGluay1lcnJvclwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcImFwb2xsby1saW5rLXNjaGVtYVwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeVwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwiYmx1ZWJpcmRcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcImNsYXNzbmFtZXNcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcImV4cHJlc3MtZ3JhcGhxbFwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcImV4cHJlc3Mtand0XCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwiZXhwcmVzcy1yZXF1ZXN0LWxhbmd1YWdlXCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwiZnNcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJncmFwaHFsXCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwiZ3JhcGhxbC10YWdcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJncmFwaHFsLXRvb2xzXCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwiaGlzdG9yeS9jcmVhdGVCcm93c2VySGlzdG9yeVwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcImludGxcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJpbnRsLWxvY2FsZXMtc3VwcG9ydGVkXCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJub2RlLWZldGNoXCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwicGFzc3BvcnRcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJwYXNzcG9ydC1mYWNlYm9va1wiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcInBhdGhcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJwcmV0dHktZXJyb3JcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwicmVhY3RcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJyZWFjdC1hcG9sbG9cIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwicmVhY3QtaW50bFwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwicmVkdXhcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb24vZGV2ZWxvcG1lbnRPbmx5XCIiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL2V4dGVybmFsIFwicmVkdXgtdGh1bmtcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9leHRlcm5hbCBcInVuaXZlcnNhbC1yb3V0ZXJcIiIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvZXh0ZXJuYWwgXCJ1dGlsXCIiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4vXCIgKyBcInVwZGF0ZXMvXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIik7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rLmlkLCBjaHVuay5tb2R1bGVzKTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KCkge1xuIFx0XHR0cnkge1xuIFx0XHRcdHZhciB1cGRhdGUgPSByZXF1aXJlKFwiLi9cIiArIFwidXBkYXRlcy9cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpO1xuIFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlKTtcbiBcdH1cblxuIFx0Ly9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJmNTFhMmRjNTYxOGUyZDJkNTgzM1wiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkludmFsaWRhdGVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG4gXHRcdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0c3dpdGNoIChob3RTdGF0dXMpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcImlkbGVcIjpcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuIFx0XHRcdFx0XHRcdGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG4gXHRcdFx0XHRcdFx0KGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9XG4gXHRcdFx0XHRcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgfHwgW10pLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdH1cbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaCwgaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gXHRcdHJldHVybiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpIHtcbiBcdFx0aG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHQhbW9kdWxlIHx8XG4gXHRcdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcbiBcdFx0XHRcdClcbiBcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuIFx0XHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcbiBcdFx0XHRcdCFpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZJbnZhbGlkYXRlZFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRwYXJlbnRzOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5wYXJlbnRzLnNsaWNlKCksXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGlmIChob3RVcGRhdGVOZXdIYXNoICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVuZGVmaW5lZDtcbiBcdFx0fVxuIFx0XHRob3RVcGRhdGUgPSB1bmRlZmluZWQ7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IGl0ZW0ucGFyZW50cztcbiBcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSBtb2R1bGVJZDtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aWYgKGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuIFx0XHRcdHJldHVybiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24obGlzdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcbiBcdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRyZXR1cm4gbGlzdDtcbiBcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG4gXHRcdGlmIChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoIWhvdFVwZGF0ZSkgaG90VXBkYXRlID0ge307XG4gXHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZSk7XG4gXHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuIFx0XHRcdHJldHVybiB0cnVlO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0aWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBtb2R1bGVJZCkpXG4gXHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInNlcnZlclwiOiAwXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIHJlcXVpcmUoKSBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gMCkge1xuIFx0XHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL2NodW5rcy9cIiArICh7XCJ2ZW5kb3JzfmFib3V0fmFkbWlufmNvbnRhY3R+aG9tZX5sb2dpbn5ub3QtZm91bmR+cHJpdmFjeX5yZWdpc3RlclwiOlwidmVuZG9yc35hYm91dH5hZG1pbn5jb250YWN0fmhvbWV+bG9naW5+bm90LWZvdW5kfnByaXZhY3l+cmVnaXN0ZXJcIixcImFib3V0fmFkbWlufmNvbnRhY3R+aG9tZX5sb2dpbn5ub3QtZm91bmR+cHJpdmFjeX5yZWdpc3RlclwiOlwiYWJvdXR+YWRtaW5+Y29udGFjdH5ob21lfmxvZ2lufm5vdC1mb3VuZH5wcml2YWN5fnJlZ2lzdGVyXCIsXCJhYm91dFwiOlwiYWJvdXRcIixcImFkbWluXCI6XCJhZG1pblwiLFwiY29udGFjdFwiOlwiY29udGFjdFwiLFwiaG9tZVwiOlwiaG9tZVwiLFwibG9naW5cIjpcImxvZ2luXCIsXCJub3QtZm91bmRcIjpcIm5vdC1mb3VuZFwiLFwicHJpdmFjeVwiOlwicHJpdmFjeVwiLFwicmVnaXN0ZXJcIjpcInJlZ2lzdGVyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCIpO1xuIFx0XHRcdHZhciBtb3JlTW9kdWxlcyA9IGNodW5rLm1vZHVsZXMsIGNodW5rSWRzID0gY2h1bmsuaWRzO1xuIFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIHVuY2F1Z2h0IGVycm9yIGhhbmRsZXIgZm9yIHdlYnBhY2sgcnVudGltZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikge1xuIFx0XHRwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuIFx0XHRcdHRocm93IGVycjsgLy8gY2F0Y2ggdGhpcyBlcnJvciBieSB1c2luZyBpbXBvcnQoKS5jYXRjaCgpXG4gXHRcdH0pO1xuIFx0fTtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9jaHVuay1tYW5pZmVzdC5qc29uXCIpOyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZzogMCAzMnB4O1xcbiAgcGFkZGluZzogMCAycmVtO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzg4ODtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmgxIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzU1NTtcXG59XFxuXFxucHJlIHtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7Ozs7OztHQU9HOztBQUVIO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7TUFDbkIsb0JBQW9CO0VBQ3hCLHNCQUFzQjtNQUNsQix3QkFBd0I7RUFDNUIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isd0JBQXdCO0VBQ3hCLG1CQUFtQjtFQUNuQixZQUFZO0NBQ2I7O0FBRUQ7RUFDRSxVQUFVO0NBQ1g7O0FBRUQ7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtDQUNiOztBQUVEO0VBQ0Usc0JBQXNCO0VBQ3RCLGlCQUFpQjtDQUNsQlwiLFwiZmlsZVwiOlwiRXJyb3JQYWdlLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZzogMCAzMnB4O1xcbiAgcGFkZGluZzogMCAycmVtO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzg4ODtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmgxIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzU1NTtcXG59XFxuXFxucHJlIHtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5Jyk7XG5cbnZhciBfc3RyaW5naWZ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0cmluZ2lmeSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheTIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheScpO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2xpY2VkVG9BcnJheTIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIElzb21vcnBoaWMgQ1NTIHN0eWxlIGxvYWRlciBmb3IgV2VicGFja1xuICpcbiAqIENvcHlyaWdodCDCqSAyMDE1LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHByZWZpeCA9ICdzJztcbnZhciBpbnNlcnRlZCA9IHt9O1xuXG4vLyBCYXNlNjQgZW5jb2RpbmcgYW5kIGRlY29kaW5nIC0gVGhlIFwiVW5pY29kZSBQcm9ibGVtXCJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dCYXNlNjQvQmFzZTY0X2VuY29kaW5nX2FuZF9kZWNvZGluZyNUaGVfVW5pY29kZV9Qcm9ibGVtXG5mdW5jdGlvbiBiNjRFbmNvZGVVbmljb2RlKHN0cikge1xuICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9nLCBmdW5jdGlvbiAobWF0Y2gsIHAxKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoJzB4JyArIHAxKTtcbiAgfSkpO1xufVxuXG4vKipcbiAqIFJlbW92ZSBzdHlsZS9saW5rIGVsZW1lbnRzIGZvciBzcGVjaWZpZWQgbm9kZSBJRHNcbiAqIGlmIHRoZXkgYXJlIG5vIGxvbmdlciByZWZlcmVuY2VkIGJ5IFVJIGNvbXBvbmVudHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNzcyhpZHMpIHtcbiAgaWRzLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgaWYgKC0taW5zZXJ0ZWRbaWRdIDw9IDApIHtcbiAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4ICsgaWQpO1xuICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogRXhhbXBsZTpcbiAqICAgLy8gSW5zZXJ0IENTUyBzdHlsZXMgb2JqZWN0IGdlbmVyYXRlZCBieSBgY3NzLWxvYWRlcmAgaW50byBET01cbiAqICAgdmFyIHJlbW92ZUNzcyA9IGluc2VydENzcyhbWzEsICdib2R5IHsgY29sb3I6IHJlZDsgfSddXSk7XG4gKlxuICogICAvLyBSZW1vdmUgaXQgZnJvbSB0aGUgRE9NXG4gKiAgIHJlbW92ZUNzcygpO1xuICovXG5mdW5jdGlvbiBpbnNlcnRDc3Moc3R5bGVzKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWYkcmVwbGFjZSA9IF9yZWYucmVwbGFjZSxcbiAgICAgIHJlcGxhY2UgPSBfcmVmJHJlcGxhY2UgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRyZXBsYWNlLFxuICAgICAgX3JlZiRwcmVwZW5kID0gX3JlZi5wcmVwZW5kLFxuICAgICAgcHJlcGVuZCA9IF9yZWYkcHJlcGVuZCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJHByZXBlbmQ7XG5cbiAgdmFyIGlkcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfc3R5bGVzJGkgPSAoMCwgX3NsaWNlZFRvQXJyYXkzLmRlZmF1bHQpKHN0eWxlc1tpXSwgNCksXG4gICAgICAgIG1vZHVsZUlkID0gX3N0eWxlcyRpWzBdLFxuICAgICAgICBjc3MgPSBfc3R5bGVzJGlbMV0sXG4gICAgICAgIG1lZGlhID0gX3N0eWxlcyRpWzJdLFxuICAgICAgICBzb3VyY2VNYXAgPSBfc3R5bGVzJGlbM107XG5cbiAgICB2YXIgaWQgPSBtb2R1bGVJZCArICctJyArIGk7XG5cbiAgICBpZHMucHVzaChpZCk7XG5cbiAgICBpZiAoaW5zZXJ0ZWRbaWRdKSB7XG4gICAgICBpZiAoIXJlcGxhY2UpIHtcbiAgICAgICAgaW5zZXJ0ZWRbaWRdKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluc2VydGVkW2lkXSA9IDE7XG5cbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCArIGlkKTtcbiAgICB2YXIgY3JlYXRlID0gZmFsc2U7XG5cbiAgICBpZiAoIWVsZW0pIHtcbiAgICAgIGNyZWF0ZSA9IHRydWU7XG5cbiAgICAgIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgIGVsZW0uaWQgPSBwcmVmaXggKyBpZDtcblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY3NzVGV4dCA9IGNzcztcbiAgICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBza2lwIElFOSBhbmQgYmVsb3csIHNlZSBodHRwOi8vY2FuaXVzZS5jb20vYXRvYi1idG9hXG4gICAgICBjc3NUZXh0ICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBiNjRFbmNvZGVVbmljb2RlKCgwLCBfc3RyaW5naWZ5Mi5kZWZhdWx0KShzb3VyY2VNYXApKSArICcqLyc7XG4gICAgICBjc3NUZXh0ICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuZmlsZSArICc/JyArIGlkICsgJyovJztcbiAgICB9XG5cbiAgICBpZiAoJ3RleHRDb250ZW50JyBpbiBlbGVtKSB7XG4gICAgICBlbGVtLnRleHRDb250ZW50ID0gY3NzVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgIH1cblxuICAgIGlmIChjcmVhdGUpIHtcbiAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGVsZW0sIGRvY3VtZW50LmhlYWQuY2hpbGROb2Rlc1swXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZW1vdmVDc3MuYmluZChudWxsLCBpZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydENzczsiLCJcbiAgICB2YXIgZG9jID0ge1wia2luZFwiOlwiRG9jdW1lbnRcIixcImRlZmluaXRpb25zXCI6W3tcImtpbmRcIjpcIk9wZXJhdGlvbkRlZmluaXRpb25cIixcIm9wZXJhdGlvblwiOlwicXVlcnlcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiaW50bFwifSxcInZhcmlhYmxlRGVmaW5pdGlvbnNcIjpbe1wia2luZFwiOlwiVmFyaWFibGVEZWZpbml0aW9uXCIsXCJ2YXJpYWJsZVwiOntcImtpbmRcIjpcIlZhcmlhYmxlXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImxvY2FsZVwifX0sXCJ0eXBlXCI6e1wia2luZFwiOlwiTm9uTnVsbFR5cGVcIixcInR5cGVcIjp7XCJraW5kXCI6XCJOYW1lZFR5cGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwiU3RyaW5nXCJ9fX19XSxcImRpcmVjdGl2ZXNcIjpbXSxcInNlbGVjdGlvblNldFwiOntcImtpbmRcIjpcIlNlbGVjdGlvblNldFwiLFwic2VsZWN0aW9uc1wiOlt7XCJraW5kXCI6XCJGaWVsZFwiLFwibmFtZVwiOntcImtpbmRcIjpcIk5hbWVcIixcInZhbHVlXCI6XCJpbnRsXCJ9LFwiYXJndW1lbnRzXCI6W3tcImtpbmRcIjpcIkFyZ3VtZW50XCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImxvY2FsZVwifSxcInZhbHVlXCI6e1wia2luZFwiOlwiVmFyaWFibGVcIixcIm5hbWVcIjp7XCJraW5kXCI6XCJOYW1lXCIsXCJ2YWx1ZVwiOlwibG9jYWxlXCJ9fX1dLFwiZGlyZWN0aXZlc1wiOltdLFwic2VsZWN0aW9uU2V0XCI6e1wia2luZFwiOlwiU2VsZWN0aW9uU2V0XCIsXCJzZWxlY3Rpb25zXCI6W3tcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcImlkXCJ9LFwiYXJndW1lbnRzXCI6W10sXCJkaXJlY3RpdmVzXCI6W119LHtcImtpbmRcIjpcIkZpZWxkXCIsXCJuYW1lXCI6e1wia2luZFwiOlwiTmFtZVwiLFwidmFsdWVcIjpcIm1lc3NhZ2VcIn0sXCJhcmd1bWVudHNcIjpbXSxcImRpcmVjdGl2ZXNcIjpbXX1dfX1dfX1dLFwibG9jXCI6e1wic3RhcnRcIjowLFwiZW5kXCI6ODJ9fTtcbiAgICBkb2MubG9jLnNvdXJjZSA9IHtcImJvZHlcIjpcInF1ZXJ5IGludGwoJGxvY2FsZTogU3RyaW5nISkge1xcbiAgaW50bChsb2NhbGU6ICRsb2NhbGUpIHtcXG4gICAgaWRcXG4gICAgbWVzc2FnZVxcbiAgfVxcbn1cXG5cIixcIm5hbWVcIjpcIkdyYXBoUUwgcmVxdWVzdFwiLFwibG9jYXRpb25PZmZzZXRcIjp7XCJsaW5lXCI6MSxcImNvbHVtblwiOjF9fTtcbiAgXG5cbiAgICB2YXIgbmFtZXMgPSB7fTtcbiAgICBmdW5jdGlvbiB1bmlxdWUoZGVmcykge1xuICAgICAgcmV0dXJuIGRlZnMuZmlsdGVyKFxuICAgICAgICBmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBpZiAoZGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGRlZi5uYW1lLnZhbHVlXG4gICAgICAgICAgaWYgKG5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgXG5cbiAgICAvLyBDb2xsZWN0IGFueSBmcmFnbWVudC90eXBlIHJlZmVyZW5jZXMgZnJvbSBhIG5vZGUsIGFkZGluZyB0aGVtIHRvIHRoZSByZWZzIFNldFxuICAgIGZ1bmN0aW9uIGNvbGxlY3RGcmFnbWVudFJlZmVyZW5jZXMobm9kZSwgcmVmcykge1xuICAgICAgaWYgKG5vZGUua2luZCA9PT0gXCJGcmFnbWVudFNwcmVhZFwiKSB7XG4gICAgICAgIHJlZnMuYWRkKG5vZGUubmFtZS52YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUua2luZCA9PT0gXCJWYXJpYWJsZURlZmluaXRpb25cIikge1xuICAgICAgICB2YXIgdHlwZSA9IG5vZGUudHlwZTtcbiAgICAgICAgaWYgKHR5cGUua2luZCA9PT0gXCJOYW1lZFR5cGVcIikge1xuICAgICAgICAgIHJlZnMuYWRkKHR5cGUubmFtZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUuc2VsZWN0aW9uU2V0KSB7XG4gICAgICAgIG5vZGUuc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKHNlbGVjdGlvbiwgcmVmcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS52YXJpYWJsZURlZmluaXRpb25zKSB7XG4gICAgICAgIG5vZGUudmFyaWFibGVEZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICAgIGNvbGxlY3RGcmFnbWVudFJlZmVyZW5jZXMoZGVmLCByZWZzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmRlZmluaXRpb25zKSB7XG4gICAgICAgIG5vZGUuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbihkZWYpIHtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKGRlZiwgcmVmcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWZpbml0aW9uUmVmcyA9IHt9O1xuICAgIChmdW5jdGlvbiBleHRyYWN0UmVmZXJlbmNlcygpIHtcbiAgICAgIGRvYy5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuICAgICAgICBpZiAoZGVmLm5hbWUpIHtcbiAgICAgICAgICB2YXIgcmVmcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBjb2xsZWN0RnJhZ21lbnRSZWZlcmVuY2VzKGRlZiwgcmVmcyk7XG4gICAgICAgICAgZGVmaW5pdGlvblJlZnNbZGVmLm5hbWUudmFsdWVdID0gcmVmcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGZpbmRPcGVyYXRpb24oZG9jLCBuYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvYy5kZWZpbml0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvYy5kZWZpbml0aW9uc1tpXTtcbiAgICAgICAgaWYgKGVsZW1lbnQubmFtZSAmJiBlbGVtZW50Lm5hbWUudmFsdWUgPT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25lUXVlcnkoZG9jLCBvcGVyYXRpb25OYW1lKSB7XG4gICAgICAvLyBDb3B5IHRoZSBEb2N1bWVudE5vZGUsIGJ1dCBjbGVhciBvdXQgdGhlIGRlZmluaXRpb25zXG4gICAgICB2YXIgbmV3RG9jID0ge1xuICAgICAgICBraW5kOiBkb2Mua2luZCxcbiAgICAgICAgZGVmaW5pdGlvbnM6IFtmaW5kT3BlcmF0aW9uKGRvYywgb3BlcmF0aW9uTmFtZSldXG4gICAgICB9O1xuICAgICAgaWYgKGRvYy5oYXNPd25Qcm9wZXJ0eShcImxvY1wiKSkge1xuICAgICAgICBuZXdEb2MubG9jID0gZG9jLmxvYztcbiAgICAgIH1cblxuICAgICAgLy8gTm93LCBmb3IgdGhlIG9wZXJhdGlvbiB3ZSdyZSBydW5uaW5nLCBmaW5kIGFueSBmcmFnbWVudHMgcmVmZXJlbmNlZCBieVxuICAgICAgLy8gaXQgb3IgdGhlIGZyYWdtZW50cyBpdCByZWZlcmVuY2VzXG4gICAgICB2YXIgb3BSZWZzID0gZGVmaW5pdGlvblJlZnNbb3BlcmF0aW9uTmFtZV0gfHwgbmV3IFNldCgpO1xuICAgICAgdmFyIGFsbFJlZnMgPSBuZXcgU2V0KCk7XG4gICAgICB2YXIgbmV3UmVmcyA9IG5ldyBTZXQoKTtcblxuICAgICAgLy8gSUUgMTEgZG9lc24ndCBzdXBwb3J0IFwibmV3IFNldChpdGVyYWJsZSlcIiwgc28gd2UgYWRkIHRoZSBtZW1iZXJzIG9mIG9wUmVmcyB0byBuZXdSZWZzIG9uZSBieSBvbmVcbiAgICAgIG9wUmVmcy5mb3JFYWNoKGZ1bmN0aW9uKHJlZk5hbWUpIHtcbiAgICAgICAgbmV3UmVmcy5hZGQocmVmTmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgd2hpbGUgKG5ld1JlZnMuc2l6ZSA+IDApIHtcbiAgICAgICAgdmFyIHByZXZSZWZzID0gbmV3UmVmcztcbiAgICAgICAgbmV3UmVmcyA9IG5ldyBTZXQoKTtcblxuICAgICAgICBwcmV2UmVmcy5mb3JFYWNoKGZ1bmN0aW9uKHJlZk5hbWUpIHtcbiAgICAgICAgICBpZiAoIWFsbFJlZnMuaGFzKHJlZk5hbWUpKSB7XG4gICAgICAgICAgICBhbGxSZWZzLmFkZChyZWZOYW1lKTtcbiAgICAgICAgICAgIHZhciBjaGlsZFJlZnMgPSBkZWZpbml0aW9uUmVmc1tyZWZOYW1lXSB8fCBuZXcgU2V0KCk7XG4gICAgICAgICAgICBjaGlsZFJlZnMuZm9yRWFjaChmdW5jdGlvbihjaGlsZFJlZikge1xuICAgICAgICAgICAgICBuZXdSZWZzLmFkZChjaGlsZFJlZik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBhbGxSZWZzLmZvckVhY2goZnVuY3Rpb24ocmVmTmFtZSkge1xuICAgICAgICB2YXIgb3AgPSBmaW5kT3BlcmF0aW9uKGRvYywgcmVmTmFtZSk7XG4gICAgICAgIGlmIChvcCkge1xuICAgICAgICAgIG5ld0RvYy5kZWZpbml0aW9ucy5wdXNoKG9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBuZXdEb2M7XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2M7XG4gICAgXG4gICAgICAgIG1vZHVsZS5leHBvcnRzW1wiaW50bFwiXSA9IG9uZVF1ZXJ5KGRvYywgXCJpbnRsXCIpO1xuICAgICAgICBcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgSW50bFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtaW50bCc7XG5cbmltcG9ydCB7XG4gIFNFVF9MT0NBTEVfU1RBUlQsXG4gIFNFVF9MT0NBTEVfU1VDQ0VTUyxcbiAgU0VUX0xPQ0FMRV9FUlJPUixcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuaW1wb3J0IHF1ZXJ5SW50bCBmcm9tICcuL2ludGwuZ3JhcGhxbCc7XG5cbmZ1bmN0aW9uIGdldEludGxGcm9tU3RhdGUoc3RhdGUpIHtcbiAgY29uc3QgaW50bCA9IChzdGF0ZSAmJiBzdGF0ZS5pbnRsKSB8fCB7fTtcbiAgY29uc3QgeyBpbml0aWFsTm93LCBsb2NhbGUsIG1lc3NhZ2VzIH0gPSBpbnRsO1xuICBjb25zdCBsb2NhbGVNZXNzYWdlcyA9IChtZXNzYWdlcyAmJiBtZXNzYWdlc1tsb2NhbGVdKSB8fCB7fTtcbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgSW50bFByb3ZpZGVyKHtcbiAgICBpbml0aWFsTm93LFxuICAgIGxvY2FsZSxcbiAgICBtZXNzYWdlczogbG9jYWxlTWVzc2FnZXMsXG4gICAgZGVmYXVsdExvY2FsZTogJ2VuLVVTJyxcbiAgfSk7XG4gIHJldHVybiBwcm92aWRlci5nZXRDaGlsZENvbnRleHQoKS5pbnRsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW50bCgpIHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IGdldEludGxGcm9tU3RhdGUoZ2V0U3RhdGUoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2NhbGUoeyBsb2NhbGUgfSkge1xuICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSwgeyBjbGllbnQsIGhpc3RvcnkgfSkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFNFVF9MT0NBTEVfU1RBUlQsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGxvY2FsZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gV0FSTklORyAhIVxuICAgICAgLy8gZG8gbm90IHVzZSBjbGllbnQubmV0d29ya0ludGVyZmFjZSBleGNlcHQgeW91IHdhbnQgc2tpcCBBcG9sbG8gc3RvcmVcbiAgICAgIC8vIHVzZSBjbGllbnQucXVlcnkgaWYgeW91IHdhbnQgYmVuZWZpdCBmcm9tIEFwb2xsbyBjYWNoaW5nIG1lY2hhbmlzbXNcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHtcbiAgICAgICAgcXVlcnk6IHF1ZXJ5SW50bCxcbiAgICAgICAgdmFyaWFibGVzOiB7IGxvY2FsZSB9LFxuICAgICAgfSk7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGRhdGEuaW50bC5yZWR1Y2UoKG1zZ3MsIG1zZykgPT4ge1xuICAgICAgICBtc2dzW21zZy5pZF0gPSBtc2cubWVzc2FnZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICByZXR1cm4gbXNncztcbiAgICAgIH0sIHt9KTtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogU0VUX0xPQ0FMRV9TVUNDRVNTLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIHJlbWVtYmVyIGxvY2FsZSBmb3IgZXZlcnkgbmV3IHJlcXVlc3RcbiAgICAgIGlmIChwcm9jZXNzLmVudi5CUk9XU0VSKSB7XG4gICAgICAgIGNvbnN0IG1heEFnZSA9IDM2NTAgKiAyNCAqIDM2MDA7IC8vIDEwIHllYXJzIGluIHNlY29uZHNcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYGxhbmc9JHtsb2NhbGV9O3BhdGg9LzttYXgtYWdlPSR7bWF4QWdlfWA7XG4gICAgICAgIGhpc3RvcnkucHVzaChgP2xhbmc9JHtsb2NhbGV9YCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJldHVybiBib3VuZCBpbnRsIGluc3RhbmNlIGF0IHRoZSBlbmRcbiAgICAgIHJldHVybiBnZXRJbnRsRnJvbVN0YXRlKGdldFN0YXRlKCkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6IFNFVF9MT0NBTEVfRVJST1IsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgZXJyb3IsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgU0VUX1JVTlRJTUVfVkFSSUFCTEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0UnVudGltZVZhcmlhYmxlKHsgbmFtZSwgdmFsdWUgfSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFNFVF9SVU5USU1FX1ZBUklBQkxFLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufVxuIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEludGxQcm92aWRlciB9IGZyb20gJ3JlYWN0LWludGwnO1xuaW1wb3J0IHsgUHJvdmlkZXIgYXMgUmVkdXhQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IEFwb2xsb1Byb3ZpZGVyIH0gZnJvbSAncmVhY3QtYXBvbGxvJztcblxuY29uc3QgQ29udGV4dFR5cGUgPSB7XG4gIC8vIEVuYWJsZXMgY3JpdGljYWwgcGF0aCBDU1MgcmVuZGVyaW5nXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlhc29mdC9pc29tb3JwaGljLXN0eWxlLWxvYWRlclxuICBpbnNlcnRDc3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIC8vIFVuaXZlcnNhbCBIVFRQIGNsaWVudFxuICBmZXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgcGF0aG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgcXVlcnk6IFByb3BUeXBlcy5vYmplY3QsXG4gIC8vIEludGVncmF0ZSBSZWR1eFxuICAvLyBodHRwOi8vcmVkdXguanMub3JnL2RvY3MvYmFzaWNzL1VzYWdlV2l0aFJlYWN0Lmh0bWxcbiAgLi4uUmVkdXhQcm92aWRlci5jaGlsZENvbnRleHRUeXBlcyxcbiAgLy8gQXBvbGxvIENsaWVudFxuICBjbGllbnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgLy8gUmVhY3RJbnRsXG4gIGludGw6IEludGxQcm92aWRlci5jaGlsZENvbnRleHRUeXBlcy5pbnRsLFxuICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG4vKipcbiAqIFRoZSB0b3AtbGV2ZWwgUmVhY3QgY29tcG9uZW50IHNldHRpbmcgY29udGV4dCAoZ2xvYmFsKSB2YXJpYWJsZXNcbiAqIHRoYXQgY2FuIGJlIGFjY2Vzc2VkIGZyb20gYWxsIHRoZSBjaGlsZCBjb21wb25lbnRzLlxuICpcbiAqIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvY29udGV4dC5odG1sXG4gKlxuICogVXNhZ2UgZXhhbXBsZTpcbiAqXG4gKiAgIGNvbnN0IGNvbnRleHQgPSB7XG4gKiAgICAgaGlzdG9yeTogY3JlYXRlQnJvd3Nlckhpc3RvcnkoKSxcbiAqICAgICBzdG9yZTogY3JlYXRlU3RvcmUoKSxcbiAqICAgfTtcbiAqXG4gKiAgIFJlYWN0RE9NLnJlbmRlcihcbiAqICAgICA8QXBwIGNvbnRleHQ9e2NvbnRleHR9PlxuICogICAgICAgPExheW91dD5cbiAqICAgICAgICAgPExhbmRpbmdQYWdlIC8+XG4gKiAgICAgICA8L0xheW91dD5cbiAqICAgICA8L0FwcD4sXG4gKiAgICAgY29udGFpbmVyLFxuICogICApO1xuICovXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb250ZXh0OiBQcm9wVHlwZXMuc2hhcGUoQ29udGV4dFR5cGUpLmlzUmVxdWlyZWQsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0gQ29udGV4dFR5cGU7XG5cbiAgZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNvbnRleHQ7XG4gIH1cblxuICAvLyBOT1RFOiBUaGlzIG1ldGhvZHMgYXJlIG5vdCBuZWVkZWQgaWYgeW91IHVwZGF0ZSBVUkwgYnkgc2V0TG9jYWxlIGFjdGlvbi5cbiAgLy9cbiAgLy8gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAvLyAgICBjb25zdCBzdG9yZSA9IHRoaXMucHJvcHMuY29udGV4dCAmJiB0aGlzLnByb3BzLmNvbnRleHQuc3RvcmU7XG4gIC8vICAgIGlmIChzdG9yZSkge1xuICAvLyAgICAgIHRoaXMubGFzdExvY2FsZSA9IHN0b3JlLmdldFN0YXRlKCkuaW50bC5sb2NhbGU7XG4gIC8vICAgICAgdGhpcy51bnN1YnNjcmliZSA9IHN0b3JlLnN1YnNjcmliZSgoKSA9PiB7XG4gIC8vICAgICAgICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG4gIC8vICAgICAgICBjb25zdCB7IG5ld0xvY2FsZSwgbG9jYWxlIH0gPSBzdGF0ZS5pbnRsO1xuICAvLyAgICAgICAgaWYgKCFuZXdMb2NhbGUgJiYgdGhpcy5sYXN0TG9jYWxlICE9PSBsb2NhbGUpIHtcbiAgLy8gICAgICAgICAgdGhpcy5sYXN0TG9jYWxlID0gbG9jYWxlO1xuICAvLyAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gIC8vICAgICAgICB9XG4gIC8vICAgICAgfSk7XG4gIC8vICAgIH1cbiAgLy8gIH1cbiAgLy9cbiAgLy8gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAvLyAgICBpZiAodGhpcy51bnN1YnNjcmliZSkge1xuICAvLyAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgLy8gICAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgLy8gICAgfVxuICAvLyAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBIZXJlLCB3ZSBhcmUgYXQgdW5pdmVyc2UgbGV2ZWwsIHN1cmU/IDstKVxuICAgIGNvbnN0IHsgY2xpZW50IH0gPSB0aGlzLnByb3BzLmNvbnRleHQ7XG4gICAgLy8gTk9URTogSWYgeW91IG5lZWQgdG8gYWRkIG9yIG1vZGlmeSBoZWFkZXIsIGZvb3RlciBldGMuIG9mIHRoZSBhcHAsXG4gICAgLy8gcGxlYXNlIGRvIHRoYXQgaW5zaWRlIHRoZSBMYXlvdXQgY29tcG9uZW50LlxuICAgIHJldHVybiAoXG4gICAgICA8QXBvbGxvUHJvdmlkZXIgY2xpZW50PXtjbGllbnR9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvQXBvbGxvUHJvdmlkZXI+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHNlcmlhbGl6ZSBmcm9tICdzZXJpYWxpemUtamF2YXNjcmlwdCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWRhbmdlciAqL1xuXG5jbGFzcyBIdG1sIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc3R5bGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGNzc1RleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgKSxcbiAgICBzY3JpcHRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQpLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9mb3JiaWQtcHJvcC10eXBlc1xuICAgIGFwcDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzdHlsZXM6IFtdLFxuICAgIHNjcmlwdHM6IFtdLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgc3R5bGVzLCBzY3JpcHRzLCBhcHAsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8aHRtbCBjbGFzc05hbWU9XCJuby1qc1wiIGxhbmc9e2FwcC5sYW5nfT5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgICAgICA8bWV0YSBodHRwRXF1aXY9XCJ4LXVhLWNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiIC8+XG4gICAgICAgICAgPHRpdGxlPnt0aXRsZX08L3RpdGxlPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9e2Rlc2NyaXB0aW9ufSAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiIC8+XG4gICAgICAgICAge3NjcmlwdHMubWFwKHNjcmlwdCA9PiAoXG4gICAgICAgICAgICA8bGluayBrZXk9e3NjcmlwdH0gcmVsPVwicHJlbG9hZFwiIGhyZWY9e3NjcmlwdH0gYXM9XCJzY3JpcHRcIiAvPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIDxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIi9zaXRlLndlYm1hbmlmZXN0XCIgLz5cbiAgICAgICAgICA8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgaHJlZj1cIi9pY29uLnBuZ1wiIC8+XG4gICAgICAgICAge3N0eWxlcy5tYXAoc3R5bGUgPT4gKFxuICAgICAgICAgICAgPHN0eWxlXG4gICAgICAgICAgICAgIGtleT17c3R5bGUuaWR9XG4gICAgICAgICAgICAgIGlkPXtzdHlsZS5pZH1cbiAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdHlsZS5jc3NUZXh0IH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5PlxuICAgICAgICAgIDxkaXYgaWQ9XCJhcHBcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGNoaWxkcmVuIH19IC8+XG4gICAgICAgICAgPHNjcmlwdFxuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBgd2luZG93LkFwcD0ke3NlcmlhbGl6ZShhcHApfWAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtzY3JpcHRzLm1hcChzY3JpcHQgPT4gKFxuICAgICAgICAgICAgPHNjcmlwdCBrZXk9e3NjcmlwdH0gc3JjPXtzY3JpcHR9IC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAge2NvbmZpZy5hbmFseXRpY3MuZ29vZ2xlVHJhY2tpbmdJZCAmJiAoXG4gICAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgICAgICAgICAgX19odG1sOlxuICAgICAgICAgICAgICAgICAgJ3dpbmRvdy5nYT1mdW5jdGlvbigpe2dhLnEucHVzaChhcmd1bWVudHMpfTtnYS5xPVtdO2dhLmw9K25ldyBEYXRlOycgK1xuICAgICAgICAgICAgICAgICAgYGdhKCdjcmVhdGUnLCcke2NvbmZpZy5hbmFseXRpY3MuZ29vZ2xlVHJhY2tpbmdJZH0nLCdhdXRvJyk7Z2EoJ3NlbmQnLCdwYWdldmlldycpYCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Y29uZmlnLmFuYWx5dGljcy5nb29nbGVUcmFja2luZ0lkICYmIChcbiAgICAgICAgICAgIDxzY3JpcHRcbiAgICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpzXCJcbiAgICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgICAgZGVmZXJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9ib2R5PlxuICAgICAgPC9odG1sPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHRtbDtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuQlJPV1NFUikge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ0RvIG5vdCBpbXBvcnQgYGNvbmZpZy5qc2AgZnJvbSBpbnNpZGUgdGhlIGNsaWVudC1zaWRlIGNvZGUuJyxcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGRlZmF1bHQgbG9jYWxlIGlzIHRoZSBmaXJzdCBvbmVcbiAgbG9jYWxlczogW1xuICAgIC8qIEBpbnRsLWNvZGUtdGVtcGxhdGUgJyR7bGFuZ30tJHtDT1VOVFJZfScsICovXG4gICAgJ2VuLVVTJyxcbiAgICAnY3MtQ1onLFxuICAgIC8qIEBpbnRsLWNvZGUtdGVtcGxhdGUtZW5kICovXG4gIF0sXG5cbiAgLy8gTm9kZS5qcyBhcHBcbiAgcG9ydDogcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwLFxuXG4gIC8vIGh0dHBzOi8vZXhwcmVzc2pzLmNvbS9lbi9ndWlkZS9iZWhpbmQtcHJveGllcy5odG1sXG4gIHRydXN0UHJveHk6IHByb2Nlc3MuZW52LlRSVVNUX1BST1hZIHx8ICdsb29wYmFjaycsXG5cbiAgLy8gQVBJIEdhdGV3YXlcbiAgYXBpOiB7XG4gICAgLy8gQVBJIFVSTCB0byBiZSB1c2VkIGluIHRoZSBjbGllbnQtc2lkZSBjb2RlXG4gICAgY2xpZW50VXJsOiBwcm9jZXNzLmVudi5BUElfQ0xJRU5UX1VSTCB8fCAnJyxcbiAgICAvLyBBUEkgVVJMIHRvIGJlIHVzZWQgaW4gdGhlIHNlcnZlci1zaWRlIGNvZGVcbiAgICBzZXJ2ZXJVcmw6XG4gICAgICBwcm9jZXNzLmVudi5BUElfU0VSVkVSX1VSTCB8fFxuICAgICAgYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDB9YCxcbiAgfSxcblxuICAvLyBEYXRhYmFzZVxuICBkYXRhYmFzZVVybDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMIHx8ICdzcWxpdGU6ZGF0YWJhc2Uuc3FsaXRlJyxcblxuICAvLyBXZWIgYW5hbHl0aWNzXG4gIGFuYWx5dGljczoge1xuICAgIC8vIGh0dHBzOi8vYW5hbHl0aWNzLmdvb2dsZS5jb20vXG4gICAgZ29vZ2xlVHJhY2tpbmdJZDogcHJvY2Vzcy5lbnYuR09PR0xFX1RSQUNLSU5HX0lELCAvLyBVQS1YWFhYWC1YXG4gIH0sXG5cbiAgLy8gQXV0aGVudGljYXRpb25cbiAgYXV0aDoge1xuICAgIGp3dDogeyBzZWNyZXQ6IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ1JlYWN0IFN0YXJ0ZXIgS2l0JyB9LFxuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9cbiAgICBmYWNlYm9vazoge1xuICAgICAgaWQ6IHByb2Nlc3MuZW52LkZBQ0VCT09LX0FQUF9JRCB8fCAnMTg2MjQ0NTUxNzQ1NjMxJyxcbiAgICAgIHNlY3JldDpcbiAgICAgICAgcHJvY2Vzcy5lbnYuRkFDRUJPT0tfQVBQX1NFQ1JFVCB8fCAnYTk3MGFlMzI0MGFiNGI5YjhhYWUwZjlmMDY2MWM2ZmMnLFxuICAgIH0sXG5cbiAgICAvLyBodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vY29uc29sZS9wcm9qZWN0XG4gICAgZ29vZ2xlOiB7XG4gICAgICBpZDpcbiAgICAgICAgcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCB8fFxuICAgICAgICAnMjUxNDEwNzMwNTUwLWFoY2cwb3U1bWdmaGw4aGx1aTF1cnJ1N2puNXMxMmttLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJyxcbiAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQgfHwgJ1k4eVI5eVpBaG05alE4RktBTDhRSUVjZCcsXG4gICAgfSxcblxuICAgIC8vIGh0dHBzOi8vYXBwcy50d2l0dGVyLmNvbS9cbiAgICB0d2l0dGVyOiB7XG4gICAgICBrZXk6IHByb2Nlc3MuZW52LlRXSVRURVJfQ09OU1VNRVJfS0VZIHx8ICdJZTIwQVp2TEpJMmxRRDVEc2d4Z2phdW5zJyxcbiAgICAgIHNlY3JldDpcbiAgICAgICAgcHJvY2Vzcy5lbnYuVFdJVFRFUl9DT05TVU1FUl9TRUNSRVQgfHxcbiAgICAgICAgJ0tUWjZjeG9LbkVha1FDZVNwWmxhVUNKV0dBbFRFQkpqMHkyRU1rVUJ1akE3eldTdmFRJyxcbiAgICB9LFxuICB9LFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IFNFVF9SVU5USU1FX1ZBUklBQkxFID0gJ1NFVF9SVU5USU1FX1ZBUklBQkxFJztcbmV4cG9ydCBjb25zdCBTRVRfTE9DQUxFX1NUQVJUID0gJ1NFVF9MT0NBTEVfU1RBUlQnO1xuZXhwb3J0IGNvbnN0IFNFVF9MT0NBTEVfU1VDQ0VTUyA9ICdTRVRfTE9DQUxFX1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IFNFVF9MT0NBTEVfRVJST1IgPSAnU0VUX0xPQ0FMRV9FUlJPUic7XG4iLCIvLyBAZmxvd1xuXG5pbXBvcnQgeyBBcG9sbG9DbGllbnQgfSBmcm9tICdhcG9sbG8tY2xpZW50JztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdhcG9sbG8tbGluayc7XG5pbXBvcnQgeyBvbkVycm9yIH0gZnJvbSAnYXBvbGxvLWxpbmstZXJyb3InO1xuaW1wb3J0IHsgU2NoZW1hTGluayB9IGZyb20gJ2Fwb2xsby1saW5rLXNjaGVtYSc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnLi9jcmVhdGVDYWNoZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUFwb2xsb0NsaWVudChzY2hlbWEpIHtcbiAgY29uc3QgbGluayA9IGZyb20oW1xuICAgIG9uRXJyb3IoKHsgZ3JhcGhRTEVycm9ycywgbmV0d29ya0Vycm9yIH0pID0+IHtcbiAgICAgIGlmIChncmFwaFFMRXJyb3JzKVxuICAgICAgICBncmFwaFFMRXJyb3JzLm1hcCgoeyBtZXNzYWdlLCBsb2NhdGlvbnMsIHBhdGggfSkgPT5cbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgW0dyYXBoUUwgZXJyb3JdOiBNZXNzYWdlOiAke21lc3NhZ2V9LCBMb2NhdGlvbjogJHtsb2NhdGlvbnN9LCBQYXRoOiAke3BhdGh9YCxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgaWYgKG5ldHdvcmtFcnJvcikgY29uc29sZS53YXJuKGBbTmV0d29yayBlcnJvcl06ICR7bmV0d29ya0Vycm9yfWApO1xuICAgIH0pLFxuICAgIG5ldyBTY2hlbWFMaW5rKHsgLi4uc2NoZW1hIH0pLFxuICBdKTtcblxuICByZXR1cm4gbmV3IEFwb2xsb0NsaWVudCh7XG4gICAgbGluayxcbiAgICBjYWNoZTogY3JlYXRlQ2FjaGUoKSxcbiAgICBzc3JNb2RlOiB0cnVlLFxuICAgIHF1ZXJ5RGVkdXBsaWNhdGlvbjogdHJ1ZSxcbiAgfSk7XG59XG4iLCIvLyBAZmxvd1xuXG5pbXBvcnQgeyBJbk1lbW9yeUNhY2hlLCBkZWZhdWx0RGF0YUlkRnJvbU9iamVjdCB9IGZyb20gJ2Fwb2xsby1jYWNoZS1pbm1lbW9yeSc7XG5cbmZ1bmN0aW9uIGRhdGFJZEZyb21PYmplY3Qob2JqKSB7XG4gIHN3aXRjaCAob2JqLl9fdHlwZW5hbWUpIHtcbiAgICBjYXNlICdJbnRsTWVzc2FnZSc6XG4gICAgICAvLyBEbyBub3QgdXNlIGlkIGFzIGlkZW50aWZpZXIgZm9yIG1lc3NhZ2UgYmVjYXVzZSBpdCdzIG5vdCB1bmlxdWUgYmV0d2VlbiBsYW5ndWFnZXNcbiAgICAgIC8vIGluc3RlYWQgaW5zdHJ1Y3QgY2FjaGUgdG8gYnVpbGQgcGF0aCBhbmQgaW5kZXggaWRlbnRpZmllciBmb3IgY2FjaGUga2V5XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICBjYXNlICdOZXdzSXRlbSc6XG4gICAgICByZXR1cm4gb2JqLmxpbmsgPyBgTmV3c0l0ZW06JHtvYmoubGlua31gIDogZGVmYXVsdERhdGFJZEZyb21PYmplY3Qob2JqKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGRlZmF1bHREYXRhSWRGcm9tT2JqZWN0KG9iaik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ2FjaGUoKSB7XG4gIC8vIGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvcmVhY3QvYmFzaWNzL2NhY2hpbmcuaHRtbCNjb25maWd1cmF0aW9uXG4gIHJldHVybiBuZXcgSW5NZW1vcnlDYWNoZSh7XG4gICAgZGF0YUlkRnJvbU9iamVjdCxcbiAgfSk7XG59XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8qIEBmbG93ICovXG5cbmltcG9ydCB0eXBlIHsgZ3JhcGhxbCBhcyBncmFwaHFUeXBlLCBHcmFwaFFMU2NoZW1hIH0gZnJvbSAnZ3JhcGhxbCc7XG5cbnR5cGUgRmV0Y2ggPSAodXJsOiBzdHJpbmcsIG9wdGlvbnM6ID9hbnkpID0+IFByb21pc2U8YW55PjtcblxudHlwZSBPcHRpb25zID0ge1xuICBiYXNlVXJsOiBzdHJpbmcsXG4gIGNvb2tpZT86IHN0cmluZyxcbiAgc2NoZW1hPzogR3JhcGhRTFNjaGVtYSxcbiAgZ3JhcGhxbD86IGdyYXBocVR5cGUsXG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGFyb3VuZCB0aGUgSFRNTDUgRmV0Y2ggQVBJIHRoYXQgcHJvdmlkZXNcbiAqIGRlZmF1bHQgYXJndW1lbnRzIHRvIGZldGNoKC4uLikgYW5kIGlzIGludGVuZGVkIHRvIHJlZHVjZSB0aGUgYW1vdW50XG4gKiBvZiBib2lsZXJwbGF0ZSBjb2RlIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2hcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmV0Y2goXG4gIGZldGNoOiBGZXRjaCxcbiAgeyBiYXNlVXJsLCBjb29raWUsIHNjaGVtYSwgZ3JhcGhxbCB9OiBPcHRpb25zLFxuKSB7XG4gIC8vIE5PVEU6IFR3ZWFrIHRoZSBkZWZhdWx0IG9wdGlvbnMgdG8gc3VpdGUgeW91ciBhcHBsaWNhdGlvbiBuZWVkc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBtZXRob2Q6ICdQT1NUJywgLy8gaGFuZHkgd2l0aCBHcmFwaFFMIGJhY2tlbmRzXG4gICAgbW9kZTogYmFzZVVybCA/ICdjb3JzJyA6ICdzYW1lLW9yaWdpbicsXG4gICAgY3JlZGVudGlhbHM6IGJhc2VVcmwgPyAnaW5jbHVkZScgOiAnc2FtZS1vcmlnaW4nLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIC4uLihjb29raWUgPyB7IENvb2tpZTogY29va2llIH0gOiBudWxsKSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBhc3luYyAodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkgPT4ge1xuICAgIGNvbnN0IGlzR3JhcGhRTCA9IHVybC5zdGFydHNXaXRoKCcvZ3JhcGhxbCcpO1xuICAgIGlmIChzY2hlbWEgJiYgZ3JhcGhxbCAmJiBpc0dyYXBoUUwpIHtcbiAgICAgIC8vIFdlJ3JlIFNTUiwgc28gcm91dGUgdGhlIGdyYXBocWwgaW50ZXJuYWwgdG8gYXZvaWQgbGF0ZW5jeVxuICAgICAgY29uc3QgcXVlcnkgPSBKU09OLnBhcnNlKG9wdGlvbnMuYm9keSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBncmFwaHFsKFxuICAgICAgICBzY2hlbWEsXG4gICAgICAgIHF1ZXJ5LnF1ZXJ5LFxuICAgICAgICB7IHJlcXVlc3Q6IHt9IH0sIC8vIGZpbGwgaW4gcmVxdWVzdCB2YXJzIG5lZWRlZCBieSBncmFwaHFsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHF1ZXJ5LnZhcmlhYmxlcyxcbiAgICAgICk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzOiByZXN1bHQuZXJyb3JzID8gNDAwIDogMjAwLFxuICAgICAgICBqc29uOiAoKSA9PiBQcm9taXNlLnJlc29sdmUocmVzdWx0KSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBpc0dyYXBoUUwgfHwgdXJsLnN0YXJ0c1dpdGgoJy9hcGknKVxuICAgICAgPyBmZXRjaChgJHtiYXNlVXJsfSR7dXJsfWAsIHtcbiAgICAgICAgICAuLi5kZWZhdWx0cyxcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRzLmhlYWRlcnMsXG4gICAgICAgICAgICAuLi4ob3B0aW9ucyAmJiBvcHRpb25zLmhlYWRlcnMpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICA6IGZldGNoKHVybCwgb3B0aW9ucyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZldGNoO1xuIiwiaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKiogKiBRdWVyaWVzICoqICovXG5pbXBvcnQge1xuICBzY2hlbWEgYXMgR2V0QWxsVXNlcnMsXG4gIHF1ZXJpZXMgYXMgR2V0QWxsVXNlcnNRdWVyaWVzLFxuICByZXNvbHZlcnMgYXMgR2V0QWxsVXNlcnNSZXNvbHZlcixcbn0gZnJvbSAnLi91c2Vycy9HZXRBbGxVc2Vycyc7XG5pbXBvcnQge1xuICBxdWVyaWVzIGFzIEdldExvZ2dlZEluVXNlclF1ZXJpZXMsXG4gIHJlc29sdmVycyBhcyBHZXRMb2dnZWRJblVzZXJSZXNvbHZlcixcbn0gZnJvbSAnLi91c2Vycy9HZXRMb2dnZWRJblVzZXInO1xuXG4vKiogKiBNdXRhdGlvbnMgKiogKi9cbmltcG9ydCB7XG4gIHNjaGVtYSBhcyBDcmVhdGVVc2VySW5wdXQsXG4gIG11dGF0aW9uIGFzIENyZWF0ZVVzZXIsXG4gIHJlc29sdmVycyBhcyBDcmVhdGVVc2VyUmVzb2x2ZXIsXG59IGZyb20gJy4vdXNlcnMvQ3JlYXRlVXNlcic7XG5cbmV4cG9ydCBjb25zdCBzY2hlbWEgPSBbLi4uR2V0QWxsVXNlcnMsIC4uLkNyZWF0ZVVzZXJJbnB1dF07XG5cbmV4cG9ydCBjb25zdCBxdWVyaWVzID0gWy4uLkdldEFsbFVzZXJzUXVlcmllcywgLi4uR2V0TG9nZ2VkSW5Vc2VyUXVlcmllc107XG5cbmV4cG9ydCBjb25zdCBtdXRhdGlvbnMgPSBbLi4uQ3JlYXRlVXNlcl07XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSBtZXJnZShcbiAgR2V0QWxsVXNlcnNSZXNvbHZlcixcbiAgR2V0TG9nZ2VkSW5Vc2VyUmVzb2x2ZXIsXG4gIENyZWF0ZVVzZXJSZXNvbHZlcixcbik7XG4iLCJpbXBvcnQgeyBVc2VyLCBVc2VyUHJvZmlsZSB9IGZyb20gJ2RhdGEvbW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IHNjaGVtYSA9IFtcbiAgYFxuICAjIFVzZXIgcHJvZmlsZSBkYXRhIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbCBkYXRhYmFzZSB1c2VyIGFjY291bnRcbiAgaW5wdXQgVXNlclByb2ZpbGUge1xuICAgICMgQSBkaXNwbGF5IG5hbWUgZm9yIHRoZSBsb2dnZWQtaW4gdXNlclxuICAgIGRpc3BsYXlOYW1lOiBTdHJpbmchXG5cbiAgICAjIEEgcHJvZmlsZSBwaWN0dXJlIFVSTFxuICAgIHBpY3R1cmU6IFN0cmluZ1xuXG4gICAgIyBUaGUgdXNlcidzIGdlbmRlclxuICAgIGdlbmRlcjogU3RyaW5nXG5cbiAgICAjIFRoZSB1c2VyJ3MgbG9jYXRpb25cbiAgICBsb2NhdGlvbjogU3RyaW5nXG5cbiAgICAjIEEgd2Vic2l0ZSBVUkxcbiAgICB3ZWJzaXRlOiBTdHJpbmdcbiAgfVxuYCxcbl07XG5cbmV4cG9ydCBjb25zdCBtdXRhdGlvbiA9IFtcbiAgYFxuICAjIENyZWF0ZXMgYSBuZXcgdXNlciBhbmQgcHJvZmlsZSBpbiB0aGUgbG9jYWwgZGF0YWJhc2VcbiAgZGF0YWJhc2VDcmVhdGVVc2VyKFxuICAgICMgVGhlIGVtYWlsIG9mIHRoZSBuZXcgdXNlciwgdGhpcyBlbWFpbCBtdXN0IGJlIHVuaXF1ZSBpbiB0aGUgZGF0YWJhc2VcbiAgICBlbWFpbDogU3RyaW5nIVxuXG4gICAgIyBVc2VyIHByb2ZpbGUgaW5mb3JtYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGxvY2FsIGRhdGFiYXNlIHVzZXIgYWNjb3VudFxuICAgIHByb2ZpbGU6IFVzZXJQcm9maWxlIVxuICApOiBEYXRhYmFzZVVzZXJcbmAsXG5dO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xuICBNdXRhdGlvbjoge1xuICAgIGFzeW5jIGRhdGFiYXNlQ3JlYXRlVXNlcihwYXJlbnQsIGFyZ3MpIHtcbiAgICAgIC8vIElmIHVzZXIgYWxyZWFkeSBleGlzdHMsIHRocm93IGVycm9yXG4gICAgICBjb25zdCBsb29rdXBVc2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGFyZ3MuZW1haWwgfSB9KTtcblxuICAgICAgaWYgKGxvb2t1cFVzZXIpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgICAgICAgdGhyb3cgJ1VzZXIgYWxyZWFkeSBleGlzdHMhJztcbiAgICAgIH1cblxuICAgICAgLy8gQ3JlYXRlIG5ldyB1c2VyIHdpdGggcHJvZmlsZSBpbiBkYXRhYmFzZVxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKFxuICAgICAgICB7XG4gICAgICAgICAgZW1haWw6IGFyZ3MuZW1haWwsXG4gICAgICAgICAgcHJvZmlsZToge1xuICAgICAgICAgICAgLi4uYXJncy5wcm9maWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogVXNlclByb2ZpbGUsIGFzOiAncHJvZmlsZScgfV0sXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdXNlcjtcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCB7IFVzZXIsIFVzZXJDbGFpbSwgVXNlckxvZ2luLCBVc2VyUHJvZmlsZSB9IGZyb20gJ2RhdGEvbW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IHNjaGVtYSA9IFtcbiAgYFxuICAjIEEgdXNlciBzdG9yZWQgaW4gdGhlIGxvY2FsIGRhdGFiYXNlXG4gIHR5cGUgRGF0YWJhc2VVc2VyIHtcbiAgICBpZDogU3RyaW5nXG4gICAgZW1haWw6IFN0cmluZ1xuICAgIGVtYWlsQ29uZmlybWVkOiBCb29sZWFuXG4gICAgbG9naW5zOiBbRGF0YWJhc2VVc2VyTG9naW5dXG4gICAgY2xhaW1zOiBbRGF0YWJhc2VVc2VyQ2xhaW1dXG4gICAgcHJvZmlsZTogRGF0YWJhc2VVc2VyUHJvZmlsZVxuICAgIHVwZGF0ZWRBdDogU3RyaW5nXG4gICAgY3JlYXRlZEF0OiBTdHJpbmdcbiAgfVxuXG4gIHR5cGUgRGF0YWJhc2VVc2VyTG9naW4ge1xuICAgIG5hbWU6IFN0cmluZ1xuICAgIGtleTogU3RyaW5nXG4gICAgY3JlYXRlZEF0OiBTdHJpbmdcbiAgICB1cGRhdGVkQXQ6IFN0cmluZ1xuICAgIHVzZXJJZDogU3RyaW5nXG4gIH1cblxuICB0eXBlIERhdGFiYXNlVXNlckNsYWltIHtcbiAgICBpZDogSW50XG4gICAgdHlwZTogU3RyaW5nXG4gICAgdmFsdWU6IFN0cmluZ1xuICAgIGNyZWF0ZWRBdDogU3RyaW5nXG4gICAgdXBkYXRlZEF0OiBTdHJpbmdcbiAgICB1c2VySWQ6IFN0cmluZ1xuICB9XG5cbiAgdHlwZSBEYXRhYmFzZVVzZXJQcm9maWxlIHtcbiAgICB1c2VySWQ6IFN0cmluZ1xuICAgIGRpc3BsYXlOYW1lOiBTdHJpbmdcbiAgICBwaWN0dXJlOiBTdHJpbmdcbiAgICBnZW5kZXI6IFN0cmluZ1xuICAgIGxvY2F0aW9uOiBTdHJpbmdcbiAgICB3ZWJzaXRlOiBTdHJpbmdcbiAgICBjcmVhdGVkQXQ6IFN0cmluZ1xuICAgIHVwZGF0ZWRBdDogU3RyaW5nXG4gIH1cbmAsXG5dO1xuXG5leHBvcnQgY29uc3QgcXVlcmllcyA9IFtcbiAgYFxuICAjIFJldHJpZXZlcyBhbGwgdXNlcnMgc3RvcmVkIGluIHRoZSBsb2NhbCBkYXRhYmFzZVxuICBkYXRhYmFzZUdldEFsbFVzZXJzOiBbRGF0YWJhc2VVc2VyXVxuXG4gICMgUmV0cmlldmVzIGEgc2luZ2xlIHVzZXIgZnJvbSB0aGUgbG9jYWwgZGF0YWJhc2VcbiAgZGF0YWJhc2VHZXRVc2VyKFxuICAgICMgVGhlIHVzZXIncyBlbWFpbCBhZGRyZXNzXG4gICAgZW1haWw6IFN0cmluZyFcbiAgKTogRGF0YWJhc2VVc2VyXG5gLFxuXTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcbiAgUm9vdFF1ZXJ5OiB7XG4gICAgYXN5bmMgZGF0YWJhc2VHZXRBbGxVc2VycygpIHtcbiAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlci5maW5kQWxsKHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHsgbW9kZWw6IFVzZXJMb2dpbiwgYXM6ICdsb2dpbnMnIH0sXG4gICAgICAgICAgeyBtb2RlbDogVXNlckNsYWltLCBhczogJ2NsYWltcycgfSxcbiAgICAgICAgICB7IG1vZGVsOiBVc2VyUHJvZmlsZSwgYXM6ICdwcm9maWxlJyB9LFxuICAgICAgICBdLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdXNlcnM7XG4gICAgfSxcbiAgICBhc3luYyBkYXRhYmFzZUdldFVzZXIocGFyZW50LCB7IGVtYWlsIH0pIHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBlbWFpbCB9LFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgeyBtb2RlbDogVXNlckxvZ2luLCBhczogJ2xvZ2lucycgfSxcbiAgICAgICAgICB7IG1vZGVsOiBVc2VyQ2xhaW0sIGFzOiAnY2xhaW1zJyB9LFxuICAgICAgICAgIHsgbW9kZWw6IFVzZXJQcm9maWxlLCBhczogJ3Byb2ZpbGUnIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB1c2VyO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgVXNlciwgVXNlckNsYWltLCBVc2VyTG9naW4sIFVzZXJQcm9maWxlIH0gZnJvbSAnZGF0YS9tb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgcXVlcmllcyA9IFtcbiAgYFxuICAjIFJldHJpZXZlcyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudGx5IGxvZ2dlZC1pbiB1c2VyXG4gIGRhdGFiYXNlR2V0TG9nZ2VkSW5Vc2VyOiBEYXRhYmFzZVVzZXJcbmAsXG5dO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xuICBSb290UXVlcnk6IHtcbiAgICBhc3luYyBkYXRhYmFzZUdldExvZ2dlZEluVXNlcihwYXJlbnQsIGFyZ3MsIGNvbnRleHQpIHtcbiAgICAgIC8vIFRocm93IGVycm9yIGlmIHVzZXIgaXMgbm90IGF1dGhlbnRpY2F0ZWRcbiAgICAgIGlmICghY29udGV4dC51c2VyKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIGxvZ2dlZCBpbiB1c2VyIGZyb20gZGF0YWJhc2VcbiAgICAgIGNvbnN0IGRiVXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjb250ZXh0LnVzZXIuZW1haWwgfSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHsgbW9kZWw6IFVzZXJMb2dpbiwgYXM6ICdsb2dpbnMnIH0sXG4gICAgICAgICAgeyBtb2RlbDogVXNlckNsYWltLCBhczogJ2NsYWltcycgfSxcbiAgICAgICAgICB7IG1vZGVsOiBVc2VyUHJvZmlsZSwgYXM6ICdwcm9maWxlJyB9LFxuICAgICAgICBdLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkYlVzZXI7XG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC0yMDE2IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgbG9jYWxlcyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBzY2hlbWEgPSBbXG4gIGBcbiAgdHlwZSBJbnRsTWVzc2FnZSB7XG4gICAgaWQ6IFN0cmluZyFcbiAgICBkZWZhdWx0TWVzc2FnZTogU3RyaW5nIVxuICAgIG1lc3NhZ2U6IFN0cmluZ1xuICAgIGRlc2NyaXB0aW9uOiBTdHJpbmdcbiAgICBmaWxlczogW1N0cmluZ11cbiAgfVxuYCxcbl07XG5cbmV4cG9ydCBjb25zdCBxdWVyaWVzID0gW1xuICBgXG4gICMgU3VwcG9ydGVkIGxvY2FsZXM6IFwiJHtsb2NhbGVzLmpvaW4oJ1wiLCBcIicpfVwiXG4gIGludGwobG9jYWxlOiBTdHJpbmchKTogW0ludGxNZXNzYWdlXVxuYCxcbl07XG5cbmNvbnN0IE1FU1NBR0VTX0RJUiA9IHByb2Nlc3MuZW52Lk1FU1NBR0VTX0RJUiB8fCBqb2luKF9fZGlybmFtZSwgJy4vbWVzc2FnZXMnKTtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XG4gIFJvb3RRdWVyeToge1xuICAgIGFzeW5jIGludGwocGFyZW50LCB7IGxvY2FsZSB9KSB7XG4gICAgICBpZiAoIWxvY2FsZXMuaW5jbHVkZXMobG9jYWxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsZSAnJHtsb2NhbGV9JyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBsb2NhbGVEYXRhO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9jYWxlRGF0YSA9IGF3YWl0IHJlYWRGaWxlKGpvaW4oTUVTU0FHRVNfRElSLCBgJHtsb2NhbGV9Lmpzb25gKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICcke2xvY2FsZX0nIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsZURhdGEpO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0IGZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xuXG5leHBvcnQgY29uc3Qgc2NoZW1hID0gW1xuICBgXG4gICMgQSBzaW5nbGUgbmV3cyBhcnRpY2xlIGZyb20gW2h0dHBzOi8vcmVhY3Rqc25ld3MuY29tL10oaHR0cHM6Ly9yZWFjdGpzbmV3cy5jb20vKVxuICB0eXBlIFJlYWN0SlNOZXdzSXRlbSB7XG4gICAgIyBUaGUgbmV3cyBpdGVtJ3MgdGl0bGVcbiAgICB0aXRsZTogU3RyaW5nXG5cbiAgICAjIEEgZGlyZWN0IGxpbmsgVVJMIHRvIHRoaXMgbmV3cyBpdGVtIG9uIHJlYWN0anNuZXdzLmNvbVxuICAgIGxpbms6IFN0cmluZ1xuXG4gICAgIyBUaGUgbmFtZSBvZiB0aGUgbmV3cyBpdGVtJ3MgYXV0aG9yXG4gICAgYXV0aG9yOiBTdHJpbmdcblxuICAgICMgVGhlIGRhdGUgdGhpcyBuZXdzIGl0ZW0gd2FzIHB1Ymxpc2hlZFxuICAgIHB1YkRhdGU6IFN0cmluZ1xuXG4gICAgIyBOZXdzIGFydGljbGUgaW4gSFRNTCBmb3JtYXRcbiAgICBjb250ZW50OiBTdHJpbmdcbiAgfVxuYCxcbl07XG5cbmV4cG9ydCBjb25zdCBxdWVyaWVzID0gW1xuICBgXG4gICMgUmV0cmlldmVzIHRoZSBsYXRlc3QgUmVhY3RKUyBOZXdzXG4gIHJlYWN0anNHZXRBbGxOZXdzOiBbUmVhY3RKU05ld3NJdGVtXVxuYCxcbl07XG5cbi8vIFJlYWN0LmpzIE5ld3MgRmVlZCAoUlNTKVxuY29uc3QgdXJsID1cbiAgJ2h0dHBzOi8vYXBpLnJzczJqc29uLmNvbS92MS9hcGkuanNvbicgK1xuICAnP3Jzc191cmw9aHR0cHMlM0ElMkYlMkZyZWFjdGpzbmV3cy5jb20lMkZmZWVkLnhtbCc7XG5cbmxldCBpdGVtcyA9IFtdO1xubGV0IGxhc3RGZXRjaFRhc2s7XG5sZXQgbGFzdEZldGNoVGltZSA9IG5ldyBEYXRlKDE5NzAsIDAsIDEpO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xuICBSb290UXVlcnk6IHtcbiAgICByZWFjdGpzR2V0QWxsTmV3cygpIHtcbiAgICAgIGlmIChsYXN0RmV0Y2hUYXNrKSB7XG4gICAgICAgIHJldHVybiBsYXN0RmV0Y2hUYXNrO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3IERhdGUoKSAtIGxhc3RGZXRjaFRpbWUgPiAxMDAwICogNjAgKiAxMCAvKiAxMCBtaW5zICovKSB7XG4gICAgICAgIGxhc3RGZXRjaFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsYXN0RmV0Y2hUYXNrID0gZmV0Y2godXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBpdGVtcyA9IGRhdGEuaXRlbXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxhc3RGZXRjaFRhc2sgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBsYXN0RmV0Y2hUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxhc3RGZXRjaFRhc2s7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpdGVtcztcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCB7IG1lcmdlIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqICogUXVlcmllcyAqKiAqL1xuaW1wb3J0IHtcbiAgc2NoZW1hIGFzIEdldEFsbFJlYWN0SlNOZXdzLFxuICBxdWVyaWVzIGFzIEdldEFsbFJlYWN0SlNOZXdzUXVlcmllcyxcbiAgcmVzb2x2ZXJzIGFzIEdldEFsbFJlYWN0SlNOZXdzUmVzb2x2ZXIsXG59IGZyb20gJy4vcmVhY3Rqc25ld3MuY29tL0dldEFsbFJlYWN0SlNOZXdzJztcblxuZXhwb3J0IGNvbnN0IHNjaGVtYSA9IFsuLi5HZXRBbGxSZWFjdEpTTmV3c107XG5cbmV4cG9ydCBjb25zdCBxdWVyaWVzID0gWy4uLkdldEFsbFJlYWN0SlNOZXdzUXVlcmllc107XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSBtZXJnZShHZXRBbGxSZWFjdEpTTmV3c1Jlc29sdmVyKTtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IERhdGFUeXBlIGZyb20gJ3NlcXVlbGl6ZSc7XG5pbXBvcnQgTW9kZWwgZnJvbSAnLi4vc2VxdWVsaXplJztcblxuY29uc3QgVXNlciA9IE1vZGVsLmRlZmluZShcbiAgJ1VzZXInLFxuICB7XG4gICAgaWQ6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlLlVVSUQsXG4gICAgICBkZWZhdWx0VmFsdWU6IERhdGFUeXBlLlVVSURWMSxcbiAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgfSxcblxuICAgIGVtYWlsOiB7XG4gICAgICB0eXBlOiBEYXRhVHlwZS5TVFJJTkcoMjU1KSxcbiAgICAgIHZhbGlkYXRlOiB7IGlzRW1haWw6IHRydWUgfSxcbiAgICB9LFxuXG4gICAgZW1haWxDb25maXJtZWQ6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlLkJPT0xFQU4sXG4gICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbmRleGVzOiBbeyBmaWVsZHM6IFsnZW1haWwnXSB9XSxcbiAgfSxcbik7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBEYXRhVHlwZSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IE1vZGVsIGZyb20gJy4uL3NlcXVlbGl6ZSc7XG5cbmNvbnN0IFVzZXJDbGFpbSA9IE1vZGVsLmRlZmluZSgnVXNlckNsYWltJywge1xuICB0eXBlOiB7XG4gICAgdHlwZTogRGF0YVR5cGUuU1RSSU5HLFxuICB9LFxuXG4gIHZhbHVlOiB7XG4gICAgdHlwZTogRGF0YVR5cGUuSU5URUdFUixcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyQ2xhaW07XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBEYXRhVHlwZSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IE1vZGVsIGZyb20gJy4uL3NlcXVlbGl6ZSc7XG5cbmNvbnN0IFVzZXJMb2dpbiA9IE1vZGVsLmRlZmluZSgnVXNlckxvZ2luJywge1xuICBuYW1lOiB7XG4gICAgdHlwZTogRGF0YVR5cGUuU1RSSU5HKDUwKSxcbiAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICB9LFxuXG4gIGtleToge1xuICAgIHR5cGU6IERhdGFUeXBlLlNUUklORygxMDApLFxuICAgIHByaW1hcnlLZXk6IHRydWUsXG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlckxvZ2luO1xuIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgRGF0YVR5cGUgZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBNb2RlbCBmcm9tICcuLi9zZXF1ZWxpemUnO1xuXG5jb25zdCBVc2VyUHJvZmlsZSA9IE1vZGVsLmRlZmluZSgnVXNlclByb2ZpbGUnLCB7XG4gIHVzZXJJZDoge1xuICAgIHR5cGU6IERhdGFUeXBlLlVVSUQsXG4gICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgfSxcblxuICBkaXNwbGF5TmFtZToge1xuICAgIHR5cGU6IERhdGFUeXBlLlNUUklORygxMDApLFxuICB9LFxuXG4gIHBpY3R1cmU6IHtcbiAgICB0eXBlOiBEYXRhVHlwZS5TVFJJTkcoMjU1KSxcbiAgfSxcblxuICBnZW5kZXI6IHtcbiAgICB0eXBlOiBEYXRhVHlwZS5TVFJJTkcoNTApLFxuICB9LFxuXG4gIGxvY2F0aW9uOiB7XG4gICAgdHlwZTogRGF0YVR5cGUuU1RSSU5HKDEwMCksXG4gIH0sXG5cbiAgd2Vic2l0ZToge1xuICAgIHR5cGU6IERhdGFUeXBlLlNUUklORygyNTUpLFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlO1xuIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgc2VxdWVsaXplIGZyb20gJy4uL3NlcXVlbGl6ZSc7XG5pbXBvcnQgVXNlciBmcm9tICcuL1VzZXInO1xuaW1wb3J0IFVzZXJMb2dpbiBmcm9tICcuL1VzZXJMb2dpbic7XG5pbXBvcnQgVXNlckNsYWltIGZyb20gJy4vVXNlckNsYWltJztcbmltcG9ydCBVc2VyUHJvZmlsZSBmcm9tICcuL1VzZXJQcm9maWxlJztcblxuVXNlci5oYXNNYW55KFVzZXJMb2dpbiwge1xuICBmb3JlaWduS2V5OiAndXNlcklkJyxcbiAgYXM6ICdsb2dpbnMnLFxuICBvblVwZGF0ZTogJ2Nhc2NhZGUnLFxuICBvbkRlbGV0ZTogJ2Nhc2NhZGUnLFxufSk7XG5cblVzZXIuaGFzTWFueShVc2VyQ2xhaW0sIHtcbiAgZm9yZWlnbktleTogJ3VzZXJJZCcsXG4gIGFzOiAnY2xhaW1zJyxcbiAgb25VcGRhdGU6ICdjYXNjYWRlJyxcbiAgb25EZWxldGU6ICdjYXNjYWRlJyxcbn0pO1xuXG5Vc2VyLmhhc09uZShVc2VyUHJvZmlsZSwge1xuICBmb3JlaWduS2V5OiAndXNlcklkJyxcbiAgYXM6ICdwcm9maWxlJyxcbiAgb25VcGRhdGU6ICdjYXNjYWRlJyxcbiAgb25EZWxldGU6ICdjYXNjYWRlJyxcbn0pO1xuXG5mdW5jdGlvbiBzeW5jKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIHNlcXVlbGl6ZS5zeW5jKC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IHN5bmMgfTtcbmV4cG9ydCB7IFVzZXIsIFVzZXJMb2dpbiwgVXNlckNsYWltLCBVc2VyUHJvZmlsZSB9O1xuIiwiaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgbWFrZUV4ZWN1dGFibGVTY2hlbWEgfSBmcm9tICdncmFwaHFsLXRvb2xzJztcblxuaW1wb3J0IHtcbiAgc2NoZW1hIGFzIE5ld3NTY2hlbWEsXG4gIHJlc29sdmVycyBhcyBOZXdzUmVzb2x2ZXJzLFxuICBxdWVyaWVzIGFzIE5ld3NRdWVyaWVzLFxufSBmcm9tICcuL2dyYXBocWwvTmV3cy9zY2hlbWEnO1xuXG5pbXBvcnQge1xuICBzY2hlbWEgYXMgRGF0YWJhc2VTY2hlbWEsXG4gIHJlc29sdmVycyBhcyBEYXRhYmFzZVJlc29sdmVycyxcbiAgbXV0YXRpb25zIGFzIERhdGFiYXNlTXV0YXRpb25zLFxuICBxdWVyaWVzIGFzIERhdGFiYXNlUXVlcmllcyxcbn0gZnJvbSAnLi9ncmFwaHFsL0RhdGFiYXNlL3NjaGVtYSc7XG5cbmltcG9ydCB7XG4gIHNjaGVtYSBhcyBJbnRsU2NoZW1hLFxuICByZXNvbHZlcnMgYXMgSW50bFJlc29sdmVycyxcbiAgcXVlcmllcyBhcyBJbnRsUXVlcmllcyxcbn0gZnJvbSAnLi9ncmFwaHFsL0ludGwvc2NoZW1hJztcblxuY29uc3QgUm9vdFF1ZXJ5ID0gW1xuICBgXG4gICMgIyBSZWFjdC1TdGFydGVyLUtpdCBRdWVyeWluZyBBUElcbiAgIyAjIyMgVGhpcyBHcmFwaFFMIHNjaGVtYSB3YXMgYnVpbHQgd2l0aCBbQXBvbGxvIEdyYXBoUUwtVG9vbHNdKGh0dHBzOi8vZ2l0aHViLmNvbS9hcG9sbG9ncmFwaHFsL2dyYXBocWwtdG9vbHMpXG4gICMgX0J1aWxkLCBtb2NrLCBhbmQgc3RpdGNoIGEgR3JhcGhRTCBzY2hlbWEgdXNpbmcgdGhlIHNjaGVtYSBsYW5ndWFnZV9cbiAgI1xuICAjICoqW1NjaGVtYSBMYW5ndWFnZSBDaGVldCBTaGVldF0oaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NvZ2tvL2dyYXBocWwtc2hvcnRoYW5kLW5vdGF0aW9uLWNoZWF0LXNoZWV0L21hc3Rlci9ncmFwaHFsLXNob3J0aGFuZC1ub3RhdGlvbi1jaGVhdC1zaGVldC5wbmcpKipcbiAgI1xuICAjIDEuIFVzZSB0aGUgR3JhcGhRTCBzY2hlbWEgbGFuZ3VhZ2UgdG8gW2dlbmVyYXRlIGEgc2NoZW1hXShodHRwczovL3d3dy5hcG9sbG9ncmFwaHFsLmNvbS9kb2NzL2dyYXBocWwtdG9vbHMvZ2VuZXJhdGUtc2NoZW1hLmh0bWwpIHdpdGggZnVsbCBzdXBwb3J0IGZvciByZXNvbHZlcnMsIGludGVyZmFjZXMsIHVuaW9ucywgYW5kIGN1c3RvbSBzY2FsYXJzLiBUaGUgc2NoZW1hIHByb2R1Y2VkIGlzIGNvbXBsZXRlbHkgY29tcGF0aWJsZSB3aXRoIFtHcmFwaFFMLmpzXShodHRwczovL2dpdGh1Yi5jb20vZ3JhcGhxbC9ncmFwaHFsLWpzKS5cbiAgIyAyLiBbTW9jayB5b3VyIEdyYXBoUUwgQVBJXShodHRwczovL3d3dy5hcG9sbG9ncmFwaHFsLmNvbS9kb2NzL2dyYXBocWwtdG9vbHMvbW9ja2luZy5odG1sKSB3aXRoIGZpbmUtZ3JhaW5lZCBwZXItdHlwZSBtb2NraW5nXG4gICMgMy4gQXV0b21hdGljYWxseSBbc3RpdGNoIG11bHRpcGxlIHNjaGVtYXMgdG9nZXRoZXJdKGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvZ3JhcGhxbC10b29scy9zY2hlbWEtc3RpdGNoaW5nLmh0bWwpIGludG8gb25lIGxhcmdlciBBUElcbiAgdHlwZSBSb290UXVlcnkge1xuICAgICR7TmV3c1F1ZXJpZXN9XG4gICAgJHtEYXRhYmFzZVF1ZXJpZXN9XG4gICAgJHtJbnRsUXVlcmllc31cbiAgfVxuYCxcbl07XG5cbmNvbnN0IE11dGF0aW9uID0gW1xuICBgXG4gICMgIyBSZWFjdC1TdGFydGVyLUtpdCBNdXRhdGluZyBBUElcbiAgIyAjIyMgVGhpcyBHcmFwaFFMIHNjaGVtYSB3YXMgYnVpbHQgd2l0aCBbQXBvbGxvIEdyYXBoUUwtVG9vbHNdKGh0dHBzOi8vZ2l0aHViLmNvbS9hcG9sbG9ncmFwaHFsL2dyYXBocWwtdG9vbHMpXG4gICMgX0J1aWxkLCBtb2NrLCBhbmQgc3RpdGNoIGEgR3JhcGhRTCBzY2hlbWEgdXNpbmcgdGhlIHNjaGVtYSBsYW5ndWFnZV9cbiAgI1xuICAjICoqW1NjaGVtYSBMYW5ndWFnZSBDaGVldCBTaGVldF0oaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3NvZ2tvL2dyYXBocWwtc2hvcnRoYW5kLW5vdGF0aW9uLWNoZWF0LXNoZWV0L21hc3Rlci9ncmFwaHFsLXNob3J0aGFuZC1ub3RhdGlvbi1jaGVhdC1zaGVldC5wbmcpKipcbiAgI1xuICAjIDEuIFVzZSB0aGUgR3JhcGhRTCBzY2hlbWEgbGFuZ3VhZ2UgdG8gW2dlbmVyYXRlIGEgc2NoZW1hXShodHRwczovL3d3dy5hcG9sbG9ncmFwaHFsLmNvbS9kb2NzL2dyYXBocWwtdG9vbHMvZ2VuZXJhdGUtc2NoZW1hLmh0bWwpIHdpdGggZnVsbCBzdXBwb3J0IGZvciByZXNvbHZlcnMsIGludGVyZmFjZXMsIHVuaW9ucywgYW5kIGN1c3RvbSBzY2FsYXJzLiBUaGUgc2NoZW1hIHByb2R1Y2VkIGlzIGNvbXBsZXRlbHkgY29tcGF0aWJsZSB3aXRoIFtHcmFwaFFMLmpzXShodHRwczovL2dpdGh1Yi5jb20vZ3JhcGhxbC9ncmFwaHFsLWpzKS5cbiAgIyAyLiBbTW9jayB5b3VyIEdyYXBoUUwgQVBJXShodHRwczovL3d3dy5hcG9sbG9ncmFwaHFsLmNvbS9kb2NzL2dyYXBocWwtdG9vbHMvbW9ja2luZy5odG1sKSB3aXRoIGZpbmUtZ3JhaW5lZCBwZXItdHlwZSBtb2NraW5nXG4gICMgMy4gQXV0b21hdGljYWxseSBbc3RpdGNoIG11bHRpcGxlIHNjaGVtYXMgdG9nZXRoZXJdKGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvZ3JhcGhxbC10b29scy9zY2hlbWEtc3RpdGNoaW5nLmh0bWwpIGludG8gb25lIGxhcmdlciBBUElcbiAgdHlwZSBNdXRhdGlvbiB7XG4gICAgJHtEYXRhYmFzZU11dGF0aW9uc31cbiAgfVxuYCxcbl07XG5cbmNvbnN0IFNjaGVtYURlZmluaXRpb24gPSBbXG4gIGBcbiAgc2NoZW1hIHtcbiAgICBxdWVyeTogUm9vdFF1ZXJ5XG4gICAgbXV0YXRpb246IE11dGF0aW9uXG4gIH1cbmAsXG5dO1xuXG4vLyBNZXJnZSBhbGwgb2YgdGhlIHJlc29sdmVyIG9iamVjdHMgdG9nZXRoZXJcbi8vIFB1dCBzY2hlbWEgdG9nZXRoZXIgaW50byBvbmUgYXJyYXkgb2Ygc2NoZW1hIHN0cmluZ3NcbmNvbnN0IHJlc29sdmVycyA9IG1lcmdlKE5ld3NSZXNvbHZlcnMsIERhdGFiYXNlUmVzb2x2ZXJzLCBJbnRsUmVzb2x2ZXJzKTtcblxuY29uc3Qgc2NoZW1hID0gW1xuICAuLi5TY2hlbWFEZWZpbml0aW9uLFxuICAuLi5Sb290UXVlcnksXG4gIC4uLk11dGF0aW9uLFxuXG4gIC4uLk5ld3NTY2hlbWEsXG4gIC4uLkRhdGFiYXNlU2NoZW1hLFxuICAuLi5JbnRsU2NoZW1hLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgbWFrZUV4ZWN1dGFibGVTY2hlbWEoe1xuICB0eXBlRGVmczogc2NoZW1hLFxuICByZXNvbHZlcnMsXG4gIC4uLihfX0RFVl9fID8geyBsb2c6IGUgPT4gY29uc29sZS5lcnJvcihlLnN0YWNrKSB9IDoge30pLFxufSk7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBTZXF1ZWxpemUgZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShjb25maWcuZGF0YWJhc2VVcmwsIHtcbiAgZGVmaW5lOiB7XG4gICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNlcXVlbGl6ZTtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLyoqXG4gKiBQYXNzcG9ydC5qcyByZWZlcmVuY2UgaW1wbGVtZW50YXRpb24uXG4gKiBUaGUgZGF0YWJhc2Ugc2NoZW1hIHVzZWQgaW4gdGhpcyBzYW1wbGUgaXMgYXZhaWxhYmxlIGF0XG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWVtYmVyc2hpcC9tZW1iZXJzaGlwLmRiL3RyZWUvbWFzdGVyL3Bvc3RncmVzXG4gKi9cblxuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJ3Bhc3Nwb3J0JztcbmltcG9ydCB7IFN0cmF0ZWd5IGFzIEZhY2Vib29rU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1mYWNlYm9vayc7XG5pbXBvcnQgeyBVc2VyLCBVc2VyTG9naW4sIFVzZXJDbGFpbSwgVXNlclByb2ZpbGUgfSBmcm9tICcuL2RhdGEvbW9kZWxzJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG4vKipcbiAqIFNpZ24gaW4gd2l0aCBGYWNlYm9vay5cbiAqL1xucGFzc3BvcnQudXNlKFxuICBuZXcgRmFjZWJvb2tTdHJhdGVneShcbiAgICB7XG4gICAgICBjbGllbnRJRDogY29uZmlnLmF1dGguZmFjZWJvb2suaWQsXG4gICAgICBjbGllbnRTZWNyZXQ6IGNvbmZpZy5hdXRoLmZhY2Vib29rLnNlY3JldCxcbiAgICAgIGNhbGxiYWNrVVJMOiAnL2xvZ2luL2ZhY2Vib29rL3JldHVybicsXG4gICAgICBwcm9maWxlRmllbGRzOiBbXG4gICAgICAgICdkaXNwbGF5TmFtZScsXG4gICAgICAgICduYW1lJyxcbiAgICAgICAgJ2VtYWlsJyxcbiAgICAgICAgJ2xpbmsnLFxuICAgICAgICAnbG9jYWxlJyxcbiAgICAgICAgJ3RpbWV6b25lJyxcbiAgICAgIF0sXG4gICAgICBwYXNzUmVxVG9DYWxsYmFjazogdHJ1ZSxcbiAgICB9LFxuICAgIChyZXEsIGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4sIHByb2ZpbGUsIGRvbmUpID0+IHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG4gICAgICBjb25zdCBsb2dpbk5hbWUgPSAnZmFjZWJvb2snO1xuICAgICAgY29uc3QgY2xhaW1UeXBlID0gJ3VybjpmYWNlYm9vazphY2Nlc3NfdG9rZW4nO1xuICAgICAgY29uc3QgZm9vQmFyID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAocmVxLnVzZXIpIHtcbiAgICAgICAgICBjb25zdCB1c2VyTG9naW4gPSBhd2FpdCBVc2VyTG9naW4uZmluZE9uZSh7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbJ25hbWUnLCAna2V5J10sXG4gICAgICAgICAgICB3aGVyZTogeyBuYW1lOiBsb2dpbk5hbWUsIGtleTogcHJvZmlsZS5pZCB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh1c2VyTG9naW4pIHtcbiAgICAgICAgICAgIC8vIFRoZXJlIGlzIGFscmVhZHkgYSBGYWNlYm9vayBhY2NvdW50IHRoYXQgYmVsb25ncyB0byB5b3UuXG4gICAgICAgICAgICAvLyBTaWduIGluIHdpdGggdGhhdCBhY2NvdW50IG9yIGRlbGV0ZSBpdCwgdGhlbiBsaW5rIGl0IHdpdGggeW91ciBjdXJyZW50IGFjY291bnQuXG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiByZXEudXNlci5pZCxcbiAgICAgICAgICAgICAgICBlbWFpbDogcHJvZmlsZS5fanNvbi5lbWFpbCxcbiAgICAgICAgICAgICAgICBsb2dpbnM6IFt7IG5hbWU6IGxvZ2luTmFtZSwga2V5OiBwcm9maWxlLmlkIH1dLFxuICAgICAgICAgICAgICAgIGNsYWltczogW3sgdHlwZTogY2xhaW1UeXBlLCB2YWx1ZTogcHJvZmlsZS5pZCB9XSxcbiAgICAgICAgICAgICAgICBwcm9maWxlOiB7XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogcHJvZmlsZS5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICAgIGdlbmRlcjogcHJvZmlsZS5fanNvbi5nZW5kZXIsXG4gICAgICAgICAgICAgICAgICBwaWN0dXJlOiBgaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vJHtwcm9maWxlLmlkfS9waWN0dXJlP3R5cGU9bGFyZ2VgLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgICB7IG1vZGVsOiBVc2VyTG9naW4sIGFzOiAnbG9naW5zJyB9LFxuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogVXNlckNsYWltLCBhczogJ2NsYWltcycgfSxcbiAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IFVzZXJQcm9maWxlLCBhczogJ3Byb2ZpbGUnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkb25lKG51bGwsIHtcbiAgICAgICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlci5maW5kQWxsKHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFsnaWQnLCAnZW1haWwnXSxcbiAgICAgICAgICAgIHdoZXJlOiB7ICckbG9naW5zLm5hbWUkJzogbG9naW5OYW1lLCAnJGxvZ2lucy5rZXkkJzogcHJvZmlsZS5pZCB9LFxuICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogWyduYW1lJywgJ2tleSddLFxuICAgICAgICAgICAgICAgIG1vZGVsOiBVc2VyTG9naW4sXG4gICAgICAgICAgICAgICAgYXM6ICdsb2dpbnMnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gdXNlcnNbMF0uZ2V0KHsgcGxhaW46IHRydWUgfSk7XG4gICAgICAgICAgICBkb25lKG51bGwsIHVzZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBwcm9maWxlLl9qc29uLmVtYWlsIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgIC8vIFRoZXJlIGlzIGFscmVhZHkgYW4gYWNjb3VudCB1c2luZyB0aGlzIGVtYWlsIGFkZHJlc3MuIFNpZ24gaW4gdG9cbiAgICAgICAgICAgICAgLy8gdGhhdCBhY2NvdW50IGFuZCBsaW5rIGl0IHdpdGggRmFjZWJvb2sgbWFudWFsbHkgZnJvbSBBY2NvdW50IFNldHRpbmdzLlxuICAgICAgICAgICAgICBkb25lKG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGVtYWlsOiBwcm9maWxlLl9qc29uLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgZW1haWxDb25maXJtZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICBsb2dpbnM6IFt7IG5hbWU6IGxvZ2luTmFtZSwga2V5OiBwcm9maWxlLmlkIH1dLFxuICAgICAgICAgICAgICAgICAgY2xhaW1zOiBbeyB0eXBlOiBjbGFpbVR5cGUsIHZhbHVlOiBhY2Nlc3NUb2tlbiB9XSxcbiAgICAgICAgICAgICAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHByb2ZpbGUuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGdlbmRlcjogcHJvZmlsZS5fanNvbi5nZW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIHBpY3R1cmU6IGBodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8ke3Byb2ZpbGUuaWR9L3BpY3R1cmU/dHlwZT1sYXJnZWAsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICAgICB7IG1vZGVsOiBVc2VyTG9naW4sIGFzOiAnbG9naW5zJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG1vZGVsOiBVc2VyQ2xhaW0sIGFzOiAnY2xhaW1zJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG1vZGVsOiBVc2VyUHJvZmlsZSwgYXM6ICdwcm9maWxlJyB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBkb25lKG51bGwsIHtcbiAgICAgICAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmb29CYXIoKS5jYXRjaChkb25lKTtcbiAgICB9LFxuICApLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgcGFzc3BvcnQ7XG4iLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXInO1xuaW1wb3J0IHJ1bnRpbWUgZnJvbSAnLi9ydW50aW1lJztcbmltcG9ydCBpbnRsIGZyb20gJy4vaW50bCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIHVzZXIsXG4gIHJ1bnRpbWUsXG4gIGludGwsXG59KTtcbiIsImltcG9ydCB7XG4gIFNFVF9MT0NBTEVfU1RBUlQsXG4gIFNFVF9MT0NBTEVfU1VDQ0VTUyxcbiAgU0VUX0xPQ0FMRV9FUlJPUixcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW50bChzdGF0ZSA9IG51bGwsIGFjdGlvbikge1xuICBpZiAoc3RhdGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5pdGlhbE5vdzogRGF0ZS5ub3coKSxcbiAgICB9O1xuICB9XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgU0VUX0xPQ0FMRV9TVEFSVDoge1xuICAgICAgY29uc3QgbG9jYWxlID0gc3RhdGVbYWN0aW9uLnBheWxvYWQubG9jYWxlXVxuICAgICAgICA/IGFjdGlvbi5wYXlsb2FkLmxvY2FsZVxuICAgICAgICA6IHN0YXRlLmxvY2FsZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsb2NhbGUsXG4gICAgICAgIG5ld0xvY2FsZTogYWN0aW9uLnBheWxvYWQubG9jYWxlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjYXNlIFNFVF9MT0NBTEVfU1VDQ0VTUzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxvY2FsZTogYWN0aW9uLnBheWxvYWQubG9jYWxlLFxuICAgICAgICBuZXdMb2NhbGU6IG51bGwsXG4gICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgLi4uc3RhdGUubWVzc2FnZXMsXG4gICAgICAgICAgW2FjdGlvbi5wYXlsb2FkLmxvY2FsZV06IGFjdGlvbi5wYXlsb2FkLm1lc3NhZ2VzLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjYXNlIFNFVF9MT0NBTEVfRVJST1I6IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBuZXdMb2NhbGU6IG51bGwsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFNFVF9SVU5USU1FX1ZBUklBQkxFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVudGltZShzdGF0ZSA9IHt9LCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgU0VUX1JVTlRJTUVfVkFSSUFCTEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW2FjdGlvbi5wYXlsb2FkLm5hbWVdOiBhY3Rpb24ucGF5bG9hZC52YWx1ZSxcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlcihzdGF0ZSA9IHt9LCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFVuaXZlcnNhbFJvdXRlciBmcm9tICd1bml2ZXJzYWwtcm91dGVyJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgVW5pdmVyc2FsUm91dGVyKHJvdXRlcywge1xuICByZXNvbHZlUm91dGUoY29udGV4dCwgcGFyYW1zKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0LnJvdXRlLmxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LnJvdXRlXG4gICAgICAgIC5sb2FkKClcbiAgICAgICAgLnRoZW4oYWN0aW9uID0+IGFjdGlvbi5kZWZhdWx0KGNvbnRleHQsIHBhcmFtcykpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbnRleHQucm91dGUuYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gY29udGV4dC5yb3V0ZS5hY3Rpb24oY29udGV4dCwgcGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSxcbn0pO1xuIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi9FcnJvclBhZ2UuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuL0Vycm9yUGFnZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi9FcnJvclBhZ2UuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gICIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL0Vycm9yUGFnZS5jc3MnO1xuXG5jbGFzcyBFcnJvclBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGVycm9yOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgc3RhY2s6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGVycm9yOiBudWxsLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoX19ERVZfXyAmJiB0aGlzLnByb3BzLmVycm9yKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT57dGhpcy5wcm9wcy5lcnJvci5uYW1lfTwvaDE+XG4gICAgICAgICAgPHByZT57dGhpcy5wcm9wcy5lcnJvci5zdGFja308L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+RXJyb3I8L2gxPlxuICAgICAgICA8cD5Tb3JyeSwgYSBjcml0aWNhbCBlcnJvciBvY2N1cnJlZCBvbiB0aGlzIHBhZ2UuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgeyBFcnJvclBhZ2UgYXMgRXJyb3JQYWdlV2l0aG91dFN0eWxlIH07XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEVycm9yUGFnZSk7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJy4vRXJyb3JQYWdlJztcblxuZnVuY3Rpb24gYWN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHRpdGxlOiAnRGVtbyBFcnJvcicsXG4gICAgY29tcG9uZW50OiA8RXJyb3JQYWdlIC8+LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIGdsb2JhbC1yZXF1aXJlICovXG5cbi8vIFRoZSB0b3AtbGV2ZWwgKHBhcmVudCkgcm91dGVcbmNvbnN0IHJvdXRlcyA9IHtcbiAgcGF0aDogJycsXG5cbiAgLy8gS2VlcCBpbiBtaW5kLCByb3V0ZXMgYXJlIGV2YWx1YXRlZCBpbiBvcmRlclxuICBjaGlsZHJlbjogW1xuICAgIHtcbiAgICAgIHBhdGg6ICcnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdob21lJyAqLyAnLi9ob21lJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL2NvbnRhY3QnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdjb250YWN0JyAqLyAnLi9jb250YWN0JyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL2xvZ2luJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnbG9naW4nICovICcuL2xvZ2luJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL3JlZ2lzdGVyJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAncmVnaXN0ZXInICovICcuL3JlZ2lzdGVyJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL2Fib3V0JyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnYWJvdXQnICovICcuL2Fib3V0JyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL3ByaXZhY3knLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdwcml2YWN5JyAqLyAnLi9wcml2YWN5JyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL2FkbWluJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnYWRtaW4nICovICcuL2FkbWluJyksXG4gICAgfSxcblxuICAgIC8vIFdpbGRjYXJkIHJvdXRlcywgZS5nLiB7IHBhdGg6ICcoLiopJywgLi4uIH0gKG11c3QgZ28gbGFzdClcbiAgICB7XG4gICAgICBwYXRoOiAnKC4qKScsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ25vdC1mb3VuZCcgKi8gJy4vbm90LWZvdW5kJyksXG4gICAgfSxcbiAgXSxcblxuICBhc3luYyBhY3Rpb24oeyBuZXh0IH0pIHtcbiAgICAvLyBFeGVjdXRlIGVhY2ggY2hpbGQgcm91dGUgdW50aWwgb25lIG9mIHRoZW0gcmV0dXJuIHRoZSByZXN1bHRcbiAgICBjb25zdCByb3V0ZSA9IGF3YWl0IG5leHQoKTtcblxuICAgIC8vIFByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIHRpdGxlLCBkZXNjcmlwdGlvbiBldGMuXG4gICAgcm91dGUudGl0bGUgPSBgJHtyb3V0ZS50aXRsZSB8fCAnVW50aXRsZWQgUGFnZSd9IC0gd3d3LnJlYWN0c3RhcnRlcmtpdC5jb21gO1xuICAgIHJvdXRlLmRlc2NyaXB0aW9uID0gcm91dGUuZGVzY3JpcHRpb24gfHwgJyc7XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH0sXG59O1xuXG4vLyBUaGUgZXJyb3IgcGFnZSBpcyBhdmFpbGFibGUgYnkgcGVybWFuZW50IHVybCBmb3IgZGV2ZWxvcG1lbnQgbW9kZVxuaWYgKF9fREVWX18pIHtcbiAgcm91dGVzLmNoaWxkcmVuLnVuc2hpZnQoe1xuICAgIHBhdGg6ICcvZXJyb3InLFxuICAgIGFjdGlvbjogcmVxdWlyZSgnLi9lcnJvcicpLmRlZmF1bHQsXG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0IHJlcXVlc3RMYW5ndWFnZSBmcm9tICdleHByZXNzLXJlcXVlc3QtbGFuZ3VhZ2UnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IGV4cHJlc3NKd3QsIHsgVW5hdXRob3JpemVkRXJyb3IgYXMgSnd0NDAxRXJyb3IgfSBmcm9tICdleHByZXNzLWp3dCc7XG5pbXBvcnQgeyBncmFwaHFsIH0gZnJvbSAnZ3JhcGhxbCc7XG5pbXBvcnQgZXhwcmVzc0dyYXBoUUwgZnJvbSAnZXhwcmVzcy1ncmFwaHFsJztcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBub2RlRmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgZ2V0RGF0YUZyb21UcmVlIH0gZnJvbSAncmVhY3QtYXBvbGxvJztcbmltcG9ydCBQcmV0dHlFcnJvciBmcm9tICdwcmV0dHktZXJyb3InO1xuaW1wb3J0IHsgSW50bFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtaW50bCc7XG5cbmltcG9ydCAnLi9zZXJ2ZXJJbnRsUG9seWZpbGwnO1xuaW1wb3J0IGNyZWF0ZUFwb2xsb0NsaWVudCBmcm9tICcuL2NvcmUvY3JlYXRlQXBvbGxvQ2xpZW50JztcbmltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL0FwcCc7XG5pbXBvcnQgSHRtbCBmcm9tICcuL2NvbXBvbmVudHMvSHRtbCc7XG5pbXBvcnQgeyBFcnJvclBhZ2VXaXRob3V0U3R5bGUgfSBmcm9tICcuL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UnO1xuaW1wb3J0IGVycm9yUGFnZVN0eWxlIGZyb20gJy4vcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3MnO1xuaW1wb3J0IGNyZWF0ZUZldGNoIGZyb20gJy4vY3JlYXRlRmV0Y2gnO1xuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJy4vcGFzc3BvcnQnO1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL3JvdXRlcic7XG5pbXBvcnQgbW9kZWxzIGZyb20gJy4vZGF0YS9tb2RlbHMnO1xuaW1wb3J0IHNjaGVtYSBmcm9tICcuL2RhdGEvc2NoZW1hJztcbi8vIGltcG9ydCBhc3NldHMgZnJvbSAnLi9hc3NldC1tYW5pZmVzdC5qc29uJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tdW5yZXNvbHZlZFxuaW1wb3J0IGNodW5rcyBmcm9tICcuL2NodW5rLW1hbmlmZXN0Lmpzb24nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby11bnJlc29sdmVkXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9zdG9yZS9jb25maWd1cmVTdG9yZSc7XG5pbXBvcnQgeyBzZXRSdW50aW1lVmFyaWFibGUgfSBmcm9tICcuL2FjdGlvbnMvcnVudGltZSc7XG5pbXBvcnQgeyBzZXRMb2NhbGUgfSBmcm9tICcuL2FjdGlvbnMvaW50bCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKHJlYXNvbiwgcCkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgUmVqZWN0aW9uIGF0OicsIHAsICdyZWFzb246JywgcmVhc29uKTtcbiAgLy8gc2VuZCBlbnRpcmUgYXBwIGRvd24uIFByb2Nlc3MgbWFuYWdlciB3aWxsIHJlc3RhcnQgaXRcbiAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG5cbi8vXG4vLyBUZWxsIGFueSBDU1MgdG9vbGluZyAoc3VjaCBhcyBNYXRlcmlhbCBVSSkgdG8gdXNlIGFsbCB2ZW5kb3IgcHJlZml4ZXMgaWYgdGhlXG4vLyB1c2VyIGFnZW50IGlzIG5vdCBrbm93bi5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5nbG9iYWwubmF2aWdhdG9yID0gZ2xvYmFsLm5hdmlnYXRvciB8fCB7fTtcbmdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50ID0gZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQgfHwgJ2FsbCc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuLy9cbi8vIElmIHlvdSBhcmUgdXNpbmcgcHJveHkgZnJvbSBleHRlcm5hbCBtYWNoaW5lLCB5b3UgY2FuIHNldCBUUlVTVF9QUk9YWSBlbnZcbi8vIERlZmF1bHQgaXMgdG8gdHJ1c3QgcHJveHkgaGVhZGVycyBvbmx5IGZyb20gbG9vcGJhY2sgaW50ZXJmYWNlLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmFwcC5zZXQoJ3RydXN0IHByb3h5JywgY29uZmlnLnRydXN0UHJveHkpO1xuXG4vL1xuLy8gUmVnaXN0ZXIgTm9kZS5qcyBtaWRkbGV3YXJlXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJykpKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuYXBwLnVzZShcbiAgcmVxdWVzdExhbmd1YWdlKHtcbiAgICBsYW5ndWFnZXM6IGNvbmZpZy5sb2NhbGVzLFxuICAgIHF1ZXJ5TmFtZTogJ2xhbmcnLFxuICAgIGNvb2tpZToge1xuICAgICAgbmFtZTogJ2xhbmcnLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBwYXRoOiAnLycsXG4gICAgICAgIG1heEFnZTogMzY1MCAqIDI0ICogMzYwMCAqIDEwMDAsIC8vIDEwIHllYXJzIGluIG1pbGlzZWNvbmRzXG4gICAgICB9LFxuICAgICAgdXJsOiAnL2xhbmcve2xhbmd1YWdlfScsXG4gICAgfSxcbiAgfSksXG4pO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuLy9cbi8vIEF1dGhlbnRpY2F0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwLnVzZShcbiAgZXhwcmVzc0p3dCh7XG4gICAgc2VjcmV0OiBjb25maWcuYXV0aC5qd3Quc2VjcmV0LFxuICAgIGNyZWRlbnRpYWxzUmVxdWlyZWQ6IGZhbHNlLFxuICAgIGdldFRva2VuOiByZXEgPT4gcmVxLmNvb2tpZXMuaWRfdG9rZW4sXG4gIH0pLFxuKTtcbi8vIEVycm9yIGhhbmRsZXIgZm9yIGV4cHJlc3Mtand0XG5hcHAudXNlKChlcnIsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgaWYgKGVyciBpbnN0YW5jZW9mIEp3dDQwMUVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignW2V4cHJlc3Mtand0LWVycm9yXScsIHJlcS5jb29raWVzLmlkX3Rva2VuKTtcbiAgICAvLyBgY2xlYXJDb29raWVgLCBvdGhlcndpc2UgdXNlciBjYW4ndCB1c2Ugd2ViLWFwcCB1bnRpbCBjb29raWUgZXhwaXJlc1xuICAgIHJlcy5jbGVhckNvb2tpZSgnaWRfdG9rZW4nKTtcbiAgfVxuICBuZXh0KGVycik7XG59KTtcblxuYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xuXG5hcHAuZ2V0KFxuICAnL2xvZ2luL2ZhY2Vib29rJyxcbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdmYWNlYm9vaycsIHtcbiAgICBzY29wZTogWydlbWFpbCcsICd1c2VyX2xvY2F0aW9uJ10sXG4gICAgc2Vzc2lvbjogZmFsc2UsXG4gIH0pLFxuKTtcbmFwcC5nZXQoXG4gICcvbG9naW4vZmFjZWJvb2svcmV0dXJuJyxcbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdmYWNlYm9vaycsIHtcbiAgICBmYWlsdXJlUmVkaXJlY3Q6ICcvbG9naW4nLFxuICAgIHNlc3Npb246IGZhbHNlLFxuICB9KSxcbiAgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZXhwaXJlc0luID0gNjAgKiA2MCAqIDI0ICogMTgwOyAvLyAxODAgZGF5c1xuICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24ocmVxLnVzZXIsIGNvbmZpZy5hdXRoLmp3dC5zZWNyZXQsIHsgZXhwaXJlc0luIH0pO1xuICAgIHJlcy5jb29raWUoJ2lkX3Rva2VuJywgdG9rZW4sIHsgbWF4QWdlOiAxMDAwICogZXhwaXJlc0luLCBodHRwT25seTogdHJ1ZSB9KTtcbiAgICByZXMucmVkaXJlY3QoJy8nKTtcbiAgfSxcbik7XG5cbi8vXG4vLyBSZWdpc3RlciBBUEkgbWlkZGxld2FyZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmFwaHFsL2V4cHJlc3MtZ3JhcGhxbCNvcHRpb25zXG5jb25zdCBncmFwaHFsTWlkZGxld2FyZSA9IGV4cHJlc3NHcmFwaFFMKHJlcSA9PiAoe1xuICBzY2hlbWEsXG4gIGdyYXBoaXFsOiBfX0RFVl9fLFxuICByb290VmFsdWU6IHsgcmVxdWVzdDogcmVxIH0sXG4gIHByZXR0eTogX19ERVZfXyxcbn0pKTtcblxuYXBwLnVzZSgnL2dyYXBocWwnLCBncmFwaHFsTWlkZGxld2FyZSk7XG5cbi8vXG4vLyBSZWdpc3RlciBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgbWlkZGxld2FyZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmFwcC5nZXQoJyonLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjc3MgPSBuZXcgU2V0KCk7XG5cbiAgICAvLyBFbmFibGVzIGNyaXRpY2FsIHBhdGggQ1NTIHJlbmRlcmluZ1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlhc29mdC9pc29tb3JwaGljLXN0eWxlLWxvYWRlclxuICAgIGNvbnN0IGluc2VydENzcyA9ICguLi5zdHlsZXMpID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4gY3NzLmFkZChzdHlsZS5fZ2V0Q3NzKCkpKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYXBvbGxvQ2xpZW50ID0gY3JlYXRlQXBvbGxvQ2xpZW50KHtcbiAgICAgIHNjaGVtYSxcbiAgICAgIHJvb3RWYWx1ZTogeyByZXF1ZXN0OiByZXEgfSxcbiAgICB9KTtcblxuICAgIC8vIFVuaXZlcnNhbCBIVFRQIGNsaWVudFxuICAgIGNvbnN0IGZldGNoID0gY3JlYXRlRmV0Y2gobm9kZUZldGNoLCB7XG4gICAgICBiYXNlVXJsOiBjb25maWcuYXBpLnNlcnZlclVybCxcbiAgICAgIGNvb2tpZTogcmVxLmhlYWRlcnMuY29va2llLFxuICAgICAgYXBvbGxvQ2xpZW50LFxuICAgICAgc2NoZW1hLFxuICAgICAgZ3JhcGhxbCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgIHVzZXI6IHJlcS51c2VyIHx8IG51bGwsXG4gICAgfTtcblxuICAgIGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoaW5pdGlhbFN0YXRlLCB7XG4gICAgICBjb29raWU6IHJlcS5oZWFkZXJzLmNvb2tpZSxcbiAgICAgIGFwb2xsb0NsaWVudCxcbiAgICAgIGZldGNoLFxuICAgICAgLy8gSSBzaG91bGQgbm90IHVzZSBgaGlzdG9yeWAgb24gc2VydmVyLi4gYnV0IGhvdyBJIGRvIHJlZGlyZWN0aW9uPyBmb2xsb3cgdW5pdmVyc2FsLXJvdXRlclxuICAgICAgaGlzdG9yeTogbnVsbCxcbiAgICB9KTtcblxuICAgIHN0b3JlLmRpc3BhdGNoKFxuICAgICAgc2V0UnVudGltZVZhcmlhYmxlKHtcbiAgICAgICAgbmFtZTogJ2luaXRpYWxOb3cnLFxuICAgICAgICB2YWx1ZTogRGF0ZS5ub3coKSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBzdG9yZS5kaXNwYXRjaChcbiAgICAgIHNldFJ1bnRpbWVWYXJpYWJsZSh7XG4gICAgICAgIG5hbWU6ICdhdmFpbGFibGVMb2NhbGVzJyxcbiAgICAgICAgdmFsdWU6IGNvbmZpZy5sb2NhbGVzLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IGxvY2FsZSA9IHJlcS5sYW5ndWFnZTtcbiAgICBjb25zdCBpbnRsID0gYXdhaXQgc3RvcmUuZGlzcGF0Y2goXG4gICAgICBzZXRMb2NhbGUoe1xuICAgICAgICBsb2NhbGUsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgLy8gR2xvYmFsIChjb250ZXh0KSB2YXJpYWJsZXMgdGhhdCBjYW4gYmUgZWFzaWx5IGFjY2Vzc2VkIGZyb20gYW55IFJlYWN0IGNvbXBvbmVudFxuICAgIC8vIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvY29udGV4dC5odG1sXG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgIGluc2VydENzcyxcbiAgICAgIGZldGNoLFxuICAgICAgLy8gVGhlIHR3aW5zIGJlbG93IGFyZSB3aWxkLCBiZSBjYXJlZnVsIVxuICAgICAgcGF0aG5hbWU6IHJlcS5wYXRoLFxuICAgICAgcXVlcnk6IHJlcS5xdWVyeSxcbiAgICAgIC8vIFlvdSBjYW4gYWNjZXNzIHJlZHV4IHRocm91Z2ggcmVhY3QtcmVkdXggY29ubmVjdFxuICAgICAgc3RvcmUsXG4gICAgICBzdG9yZVN1YnNjcmlwdGlvbjogbnVsbCxcbiAgICAgIC8vIEFwb2xsbyBDbGllbnQgZm9yIHVzZSB3aXRoIHJlYWN0LWFwb2xsb1xuICAgICAgY2xpZW50OiBhcG9sbG9DbGllbnQsXG4gICAgICAvLyBpbnRsIGluc3RhbmNlIGFzIGl0IGNhbiBiZSBnZXQgd2l0aCBpbmplY3RJbnRsXG4gICAgICBpbnRsLFxuICAgICAgbG9jYWxlLFxuICAgIH07XG5cbiAgICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlci5yZXNvbHZlKGNvbnRleHQpO1xuXG4gICAgaWYgKHJvdXRlLnJlZGlyZWN0KSB7XG4gICAgICByZXMucmVkaXJlY3Qocm91dGUuc3RhdHVzIHx8IDMwMiwgcm91dGUucmVkaXJlY3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSB7IC4uLnJvdXRlIH07XG4gICAgY29uc3Qgcm9vdENvbXBvbmVudCA9IDxBcHAgY29udGV4dD17Y29udGV4dH0+e3JvdXRlLmNvbXBvbmVudH08L0FwcD47XG4gICAgYXdhaXQgZ2V0RGF0YUZyb21UcmVlKHJvb3RDb21wb25lbnQpO1xuICAgIC8vIHRoaXMgaXMgaGVyZSBiZWNhdXNlIG9mIEFwb2xsbyByZWR1eCBBUE9MTE9fUVVFUllfU1RPUCBhY3Rpb25cbiAgICBhd2FpdCBQcm9taXNlLmRlbGF5KDApO1xuICAgIGRhdGEuY2hpbGRyZW4gPSBhd2FpdCBSZWFjdERPTS5yZW5kZXJUb1N0cmluZyhyb290Q29tcG9uZW50KTtcbiAgICBkYXRhLnN0eWxlcyA9IFt7IGlkOiAnY3NzJywgY3NzVGV4dDogWy4uLmNzc10uam9pbignJykgfV07XG5cbiAgICBjb25zdCBzY3JpcHRzID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGFkZENodW5rID0gY2h1bmsgPT4ge1xuICAgICAgaWYgKGNodW5rc1tjaHVua10pIHtcbiAgICAgICAgY2h1bmtzW2NodW5rXS5mb3JFYWNoKGFzc2V0ID0+IHNjcmlwdHMuYWRkKGFzc2V0KSk7XG4gICAgICB9IGVsc2UgaWYgKF9fREVWX18pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaHVuayB3aXRoIG5hbWUgJyR7Y2h1bmt9JyBjYW5ub3QgYmUgZm91bmRgKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGFkZENodW5rKCdjbGllbnQnKTtcbiAgICBpZiAocm91dGUuY2h1bmspIGFkZENodW5rKHJvdXRlLmNodW5rKTtcbiAgICBpZiAocm91dGUuY2h1bmtzKSByb3V0ZS5jaHVua3MuZm9yRWFjaChhZGRDaHVuayk7XG4gICAgZGF0YS5zY3JpcHRzID0gQXJyYXkuZnJvbShzY3JpcHRzKTtcblxuICAgIC8vIEZ1cnRoZXJtb3JlIGludm9rZWQgYWN0aW9ucyB3aWxsIGJlIGlnbm9yZWQsIGNsaWVudCB3aWxsIG5vdCByZWNlaXZlIHRoZW0hXG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmxvZygnU2VyaWFsaXppbmcgc3RvcmUuLi4nKTtcbiAgICB9XG4gICAgZGF0YS5hcHAgPSB7XG4gICAgICBhcGlVcmw6IGNvbmZpZy5hcGkuY2xpZW50VXJsLFxuICAgICAgc3RhdGU6IGNvbnRleHQuc3RvcmUuZ2V0U3RhdGUoKSxcbiAgICAgIGxhbmc6IGxvY2FsZSxcbiAgICAgIGFwb2xsb1N0YXRlOiBjb250ZXh0LmNsaWVudC5leHRyYWN0KCksXG4gICAgfTtcblxuICAgIGNvbnN0IGh0bWwgPSBSZWFjdERPTS5yZW5kZXJUb1N0YXRpY01hcmt1cCg8SHRtbCB7Li4uZGF0YX0gLz4pO1xuICAgIHJlcy5zdGF0dXMocm91dGUuc3RhdHVzIHx8IDIwMCk7XG4gICAgcmVzLnNlbmQoYDwhZG9jdHlwZSBodG1sPiR7aHRtbH1gKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbmV4dChlcnIpO1xuICB9XG59KTtcblxuLy9cbi8vIEVycm9yIGhhbmRsaW5nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY29uc3QgcGUgPSBuZXcgUHJldHR5RXJyb3IoKTtcbnBlLnNraXBOb2RlRmlsZXMoKTtcbnBlLnNraXBQYWNrYWdlKCdleHByZXNzJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuYXBwLnVzZSgoZXJyLCByZXEsIHJlcywgbmV4dCkgPT4ge1xuICBjb25zdCBsb2NhbGUgPSByZXEubGFuZ3VhZ2U7XG4gIGNvbnNvbGUuZXJyb3IocGUucmVuZGVyKGVycikpO1xuICBjb25zdCBodG1sID0gUmVhY3RET00ucmVuZGVyVG9TdGF0aWNNYXJrdXAoXG4gICAgPEh0bWxcbiAgICAgIHRpdGxlPVwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCJcbiAgICAgIGRlc2NyaXB0aW9uPXtlcnIubWVzc2FnZX1cbiAgICAgIHN0eWxlcz17W3sgaWQ6ICdjc3MnLCBjc3NUZXh0OiBlcnJvclBhZ2VTdHlsZS5fZ2V0Q3NzKCkgfV19IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGVcbiAgICAgIGFwcD17eyBsYW5nOiBsb2NhbGUgfX1cbiAgICA+XG4gICAgICB7UmVhY3RET00ucmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxJbnRsUHJvdmlkZXIgbG9jYWxlPXtsb2NhbGV9PlxuICAgICAgICAgIDxFcnJvclBhZ2VXaXRob3V0U3R5bGUgZXJyb3I9e2Vycn0gLz5cbiAgICAgICAgPC9JbnRsUHJvdmlkZXI+LFxuICAgICAgKX1cbiAgICA8L0h0bWw+LFxuICApO1xuICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKTtcbiAgcmVzLnNlbmQoYDwhZG9jdHlwZSBodG1sPiR7aHRtbH1gKTtcbn0pO1xuXG4vL1xuLy8gTGF1bmNoIHRoZSBzZXJ2ZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5jb25zdCBwcm9taXNlID0gbW9kZWxzLnN5bmMoKS5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbmlmICghbW9kdWxlLmhvdCkge1xuICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgIGFwcC5saXN0ZW4oY29uZmlnLnBvcnQsICgpID0+IHtcbiAgICAgIGNvbnNvbGUuaW5mbyhgVGhlIHNlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtjb25maWcucG9ydH0vYCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vL1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmlmIChtb2R1bGUuaG90KSB7XG4gIGFwcC5ob3QgPSBtb2R1bGUuaG90O1xuICBtb2R1bGUuaG90LmFjY2VwdCgnLi9yb3V0ZXInKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIiwiaW1wb3J0IGFyZUludGxMb2NhbGVzU3VwcG9ydGVkIGZyb20gJ2ludGwtbG9jYWxlcy1zdXBwb3J0ZWQnO1xuXG5pbXBvcnQgeyBsb2NhbGVzIH0gZnJvbSAnLi9jb25maWcnO1xuXG5pZiAoZ2xvYmFsLkludGwpIHtcbiAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBidWlsdC1pbiBgSW50bGAgaGFzIHRoZSBsb2NhbGUgZGF0YSB3ZSBuZWVkLlxuICBpZiAoIWFyZUludGxMb2NhbGVzU3VwcG9ydGVkKGxvY2FsZXMpKSB7XG4gICAgLy8gYEludGxgIGV4aXN0cywgYnV0IGl0IGRvZXNuJ3QgaGF2ZSB0aGUgZGF0YSB3ZSBuZWVkLCBzbyBsb2FkIHRoZVxuICAgIC8vIHBvbHlmaWxsIGFuZCByZXBsYWNlIHRoZSBjb25zdHJ1Y3RvcnMgd2l0aCBuZWVkIHdpdGggdGhlIHBvbHlmaWxsJ3MuXG4gICAgY29uc3QgSW50bFBvbHlmaWxsID0gcmVxdWlyZSgnaW50bCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGdsb2JhbC1yZXF1aXJlXG5cbiAgICBJbnRsLk51bWJlckZvcm1hdCA9IEludGxQb2x5ZmlsbC5OdW1iZXJGb3JtYXQ7XG4gICAgSW50bC5EYXRlVGltZUZvcm1hdCA9IEludGxQb2x5ZmlsbC5EYXRlVGltZUZvcm1hdDtcbiAgfVxufSBlbHNlIHtcbiAgLy8gTm8gYEludGxgLCBzbyB1c2UgYW5kIGxvYWQgdGhlIHBvbHlmaWxsLlxuICBnbG9iYWwuSW50bCA9IHJlcXVpcmUoJ2ludGwnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQgeyBjb21wb3NlV2l0aERldlRvb2xzIH0gZnJvbSAncmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2RldmVsb3BtZW50T25seSc7XG5pbXBvcnQgeyBuYW1lLCB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCByb290UmVkdWNlciBmcm9tICcuLi9yZWR1Y2Vycyc7XG5pbXBvcnQgY3JlYXRlSGVscGVycyBmcm9tICcuL2NyZWF0ZUhlbHBlcnMnO1xuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSwgaGVscGVyc0NvbmZpZykge1xuICBjb25zdCBoZWxwZXJzID0gY3JlYXRlSGVscGVycyhoZWxwZXJzQ29uZmlnKTtcbiAgY29uc3QgbWlkZGxld2FyZSA9IFt0aHVuay53aXRoRXh0cmFBcmd1bWVudChoZWxwZXJzKV07XG5cbiAgbGV0IGVuaGFuY2VyO1xuXG4gIGlmIChfX0RFVl9fKSB7XG4gICAgbWlkZGxld2FyZS5wdXNoKGNyZWF0ZUxvZ2dlcigpKTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96YWxtb3hpc3VzL3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbiMxNC11c2luZy1pbi1wcm9kdWN0aW9uXG4gICAgY29uc3QgY29tcG9zZUVuaGFuY2VycyA9IGNvbXBvc2VXaXRoRGV2VG9vbHMoe1xuICAgICAgLy8gT3B0aW9uczogaHR0cHM6Ly9naXRodWIuY29tL3phbG1veGlzdXMvcmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uL2Jsb2IvbWFzdGVyL2RvY3MvQVBJL0FyZ3VtZW50cy5tZCNvcHRpb25zXG4gICAgICBuYW1lOiBgJHtuYW1lfUAke3ZlcnNpb259YCxcbiAgICB9KTtcblxuICAgIC8vIGh0dHBzOi8vcmVkdXguanMub3JnL2RvY3MvYXBpL2FwcGx5TWlkZGxld2FyZS5odG1sXG4gICAgZW5oYW5jZXIgPSBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKSk7XG4gIH0gZWxzZSB7XG4gICAgZW5oYW5jZXIgPSBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSk7XG4gIH1cblxuICAvLyBodHRwczovL3JlZHV4LmpzLm9yZy9kb2NzL2FwaS9jcmVhdGVTdG9yZS5odG1sXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocm9vdFJlZHVjZXIsIGluaXRpYWxTdGF0ZSwgZW5oYW5jZXIpO1xuXG4gIC8vIEhvdCByZWxvYWQgcmVkdWNlcnMgKHJlcXVpcmVzIFdlYnBhY2sgb3IgQnJvd3NlcmlmeSBITVIgdG8gYmUgZW5hYmxlZClcbiAgaWYgKF9fREVWX18gJiYgbW9kdWxlLmhvdCkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCcuLi9yZWR1Y2VycycsICgpID0+XG4gICAgICAvLyBEb24ndCBmb3JnZXQgdG8gcmVtb3ZlIGAoKWAgaWYgeW91IGNoYW5nZSByZWR1Y2VycyBiYWNrIHRvIG5vcm1hbCByb290UmVkdWNlci5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBnbG9iYWwtcmVxdWlyZVxuICAgICAgc3RvcmUucmVwbGFjZVJlZHVjZXIocmVxdWlyZSgnLi4vcmVkdWNlcnMnKS5kZWZhdWx0KCkpLFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gc3RvcmU7XG59XG4iLCJjb25zdCBncmFwaHFsUmVxdWVzdERlcHJlY2F0ZWRNZXNzYWdlID0gYFxcYGdyYXBocWxSZXF1ZXN0XFxgIGhhcyBiZWVuIGRlcHJlY2F0ZWQuXG5Zb3Ugc2hvdWxkIHVzZSBBcG9sbG86IFxcYGNsaWVudC5xdWVyeSh7IHF1ZXJ5LCB2YXJpYWJsZXMuLi59KVxcYCBvciBcXGBjbGllbnQubXV0YXRlKClcXGBcbkRvbid0IGZvcmdldCB0byBlbmNsb3NlIHlvdXIgcXVlcnkgdG8gZ3FsXFxg4oCmXFxgIHRhZyBvciBpbXBvcnQgKi5ncmFwaHFsIGZpbGUuXG5TZWUgZG9jcyBhdCBodHRwOi8vZGV2LmFwb2xsb2RhdGEuY29tL2NvcmUvYXBvbGxvLWNsaWVudC1hcGkuaHRtbCNBcG9sbG9DbGllbnRcXFxcLnF1ZXJ5YDtcblxuZnVuY3Rpb24gY3JlYXRlR3JhcGhxbFJlcXVlc3QoYXBvbGxvQ2xpZW50KSB7XG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiBncmFwaHFsUmVxdWVzdChxdWVyeU9yU3RyaW5nLCB2YXJpYWJsZXMpIHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZXJyb3IoZ3JhcGhxbFJlcXVlc3REZXByZWNhdGVkTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLy8gY29uc3QgeyBza2lwQ2FjaGUgfSA9IG9wdGlvbnM7XG4gICAgbGV0IHF1ZXJ5ID0gcXVlcnlPclN0cmluZztcbiAgICBpZiAodHlwZW9mIHF1ZXJ5T3JTdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBncWwgPSBhd2FpdCByZXF1aXJlLmVuc3VyZShcbiAgICAgICAgWydncmFwaHFsLXRhZyddLFxuICAgICAgICByZXF1aXJlID0+IHJlcXVpcmUoJ2dyYXBocWwtdGFnJyksXG4gICAgICAgICdncmFwaHFsLXRhZycsXG4gICAgICApO1xuICAgICAgcXVlcnkgPSBncWwoW3F1ZXJ5T3JTdHJpbmddKTtcbiAgICB9XG5cbiAgICBsZXQgaXNNdXRhdGlvbiA9IGZhbHNlO1xuICAgIGlmIChxdWVyeS5kZWZpbml0aW9ucykge1xuICAgICAgaXNNdXRhdGlvbiA9IHF1ZXJ5LmRlZmluaXRpb25zLnNvbWUoXG4gICAgICAgIGRlZmluaXRpb24gPT4gZGVmaW5pdGlvbiAmJiBkZWZpbml0aW9uLm9wZXJhdGlvbiA9PT0gJ211dGF0aW9uJyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChpc011dGF0aW9uKSB7XG4gICAgICByZXR1cm4gYXBvbGxvQ2xpZW50Lm11dGF0ZSh7IG11dGF0aW9uOiBxdWVyeSwgdmFyaWFibGVzIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYXBvbGxvQ2xpZW50LnF1ZXJ5KHsgcXVlcnksIHZhcmlhYmxlcyB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSGVscGVycyh7IGFwb2xsb0NsaWVudCwgZmV0Y2gsIGhpc3RvcnkgfSkge1xuICByZXR1cm4ge1xuICAgIGNsaWVudDogYXBvbGxvQ2xpZW50LFxuICAgIGhpc3RvcnksXG4gICAgZmV0Y2gsXG4gICAgLy8gQGRlcHJlY2F0ZWQoJ1VzZSBgY2xpZW50YCBpbnN0ZWFkJylcbiAgICBhcG9sbG9DbGllbnQsXG4gICAgLy8gQGRlcHJlY2F0ZWQoJ1VzZSBgY2xpZW50LnF1ZXJ5KClgIG9yIGBjbGllbnQubXV0YXRlKClgIGluc3RlYWQnKVxuICAgIGdyYXBocWxSZXF1ZXN0OiBjcmVhdGVHcmFwaHFsUmVxdWVzdChmZXRjaCksXG4gIH07XG59XG4iLCJpbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSAndXRpbCc7XG5cbmZ1bmN0aW9uIGluc3BlY3RPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiBpbnNwZWN0KG9iamVjdCwge1xuICAgIGNvbG9yczogdHJ1ZSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNpbmdsZUxpbmUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xufVxuXG5jb25zdCBhY3Rpb25Gb3JtYXR0ZXJzID0ge1xuICAvLyBUaGlzIGlzIHVzZWQgYXQgZmVhdHVyZS9hcG9sbG8gYnJhbmNoLCBidXQgaXQgY2FuIGhlbHAgeW91IHdoZW4gaW1wbGVtZW50aW5nIEFwb2xsb1xuICBBUE9MTE9fUVVFUllfSU5JVDogYSA9PlxuICAgIGBxdWVyeUlkOiR7YS5xdWVyeUlkfSB2YXJpYWJsZXM6JHtpbnNwZWN0T2JqZWN0KFxuICAgICAgYS52YXJpYWJsZXMsXG4gICAgKX1cXG4gICAke3NpbmdsZUxpbmUoYS5xdWVyeVN0cmluZyl9YCxcblxuICBBUE9MTE9fUVVFUllfUkVTVUxUOiBhID0+XG4gICAgYHF1ZXJ5SWQ6JHthLnF1ZXJ5SWR9XFxuICAgJHtzaW5nbGVMaW5lKGluc3BlY3RPYmplY3QoYS5yZXN1bHQpKX1gLFxuXG4gIEFQT0xMT19RVUVSWV9TVE9QOiBhID0+IGBxdWVyeUlkOiR7YS5xdWVyeUlkfWAsXG5cbiAgU0VUX0xPQ0FMRV9TVUNDRVNTOiBhID0+XG4gICAgYGxvY2FsZSAke2EucGF5bG9hZC5sb2NhbGV9OiAke1xuICAgICAgT2JqZWN0LmtleXMoYS5wYXlsb2FkLm1lc3NhZ2VzKS5sZW5ndGhcbiAgICB9IG1lc3NhZ2VzYCxcbn07XG5cbi8vIFNlcnZlciBzaWRlIHJlZHV4IGFjdGlvbiBsb2dnZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcigpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiBzdG9yZSA9PiBuZXh0ID0+IGFjdGlvbiA9PiB7XG4gICAgbGV0IGZvcm1hdHRlZFBheWxvYWQgPSAnJztcbiAgICBjb25zdCBhY3Rpb25Gb3JtYXR0ZXIgPSBhY3Rpb25Gb3JtYXR0ZXJzW2FjdGlvbi50eXBlXTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm9ybWF0dGVkUGF5bG9hZCA9IGFjdGlvbkZvcm1hdHRlcihhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uLnRvU3RyaW5nICE9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKSB7XG4gICAgICBmb3JtYXR0ZWRQYXlsb2FkID0gYWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uLnBheWxvYWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBmb3JtYXR0ZWRQYXlsb2FkID0gaW5zcGVjdE9iamVjdChhY3Rpb24ucGF5bG9hZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1hdHRlZFBheWxvYWQgPSBpbnNwZWN0T2JqZWN0KGFjdGlvbik7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coYCAqICR7YWN0aW9uLnR5cGV9OiAke2Zvcm1hdHRlZFBheWxvYWR9YCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gIH07XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYmFiZWwvcG9seWZpbGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLWNhY2hlLWlubWVtb3J5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1jbGllbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLWxpbmtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLWxpbmstZXJyb3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLWxpbmstc2NoZW1hXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWdyYXBocWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1yZXF1ZXN0LWxhbmd1YWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC10YWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC10b29sc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImludGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW50bC1sb2NhbGVzLXN1cHBvcnRlZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtZmFjZWJvb2tcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcmV0dHktZXJyb3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1hcG9sbG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1pbnRsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvbi9kZXZlbG9wbWVudE9ubHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtdGh1bmtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcmlhbGl6ZS1qYXZhc2NyaXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDLzBCQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekhBO0FBRUE7QUFFQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBQ0E7QUFRQSxxQkFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQWhEQTtBQUFBO0FBQUE7QUFBQTtBQWdEQTs7Ozs7Ozs7QUM5RUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZBO0FBa0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7QUFRQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUE3Q0E7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUZBO0FBQ0E7QUFGQTtBQUNBO0FBOENBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R0E7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFxQkE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFEQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVUE7QUFDQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQTtBQUNBO0FBeEVBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBWkE7QUFDQTtBQUZBO0FBaUJBO0FBQ0E7QUFGQTtBQUNBO0FBeURBOzs7Ozs7O0FDMUZBOzs7Ozs7Ozs7QUFTQTtBQUVBLGFBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUpBO0FBT0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUdBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBbkJBO0FBbkNBOzs7Ozs7OztBQ2pCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBUkE7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJBOzs7Ozs7Ozs7QUFzQkE7Ozs7OztBQU1BO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFBQTtBQVBBO0FBV0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBSUE7QUFIQTtBQVNBO0FBQ0E7QUE3QkE7QUFBQTtBQUFBO0FBQUE7QUE2QkE7QUFDQTtBQUNBOzs7Ozs7OztBQzNFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBS0E7QUFLQTtBQUNBO0FBQUE7QUFNQTtBQUVBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFzQkE7Ozs7Ozs7OztBQUFBO0FBYUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUtBO0FBdEJBO0FBdUJBO0FBQ0E7QUF6QkE7QUFEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBNENBOzs7Ozs7Ozs7QUFBQTtBQWFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUpBO0FBT0E7QUFSQTtBQVNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQVFBO0FBVEE7QUFVQTtBQUNBO0FBdEJBO0FBREE7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzREE7QUFFQTs7O0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQVNBO0FBaEJBO0FBaUJBO0FBQ0E7QUFuQkE7QUFEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFBQTtBQVlBO0FBRUE7O0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRBO0FBZUE7QUFDQTtBQWpCQTtBQURBOzs7Ozs7OztBQ3BDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQXNCQTs7O0FBQUE7QUFDQTtBQU9BO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaENBO0FBREE7Ozs7Ozs7O0FDeENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFNQTtBQUVBO0FBRUE7Ozs7Ozs7O0FDYkE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFaQTtBQWtCQTtBQUFBO0FBQUE7QUFEQTtBQUtBOzs7Ozs7OztBQ3BDQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFEQTtBQUxBO0FBVUE7Ozs7Ozs7O0FDdEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFGQTtBQU5BO0FBWUE7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBREE7QUF0QkE7QUEyQkE7Ozs7Ozs7O0FDdkNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTtBQUVBO0FBTUE7QUFPQTtBQU1BOzs7Ozs7Ozs7OztBQVlBO0FBQ0E7QUFDQTs7QUFkQTtBQW1CQTs7Ozs7Ozs7Ozs7QUFZQTs7QUFaQTtBQWlCQTs7Ozs7QUFBQTtBQVVBO0FBQ0E7QUFBQTtBQUVBO0FBVUE7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUFBOzs7Ozs7OztBQ3BGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7Ozs7Ozs7OztBQVNBOzs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7QUFaQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUxBO0FBWUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFKQTtBQVFBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUpBO0FBQ0E7QUFXQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFMQTtBQVlBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBSkE7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF6RkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQXlGQTtBQUNBO0FBSUE7Ozs7Ozs7O0FDMUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUZBO0FBSkE7QUFTQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQWpDQTtBQW1DQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRkE7QUFDQTtBQUdBO0FBQ0E7QUFQQTtBQVNBOzs7Ozs7OztBQ1pBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7Ozs7Ozs7O0FDTEE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFaQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBOUJBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFEQTtBQUNBO0FBRkE7QUFVQTtBQURBO0FBQ0E7QUFzQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkJBOzs7Ozs7Ozs7QUFTQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBLG9VQUFBO0FBRkE7QUFLQTtBQUNBLDZVQUFBO0FBRkE7QUFLQTtBQUNBLHVVQUFBO0FBRkE7QUFLQTtBQUNBLGdWQUFBO0FBRkE7QUFLQTtBQUNBLHVVQUFBO0FBRkE7QUFLQTtBQUNBLDZVQUFBO0FBRkE7QUFLQTtBQUNBLHVVQUFBO0FBRkE7QUFNQTtBQUNBO0FBQ0EsbVZBQUE7QUFGQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFSQTtBQVNBO0FBQ0E7QUFuREE7QUFDQTtBQXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RUE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSUE7QUFOQTtBQUhBO0FBYUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFHQTtBQUNBO0FBRkE7QUFLQTtBQUdBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBSkE7QUFPQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBUUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUVBO0FBQ0E7QUFGQTtBQU1BO0FBRUE7QUFDQTtBQUZBO0FBTUE7QUFDQTtBQUVBO0FBREE7QUFNQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM0hBO0FBQUE7QUFBQTtBQUFBO0FBNkhBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQUlBO0FBQUE7QUFBQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUEsYUFNQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaFVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDakJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUtBO0FBQ0EsV0FFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzFDQTs7O0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUE1QkE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBNEJBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7Ozs7Ozs7O0FDOUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFHQTtBQUVBO0FBWkE7QUFDQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7OztBIiwic291cmNlUm9vdCI6IiJ9