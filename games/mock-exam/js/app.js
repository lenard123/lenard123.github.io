!function(t){var e={};function s(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s(s.s=1)}([function(t,e){t.exports=function(t,e,s,n,r,o){var i,a=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(i=t,a=t.default);var u,l="function"==typeof a?a.options:a;if(e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),s&&(l.functional=!0),r&&(l._scopeId=r),o?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=u):n&&(u=n),u){var d=l.functional,f=d?l.render:l.beforeCreate;d?(l._injectStyles=u,l.render=function(t,e){return u.call(e),f(t,e)}):l.beforeCreate=f?[].concat(f,u):[u]}return{esModule:i,exports:a,options:l}}},function(t,e,s){s(2),t.exports=s(23)},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(3),r=s.n(n),o=s(6),i=s.n(o),a=s(9),c=s.n(a),u=s(12),l=s.n(u),d=[{path:"/",component:r.a,name:"Home"},{path:"/:subject",component:i.a,name:"set"},{path:"/:subject/:set",component:c.a,name:"Questions"},{path:"/:subject/:set/result",component:l.a,beforeEnter:function(t,e,s){"Questions"!=e.name?s({name:"Questions",params:{subject:t.params.subject,set:t.params.set}}):s()}}],f=new VueRouter({routes:d,linkActiveClass:"active"}),h=s(15),p=s.n(h);Vue.component("loading",s(17)),Vue.component("error",s(20)),new Vue({router:f,store:new Vuex.Store({state:{subjects:[],sets:[],questions:[],correct:[],wrong:[]},mutations:{subjects:function(t,e){t.subjects=e},sets:function(t,e){t.sets=e},questions:function(t,e){t.questions=e},addCorrect:function(t,e){t.correct.push(e)},addWrong:function(t,e){t.wrong.push(e)},resetQuestion:function(t){t.questions=[],t.correct=[],t.wrong=[]}}}),render:function(t){return t(p.a)}}).$mount("#app")},function(t,e,s){var n=s(0)(s(4),s(5),!1,null,null,null);t.exports=n.exports},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{state:"loading"}},created:function(){this.getSubject()},methods:{getSubject:function(){var t=this;this.state="loading",axios.get("data/subjects.json").then(function(e){t.subjects=e.data,t.state="success"}).catch(function(e){console.log(e),t.state="error"})},openSubject:function(t){this.$router.push({name:"set",params:{subject:t}})}},computed:{subjects:{get:function(){return this.$store.state.subjects},set:function(t){this.$store.commit("subjects",t)}}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["loading"==t.state?s("loading"):"error"==t.state?s("error",{on:{retry:t.getSubject}}):s("div",{staticClass:"pages"},t._l(t.subjects,function(e){return s("div",{staticClass:"card mt-1",on:{click:function(s){t.openSubject(e.name)}}},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"card-title"},[t._v(t._s(e.name))])])])}),0)],1)},staticRenderFns:[]}},function(t,e,s){var n=s(0)(s(7),s(8),!1,null,null,null);t.exports=n.exports},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{state:"loading",error:this.getSubject}},created:function(){this.subjects.length<=0?this.getSubject():this.getData()},methods:{getSubject:function(){var t=this;this.state="loading",axios.get("data/subjects.json").then(function(e){t.state="success",t.subjects=e.data,t.getData()}).catch(function(e){console.log(e),t.state="error"})},getData:function(){var t;for(var e in this.subjects)this.subjects[e].name==this.subject&&(t=this.subjects[e]);void 0==t?(alert("Subject not found"),this.$router.push("/")):this.getSet(t)},getSet:function(t){var e=this;this.state="loading",axios.get(t.data).then(function(t){e.state="success",e.sets=t.data,console.log(t)}).catch(function(t){console.log(t),e.state="error"})}},computed:{subject:function(){return this.$route.params.subject},subjects:{get:function(){return this.$store.state.subjects},set:function(t){this.$store.commit("subjects",t)}},sets:{get:function(){return this.$store.state.sets},set:function(t){this.$store.commit("sets",t)}}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["loading"==t.state?s("loading"):"error"==t.state?s("error",{on:{retry:t.error}}):s("div",{staticClass:"pages"},[s("h1",[t._v("Choose Set of Questions")]),t._v(" "),t._l(t.sets,function(e){return s("div",{staticClass:"card mt-1",on:{click:function(s){t.$router.push(t.subject+"/"+e.name)}}},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"card-title"},[t._v(t._s(e.name))])])])})],2)],1)},staticRenderFns:[]}},function(t,e,s){var n=s(0)(s(10),s(11),!1,null,null,null);t.exports=n.exports},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{state:"loading",number:1,wrong:[],correct:[],answer:null}},created:function(){console.log(this),this.$store.commit("resetQuestion"),this.sets.length<=0?this.$router.push("/"+this.subject):this.getQuestions()},methods:{getQuestions:function(){var t,e=this;for(var s in this.state="loading",this.sets)this.sets[s].name==this.set&&(t=this.sets[s]);void 0==t?(alert("Set not found"),this.$router.push(this.subject)):axios.get(t.data).then(function(t){e.state="success",e.questions=t.data,console.log(t)}).catch(function(t){e.state="error",console.log(t)})},next:function(){null!=this.answer&&(this.answer==this.questions[this.number-1].answer?this.$store.commit("addCorrect",this.number-1):this.$store.commit("addWrong",this.number-1),this.answer=null,$("#choices_form").click(),this.number<this.total?this.number++:this.$router.push("/"+this.subject+"/"+this.set+"/result"))}},computed:{subject:function(){return this.$route.params.subject},set:function(){return this.$route.params.set},sets:{get:function(){return this.$store.state.sets},set:function(t){this.$store.commit("sets",t)}},questions:{get:function(){return this.$store.state.questions},set:function(t){this.$store.commit("questions",t)}},total:function(){return this.questions.length}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["loading"==t.state?s("loading"):"error"==t.state?s("error",{on:{retry:function(e){t.getQuestions()}}}):s("div",{staticClass:"pages"},[s("h1",[t._v(t._s(t.subject)+" "),s("b",[t._v(">")]),t._v(" "+t._s(t.set))]),t._v(" "),s("div",{staticClass:"card mt-1"},[s("div",{staticClass:"card-header"},[s("span",{staticClass:"float-left"},[t._v("Question #"+t._s(t.number))]),t._v(" "),s("span",{staticClass:"float-right"},[t._v(t._s(t.number)+"/"+t._s(t.total))])]),t._v(" "),s("div",{staticClass:"card-body"},[s("h3",[t._v(t._s(t.questions[t.number-1].question))]),t._v(" "),s("form",[t._l(t.questions[t.number-1].choices,function(e,n){return s("label",{staticClass:"form-inline",on:{click:function(e){t.answer=n}}},[s("input",{attrs:{type:"radio",name:"choices"},domProps:{value:n}}),t._v(" "),s("span",[t._v(" "+t._s(e))])])}),t._v(" "),s("input",{staticClass:"d-none",attrs:{type:"reset",id:"choices_form"}})],2)]),t._v(" "),s("div",{staticClass:"card-footer"},[t.number<t.total?s("button",{staticClass:"btn btn-success",on:{click:function(e){t.next()}}},[t._v("Next")]):s("button",{staticClass:"btn btn-info",on:{click:function(e){t.next()}}},[t._v("View Result")])])])])],1)},staticRenderFns:[]}},function(t,e,s){var n=s(0)(s(13),s(14),!1,null,null,null);t.exports=n.exports},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{state:"checking",passing_score:.5}},created:function(){var t=this;setTimeout(function(){t.state="done"},1e3)},computed:{wrong:function(){return this.$store.state.wrong},correct:function(){return this.$store.state.correct},message:function(){return this.ispassed?"Congratulations you passed the exam":"Nice try"},ispassed:function(){var t=this.total*this.passing_score;return this.correct.length>=t},subject:function(){return this.$route.params.subject},set:function(){return this.$route.params.set},subjects:{get:function(){return this.$store.state.subjects},set:function(t){this.$store.commit("subjects",t)}},sets:{get:function(){return this.$store.state.sets},set:function(t){this.$store.commit("sets",t)}},questions:{get:function(){return this.$store.state.questions},set:function(t){this.$store.commit("questions",t)}},total:function(){return this.questions.length}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",["checking"==t.state?s("loading",{attrs:{title:"Checking, please wait"}}):s("div",{staticClass:"pages"},[s("div",{staticClass:"card mt-1"},[s("div",{staticClass:"card-header"},[t._v("RESULTS")]),t._v(" "),s("div",{staticClass:"card-body"},[s("h3",[t._v(t._s(t.message))]),t._v(" "),s("loading",{attrs:{title:"Correct",value:t.correct.length,total:t.total,design:!1,type:"bg-success","custom-style":"padding:0%"}}),t._v(" "),s("loading",{attrs:{title:"Wrong",value:t.wrong.length,total:t.total,design:!1,type:"bg-danger","custom-style":"padding:0%"}})],1),t._v(" "),s("div",{staticClass:"card-footer"},[s("button",{staticClass:"btn btn-success"},[t._v("View Correct")]),t._v(" "),s("button",{staticClass:"btn btn-danger"},[t._v("View Wrong")])])])])],1)},staticRenderFns:[]}},function(t,e,s){var n=s(0)(null,s(16),!1,null,null,null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("nav",{staticClass:"navbar navbar-expand-lg navbar-dark bg-primary"},[e("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[this._v("MOCK EXAM")])],1),this._v(" "),e("router-view")],1)},staticRenderFns:[]}},function(t,e,s){var n=s(0)(s(18),s(19),!1,null,null,null);t.exports=n.exports},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:{default:"Loading..."},value:{default:"75"},total:{default:"100"},type:{default:""},design:{default:!0},customStyle:{default:""}},computed:{has_design:function(){return this.design?" progress-bar-striped progress-bar-animated ":""},width:function(){return this.value/this.total*100}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"loading",style:t.customStyle},[t._v("\n    "+t._s(t.title)+"\n    "),s("div",{staticClass:"progress"},[s("div",{class:"progress-bar "+t.has_design+t.type,style:{width:t.width+"%"},attrs:{role:"progressbar","aria-valuenow":t.value,"aria-valuemin":"0","aria-valuemax":t.total}})])])},staticRenderFns:[]}},function(t,e,s){var n=s(0)(s(21),s(22),!1,null,null,null);t.exports=n.exports},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:{default:"An error occured"},description:{default:"Try to refresh"}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"error card text-white bg-danger mb-3",staticStyle:{"max-width":"20rem"}},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-title"},[t._v(t._s(t.title))]),t._v(" "),s("p",{staticClass:"card-text"},[t._v(t._s(t.description))])]),t._v(" "),s("div",{staticClass:"card-footer"},[s("button",{staticClass:"btn btn-outline-secondary text-white",on:{click:function(e){t.$emit("retry")}}},[t._v("Refresh")])])])},staticRenderFns:[]}},function(t,e){}]);