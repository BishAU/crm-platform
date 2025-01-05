'use client';
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navigation;
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
var react_1 = require("react");
var utils_1 = require("@lib/utils");
var react_2 = require("react");
function Navigation(_a) {
    var _this = this;
    var isCollapsed = _a.isCollapsed, menuItems = _a.menuItems;
    var _b = (0, react_1.useState)(null), openMenu = _b[0], setOpenMenu = _b[1];
    var pathname = (0, navigation_1.usePathname)();
    // Keep parent menu open when subitems are active
    (0, react_1.useEffect)(function () {
        menuItems.forEach(function (item) {
            var _a;
            if ((_a = item.subItems) === null || _a === void 0 ? void 0 : _a.some(function (subItem) { return pathname === subItem.href; })) {
                setOpenMenu(item.name);
            }
        });
    }, [pathname, menuItems]);
    return (<nav className="flex flex-col h-full">
      <div className="flex-1 px-2 py-2 space-y-1">
        {menuItems.map(function (_a) {
            var name = _a.name, href = _a.href, icon = _a.icon, subItems = _a.subItems, isButton = _a.isButton, onClick = _a.onClick;
            var hasSubItems = subItems && subItems.length > 0;
            var isOpen = openMenu === name;
            return (<div key={name}>
              {isButton ? (<button className={(0, utils_1.cn)('group flex items-center px-2 py-2 text-sm font-medium rounded-md', 'text-white transition-colors duration-200 w-full text-left', pathname === href ? 'bg-[#005f9e]' : '')} onClick={function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var signOut;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(onClick === 'signOut')) return [3 /*break*/, 2];
                                    e.preventDefault();
                                    return [4 /*yield*/, Promise.resolve().then(function () { return require('next-auth/react'); })];
                                case 1:
                                    signOut = (_a.sent()).signOut;
                                    signOut({ callbackUrl: '/login' });
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); }}>
                  <span className={(0, utils_1.cn)('mr-3', pathname === href ? 'text-white' : 'text-white/80', 'hover:bg-[#005f9e] !important')}>
                    {typeof icon === 'string' && Lucide[icon] ? <Lucide /> : }[icon as keyof typeof Lucide]  /> : null}
                  </span>
                  {!isCollapsed && (<div className="flex-1 flex justify-between items-center">
                      <span>{name}</span>
                    </div>)}
                </button>) : (<link_1.default href={href} className={(0, utils_1.cn)('group flex items-center px-2 py-2 text-sm font-medium rounded-md', 'text-white transition-colors duration-200', hasSubItems ? 'cursor-pointer' : '', pathname === href ? 'bg-[#005f9e]' : '')} onClick={function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log('pathname:', pathname, 'href:', href, 'active:', pathname === href);
                            if (hasSubItems) {
                                e.preventDefault();
                                console.log('openMenu:', openMenu, 'name:', name);
                                if (openMenu === name) {
                                    setOpenMenu(null);
                                }
                                else {
                                    setOpenMenu(name);
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); }} aria-expanded={hasSubItems ? isOpen : undefined} aria-haspopup={hasSubItems ? 'true' : undefined}>
                  <span className={(0, utils_1.cn)('mr-3', pathname === href ? 'text-white' : 'text-white/80', 'hover:bg-[#005f9e] !important')}>
                    {typeof icon === 'string' && Lucide[icon] ? <Lucide /> : }[icon as keyof typeof Lucide]  /> : null}
                  </span>
                  {!isCollapsed && (<div className="flex-1 flex justify-between items-center">
                      <span>{name}</span>
                      {hasSubItems && (<span className="ml-2">
                          {isOpen ? '▴' : '▾'}
                        </span>)}
                    </div>)}
                </link_1.default>)}

              {hasSubItems && isOpen && !isCollapsed && (<div className="pl-4">
                  {subItems.map(function (subItem) { return (<link_1.default key={subItem.name} href={subItem.href} className={(0, utils_1.cn)('group flex items-center px-2 py-2 text-sm font-medium rounded-md', 'text-white hover:bg-[#005f9e] transition-colors duration-200', pathname === subItem.href ? 'bg-[#005f9e]' : '')}>
                      <span className={(0, utils_1.cn)('mr-3', pathname === subItem.href ? 'text-white' : 'text-white/80')}>
                        {typeof subItem.icon === 'string' && Lucide[subItem.icon] ? <Lucide /> : }[subItem.icon as keyof typeof Lucide] /> : null}
                      </span>
                      {subItem.name}
                    </link_1.default>); })}
                </div>)}
            </div>);
        })}
      </div>
    </nav>);
}
