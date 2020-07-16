"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var recoil_1 = require("recoil");
var formatFiberNodes_1 = require("./formatFiberNodes");
// isRestored state disables snapshots from being recorded
var isRestoredState = false;
function RecoilizeDebugger(props) {
    var _this = this;
    // We should ask for Array of atoms and selectors.
    // Captures all atoms that were defined to get the initial state
    var nodes = null;
    if (typeof props.nodes === 'object' && !Array.isArray(props.nodes)) {
        nodes = Object.values(props.nodes);
    }
    else if (Array.isArray(props.nodes)) {
        nodes = props.nodes;
    }
    var root = props.root;
    var snapshot = recoil_1.useRecoilSnapshot();
    // Local state of all previous snapshots to use for time traveling when requested by dev tools.
    var _a = react_1.useState([snapshot]), snapshots = _a[0], setSnapshots = _a[1];
    // const [isRestoredState, setRestoredState] = useState(false);
    var gotoSnapshot = recoil_1.useGotoRecoilSnapshot();
    var filteredSnapshot = {};
    var currentTree = snapshot._store.getState().currentTree;
    // Traverse all atoms and selector state nodes and get value
    nodes.forEach(function (node) {
        var type = node.__proto__.constructor.name;
        var contents = snapshot.getLoadable(node).contents;
        var nodeDeps = currentTree.nodeDeps.get(node.key);
        var nodeToNodeSubscriptions = currentTree.nodeToNodeSubscriptions.get(node.key);
        // Construct node data structure for dev tool to consume
        filteredSnapshot[node.key] = {
            type: type,
            contents: contents,
            nodeDeps: nodeDeps ? Array.from(nodeDeps) : [],
            nodeToNodeSubscriptions: nodeToNodeSubscriptions
                ? Array.from(nodeToNodeSubscriptions)
                : []
        };
    });
    // React lifecycle hook on re-render
    react_1.useEffect(function () {
        if (!isRestoredState) {
            setTimeout(function () {
                var devToolData = createDevToolDataObject(filteredSnapshot);
                // Post message to content script on every re-render of the developers application only if content script has started
                sendWindowMessage('recordSnapshot', devToolData);
            }, 0);
        }
        else {
            isRestoredState = false;
        }
        // Window listener for messages from dev tool UI & background.js
        window.addEventListener('message', onMessageReceived);
        // Clears the window event listener.
        return function () { return window.removeEventListener('message', onMessageReceived); };
    });
    // Listener callback for messages sent to window
    var onMessageReceived = function (msg) {
        // Add other actions from dev tool here
        switch (msg.data.action) {
            // Checks to see if content script has started before sending initial snapshot
            case 'contentScriptStarted':
                var initialFilteredSnapshot = formatAtomSelectorRelationship(filteredSnapshot);
                var devToolData = createDevToolDataObject(initialFilteredSnapshot);
                sendWindowMessage('moduleInitialized', devToolData);
                break;
            // Listens for a request from dev tool to time travel to previous state of the app.
            case 'snapshotTimeTravel':
                timeTravelToSnapshot(msg);
                break;
            default:
                break;
        }
    };
    // Sends window an action and payload message.
    var sendWindowMessage = function (action, payload) {
        window.postMessage({
            action: action,
            payload: payload
        }, '*');
    };
    var createDevToolDataObject = function (filteredSnapshot) {
        return {
            filteredSnapshot: filteredSnapshot,
            componentAtomTree: formatFiberNodes_1["default"](root._reactRootContainer._internalRoot.current)
        };
    };
    var formatAtomSelectorRelationship = function (filteredSnapshot) {
        var windowAny = window;
        if (windowAny.$recoilDebugStates &&
            Array.isArray(windowAny.$recoilDebugStates) &&
            windowAny.$recoilDebugStates.length) {
            var snapObj = windowAny.$recoilDebugStates[windowAny.$recoilDebugStates.length - 1];
            if (snapObj.hasOwnProperty('nodeDeps')) {
                for (var _i = 0, _a = snapObj.nodeDeps; _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    filteredSnapshot[key].nodeDeps = Array.from(value);
                }
            }
            if (snapObj.hasOwnProperty('nodeToNodeSubscriptions')) {
                for (var _c = 0, _d = snapObj.nodeToNodeSubscriptions; _c < _d.length; _c++) {
                    var _e = _d[_c], key = _e[0], value = _e[1];
                    filteredSnapshot[key].nodeToNodeSubscriptions = Array.from(value);
                }
            }
        }
        return filteredSnapshot;
    };
    // FOR TIME TRAVEL: time travels to a given snapshot, re renders application.
    var timeTravelToSnapshot = function (msg) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isRestoredState = true;
                    return [4 /*yield*/, gotoSnapshot(snapshots[msg.data.payload.snapshotIndex])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // FOR TIME TRAVEL: Recoil hook to fire a callback on every snapshot change
    recoil_1.useRecoilTransactionObserver_UNSTABLE(function (_a) {
        var snapshot = _a.snapshot;
        if (!isRestoredState) {
            setSnapshots(__spreadArrays(snapshots, [snapshot]));
        }
    });
    return null;
}
exports["default"] = RecoilizeDebugger;
