(self.webpackChunk=self.webpackChunk||[]).push([[5182],{15182:(e,t,a)=>{!function(e){"use strict";e.defineMode("ebnf",(function(t){var a=0,c=1,r=0,n=1,s=2,i=null;return t.bracesMode&&(i=e.getMode(t,t.bracesMode)),{startState:function(){return{stringType:null,commentType:null,braced:0,lhs:!0,localState:null,stack:[],inDefinition:!1}},token:function(t,m){if(t){switch(0===m.stack.length&&('"'==t.peek()||"'"==t.peek()?(m.stringType=t.peek(),t.next(),m.stack.unshift(n)):t.match("/*")?(m.stack.unshift(r),m.commentType=a):t.match("(*")&&(m.stack.unshift(r),m.commentType=c)),m.stack[0]){case n:for(;m.stack[0]===n&&!t.eol();)t.peek()===m.stringType?(t.next(),m.stack.shift()):"\\"===t.peek()?(t.next(),t.next()):t.match(/^.[^\\\"\']*/);return m.lhs?"property string":"string";case r:for(;m.stack[0]===r&&!t.eol();)m.commentType===a&&t.match("*/")||m.commentType===c&&t.match("*)")?(m.stack.shift(),m.commentType=null):t.match(/^.[^\*]*/);return"comment";case s:for(;m.stack[0]===s&&!t.eol();)t.match(/^[^\]\\]+/)||t.match(".")||m.stack.shift();return"operator"}var h=t.peek();if(null!==i&&(m.braced||"{"===h)){null===m.localState&&(m.localState=e.startState(i));var u=i.token(t,m.localState),o=t.current();if(!u)for(var f=0;f<o.length;f++)"{"===o[f]?(0===m.braced&&(u="matchingbracket"),m.braced++):"}"===o[f]&&(m.braced--,0===m.braced&&(u="matchingbracket"));return u}switch(h){case"[":return t.next(),m.stack.unshift(s),"bracket";case":":case"|":case";":return t.next(),"operator";case"%":if(t.match("%%"))return"header";if(t.match(/[%][A-Za-z]+/))return"keyword";if(t.match(/[%][}]/))return"matchingbracket";break;case"/":if(t.match(/[\/][A-Za-z]+/))return"keyword";case"\\":if(t.match(/[\][a-z]+/))return"string-2";case".":if(t.match("."))return"atom";case"*":case"-":case"+":case"^":if(t.match(h))return"atom";case"$":if(t.match("$$"))return"builtin";if(t.match(/[$][0-9]+/))return"variable-3";case"<":if(t.match(/<<[a-zA-Z_]+>>/))return"builtin"}return t.match("//")?(t.skipToEnd(),"comment"):t.match("return")?"operator":t.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)?t.match(/(?=[\(.])/)?"variable":t.match(/(?=[\s\n]*[:=])/)?"def":"variable-2":-1!=["[","]","(",")"].indexOf(t.peek())?(t.next(),"bracket"):(t.eatSpace()||t.next(),null)}}}})),e.defineMIME("text/x-ebnf","ebnf")}(a(25747))}}]);
//# sourceMappingURL=5182.hotloader.js.map