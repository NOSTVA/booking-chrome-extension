const auto_fill=(e,[t,{typology:n,category:o,visa:s}])=>{const a=e.applicants.map((()=>s));return select_location(t).then((()=>accept_terms())).then((()=>next())).then((()=>set_folders_count(a.length))).then((()=>select_folder(1))).then((()=>set_folders_visa_typology(n))).then((()=>set_folders_visa_category(o))).then((()=>set_folders_visa(a))).then((()=>next())).then((()=>set_folders_inputs(e))).catch((e=>{console.error(e)}))};chrome.runtime.onMessage.addListener((async(e,t,n)=>{const{action:o,appointment:s}=e;return"AUTO_FILL"===o&&(auto_fill(s,BUSINESS_CAIRO).then((()=>n("ok!"))),!0)}));