"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/outfalls/route";
exports.ids = ["app/api/outfalls/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Foutfalls%2Froute&page=%2Fapi%2Foutfalls%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foutfalls%2Froute.ts&appDir=%2Fhome%2Fbish%2FDownloads%2Fsites%2Fcrm-platform%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbish%2FDownloads%2Fsites%2Fcrm-platform&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Foutfalls%2Froute&page=%2Fapi%2Foutfalls%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foutfalls%2Froute.ts&appDir=%2Fhome%2Fbish%2FDownloads%2Fsites%2Fcrm-platform%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbish%2FDownloads%2Fsites%2Fcrm-platform&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_bish_Downloads_sites_crm_platform_app_api_outfalls_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/outfalls/route.ts */ \"(rsc)/./app/api/outfalls/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/outfalls/route\",\n        pathname: \"/api/outfalls\",\n        filename: \"route\",\n        bundlePath: \"app/api/outfalls/route\"\n    },\n    resolvedPagePath: \"/home/bish/Downloads/sites/crm-platform/app/api/outfalls/route.ts\",\n    nextConfigOutput,\n    userland: _home_bish_Downloads_sites_crm_platform_app_api_outfalls_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/outfalls/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZvdXRmYWxscyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGb3V0ZmFsbHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZvdXRmYWxscyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGYmlzaCUyRkRvd25sb2FkcyUyRnNpdGVzJTJGY3JtLXBsYXRmb3JtJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGYmlzaCUyRkRvd25sb2FkcyUyRnNpdGVzJTJGY3JtLXBsYXRmb3JtJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNpQjtBQUM5RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2NybS1wbGF0Zm9ybS8/MzdhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9iaXNoL0Rvd25sb2Fkcy9zaXRlcy9jcm0tcGxhdGZvcm0vYXBwL2FwaS9vdXRmYWxscy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvb3V0ZmFsbHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9vdXRmYWxsc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvb3V0ZmFsbHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS9iaXNoL0Rvd25sb2Fkcy9zaXRlcy9jcm0tcGxhdGZvcm0vYXBwL2FwaS9vdXRmYWxscy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvb3V0ZmFsbHMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Foutfalls%2Froute&page=%2Fapi%2Foutfalls%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foutfalls%2Froute.ts&appDir=%2Fhome%2Fbish%2FDownloads%2Fsites%2Fcrm-platform%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbish%2FDownloads%2Fsites%2Fcrm-platform&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/outfalls/route.ts":
/*!***********************************!*\
  !*** ./app/api/outfalls/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/api */ \"(rsc)/./lib/api.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/db */ \"(rsc)/./lib/db.ts\");\n\n\nconst dynamic = \"force-dynamic\";\nasync function GET(request) {\n    try {\n        const searchParams = request.nextUrl.searchParams;\n        const countOnly = searchParams.get(\"count\") === \"true\";\n        if (countOnly) {\n            const outfalls = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.findMany(\"outfall\", {});\n            return (0,_lib_api__WEBPACK_IMPORTED_MODULE_0__.jsonResponse)({\n                count: outfalls.length\n            });\n        }\n        const outfalls = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.findMany(\"outfall\", {\n            where: {\n                ...Object.fromEntries(Array.from(searchParams.entries()).filter(([key])=>![\n                        \"page\",\n                        \"limit\",\n                        \"sortBy\",\n                        \"sortOrder\"\n                    ].includes(key)))\n            }\n        });\n        return (0,_lib_api__WEBPACK_IMPORTED_MODULE_0__.jsonResponse)({\n            data: outfalls\n        });\n    } catch (error) {\n        console.error(\"Error fetching outfalls:\", error);\n        return (0,_lib_api__WEBPACK_IMPORTED_MODULE_0__.errorResponse)(\"Failed to fetch outfalls\", 500);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL291dGZhbGxzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDK0Q7QUFDekI7QUFFL0IsTUFBTUcsVUFBVSxnQkFBZ0I7QUFvQmhDLGVBQWVDLElBQUlDLE9BQW9CO0lBQzFDLElBQUk7UUFDRixNQUFNQyxlQUFlRCxRQUFRRSxPQUFPLENBQUNELFlBQVk7UUFDakQsTUFBTUUsWUFBWUYsYUFBYUcsR0FBRyxDQUFDLGFBQWE7UUFFaEQsSUFBSUQsV0FBVztZQUNiLE1BQU1FLFdBQVcsTUFBTVIsNkNBQVcsQ0FBQyxXQUFrQixDQUFDO1lBQ3RELE9BQU9GLHNEQUFZQSxDQUFDO2dCQUFFWSxPQUFPRixTQUFTRyxNQUFNO1lBQUM7UUFDL0M7UUFFQSxNQUFNSCxXQUFXLE1BQU1SLDZDQUFXLENBQUMsV0FBa0I7WUFDbkRZLE9BQU87Z0JBQ0wsR0FBR0MsT0FBT0MsV0FBVyxDQUNuQkMsTUFBTUMsSUFBSSxDQUFDWixhQUFhYSxPQUFPLElBQzVCQyxNQUFNLENBQUMsQ0FBQyxDQUFDQyxJQUFJLEdBQUssQ0FBQzt3QkFBQzt3QkFBUTt3QkFBUzt3QkFBVTtxQkFBWSxDQUFDQyxRQUFRLENBQUNELE1BQ3pFO1lBQ0g7UUFDRjtRQUVBLE9BQU9yQixzREFBWUEsQ0FBQztZQUFFdUIsTUFBTWI7UUFBUztJQUN2QyxFQUFFLE9BQU9jLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLDRCQUE0QkE7UUFDMUMsT0FBT3ZCLHVEQUFhQSxDQUFDLDRCQUE0QjtJQUNuRDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3JtLXBsYXRmb3JtLy4vYXBwL2FwaS9vdXRmYWxscy9yb3V0ZS50cz9jZjk4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0IH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsganNvblJlc3BvbnNlLCBlcnJvclJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vLi4vbGliL2FwaSc7XG5pbXBvcnQgKiBhcyBkYiBmcm9tICcuLi8uLi8uLi9saWIvZGInO1xuXG5leHBvcnQgY29uc3QgZHluYW1pYyA9ICdmb3JjZS1keW5hbWljJztcblxuaW50ZXJmYWNlIE91dGZhbGwge1xuICBpZDogc3RyaW5nO1xuICBhdXRob3JpdHk/OiBzdHJpbmc7XG4gIGNvbnRhY3Q/OiBzdHJpbmc7XG4gIGNvbnRhY3RfZW1haWw/OiBzdHJpbmc7XG4gIGNvbnRhY3RfbmFtZT86IHN0cmluZztcbiAgaW5kaWdlbm91c05hdGlvbj86IHN0cmluZztcbiAgbGFuZENvdW5jaWw/OiBzdHJpbmc7XG4gIGxhdGl0dWRlPzogc3RyaW5nO1xuICBsb25naXR1ZGU/OiBzdHJpbmc7XG4gIHN0YXRlPzogc3RyaW5nO1xuICB0eXBlPzogc3RyaW5nO1xuICBvdXRmYWxsTmFtZT86IHN0cmluZztcbiAgb3V0ZmFsbD86IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICB1cGRhdGVkQXQ6IERhdGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gcmVxdWVzdC5uZXh0VXJsLnNlYXJjaFBhcmFtcztcbiAgICAgIGNvbnN0IGNvdW50T25seSA9IHNlYXJjaFBhcmFtcy5nZXQoJ2NvdW50JykgPT09ICd0cnVlJztcblxuICAgICAgaWYgKGNvdW50T25seSkge1xuICAgICAgICBjb25zdCBvdXRmYWxscyA9IGF3YWl0IGRiLmZpbmRNYW55KCdvdXRmYWxsJyBhcyBhbnksIHt9KSBhcyBPdXRmYWxsW107XG4gICAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoeyBjb3VudDogb3V0ZmFsbHMubGVuZ3RoIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvdXRmYWxscyA9IGF3YWl0IGRiLmZpbmRNYW55KCdvdXRmYWxsJyBhcyBhbnksIHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAuLi5PYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgICAgICBBcnJheS5mcm9tKHNlYXJjaFBhcmFtcy5lbnRyaWVzKCkpXG4gICAgICAgICAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiAhWydwYWdlJywgJ2xpbWl0JywgJ3NvcnRCeScsICdzb3J0T3JkZXInXS5pbmNsdWRlcyhrZXkpKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBqc29uUmVzcG9uc2UoeyBkYXRhOiBvdXRmYWxscyB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgb3V0ZmFsbHM6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UoJ0ZhaWxlZCB0byBmZXRjaCBvdXRmYWxscycsIDUwMCk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbImpzb25SZXNwb25zZSIsImVycm9yUmVzcG9uc2UiLCJkYiIsImR5bmFtaWMiLCJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwibmV4dFVybCIsImNvdW50T25seSIsImdldCIsIm91dGZhbGxzIiwiZmluZE1hbnkiLCJjb3VudCIsImxlbmd0aCIsIndoZXJlIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJBcnJheSIsImZyb20iLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwiaW5jbHVkZXMiLCJkYXRhIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/outfalls/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/prisma.ts":
/*!***************************!*\
  !*** ./app/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst prisma = globalThis.prisma ?? prismaClientSingleton();\nif (true) globalThis.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsd0JBQXdCO0lBQzVCLE9BQU8sSUFBSUQsd0RBQVlBO0FBQ3pCO0FBTU8sTUFBTUUsU0FBU0MsV0FBV0QsTUFBTSxJQUFJRCx3QkFBd0I7QUFFbkUsSUFBSUcsSUFBeUIsRUFBY0QsV0FBV0QsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NybS1wbGF0Zm9ybS8uL2FwcC9saWIvcHJpc21hLnRzPzUxOWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBwcmlzbWFDbGllbnRTaW5nbGV0b24gPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJpc21hQ2xpZW50KCk7XG59O1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHZhciBwcmlzbWE6IHVuZGVmaW5lZCB8IFJldHVyblR5cGU8dHlwZW9mIHByaXNtYUNsaWVudFNpbmdsZXRvbj47XG59XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxUaGlzLnByaXNtYSA/PyBwcmlzbWFDbGllbnRTaW5nbGV0b24oKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbFRoaXMucHJpc21hID0gcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYUNsaWVudFNpbmdsZXRvbiIsInByaXNtYSIsImdsb2JhbFRoaXMiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/api.ts":
/*!********************!*\
  !*** ./lib/api.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ERROR_MESSAGES: () => (/* binding */ ERROR_MESSAGES),\n/* harmony export */   errorResponse: () => (/* binding */ errorResponse),\n/* harmony export */   jsonResponse: () => (/* binding */ jsonResponse)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nconst ERROR_MESSAGES = {\n    NOT_FOUND: (resource)=>`${resource} not found`,\n    UNAUTHORIZED: \"Unauthorized\",\n    INTERNAL_ERROR: \"Internal server error\",\n    INVALID_REQUEST: \"Invalid request\"\n};\n/**\n * Common response helpers\n */ const jsonResponse = (data, status = 200)=>{\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data, {\n        status\n    });\n};\nconst errorResponse = (message, status = 500)=>{\n    return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(message, {\n        status\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXBpLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFFcEMsTUFBTUMsaUJBQWlCO0lBQzVCQyxXQUFXLENBQUNDLFdBQXFCLENBQUMsRUFBRUEsU0FBUyxVQUFVLENBQUM7SUFDeERDLGNBQWM7SUFDZEMsZ0JBQWdCO0lBQ2hCQyxpQkFBaUI7QUFDbkIsRUFBRTtBQUVGOztDQUVDLEdBQ00sTUFBTUMsZUFBZSxDQUFDQyxNQUFXQyxTQUFTLEdBQUc7SUFDbEQsT0FBT1QscURBQVlBLENBQUNVLElBQUksQ0FBQ0YsTUFBTTtRQUFFQztJQUFPO0FBQzFDLEVBQUU7QUFFSyxNQUFNRSxnQkFBZ0IsQ0FBQ0MsU0FBaUJILFNBQVMsR0FBRztJQUN6RCxPQUFPLElBQUlULHFEQUFZQSxDQUFDWSxTQUFTO1FBQUVIO0lBQU87QUFDNUMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2NybS1wbGF0Zm9ybS8uL2xpYi9hcGkudHM/NjhhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5cbmV4cG9ydCBjb25zdCBFUlJPUl9NRVNTQUdFUyA9IHtcbiAgTk9UX0ZPVU5EOiAocmVzb3VyY2U6IHN0cmluZykgPT4gYCR7cmVzb3VyY2V9IG5vdCBmb3VuZGAsXG4gIFVOQVVUSE9SSVpFRDogJ1VuYXV0aG9yaXplZCcsXG4gIElOVEVSTkFMX0VSUk9SOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyxcbiAgSU5WQUxJRF9SRVFVRVNUOiAnSW52YWxpZCByZXF1ZXN0J1xufTtcblxuLyoqXG4gKiBDb21tb24gcmVzcG9uc2UgaGVscGVyc1xuICovXG5leHBvcnQgY29uc3QganNvblJlc3BvbnNlID0gKGRhdGE6IGFueSwgc3RhdHVzID0gMjAwKSA9PiB7XG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkYXRhLCB7IHN0YXR1cyB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclJlc3BvbnNlID0gKG1lc3NhZ2U6IHN0cmluZywgc3RhdHVzID0gNTAwKSA9PiB7XG4gIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKG1lc3NhZ2UsIHsgc3RhdHVzIH0pO1xufTtcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJFUlJPUl9NRVNTQUdFUyIsIk5PVF9GT1VORCIsInJlc291cmNlIiwiVU5BVVRIT1JJWkVEIiwiSU5URVJOQUxfRVJST1IiLCJJTlZBTElEX1JFUVVFU1QiLCJqc29uUmVzcG9uc2UiLCJkYXRhIiwic3RhdHVzIiwianNvbiIsImVycm9yUmVzcG9uc2UiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/api.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   create: () => (/* binding */ create),\n/* harmony export */   findByEmail: () => (/* binding */ findByEmail),\n/* harmony export */   findById: () => (/* binding */ findById),\n/* harmony export */   findByName: () => (/* binding */ findByName),\n/* harmony export */   findMany: () => (/* binding */ findMany),\n/* harmony export */   prisma: () => (/* binding */ prisma),\n/* harmony export */   updateById: () => (/* binding */ updateById)\n/* harmony export */ });\n/* harmony import */ var _app_lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/lib/prisma */ \"(rsc)/./app/lib/prisma.ts\");\n\nconst prisma = _app_lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma;\nasync function findById(table, id, include) {\n    const includeObj = include?.reduce((acc, curr)=>({\n            ...acc,\n            [curr]: true\n        }), {});\n    return prisma[table].findUnique({\n        where: {\n            id\n        },\n        include: includeObj\n    });\n}\nasync function updateById(table, id, data, options) {\n    // Handle field mapping\n    const mappedData = {\n        ...data\n    };\n    if (options?.fieldMap) {\n        Object.entries(options.fieldMap).forEach(([from, to])=>{\n            if (from in mappedData) {\n                mappedData[to] = mappedData[from];\n                delete mappedData[from];\n            }\n        });\n    }\n    const includeObj = options?.relations?.reduce((acc, curr)=>({\n            ...acc,\n            [curr.table]: true\n        }), {});\n    return prisma[table].update({\n        where: {\n            id\n        },\n        data: {\n            ...mappedData,\n            updatedAt: new Date(),\n            ...options?.relations ? options.relations.reduce((acc, relation)=>({\n                    ...acc,\n                    [relation.table]: {\n                        deleteMany: {},\n                        create: relation.data\n                    }\n                }), {}) : {}\n        },\n        include: includeObj\n    });\n}\nasync function findByEmail(table, email, excludeId) {\n    return prisma[table].findFirst({\n        where: {\n            email,\n            ...excludeId ? {\n                NOT: {\n                    id: excludeId\n                }\n            } : {}\n        },\n        select: {\n            id: true\n        }\n    });\n}\nasync function findByName(table, name, excludeId) {\n    return prisma[table].findFirst({\n        where: {\n            name,\n            ...excludeId ? {\n                NOT: {\n                    id: excludeId\n                }\n            } : {}\n        },\n        select: {\n            id: true\n        }\n    });\n}\nasync function findMany(table, options) {\n    const includeObj = options?.include?.reduce((acc, curr)=>({\n            ...acc,\n            [curr]: true\n        }), {});\n    return prisma[table].findMany({\n        where: options?.where,\n        include: includeObj,\n        orderBy: options?.orderBy,\n        take: options?.take\n    });\n}\nasync function create(table, options) {\n    const includeObj = options?.include?.reduce((acc, curr)=>({\n            ...acc,\n            [curr]: true\n        }), {});\n    return prisma[table].create({\n        data: options.data,\n        include: includeObj\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U3dCO1FBQ2xCQyxNQUFNekIsU0FBU3lCO0lBQ2pCO0FBQ0Y7QUFFTyxlQUFlWCxPQUNwQnpCLEtBQWdCLEVBQ2hCVyxPQUdDO0lBRUQsTUFBTVIsYUFBYVEsU0FBU1QsU0FBU0UsT0FDbkMsQ0FBQ0MsS0FBS0MsT0FBVTtZQUFFLEdBQUdELEdBQUc7WUFBRSxDQUFDQyxLQUFLLEVBQUU7UUFBSyxJQUN2QyxDQUFDO0lBR0gsT0FBTyxNQUFPLENBQUNOLE1BQU0sQ0FBU3lCLE1BQU0sQ0FBQztRQUNuQ2YsTUFBTUMsUUFBUUQsSUFBSTtRQUNsQlIsU0FBU0M7SUFDWDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3JtLXBsYXRmb3JtLy4vbGliL2RiLnRzPzFkZjAiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBwcmlzbWEgYXMgcHJpc21hQ2xpZW50IH0gZnJvbSAnLi4vYXBwL2xpYi9wcmlzbWEnO1xuZXhwb3J0IGNvbnN0IHByaXNtYSA9IHByaXNtYUNsaWVudDtcbmltcG9ydCB7IFByaXNtYSwgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG50eXBlIFByaXNtYU1vZGVscyA9IHtcbiAgW0sgaW4ga2V5b2YgUHJpc21hQ2xpZW50XTogUHJpc21hQ2xpZW50W0tdIGV4dGVuZHMgeyBmaW5kVW5pcXVlOiBhbnkgfVxuICAgID8gS1xuICAgIDogbmV2ZXI7XG59W2tleW9mIFByaXNtYUNsaWVudF07XG5cbnR5cGUgTW9kZWxOYW1lID0gVW5jYXBpdGFsaXplPFByaXNtYU1vZGVscz47XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kQnlJZCh0YWJsZTogTW9kZWxOYW1lLCBpZDogc3RyaW5nLCBpbmNsdWRlPzogc3RyaW5nW10pIHtcbiAgY29uc3QgaW5jbHVkZU9iaiA9IGluY2x1ZGU/LnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoeyAuLi5hY2MsIFtjdXJyXTogdHJ1ZSB9KSwge30pO1xuICByZXR1cm4gKHByaXNtYVt0YWJsZV0gYXMgYW55KS5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGluY2x1ZGU6IGluY2x1ZGVPYmpcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVCeUlkKFxuICB0YWJsZTogTW9kZWxOYW1lLFxuICBpZDogc3RyaW5nLFxuICBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBvcHRpb25zPzoge1xuICAgIGZpZWxkTWFwPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgICByZWxhdGlvbnM/OiB7XG4gICAgICB0YWJsZTogc3RyaW5nO1xuICAgICAgZGF0YTogUmVjb3JkPHN0cmluZywgYW55PltdO1xuICAgIH1bXTtcbiAgfVxuKSB7XG4gIC8vIEhhbmRsZSBmaWVsZCBtYXBwaW5nXG4gIGNvbnN0IG1hcHBlZERhdGEgPSB7IC4uLmRhdGEgfTtcbiAgaWYgKG9wdGlvbnM/LmZpZWxkTWFwKSB7XG4gICAgT2JqZWN0LmVudHJpZXMob3B0aW9ucy5maWVsZE1hcCkuZm9yRWFjaCgoW2Zyb20sIHRvXSkgPT4ge1xuICAgICAgaWYgKGZyb20gaW4gbWFwcGVkRGF0YSkge1xuICAgICAgICBtYXBwZWREYXRhW3RvXSA9IG1hcHBlZERhdGFbZnJvbV07XG4gICAgICAgIGRlbGV0ZSBtYXBwZWREYXRhW2Zyb21dO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgaW5jbHVkZU9iaiA9IG9wdGlvbnM/LnJlbGF0aW9ucz8ucmVkdWNlKFxuICAgIChhY2MsIGN1cnIpID0+ICh7IC4uLmFjYywgW2N1cnIudGFibGVdOiB0cnVlIH0pLFxuICAgIHt9XG4gICk7XG5cbiAgcmV0dXJuIChwcmlzbWFbdGFibGVdIGFzIGFueSkudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHtcbiAgICAgIC4uLm1hcHBlZERhdGEsXG4gICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAuLi4ob3B0aW9ucz8ucmVsYXRpb25zXG4gICAgICAgID8gb3B0aW9ucy5yZWxhdGlvbnMucmVkdWNlKChhY2MsIHJlbGF0aW9uKSA9PiAoe1xuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgW3JlbGF0aW9uLnRhYmxlXToge1xuICAgICAgICAgICAgICBkZWxldGVNYW55OiB7fSxcbiAgICAgICAgICAgICAgY3JlYXRlOiByZWxhdGlvbi5kYXRhXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksIHt9KVxuICAgICAgICA6IHt9KVxuICAgIH0sXG4gICAgaW5jbHVkZTogaW5jbHVkZU9ialxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRCeUVtYWlsKHRhYmxlOiBNb2RlbE5hbWUsIGVtYWlsOiBzdHJpbmcsIGV4Y2x1ZGVJZD86IHN0cmluZykge1xuICByZXR1cm4gKHByaXNtYVt0YWJsZV0gYXMgYW55KS5maW5kRmlyc3Qoe1xuICAgIHdoZXJlOiB7XG4gICAgICBlbWFpbCxcbiAgICAgIC4uLihleGNsdWRlSWQgPyB7IE5PVDogeyBpZDogZXhjbHVkZUlkIH0gfSA6IHt9KVxuICAgIH0sXG4gICAgc2VsZWN0OiB7IGlkOiB0cnVlIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaW5kQnlOYW1lKHRhYmxlOiBNb2RlbE5hbWUsIG5hbWU6IHN0cmluZywgZXhjbHVkZUlkPzogc3RyaW5nKSB7XG4gIHJldHVybiAocHJpc21hW3RhYmxlXSBhcyBhbnkpLmZpbmRGaXJzdCh7XG4gICAgd2hlcmU6IHtcbiAgICAgIG5hbWUsXG4gICAgICAuLi4oZXhjbHVkZUlkID8geyBOT1Q6IHsgaWQ6IGV4Y2x1ZGVJZCB9IH0gOiB7fSlcbiAgICB9LFxuICAgIHNlbGVjdDogeyBpZDogdHJ1ZSB9XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmluZE1hbnkoXG4gIHRhYmxlOiBNb2RlbE5hbWUsXG4gIG9wdGlvbnM/OiB7XG4gICAgaW5jbHVkZT86IHN0cmluZ1tdO1xuICAgIHdoZXJlPzogUmVjb3JkPHN0cmluZywgYW55PjtcbiAgICBvcmRlckJ5PzogUmVjb3JkPHN0cmluZywgJ2FzYycgfCAnZGVzYyc+O1xuICAgIHRha2U/OiBudW1iZXI7XG4gIH1cbikge1xuICBjb25zdCBpbmNsdWRlT2JqID0gb3B0aW9ucz8uaW5jbHVkZT8ucmVkdWNlKFxuICAgIChhY2MsIGN1cnIpID0+ICh7IC4uLmFjYywgW2N1cnJdOiB0cnVlIH0pLFxuICAgIHt9XG4gICk7XG5cbiAgcmV0dXJuIChwcmlzbWFbdGFibGVdIGFzIGFueSkuZmluZE1hbnkoe1xuICAgIHdoZXJlOiBvcHRpb25zPy53aGVyZSxcbiAgICBpbmNsdWRlOiBpbmNsdWRlT2JqLFxuICAgIG9yZGVyQnk6IG9wdGlvbnM/Lm9yZGVyQnksXG4gICAgdGFrZTogb3B0aW9ucz8udGFrZVxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZShcbiAgdGFibGU6IE1vZGVsTmFtZSxcbiAgb3B0aW9uczoge1xuICAgIGRhdGE6IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgaW5jbHVkZT86IHN0cmluZ1tdO1xuICB9XG4pIHtcbiAgY29uc3QgaW5jbHVkZU9iaiA9IG9wdGlvbnM/LmluY2x1ZGU/LnJlZHVjZShcbiAgICAoYWNjLCBjdXJyKSA9PiAoeyAuLi5hY2MsIFtjdXJyXTogdHJ1ZSB9KSxcbiAgICB7fVxuICApO1xuXG4gIHJldHVybiAocHJpc21hW3RhYmxlXSBhcyBhbnkpLmNyZWF0ZSh7XG4gICAgZGF0YTogb3B0aW9ucy5kYXRhLFxuICAgIGluY2x1ZGU6IGluY2x1ZGVPYmpcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsicHJpc21hIiwicHJpc21hQ2xpZW50IiwiZmluZEJ5SWQiLCJ0YWJsZSIsImlkIiwiaW5jbHVkZSIsImluY2x1ZGVPYmoiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwidXBkYXRlQnlJZCIsImRhdGEiLCJvcHRpb25zIiwibWFwcGVkRGF0YSIsImZpZWxkTWFwIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJmcm9tIiwidG8iLCJyZWxhdGlvbnMiLCJ1cGRhdGUiLCJ1cGRhdGVkQXQiLCJEYXRlIiwicmVsYXRpb24iLCJkZWxldGVNYW55IiwiY3JlYXRlIiwiZmluZEJ5RW1haWwiLCJlbWFpbCIsImV4Y2x1ZGVJZCIsImZpbmRGaXJzdCIsIk5PVCIsInNlbGVjdCIsImZpbmRCeU5hbWUiLCJuYW1lIiwiZmluZE1hbnkiLCJvcmRlckJ5IiwidGFrZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Foutfalls%2Froute&page=%2Fapi%2Foutfalls%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foutfalls%2Froute.ts&appDir=%2Fhome%2Fbish%2FDownloads%2Fsites%2Fcrm-platform%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fbish%2FDownloads%2Fsites%2Fcrm-platform&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();