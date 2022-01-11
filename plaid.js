/* eslint-disable no-cond-assign */
/* eslint-disable no-sparse-arrays */
var Plaid = function(t) {
  var r = {};
  function __webpack_require__(o) {
      if (r[o])
          return r[o].exports;
      var i = r[o] = {
          i: o,
          l: !1,
          exports: {}
      };
      return t[o].call(i.exports, i, i.exports, __webpack_require__),
      i.l = !0,
      i.exports
  }
  return __webpack_require__.m = t,
  __webpack_require__.c = r,
  __webpack_require__.d = function(t, r, o) {
      __webpack_require__.o(t, r) || Object.defineProperty(t, r, {
          enumerable: !0,
          get: o
      })
  }
  ,
  __webpack_require__.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
          value: "Module"
      }),
      Object.defineProperty(t, "__esModule", {
          value: !0
      })
  }
  ,
  __webpack_require__.t = function(t, r) {
      if (1 & r && (t = __webpack_require__(t)),
      8 & r)
          return t;
      if (4 & r && "object" == typeof t && t && t.__esModule)
          return t;
      var o = Object.create(null);
      if (__webpack_require__.r(o),
      Object.defineProperty(o, "default", {
          enumerable: !0,
          value: t
      }),
      2 & r && "string" != typeof t)
          for (var i in t)
              __webpack_require__.d(o, i, function(r) {
                  return t[r]
              }
              .bind(null, i));
      return o
  }
  ,
  __webpack_require__.n = function(t) {
      var r = t && t.__esModule ? function getDefault() {
          return t.default
      }
      : function getModuleExports() {
          return t
      }
      ;
      return __webpack_require__.d(r, "a", r),
      r
  }
  ,
  __webpack_require__.o = function(t, r) {
      return Object.prototype.hasOwnProperty.call(t, r)
  }
  ,
  __webpack_require__.p = "https://cdn.plaid.com/link/2.0.1227/",
  __webpack_require__(__webpack_require__.s = 1184)
}([, function(t, r) {
  t.exports = function _interopRequireDefault(t) {
      return t && t.__esModule ? t : {
          default: t
      }
  }
}
, function(t, r, o) {
  (function(r) {
      var check = function(t) {
          return t && t.Math == Math && t
      };
      t.exports = check("object" == typeof globalThis && globalThis) || check("object" == typeof window && window) || check("object" == typeof self && self) || check("object" == typeof r && r) || function() {
          return this
      }() || Function("return this")()
  }
  ).call(this, o(49))
}
, function(t, r) {
  var o = Function.prototype
    , i = o.bind
    , u = o.call
    , c = i && i.bind(u);
  t.exports = i ? function(t) {
      return t && c(u, t)
  }
  : function(t) {
      return t && function() {
          return u.apply(t, arguments)
      }
  }
}
, function(t, r) {
  t.exports = function(t) {
      try {
          return !!t()
      } catch (t) {
          return !0
      }
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(73).f
    , c = o(37)
    , a = o(23)
    , l = o(136)
    , p = o(217)
    , d = o(90);
  t.exports = function(t, r) {
      var o, v, y, g, h, m = t.target, b = t.global, _ = t.stat;
      if (o = b ? i : _ ? i[m] || l(m, {}) : (i[m] || {}).prototype)
          for (v in r) {
              if (g = r[v],
              y = t.noTargetGet ? (h = u(o, v)) && h.value : o[v],
              !d(b ? v : m + (_ ? "." : "#") + v, t.forced) && void 0 !== y) {
                  if (typeof g == typeof y)
                      continue;
                  p(g, y)
              }
              (t.sham || y && y.sham) && c(g, "sham", !0),
              a(o, v, g, t)
          }
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(122)
    , c = o(15)
    , a = o(126)
    , l = o(161)
    , p = o(181)
    , d = u("wks")
    , v = i.Symbol
    , y = v && v.for
    , g = p ? v : v && v.withoutSetter || a;
  t.exports = function(t) {
      if (!c(d, t) || !l && "string" != typeof d[t]) {
          var r = "Symbol." + t;
          l && c(v, t) ? d[t] = v[t] : d[t] = p && y ? y(r) : g(r)
      }
      return d[t]
  }
}
, , function(t, r) {
  t.exports = function(t) {
      return "function" == typeof t
  }
}
, , function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(46).map;
  i({
      target: "Array",
      proto: !0,
      forced: !o(99)("map")
  }, {
      map: function map(t) {
          return u(this, t, arguments.length > 1 ? arguments[1] : void 0)
      }
  })
}
, function(t, r) {
  var o = Function.prototype.call;
  t.exports = o.bind ? o.bind(o) : function() {
      return o.apply(o, arguments)
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(16)
    , c = i.String
    , a = i.TypeError;
  t.exports = function(t) {
      if (u(t))
          return t;
      throw a(c(t) + " is not an object")
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(71)
    , c = i.String;
  t.exports = function(t) {
      if ("Symbol" === u(t))
          throw TypeError("Cannot convert a Symbol value to a string");
      return c(t)
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(100);
  i({
      target: "RegExp",
      proto: !0,
      forced: /./.exec !== u
  }, {
      exec: u
  })
}
, function(t, r, o) {
  var i = o(3)
    , u = o(28)
    , c = i({}.hasOwnProperty);
  t.exports = Object.hasOwn || function hasOwn(t, r) {
      return c(u(t), r)
  }
}
, function(t, r, o) {
  var i = o(8);
  t.exports = function(t) {
      return "object" == typeof t ? null !== t : i(t)
  }
}
, , function(t, r, o) {
  var i = o(138)
    , u = o(23)
    , c = o(262);
  i || u(Object.prototype, "toString", c, {
      unsafe: !0
  })
}
, function(t, r, o) {
  var i = o(4);
  t.exports = !i((function() {
      return 7 != Object.defineProperty({}, 1, {
          get: function() {
              return 7
          }
      })[1]
  }
  ))
}
, function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(2)
    , c = o(4)
    , a = o(121)
    , l = o(16)
    , p = o(28)
    , d = o(32)
    , v = o(144)
    , y = o(177)
    , g = o(99)
    , h = o(6)
    , m = o(63)
    , b = h("isConcatSpreadable")
    , _ = 9007199254740991
    , x = "Maximum allowed index exceeded"
    , w = u.TypeError
    , S = m >= 51 || !c((function() {
      var t = [];
      return t[b] = !1,
      t.concat()[0] !== t
  }
  ))
    , E = g("concat")
    , isConcatSpreadable = function(t) {
      if (!l(t))
          return !1;
      var r = t[b];
      return void 0 !== r ? !!r : a(t)
  };
  i({
      target: "Array",
      proto: !0,
      forced: !S || !E
  }, {
      concat: function concat(t) {
          var r, o, i, u, c, a = p(this), l = y(a, 0), g = 0;
          for (r = -1,
          i = arguments.length; r < i; r++)
              if (isConcatSpreadable(c = -1 === r ? a : arguments[r])) {
                  if (g + (u = d(c)) > _)
                      throw w(x);
                  for (o = 0; o < u; o++,
                  g++)
                      o in c && v(l, g, c[o])
              } else {
                  if (g >= _)
                      throw w(x);
                  v(l, g++, c)
              }
          return l.length = g,
          l
      }
  })
}
, , function(t, r, o) {
  var i = o(2)
    , u = o(19)
    , c = o(182)
    , a = o(12)
    , l = o(109)
    , p = i.TypeError
    , d = Object.defineProperty;
  r.f = u ? d : function defineProperty(t, r, o) {
      if (a(t),
      r = l(r),
      a(o),
      c)
          try {
              return d(t, r, o)
          } catch (t) {}
      if ("get"in o || "set"in o)
          throw p("Accessors not supported");
      return "value"in o && (t[r] = o.value),
      t
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(8)
    , c = o(15)
    , a = o(37)
    , l = o(136)
    , p = o(105)
    , d = o(38)
    , v = o(70).CONFIGURABLE
    , y = d.get
    , g = d.enforce
    , h = String(String).split("String");
  (t.exports = function(t, r, o, p) {
      var d, y = !!p && !!p.unsafe, m = !!p && !!p.enumerable, b = !!p && !!p.noTargetGet, _ = p && void 0 !== p.name ? p.name : r;
      u(o) && ("Symbol(" === String(_).slice(0, 7) && (_ = "[" + String(_).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
      (!c(o, "name") || v && o.name !== _) && a(o, "name", _),
      (d = g(o)).source || (d.source = h.join("string" == typeof _ ? _ : ""))),
      t !== i ? (y ? !b && t[r] && (m = !0) : delete t[r],
      m ? t[r] = o : a(t, r, o)) : m ? t[r] = o : l(r, o)
  }
  )(Function.prototype, "toString", (function toString() {
      return u(this) && y(this).source || p(this)
  }
  ))
}
, , , , , function(t, r, o) {
  var i = o(2)
    , u = o(29)
    , c = i.Object;
  t.exports = function(t) {
      return c(u(t))
  }
}
, function(t, r, o) {
  var i = o(2).TypeError;
  t.exports = function(t) {
      if (null == t)
          throw i("Can't call method on " + t);
      return t
  }
}
, , , function(t, r, o) {
  var i = o(60);
  t.exports = function(t) {
      return i(t.length)
  }
}
, , , , function(t, r, o) {
  var i = o(19)
    , u = o(70).EXISTS
    , c = o(3)
    , a = o(22).f
    , l = Function.prototype
    , p = c(l.toString)
    , d = /^\s*function ([^ (]*)/
    , v = c(d.exec);
  i && !u && a(l, "name", {
      configurable: !0,
      get: function() {
          try {
              return v(d, p(this))[1]
          } catch (t) {
              return ""
          }
      }
  })
}
, function(t, r, o) {
  var i = o(19)
    , u = o(22)
    , c = o(68);
  t.exports = i ? function(t, r, o) {
      return u.f(t, r, c(1, o))
  }
  : function(t, r, o) {
      return t[r] = o,
      t
  }
}
, function(t, r, o) {
  var i, u, c, a = o(252), l = o(2), p = o(3), d = o(16), v = o(37), y = o(15), g = o(135), h = o(124), m = o(111), b = "Object already initialized", _ = l.TypeError, x = l.WeakMap;
  if (a || g.state) {
      var w = g.state || (g.state = new x)
        , S = p(w.get)
        , E = p(w.has)
        , O = p(w.set);
      i = function(t, r) {
          if (E(w, t))
              throw new _(b);
          return r.facade = t,
          O(w, t, r),
          r
      }
      ,
      u = function(t) {
          return S(w, t) || {}
      }
      ,
      c = function(t) {
          return E(w, t)
      }
  } else {
      var I = h("state");
      m[I] = !0,
      i = function(t, r) {
          if (y(t, I))
              throw new _(b);
          return r.facade = t,
          v(t, I, r),
          r
      }
      ,
      u = function(t) {
          return y(t, I) ? t[I] : {}
      }
      ,
      c = function(t) {
          return y(t, I)
      }
  }
  t.exports = {
      set: i,
      get: u,
      has: c,
      enforce: function(t) {
          return c(t) ? u(t) : i(t, {})
      },
      getterFor: function(t) {
          return function(r) {
              var o;
              if (!d(r) || (o = u(r)).type !== t)
                  throw _("Incompatible receiver, " + t + " required");
              return o
          }
      }
  }
}
, , , function(t, r, o) {
  "use strict";
  var i = o(88)
    , u = o(11)
    , c = o(3)
    , a = o(116)
    , l = o(4)
    , p = o(12)
    , d = o(8)
    , v = o(57)
    , y = o(60)
    , g = o(13)
    , h = o(29)
    , m = o(152)
    , b = o(61)
    , _ = o(256)
    , x = o(117)
    , w = o(6)("replace")
    , S = Math.max
    , E = Math.min
    , O = c([].concat)
    , I = c([].push)
    , A = c("".indexOf)
    , T = c("".slice)
    , k = "$0" === "a".replace(/./, "$0")
    , P = !!/./[w] && "" === /./[w]("a", "$0");
  a("replace", (function(t, r, o) {
      var c = P ? "$" : "$0";
      return [function replace(t, o) {
          var i = h(this)
            , c = null == t ? void 0 : b(t, w);
          return c ? u(c, t, i, o) : u(r, g(i), t, o)
      }
      , function(t, u) {
          var a = p(this)
            , l = g(t);
          if ("string" == typeof u && -1 === A(u, c) && -1 === A(u, "$<")) {
              var h = o(r, a, l, u);
              if (h.done)
                  return h.value
          }
          var b = d(u);
          b || (u = g(u));
          var w = a.global;
          if (w) {
              var k = a.unicode;
              a.lastIndex = 0
          }
          for (var P = []; ; ) {
              var N = x(a, l);
              if (null === N)
                  break;
              if (I(P, N),
              !w)
                  break;
              "" === g(N[0]) && (a.lastIndex = m(l, y(a.lastIndex), k))
          }
          for (var L, j = "", R = 0, M = 0; M < P.length; M++) {
              for (var C = g((N = P[M])[0]), U = S(E(v(N.index), l.length), 0), D = [], V = 1; V < N.length; V++)
                  I(D, void 0 === (L = N[V]) ? L : String(L));
              var W = N.groups;
              if (b) {
                  var q = O([C], D, U, l);
                  void 0 !== W && I(q, W);
                  var H = g(i(u, void 0, q))
              } else
                  H = _(C, l, U, D, W, u);
              U >= R && (j += T(l, R, U) + H,
              R = U + C.length)
          }
          return j + T(l, R)
      }
      ]
  }
  ), !!l((function() {
      var t = /./;
      return t.exec = function() {
          var t = [];
          return t.groups = {
              a: "7"
          },
          t
      }
      ,
      "7" !== "".replace(t, "$<a>")
  }
  )) || !k || P)
}
, function(t, r, o) {
  var i = o(79)
    , u = o(29);
  t.exports = function(t) {
      return i(u(t))
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(8)
    , aFunction = function(t) {
      return u(t) ? t : void 0
  };
  t.exports = function(t, r) {
      return arguments.length < 2 ? aFunction(i[t]) : i[t] && i[t][r]
  }
}
, , function(t, r, o) {
  var i = o(258)
    , u = o(259)
    , c = o(260);
  t.exports = function _slicedToArray(t, r) {
      return i(t) || u(t, r) || c()
  }
}
, function(t, r, o) {
  var i = o(54)
    , u = o(3)
    , c = o(79)
    , a = o(28)
    , l = o(32)
    , p = o(177)
    , d = u([].push)
    , createMethod = function(t) {
      var r = 1 == t
        , o = 2 == t
        , u = 3 == t
        , v = 4 == t
        , y = 6 == t
        , g = 7 == t
        , h = 5 == t || y;
      return function(m, b, _, x) {
          for (var w, S, E = a(m), O = c(E), I = i(b, _), A = l(O), T = 0, k = x || p, P = r ? k(m, A) : o || g ? k(m, 0) : void 0; A > T; T++)
              if ((h || T in O) && (S = I(w = O[T], T, E),
              t))
                  if (r)
                      P[T] = S;
                  else if (S)
                      switch (t) {
                      case 3:
                          return !0;
                      case 5:
                          return w;
                      case 6:
                          return T;
                      case 2:
                          d(P, w)
                      }
                  else
                      switch (t) {
                      case 4:
                          return !1;
                      case 7:
                          d(P, w)
                      }
          return y ? -1 : u || v ? v : P
      }
  };
  t.exports = {
      forEach: createMethod(0),
      map: createMethod(1),
      filter: createMethod(2),
      some: createMethod(3),
      every: createMethod(4),
      find: createMethod(5),
      findIndex: createMethod(6),
      filterReject: createMethod(7)
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(46).filter;
  i({
      target: "Array",
      proto: !0,
      forced: !o(99)("filter")
  }, {
      filter: function filter(t) {
          return u(this, t, arguments.length > 1 ? arguments[1] : void 0)
      }
  })
}
, function(t, r, o) {
  var i = o(3);
  t.exports = i({}.isPrototypeOf)
}
, function(t, r) {
  var o;
  o = function() {
      return this
  }();
  try {
      o = o || new Function("return this")()
  } catch (t) {
      "object" == typeof window && (o = window)
  }
  t.exports = o
}
, function(t, r, o) {
  var i = o(2)
    , u = o(8)
    , c = o(93)
    , a = i.TypeError;
  t.exports = function(t) {
      if (u(t))
          return t;
      throw a(c(t) + " is not a function")
  }
}
, , , function(t, r, o) {
  "use strict";
  var i = o(3)
    , u = o(70).PROPER
    , c = o(23)
    , a = o(12)
    , l = o(48)
    , p = o(13)
    , d = o(4)
    , v = o(139)
    , y = "toString"
    , g = RegExp.prototype
    , h = g.toString
    , m = i(v)
    , b = d((function() {
      return "/a/b" != h.call({
          source: "a",
          flags: "b"
      })
  }
  ))
    , _ = u && h.name != y;
  (b || _) && c(RegExp.prototype, y, (function toString() {
      var t = a(this)
        , r = p(t.source)
        , o = t.flags;
      return "/" + r + "/" + p(void 0 === o && l(g, t) && !("flags"in g) ? m(t) : o)
  }
  ), {
      unsafe: !0
  })
}
, function(t, r, o) {
  var i = o(3)
    , u = o(50)
    , c = i(i.bind);
  t.exports = function(t, r) {
      return u(t),
      void 0 === r ? t : c ? c(t, r) : function() {
          return t.apply(r, arguments)
      }
  }
}
, , function(t, r, o) {
  var i = o(43);
  t.exports = i("navigator", "userAgent") || ""
}
, function(t, r) {
  var o = Math.ceil
    , i = Math.floor;
  t.exports = function(t) {
      var r = +t;
      return r != r || 0 === r ? 0 : (r > 0 ? i : o)(r)
  }
}
, function(t, r, o) {
  var i = o(3);
  t.exports = i([].slice)
}
, function(t, r, o) {
  var i = o(3)
    , u = i({}.toString)
    , c = i("".slice);
  t.exports = function(t) {
      return c(u(t), 8, -1)
  }
}
, function(t, r, o) {
  var i = o(57)
    , u = Math.min;
  t.exports = function(t) {
      return t > 0 ? u(i(t), 9007199254740991) : 0
  }
}
, function(t, r, o) {
  var i = o(50);
  t.exports = function(t, r) {
      var o = t[r];
      return null == o ? void 0 : i(o)
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(4);
  t.exports = function(t, r) {
      var o = [][t];
      return !!o && i((function() {
          o.call(null, r || function() {
              throw 1
          }
          , 1)
      }
      ))
  }
}
, function(t, r, o) {
  var i, u, c = o(2), a = o(56), l = c.process, p = c.Deno, d = l && l.versions || p && p.version, v = d && d.v8;
  v && (u = (i = v.split("."))[0] > 0 && i[0] < 4 ? 1 : +(i[0] + i[1])),
  !u && a && (!(i = a.match(/Edge\/(\d+)/)) || i[1] >= 74) && (i = a.match(/Chrome\/(\d+)/)) && (u = +i[1]),
  t.exports = u
}
, , , function(t, r) {
  t.exports = !1
}
, function(t, r, o) {
  var i, u = o(12), c = o(192), a = o(137), l = o(111), p = o(193), d = o(113), v = o(124), y = v("IE_PROTO"), EmptyConstructor = function() {}, scriptTag = function(t) {
      return "<script>" + t + "</" + "script>"
  }, NullProtoObjectViaActiveX = function(t) {
      t.write(scriptTag("")),
      t.close();
      var r = t.parentWindow.Object;
      return t = null,
      r
  }, NullProtoObject = function() {
      try {
          i = new ActiveXObject("htmlfile")
      } catch (t) {}
      var t, r;
      NullProtoObject = "undefined" != typeof document ? document.domain && i ? NullProtoObjectViaActiveX(i) : ((r = d("iframe")).style.display = "none",
      p.appendChild(r),
      r.src = String("javascript:"),
      (t = r.contentWindow.document).open(),
      t.write(scriptTag("document.F=Object")),
      t.close(),
      t.F) : NullProtoObjectViaActiveX(i);
      for (var o = a.length; o--; )
          delete NullProtoObject.prototype[a[o]];
      return NullProtoObject()
  };
  l[y] = !0,
  t.exports = Object.create || function create(t, r) {
      var o;
      return null !== t ? (EmptyConstructor.prototype = u(t),
      o = new EmptyConstructor,
      EmptyConstructor.prototype = null,
      o[y] = t) : o = NullProtoObject(),
      void 0 === r ? o : c(o, r)
  }
}
, function(t, r) {
  t.exports = function(t, r) {
      return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: r
      }
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(2)
    , c = o(121)
    , a = o(106)
    , l = o(16)
    , p = o(120)
    , d = o(32)
    , v = o(42)
    , y = o(144)
    , g = o(6)
    , h = o(99)
    , m = o(58)
    , b = h("slice")
    , _ = g("species")
    , x = u.Array
    , w = Math.max;
  i({
      target: "Array",
      proto: !0,
      forced: !b
  }, {
      slice: function slice(t, r) {
          var o, i, u, g = v(this), h = d(g), b = p(t, h), S = p(void 0 === r ? h : r, h);
          if (c(g) && (o = g.constructor,
          (a(o) && (o === x || c(o.prototype)) || l(o) && null === (o = o[_])) && (o = void 0),
          o === x || void 0 === o))
              return m(g, b, S);
          for (i = new (void 0 === o ? x : o)(w(S - b, 0)),
          u = 0; b < S; b++,
          u++)
              b in g && y(i, u, g[b]);
          return i.length = u,
          i
      }
  })
}
, function(t, r, o) {
  var i = o(19)
    , u = o(15)
    , c = Function.prototype
    , a = i && Object.getOwnPropertyDescriptor
    , l = u(c, "name")
    , p = l && "something" === function something() {}
  .name
    , d = l && (!i || i && a(c, "name").configurable);
  t.exports = {
      EXISTS: l,
      PROPER: p,
      CONFIGURABLE: d
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(138)
    , c = o(8)
    , a = o(59)
    , l = o(6)("toStringTag")
    , p = i.Object
    , d = "Arguments" == a(function() {
      return arguments
  }());
  t.exports = u ? a : function(t) {
      var r, o, i;
      return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (o = function(t, r) {
          try {
              return t[r]
          } catch (t) {}
      }(r = p(t), l)) ? o : d ? a(r) : "Object" == (i = a(r)) && c(r.callee) ? "Arguments" : i
  }
}
, , function(t, r, o) {
  var i = o(19)
    , u = o(11)
    , c = o(143)
    , a = o(68)
    , l = o(42)
    , p = o(109)
    , d = o(15)
    , v = o(182)
    , y = Object.getOwnPropertyDescriptor;
  r.f = i ? y : function getOwnPropertyDescriptor(t, r) {
      if (t = l(t),
      r = p(r),
      v)
          try {
              return y(t, r)
          } catch (t) {}
      if (d(t, r))
          return a(!u(c.f, t, r), t[r])
  }
}
, , , , , function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(3)
    , c = o(115).indexOf
    , a = o(62)
    , l = u([].indexOf)
    , p = !!l && 1 / l([1], 1, -0) < 0
    , d = a("indexOf");
  i({
      target: "Array",
      proto: !0,
      forced: p || !d
  }, {
      indexOf: function indexOf(t) {
          var r = arguments.length > 1 ? arguments[1] : void 0;
          return p ? l(this, t, r) || 0 : c(this, t, r)
      }
  })
}
, function(t, r, o) {
  var i = o(2)
    , u = o(3)
    , c = o(4)
    , a = o(59)
    , l = i.Object
    , p = u("".split);
  t.exports = c((function() {
      return !l("z").propertyIsEnumerable(0)
  }
  )) ? function(t) {
      return "String" == a(t) ? p(t, "") : l(t)
  }
  : l
}
, , , function(t, r, o) {
  var i = o(183)
    , u = o(137).concat("length", "prototype");
  r.f = Object.getOwnPropertyNames || function getOwnPropertyNames(t) {
      return i(t, u)
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(88)
    , u = o(11)
    , c = o(3)
    , a = o(116)
    , l = o(146)
    , p = o(12)
    , d = o(29)
    , v = o(142)
    , y = o(152)
    , g = o(60)
    , h = o(13)
    , m = o(61)
    , b = o(58)
    , _ = o(117)
    , x = o(100)
    , w = o(140)
    , S = o(4)
    , E = w.UNSUPPORTED_Y
    , O = 4294967295
    , I = Math.min
    , A = [].push
    , T = c(/./.exec)
    , k = c(A)
    , P = c("".slice);
  a("split", (function(t, r, o) {
      var c;
      return c = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function(t, o) {
          var c = h(d(this))
            , a = void 0 === o ? O : o >>> 0;
          if (0 === a)
              return [];
          if (void 0 === t)
              return [c];
          if (!l(t))
              return u(r, c, t, a);
          for (var p, v, y, g = [], m = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), _ = 0, w = new RegExp(t.source,m + "g"); (p = u(x, w, c)) && !((v = w.lastIndex) > _ && (k(g, P(c, _, p.index)),
          p.length > 1 && p.index < c.length && i(A, g, b(p, 1)),
          y = p[0].length,
          _ = v,
          g.length >= a)); )
              w.lastIndex === p.index && w.lastIndex++;
          return _ === c.length ? !y && T(w, "") || k(g, "") : k(g, P(c, _)),
          g.length > a ? b(g, 0, a) : g
      }
      : "0".split(void 0, 0).length ? function(t, o) {
          return void 0 === t && 0 === o ? [] : u(r, this, t, o)
      }
      : r,
      [function split(r, o) {
          var i = d(this)
            , a = null == r ? void 0 : m(r, t);
          return a ? u(a, r, i, o) : u(c, h(i), r, o)
      }
      , function(t, i) {
          var u = p(this)
            , a = h(t)
            , l = o(c, u, a, i, c !== r);
          if (l.done)
              return l.value;
          var d = v(u, RegExp)
            , m = u.unicode
            , b = (u.ignoreCase ? "i" : "") + (u.multiline ? "m" : "") + (u.unicode ? "u" : "") + (E ? "g" : "y")
            , x = new d(E ? "^(?:" + u.source + ")" : u,b)
            , w = void 0 === i ? O : i >>> 0;
          if (0 === w)
              return [];
          if (0 === a.length)
              return null === _(x, a) ? [a] : [];
          for (var S = 0, A = 0, T = []; A < a.length; ) {
              x.lastIndex = E ? 0 : A;
              var N, L = _(x, E ? P(a, A) : a);
              if (null === L || (N = I(g(x.lastIndex + (E ? A : 0)), a.length)) === S)
                  A = y(a, A, m);
              else {
                  if (k(T, P(a, S, A)),
                  T.length === w)
                      return T;
                  for (var j = 1; j <= L.length - 1; j++)
                      if (k(T, L[j]),
                      T.length === w)
                          return T;
                  A = S = N
              }
          }
          return k(T, P(a, S)),
          T
      }
      ]
  }
  ), !!S((function() {
      var t = /(?:)/
        , r = t.exec;
      t.exec = function() {
          return r.apply(this, arguments)
      }
      ;
      var o = "ab".split(t);
      return 2 !== o.length || "a" !== o[0] || "b" !== o[1]
  }
  )), E)
}
, function(t, r, o) {
  "use strict";
  Object.defineProperty(r, "__esModule", {
      value: !0
  }),
  r.FLEXIBLE_INPUT_OVERWRITE_STATUSES = r.CREATE_PARAMETERS = r.VERSION = r.DEFAULT_LANGUAGE = r.I18N_SUPPORTED_LANGUAGES = r.PRODUCTS_API_V2_BETA = r.PRODUCTS_API_V2 = r.PRODUCTS_API_V2_ONLY = r.PRODUCTS_API_V1 = r.PLAID_WEBVIEW_NAMESPACE = r.PLAID_INTERNAL_NAMESPACE = r.PLAID_LINK_BUTTON_ID = r.LINK_CLIENT_URL = r.ENVIRONMENTS_TO_DOMAIN = r.INTERNAL_ENVIRONMENTS_API_V2 = r.EXTERNAL_ENVIRONMENTS_API_V2 = r.INTERNAL_ENVIRONMENTS_API_V1 = r.EXTERNAL_ENVIRONMENTS_API_V1 = r.API_VERSIONS = void 0;
  r.API_VERSIONS = ["v1", "v2"];
  r.EXTERNAL_ENVIRONMENTS_API_V1 = ["tartan", "production"];
  r.INTERNAL_ENVIRONMENTS_API_V1 = ["testing", "tartan", "production"];
  r.EXTERNAL_ENVIRONMENTS_API_V2 = ["sandbox", "development", "production"];
  r.INTERNAL_ENVIRONMENTS_API_V2 = ["end2end", "devenv", "testing", "sandbox", "development", "production"];
  r.ENVIRONMENTS_TO_DOMAIN = {
      devenv: "http://localhost:8082",
      testing: "https://api-v2-testing.plaid.com",
      tartan: "https://development.plaid.com",
      development: "https://development.plaid.com",
      sandbox: "https://sandbox.plaid.com",
      production: "https://production.plaid.com"
  };
  r.LINK_CLIENT_URL = "https://cdn.plaid.com/link/2.0.1227";
  r.PLAID_LINK_BUTTON_ID = "plaid-link-button";
  r.PLAID_INTERNAL_NAMESPACE = "plaid_link";
  r.PLAID_WEBVIEW_NAMESPACE = "plaidlink";
  r.PRODUCTS_API_V1 = ["auth", "connect", "income", "info"];
  r.PRODUCTS_API_V2_ONLY = ["account_verify", "assets", "bank_transfer", "transfer", "ddta", "deposit_switch", "holdings", "income_verification", "investments_auth", "investments", "liabilities", "payment_initiation", "sba_verification", "liabilities_report"];
  r.PRODUCTS_API_V2 = ["account_verify", "assets", "auth", "transfer", "bank_transfer", "ddta", "deposit_switch", "holdings", "identity", "income", "income_verification", "investments_auth", "investments", "liabilities", "payment_initiation", "transactions", "sba_verification", "liabilities_report"];
  r.PRODUCTS_API_V2_BETA = ["account_verify", "bank_transfer", "transfer", "holdings", "investments_auth", "ddta", "payment_initiation", "deposit_switch", "sba_verification", "liabilities_report", "income_verification"];
  r.I18N_SUPPORTED_LANGUAGES = ["en", "es", "fr"];
  r.DEFAULT_LANGUAGE = "en";
  r.VERSION = "2.0.1227";
  r.CREATE_PARAMETERS = ["apiVersion", "clientName", "configUserId", "configUserTags", "countryCodes", "customizations", "depositSwitchToken", "enableThreadsDemo", "env", "experimentVariants", "forceIframe", "isEmbedded", "isSimpleIntegration", "key", "language", "linkCustomizationName", "longtail", "longTail", "oauthNonce", "oauthStateId", "oauthRedirectUri", "onEvent", "onExit", "onLoad", "onSuccess", "onResult", "paymentToken", "product", "receivedRedirectUri", "accountSubtypes", "selectAccount", "token", "useMobileWindow", "user", "userLegalName", "userEmailAddress", "userPhoneNumber", "webhook", "workflowVersionOverride"];
  r.FLEXIBLE_INPUT_OVERWRITE_STATUSES = ["choose_device"]
}
, , , function(t, r, o) {
  var i = o(5)
    , u = o(28)
    , c = o(104);
  i({
      target: "Object",
      stat: !0,
      forced: o(4)((function() {
          c(1)
      }
      ))
  }, {
      keys: function keys(t) {
          return c(u(t))
      }
  })
}
, function(t, r) {
  var o = Function.prototype
    , i = o.apply
    , u = o.bind
    , c = o.call;
  t.exports = "object" == typeof Reflect && Reflect.apply || (u ? c.bind(i) : function() {
      return c.apply(i, arguments)
  }
  )
}
, , function(t, r, o) {
  var i = o(4)
    , u = o(8)
    , c = /#|\.prototype\./
    , isForced = function(t, r) {
      var o = l[a(t)];
      return o == d || o != p && (u(r) ? i(r) : !!r)
  }
    , a = isForced.normalize = function(t) {
      return String(t).replace(c, ".").toLowerCase()
  }
    , l = isForced.data = {}
    , p = isForced.NATIVE = "N"
    , d = isForced.POLYFILL = "P";
  t.exports = isForced
}
, , function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(3)
    , c = o(79)
    , a = o(42)
    , l = o(62)
    , p = u([].join)
    , d = c != Object
    , v = l("join", ",");
  i({
      target: "Array",
      proto: !0,
      forced: d || !v
  }, {
      join: function join(t) {
          return p(a(this), void 0 === t ? "," : t)
      }
  })
}
, function(t, r, o) {
  var i = o(2).String;
  t.exports = function(t) {
      try {
          return i(t)
      } catch (t) {
          return "Object"
      }
  }
}
, , , function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(201).left
    , c = o(62)
    , a = o(63)
    , l = o(118);
  i({
      target: "Array",
      proto: !0,
      forced: !c("reduce") || !l && a > 79 && a < 83
  }, {
      reduce: function reduce(t) {
          var r = arguments.length;
          return u(this, t, r, r > 1 ? arguments[1] : void 0)
      }
  })
}
, , function(t, r, o) {
  var i = o(3)
    , u = o(12)
    , c = o(255);
  t.exports = Object.setPrototypeOf || ("__proto__"in {} ? function() {
      var t, r = !1, o = {};
      try {
          (t = i(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(o, []),
          r = o instanceof Array
      } catch (t) {}
      return function setPrototypeOf(o, i) {
          return u(o),
          c(i),
          r ? t(o, i) : o.__proto__ = i,
          o
      }
  }() : void 0)
}
, function(t, r, o) {
  var i = o(4)
    , u = o(6)
    , c = o(63)
    , a = u("species");
  t.exports = function(t) {
      return c >= 51 || !i((function() {
          var r = [];
          return (r.constructor = {})[a] = function() {
              return {
                  foo: 1
              }
          }
          ,
          1 !== r[t](Boolean).foo
      }
      ))
  }
}
, function(t, r, o) {
  "use strict";
  var i, u, c = o(11), a = o(3), l = o(13), p = o(139), d = o(140), v = o(122), y = o(67), g = o(38).get, h = o(184), m = o(185), b = v("native-string-replace", String.prototype.replace), _ = RegExp.prototype.exec, x = _, w = a("".charAt), S = a("".indexOf), E = a("".replace), O = a("".slice), I = (u = /b*/g,
  c(_, i = /a/, "a"),
  c(_, u, "a"),
  0 !== i.lastIndex || 0 !== u.lastIndex), A = d.UNSUPPORTED_Y || d.BROKEN_CARET, T = void 0 !== /()??/.exec("")[1];
  (I || T || A || h || m) && (x = function exec(t) {
      var r, o, i, u, a, d, v, h = this, m = g(h), k = l(t), P = m.raw;
      if (P)
          return P.lastIndex = h.lastIndex,
          r = c(x, P, k),
          h.lastIndex = P.lastIndex,
          r;
      var N = m.groups
        , L = A && h.sticky
        , j = c(p, h)
        , R = h.source
        , M = 0
        , C = k;
      if (L && (j = E(j, "y", ""),
      -1 === S(j, "g") && (j += "g"),
      C = O(k, h.lastIndex),
      h.lastIndex > 0 && (!h.multiline || h.multiline && "\n" !== w(k, h.lastIndex - 1)) && (R = "(?: " + R + ")",
      C = " " + C,
      M++),
      o = new RegExp("^(?:" + R + ")",j)),
      T && (o = new RegExp("^" + R + "$(?!\\s)",j)),
      I && (i = h.lastIndex),
      u = c(_, L ? o : h, C),
      L ? u ? (u.input = O(u.input, M),
      u[0] = O(u[0], M),
      u.index = h.lastIndex,
      h.lastIndex += u[0].length) : h.lastIndex = 0 : I && u && (h.lastIndex = h.global ? u.index + u[0].length : i),
      T && u && u.length > 1 && c(b, u[0], o, (function() {
          for (a = 1; a < arguments.length - 2; a++)
              void 0 === arguments[a] && (u[a] = void 0)
      }
      )),
      u && N)
          for (u.groups = d = y(null),
          a = 0; a < N.length; a++)
              d[(v = N[a])[0]] = u[v[1]];
      return u
  }
  ),
  t.exports = x
}
, , , function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(3)
    , c = o(50)
    , a = o(28)
    , l = o(32)
    , p = o(13)
    , d = o(4)
    , v = o(166)
    , y = o(62)
    , g = o(224)
    , h = o(225)
    , m = o(63)
    , b = o(226)
    , _ = []
    , x = u(_.sort)
    , w = u(_.push)
    , S = d((function() {
      _.sort(void 0)
  }
  ))
    , E = d((function() {
      _.sort(null)
  }
  ))
    , O = y("sort")
    , I = !d((function() {
      if (m)
          return m < 70;
      if (!(g && g > 3)) {
          if (h)
              return !0;
          if (b)
              return b < 603;
          var t, r, o, i, u = "";
          for (t = 65; t < 76; t++) {
              switch (r = String.fromCharCode(t),
              t) {
              case 66:
              case 69:
              case 70:
              case 72:
                  o = 3;
                  break;
              case 68:
              case 71:
                  o = 4;
                  break;
              default:
                  o = 2
              }
              for (i = 0; i < 47; i++)
                  _.push({
                      k: r + i,
                      v: o
                  })
          }
          for (_.sort((function(t, r) {
              return r.v - t.v
          }
          )),
          i = 0; i < _.length; i++)
              r = _[i].k.charAt(0),
              u.charAt(u.length - 1) !== r && (u += r);
          return "DGBEFHACIJK" !== u
      }
  }
  ));
  i({
      target: "Array",
      proto: !0,
      forced: S || !E || !O || !I
  }, {
      sort: function sort(t) {
          void 0 !== t && c(t);
          var r = a(this);
          if (I)
              return void 0 === t ? x(r) : x(r, t);
          var o, i, u = [], d = l(r);
          for (i = 0; i < d; i++)
              i in r && w(u, r[i]);
          for (v(u, function(t) {
              return function(r, o) {
                  return void 0 === o ? -1 : void 0 === r ? 1 : void 0 !== t ? +t(r, o) || 0 : p(r) > p(o) ? 1 : -1
              }
          }(t)),
          o = u.length,
          i = 0; i < o; )
              r[i] = u[i++];
          for (; i < d; )
              delete r[i++];
          return r
      }
  })
}
, function(t, r, o) {
  var i = o(183)
    , u = o(137);
  t.exports = Object.keys || function keys(t) {
      return i(t, u)
  }
}
, function(t, r, o) {
  var i = o(3)
    , u = o(8)
    , c = o(135)
    , a = i(Function.toString);
  u(c.inspectSource) || (c.inspectSource = function(t) {
      return a(t)
  }
  ),
  t.exports = c.inspectSource
}
, function(t, r, o) {
  var i = o(3)
    , u = o(4)
    , c = o(8)
    , a = o(71)
    , l = o(43)
    , p = o(105)
    , noop = function() {}
    , d = []
    , v = l("Reflect", "construct")
    , y = /^\s*(?:class|function)\b/
    , g = i(y.exec)
    , h = !y.exec(noop)
    , isConstructorModern = function(t) {
      if (!c(t))
          return !1;
      try {
          return v(noop, d, t),
          !0
      } catch (t) {
          return !1
      }
  };
  t.exports = !v || u((function() {
      var t;
      return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern((function() {
          t = !0
      }
      )) || t
  }
  )) ? function(t) {
      if (!c(t))
          return !1;
      switch (a(t)) {
      case "AsyncFunction":
      case "GeneratorFunction":
      case "AsyncGeneratorFunction":
          return !1
      }
      return h || !!g(y, p(t))
  }
  : isConstructorModern
}
, , , function(t, r, o) {
  var i = o(163)
    , u = o(110);
  t.exports = function(t) {
      var r = i(t, "string");
      return u(r) ? r : r + ""
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(43)
    , c = o(8)
    , a = o(48)
    , l = o(181)
    , p = i.Object;
  t.exports = l ? function(t) {
      return "symbol" == typeof t
  }
  : function(t) {
      var r = u("Symbol");
      return c(r) && a(r.prototype, p(t))
  }
}
, function(t, r) {
  t.exports = {}
}
, , function(t, r, o) {
  var i = o(2)
    , u = o(16)
    , c = i.document
    , a = u(c) && u(c.createElement);
  t.exports = function(t) {
      return a ? c.createElement(t) : {}
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(5)
    , u = o(128).trim;
  i({
      target: "String",
      proto: !0,
      forced: o(257)("trim")
  }, {
      trim: function trim() {
          return u(this)
      }
  })
}
, function(t, r, o) {
  var i = o(42)
    , u = o(120)
    , c = o(32)
    , createMethod = function(t) {
      return function(r, o, a) {
          var l, p = i(r), d = c(p), v = u(a, d);
          if (t && o != o) {
              for (; d > v; )
                  if ((l = p[v++]) != l)
                      return !0
          } else
              for (; d > v; v++)
                  if ((t || v in p) && p[v] === o)
                      return t || v || 0;
          return !t && -1
      }
  };
  t.exports = {
      includes: createMethod(!0),
      indexOf: createMethod(!1)
  }
}
, function(t, r, o) {
  "use strict";
  o(14);
  var i = o(3)
    , u = o(23)
    , c = o(100)
    , a = o(4)
    , l = o(6)
    , p = o(37)
    , d = l("species")
    , v = RegExp.prototype;
  t.exports = function(t, r, o, y) {
      var g = l(t)
        , h = !a((function() {
          var r = {};
          return r[g] = function() {
              return 7
          }
          ,
          7 != ""[t](r)
      }
      ))
        , m = h && !a((function() {
          var r = !1
            , o = /a/;
          return "split" === t && ((o = {}).constructor = {},
          o.constructor[d] = function() {
              return o
          }
          ,
          o.flags = "",
          o[g] = /./[g]),
          o.exec = function() {
              return r = !0,
              null
          }
          ,
          o[g](""),
          !r
      }
      ));
      if (!h || !m || o) {
          var b = i(/./[g])
            , _ = r(g, ""[t], (function(t, r, o, u, a) {
              var l = i(t)
                , p = r.exec;
              return p === c || p === v.exec ? h && !a ? {
                  done: !0,
                  value: b(r, o, u)
              } : {
                  done: !0,
                  value: l(o, r, u)
              } : {
                  done: !1
              }
          }
          ));
          u(String.prototype, t, _[0]),
          u(v, g, _[1])
      }
      y && p(v[g], "sham", !0)
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(11)
    , c = o(12)
    , a = o(8)
    , l = o(59)
    , p = o(100)
    , d = i.TypeError;
  t.exports = function(t, r) {
      var o = t.exec;
      if (a(o)) {
          var i = u(o, t, r);
          return null !== i && c(i),
          i
      }
      if ("RegExp" === l(t))
          return u(p, t, r);
      throw d("RegExp#exec called on incompatible receiver")
  }
}
, function(t, r, o) {
  var i = o(59)
    , u = o(2);
  t.exports = "process" == i(u.process)
}
, , function(t, r, o) {
  var i = o(57)
    , u = Math.max
    , c = Math.min;
  t.exports = function(t, r) {
      var o = i(t);
      return o < 0 ? u(o + r, 0) : c(o, r)
  }
}
, function(t, r, o) {
  var i = o(59);
  t.exports = Array.isArray || function isArray(t) {
      return "Array" == i(t)
  }
}
, function(t, r, o) {
  var i = o(66)
    , u = o(135);
  (t.exports = function(t, r) {
      return u[t] || (u[t] = void 0 !== r ? r : {})
  }
  )("versions", []).push({
      version: "3.19.1",
      mode: i ? "pure" : "global",
      copyright: "© 2021 Denis Pushkarev (zloirock.ru)"
  })
}
, , function(t, r, o) {
  var i = o(122)
    , u = o(126)
    , c = i("keys");
  t.exports = function(t) {
      return c[t] || (c[t] = u(t))
  }
}
, , function(t, r, o) {
  var i = o(3)
    , u = 0
    , c = Math.random()
    , a = i(1..toString);
  t.exports = function(t) {
      return "Symbol(" + (void 0 === t ? "" : t) + ")_" + a(++u + c, 36)
  }
}
, , function(t, r, o) {
  var i = o(3)
    , u = o(29)
    , c = o(13)
    , a = o(129)
    , l = i("".replace)
    , p = "[" + a + "]"
    , d = RegExp("^" + p + p + "*")
    , v = RegExp(p + p + "*$")
    , createMethod = function(t) {
      return function(r) {
          var o = c(u(r));
          return 1 & t && (o = l(o, d, "")),
          2 & t && (o = l(o, v, "")),
          o
      }
  };
  t.exports = {
      start: createMethod(1),
      end: createMethod(2),
      trim: createMethod(3)
  }
}
, function(t, r) {
  t.exports = "\t\n\v\f\r                　\u2028\u2029\ufeff"
}
, , , function(t, r) {
  function _typeof2(t) {
      return (_typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof2(t) {
          return typeof t
      }
      : function _typeof2(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      }
      )(t)
  }
  function _typeof(r) {
      return "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? t.exports = _typeof = function _typeof(t) {
          return _typeof2(t)
      }
      : t.exports = _typeof = function _typeof(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t)
      }
      ,
      _typeof(r)
  }
  t.exports = _typeof
}
, , , function(t, r, o) {
  var i = o(2)
    , u = o(136)
    , c = "__core-js_shared__"
    , a = i[c] || u(c, {});
  t.exports = a
}
, function(t, r, o) {
  var i = o(2)
    , u = Object.defineProperty;
  t.exports = function(t, r) {
      try {
          u(i, t, {
              value: r,
              configurable: !0,
              writable: !0
          })
      } catch (o) {
          i[t] = r
      }
      return r
  }
}
, function(t, r) {
  t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
}
, function(t, r, o) {
  var i = {};
  i[o(6)("toStringTag")] = "z",
  t.exports = "[object z]" === String(i)
}
, function(t, r, o) {
  "use strict";
  var i = o(12);
  t.exports = function() {
      var t = i(this)
        , r = "";
      return t.global && (r += "g"),
      t.ignoreCase && (r += "i"),
      t.multiline && (r += "m"),
      t.dotAll && (r += "s"),
      t.unicode && (r += "u"),
      t.sticky && (r += "y"),
      r
  }
}
, function(t, r, o) {
  var i = o(4)
    , u = o(2).RegExp;
  r.UNSUPPORTED_Y = i((function() {
      var t = u("a", "y");
      return t.lastIndex = 2,
      null != t.exec("abcd")
  }
  )),
  r.BROKEN_CARET = i((function() {
      var t = u("^r", "gy");
      return t.lastIndex = 2,
      null != t.exec("str")
  }
  ))
}
, , function(t, r, o) {
  var i = o(12)
    , u = o(227)
    , c = o(6)("species");
  t.exports = function(t, r) {
      var o, a = i(t).constructor;
      return void 0 === a || null == (o = i(a)[c]) ? r : u(o)
  }
}
, function(t, r, o) {
  "use strict";
  var i = {}.propertyIsEnumerable
    , u = Object.getOwnPropertyDescriptor
    , c = u && !i.call({
      1: 2
  }, 1);
  r.f = c ? function propertyIsEnumerable(t) {
      var r = u(this, t);
      return !!r && r.enumerable
  }
  : i
}
, function(t, r, o) {
  "use strict";
  var i = o(109)
    , u = o(22)
    , c = o(68);
  t.exports = function(t, r, o) {
      var a = i(r);
      a in t ? u.f(t, a, c(0, o)) : t[a] = o
  }
}
, , function(t, r, o) {
  var i = o(16)
    , u = o(59)
    , c = o(6)("match");
  t.exports = function(t) {
      var r;
      return i(t) && (void 0 !== (r = t[c]) ? !!r : "RegExp" == u(t))
  }
}
, , , , function(t, r, o) {
  var i = o(8)
    , u = o(16)
    , c = o(98);
  t.exports = function(t, r, o) {
      var a, l;
      return c && i(a = r.constructor) && a !== o && u(l = a.prototype) && l !== o.prototype && c(t, l),
      t
  }
}
, function(t, r, o) {
  var i = o(19)
    , u = o(2)
    , c = o(3)
    , a = o(90)
    , l = o(150)
    , p = o(37)
    , d = o(22).f
    , v = o(82).f
    , y = o(48)
    , g = o(146)
    , h = o(13)
    , m = o(139)
    , b = o(140)
    , _ = o(23)
    , x = o(4)
    , w = o(15)
    , S = o(38).enforce
    , E = o(154)
    , O = o(6)
    , I = o(184)
    , A = o(185)
    , T = O("match")
    , k = u.RegExp
    , P = k.prototype
    , N = u.SyntaxError
    , L = c(m)
    , j = c(P.exec)
    , R = c("".charAt)
    , M = c("".replace)
    , C = c("".indexOf)
    , U = c("".slice)
    , D = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/
    , V = /a/g
    , W = /a/g
    , q = new k(V) !== V
    , H = b.UNSUPPORTED_Y
    , z = i && (!q || H || I || A || x((function() {
      return W[T] = !1,
      k(V) != V || k(W) == W || "/a/i" != k(V, "i")
  }
  )));
  if (a("RegExp", z)) {
      for (var K = function RegExp(t, r) {
          var o, i, u, c, a, d, v = y(P, this), m = g(t), b = void 0 === r, _ = [], x = t;
          if (!v && m && b && t.constructor === K)
              return t;
          if ((m || y(P, t)) && (t = t.source,
          b && (r = "flags"in x ? x.flags : L(x))),
          t = void 0 === t ? "" : h(t),
          r = void 0 === r ? "" : h(r),
          x = t,
          I && "dotAll"in V && (i = !!r && C(r, "s") > -1) && (r = M(r, /s/g, "")),
          o = r,
          H && "sticky"in V && (u = !!r && C(r, "y") > -1) && (r = M(r, /y/g, "")),
          A && (t = (c = function(t) {
              for (var r, o = t.length, i = 0, u = "", c = [], a = {}, l = !1, p = !1, d = 0, v = ""; i <= o; i++) {
                  if ("\\" === (r = R(t, i)))
                      r += R(t, ++i);
                  else if ("]" === r)
                      l = !1;
                  else if (!l)
                      switch (!0) {
                      case "[" === r:
                          l = !0;
                          break;
                      case "(" === r:
                          j(D, U(t, i + 1)) && (i += 2,
                          p = !0),
                          u += r,
                          d++;
                          continue;
                      case ">" === r && p:
                          if ("" === v || w(a, v))
                              throw new N("Invalid capture group name");
                          a[v] = !0,
                          c[c.length] = [v, d],
                          p = !1,
                          v = "";
                          continue
                      }
                  p ? v += r : u += r
              }
              return [u, c]
          }(t))[0],
          _ = c[1]),
          a = l(k(t, r), v ? this : P, K),
          (i || u || _.length) && (d = S(a),
          i && (d.dotAll = !0,
          d.raw = K(function(t) {
              for (var r, o = t.length, i = 0, u = "", c = !1; i <= o; i++)
                  "\\" !== (r = R(t, i)) ? c || "." !== r ? ("[" === r ? c = !0 : "]" === r && (c = !1),
                  u += r) : u += "[\\s\\S]" : u += r + R(t, ++i);
              return u
          }(t), o)),
          u && (d.sticky = !0),
          _.length && (d.groups = _)),
          t !== x)
              try {
                  p(a, "source", "" === x ? "(?:)" : x)
              } catch (t) {}
          return a
      }, proxy = function(t) {
          t in K || d(K, t, {
              configurable: !0,
              get: function() {
                  return k[t]
              },
              set: function(r) {
                  k[t] = r
              }
          })
      }, B = v(k), G = 0; B.length > G; )
          proxy(B[G++]);
      P.constructor = K,
      K.prototype = P,
      _(u, "RegExp", K)
  }
  E("RegExp")
}
, function(t, r, o) {
  "use strict";
  var i = o(153).charAt;
  t.exports = function(t, r, o) {
      return r + (o ? i(t, r).length : 1)
  }
}
, function(t, r, o) {
  var i = o(3)
    , u = o(57)
    , c = o(13)
    , a = o(29)
    , l = i("".charAt)
    , p = i("".charCodeAt)
    , d = i("".slice)
    , createMethod = function(t) {
      return function(r, o) {
          var i, v, y = c(a(r)), g = u(o), h = y.length;
          return g < 0 || g >= h ? t ? "" : void 0 : (i = p(y, g)) < 55296 || i > 56319 || g + 1 === h || (v = p(y, g + 1)) < 56320 || v > 57343 ? t ? l(y, g) : i : t ? d(y, g, g + 2) : v - 56320 + (i - 55296 << 10) + 65536
      }
  };
  t.exports = {
      codeAt: createMethod(!1),
      charAt: createMethod(!0)
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(43)
    , u = o(22)
    , c = o(6)
    , a = o(19)
    , l = c("species");
  t.exports = function(t) {
      var r = i(t)
        , o = u.f;
      a && r && !r[l] && o(r, l, {
          configurable: !0,
          get: function() {
              return this
          }
      })
  }
}
, , function(t, r, o) {
  "use strict";
  var i = o(19)
    , u = o(2)
    , c = o(3)
    , a = o(90)
    , l = o(23)
    , p = o(15)
    , d = o(150)
    , v = o(48)
    , y = o(110)
    , g = o(163)
    , h = o(4)
    , m = o(82).f
    , b = o(73).f
    , _ = o(22).f
    , x = o(218)
    , w = o(128).trim
    , S = "Number"
    , E = u.Number
    , O = E.prototype
    , I = u.TypeError
    , A = c("".slice)
    , T = c("".charCodeAt)
    , toNumeric = function(t) {
      var r = g(t, "number");
      return "bigint" == typeof r ? r : toNumber(r)
  }
    , toNumber = function(t) {
      var r, o, i, u, c, a, l, p, d = g(t, "number");
      if (y(d))
          throw I("Cannot convert a Symbol value to a number");
      if ("string" == typeof d && d.length > 2)
          if (d = w(d),
          43 === (r = T(d, 0)) || 45 === r) {
              if (88 === (o = T(d, 2)) || 120 === o)
                  return NaN
          } else if (48 === r) {
              switch (T(d, 1)) {
              case 66:
              case 98:
                  i = 2,
                  u = 49;
                  break;
              case 79:
              case 111:
                  i = 8,
                  u = 55;
                  break;
              default:
                  return +d
              }
              for (a = (c = A(d, 2)).length,
              l = 0; l < a; l++)
                  if ((p = T(c, l)) < 48 || p > u)
                      return NaN;
              return parseInt(c, i)
          }
      return +d
  };
  if (a(S, !E(" 0o1") || !E("0b1") || E("+0x1"))) {
      for (var k, P = function Number(t) {
          var r = arguments.length < 1 ? 0 : E(toNumeric(t))
            , o = this;
          return v(O, o) && h((function() {
              x(o)
          }
          )) ? d(Object(r), o, P) : r
      }, N = i ? m(E) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), L = 0; N.length > L; L++)
          p(E, k = N[L]) && !p(P, k) && _(P, k, b(E, k));
      P.prototype = O,
      O.constructor = P,
      l(u, S, P)
  }
}
, , , , , function(t, r, o) {
  var i = o(63)
    , u = o(4);
  t.exports = !!Object.getOwnPropertySymbols && !u((function() {
      var t = Symbol();
      return !String(t) || !(Object(t)instanceof Symbol) || !Symbol.sham && i && i < 41
  }
  ))
}
, function(t, r) {
  r.f = Object.getOwnPropertySymbols
}
, function(t, r, o) {
  var i = o(2)
    , u = o(11)
    , c = o(16)
    , a = o(110)
    , l = o(61)
    , p = o(251)
    , d = o(6)
    , v = i.TypeError
    , y = d("toPrimitive");
  t.exports = function(t, r) {
      if (!c(t) || a(t))
          return t;
      var o, i = l(t, y);
      if (i) {
          if (void 0 === r && (r = "default"),
          o = u(i, t, r),
          !c(o) || a(o))
              return o;
          throw v("Can't convert object to primitive value")
      }
      return void 0 === r && (r = "number"),
      p(t, r)
  }
}
, , function(t, r, o) {
  "use strict";
  o(151),
  o(14),
  o(53),
  Object.defineProperty(r, "__esModule", {
      value: !0
  }),
  r.parseEnvFromLinkToken = r.isLinkToken = r.isDepositSwitchToken = r.isPublicToken = void 0;
  var i = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"
    , u = new RegExp("public-([a-z]+)-".concat(i))
    , c = new RegExp("deposit-switch-([a-z]+)-".concat(i))
    , a = new RegExp("link-([a-z]+)-".concat(i));
  r.isPublicToken = function isPublicToken(t) {
      return null != t && u.test(t)
  }
  ;
  r.isDepositSwitchToken = function isDepositSwitchToken(t) {
      return null != t && c.test(t)
  }
  ;
  r.isLinkToken = function isLinkToken(t) {
      return null != t && a.test(t)
  }
  ;
  r.parseEnvFromLinkToken = function parseEnvFromLinkToken(t) {
      var r = a.exec(t);
      if (null != r)
          return r[1]
  }
}
, function(t, r, o) {
  var i = o(58)
    , u = Math.floor
    , mergeSort = function(t, r) {
      var o = t.length
        , c = u(o / 2);
      return o < 8 ? insertionSort(t, r) : merge(t, mergeSort(i(t, 0, c), r), mergeSort(i(t, c), r), r)
  }
    , insertionSort = function(t, r) {
      for (var o, i, u = t.length, c = 1; c < u; ) {
          for (i = c,
          o = t[c]; i && r(t[i - 1], o) > 0; )
              t[i] = t[--i];
          i !== c++ && (t[i] = o)
      }
      return t
  }
    , merge = function(t, r, o, i) {
      for (var u = r.length, c = o.length, a = 0, l = 0; a < u || l < c; )
          t[a + l] = a < u && l < c ? i(r[a], o[l]) <= 0 ? r[a++] : o[l++] : a < u ? r[a++] : o[l++];
      return t
  };
  t.exports = mergeSort
}
, , , , , , function(t, r, o) {
  "use strict";
  var i = o(1);
  o(20),
  o(47),
  o(78),
  o(92),
  o(10),
  o(96),
  o(69),
  o(103),
  o(156),
  o(175),
  o(87),
  o(14),
  o(41),
  o(83),
  o(114);
  var u = i(o(45))
    , c = i(o(132));
  function _createForOfIteratorHelper(t, r) {
      var o;
      if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
          if (Array.isArray(t) || (o = function _unsupportedIterableToArray(t, r) {
              if (!t)
                  return;
              if ("string" == typeof t)
                  return _arrayLikeToArray(t, r);
              var o = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === o && t.constructor && (o = t.constructor.name);
              if ("Map" === o || "Set" === o)
                  return Array.from(t);
              if ("Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))
                  return _arrayLikeToArray(t, r)
          }(t)) || r && t && "number" == typeof t.length) {
              o && (t = o);
              var i = 0
                , u = function F() {};
              return {
                  s: u,
                  n: function n() {
                      return i >= t.length ? {
                          done: !0
                      } : {
                          done: !1,
                          value: t[i++]
                      }
                  },
                  e: function e(t) {
                      throw t
                  },
                  f: u
              }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }
      var c, a = !0, l = !1;
      return {
          s: function s() {
              o = t[Symbol.iterator]()
          },
          n: function n() {
              var t = o.next();
              return a = t.done,
              t
          },
          e: function e(t) {
              l = !0,
              c = t
          },
          f: function f() {
              try {
                  a || null == o.return || o.return()
              } finally {
                  if (l)
                      throw c
              }
          }
      }
  }
  function _arrayLikeToArray(t, r) {
      (null == r || r > t.length) && (r = t.length);
      for (var o = 0, i = new Array(r); o < r; o++)
          i[o] = t[o];
      return i
  }
  var a = o(261)
    , l = o(263);
  function encode(t, r) {
      return r.encode ? r.strict ? a(t) : encodeURIComponent(t) : t
  }
  function decode(t, r) {
      return r.decode ? l(t) : t
  }
  function keysSorter(t) {
      return Array.isArray(t) ? t.sort() : "object" === (0,
      c.default)(t) ? keysSorter(Object.keys(t)).sort((function(t, r) {
          return Number(t) - Number(r)
      }
      )).map((function(r) {
          return t[r]
      }
      )) : t
  }
  function extract(t) {
      var r = t.indexOf("?");
      return -1 === r ? "" : t.slice(r + 1)
  }
  function parse(t, r) {
      var o = function parserForArrayFormat(t) {
          var r;
          switch (t.arrayFormat) {
          case "index":
              return function(t, o, i) {
                  r = /\[(\d*)\]$/.exec(t),
                  t = t.replace(/\[\d*\]$/, ""),
                  r ? (void 0 === i[t] && (i[t] = {}),
                  i[t][r[1]] = o) : i[t] = o
              }
              ;
          case "bracket":
              return function(t, o, i) {
                  r = /(\[\])$/.exec(t),
                  t = t.replace(/\[\]$/, ""),
                  r ? void 0 !== i[t] ? i[t] = [].concat(i[t], o) : i[t] = [o] : i[t] = o
              }
              ;
          default:
              return function(t, r, o) {
                  void 0 !== o[t] ? o[t] = [].concat(o[t], r) : o[t] = r
              }
          }
      }(r = Object.assign({
          decode: !0,
          arrayFormat: "none"
      }, r))
        , i = Object.create(null);
      if ("string" != typeof t)
          return i;
      if (!(t = t.trim().replace(/^[?#&]/, "")))
          return i;
      var a, l = _createForOfIteratorHelper(t.split("&"));
      try {
          for (l.s(); !(a = l.n()).done; ) {
              var p = a.value.replace(/\+/g, " ").split("=")
                , d = (0,
              u.default)(p, 2)
                , v = d[0]
                , y = d[1];
              y = void 0 === y ? null : decode(y, r),
              o(decode(v, r), y, i)
          }
      } catch (t) {
          l.e(t)
      } finally {
          l.f()
      }
      return Object.keys(i).sort().reduce((function(t, r) {
          var o = i[r];
          return Boolean(o) && "object" === (0,
          c.default)(o) && !Array.isArray(o) ? t[r] = keysSorter(o) : t[r] = o,
          t
      }
      ), Object.create(null))
  }
  r.extract = extract,
  r.parse = parse,
  r.stringify = function(t, r) {
      if (!t)
          return "";
      var o = function encoderForArrayFormat(t) {
          switch (t.arrayFormat) {
          case "index":
              return function(r, o, i) {
                  return null === o ? [encode(r, t), "[", i, "]"].join("") : [encode(r, t), "[", encode(i, t), "]=", encode(o, t)].join("")
              }
              ;
          case "bracket":
              return function(r, o) {
                  return null === o ? [encode(r, t), "[]"].join("") : [encode(r, t), "[]=", encode(o, t)].join("")
              }
              ;
          default:
              return function(r, o) {
                  return null === o ? encode(r, t) : [encode(r, t), "=", encode(o, t)].join("")
              }
          }
      }(r = Object.assign({
          encode: !0,
          strict: !0,
          arrayFormat: "none"
      }, r))
        , i = Object.keys(t);
      return !1 !== r.sort && i.sort(r.sort),
      i.map((function(i) {
          var u = t[i];
          if (void 0 === u)
              return "";
          if (null === u)
              return encode(i, r);
          if (Array.isArray(u)) {
              var c, a = [], l = _createForOfIteratorHelper(u.slice());
              try {
                  for (l.s(); !(c = l.n()).done; ) {
                      var p = c.value;
                      void 0 !== p && a.push(o(i, p, a.length))
                  }
              } catch (t) {
                  l.e(t)
              } finally {
                  l.f()
              }
              return a.join("&")
          }
          return encode(i, r) + "=" + encode(u, r)
      }
      )).filter((function(t) {
          return t.length > 0
      }
      )).join("&")
  }
  ,
  r.parseUrl = function(t, r) {
      var o = t.indexOf("#");
      return -1 !== o && (t = t.slice(0, o)),
      {
          url: t.split("?")[0] || "",
          query: parse(extract(t), r)
      }
  }
}
, , , function(t, r, o) {
  var i = o(5)
    , u = o(191);
  i({
      target: "Object",
      stat: !0,
      forced: Object.assign !== u
  }, {
      assign: u
  })
}
, , function(t, r, o) {
  var i = o(254);
  t.exports = function(t, r) {
      return new (i(t))(0 === r ? 0 : r)
  }
}
, , , , function(t, r, o) {
  var i = o(161);
  t.exports = i && !Symbol.sham && "symbol" == typeof Symbol.iterator
}
, function(t, r, o) {
  var i = o(19)
    , u = o(4)
    , c = o(113);
  t.exports = !i && !u((function() {
      return 7 != Object.defineProperty(c("div"), "a", {
          get: function() {
              return 7
          }
      }).a
  }
  ))
}
, function(t, r, o) {
  var i = o(3)
    , u = o(15)
    , c = o(42)
    , a = o(115).indexOf
    , l = o(111)
    , p = i([].push);
  t.exports = function(t, r) {
      var o, i = c(t), d = 0, v = [];
      for (o in i)
          !u(l, o) && u(i, o) && p(v, o);
      for (; r.length > d; )
          u(i, o = r[d++]) && (~a(v, o) || p(v, o));
      return v
  }
}
, function(t, r, o) {
  var i = o(4)
    , u = o(2).RegExp;
  t.exports = i((function() {
      var t = u(".", "s");
      return !(t.dotAll && t.exec("\n") && "s" === t.flags)
  }
  ))
}
, function(t, r, o) {
  var i = o(4)
    , u = o(2).RegExp;
  t.exports = i((function() {
      var t = u("(?<a>b)", "g");
      return "b" !== t.exec("b").groups.a || "bc" !== "b".replace(t, "$<a>c")
  }
  ))
}
, , , , , , function(t, r, o) {
  "use strict";
  var i = o(19)
    , u = o(3)
    , c = o(11)
    , a = o(4)
    , l = o(104)
    , p = o(162)
    , d = o(143)
    , v = o(28)
    , y = o(79)
    , g = Object.assign
    , h = Object.defineProperty
    , m = u([].concat);
  t.exports = !g || a((function() {
      if (i && 1 !== g({
          b: 1
      }, g(h({}, "a", {
          enumerable: !0,
          get: function() {
              h(this, "b", {
                  value: 3,
                  enumerable: !1
              })
          }
      }), {
          b: 2
      })).b)
          return !0;
      var t = {}
        , r = {}
        , o = Symbol()
        , u = "abcdefghijklmnopqrst";
      return t[o] = 7,
      u.split("").forEach((function(t) {
          r[t] = t
      }
      )),
      7 != g({}, t)[o] || l(g({}, r)).join("") != u
  }
  )) ? function assign(t, r) {
      for (var o = v(t), u = arguments.length, a = 1, g = p.f, h = d.f; u > a; )
          for (var b, _ = y(arguments[a++]), x = g ? m(l(_), g(_)) : l(_), w = x.length, S = 0; w > S; )
              b = x[S++],
              i && !c(h, _, b) || (o[b] = _[b]);
      return o
  }
  : g
}
, function(t, r, o) {
  var i = o(19)
    , u = o(22)
    , c = o(12)
    , a = o(42)
    , l = o(104);
  t.exports = i ? Object.defineProperties : function defineProperties(t, r) {
      c(t);
      for (var o, i = a(r), p = l(r), d = p.length, v = 0; d > v; )
          u.f(t, o = p[v++], i[o]);
      return t
  }
}
, function(t, r, o) {
  var i = o(43);
  t.exports = i("document", "documentElement")
}
, , , , , , , , function(t, r, o) {
  var i = o(2)
    , u = o(50)
    , c = o(28)
    , a = o(79)
    , l = o(32)
    , p = i.TypeError
    , createMethod = function(t) {
      return function(r, o, i, d) {
          u(o);
          var v = c(r)
            , y = a(v)
            , g = l(v)
            , h = t ? g - 1 : 0
            , m = t ? -1 : 1;
          if (i < 2)
              for (; ; ) {
                  if (h in y) {
                      d = y[h],
                      h += m;
                      break
                  }
                  if (h += m,
                  t ? h < 0 : g <= h)
                      throw p("Reduce of empty array with no initial value")
              }
          for (; t ? h >= 0 : g > h; h += m)
              h in y && (d = o(d, y[h], h, v));
          return d
      }
  };
  t.exports = {
      left: createMethod(!1),
      right: createMethod(!0)
  }
}
, , , , , , , , , , , , , function(t, r, o) {
  "use strict";
  Object.defineProperty(r, "__esModule", {
      value: !0
  }),
  r.default = void 0;
  var i = function getApiUrl(t) {
      switch (t) {
      case "end2end":
          return "http://api_v2:80";
      case "devenv":
          return "http://localhost:8082";
      case "testing":
          return "https://api-v2-testing.plaid.com";
      case "sandbox":
          return "https://sandbox.plaid.com";
      case "development":
          return "https://development.plaid.com";
      case "production":
          return "https://production.plaid.com";
      default:
          throw new Error("Invalid environment: ".concat(t))
      }
  };
  r.default = i
}
, , , function(t, r, o) {
  var i = o(15)
    , u = o(253)
    , c = o(73)
    , a = o(22);
  t.exports = function(t, r) {
      for (var o = u(r), l = a.f, p = c.f, d = 0; d < o.length; d++) {
          var v = o[d];
          i(t, v) || l(t, v, p(r, v))
      }
  }
}
, function(t, r, o) {
  var i = o(3);
  t.exports = i(1..valueOf)
}
, , , , , , function(t, r, o) {
  var i = o(56).match(/firefox\/(\d+)/i);
  t.exports = !!i && +i[1]
}
, function(t, r, o) {
  var i = o(56);
  t.exports = /MSIE|Trident/.test(i)
}
, function(t, r, o) {
  var i = o(56).match(/AppleWebKit\/(\d+)\./);
  t.exports = !!i && +i[1]
}
, function(t, r, o) {
  var i = o(2)
    , u = o(106)
    , c = o(93)
    , a = i.TypeError;
  t.exports = function(t) {
      if (u(t))
          return t;
      throw a(c(t) + " is not a constructor")
  }
}
, , , , , , , , , , , , , , function(t, r) {
  var o = t.exports = {
      version: "2.6.11"
  };
  "number" == typeof __e && (__e = o)
}
, , , , , , , , , , function(t, r, o) {
  var i = o(2)
    , u = o(11)
    , c = o(8)
    , a = o(16)
    , l = i.TypeError;
  t.exports = function(t, r) {
      var o, i;
      if ("string" === r && c(o = t.toString) && !a(i = u(o, t)))
          return i;
      if (c(o = t.valueOf) && !a(i = u(o, t)))
          return i;
      if ("string" !== r && c(o = t.toString) && !a(i = u(o, t)))
          return i;
      throw l("Can't convert object to primitive value")
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(8)
    , c = o(105)
    , a = i.WeakMap;
  t.exports = u(a) && /native code/.test(c(a))
}
, function(t, r, o) {
  var i = o(43)
    , u = o(3)
    , c = o(82)
    , a = o(162)
    , l = o(12)
    , p = u([].concat);
  t.exports = i("Reflect", "ownKeys") || function ownKeys(t) {
      var r = c.f(l(t))
        , o = a.f;
      return o ? p(r, o(t)) : r
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(121)
    , c = o(106)
    , a = o(16)
    , l = o(6)("species")
    , p = i.Array;
  t.exports = function(t) {
      var r;
      return u(t) && (r = t.constructor,
      (c(r) && (r === p || u(r.prototype)) || a(r) && null === (r = r[l])) && (r = void 0)),
      void 0 === r ? p : r
  }
}
, function(t, r, o) {
  var i = o(2)
    , u = o(8)
    , c = i.String
    , a = i.TypeError;
  t.exports = function(t) {
      if ("object" == typeof t || u(t))
          return t;
      throw a("Can't set " + c(t) + " as a prototype")
  }
}
, function(t, r, o) {
  var i = o(3)
    , u = o(28)
    , c = Math.floor
    , a = i("".charAt)
    , l = i("".replace)
    , p = i("".slice)
    , d = /\$([$&'`]|\d{1,2}|<[^>]*>)/g
    , v = /\$([$&'`]|\d{1,2})/g;
  t.exports = function(t, r, o, i, y, g) {
      var h = o + t.length
        , m = i.length
        , b = v;
      return void 0 !== y && (y = u(y),
      b = d),
      l(g, b, (function(u, l) {
          var d;
          switch (a(l, 0)) {
          case "$":
              return "$";
          case "&":
              return t;
          case "`":
              return p(r, 0, o);
          case "'":
              return p(r, h);
          case "<":
              d = y[p(l, 1, -1)];
              break;
          default:
              var v = +l;
              if (0 === v)
                  return u;
              if (v > m) {
                  var g = c(v / 10);
                  return 0 === g ? u : g <= m ? void 0 === i[g - 1] ? a(l, 1) : i[g - 1] + a(l, 1) : u
              }
              d = i[v - 1]
          }
          return void 0 === d ? "" : d
      }
      ))
  }
}
, function(t, r, o) {
  var i = o(70).PROPER
    , u = o(4)
    , c = o(129);
  t.exports = function(t) {
      return u((function() {
          return !!c[t]() || "​᠎" !== "​᠎"[t]() || i && c[t].name !== t
      }
      ))
  }
}
, function(t, r) {
  t.exports = function _arrayWithHoles(t) {
      if (Array.isArray(t))
          return t
  }
}
, function(t, r) {
  t.exports = function _iterableToArrayLimit(t, r) {
      var o = []
        , i = !0
        , u = !1
        , c = void 0;
      try {
          for (var a, l = t[Symbol.iterator](); !(i = (a = l.next()).done) && (o.push(a.value),
          !r || o.length !== r); i = !0)
              ;
      } catch (t) {
          u = !0,
          c = t
      } finally {
          try {
              i || null == l.return || l.return()
          } finally {
              if (u)
                  throw c
          }
      }
      return o
  }
}
, function(t, r) {
  t.exports = function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
  }
}
, function(t, r, o) {
  "use strict";
  o(18),
  o(14),
  o(53),
  o(41),
  t.exports = function(t) {
      return encodeURIComponent(t).replace(/[!'()*]/g, (function(t) {
          return "%".concat(t.charCodeAt(0).toString(16).toUpperCase())
      }
      ))
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(138)
    , u = o(71);
  t.exports = i ? {}.toString : function toString() {
      return "[object " + u(this) + "]"
  }
}
, function(t, r, o) {
  "use strict";
  var i = "%[a-f0-9]{2}"
    , u = new RegExp(i,"gi")
    , c = new RegExp("(" + i + ")+","gi");
  function decodeComponents(t, r) {
      try {
          return decodeURIComponent(t.join(""))
      } catch (t) {}
      if (1 === t.length)
          return t;
      r = r || 1;
      var o = t.slice(0, r)
        , i = t.slice(r);
      return Array.prototype.concat.call([], decodeComponents(o), decodeComponents(i))
  }
  function decode(t) {
      try {
          return decodeURIComponent(t)
      } catch (i) {
          for (var r = t.match(u), o = 1; o < r.length; o++)
              r = (t = decodeComponents(r, o).join("")).match(u);
          return t
      }
  }
  t.exports = function(t) {
      if ("string" != typeof t)
          throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof t + "`");
      try {
          return t = t.replace(/\+/g, " "),
          decodeURIComponent(t)
      } catch (r) {
          return function customDecodeURIComponent(t) {
              for (var r = {
                  "%FE%FF": "��",
                  "%FF%FE": "��"
              }, o = c.exec(t); o; ) {
                  try {
                      r[o[0]] = decodeURIComponent(o[0])
                  } catch (t) {
                      var i = decode(o[0]);
                      i !== o[0] && (r[o[0]] = i)
                  }
                  o = c.exec(t)
              }
              r["%C2"] = "�";
              for (var u = Object.keys(r), a = 0; a < u.length; a++) {
                  var l = u[a];
                  t = t.replace(new RegExp(l,"g"), r[l])
              }
              return t
          }(t)
      }
  }
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, r) {
  var o = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  "number" == typeof __g && (__g = o)
}
, function(t, r, o) {
  var i = o(334)
    , u = o(241)
    , c = o(753)
    , a = o(400)
    , l = o(399)
    , $export = function(t, r, o) {
      var p, d, v, y = t & $export.F, g = t & $export.G, h = t & $export.S, m = t & $export.P, b = t & $export.B, _ = t & $export.W, x = g ? u : u[r] || (u[r] = {}), w = x.prototype, S = g ? i : h ? i[r] : (i[r] || {}).prototype;
      for (p in g && (o = r),
      o)
          (d = !y && S && void 0 !== S[p]) && l(x, p) || (v = d ? S[p] : o[p],
          x[p] = g && "function" != typeof S[p] ? o[p] : b && d ? c(v, i) : _ && S[p] == v ? function(t) {
              var F = function(r, o, i) {
                  if (this instanceof t) {
                      switch (arguments.length) {
                      case 0:
                          return new t;
                      case 1:
                          return new t(r);
                      case 2:
                          return new t(r,o)
                      }
                      return new t(r,o,i)
                  }
                  return t.apply(this, arguments)
              };
              return F.prototype = t.prototype,
              F
          }(v) : m && "function" == typeof v ? c(Function.call, v) : v,
          m && ((x.virtual || (x.virtual = {}))[p] = v,
          t & $export.R && w && !w[p] && a(w, p, v)))
  };
  $export.F = 1,
  $export.G = 2,
  $export.S = 4,
  $export.P = 8,
  $export.B = 16,
  $export.W = 32,
  $export.U = 64,
  $export.R = 128,
  t.exports = $export
}
, , , , , , , , , , , , , , function(t, r) {
  t.exports = function(t) {
      return "object" == typeof t ? null !== t : "function" == typeof t
  }
}
, function(t, r, o) {
  t.exports = !o(482)((function() {
      return 7 != Object.defineProperty({}, "a", {
          get: function() {
              return 7
          }
      }).a
  }
  ))
}
, function(t, r, o) {
  var i = o(812)("wks")
    , u = o(756)
    , c = o(334).Symbol
    , a = "function" == typeof c;
  (t.exports = function(t) {
      return i[t] || (i[t] = a && c[t] || (a ? c : u)("Symbol." + t))
  }
  ).store = i
}
, , , , , , , function(t, r, o) {
  var i = o(401)
    , u = o(963)
    , c = o(807)
    , a = Object.defineProperty;
  r.f = o(350) ? Object.defineProperty : function defineProperty(t, r, o) {
      if (i(t),
      r = c(r, !0),
      i(o),
      u)
          try {
              return a(t, r, o)
          } catch (t) {}
      if ("get"in o || "set"in o)
          throw TypeError("Accessors not supported!");
      return "value"in o && (t[r] = o.value),
      t
  }
}
, function(t, r, o) {
  t.exports = o(1188)
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, r, o) {
  var i = o(803)
    , u = o(805);
  t.exports = function(t) {
      return i(u(t))
  }
}
, function(t, r) {
  var o = {}.hasOwnProperty;
  t.exports = function(t, r) {
      return o.call(t, r)
  }
}
, function(t, r, o) {
  var i = o(358)
    , u = o(704);
  t.exports = o(350) ? function(t, r, o) {
      return i.f(t, r, u(1, o))
  }
  : function(t, r, o) {
      return t[r] = o,
      t
  }
}
, function(t, r, o) {
  var i = o(349);
  t.exports = function(t) {
      if (!i(t))
          throw TypeError(t + " is not an object!");
      return t
  }
}
, , , , , , , , function(t, r, o) {
  "use strict";
  Object.defineProperty(r, "__esModule", {
      value: !0
  }),
  r.default = void 0;
  r.default = function _default() {
      if (null == window.navigator)
          return {
              browserLanguage: "",
              isAndroid: !1,
              isIE: !1,
              isIOS: !1,
              isIOSChrome: !1,
              isMobile: !1
          };
      var t = window.navigator
        , r = function() {
          if (null != t.language && "" !== t.language)
              return t.language;
          var r = t.userLanguage;
          return null != r ? r : ""
      }()
        , o = /windows phone/i.test(t.userAgent)
        , i = /android|silk/i.test(t.userAgent) && !o
        , u = /MSIE |Trident/i.test(t.userAgent)
        , c = /iPad|iPhone|iPod/.test(t.userAgent) && !window.MSStream && !o;
      return {
          browserLanguage: r,
          isAndroid: i,
          isIE: u,
          isIOS: c,
          isIOSChrome: /CriOS/.test(t.userAgent),
          isMobile: c || i || o || /Mobi/i.test(t.userAgent)
      }
  }
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, r) {
  t.exports = function(t) {
      try {
          return !!t()
      } catch (t) {
          return !0
      }
  }
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, r) {
  t.exports = function(t, r) {
      return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: r
      }
  }
}
, function(t, r) {
  t.exports = {}
}
, function(t, r, o) {
  var i = o(970)
    , u = o(813);
  t.exports = Object.keys || function keys(t) {
      return i(t, u)
  }
}
, function(t, r, o) {
  var i = o(805);
  t.exports = function(t) {
      return Object(i(t))
  }
}
, function(t, r) {
  t.exports = function _interopRequireDefault(t) {
      return t && t.__esModule ? t : {
          default: t
      }
  }
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, r, o) {
  var i = o(962)
    , u = o(359)
    , c = o(754)
    , a = o(1208);
  function _getRequireWildcardCache() {
      if ("function" != typeof a)
          return null;
      var t = new a;
      return _getRequireWildcardCache = function _getRequireWildcardCache() {
          return t
      }
      ,
      t
  }
  t.exports = function _interopRequireWildcard(t) {
      if (t && t.__esModule)
          return t;
      if (null === t || "object" !== c(t) && "function" != typeof t)
          return {
              default: t
          };
      var r = _getRequireWildcardCache();
      if (r && r.has(t))
          return r.get(t);
      var o = {}
        , a = u && i;
      for (var l in t)
          if (Object.prototype.hasOwnProperty.call(t, l)) {
              var p = a ? i(t, l) : null;
              p && (p.get || p.set) ? u(o, l, p) : o[l] = t[l]
          }
      return o.default = t,
      r && r.set(t, o),
      o
  }
}
, function(t, r) {
  r.f = {}.propertyIsEnumerable
}
, function(t, r, o) {
  var i = o(966);
  t.exports = function(t, r, o) {
      if (i(t),
      void 0 === r)
          return t;
      switch (o) {
      case 1:
          return function(o) {
              return t.call(r, o)
          }
          ;
      case 2:
          return function(o, i) {
              return t.call(r, o, i)
          }
          ;
      case 3:
          return function(o, i, u) {
              return t.call(r, o, i, u)
          }
      }
      return function() {
          return t.apply(r, arguments)
      }
  }
}
, function(t, r, o) {
  var i = o(1190)
    , u = o(1202);
  function _typeof(r) {
      return t.exports = _typeof = "function" == typeof u && "symbol" == typeof i ? function _typeof(t) {
          return typeof t
      }
      : function _typeof(t) {
          return t && "function" == typeof u && t.constructor === u && t !== u.prototype ? "symbol" : typeof t
      }
      ,
      _typeof(r)
  }
  t.exports = _typeof
}
, function(t, r) {
  t.exports = !0
}
, function(t, r) {
  var o = 0
    , i = Math.random();
  t.exports = function(t) {
      return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++o + i).toString(36))
  }
}
, function(t, r, o) {
  var i = o(358).f
    , u = o(399)
    , c = o(351)("toStringTag");
  t.exports = function(t, r, o) {
      t && !u(t = o ? t : t.prototype, c) && i(t, c, {
          configurable: !0,
          value: r
      })
  }
}
, function(t, r, o) {
  var i = o(756)("meta")
    , u = o(349)
    , c = o(399)
    , a = o(358).f
    , l = 0
    , p = Object.isExtensible || function() {
      return !0
  }
    , d = !o(482)((function() {
      return p(Object.preventExtensions({}))
  }
  ))
    , setMeta = function(t) {
      a(t, i, {
          value: {
              i: "O" + ++l,
              w: {}
          }
      })
  }
    , v = t.exports = {
      KEY: i,
      NEED: !1,
      fastKey: function(t, r) {
          if (!u(t))
              return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
          if (!c(t, i)) {
              if (!p(t))
                  return "F";
              if (!r)
                  return "E";
              setMeta(t)
          }
          return t[i].i
      },
      getWeak: function(t, r) {
          if (!c(t, i)) {
              if (!p(t))
                  return !0;
              if (!r)
                  return !1;
              setMeta(t)
          }
          return t[i].w
      },
      onFreeze: function(t) {
          return d && v.NEED && p(t) && !c(t, i) && setMeta(t),
          t
      }
  }
}
, function(t, r) {
  r.f = Object.getOwnPropertySymbols
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, r, o) {
  var i = o(804);
  t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
      return "String" == i(t) ? t.split("") : Object(t)
  }
}
, function(t, r) {
  var o = {}.toString;
  t.exports = function(t) {
      return o.call(t).slice(8, -1)
  }
}
, function(t, r) {
  t.exports = function(t) {
      if (null == t)
          throw TypeError("Can't call method on  " + t);
      return t
  }
}
, function(t, r, o) {
  var i = o(752)
    , u = o(704)
    , c = o(398)
    , a = o(807)
    , l = o(399)
    , p = o(963)
    , d = Object.getOwnPropertyDescriptor;
  r.f = o(350) ? d : function getOwnPropertyDescriptor(t, r) {
      if (t = c(t),
      r = a(r, !0),
      p)
          try {
              return d(t, r)
          } catch (t) {}
      if (l(t, r))
          return u(!i.f.call(t, r), t[r])
  }
}
, function(t, r, o) {
  var i = o(349);
  t.exports = function(t, r) {
      if (!i(t))
          return t;
      var o, u;
      if (r && "function" == typeof (o = t.toString) && !i(u = o.call(t)))
          return u;
      if ("function" == typeof (o = t.valueOf) && !i(u = o.call(t)))
          return u;
      if (!r && "function" == typeof (o = t.toString) && !i(u = o.call(t)))
          return u;
      throw TypeError("Can't convert object to primitive value")
  }
}
, function(t, r) {
  var o = Math.ceil
    , i = Math.floor;
  t.exports = function(t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? i : o)(t)
  }
}
, function(t, r, o) {
  t.exports = o(400)
}
, function(t, r, o) {
  var i = o(808)
    , u = Math.min;
  t.exports = function(t) {
      return t > 0 ? u(i(t), 9007199254740991) : 0
  }
}
, function(t, r, o) {
  var i = o(812)("keys")
    , u = o(756);
  t.exports = function(t) {
      return i[t] || (i[t] = u(t))
  }
}
, function(t, r, o) {
  var i = o(241)
    , u = o(334)
    , c = "__core-js_shared__"
    , a = u[c] || (u[c] = {});
  (t.exports = function(t, r) {
      return a[t] || (a[t] = void 0 !== r ? r : {})
  }
  )("versions", []).push({
      version: i.version,
      mode: o(755) ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
  })
}
, function(t, r) {
  t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}
, function(t, r, o) {
  r.f = o(351)
}
, function(t, r, o) {
  var i = o(334)
    , u = o(241)
    , c = o(755)
    , a = o(814)
    , l = o(358).f;
  t.exports = function(t) {
      var r = u.Symbol || (u.Symbol = c ? {} : i.Symbol || {});
      "_" == t.charAt(0) || t in r || l(r, t, {
          value: a.f(t)
      })
  }
}
, function(t, r, o) {
  var i = o(970)
    , u = o(813).concat("length", "prototype");
  r.f = Object.getOwnPropertyNames || function getOwnPropertyNames(t) {
      return i(t, u)
  }
}
, function(t, r, o) {
  var i = o(753)
    , u = o(803)
    , c = o(707)
    , a = o(810)
    , l = o(1211);
  t.exports = function(t, r) {
      var o = 1 == t
        , p = 2 == t
        , d = 3 == t
        , v = 4 == t
        , y = 6 == t
        , g = 5 == t || y
        , h = r || l;
      return function(r, l, m) {
          for (var b, _, x = c(r), w = u(x), S = i(l, m, 3), E = a(w.length), O = 0, I = o ? h(r, E) : p ? h(r, 0) : void 0; E > O; O++)
              if ((g || O in w) && (_ = S(b = w[O], O, x),
              t))
                  if (o)
                      I[O] = _;
                  else if (_)
                      switch (t) {
                      case 3:
                          return !0;
                      case 5:
                          return b;
                      case 6:
                          return O;
                      case 2:
                          I.push(b)
                      }
                  else if (v)
                      return !1;
          return y ? -1 : d || v ? v : I
      }
  }
}
, function(t, r, o) {
  var i = o(753)
    , u = o(1214)
    , c = o(1215)
    , a = o(401)
    , l = o(810)
    , p = o(1216)
    , d = {}
    , v = {};
  (r = t.exports = function(t, r, o, y, g) {
      var h, m, b, _, x = g ? function() {
          return t
      }
      : p(t), w = i(o, y, r ? 2 : 1), S = 0;
      if ("function" != typeof x)
          throw TypeError(t + " is not iterable!");
      if (c(x)) {
          for (h = l(t.length); h > S; S++)
              if ((_ = r ? w(a(m = t[S])[0], m[1]) : w(t[S])) === d || _ === v)
                  return _
      } else
          for (b = x.call(t); !(m = b.next()).done; )
              if ((_ = u(b, w, m.value, r)) === d || _ === v)
                  return _
  }
  ).BREAK = d,
  r.RETURN = v
}
, function(t, r, o) {
  var i = o(349);
  t.exports = function(t, r) {
      if (!i(t) || t._t !== r)
          throw TypeError("Incompatible receiver, " + r + " required!");
      return t
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(751)
    , u = o(708)
    , c = o(359);
  o(20),
  c(r, "__esModule", {
      value: !0
  }),
  r.getMetaViewport = r.writeLocalStorage = r.readLocalStorage = r.createMessageHandler = r.sendMessage = r.getWindowOrigin = r.getUniqueId = r.findScriptTag = r.find = r.buildLinkUrl = void 0;
  var a = u(o(754))
    , l = u(o(978))
    , p = u(o(1244))
    , d = u(o(172))
    , v = i(o(1247))
    , y = o(84);
  r.buildLinkUrl = function buildLinkUrl(t, r) {
      var o, i, u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : v, c = d.default.stringify(t);
      return null == r ? (o = u.LINK_CLIENT_STABLE_URL.length > 0 ? u.LINK_CLIENT_STABLE_URL : u.LINK_CLIENT_URL,
      i = u.LINK_HTML_PATH) : (o = u.LINK_CLIENT_URL,
      i = r ? u.FLEX_LINK_HTML_PATH : u.LINK_HTML_PATH),
      "".concat(o).concat(i, "?").concat(c)
  }
  ;
  r.find = function find(t, r) {
      var o, i = t.length;
      for (o = 0; o < i; o += 1)
          if (r(t[o]))
              return t[o]
  }
  ;
  r.findScriptTag = function findScriptTag() {
      for (var t = document.getElementsByTagName("script"), r = 0, o = t.length; r < o; r += 1)
          if (/link-initialize(\..*?)?\.js$/.test(t[r].src))
              return t[r];
      throw new Error("Failed to find script")
  }
  ;
  var g, h = (g = 0,
  function() {
      return g += 1,
      String(g)
  }
  );
  r.getUniqueId = h;
  r.getWindowOrigin = function getWindowOrigin() {
      return null != window.location.origin ? window.location.origin : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")
  }
  ;
  r.sendMessage = function sendMessage(t) {
      return function(r) {
          var o = (0,
          p.default)({}, r, {
              action: "".concat(y.PLAID_INTERNAL_NAMESPACE, "::").concat(r.action)
          });
          t.postMessage((0,
          l.default)(o), "https://cdn.plaid.com")
      }
  }
  ;
  r.createMessageHandler = function createMessageHandler(t, r) {
      return function(o) {
          var i = function parseJSON(t) {
              try {
                  return JSON.parse(t)
              } catch (t) {
                  return {}
              }
          }(o.data);
          for (var u in r)
              if (i.action === "".concat(y.PLAID_INTERNAL_NAMESPACE, "-").concat(t, "::").concat(u))
                  return r[u](i)
      }
  }
  ;
  var m = "plaid-link";
  r.readLocalStorage = function readLocalStorage() {
      try {
          var t = window.localStorage.getItem(m);
          if (null == t)
              return null;
          var r = JSON.parse(t);
          return "object" !== (0,
          a.default)(r) ? null : r
      } catch (t) {
          return null
      }
  }
  ;
  r.writeLocalStorage = function writeLocalStorage(t) {
      try {
          window.localStorage.setItem(m, (0,
          l.default)(t))
      } catch (t) {
          return
      }
  }
  ;
  r.getMetaViewport = function getMetaViewport() {
      var t = document.querySelectorAll('meta[name="viewport"]');
      if (0 === t.length)
          return "";
      var r = t[t.length - 1].getAttribute("content");
      return String(r)
  }
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, r, o) {
  t.exports = o(1186)
}
, function(t, r, o) {
  t.exports = !o(350) && !o(482)((function() {
      return 7 != Object.defineProperty(o(964)("div"), "a", {
          get: function() {
              return 7
          }
      }).a
  }
  ))
}
, function(t, r, o) {
  var i = o(349)
    , u = o(334).document
    , c = i(u) && i(u.createElement);
  t.exports = function(t) {
      return c ? u.createElement(t) : {}
  }
}
, function(t, r, o) {
  var i = o(335)
    , u = o(241)
    , c = o(482);
  t.exports = function(t, r) {
      var o = (u.Object || {})[t] || Object[t]
        , a = {};
      a[t] = r(o),
      i(i.S + i.F * c((function() {
          o(1)
      }
      )), "Object", a)
  }
}
, function(t, r) {
  t.exports = function(t) {
      if ("function" != typeof t)
          throw TypeError(t + " is not a function!");
      return t
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(755)
    , u = o(335)
    , c = o(809)
    , a = o(400)
    , l = o(705)
    , p = o(1194)
    , d = o(757)
    , v = o(1198)
    , y = o(351)("iterator")
    , g = !([].keys && "next"in [].keys())
    , h = "keys"
    , m = "values"
    , returnThis = function() {
      return this
  };
  t.exports = function(t, r, o, b, _, x, w) {
      p(o, r, b);
      var S, E, O, getMethod = function(t) {
          if (!g && t in k)
              return k[t];
          switch (t) {
          case h:
              return function keys() {
                  return new o(this,t)
              }
              ;
          case m:
              return function values() {
                  return new o(this,t)
              }
          }
          return function entries() {
              return new o(this,t)
          }
      }, I = r + " Iterator", A = _ == m, T = !1, k = t.prototype, P = k[y] || k["@@iterator"] || _ && k[_], N = P || getMethod(_), L = _ ? A ? getMethod("entries") : N : void 0, j = "Array" == r && k.entries || P;
      if (j && (O = v(j.call(new t))) !== Object.prototype && O.next && (d(O, I, !0),
      i || "function" == typeof O[y] || a(O, y, returnThis)),
      A && P && P.name !== m && (T = !0,
      N = function values() {
          return P.call(this)
      }
      ),
      i && !w || !g && !T && k[y] || a(k, y, N),
      l[r] = N,
      l[I] = returnThis,
      _)
          if (S = {
              values: A ? N : getMethod(m),
              keys: x ? N : getMethod(h),
              entries: L
          },
          w)
              for (E in S)
                  E in k || c(k, E, S[E]);
          else
              u(u.P + u.F * (g || T), r, S);
      return S
  }
}
, function(t, r, o) {
  var i = o(401)
    , u = o(969)
    , c = o(813)
    , a = o(811)("IE_PROTO")
    , Empty = function() {}
    , createDict = function() {
      var t, r = o(964)("iframe"), i = c.length;
      for (r.style.display = "none",
      o(1197).appendChild(r),
      r.src = "javascript:",
      (t = r.contentWindow.document).open(),
      t.write("<script>document.F=Object<\/script>"),
      t.close(),
      createDict = t.F; i--; )
          delete createDict.prototype[c[i]];
      return createDict()
  };
  t.exports = Object.create || function create(t, r) {
      var o;
      return null !== t ? (Empty.prototype = i(t),
      o = new Empty,
      Empty.prototype = null,
      o[a] = t) : o = createDict(),
      void 0 === r ? o : u(o, r)
  }
}
, function(t, r, o) {
  var i = o(358)
    , u = o(401)
    , c = o(706);
  t.exports = o(350) ? Object.defineProperties : function defineProperties(t, r) {
      u(t);
      for (var o, a = c(r), l = a.length, p = 0; l > p; )
          i.f(t, o = a[p++], r[o]);
      return t
  }
}
, function(t, r, o) {
  var i = o(399)
    , u = o(398)
    , c = o(1195)(!1)
    , a = o(811)("IE_PROTO");
  t.exports = function(t, r) {
      var o, l = u(t), p = 0, d = [];
      for (o in l)
          o != a && i(l, o) && d.push(o);
      for (; r.length > p; )
          i(l, o = r[p++]) && (~c(d, o) || d.push(o));
      return d
  }
}
, function(t, r, o) {
  o(1199);
  for (var i = o(334), u = o(400), c = o(705), a = o(351)("toStringTag"), l = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), p = 0; p < l.length; p++) {
      var d = l[p]
        , v = i[d]
        , y = v && v.prototype;
      y && !y[a] && u(y, a, d),
      c[d] = c.Array
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(334)
    , u = o(399)
    , c = o(350)
    , a = o(335)
    , l = o(809)
    , p = o(758).KEY
    , d = o(482)
    , v = o(812)
    , y = o(757)
    , g = o(756)
    , h = o(351)
    , m = o(814)
    , b = o(815)
    , _ = o(1204)
    , x = o(973)
    , w = o(401)
    , S = o(349)
    , E = o(707)
    , O = o(398)
    , I = o(807)
    , A = o(704)
    , T = o(968)
    , k = o(1205)
    , P = o(806)
    , N = o(759)
    , L = o(358)
    , j = o(706)
    , R = P.f
    , M = L.f
    , C = k.f
    , U = i.Symbol
    , D = i.JSON
    , V = D && D.stringify
    , W = h("_hidden")
    , q = h("toPrimitive")
    , H = {}.propertyIsEnumerable
    , z = v("symbol-registry")
    , K = v("symbols")
    , B = v("op-symbols")
    , G = Object.prototype
    , $ = "function" == typeof U && !!N.f
    , X = i.QObject
    , J = !X || !X.prototype || !X.prototype.findChild
    , Y = c && d((function() {
      return 7 != T(M({}, "a", {
          get: function() {
              return M(this, "a", {
                  value: 7
              }).a
          }
      })).a
  }
  )) ? function(t, r, o) {
      var i = R(G, r);
      i && delete G[r],
      M(t, r, o),
      i && t !== G && M(G, r, i)
  }
  : M
    , wrap = function(t) {
      var r = K[t] = T(U.prototype);
      return r._k = t,
      r
  }
    , Q = $ && "symbol" == typeof U.iterator ? function(t) {
      return "symbol" == typeof t
  }
  : function(t) {
      return t instanceof U
  }
    , Z = function defineProperty(t, r, o) {
      return t === G && Z(B, r, o),
      w(t),
      r = I(r, !0),
      w(o),
      u(K, r) ? (o.enumerable ? (u(t, W) && t[W][r] && (t[W][r] = !1),
      o = T(o, {
          enumerable: A(0, !1)
      })) : (u(t, W) || M(t, W, A(1, {})),
      t[W][r] = !0),
      Y(t, r, o)) : M(t, r, o)
  }
    , tt = function defineProperties(t, r) {
      w(t);
      for (var o, i = _(r = O(r)), u = 0, c = i.length; c > u; )
          Z(t, o = i[u++], r[o]);
      return t
  }
    , et = function propertyIsEnumerable(t) {
      var r = H.call(this, t = I(t, !0));
      return !(this === G && u(K, t) && !u(B, t)) && (!(r || !u(this, t) || !u(K, t) || u(this, W) && this[W][t]) || r)
  }
    , nt = function getOwnPropertyDescriptor(t, r) {
      if (t = O(t),
      r = I(r, !0),
      t !== G || !u(K, r) || u(B, r)) {
          var o = R(t, r);
          return !o || !u(K, r) || u(t, W) && t[W][r] || (o.enumerable = !0),
          o
      }
  }
    , rt = function getOwnPropertyNames(t) {
      for (var r, o = C(O(t)), i = [], c = 0; o.length > c; )
          u(K, r = o[c++]) || r == W || r == p || i.push(r);
      return i
  }
    , ot = function getOwnPropertySymbols(t) {
      for (var r, o = t === G, i = C(o ? B : O(t)), c = [], a = 0; i.length > a; )
          !u(K, r = i[a++]) || o && !u(G, r) || c.push(K[r]);
      return c
  };
  $ || (l((U = function Symbol() {
      if (this instanceof U)
          throw TypeError("Symbol is not a constructor!");
      var t = g(arguments.length > 0 ? arguments[0] : void 0)
        , $set = function(r) {
          this === G && $set.call(B, r),
          u(this, W) && u(this[W], t) && (this[W][t] = !1),
          Y(this, t, A(1, r))
      };
      return c && J && Y(G, t, {
          configurable: !0,
          set: $set
      }),
      wrap(t)
  }
  ).prototype, "toString", (function toString() {
      return this._k
  }
  )),
  P.f = nt,
  L.f = Z,
  o(816).f = k.f = rt,
  o(752).f = et,
  N.f = ot,
  c && !o(755) && l(G, "propertyIsEnumerable", et, !0),
  m.f = function(t) {
      return wrap(h(t))
  }
  ),
  a(a.G + a.W + a.F * !$, {
      Symbol: U
  });
  for (var it = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ut = 0; it.length > ut; )
      h(it[ut++]);
  for (var ct = j(h.store), at = 0; ct.length > at; )
      b(ct[at++]);
  a(a.S + a.F * !$, "Symbol", {
      for: function(t) {
          return u(z, t += "") ? z[t] : z[t] = U(t)
      },
      keyFor: function keyFor(t) {
          if (!Q(t))
              throw TypeError(t + " is not a symbol!");
          for (var r in z)
              if (z[r] === t)
                  return r
      },
      useSetter: function() {
          J = !0
      },
      useSimple: function() {
          J = !1
      }
  }),
  a(a.S + a.F * !$, "Object", {
      create: function create(t, r) {
          return void 0 === r ? T(t) : tt(T(t), r)
      },
      defineProperty: Z,
      defineProperties: tt,
      getOwnPropertyDescriptor: nt,
      getOwnPropertyNames: rt,
      getOwnPropertySymbols: ot
  });
  var st = d((function() {
      N.f(1)
  }
  ));
  a(a.S + a.F * st, "Object", {
      getOwnPropertySymbols: function getOwnPropertySymbols(t) {
          return N.f(E(t))
      }
  }),
  D && a(a.S + a.F * (!$ || d((function() {
      var t = U();
      return "[null]" != V([t]) || "{}" != V({
          a: t
      }) || "{}" != V(Object(t))
  }
  ))), "JSON", {
      stringify: function stringify(t) {
          for (var r, o, i = [t], u = 1; arguments.length > u; )
              i.push(arguments[u++]);
          if (o = r = i[1],
          (S(r) || void 0 !== t) && !Q(t))
              return x(r) || (r = function(t, r) {
                  if ("function" == typeof o && (r = o.call(this, t, r)),
                  !Q(r))
                      return r
              }
              ),
              i[1] = r,
              V.apply(D, i)
      }
  }),
  U.prototype[q] || o(400)(U.prototype, q, U.prototype.valueOf),
  y(U, "Symbol"),
  y(Math, "Math", !0),
  y(i.JSON, "JSON", !0)
}
, function(t, r, o) {
  var i = o(804);
  t.exports = Array.isArray || function isArray(t) {
      return "Array" == i(t)
  }
}
, function(t, r) {}
, function(t, r, o) {
  "use strict";
  var i = o(350)
    , u = o(706)
    , c = o(759)
    , a = o(752)
    , l = o(707)
    , p = o(803)
    , d = Object.assign;
  t.exports = !d || o(482)((function() {
      var t = {}
        , r = {}
        , o = Symbol()
        , i = "abcdefghijklmnopqrst";
      return t[o] = 7,
      i.split("").forEach((function(t) {
          r[t] = t
      }
      )),
      7 != d({}, t)[o] || Object.keys(d({}, r)).join("") != i
  }
  )) ? function assign(t, r) {
      for (var o = l(t), d = arguments.length, v = 1, y = c.f, g = a.f; d > v; )
          for (var h, m = p(arguments[v++]), b = y ? u(m).concat(y(m)) : u(m), _ = b.length, x = 0; _ > x; )
              h = b[x++],
              i && !g.call(m, h) || (o[h] = m[h]);
      return o
  }
  : d
}
, function(t, r, o) {
  var i = o(400);
  t.exports = function(t, r, o) {
      for (var u in r)
          o && t[u] ? t[u] = r[u] : i(t, u, r[u]);
      return t
  }
}
, function(t, r) {
  t.exports = function(t, r, o, i) {
      if (!(t instanceof r) || void 0 !== i && i in t)
          throw TypeError(o + ": incorrect invocation!");
      return t
  }
}
, function(t, r, o) {
  t.exports = o(1237)
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, r, o) {
  t.exports = o(1185)
}
, function(t, r, o) {
  "use strict";
  var i = o(751)
    , u = o(1223)
    , c = i(o(1249))
    , a = i(o(820))
    , l = o(84);
  void 0 !== window.Plaid && console.warn("Warning: The Plaid link-initialize.js script was embedded more than once. This is an unsupported configuration and may lead to unpredictable behavior. Please ensure Plaid Link is embedded only once per page.");
  var p = {
      version: l.VERSION,
      create: u.create
  };
  window.Plaid = p;
  var d = a.findScriptTag();
  c.setUp(p, d),
  t.exports = p;
  var v = document.createElement("link");
  v.href = l.LINK_CLIENT_URL + "/link-dynamic-loader.js",
  v.rel = "prefetch",
  v.as = "script",
  document.head.appendChild(v)
}
, function(t, r, o) {
  o(1187);
  var i = o(241).Object;
  t.exports = function getOwnPropertyDescriptor(t, r) {
      return i.getOwnPropertyDescriptor(t, r)
  }
}
, function(t, r, o) {
  var i = o(398)
    , u = o(806).f;
  o(965)("getOwnPropertyDescriptor", (function() {
      return function getOwnPropertyDescriptor(t, r) {
          return u(i(t), r)
      }
  }
  ))
}
, function(t, r, o) {
  o(1189);
  var i = o(241).Object;
  t.exports = function defineProperty(t, r, o) {
      return i.defineProperty(t, r, o)
  }
}
, function(t, r, o) {
  var i = o(335);
  i(i.S + i.F * !o(350), "Object", {
      defineProperty: o(358).f
  })
}
, function(t, r, o) {
  t.exports = o(1191)
}
, function(t, r, o) {
  o(1192),
  o(971),
  t.exports = o(814).f("iterator")
}
, function(t, r, o) {
  "use strict";
  var i = o(1193)(!0);
  o(967)(String, "String", (function(t) {
      this._t = String(t),
      this._i = 0
  }
  ), (function() {
      var t, r = this._t, o = this._i;
      return o >= r.length ? {
          value: void 0,
          done: !0
      } : (t = i(r, o),
      this._i += t.length,
      {
          value: t,
          done: !1
      })
  }
  ))
}
, function(t, r, o) {
  var i = o(808)
    , u = o(805);
  t.exports = function(t) {
      return function(r, o) {
          var c, a, l = String(u(r)), p = i(o), d = l.length;
          return p < 0 || p >= d ? t ? "" : void 0 : (c = l.charCodeAt(p)) < 55296 || c > 56319 || p + 1 === d || (a = l.charCodeAt(p + 1)) < 56320 || a > 57343 ? t ? l.charAt(p) : c : t ? l.slice(p, p + 2) : a - 56320 + (c - 55296 << 10) + 65536
      }
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(968)
    , u = o(704)
    , c = o(757)
    , a = {};
  o(400)(a, o(351)("iterator"), (function() {
      return this
  }
  )),
  t.exports = function(t, r, o) {
      t.prototype = i(a, {
          next: u(1, o)
      }),
      c(t, r + " Iterator")
  }
}
, function(t, r, o) {
  var i = o(398)
    , u = o(810)
    , c = o(1196);
  t.exports = function(t) {
      return function(r, o, a) {
          var l, p = i(r), d = u(p.length), v = c(a, d);
          if (t && o != o) {
              for (; d > v; )
                  if ((l = p[v++]) != l)
                      return !0
          } else
              for (; d > v; v++)
                  if ((t || v in p) && p[v] === o)
                      return t || v || 0;
          return !t && -1
      }
  }
}
, function(t, r, o) {
  var i = o(808)
    , u = Math.max
    , c = Math.min;
  t.exports = function(t, r) {
      return (t = i(t)) < 0 ? u(t + r, 0) : c(t, r)
  }
}
, function(t, r, o) {
  var i = o(334).document;
  t.exports = i && i.documentElement
}
, function(t, r, o) {
  var i = o(399)
    , u = o(707)
    , c = o(811)("IE_PROTO")
    , a = Object.prototype;
  t.exports = Object.getPrototypeOf || function(t) {
      return t = u(t),
      i(t, c) ? t[c] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(1200)
    , u = o(1201)
    , c = o(705)
    , a = o(398);
  t.exports = o(967)(Array, "Array", (function(t, r) {
      this._t = a(t),
      this._i = 0,
      this._k = r
  }
  ), (function() {
      var t = this._t
        , r = this._k
        , o = this._i++;
      return !t || o >= t.length ? (this._t = void 0,
      u(1)) : u(0, "keys" == r ? o : "values" == r ? t[o] : [o, t[o]])
  }
  ), "values"),
  c.Arguments = c.Array,
  i("keys"),
  i("values"),
  i("entries")
}
, function(t, r) {
  t.exports = function() {}
}
, function(t, r) {
  t.exports = function(t, r) {
      return {
          value: r,
          done: !!t
      }
  }
}
, function(t, r, o) {
  t.exports = o(1203)
}
, function(t, r, o) {
  o(972),
  o(974),
  o(1206),
  o(1207),
  t.exports = o(241).Symbol
}
, function(t, r, o) {
  var i = o(706)
    , u = o(759)
    , c = o(752);
  t.exports = function(t) {
      var r = i(t)
        , o = u.f;
      if (o)
          for (var a, l = o(t), p = c.f, d = 0; l.length > d; )
              p.call(t, a = l[d++]) && r.push(a);
      return r
  }
}
, function(t, r, o) {
  var i = o(398)
    , u = o(816).f
    , c = {}.toString
    , a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  t.exports.f = function getOwnPropertyNames(t) {
      return a && "[object Window]" == c.call(t) ? function(t) {
          try {
              return u(t)
          } catch (t) {
              return a.slice()
          }
      }(t) : u(i(t))
  }
}
, function(t, r, o) {
  o(815)("asyncIterator")
}
, function(t, r, o) {
  o(815)("observable")
}
, function(t, r, o) {
  t.exports = o(1209)
}
, function(t, r, o) {
  o(974),
  o(971),
  o(1210),
  o(1219),
  o(1221),
  t.exports = o(241).WeakMap
}
, function(t, r, o) {
  "use strict";
  var i, u = o(334), c = o(817)(0), a = o(809), l = o(758), p = o(975), d = o(1213), v = o(349), y = o(819), g = o(819), h = !u.ActiveXObject && "ActiveXObject"in u, m = "WeakMap", b = l.getWeak, _ = Object.isExtensible, x = d.ufstore, wrapper = function(t) {
      return function WeakMap() {
          return t(this, arguments.length > 0 ? arguments[0] : void 0)
      }
  }, w = {
      get: function get(t) {
          if (v(t)) {
              var r = b(t);
              return !0 === r ? x(y(this, m)).get(t) : r ? r[this._i] : void 0
          }
      },
      set: function set(t, r) {
          return d.def(y(this, m), t, r)
      }
  }, S = t.exports = o(1218)(m, wrapper, w, d, !0, !0);
  g && h && (p((i = d.getConstructor(wrapper, m)).prototype, w),
  l.NEED = !0,
  c(["delete", "has", "get", "set"], (function(t) {
      var r = S.prototype
        , o = r[t];
      a(r, t, (function(r, u) {
          if (v(r) && !_(r)) {
              this._f || (this._f = new i);
              var c = this._f[t](r, u);
              return "set" == t ? this : c
          }
          return o.call(this, r, u)
      }
      ))
  }
  )))
}
, function(t, r, o) {
  var i = o(1212);
  t.exports = function(t, r) {
      return new (i(t))(r)
  }
}
, function(t, r, o) {
  var i = o(349)
    , u = o(973)
    , c = o(351)("species");
  t.exports = function(t) {
      var r;
      return u(t) && ("function" != typeof (r = t.constructor) || r !== Array && !u(r.prototype) || (r = void 0),
      i(r) && null === (r = r[c]) && (r = void 0)),
      void 0 === r ? Array : r
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(976)
    , u = o(758).getWeak
    , c = o(401)
    , a = o(349)
    , l = o(977)
    , p = o(818)
    , d = o(817)
    , v = o(399)
    , y = o(819)
    , g = d(5)
    , h = d(6)
    , m = 0
    , uncaughtFrozenStore = function(t) {
      return t._l || (t._l = new UncaughtFrozenStore)
  }
    , UncaughtFrozenStore = function() {
      this.a = []
  }
    , findUncaughtFrozen = function(t, r) {
      return g(t.a, (function(t) {
          return t[0] === r
      }
      ))
  };
  UncaughtFrozenStore.prototype = {
      get: function(t) {
          var r = findUncaughtFrozen(this, t);
          if (r)
              return r[1]
      },
      has: function(t) {
          return !!findUncaughtFrozen(this, t)
      },
      set: function(t, r) {
          var o = findUncaughtFrozen(this, t);
          o ? o[1] = r : this.a.push([t, r])
      },
      delete: function(t) {
          var r = h(this.a, (function(r) {
              return r[0] === t
          }
          ));
          return ~r && this.a.splice(r, 1),
          !!~r
      }
  },
  t.exports = {
      getConstructor: function(t, r, o, c) {
          var d = t((function(t, i) {
              l(t, d, r, "_i"),
              t._t = r,
              t._i = m++,
              t._l = void 0,
              null != i && p(i, o, t[c], t)
          }
          ));
          return i(d.prototype, {
              delete: function(t) {
                  if (!a(t))
                      return !1;
                  var o = u(t);
                  return !0 === o ? uncaughtFrozenStore(y(this, r)).delete(t) : o && v(o, this._i) && delete o[this._i]
              },
              has: function has(t) {
                  if (!a(t))
                      return !1;
                  var o = u(t);
                  return !0 === o ? uncaughtFrozenStore(y(this, r)).has(t) : o && v(o, this._i)
              }
          }),
          d
      },
      def: function(t, r, o) {
          var i = u(c(r), !0);
          return !0 === i ? uncaughtFrozenStore(t).set(r, o) : i[t._i] = o,
          t
      },
      ufstore: uncaughtFrozenStore
  }
}
, function(t, r, o) {
  var i = o(401);
  t.exports = function(t, r, o, u) {
      try {
          return u ? r(i(o)[0], o[1]) : r(o)
      } catch (r) {
          var c = t.return;
          throw void 0 !== c && i(c.call(t)),
          r
      }
  }
}
, function(t, r, o) {
  var i = o(705)
    , u = o(351)("iterator")
    , c = Array.prototype;
  t.exports = function(t) {
      return void 0 !== t && (i.Array === t || c[u] === t)
  }
}
, function(t, r, o) {
  var i = o(1217)
    , u = o(351)("iterator")
    , c = o(705);
  t.exports = o(241).getIteratorMethod = function(t) {
      if (null != t)
          return t[u] || t["@@iterator"] || c[i(t)]
  }
}
, function(t, r, o) {
  var i = o(804)
    , u = o(351)("toStringTag")
    , c = "Arguments" == i(function() {
      return arguments
  }());
  t.exports = function(t) {
      var r, o, a;
      return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (o = function(t, r) {
          try {
              return t[r]
          } catch (t) {}
      }(r = Object(t), u)) ? o : c ? i(r) : "Object" == (a = i(r)) && "function" == typeof r.callee ? "Arguments" : a
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(334)
    , u = o(335)
    , c = o(758)
    , a = o(482)
    , l = o(400)
    , p = o(976)
    , d = o(818)
    , v = o(977)
    , y = o(349)
    , g = o(757)
    , h = o(358).f
    , m = o(817)(0)
    , b = o(350);
  t.exports = function(t, r, o, _, x, w) {
      var S = i[t]
        , E = S
        , O = x ? "set" : "add"
        , I = E && E.prototype
        , A = {};
      return b && "function" == typeof E && (w || I.forEach && !a((function() {
          (new E).entries().next()
      }
      ))) ? (E = r((function(r, o) {
          v(r, E, t, "_c"),
          r._c = new S,
          null != o && d(o, x, r[O], r)
      }
      )),
      m("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","), (function(t) {
          var r = "add" == t || "set" == t;
          !(t in I) || w && "clear" == t || l(E.prototype, t, (function(o, i) {
              if (v(this, E, t),
              !r && w && !y(o))
                  return "get" == t && void 0;
              var u = this._c[t](0 === o ? 0 : o, i);
              return r ? this : u
          }
          ))
      }
      )),
      w || h(E.prototype, "size", {
          get: function() {
              return this._c.size
          }
      })) : (E = _.getConstructor(r, t, x, O),
      p(E.prototype, o),
      c.NEED = !0),
      g(E, t),
      A[t] = E,
      u(u.G + u.W + u.F, A),
      w || _.setStrong(E, t, x),
      E
  }
}
, function(t, r, o) {
  o(1220)("WeakMap")
}
, function(t, r, o) {
  "use strict";
  var i = o(335);
  t.exports = function(t) {
      i(i.S, t, {
          of: function of() {
              for (var t = arguments.length, r = new Array(t); t--; )
                  r[t] = arguments[t];
              return new this(r)
          }
      })
  }
}
, function(t, r, o) {
  o(1222)("WeakMap")
}
, function(t, r, o) {
  "use strict";
  var i = o(335)
    , u = o(966)
    , c = o(753)
    , a = o(818);
  t.exports = function(t) {
      i(i.S, t, {
          from: function from(t) {
              var r, o, i, l, p = arguments[1];
              return u(this),
              (r = void 0 !== p) && u(p),
              null == t ? new this : (o = [],
              r ? (i = 0,
              l = c(p, arguments[2], 2),
              a(t, !1, (function(t) {
                  o.push(l(t, i++))
              }
              ))) : a(t, !1, o.push, o),
              new this(o))
          }
      })
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(751)
    , u = o(708)
    , c = o(359)
    , a = o(1224)
    , l = o(1227)
    , p = o(962)
    , d = o(1232)
    , v = o(1234);
  c(r, "__esModule", {
      value: !0
  }),
  r.create = void 0;
  var y = u(o(978))
    , g = u(o(1238))
    , h = u(o(1239))
    , m = i(o(1242))
    , b = i(o(1243))
    , _ = i(o(820))
    , x = u(o(409))
    , w = u(o(214));
  function ownKeys(t, r) {
      var o = v(t);
      if (d) {
          var i = d(t);
          r && (i = i.filter((function(r) {
              return p(t, r).enumerable
          }
          ))),
          o.push.apply(o, i)
      }
      return o
  }
  function _objectSpread(t) {
      for (var r = 1; r < arguments.length; r++) {
          var o = null != arguments[r] ? arguments[r] : {};
          r % 2 ? ownKeys(Object(o), !0).forEach((function(r) {
              (0,
              g.default)(t, r, o[r])
          }
          )) : l ? a(t, l(o)) : ownKeys(Object(o)).forEach((function(r) {
              c(t, r, p(o, r))
          }
          ))
      }
      return t
  }
  var S = o(84)
    , E = S.PLAID_LINK_BUTTON_ID
    , O = S.VERSION
    , I = o(1248)
    , A = I.validateCreateOptions
    , T = I.validateExitOptions;
  r.create = function create(t) {
      var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      A(t, r);
      var o = (0,
      h.default)()
        , i = !0 === r.forceDesktop
        , u = !0 === r.forceMobile
        , c = !0 === r.logInternalAnalytics
        , a = !0 === r.isPrivacyPortalItemAdd
        , l = r.institutionContactMessagingInstitutions
        , p = !0 === r.isHostedTrustedAuth
        , d = !i && (0,
      x.default)().isMobile || u
        , v = _.getUniqueId()
        , g = (d ? b : m).create()
        , S = P(_objectSpread(_objectSpread({}, t), {}, {
          enableThreadsDemo: t.enableThreadsDemo,
          uiOverride: r.uiOverride,
          isPrivacyPortalItemAdd: a,
          isMobile: d,
          logInternalAnalytics: c,
          uniqueId: v,
          institutionContactMessagingInstitutions: l,
          workflowVersionOverride: r.workflowVersionOverride,
          isHostedTrustedAuth: p
      }))
        , O = k(S)
        , I = _.buildLinkUrl(O, r.enableFlexLink)
        , N = function performOpen(t) {
          var r = t.institutionId
            , o = t.openStartedAt
            , i = t.createToOnLoadInterval
            , u = t.createToOpenInterval;
          _.sendMessage(g)({
              action: "open",
              institution: r,
              openStartedAt: o,
              createToOnLoadInterval: i,
              createToOpenInterval: u
          })
      }
        , L = function sendHeartBeat() {
          try {
              var t, r = new XMLHttpRequest, o = (0,
              w.default)(null !== (t = S.env) && void 0 !== t ? t : "");
              r.onerror = function() {}
              ,
              r.open("POST", o + "/link/heartbeat", !0),
              r.setRequestHeader("Content-Type", "application/json"),
              r.send((0,
              y.default)({
                  a: !0,
                  b: !0
              }))
          } catch (t) {}
      }
        , j = function hideLinkAndFocusLinkTrigger() {
          g.hide(),
          null != C && C.focus()
      }
        , R = _.createMessageHandler(v, {
          exit: function exit(r) {
              "function" == typeof t.onExit && t.onExit(r.error, r.metadata),
              j()
          },
          result: function result(r) {
              "function" == typeof t.onResult && t.onResult(r.incremental_result)
          },
          event: function event(r) {
              "function" == typeof t.onEvent && t.onEvent(r.eventName, r.metadata)
          },
          close: function close() {
              j()
          },
          connected: function connected(r) {
              t.onSuccess(r.metadata.public_token, r.metadata),
              j()
          },
          "early-handoff": function earlyHandoff(r) {
              t.onSuccess(r.metadata.public_token, r.metadata)
          },
          acknowledged: function acknowledged() {
              var t = document.getElementById(E);
              null != t && (t.disabled = !1)
          },
          "ready-for-configure": function readyForConfigure() {
              _.sendMessage(g)({
                  action: "configure",
                  config: S
              })
          },
          ready: function ready() {
              D = !0,
              W = (0,
              h.default)() - o,
              V(),
              "function" == typeof t.onLoad && t.onLoad()
          },
          "tracking-ready": function trackingReady() {
              q = !0,
              H()
          },
          resize: function resize(t) {
              null != t.height && null != g.resize && g.resize(t.height)
          }
      })
        , M = function exit(r) {
          g.isOpen() && (T(t, r),
          _.sendMessage(g)({
              action: "exit",
              config: r
          }))
      };
      window.addEventListener("message", R, !1);
      var C, U = !1, D = !1, V = function onReady() {}, W = null, q = !1, H = function onTrackingReady() {};
      g.initialize(I, v);
      var z = function open() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
          if (C = document.activeElement,
          U)
              throw new Error("Cannot call open() on Link handler that is already destroyed");
          q ? _.sendMessage(g)({
              action: "track_open"
          }) : H = function onTrackingReady() {
              return _.sendMessage(g)({
                  action: "track_open"
              })
          }
          ,
          L(),
          g.show();
          var r = (0,
          h.default)()
            , i = (0,
          h.default)() - o;
          D ? N({
              institutionId: t,
              openStartedAt: r,
              createToOnLoadInterval: W,
              createToOpenInterval: i
          }) : V = function onReady() {
              N({
                  institutionId: t,
                  openStartedAt: r,
                  createToOnLoadInterval: W,
                  createToOpenInterval: i
              })
          }
      }
        , K = function destroy() {
          U = !0,
          g.destroy(),
          window.removeEventListener("message", R)
      };
      return {
          exit: M,
          open: z,
          destroy: K
      }
  }
  ;
  var k = function getQueryParameters(t) {
      var r = t.countryCodes
        , o = t.env
        , i = t.experimentVariants
        , u = t.key
        , c = t.token
        , a = t.language
        , l = t.linkCustomizationName
        , p = t.origin
        , d = t.product
        , v = t.accountSubtypes
        , g = t.uniqueId
        , h = t.oauthStateId
        , m = t.isHostedTrustedAuth;
      return {
          countryCodes: r,
          env: o,
          experimentVariants: null == i ? void 0 : (0,
          y.default)(i),
          isLinkInitialize: !0,
          key: u,
          token: c,
          language: a,
          linkCustomizationName: l,
          origin: p,
          product: d,
          accountSubtypes: (0,
          y.default)(v),
          uniqueId: g,
          version: O,
          oauthStateId: h,
          isHostedTrustedAuth: null != m && m
      }
  }
    , P = function getConfig(t) {
      var r = t.apiVersion
        , o = t.clientName
        , i = t.configUserId
        , u = t.configUserTags
        , c = t.countryCodes
        , a = t.customizations
        , l = t.depositSwitchToken
        , p = t.enableThreadsDemo
        , d = t.env
        , v = t.experimentVariants
        , y = t.institutionContactMessagingInstitutions
        , g = t.isEmbedded
        , h = t.isMobile
        , m = t.isPrivacyPortalItemAdd
        , x = t.isSimpleIntegration
        , w = t.key
        , S = t.language
        , E = t.linkCustomizationName
        , I = t.logInternalAnalytics
        , A = t.oauthNonce
        , T = t.oauthRedirectUri
        , k = t.oauthStateId
        , P = t.onEvent
        , N = t.onResult
        , L = t.onExit
        , j = t.onLoad
        , R = t.paymentToken
        , M = t.product
        , C = t.receivedRedirectUri
        , U = t.accountSubtypes
        , D = t.selectAccount
        , V = t.token
        , W = t.uiOverride
        , q = t.uniqueId
        , H = t.user
        , z = t.userLegalName
        , K = t.userEmailAddress
        , B = t.userPhoneNumber
        , G = t.webhook
        , $ = t.workflowVersionOverride
        , X = t.isHostedTrustedAuth;
      return {
          apiVersion: r,
          clientName: o,
          configUserId: i,
          configUserTags: u,
          countryCodes: c,
          customizations: a,
          depositSwitchToken: l,
          enableThreadsDemo: p,
          env: d,
          experimentVariants: v,
          forceIframe: !0,
          institutionContactMessagingInstitutions: y,
          isPrivacyPortalItemAdd: m,
          isEmbedded: g,
          isMobile: h,
          isParentInlineStylesheetSupported: b.isInlineStylesheetSupported(),
          isParentMetaViewportSet: b.isMetaViewportSet(),
          isSimpleIntegration: !0 === x,
          isUsingOnEventCallback: "function" == typeof P,
          isUsingOnResultCallback: "function" == typeof N,
          isUsingOnExitCallback: "function" == typeof L,
          isUsingOnLoadCallback: "function" == typeof j,
          key: w,
          language: S,
          linkCustomizationName: E,
          logInternalAnalytics: !0 === I,
          oauthNonce: A,
          oauthRedirectUri: T,
          oauthStateId: k,
          origin: _.getWindowOrigin(),
          parentMetaViewport: _.getMetaViewport(),
          paymentToken: R,
          product: M,
          receivedRedirectUri: C,
          accountSubtypes: U,
          selectAccount: !0 === D,
          token: V,
          uniqueId: q,
          uiOverride: W,
          user: H,
          userLegalName: z,
          userEmailAddress: K,
          userPhoneNumber: B,
          version: O,
          webhook: G,
          workflowVersionOverride: $,
          isHostedTrustedAuth: X
      }
  }
}
, function(t, r, o) {
  t.exports = o(1225)
}
, function(t, r, o) {
  o(1226);
  var i = o(241).Object;
  t.exports = function defineProperties(t, r) {
      return i.defineProperties(t, r)
  }
}
, function(t, r, o) {
  var i = o(335);
  i(i.S + i.F * !o(350), "Object", {
      defineProperties: o(969)
  })
}
, function(t, r, o) {
  t.exports = o(1228)
}
, function(t, r, o) {
  o(1229),
  t.exports = o(241).Object.getOwnPropertyDescriptors
}
, function(t, r, o) {
  var i = o(335)
    , u = o(1230)
    , c = o(398)
    , a = o(806)
    , l = o(1231);
  i(i.S, "Object", {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
          for (var r, o, i = c(t), p = a.f, d = u(i), v = {}, y = 0; d.length > y; )
              void 0 !== (o = p(i, r = d[y++])) && l(v, r, o);
          return v
      }
  })
}
, function(t, r, o) {
  var i = o(816)
    , u = o(759)
    , c = o(401)
    , a = o(334).Reflect;
  t.exports = a && a.ownKeys || function ownKeys(t) {
      var r = i.f(c(t))
        , o = u.f;
      return o ? r.concat(o(t)) : r
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(358)
    , u = o(704);
  t.exports = function(t, r, o) {
      r in t ? i.f(t, r, u(0, o)) : t[r] = o
  }
}
, function(t, r, o) {
  t.exports = o(1233)
}
, function(t, r, o) {
  o(972),
  t.exports = o(241).Object.getOwnPropertySymbols
}
, function(t, r, o) {
  t.exports = o(1235)
}
, function(t, r, o) {
  o(1236),
  t.exports = o(241).Object.keys
}
, function(t, r, o) {
  var i = o(707)
    , u = o(706);
  o(965)("keys", (function() {
      return function keys(t) {
          return u(i(t))
      }
  }
  ))
}
, function(t, r, o) {
  var i = o(241)
    , u = i.JSON || (i.JSON = {
      stringify: JSON.stringify
  });
  t.exports = function stringify(t) {
      return u.stringify.apply(u, arguments)
  }
}
, function(t, r, o) {
  var i = o(359);
  t.exports = function _defineProperty(t, r, o) {
      return r in t ? i(t, r, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[r] = o,
      t
  }
}
, function(t, r, o) {
  t.exports = o(1240)
}
, function(t, r, o) {
  o(1241),
  t.exports = o(241).Date.now
}
, function(t, r, o) {
  var i = o(335);
  i(i.S, "Date", {
      now: function() {
          return (new Date).getTime()
      }
  })
}
, function(t, r, o) {
  "use strict";
  o(359)(r, "__esModule", {
      value: !0
  }),
  r.create = void 0;
  r.create = function create() {
      var t = document.body.style.overflow
        , r = null
        , o = !1
        , i = function hide() {
          o = !1,
          null != r && (r.style.display = "none"),
          document.body.style.overflow = t,
          window.parent.focus()
      };
      return {
          initialize: function initialize(t, o) {
              (r = document.createElement("iframe")).id = "plaid-link-iframe-".concat(o),
              r.title = "Plaid Link",
              r.src = t,
              r.width = "100%",
              r.height = "100%",
              r.style.position = "fixed",
              r.style.top = "0",
              r.style.left = "0",
              r.style.right = "0",
              r.style.bottom = "0",
              r.style.zIndex = "9999999999",
              r.style.borderWidth = "0",
              r.style.display = "none",
              r.style.overflowX = "hidden",
              r.style.overflowY = "auto",
              document.body.appendChild(r)
          },
          show: function show() {
              o = !0,
              t = document.body.style.overflow,
              document.body.style.overflow = "hidden",
              null != r && (r.style.display = "block",
              null != r.contentWindow && r.contentWindow.focus())
          },
          hide: i,
          postMessage: function postMessage(t, o) {
              null != r && null != r.contentWindow && r.contentWindow.postMessage(t, o)
          },
          isOpen: function isOpen() {
              return !0 === o
          },
          resize: function resize() {},
          destroy: function destroy() {
              var t;
              (i(),
              null != r) && (null === (t = r.parentElement) || void 0 === t || t.removeChild(r),
              r = null)
          }
      }
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(708)
    , u = o(751)
    , c = o(359);
  o(20),
  o(92),
  c(r, "__esModule", {
      value: !0
  }),
  r.isSupported = r.isMetaViewportSet = r.isInlineStylesheetSupported = r.create = void 0;
  var a = u(o(820))
    , l = i(o(409))
    , p = "plaid-link-temporary-id"
    , d = "plaid-link-iframe"
    , v = "plaid-link-stylesheet"
    , y = "html" + Array(9).join("#".concat(p))
    , g = "\n  ".concat(y, ",\n  ").concat(y, " > body {\n    border: 0 !important;\n    height: 100% !important;\n    margin: 0 !important;\n    max-height: auto !important;\n    max-width: auto !important;\n    min-height: 0 !important;\n    min-width: 0 !important;\n    padding: 0 !important;\n    position: static !important;\n    width: auto !important;\n  }\n  ").concat(y, " > body > * {\n    display: none !important;\n  }\n  ").concat(y, " > body > .").concat(d, " {\n    border: 0 !important;\n    height: auto !important;\n    min-height: 100% !important;\n    width: 100% !important;\n  }\n");
  r.create = function create() {
      var t = null
        , r = !1
        , o = ""
        , i = ""
        , u = ""
        , c = {
          x: 0,
          y: 0
      }
        , a = function hide() {
          r = !1,
          t && t.style.setProperty("display", "none", "important"),
          function restoreAllElements() {
              var t = document.getElementById(v);
              t && t.parentNode && t.parentNode.removeChild(t),
              document.documentElement.id = o,
              document.documentElement.style.setProperty(i, u)
          }(),
          function restoreScroll() {
              window.scrollTo(c.x, c.y)
          }(),
          window.parent.focus()
      };
      return {
          hide: a,
          initialize: function initialize(r, o) {
              (t = document.createElement("iframe")).className = d,
              t.title = "Plaid Link",
              t.id = "plaid-link-iframe-".concat(o),
              t.src = r,
              t.style.setProperty("display", "none", "important"),
              document.body.appendChild(t)
          },
          isOpen: function isOpen() {
              return !0 === r
          },
          postMessage: function postMessage(r, o) {
              null != t && null != t.contentWindow && t.contentWindow.postMessage(r, o)
          },
          resize: function resize(t) {
              document.documentElement.style.setProperty("height", t, "important")
          },
          show: function show() {
              r || (r = !0,
              function saveScroll() {
                  c = {
                      x: document.documentElement.scrollLeft,
                      y: document.documentElement.scrollTop
                  }
              }(),
              function hideAllElements() {
                  o = document.documentElement.id,
                  i = document.documentElement.style.getPropertyValue("height"),
                  u = document.documentElement.style.getPropertyPriority("height");
                  var t = document.createElement("style");
                  t.id = v,
                  t.textContent = g;
                  var r = document.querySelector("head");
                  null != r && r.appendChild(t),
                  document.documentElement.id = p
              }(),
              window.scrollTo(0, 0),
              t && ((0,
              l.default)().isIOSChrome && setTimeout((function() {
                  document.body.style.setProperty("height", window.innerHeight + "px", "important")
              }
              ), 100),
              t.style.setProperty("display", "block", "important"),
              t.contentWindow && t.contentWindow.focus()))
          },
          destroy: function destroy() {
              var r;
              (a(),
              null != t) && (null === (r = t.parentElement) || void 0 === r || r.removeChild(t),
              t = null)
          }
      }
  }
  ;
  var h = function isInlineStylesheetSupported() {
      try {
          var t = "link-stylesheet-test-".concat(Math.floor(100 * Math.random()))
            , r = document.createElement("div");
          r.id = t;
          var o = document.createElement("style");
          o.textContent = "#".concat(t, " { width: 100px; height: 100px; }");
          var i = document.body;
          i.appendChild(r),
          i.appendChild(o);
          var u = 100 === r.offsetWidth;
          return i.removeChild(r),
          i.removeChild(o),
          u
      } catch (t) {
          return !1
      }
  };
  r.isInlineStylesheetSupported = h;
  var m = function isMetaViewportSet() {
      return /device-width/.test(a.getMetaViewport())
  };
  r.isMetaViewportSet = m;
  r.isSupported = function isSupported() {
      return h() && m()
  }
}
, function(t, r, o) {
  t.exports = o(1245)
}
, function(t, r, o) {
  o(1246),
  t.exports = o(241).Object.assign
}
, function(t, r, o) {
  var i = o(335);
  i(i.S + i.F, "Object", {
      assign: o(975)
  })
}
, function(t, r, o) {
  "use strict";
  o(359)(r, "__esModule", {
      value: !0
  }),
  r.FLEX_LINK_HTML_PATH = r.LINK_HTML_PATH = r.LINK_CLIENT_STABLE_URL = r.LINK_CLIENT_URL = void 0;
  var i = String("https://cdn.plaid.com/link/2.0.1227");
  r.LINK_CLIENT_URL = i;
  var u = String("https://cdn.plaid.com/link/v2/stable");
  r.LINK_CLIENT_STABLE_URL = u;
  r.LINK_HTML_PATH = "/link.html";
  r.FLEX_LINK_HTML_PATH = "/flink.html"
}
, function(t, r, o) {
  "use strict";
  var i = o(708)
    , u = o(359);
  o(78),
  u(r, "__esModule", {
      value: !0
  }),
  r.validateExitOptions = r.validateCreateOptions = void 0;
  var c = i(o(754))
    , a = o(84)
    , l = function getValidationHandlers(t) {
      var r = t.env;
      return {
          error: function error(t) {
              if ("production" !== r)
                  throw new Error(t)
          },
          warn: function warn(t) {
              "production" !== r && console.warn(t)
          }
      }
  };
  r.validateCreateOptions = function validateCreateOptions(t, r) {
      if (!0 === r.isHostedTrustedAuth)
          !function validateHTACreateOptions(t) {
              var r = l(t).error;
              null == t.oauthStateId && r("missing oauth state ID in HTA create")
          }(t);
      else {
          var o = l(t)
            , i = o.error
            , u = o.warn;
          !function validateCreateKeys(t) {
              var r = l(t).warn;
              for (var o in t)
                  a.CREATE_PARAMETERS.indexOf(o) < 0 && r("Invalid Link parameter: ".concat(o, " is not a valid Plaid.create() parameter"))
          }(t),
          "function" != typeof t.onSuccess && i("Invalid onSuccess function"),
          void 0 !== t.forceIframe && u("The forceIframe option has been deprecated. Link will use an iframe by default when possible."),
          null == t.key && null == t.token && i("Missing Link parameter. Link requires a key or token to be provided.")
      }
  }
  ;
  r.validateExitOptions = function validateExitOptions(t, r) {
      var o = l(t).error;
      return null == r || "object" !== (0,
      c.default)(r) && o("Invalid exit parameter, must be an Object"),
      null
  }
}
, function(t, r, o) {
  "use strict";
  var i = o(708)
    , u = o(359);
  o(20),
  o(92),
  o(10),
  o(69),
  o(36),
  u(r, "__esModule", {
      value: !0
  }),
  r.setUp = void 0;
  var c = i(o(754))
    , a = o(84)
    , l = o(165)
    , p = function traverse(t, r) {
      var o = function _loop(o) {
          "object" === (0,
          c.default)(t[o]) ? traverse(t[o], (function(t, i) {
              r([o].concat(t), i)
          }
          )) : r([o], t[o])
      };
      for (var i in t)
          o(i)
  };
  r.setUp = function setUp(t, r) {
      var o = r.getAttribute("data-form-id");
      if (null != o) {
          var i = document.getElementById(o);
          if (null == i)
              throw new Error("Uncaught Error: Specify a valid data-form-id");
          var u = r.getAttribute("data-api-version")
            , c = r.getAttribute("data-client-name")
            , d = r.getAttribute("data-product")
            , v = r.getAttribute("data-key")
            , y = r.getAttribute("data-env")
            , g = "true" === r.getAttribute("data-select-account")
            , h = r.getAttribute("data-token")
            , m = r.getAttribute("data-webhook")
            , b = r.getAttribute("data-ui-override")
            , _ = null != r.getAttribute("data-longtail") || null != r.getAttribute("data-long-tail") || null
            , x = t.create({
              apiVersion: u,
              clientName: c,
              env: y,
              isSimpleIntegration: !0,
              key: v,
              longtail: _,
              onSuccess: function onSuccess(t, r) {
                  p(r, (function(t, r) {
                      var o = t[0] + t.slice(1).map((function(t) {
                          return "[".concat(t, "]")
                      }
                      )).join("");
                      i.appendChild(function createHiddenInput(t, r) {
                          var o = document.createElement("input");
                          return o.type = "hidden",
                          o.name = t,
                          o.value = r,
                          o
                      }(o, r))
                  }
                  )),
                  i.submit()
              },
              product: d,
              selectAccount: g,
              token: h,
              webhook: m
          }, {
              uiOverride: b
          })
            , w = document.createElement("button");
          w.id = a.PLAID_LINK_BUTTON_ID,
          w.textContent = (0,
          l.isPublicToken)(h) ? "Link your bank account" : "Relink your bank account",
          w.onclick = function(t) {
              t.preventDefault(),
              x.open()
          }
          ,
          i.appendChild(w)
      }
  }
}
]);
