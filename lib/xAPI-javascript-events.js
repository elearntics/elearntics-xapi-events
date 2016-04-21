/*! https://github.com/jsonizer v0.1.0 by elenatorro | MIT license */

;(function (factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    // AMD is used - Register as an anonymous module.
    define(['underscore', 'semver'], factory)
  } else if (typeof exports === 'object') {
    factory(require('underscore'), require('semver'))
  } else {
    // Neither AMD nor CommonJS used. Use global variables.
    if (typeof _ === 'undefined') {
      throw 'jsonizer requires "underscore.js" to be loaded first'
    }
    if (typeof semver === 'undefined') {
      throw 'jsonizer requires "semver" to be loaded first'
    }
    factory(_, semver)
  }
})(function (_, semver) {
  if (!_) {
    throw new Error('jsonizer requires "underscore.js" to be loaded first');
  }

  var jsonizer = {}
  var set = {
    version: {
      new: function(version, structure) {
        structure = structure || {
          "date" : new Date().toISOString(),
          "description" : "New structure"
        }
        if (jsonizer.validate.version(structure)) {
          version = version || "major"
          jsonizer.set.semver(version)
          jsonizer.set.version.structure(semver.inc(jsonizer.config.structure.version, version), structure)
          return true
        }
        return false
      },
      structure: function (version, structure) {
        structure.date = new Date().toISOString()
        jsonizer.config.versions[version] = structure
        jsonizer.set.version.current(version)
      },
      current: function (version) {
        if (!jsonizer.config) jsonizer.set.config.default()
        jsonizer.config.structure.version = version || jsonizer.config.structure.version
      }
    },
    data: function (data) {
      data = data || '{}'
      jsonizer.data = JSON.parse(data)
    },
    semver: function (version) {
      jsonizer.config.versions[jsonizer.config.structure.version].next = version
    },
    structure: function (structure) {
      jsonizer.config.structure = structure
    },
    config: {
      data: function (data, config) {
        jsonizer.set.config.current(config)
        jsonizer.set.data(data)
      },
      current: function(config) {
        jsonizer.config = config || jsonizer.config
        jsonizer.set.version.current(jsonizer.config.structure.version)
      },
      default: function() {
        jsonizer.config = {
          "structure" : {
            "version": "0.1.0"
          },
          "versions": {
            "0.1.0": {
              "date" : new Date().toISOString(),
              "description" : "",
              "add": {},
              "delete": [],
              "modify": {}
            }
          }
        }
      }
    }
  }

  var get = {
    version: function(version) {
      return jsonizer.config.versions[version] || false
    }
  }

  var keys = {
    add: function(oldStructure, newStructure) {
      for (var key in _.omit(newStructure, 'version')) {
        oldStructure[key] = newStructure[key]
      }
    },

    modify: function(oldStructure, newStructure) {
      jsonizer.keys.add(oldStructure, newStructure)
    },

    delete: function(oldStructure, newStructure) {
      newStructure.forEach(function(key) {
        if (typeof key === 'object') {
            for (var childKey in key) {
              jsonizer.keys.delete(oldStructure[childKey], key[childKey])
            }
        } else {
          delete oldStructure[key]
        }
      })
    }
  }

  var update = {
    variables: function(oldStructure, newStructure) {
      jsonizer.keys.add(oldStructure, newStructure.add)
      jsonizer.keys.modify(oldStructure, newStructure.modify)
      jsonizer.keys.delete(oldStructure, newStructure.delete)
    },
    next: function(version) {
      jsonizer.update.variables(
        jsonizer.config.structure,
        jsonizer.next(version, jsonizer.config.versions[version])
      )
    },

    current: function() {
      jsonizer.update.variables(
        jsonizer.config.structure,
        jsonizer.config.versions[jsonizer.config.structure.version]
      )
      jsonizer.set.version.current()
    },

    last: function() {
      if (jsonizer.config.versions[jsonizer.config.structure.version].next) {
        jsonizer.update.next(jsonizer.config.structure.version)
        jsonizer.update.last()
      } else {
        jsonizer.update.current()
      }
    }
  }

  var validate = {
    version: function (structure) {
      structure = structure || jsonizer.config.structure
      return ((structure.date!=null) && (structure.description!=null))
    },
    outdated: function(structure) {
      return semver.gt(jsonizer.config.structure.version, structure.version)
    }
  }

  function next(version, versionStructure) {
    var next = semver.inc(version, versionStructure.next)
    jsonizer.set.version.current(next)
    return jsonizer.config.versions[next]
  }

  function init(config, data) {
    jsonizer.set.config.data(config, data)
  }

  jsonizer = {
    init: init,
    set: set,
    get: get,
    validate: validate,
    update: update,
    next: next,
    keys: keys
  }

  module.exports = jsonizer
})
