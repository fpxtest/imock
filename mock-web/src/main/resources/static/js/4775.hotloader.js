(self.webpackChunk=self.webpackChunk||[]).push([[4775],{84775:(e,t,r)=>{!function(e){"use strict";e.defineMode("smarty",(function(t,r){var n,i=r.rightDelimiter||"}",a=r.leftDelimiter||"{",o=r.version||2,l=e.getMode(t,r.baseMode||"null"),u=["debug","extends","function","include","literal"],f={operatorChars:/[+\-*&%=<>!?]/,validIdentifier:/[a-zA-Z0-9_]/,stringChar:/['"]/};function s(e,t){return n=t,e}function d(e,t){return null==t&&(t=e.pos),3===o&&"{"==a&&(t==e.string.length||/\s/.test(e.string.charAt(t)))}function p(e,t){for(var r=e.string,o=e.pos;;){var u=r.indexOf(a,o);if(o=u+a.length,-1==u||!d(e,u+a.length))break}if(u==e.pos)return e.match(a),e.eat("*")?function(e,t,r){return t.tokenize=r,r(e,t)}(e,t,(f="comment",s="*"+i,function(e,t){for(;!e.eol();){if(e.match(s)){t.tokenize=p;break}e.next()}return f})):(t.depth++,t.tokenize=c,n="startTag","tag");var f,s;u>-1&&(e.string=r.slice(0,u));var h=l.token(e,t.base);return u>-1&&(e.string=r),h}function c(e,t){if(e.match(i,!0))return 3===o?(t.depth--,t.depth<=0&&(t.tokenize=p)):t.tokenize=p,s("tag",null);if(e.match(a,!0))return t.depth++,s("tag","startTag");var r,l=e.next();if("$"==l)return e.eatWhile(f.validIdentifier),s("variable-2","variable");if("|"==l)return s("operator","pipe");if("."==l)return s("operator","property");if(f.stringChar.test(l))return t.tokenize=(r=l,function(e,t){for(var n=null,i=null;!e.eol();){if(i=e.peek(),e.next()==r&&"\\"!==n){t.tokenize=c;break}n=i}return"string"}),s("string","string");if(f.operatorChars.test(l))return e.eatWhile(f.operatorChars),s("operator","operator");if("["==l||"]"==l)return s("bracket","bracket");if("("==l||")"==l)return s("bracket","operator");if(/\d/.test(l))return e.eatWhile(/\d/),s("number","number");if("variable"==t.last){if("@"==l)return e.eatWhile(f.validIdentifier),s("property","property");if("|"==l)return e.eatWhile(f.validIdentifier),s("qualifier","modifier")}else{if("pipe"==t.last)return e.eatWhile(f.validIdentifier),s("qualifier","modifier");if("whitespace"==t.last)return e.eatWhile(f.validIdentifier),s("attribute","modifier")}if("property"==t.last)return e.eatWhile(f.validIdentifier),s("property",null);if(/\s/.test(l))return n="whitespace",null;var d="";"/"!=l&&(d+=l);for(var h=null;h=e.eat(f.validIdentifier);)d+=h;for(var k=0,b=u.length;k<b;k++)if(u[k]==d)return s("keyword","keyword");return/\s/.test(l)?null:s("tag","tag")}return{startState:function(){return{base:e.startState(l),tokenize:p,last:null,depth:0}},copyState:function(t){return{base:e.copyState(l,t.base),tokenize:t.tokenize,last:t.last,depth:t.depth}},innerMode:function(e){if(e.tokenize==p)return{mode:l,state:e.base}},token:function(e,t){var r=t.tokenize(e,t);return t.last=n,r},indent:function(t,r,n){return t.tokenize==p&&l.indent?l.indent(t.base,r,n):e.Pass},blockCommentStart:a+"*",blockCommentEnd:"*"+i}})),e.defineMIME("text/x-smarty","smarty")}(r(25747))}}]);
//# sourceMappingURL=4775.hotloader.js.map