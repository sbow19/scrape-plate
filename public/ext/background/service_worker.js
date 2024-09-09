(()=>{"use strict";const e=(e,t)=>t.some((t=>e instanceof t));let t,r;const a=new WeakMap,n=new WeakMap,o=new WeakMap;let s={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return a.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return d(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function c(e){s=e(s)}function i(n){return"function"==typeof n?(o=n,(r||(r=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(o)?function(...e){return o.apply(u(this),e),d(this.request)}:function(...e){return d(o.apply(u(this),e))}):(n instanceof IDBTransaction&&function(e){if(a.has(e))return;const t=new Promise(((t,r)=>{const a=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",o),e.removeEventListener("abort",o)},n=()=>{t(),a()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",n),e.addEventListener("error",o),e.addEventListener("abort",o)}));a.set(e,t)}(n),e(n,t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(n,s):n);var o}function d(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,r)=>{const a=()=>{e.removeEventListener("success",n),e.removeEventListener("error",o)},n=()=>{t(d(e.result)),a()},o=()=>{r(e.error),a()};e.addEventListener("success",n),e.addEventListener("error",o)}));return o.set(t,e),t}(e);if(n.has(e))return n.get(e);const t=i(e);return t!==e&&(n.set(e,t),o.set(t,e)),t}const u=e=>o.get(e),l=["get","getKey","getAll","getAllKeys","count"],p=["put","add","delete","clear"],w=new Map;function h(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(w.get(t))return w.get(t);const r=t.replace(/FromIndex$/,""),a=t!==r,n=p.includes(r);if(!(r in(a?IDBIndex:IDBObjectStore).prototype)||!n&&!l.includes(r))return;const o=async function(e,...t){const o=this.transaction(e,n?"readwrite":"readonly");let s=o.store;return a&&(s=s.index(t.shift())),(await Promise.all([s[r](...t),n&&o.done]))[0]};return w.set(t,o),o}c((e=>({...e,get:(t,r,a)=>h(t,r)||e.get(t,r,a),has:(t,r)=>!!h(t,r)||e.has(t,r)})));const m=["continue","continuePrimaryKey","advance"],y={},f=new WeakMap,g=new WeakMap,I={get(e,t){if(!m.includes(t))return e[t];let r=y[t];return r||(r=y[t]=function(...e){f.set(this,g.get(this)[t](...e))}),r}};async function*b(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;const r=new Proxy(t,I);for(g.set(r,t),o.set(r,u(t));t;)yield r,t=await(f.get(r)||t.continue()),f.delete(r)}function j(t,r){return r===Symbol.asyncIterator&&e(t,[IDBIndex,IDBObjectStore,IDBCursor])||"iterate"===r&&e(t,[IDBIndex,IDBObjectStore])}c((e=>({...e,get:(t,r,a)=>j(t,r)?b:e.get(t,r,a),has:(t,r)=>j(t,r)||e.has(t,r)})));class D{constructor(){}static storeNames=["projects","schemas","current_project","user_data"];static async createStoreInDB(){try{return D.db=await function(e,t,{blocked:r,upgrade:a,blocking:n,terminated:o}={}){const s=indexedDB.open(e,t),c=d(s);return a&&s.addEventListener("upgradeneeded",(e=>{a(d(s.result),e.oldVersion,e.newVersion,d(s.transaction),e)})),r&&s.addEventListener("blocked",(e=>r(e.oldVersion,e.newVersion,e))),c.then((e=>{o&&e.addEventListener("close",(()=>o())),n&&e.addEventListener("versionchange",(e=>n(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),c}("quick-scrape",1,{upgrade(e){const t=e.objectStoreNames,r=D.storeNames.filter((e=>{if(0===t.length)return!0;for(const r of t)if(console.log(r),r===e)return!1;return!0}));for(const t of r)switch(t){case"current_project":e.createObjectStore(t,{autoIncrement:!0});break;case"user_data":break;case"projects":e.createObjectStore(t,{keyPath:"id"}).createIndex("projectName","name",{unique:!0});break;case"schemas":e.createObjectStore(t,{keyPath:"id"}).createIndex("schemaName","name",{unique:!0});break;default:console.log(`Unknown store: ${t}`)}}}),"IndexedDB store update success"}catch(e){return console.log(typeof e),"Failure to update store"}}static async addToStore(e,t){D.db||await D.createStoreInDB();const r=D.db.transaction(e,"readwrite");switch(console.log(t),t.addType){case"project":await r.store.add(t.data);break;case"session":const e=t.data,a=await r.store.get(e.projectId);return a.sessionNames[e.id]=e,await r.store.put(a),a}await r.done}static async removeFromStore(e,t){D.db||await D.createStoreInDB();const r=D.db.transaction(e,"readwrite");switch(e){case"projects":if("project"===t.dataType)r.store.delete(t.mainId);else{if("session"===t.dataType){const e=(await r.store.getAll()).find((e=>e.id===t.mainId));delete e.sessionNames[t.secondaryId];try{await r.store.put(e)}catch(e){console.log(e)}return await r.done,e}if("project_schema"===t.dataType){const e=await r.store.get(t.mainId);delete e.projectSchemas[t.secondaryId],await r.store.put(e,t.mainId),await r.done}else if("session_schema"===t.dataType){const e=await r.store.get(t.mainId);delete e.sessionNames[t.secondaryId][t.tertiaryId],await r.store.put(e,t.mainId),await r.done}else if("capture"===t.dataType){const e=await r.store.get(t.mainId);delete e.sessionNames[t.secondaryId][t.tertiaryId],await r.store.put(e,t.mainId),await r.done}}break;case"schemas":r.store.delete(t.mainId),await r.done}await r.done}static async updateStore(e,t){D.db||await D.createStoreInDB();const r=D.db.transaction(e,"readwrite");await r.store.put(t.data,t.mainId),await r.done}static async fetchAllProjects(){D.db||await D.createStoreInDB();const e=D.db.transaction("projects","readwrite"),t=await e.store.getAll();return await e.done,t}static async changeCurrentProject(e){D.db||await D.createStoreInDB();const t=D.db.transaction("projects","readonly");let r=null;try{r=await t.store.get(e)}catch(e){throw new Error("Could not fetch project details")}await t.done;const a=D.db.transaction("current_project","readwrite"),n={...r,lastSchema:null,lastSession:null,lastModified:null};return await a.store.clear(),await a.store.put(n),await a.done,r}static async changeCurrentProjectDetails(e){D.db||await D.createStoreInDB();const t=D.db.transaction("current_project","readwrite");await t.store.clear(),await t.store.put(e),await t.done}static async getCurrentProject(){D.db||await D.createStoreInDB();const e=D.db.transaction("current_project","readonly");let t=null;try{[t]=await e.store.getAll()}catch(e){throw new Error("Could not fetch project details")}return await e.done,t}static async removeCurrentProject(){D.db||await D.createStoreInDB();const e=D.db.transaction("current_project","readwrite");try{await e.store.clear()}catch(e){throw new Error("Could not fetch project details")}finally{await e.done}}static async removeCurrentSession(e){D.db||await D.createStoreInDB();const t=D.db.transaction("current_project","readwrite");try{const[r]=await t.store.getAll();delete r.sessionNames[e],await t.done}catch(e){throw new Error("Could not remove current session")}finally{await t.done}}}const v=D;let _="popup",B="schema_editor";chrome.runtime.onMessage.addListener(((e,t,r)=>("get_render_context"===e.action&&(r({renderContext:_,view:"popup"===_?"welcome":B}),_="popup"),!0))),chrome.runtime.onMessage.addListener((e=>{"open_side_panel"===e.action&&(_="side_panel",B=e.payload.panel_view,chrome.tabs.query({active:!0,currentWindow:!0},(e=>{let[t]=e;const r=t.id;r&&chrome.sidePanel.open({tabId:r})})))})),chrome.runtime.onInstalled.addListener((async()=>{const e=await v.createStoreInDB();console.log(e)})),chrome.runtime.onMessage.addListener((async(e,t,r)=>{if("fetch_all_projects"===e.action){let e=[];return(async()=>{try{return await v.fetchAllProjects()}catch(e){throw console.log(e),new Error("")}})().then((t=>{e=t,r(e)})).catch((t=>{console.log(typeof t),r(e)})),!0}})),chrome.runtime.onMessage.addListener((async(e,t,r)=>{if("get_current_project"===e.action){let e={};return v.getCurrentProject().then((e=>{r(e)})).catch((t=>{console.log(typeof t),r(e)})),!0}})),chrome.runtime.onMessage.addListener((async(e,t,r)=>{if("change_current_project"===e.action){let t={};return v.changeCurrentProject(e.payload).then((e=>{r(e)})).catch((e=>{console.log(typeof e),r(t)})),!0}})),chrome.runtime.onMessage.addListener((async(e,t,r)=>{if("change_current_project_details"===e.action){const t={success:!1};return v.changeCurrentProjectDetails(e.payload).then((()=>{t.success=!0,r(t)})).catch((e=>{console.log(typeof e),r(t)})),!0}})),chrome.runtime.onMessage.addListener((async(e,t,r)=>{if("remove_current_project"===e.action){const e={success:!1};return v.removeCurrentProject().then((()=>{e.success=!0,r(e)})).catch((t=>{console.log(typeof t),r(e)})),!0}})),chrome.runtime.onMessage.addListener((async(e,t,r)=>{if("remove_current_session"===e.action){const t={success:!1};return v.removeCurrentSession(e.payload).then((()=>{t.success=!0,r(t)})).catch((e=>{console.log(typeof e),r(t)})),!0}})),chrome.runtime.onMessage.addListener(((e,t,r)=>{if("add_to_database"===e.action){const{payload:t}=e,{store:a,data:n}=t,o={success:!1};return(async(e,t)=>{try{return await v.addToStore(e,t)}catch(e){throw console.log(e),new Error("")}})(a,n).then((e=>{o.success=!0,o.data=e,r(o)})).catch((e=>{console.log(typeof e),r(o)})),!0}})),chrome.runtime.onMessage.addListener(((e,t,r)=>{if("remove_from_database"===e.action){const{payload:t}=e,a={success:!1};return(async e=>await v.removeFromStore(e.store,e.data))(t).then((e=>{a.success=!0,a.data=e,r(a)})).catch((e=>{console.log(typeof e),r(a)})),!0}})),chrome.runtime.onMessage.addListener(((e,t,r)=>{if("update_database"===e.action){const{payload:t}=e,a={success:!1};return(async e=>(await v.updateStore(e.store,e.data),"Update database successful"))(t).then((()=>{a.success=!0,r(a)})).catch((e=>{console.log(typeof e),r(a)})),!0}}))})();