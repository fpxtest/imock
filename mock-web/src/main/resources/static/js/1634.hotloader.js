(self.webpackChunk=self.webpackChunk||[]).push([[1634],{21634:(e,t,n)=>{!function(e){"use strict";function t(e){for(var t={},n=0;n<e.length;n++)t[e[n]]=!0;return t}var n=t(["_","var","let","class","enum","extension","import","protocol","struct","func","typealias","associatedtype","open","public","internal","fileprivate","private","deinit","init","new","override","self","subscript","super","convenience","dynamic","final","indirect","lazy","required","static","unowned","unowned(safe)","unowned(unsafe)","weak","as","is","break","case","continue","default","else","fallthrough","for","guard","if","in","repeat","switch","where","while","defer","return","inout","mutating","nonmutating","catch","do","rethrows","throw","throws","try","didSet","get","set","willSet","assignment","associativity","infix","left","none","operator","postfix","precedence","precedencegroup","prefix","right","Any","AnyObject","Type","dynamicType","Self","Protocol","__COLUMN__","__FILE__","__FUNCTION__","__LINE__"]),r=t(["var","let","class","enum","extension","import","protocol","struct","func","typealias","associatedtype","for"]),i=t(["true","false","nil","self","super","_"]),a=t(["Array","Bool","Character","Dictionary","Double","Float","Int","Int8","Int16","Int32","Int64","Never","Optional","Set","String","UInt8","UInt16","UInt32","UInt64","Void"]),o=/^\-?0b[01][01_]*/,u=/^\-?0o[0-7][0-7_]*/,c=/^\-?0x[\dA-Fa-f][\dA-Fa-f_]*(?:(?:\.[\dA-Fa-f][\dA-Fa-f_]*)?[Pp]\-?\d[\d_]*)?/,f=/^\-?\d[\d_]*(?:\.\d[\d_]*)?(?:[Ee]\-?\d[\d_]*)?/,l=/^\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1/,s=/^\.(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/,p=/^\#[A-Za-z]+/,d=/^@(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/;function h(e,t,h){if(e.sol()&&(t.indented=e.indentation()),e.eatSpace())return null;var m,k=e.peek();if("/"==k){if(e.match("//"))return e.skipToEnd(),"comment";if(e.match("/*"))return t.tokenize.push(_),_(e,t)}if(e.match(p))return"builtin";if(e.match(d))return"attribute";if(e.match(o))return"number";if(e.match(u))return"number";if(e.match(c))return"number";if(e.match(f))return"number";if(e.match(s))return"property";if("+-/*%=|&<>~^?!".indexOf(k)>-1)return e.next(),"operator";if(":;,.(){}[]".indexOf(k)>-1)return e.next(),e.match(".."),"punctuation";if(m=e.match(/("""|"|')/)){var x=v.bind(null,m[0]);return t.tokenize.push(x),x(e,t)}if(e.match(l)){var w=e.current();return a.hasOwnProperty(w)?"variable-2":i.hasOwnProperty(w)?"atom":n.hasOwnProperty(w)?(r.hasOwnProperty(w)&&(t.prev="define"),"keyword"):"define"==h?"def":"variable"}return e.next(),null}function m(){var e=0;return function(t,n,r){var i=h(t,n,r);if("punctuation"==i)if("("==t.current())++e;else if(")"==t.current()){if(0==e)return t.backUp(1),n.tokenize.pop(),n.tokenize[n.tokenize.length-1](t,n);--e}return i}}function v(e,t,n){for(var r,i=1==e.length,a=!1;r=t.peek();)if(a){if(t.next(),"("==r)return n.tokenize.push(m()),"string";a=!1}else{if(t.match(e))return n.tokenize.pop(),"string";t.next(),a="\\"==r}return i&&n.tokenize.pop(),"string"}function _(e,t){for(var n;e.match(/^[^/*]+/,!0),n=e.next();)"/"===n&&e.eat("*")?t.tokenize.push(_):"*"===n&&e.eat("/")&&t.tokenize.pop();return"comment"}function k(e,t,n){this.prev=e,this.align=t,this.indented=n}function x(e,t){var n=t.match(/^\s*($|\/[\/\*])/,!1)?null:t.column()+1;e.context=new k(e.context,n,e.indented)}function w(e){e.context&&(e.indented=e.context.indented,e.context=e.context.prev)}e.defineMode("swift",(function(e){return{startState:function(){return{prev:null,context:null,indented:0,tokenize:[]}},token:function(e,t){var n=t.prev;t.prev=null;var r=(t.tokenize[t.tokenize.length-1]||h)(e,t,n);if(r&&"comment"!=r?t.prev||(t.prev=r):t.prev=n,"punctuation"==r){var i=/[\(\[\{]|([\]\)\}])/.exec(e.current());i&&(i[1]?w:x)(t,e)}return r},indent:function(t,n){var r=t.context;if(!r)return 0;var i=/^[\]\}\)]/.test(n);return null!=r.align?r.align-(i?1:0):r.indented+(i?0:e.indentUnit)},electricInput:/^\s*[\)\}\]]$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",fold:"brace",closeBrackets:"()[]{}''\"\"``"}})),e.defineMIME("text/x-swift","swift")}(n(25747))}}]);
//# sourceMappingURL=1634.hotloader.js.map