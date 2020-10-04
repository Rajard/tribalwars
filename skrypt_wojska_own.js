javascript: "use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PREFIX = 'kichowaty_';
var CSV = 'csv';
var tribalwars = 'tribalwars';
var UNITS = ['spear', 'axe', 'sword', 'archer', 'light', 'spy', 'marcher', 'heavy', 'catapult', 'ram', 'snob'];
var DEF_UNITS = ['spear', 'sword', 'archer', 'marcher', 'heavy'];
var OFF_UNITS = ['axe', 'light', 'marcher', 'ram'];
var OTHER_UNITS = ['spy', 'catapult', 'snob'];

var withPrefix = function withPrefix(str) {
  return PREFIX + str;
};

var CountOffVillages =
/*#__PURE__*/
function () {
  function CountOffVillages() {
    _classCallCheck(this, CountOffVillages);

    this.containerSelector = '#ally_content';
    this.extensionRadioInputNameAndID = withPrefix('extension');
    this.placesInFarmInputID = withPrefix('places');
    this.placesInFarmInputSelector = '#' + this.placesInFarmInputID;
    this.formID = withPrefix('form');
    this.formSelector = '#' + this.formID;
    this.playerIDsSelector = '#ally_content .input-nicer option:not([disabled])';
    this.fullOff = 20000;
    this.dialogID = withPrefix('dialog');
    this.resultID = withPrefix('result');
    this.resultSelector = '#' + this.resultID;
    this.render();
  }

  _createClass(CountOffVillages, [{
    key: "getURL",
    value: function getURL() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = new URLSearchParams(window.location.search);
      params.set('player_id', id);
      return "".concat(window.location.origin).concat(window.location.pathname, "?").concat(params.toString());
    }
  }, {
  	key: "getVillageUnits",
  	value: function getVillageUnits() {/*
  	  var _thisV = this;
  	  var obj = {
  	  	defUnits: {},
  	  	offUnits: {},
  	  	otherUnits: {}
  	  };
 
  	  var village = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  	  window.alert(village);
  	  DEF_UNITS.forEach(function (unit) {
  	  	obj.defUnits[unit] = _thisV.sanitizeTroops(village[unit])
  	  });
  	  OFF_UNITS.forEach(function (unit) {
  	  	obj.offUnits[unit] = _thisV.sainitizeTroops(village[unit])
  	  });
  	  OTHER_UNITS.forEach(function (unit) {
  	  	obj.otherUnits[unit] = _this.sanitizeTroops(village[unit])
  	  });
  	  return obj;*/
  	}
  }, {
    key: "parseHTML",
    value: function parseHTML() {
      var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var container = new DOMParser().parseFromString(html, 'text/html');
      var trs = container.querySelectorAll('.table-responsive .vis tr');
      
      var obj = {
        villages: {}
      };
      
      var images = trs[0].querySelectorAll('img');
      images.forEach(function (image) {
        if (image.getAttribute('src').includes('graphic/unit/unit')) {
          var unit = image.src.split('graphic/unit/unit_')[1].replace('.png', '');

          if (UNITS.includes(unit.toLowerCase())) {
            obj[unit] = {
              index: image.parentNode.cellIndex,
              value: 0
            };
          }
        }
      });

      for (var i = 1; i < trs.length; i++) {
        var tds = trs[i].querySelectorAll('td');
        var village = {};
        var placesInFarm = 0;

        for (var j in obj) {
          if (!obj[j].index) continue;
          var value = parseInt(tds[obj[j].index].innerText.trim().replace('.', ''));
          if (isNaN(value)) continue;
          obj[j].value += value;
          village[j] = {
            value: value
          };
        }

        obj.villages[i] = getVillageUnits(village);
      }

      return obj;
    }
  }, {
    key: "updateLoadingMarkup",
    value: function updateLoadingMarkup(i, total) {
      document.querySelector(this.resultSelector).innerHTML = "Pobrano ".concat(i, " z ").concat(total, " graczy");
    }
  }, {
    key: "sanitizeTroops",
    value: function sanitizeTroops(obj) {
      return obj && obj.value ? obj.value : 0;
    }
  }, {
  	key: "toUnitList",
  	value: function toUnitList(players) {
  		var _this4 = this;
  		
  		var result = {};
  		players.forEach(function (player) {
  			result += "\n[player]".concat(player.nick, "[/player]");
  			result += "\n";
  		});
  		return result;
  	}
  }, {
    key: "getResultMarkup",
    value: function getResultMarkup(result) {
      return "\n        <div>\n            <h1>Hej, o to wyniki!</h1>\n            <textarea rows=\"50\" cols=\"50\" readonly>".concat(result, "</textarea>\n        </div>\n    ");
    }
  }, {
    key: "handleFormSubmit",
    value: async function handleFormSubmit(e) {
      e.preventDefault();
      var players = this.players;
      window.Dialog.show(this.dialogID, this.loadingMarkup);

      for (var i = 0; i < players.length; i++) {
        if (window.Dialog.active_id !== this.dialogID) {
          return;
        }

        var player = players[i];
        await new Promise(function (resolve) {
          return setTimeout(resolve, 400);
        });
        var playerTroops = await this.getPlayerTroops(player.id);
        players[i] = _objectSpread({}, players[i], {
          troops: playerTroops
        });
        this.updateLoadingMarkup(i + 1, players.length);
      }

      window.Dialog.close();
      window.Dialog.show(this.dialogID, this.getResultMarkup(this.toUnitList(players)));
    }
  }, {
    key: "bindListeners",
    value: function bindListeners() {
      document.querySelector(this.formSelector).addEventListener('submit', this.handleFormSubmit.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      var container = document.querySelector(this.containerSelector);

      if (!container) {
        throw new Error('Invalid container selector');
      }

      var UIContainer = document.createElement('div');
      UIContainer.innerHTML = this.UIMarkup;
      container.prepend(UIContainer);
      this.bindListeners();
    }
  }, {
    key: "UIMarkup",
    get: function get() {
      return "\n            <form id=\"".concat(this.formID, "\">\n                <div>\n                    <label for=\"").concat(this.placesInFarmInputID, "\">Fulloff to ile miejsc w zagrodzie: </label>\n                    <input type=\"number\" min=\"1\" max=\"25000\" value=\"20000\" id =\"").concat(this.placesInFarmInputID, "\" >\n                </div>\n                <p>Jaki format: </p>\n                <div>\n                    <input type=\"radio\" name=\"").concat(this.extensionRadioInputNameAndID, "\" id=\"").concat(this.extensionRadioInputNameAndID + '_1', "\" value=\"").concat(tribalwars, "\" checked>\n                    <label for=\"").concat(this.extensionRadioInputNameAndID + '_1', "\">Tabelka plemion</label>\n                </div>\n                <div>\n                    <input type=\"radio\" name=\"").concat(this.extensionRadioInputNameAndID, "\" id=\"").concat(this.extensionRadioInputNameAndID + '_2', "\" value=\"").concat(CSV, "\">\n                    <label for=\"").concat(this.extensionRadioInputNameAndID + '_2', "\">CSV</label>\n                </div>\n                <button>Zbierz offy</button>\n            </form>\n        ");
    }
  }, {
    key: "fullOffPlacesInFarm",
    get: function get() {
      return parseInt(document.querySelector(this.placesInFarmInputSelector).value);
    }
  }, {
    key: "loadingMarkup",
    get: function get() {
      return "\n      <div>\n          Trwa \u0142adowanie danych...\n          <p id=\"".concat(this.resultID, "\"></p>\n      </div>\n    ");
    }
  }, {
    key: "players",
    get: function get() {
      var options = document.querySelectorAll(this.playerIDsSelector);
      var players = [];
      options.forEach(function (option) {
        if (option.value != 'Wybierz czĹonka') {
          players.push({
            id: option.value,
            nick: option.innerHTML.trim()
          });
        }
      });
      return players;
    }
  }]);

  return CountOffVillages;
}();

(function () {
  new CountOffVillages();
})(); void(0);