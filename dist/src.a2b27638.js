// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
var D = document;
var $calculate = D.getElementById("calculate");
var date = new Date().getFullYear();
var day = new Date().getDate();
var month = new Date().toLocaleString("es-ES", {
  month: "long"
});
function formValues() {
  // Obtener los valores de los inputs
  var day = document.getElementById("day").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;

  // Crear el objeto JavaScript
  var fecha = {
    day: day,
    month: month,
    year: year
  };
  var date = convertDate(fecha);
  sendDate(date);
  validFormat(date);
}
function convertDate(_ref) {
  var day = _ref.day,
    month = _ref.month,
    year = _ref.year;
  // Convertir a enteros si son cadenas de texto
  if (typeof day === "string") {
    day = parseInt(day, 10);
  }
  if (typeof month === "string") {
    month = parseInt(month, 10);
  }
  if (typeof year === "string") {
    year = parseInt(year, 10);
  }
  var conditionsMet = false;
  if (year < 2023) {
    conditionsMet = true;
  } else if (year === 2023 && month <= 12 && month >= 1) {
    if (month === 2) {
      if (day <= 28) {
        conditionsMet = true;
      } else if (day === 29 && isLeapYear(year)) {
        conditionsMet = true;
      } else {
        conditionsMet = false;
      }
    } else if ([1, 3, 5, 7, 8, 10, 12].includes(month) && day >= 1 && day <= 31) {
      conditionsMet = true;
    } else if ([4, 6, 9, 11].includes(month) && day >= 1 && day <= 30) {
      conditionsMet = true;
    } else {
      conditionsMet = false;
    }
  }

  //validFormat(conditionsMet);

  // Función para verificar si es un año bisiesto
  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }
  var fecha = {
    day: day,
    month: month,
    year: year,
    conditionsMet: conditionsMet
  };
  return fecha;
}
function validFormat(_ref2) {
  var conditionsMet = _ref2.conditionsMet;
  if (conditionsMet) {
    D.textContent = "Las condiciones se cumplen.";
    D.getElementById("verified").classList.remove("error");
    D.querySelectorAll(".hide-content").forEach(function (content) {
      content.style.display = "none";
      content.classList.remove("error");
    });
    D.querySelectorAll("label").forEach(function (label) {
      label.classList.remove("error");
      label.firstElementChild.classList.remove("error-border");
    });
  } else {
    D.querySelectorAll(".hide-content").forEach(function (content) {
      content.style.display = "block";
      content.classList.add("error");
    });
    D.querySelectorAll("label").forEach(function (label) {
      label.classList.add("error");
      label.firstElementChild.classList.add("error-border");
    });
    D.querySelectorAll(".no-valid-format").forEach(function (input) {
      input.textContent = "- -";
    });
  }
}
function sendDate(_ref3) {
  var day = _ref3.day,
    month = _ref3.month,
    year = _ref3.year;
  var fechaActual = new Date();
  var fechaNacimiento = new Date(year, month - 1, day);

  // Calcular la diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
  var diferenciaMilisegundos = fechaActual - fechaNacimiento;

  // Convertir la diferencia de milisegundos a una fecha de edad
  var edad = new Date(diferenciaMilisegundos);

  // Obtener los componentes de la edad (años, meses y días)
  var edadAnios = edad.getUTCFullYear() - 1970; // Restar 1970 ya que la fecha de referencia es el 1 de enero de 1970
  var edadMeses = edad.getUTCMonth();
  var edadDias = edad.getUTCDate() - 1; // Restar 1 ya que los días comienzan desde 1 y no desde 0

  console.log("La edad del usuario es:", edadAnios, "años,", edadMeses, "meses y", edadDias, "días.");
  D.getElementById("days").textContent = edadDias;
  D.getElementById("months").textContent = edadMeses;
  D.getElementById("years").textContent = edadAnios;
}
$calculate.addEventListener("click", function (e) {
  e.preventDefault();
  alert("click");
  formValues();
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44837" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map