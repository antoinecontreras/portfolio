/*! For license information please see metascript.js.LICENSE.txt */
(() => {
  "use strict";
  var t = {
      520: (t, e) => {
        var r,
          n =
            Object.assign ||
            function (t) {
              for (var e, r = 1; r < arguments.length; r++)
                for (var n in (e = arguments[r]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            },
          i = function (t, e) {
            if (t) {
              "undefined" != typeof window &&
                (function () {
                  function t(t, e) {
                    e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
                    var r = document.createEvent("CustomEvent");
                    return (
                      r.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), r
                    );
                  }
                  "function" != typeof window.CustomEvent &&
                    ((t.prototype = window.Event.prototype),
                    (window.CustomEvent = t));
                })(),
                e || (e = {}),
                (e = n(
                  {},
                  {
                    minHorizontal: 10,
                    minVertical: 10,
                    deltaHorizontal: 3,
                    deltaVertical: 5,
                    preventScroll: !1,
                    lockAxis: !0,
                    touch: !0,
                    mouse: !0,
                  },
                  e
                ));
              var r = [],
                i = !1,
                s = function () {
                  i = !0;
                },
                a = function (t) {
                  (i = !1), u(t);
                },
                o = function (t) {
                  i &&
                    ((t.changedTouches = [
                      { clientX: t.clientX, clientY: t.clientY },
                    ]),
                    l(t));
                };
              e.mouse &&
                (t.addEventListener("mousedown", s),
                t.addEventListener("mouseup", a),
                t.addEventListener("mousemove", o));
              var u = function (i) {
                  var s = Math.abs,
                    a = Math.max,
                    o = Math.min;
                  if (r.length) {
                    for (
                      var u =
                          "function" == typeof TouchEvent &&
                          i instanceof TouchEvent,
                        l = [],
                        c = [],
                        h = { top: !1, right: !1, bottom: !1, left: !1 },
                        f = 0;
                      f < r.length;
                      f++
                    )
                      l.push(r[f].x), c.push(r[f].y);
                    var d = l[0],
                      p = l[l.length - 1],
                      m = c[0],
                      _ = c[c.length - 1],
                      v = { x: [d, p], y: [m, _] };
                    if (1 < r.length) {
                      var g = { detail: n({ touch: u, target: i.target }, v) },
                        y = new CustomEvent("swiperelease", g);
                      t.dispatchEvent(y);
                    }
                    var w = l[0] - l[l.length - 1],
                      b = "none";
                    b = 0 < w ? "left" : "right";
                    var x = o.apply(Math, l),
                      T = a.apply(Math, l);
                    if (
                      (s(w) >= e.minHorizontal &&
                        ("left" == b
                          ? s(x - l[l.length - 1]) <= e.deltaHorizontal &&
                            (h.left = !0)
                          : "right" == b &&
                            s(T - l[l.length - 1]) <= e.deltaHorizontal &&
                            (h.right = !0)),
                      (b = "none"),
                      (b = 0 < (w = c[0] - c[c.length - 1]) ? "top" : "bottom"),
                      (x = o.apply(Math, c)),
                      (T = a.apply(Math, c)),
                      s(w) >= e.minVertical &&
                        ("top" == b
                          ? s(x - c[c.length - 1]) <= e.deltaVertical &&
                            (h.top = !0)
                          : "bottom" == b &&
                            s(T - c[c.length - 1]) <= e.deltaVertical &&
                            (h.bottom = !0)),
                      (r = []),
                      h.top || h.right || h.bottom || h.left)
                    ) {
                      e.lockAxis &&
                        ((h.left || h.right) && s(d - p) > s(m - _)
                          ? (h.top = h.bottom = !1)
                          : (h.top || h.bottom) &&
                            s(d - p) < s(m - _) &&
                            (h.left = h.right = !1));
                      var S = {
                          detail: n(
                            { directions: h, touch: u, target: i.target },
                            v
                          ),
                        },
                        L = new CustomEvent("swipe", S);
                      t.dispatchEvent(L);
                    } else {
                      var E = new CustomEvent("swipecancel", {
                        detail: n({ touch: u, target: i.target }, v),
                      });
                      t.dispatchEvent(E);
                    }
                  }
                },
                l = function (n) {
                  var i = n.changedTouches[0];
                  if ((r.push({ x: i.clientX, y: i.clientY }), 1 < r.length)) {
                    var s = {
                        detail: {
                          x: [r[0].x, r[r.length - 1].x],
                          y: [r[0].y, r[r.length - 1].y],
                          touch:
                            "function" == typeof TouchEvent &&
                            n instanceof TouchEvent,
                          target: n.target,
                        },
                      },
                      a = new CustomEvent("swiping", s);
                    (!0 === e.preventScroll ||
                      ("function" == typeof e.preventScroll &&
                        e.preventScroll(a))) &&
                      n.preventDefault(),
                      t.dispatchEvent(a);
                  }
                },
                c = !1;
              try {
                var h = Object.defineProperty({}, "passive", {
                  get: function () {
                    c = { passive: !e.preventScroll };
                  },
                });
                window.addEventListener("testPassive", null, h),
                  window.removeEventListener("testPassive", null, h);
              } catch (t) {}
              return (
                e.touch &&
                  (t.addEventListener("touchmove", l, c),
                  t.addEventListener("touchend", u)),
                {
                  off: function () {
                    t.removeEventListener("touchmove", l, c),
                      t.removeEventListener("touchend", u),
                      t.removeEventListener("mousedown", s),
                      t.removeEventListener("mouseup", a),
                      t.removeEventListener("mousemove", o);
                  },
                }
              );
            }
          };
        void 0 !== t.exports
          ? ((t.exports = i), (t.exports.default = i))
          : void 0 ===
              (r = function () {
                return i;
              }.apply(e, [])) || (t.exports = r);
      },
    },
    e = {};
  function r(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var s = (e[n] = { exports: {} });
    return t[n](s, s.exports, r), s.exports;
  }
  (() => {
    var t = {
      body: document.querySelector("body"),
      page: document.querySelector("#page"),
      main: document.querySelector("#primary"),
      header: document.querySelector(".header"),
    };
    function e(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    var n = !1,
      i = function () {
        document.querySelector(".intro");
        var t,
          r = document.querySelector(".header-logo a"),
          i = document.querySelectorAll(".gallery-fig img"),
          s = document.querySelectorAll(".thumbs-center img"),
          a = [i].concat(
            (function (t) {
              if (Array.isArray(t)) return e(t);
            })((t = s)) ||
              (function (t) {
                if (
                  ("undefined" != typeof Symbol &&
                    null != t[Symbol.iterator]) ||
                  null != t["@@iterator"]
                )
                  return Array.from(t);
              })(t) ||
              (function (t, r) {
                if (t) {
                  if ("string" == typeof t) return e(t, r);
                  var n = Object.prototype.toString.call(t).slice(8, -1);
                  return (
                    "Object" === n && t.constructor && (n = t.constructor.name),
                    "Map" === n || "Set" === n
                      ? Array.from(t)
                      : "Arguments" === n ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                      ? e(t, r)
                      : void 0
                  );
                }
              })(t) ||
              (function () {
                throw new TypeError(
                  "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                );
              })()
          );
        var o,
          u = 0,
          l = document.querySelector("body"),
          c = function () {
            var t;
            (n = !0),
              l.classList.add("ready"),
              (t =
                (
                  navigator.userAgent ||
                  navigator.vendor ||
                  window.opera
                ).indexOf("Instagram") > -1),
              console.log("insta reload check"),
              t && document.documentElement.classList.contains("ios")
                ? (console.log(sessionStorage.getItem("instaReloaded")),
                  "false" === sessionStorage.getItem("instaReloaded") &&
                    (sessionStorage.setItem("instaReloaded", "true"),
                    console.log(sessionStorage.getItem("instaReloaded")),
                    console.log("reloading"),
                    r.click()))
                : console.log("not insta browser on ios"),
              setTimeout(function () {
                l.classList.add("transitions");
              }, 300);
          };
        l.classList.contains("home")
          ? (console.log("showing intro"),
            a.forEach(function (t) {
              imagesLoaded(t, function () {
                u++,
                  (o = (u / a.length) * 100),
                  document.documentElement.style.setProperty(
                    "--perc",
                    "".concat(o, "%")
                  ),
                  u == a.length && (console.log("images loaded"), c());
              });
            }))
          : c();
      },
      s = function (t, e) {
        var r = null;
        return function () {
          for (var n = arguments.length, i = new Array(n), s = 0; s < n; s++)
            i[s] = arguments[s];
          window.clearTimeout(r),
            (r = window.setTimeout(function () {
              t.apply(null, i);
            }, e));
        };
      },
      a = function (e) {
        switch (!0) {
          case e.classList.contains("overlay-bottom"):
            e.classList.remove("transform-y0");
            break;
          case e.classList.contains("overlay-top"):
            e.style.transform = "translateY(-150%)";
            break;
          case e.classList.contains("overlay-left"):
            e.classList.remove("transform-x0");
            break;
          case e.classList.contains("overlay-fadein"):
            e.classList.remove("show");
            break;
          case e.classList.contains("overlay-right"):
            e.classList.remove("transform-x0");
        }
        t.body.classList.remove("events-none", "overflowY-hidden");
      };
    function o(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return t;
    }
    function u(t, e) {
      (t.prototype = Object.create(e.prototype)),
        (t.prototype.constructor = t),
        (t.__proto__ = e);
    }
    var l,
      c,
      h,
      f,
      d,
      p,
      m,
      _,
      v,
      g,
      y,
      w,
      b,
      x,
      T,
      S = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: { lineHeight: "" },
      },
      L = { duration: 0.5, overwrite: !1, delay: 0 },
      E = 1e8,
      k = 1e-8,
      M = 2 * Math.PI,
      O = M / 4,
      A = 0,
      C = Math.sqrt,
      P = Math.cos,
      D = Math.sin,
      q = function (t) {
        return "string" == typeof t;
      },
      R = function (t) {
        return "function" == typeof t;
      },
      z = function (t) {
        return "number" == typeof t;
      },
      I = function (t) {
        return void 0 === t;
      },
      F = function (t) {
        return "object" == typeof t;
      },
      B = function (t) {
        return !1 !== t;
      },
      Y = function () {
        return "undefined" != typeof window;
      },
      W = function (t) {
        return R(t) || q(t);
      },
      N =
        ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
        function () {},
      X = Array.isArray,
      U = /(?:-?\.?\d|\.)+/gi,
      j = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      V = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      H = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      G = /[+-]=-?[.\d]+/,
      Q = /[^,'"\[\]\s]+/gi,
      $ = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
      Z = {},
      J = {},
      isPlaying = false,
      K = function (t) {
        return (J = kt(t, Z)) && Er;
      },
      tt = function (t, e) {
        return console.warn(
          "Invalid property",
          t,
          "set to",
          e,
          "Missing plugin? gsap.registerPlugin()"
        );
      },
      et = function (t, e) {
        return !e && console.warn(t);
      },
      rt = function (t, e) {
        return (t && (Z[t] = e) && J && (J[t] = e)) || Z;
      },
      nt = function () {
        return 0;
      },
      it = { suppressEvents: !0, isStart: !0 },
      st = { suppressEvents: !0 },
      at = {},
      ot = [],
      ut = {},
      lt = {},
      ct = {},
      ht = 30,
      ft = [],
      dt = "",
      pt = function (t) {
        var e,
          r,
          n = t[0];
        if ((F(n) || R(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
          for (r = ft.length; r-- && !ft[r].targetTest(n); );
          e = ft[r];
        }
        for (r = t.length; r--; )
          (t[r] && (t[r]._gsap || (t[r]._gsap = new We(t[r], e)))) ||
            t.splice(r, 1);
        return t;
      },
      mt = function (t) {
        return t._gsap || pt(se(t))[0]._gsap;
      },
      _t = function (t, e, r) {
        return (r = t[e]) && R(r)
          ? t[e]()
          : (I(r) && t.getAttribute && t.getAttribute(e)) || r;
      },
      vt = function (t, e) {
        return (t = t.split(",")).forEach(e) || t;
      },
      gt = function (t) {
        return Math.round(1e5 * t) / 1e5 || 0;
      },
      yt = function (t) {
        return Math.round(1e7 * t) / 1e7 || 0;
      },
      wt = function (t, e) {
        var r = e.charAt(0),
          n = parseFloat(e.substr(2));
        return (
          (t = parseFloat(t)),
          "+" === r ? t + n : "-" === r ? t - n : "*" === r ? t * n : t / n
        );
      },
      bt = function (t, e) {
        for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; );
        return n < r;
      },
      xt = function () {
        var t,
          e,
          r = ot.length,
          n = ot.slice(0);
        for (ut = {}, ot.length = 0, t = 0; t < r; t++)
          (e = n[t]) &&
            e._lazy &&
            (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
      },
      Tt = function (t, e, r, n) {
        ot.length && xt(), t.render(e, r, n || c), ot.length && xt();
      },
      St = function (t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + "").match(Q).length < 2
          ? e
          : q(t)
          ? t.trim()
          : t;
      },
      Lt = function (t) {
        return t;
      },
      Et = function (t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t;
      },
      kt = function (t, e) {
        for (var r in e) t[r] = e[r];
        return t;
      },
      Mt = function t(e, r) {
        for (var n in r)
          "__proto__" !== n &&
            "constructor" !== n &&
            "prototype" !== n &&
            (e[n] = F(r[n]) ? t(e[n] || (e[n] = {}), r[n]) : r[n]);
        return e;
      },
      Ot = function (t, e) {
        var r,
          n = {};
        for (r in t) r in e || (n[r] = t[r]);
        return n;
      },
      At = function (t) {
        var e,
          r = t.parent || f,
          n = t.keyframes
            ? ((e = X(t.keyframes)),
              function (t, r) {
                for (var n in r)
                  n in t ||
                    ("duration" === n && e) ||
                    "ease" === n ||
                    (t[n] = r[n]);
              })
            : Et;
        if (B(t.inherit))
          for (; r; ) n(t, r.vars.defaults), (r = r.parent || r._dp);
        return t;
      },
      Ct = function (t, e, r, n, i) {
        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
        var s,
          a = t[n];
        if (i) for (s = e[i]; a && a[i] > s; ) a = a._prev;
        return (
          a
            ? ((e._next = a._next), (a._next = e))
            : ((e._next = t[r]), (t[r] = e)),
          e._next ? (e._next._prev = e) : (t[n] = e),
          (e._prev = a),
          (e.parent = e._dp = t),
          e
        );
      },
      Pt = function (t, e, r, n) {
        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
        var i = e._prev,
          s = e._next;
        i ? (i._next = s) : t[r] === e && (t[r] = s),
          s ? (s._prev = i) : t[n] === e && (t[n] = i),
          (e._next = e._prev = e.parent = null);
      },
      Dt = function (t, e) {
        t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
          (t._act = 0);
      },
      qt = function (t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
          for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
        return t;
      },
      Rt = function (t) {
        for (var e = t.parent; e && e.parent; )
          (e._dirty = 1), e.totalDuration(), (e = e.parent);
        return t;
      },
      zt = function (t, e, r, n) {
        return (
          t._startAt &&
          (c
            ? t._startAt.revert(st)
            : (t.vars.immediateRender && !t.vars.autoRevert) ||
              t._startAt.render(e, !0, n))
        );
      },
      It = function t(e) {
        return !e || (e._ts && t(e.parent));
      },
      Ft = function (t) {
        return t._repeat ? Bt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
      },
      Bt = function (t, e) {
        var r = Math.floor((t /= e));
        return t && r === t ? r - 1 : r;
      },
      Yt = function (t, e) {
        return (
          (t - e._start) * e._ts +
          (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
        );
      },
      Wt = function (t) {
        return (t._end = yt(
          t._start + (t._tDur / Math.abs(t._ts || t._rts || k) || 0)
        ));
      },
      Nt = function (t, e) {
        var r = t._dp;
        return (
          r &&
            r.smoothChildTiming &&
            t._ts &&
            ((t._start = yt(
              r._time -
                (t._ts > 0
                  ? e / t._ts
                  : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
            )),
            Wt(t),
            r._dirty || qt(r, t)),
          t
        );
      },
      Xt = function (t, e) {
        var r;
        if (
          ((e._time || (e._initted && !e._dur)) &&
            ((r = Yt(t.rawTime(), e)),
            (!e._dur || ee(0, e.totalDuration(), r) - e._tTime > k) &&
              e.render(r, !0)),
          qt(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
        ) {
          if (t._dur < t.duration())
            for (r = t; r._dp; )
              r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
          t._zTime = -1e-8;
        }
      },
      Ut = function (t, e, r, n) {
        return (
          e.parent && Dt(e),
          (e._start = yt(
            (z(r) ? r : r || t !== f ? Jt(t, r, e) : t._time) + e._delay
          )),
          (e._end = yt(
            e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
          )),
          Ct(t, e, "_first", "_last", t._sort ? "_start" : 0),
          Gt(e) || (t._recent = e),
          n || Xt(t, e),
          t._ts < 0 && Nt(t, t._tTime),
          t
        );
      },
      jt = function (t, e) {
        return (
          (Z.ScrollTrigger || tt("scrollTrigger", e)) &&
          Z.ScrollTrigger.create(e, t)
        );
      },
      Vt = function (t, e, r, n) {
        return (
          Qe(t, e),
          t._initted
            ? !r &&
              t._pt &&
              ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
              v !== Me.frame
              ? (ot.push(t), (t._lazy = [e, n]), 1)
              : void 0
            : 1
        );
      },
      Ht = function t(e) {
        var r = e.parent;
        return (
          r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r))
        );
      },
      Gt = function (t) {
        var e = t.data;
        return "isFromStart" === e || "isStart" === e;
      },
      Qt = function (t, e, r, n) {
        var i = t._repeat,
          s = yt(e) || 0,
          a = t._tTime / t._tDur;
        return (
          a && !n && (t._time *= s / t._dur),
          (t._dur = s),
          (t._tDur = i ? (i < 0 ? 1e10 : yt(s * (i + 1) + t._rDelay * i)) : s),
          a > 0 && !n ? Nt(t, (t._tTime = t._tDur * a)) : t.parent && Wt(t),
          r || qt(t.parent, t),
          t
        );
      },
      $t = function (t) {
        return t instanceof Xe ? qt(t) : Qt(t, t._dur);
      },
      Zt = { _start: 0, endTime: nt, totalDuration: nt },
      Jt = function t(e, r, n) {
        var i,
          s,
          a,
          o = e.labels,
          u = e._recent || Zt,
          l = e.duration() >= E ? u.endTime(!1) : e._dur;
        return q(r) && (isNaN(r) || r in o)
          ? ((s = r.charAt(0)),
            (a = "%" === r.substr(-1)),
            (i = r.indexOf("=")),
            "<" === s || ">" === s
              ? (i >= 0 && (r = r.replace(/=/, "")),
                ("<" === s ? u._start : u.endTime(u._repeat >= 0)) +
                  (parseFloat(r.substr(1)) || 0) *
                    (a ? (i < 0 ? u : n).totalDuration() / 100 : 1))
              : i < 0
              ? (r in o || (o[r] = l), o[r])
              : ((s = parseFloat(r.charAt(i - 1) + r.substr(i + 1))),
                a && n && (s = (s / 100) * (X(n) ? n[0] : n).totalDuration()),
                i > 1 ? t(e, r.substr(0, i - 1), n) + s : l + s))
          : null == r
          ? l
          : +r;
      },
      Kt = function (t, e, r) {
        var n,
          i,
          s = z(e[1]),
          a = (s ? 2 : 1) + (t < 2 ? 0 : 1),
          o = e[a];
        if ((s && (o.duration = e[1]), (o.parent = r), t)) {
          for (n = o, i = r; i && !("immediateRender" in n); )
            (n = i.vars.defaults || {}), (i = B(i.vars.inherit) && i.parent);
          (o.immediateRender = B(n.immediateRender)),
            t < 2 ? (o.runBackwards = 1) : (o.startAt = e[a - 1]);
        }
        return new tr(e[0], o, e[a + 1]);
      },
      te = function (t, e) {
        return t || 0 === t ? e(t) : e;
      },
      ee = function (t, e, r) {
        return r < t ? t : r > e ? e : r;
      },
      re = function (t, e) {
        return q(t) && (e = $.exec(t)) ? e[1] : "";
      },
      ne = [].slice,
      ie = function (t, e) {
        return (
          t &&
          F(t) &&
          "length" in t &&
          ((!e && !t.length) || (t.length - 1 in t && F(t[0]))) &&
          !t.nodeType &&
          t !== d
        );
      },
      se = function (t, e, r) {
        return h && !e && h.selector
          ? h.selector(t)
          : !q(t) || r || (!p && Oe())
          ? X(t)
            ? (function (t, e, r) {
                return (
                  void 0 === r && (r = []),
                  t.forEach(function (t) {
                    var n;
                    return (q(t) && !e) || ie(t, 1)
                      ? (n = r).push.apply(n, se(t))
                      : r.push(t);
                  }) || r
                );
              })(t, r)
            : ie(t)
            ? ne.call(t, 0)
            : t
            ? [t]
            : []
          : ne.call((e || m).querySelectorAll(t), 0);
      },
      ae = function (t) {
        return (
          (t = se(t)[0] || et("Invalid scope") || {}),
          function (e) {
            var r = t.current || t.nativeElement || t;
            return se(
              e,
              r.querySelectorAll
                ? r
                : r === t
                ? et("Invalid scope") || m.createElement("div")
                : t
            );
          }
        );
      },
      oe = function (t) {
        return t.sort(function () {
          return 0.5 - Math.random();
        });
      },
      ue = function (t) {
        if (R(t)) return t;
        var e = F(t) ? t : { each: t },
          r = ze(e.ease),
          n = e.from || 0,
          i = parseFloat(e.base) || 0,
          s = {},
          a = n > 0 && n < 1,
          o = isNaN(n) || a,
          u = e.axis,
          l = n,
          c = n;
        return (
          q(n)
            ? (l = c = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
            : !a && o && ((l = n[0]), (c = n[1])),
          function (t, a, h) {
            var f,
              d,
              p,
              m,
              _,
              v,
              g,
              y,
              w,
              b = (h || e).length,
              x = s[b];
            if (!x) {
              if (!(w = "auto" === e.grid ? 0 : (e.grid || [1, E])[1])) {
                for (
                  g = -E;
                  g < (g = h[w++].getBoundingClientRect().left) && w < b;

                );
                w--;
              }
              for (
                x = s[b] = [],
                  f = o ? Math.min(w, b) * l - 0.5 : n % w,
                  d = w === E ? 0 : o ? (b * c) / w - 0.5 : (n / w) | 0,
                  g = 0,
                  y = E,
                  v = 0;
                v < b;
                v++
              )
                (p = (v % w) - f),
                  (m = d - ((v / w) | 0)),
                  (x[v] = _ =
                    u ? Math.abs("y" === u ? m : p) : C(p * p + m * m)),
                  _ > g && (g = _),
                  _ < y && (y = _);
              "random" === n && oe(x),
                (x.max = g - y),
                (x.min = y),
                (x.v = b =
                  (parseFloat(e.amount) ||
                    parseFloat(e.each) *
                      (w > b
                        ? b - 1
                        : u
                        ? "y" === u
                          ? b / w
                          : w
                        : Math.max(w, b / w)) ||
                    0) * ("edges" === n ? -1 : 1)),
                (x.b = b < 0 ? i - b : i),
                (x.u = re(e.amount || e.each) || 0),
                (r = r && b < 0 ? qe(r) : r);
            }
            return (
              (b = (x[t] - x.min) / x.max || 0),
              yt(x.b + (r ? r(b) : b) * x.v) + x.u
            );
          }
        );
      },
      le = function (t) {
        var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
        return function (r) {
          var n = yt(Math.round(parseFloat(r) / t) * t * e);
          return (n - (n % 1)) / e + (z(r) ? 0 : re(r));
        };
      },
      ce = function (t, e) {
        var r,
          n,
          i = X(t);
        return (
          !i &&
            F(t) &&
            ((r = i = t.radius || E),
            t.values
              ? ((t = se(t.values)), (n = !z(t[0])) && (r *= r))
              : (t = le(t.increment))),
          te(
            e,
            i
              ? R(t)
                ? function (e) {
                    return (n = t(e)), Math.abs(n - e) <= r ? n : e;
                  }
                : function (e) {
                    for (
                      var i,
                        s,
                        a = parseFloat(n ? e.x : e),
                        o = parseFloat(n ? e.y : 0),
                        u = E,
                        l = 0,
                        c = t.length;
                      c--;

                    )
                      (i = n
                        ? (i = t[c].x - a) * i + (s = t[c].y - o) * s
                        : Math.abs(t[c] - a)) < u && ((u = i), (l = c));
                    return (
                      (l = !r || u <= r ? t[l] : e),
                      n || l === e || z(e) ? l : l + re(e)
                    );
                  }
              : le(t)
          )
        );
      },
      he = function (t, e, r, n) {
        return te(X(t) ? !e : !0 === r ? !!(r = 0) : !n, function () {
          return X(t)
            ? t[~~(Math.random() * t.length)]
            : (r = r || 1e-5) &&
                (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
                Math.floor(
                  Math.round(
                    (t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r
                  ) *
                    r *
                    n
                ) / n;
        });
      },
      fe = function (t, e, r) {
        return te(r, function (r) {
          return t[~~e(r)];
        });
      },
      de = function (t) {
        for (var e, r, n, i, s = 0, a = ""; ~(e = t.indexOf("random(", s)); )
          (n = t.indexOf(")", e)),
            (i = "[" === t.charAt(e + 7)),
            (r = t.substr(e + 7, n - e - 7).match(i ? Q : U)),
            (a +=
              t.substr(s, e - s) +
              he(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5)),
            (s = n + 1);
        return a + t.substr(s, t.length - s);
      },
      pe = function (t, e, r, n, i) {
        var s = e - t,
          a = n - r;
        return te(i, function (e) {
          return r + (((e - t) / s) * a || 0);
        });
      },
      me = function (t, e, r) {
        var n,
          i,
          s,
          a = t.labels,
          o = E;
        for (n in a)
          (i = a[n] - e) < 0 == !!r &&
            i &&
            o > (i = Math.abs(i)) &&
            ((s = n), (o = i));
        return s;
      },
      _e = function (t, e, r) {
        var n,
          i,
          s,
          a = t.vars,
          o = a[e],
          u = h,
          l = t._ctx;
        if (o)
          return (
            (n = a[e + "Params"]),
            (i = a.callbackScope || t),
            r && ot.length && xt(),
            l && (h = l),
            (s = n ? o.apply(i, n) : o.call(i)),
            (h = u),
            s
          );
      },
      ve = function (t) {
        return (
          Dt(t),
          t.scrollTrigger && t.scrollTrigger.kill(!1),
          t.progress() < 1 && _e(t, "onInterrupt"),
          t
        );
      },
      ge = function (t) {
        var e = (t = (!t.name && t.default) || t).name,
          r = R(t),
          n =
            e && !r && t.init
              ? function () {
                  this._props = [];
                }
              : t,
          i = {
            init: nt,
            render: lr,
            add: He,
            kill: hr,
            modifier: cr,
            rawVars: 0,
          },
          s = {
            targetTest: 0,
            get: 0,
            getSetter: sr,
            aliases: {},
            register: 0,
          };
        if ((Oe(), t !== n)) {
          if (lt[e]) return;
          Et(n, Et(Ot(t, i), s)),
            kt(n.prototype, kt(i, Ot(t, s))),
            (lt[(n.prop = e)] = n),
            t.targetTest && (ft.push(n), (at[e] = 1)),
            (e =
              ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) +
              "Plugin");
        }
        rt(e, n), t.register && t.register(Er, n, pr);
      },
      ye = 255,
      we = {
        aqua: [0, ye, ye],
        lime: [0, ye, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, ye],
        navy: [0, 0, 128],
        white: [ye, ye, ye],
        olive: [128, 128, 0],
        yellow: [ye, ye, 0],
        orange: [ye, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [ye, 0, 0],
        pink: [ye, 192, 203],
        cyan: [0, ye, ye],
        transparent: [ye, ye, ye, 0],
      },
      be = function (t, e, r) {
        return (
          ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
            ? e + (r - e) * t * 6
            : t < 0.5
            ? r
            : 3 * t < 2
            ? e + (r - e) * (2 / 3 - t) * 6
            : e) *
            ye +
            0.5) |
          0
        );
      },
      xe = function (t, e, r) {
        var n,
          i,
          s,
          a,
          o,
          u,
          l,
          c,
          h,
          f,
          d = t ? (z(t) ? [t >> 16, (t >> 8) & ye, t & ye] : 0) : we.black;
        if (!d) {
          if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), we[t]))
            d = we[t];
          else if ("#" === t.charAt(0)) {
            if (
              (t.length < 6 &&
                ((n = t.charAt(1)),
                (i = t.charAt(2)),
                (s = t.charAt(3)),
                (t =
                  "#" +
                  n +
                  n +
                  i +
                  i +
                  s +
                  s +
                  (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
              9 === t.length)
            )
              return [
                (d = parseInt(t.substr(1, 6), 16)) >> 16,
                (d >> 8) & ye,
                d & ye,
                parseInt(t.substr(7), 16) / 255,
              ];
            d = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & ye, t & ye];
          } else if ("hsl" === t.substr(0, 3))
            if (((d = f = t.match(U)), e)) {
              if (~t.indexOf("="))
                return (d = t.match(j)), r && d.length < 4 && (d[3] = 1), d;
            } else
              (a = (+d[0] % 360) / 360),
                (o = +d[1] / 100),
                (n =
                  2 * (u = +d[2] / 100) -
                  (i = u <= 0.5 ? u * (o + 1) : u + o - u * o)),
                d.length > 3 && (d[3] *= 1),
                (d[0] = be(a + 1 / 3, n, i)),
                (d[1] = be(a, n, i)),
                (d[2] = be(a - 1 / 3, n, i));
          else d = t.match(U) || we.transparent;
          d = d.map(Number);
        }
        return (
          e &&
            !f &&
            ((n = d[0] / ye),
            (i = d[1] / ye),
            (s = d[2] / ye),
            (u = ((l = Math.max(n, i, s)) + (c = Math.min(n, i, s))) / 2),
            l === c
              ? (a = o = 0)
              : ((h = l - c),
                (o = u > 0.5 ? h / (2 - l - c) : h / (l + c)),
                (a =
                  l === n
                    ? (i - s) / h + (i < s ? 6 : 0)
                    : l === i
                    ? (s - n) / h + 2
                    : (n - i) / h + 4),
                (a *= 60)),
            (d[0] = ~~(a + 0.5)),
            (d[1] = ~~(100 * o + 0.5)),
            (d[2] = ~~(100 * u + 0.5))),
          r && d.length < 4 && (d[3] = 1),
          d
        );
      },
      Te = function (t) {
        var e = [],
          r = [],
          n = -1;
        return (
          t.split(Le).forEach(function (t) {
            var i = t.match(V) || [];
            e.push.apply(e, i), r.push((n += i.length + 1));
          }),
          (e.c = r),
          e
        );
      },
      Se = function (t, e, r) {
        var n,
          i,
          s,
          a,
          o = "",
          u = (t + o).match(Le),
          l = e ? "hsla(" : "rgba(",
          c = 0;
        if (!u) return t;
        if (
          ((u = u.map(function (t) {
            return (
              (t = xe(t, e, 1)) &&
              l +
                (e
                  ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                  : t.join(",")) +
                ")"
            );
          })),
          r && ((s = Te(t)), (n = r.c).join(o) !== s.c.join(o)))
        )
          for (a = (i = t.replace(Le, "1").split(V)).length - 1; c < a; c++)
            o +=
              i[c] +
              (~n.indexOf(c)
                ? u.shift() || l + "0,0,0,0)"
                : (s.length ? s : u.length ? u : r).shift());
        if (!i)
          for (a = (i = t.split(Le)).length - 1; c < a; c++) o += i[c] + u[c];
        return o + i[a];
      },
      Le = (function () {
        var t,
          e =
            "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (t in we) e += "|" + t + "\\b";
        return new RegExp(e + ")", "gi");
      })(),
      Ee = /hsl[a]?\(/,
      ke = function (t) {
        var e,
          r = t.join(" ");
        if (((Le.lastIndex = 0), Le.test(r)))
          return (
            (e = Ee.test(r)),
            (t[1] = Se(t[1], e)),
            (t[0] = Se(t[0], e, Te(t[1]))),
            !0
          );
      },
      Me = (function () {
        var t,
          e,
          r,
          n,
          i,
          s,
          a = Date.now,
          o = 500,
          u = 33,
          l = a(),
          c = l,
          h = 1e3 / 240,
          f = h,
          v = [],
          g = function r(d) {
            var p,
              m,
              _,
              g,
              y = a() - c,
              w = !0 === d;
            if (
              (y > o && (l += y - u),
              ((p = (_ = (c += y) - l) - f) > 0 || w) &&
                ((g = ++n.frame),
                (i = _ - 1e3 * n.time),
                (n.time = _ /= 1e3),
                (f += p + (p >= h ? 4 : h - p)),
                (m = 1)),
              w || (t = e(r)),
              m)
            )
              for (s = 0; s < v.length; s++) v[s](_, i, g, d);
          };
        return (n = {
          time: 0,
          frame: 0,
          tick: function () {
            g(!0);
          },
          deltaRatio: function (t) {
            return i / (1e3 / (t || 60));
          },
          wake: function () {
            _ &&
              (!p &&
                Y() &&
                ((d = p = window),
                (m = d.document || {}),
                (Z.gsap = Er),
                (d.gsapVersions || (d.gsapVersions = [])).push(Er.version),
                K(J || d.GreenSockGlobals || (!d.gsap && d) || {}),
                (r = d.requestAnimationFrame)),
              t && n.sleep(),
              (e =
                r ||
                function (t) {
                  return setTimeout(t, (f - 1e3 * n.time + 1) | 0);
                }),
              (y = 1),
              g(2));
          },
          sleep: function () {
            (r ? d.cancelAnimationFrame : clearTimeout)(t), (y = 0), (e = nt);
          },
          lagSmoothing: function (t, e) {
            (o = t || 1e8), (u = Math.min(e, o, 0));
          },
          fps: function (t) {
            (h = 1e3 / (t || 240)), (f = 1e3 * n.time + h);
          },
          add: function (t, e, r) {
            var i = e
              ? function (e, r, s, a) {
                  t(e, r, s, a), n.remove(i);
                }
              : t;
            return n.remove(t), v[r ? "unshift" : "push"](i), Oe(), i;
          },
          remove: function (t, e) {
            ~(e = v.indexOf(t)) && v.splice(e, 1) && s >= e && s--;
          },
          _listeners: v,
        });
      })(),
      Oe = function () {
        return !y && Me.wake();
      },
      Ae = {},
      Ce = /^[\d.\-M][\d.\-,\s]/,
      Pe = /["']/g,
      De = function (t) {
        for (
          var e,
            r,
            n,
            i = {},
            s = t.substr(1, t.length - 3).split(":"),
            a = s[0],
            o = 1,
            u = s.length;
          o < u;
          o++
        )
          (r = s[o]),
            (e = o !== u - 1 ? r.lastIndexOf(",") : r.length),
            (n = r.substr(0, e)),
            (i[a] = isNaN(n) ? n.replace(Pe, "").trim() : +n),
            (a = r.substr(e + 1).trim());
        return i;
      },
      qe = function (t) {
        return function (e) {
          return 1 - t(1 - e);
        };
      },
      Re = function t(e, r) {
        for (var n, i = e._first; i; )
          i instanceof Xe
            ? t(i, r)
            : !i.vars.yoyoEase ||
              (i._yoyo && i._repeat) ||
              i._yoyo === r ||
              (i.timeline
                ? t(i.timeline, r)
                : ((n = i._ease),
                  (i._ease = i._yEase),
                  (i._yEase = n),
                  (i._yoyo = r))),
            (i = i._next);
      },
      ze = function (t, e) {
        return (
          (t &&
            (R(t)
              ? t
              : Ae[t] ||
                (function (t) {
                  var e,
                    r,
                    n,
                    i,
                    s = (t + "").split("("),
                    a = Ae[s[0]];
                  return a && s.length > 1 && a.config
                    ? a.config.apply(
                        null,
                        ~t.indexOf("{")
                          ? [De(s[1])]
                          : ((e = t),
                            (r = e.indexOf("(") + 1),
                            (n = e.indexOf(")")),
                            (i = e.indexOf("(", r)),
                            e.substring(
                              r,
                              ~i && i < n ? e.indexOf(")", n + 1) : n
                            ))
                              .split(",")
                              .map(St)
                      )
                    : Ae._CE && Ce.test(t)
                    ? Ae._CE("", t)
                    : a;
                })(t))) ||
          e
        );
      },
      Ie = function (t, e, r, n) {
        void 0 === r &&
          (r = function (t) {
            return 1 - e(1 - t);
          }),
          void 0 === n &&
            (n = function (t) {
              return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
            });
        var i,
          s = { easeIn: e, easeOut: r, easeInOut: n };
        return (
          vt(t, function (t) {
            for (var e in ((Ae[t] = Z[t] = s),
            (Ae[(i = t.toLowerCase())] = r),
            s))
              Ae[
                i +
                  ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
              ] = Ae[t + "." + e] = s[e];
          }),
          s
        );
      },
      Fe = function (t) {
        return function (e) {
          return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
        };
      },
      Be = function t(e, r, n) {
        var i = r >= 1 ? r : 1,
          s = (n || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
          a = (s / M) * (Math.asin(1 / i) || 0),
          o = function (t) {
            return 1 === t ? 1 : i * Math.pow(2, -10 * t) * D((t - a) * s) + 1;
          },
          u =
            "out" === e
              ? o
              : "in" === e
              ? function (t) {
                  return 1 - o(1 - t);
                }
              : Fe(o);
        return (
          (s = M / s),
          (u.config = function (r, n) {
            return t(e, r, n);
          }),
          u
        );
      },
      Ye = function t(e, r) {
        void 0 === r && (r = 1.70158);
        var n = function (t) {
            return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
          },
          i =
            "out" === e
              ? n
              : "in" === e
              ? function (t) {
                  return 1 - n(1 - t);
                }
              : Fe(n);
        return (
          (i.config = function (r) {
            return t(e, r);
          }),
          i
        );
      };
    vt("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
      var r = e < 5 ? e + 1 : e;
      Ie(
        t + ",Power" + (r - 1),
        e
          ? function (t) {
              return Math.pow(t, r);
            }
          : function (t) {
              return t;
            },
        function (t) {
          return 1 - Math.pow(1 - t, r);
        },
        function (t) {
          return t < 0.5
            ? Math.pow(2 * t, r) / 2
            : 1 - Math.pow(2 * (1 - t), r) / 2;
        }
      );
    }),
      (Ae.Linear.easeNone = Ae.none = Ae.Linear.easeIn),
      Ie("Elastic", Be("in"), Be("out"), Be()),
      (w = 7.5625),
      (x = 1 / (b = 2.75)),
      Ie(
        "Bounce",
        function (t) {
          return 1 - T(1 - t);
        },
        (T = function (t) {
          return t < x
            ? w * t * t
            : t < 0.7272727272727273
            ? w * Math.pow(t - 1.5 / b, 2) + 0.75
            : t < 0.9090909090909092
            ? w * (t -= 2.25 / b) * t + 0.9375
            : w * Math.pow(t - 2.625 / b, 2) + 0.984375;
        })
      ),
      Ie("Expo", function (t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0;
      }),
      Ie("Circ", function (t) {
        return -(C(1 - t * t) - 1);
      }),
      Ie("Sine", function (t) {
        return 1 === t ? 1 : 1 - P(t * O);
      }),
      Ie("Back", Ye("in"), Ye("out"), Ye()),
      (Ae.SteppedEase =
        Ae.steps =
        Z.SteppedEase =
          {
            config: function (t, e) {
              void 0 === t && (t = 1);
              var r = 1 / t,
                n = t + (e ? 0 : 1),
                i = e ? 1 : 0;
              return function (t) {
                return (((n * ee(0, 0.99999999, t)) | 0) + i) * r;
              };
            },
          }),
      (L.ease = Ae["quad.out"]),
      vt(
        "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
        function (t) {
          return (dt += t + "," + t + "Params,");
        }
      );
    var We = function (t, e) {
        (this.id = A++),
          (t._gsap = this),
          (this.target = t),
          (this.harness = e),
          (this.get = e ? e.get : _t),
          (this.set = e ? e.getSetter : sr);
      },
      Ne = (function () {
        function t(t) {
          (this.vars = t),
            (this._delay = +t.delay || 0),
            (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
              ((this._rDelay = t.repeatDelay || 0),
              (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
            (this._ts = 1),
            Qt(this, +t.duration, 1, 1),
            (this.data = t.data),
            h && ((this._ctx = h), h.data.push(this)),
            y || Me.wake();
        }
        var e = t.prototype;
        return (
          (e.delay = function (t) {
            return t || 0 === t
              ? (this.parent &&
                  this.parent.smoothChildTiming &&
                  this.startTime(this._start + t - this._delay),
                (this._delay = t),
                this)
              : this._delay;
          }),
          (e.duration = function (t) {
            return arguments.length
              ? this.totalDuration(
                  this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
                )
              : this.totalDuration() && this._dur;
          }),
          (e.totalDuration = function (t) {
            return arguments.length
              ? ((this._dirty = 0),
                Qt(
                  this,
                  this._repeat < 0
                    ? t
                    : (t - this._repeat * this._rDelay) / (this._repeat + 1)
                ))
              : this._tDur;
          }),
          (e.totalTime = function (t, e) {
            if ((Oe(), !arguments.length)) return this._tTime;
            var r = this._dp;
            if (r && r.smoothChildTiming && this._ts) {
              for (
                Nt(this, t), !r._dp || r.parent || Xt(r, this);
                r && r.parent;

              )
                r.parent._time !==
                  r._start +
                    (r._ts >= 0
                      ? r._tTime / r._ts
                      : (r.totalDuration() - r._tTime) / -r._ts) &&
                  r.totalTime(r._tTime, !0),
                  (r = r.parent);
              !this.parent &&
                this._dp.autoRemoveChildren &&
                ((this._ts > 0 && t < this._tDur) ||
                  (this._ts < 0 && t > 0) ||
                  (!this._tDur && !t)) &&
                Ut(this._dp, this, this._start - this._delay);
            }
            return (
              (this._tTime !== t ||
                (!this._dur && !e) ||
                (this._initted && Math.abs(this._zTime) === k) ||
                (!t && !this._initted && (this.add || this._ptLookup))) &&
                (this._ts || (this._pTime = t), Tt(this, t, e)),
              this
            );
          }),
          (e.time = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  Math.min(this.totalDuration(), t + Ft(this)) %
                    (this._dur + this._rDelay) || (t ? this._dur : 0),
                  e
                )
              : this._time;
          }),
          (e.totalProgress = function (t, e) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * t, e)
              : this.totalDuration()
              ? Math.min(1, this._tTime / this._tDur)
              : this.ratio;
          }),
          (e.progress = function (t, e) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                    Ft(this),
                  e
                )
              : this.duration()
              ? Math.min(1, this._time / this._dur)
              : this.ratio;
          }),
          (e.iteration = function (t, e) {
            var r = this.duration() + this._rDelay;
            return arguments.length
              ? this.totalTime(this._time + (t - 1) * r, e)
              : this._repeat
              ? Bt(this._tTime, r) + 1
              : 1;
          }),
          (e.timeScale = function (t) {
            if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
            if (this._rts === t) return this;
            var e =
              this.parent && this._ts
                ? Yt(this.parent._time, this)
                : this._tTime;
            return (
              (this._rts = +t || 0),
              (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
              this.totalTime(ee(-this._delay, this._tDur, e), !0),
              Wt(this),
              Rt(this)
            );
          }),
          (e.paused = function (t) {
            return arguments.length
              ? (this._ps !== t &&
                  ((this._ps = t),
                  t
                    ? ((this._pTime =
                        this._tTime || Math.max(-this._delay, this.rawTime())),
                      (this._ts = this._act = 0))
                    : (Oe(),
                      (this._ts = this._rts),
                      this.totalTime(
                        this.parent && !this.parent.smoothChildTiming
                          ? this.rawTime()
                          : this._tTime || this._pTime,
                        1 === this.progress() &&
                          Math.abs(this._zTime) !== k &&
                          (this._tTime -= k)
                      ))),
                this)
              : this._ps;
          }),
          (e.startTime = function (t) {
            if (arguments.length) {
              this._start = t;
              var e = this.parent || this._dp;
              return (
                e && (e._sort || !this.parent) && Ut(e, this, t - this._delay),
                this
              );
            }
            return this._start;
          }),
          (e.endTime = function (t) {
            return (
              this._start +
              (B(t) ? this.totalDuration() : this.duration()) /
                Math.abs(this._ts || 1)
            );
          }),
          (e.rawTime = function (t) {
            var e = this.parent || this._dp;
            return e
              ? t &&
                (!this._ts ||
                  (this._repeat && this._time && this.totalProgress() < 1))
                ? this._tTime % (this._dur + this._rDelay)
                : this._ts
                ? Yt(e.rawTime(t), this)
                : this._tTime
              : this._tTime;
          }),
          (e.revert = function (t) {
            void 0 === t && (t = st);
            var e = c;
            return (
              (c = t),
              this.timeline && this.timeline.revert(t),
              this.totalTime(-0.01, t.suppressEvents),
              "nested" !== this.data && Dt(this),
              (c = e),
              this
            );
          }),
          (e.globalTime = function (t) {
            for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
              (r = e._start + r / (e._ts || 1)), (e = e._dp);
            return !this.parent && this.vars.immediateRender ? -1 : r;
          }),
          (e.repeat = function (t) {
            return arguments.length
              ? ((this._repeat = t === 1 / 0 ? -2 : t), $t(this))
              : -2 === this._repeat
              ? 1 / 0
              : this._repeat;
          }),
          (e.repeatDelay = function (t) {
            if (arguments.length) {
              var e = this._time;
              return (this._rDelay = t), $t(this), e ? this.time(e) : this;
            }
            return this._rDelay;
          }),
          (e.yoyo = function (t) {
            return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
          }),
          (e.seek = function (t, e) {
            return this.totalTime(Jt(this, t), B(e));
          }),
          (e.restart = function (t, e) {
            // return this.play().totalTime(t ? -this._delay : 0, B(e));
          }),
          (e.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
          }),
          (e.reverse = function (t, e) {
            return (
              null != t && this.seek(t || this.totalDuration(), e),
              this.reversed(!0).paused(!1)
            );
          }),
          (e.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0);
          }),
          (e.resume = function () {
            return this.paused(!1);
          }),
          (e.reversed = function (t) {
            return arguments.length
              ? (!!t !== this.reversed() &&
                  this.timeScale(-this._rts || (t ? -1e-8 : 0)),
                this)
              : this._rts < 0;
          }),
          (e.invalidate = function () {
            return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
          }),
          (e.isActive = function () {
            var t,
              e = this.parent || this._dp,
              r = this._start;
            return !(
              e &&
              !(
                this._ts &&
                this._initted &&
                e.isActive() &&
                (t = e.rawTime(!0)) >= r &&
                t < this.endTime(!0) - k
              )
            );
          }),
          (e.eventCallback = function (t, e, r) {
            var n = this.vars;
            return arguments.length > 1
              ? (e
                  ? ((n[t] = e),
                    r && (n[t + "Params"] = r),
                    "onUpdate" === t && (this._onUpdate = e))
                  : delete n[t],
                this)
              : n[t];
          }),
          (e.then = function (t) {
            var e = this;
            return new Promise(function (r) {
              var n = R(t) ? t : Lt,
                i = function () {
                  var t = e.then;
                  (e.then = null),
                    R(n) && (n = n(e)) && (n.then || n === e) && (e.then = t),
                    r(n),
                    (e.then = t);
                };
              (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
              (!e._tTime && e._ts < 0)
                ? i()
                : (e._prom = i);
            });
          }),
          (e.kill = function () {
            ve(this);
          }),
          t
        );
      })();
    Et(Ne.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -1e-8,
      _prom: 0,
      _ps: !1,
      _rts: 1,
    });
    var Xe = (function (t) {
      function e(e, r) {
        var n;
        return (
          void 0 === e && (e = {}),
          ((n = t.call(this, e) || this).labels = {}),
          (n.smoothChildTiming = !!e.smoothChildTiming),
          (n.autoRemoveChildren = !!e.autoRemoveChildren),
          (n._sort = B(e.sortChildren)),
          f && Ut(e.parent || f, o(n), r),
          e.reversed && n.reverse(),
          e.paused && n.paused(!0),
          e.scrollTrigger && jt(o(n), e.scrollTrigger),
          n
        );
      }
      u(e, t);
      var r = e.prototype;
      return (
        (r.to = function (t, e, r) {
          return Kt(0, arguments, this), this;
        }),
        (r.from = function (t, e, r) {
          return Kt(1, arguments, this), this;
        }),
        (r.fromTo = function (t, e, r, n) {
          return Kt(2, arguments, this), this;
        }),
        (r.set = function (t, e, r) {
          return (
            (e.duration = 0),
            (e.parent = this),
            At(e).repeatDelay || (e.repeat = 0),
            (e.immediateRender = !!e.immediateRender),
            new tr(t, e, Jt(this, r), 1),
            this
          );
        }),
        (r.call = function (t, e, r) {
          return Ut(this, tr.delayedCall(0, t, e), r);
        }),
        (r.staggerTo = function (t, e, r, n, i, s, a) {
          return (
            (r.duration = e),
            (r.stagger = r.stagger || n),
            (r.onComplete = s),
            (r.onCompleteParams = a),
            (r.parent = this),
            new tr(t, r, Jt(this, i)),
            this
          );
        }),
        (r.staggerFrom = function (t, e, r, n, i, s, a) {
          return (
            (r.runBackwards = 1),
            (At(r).immediateRender = B(r.immediateRender)),
            this.staggerTo(t, e, r, n, i, s, a)
          );
        }),
        (r.staggerFromTo = function (t, e, r, n, i, s, a, o) {
          return (
            (n.startAt = r),
            (At(n).immediateRender = B(n.immediateRender)),
            this.staggerTo(t, e, n, i, s, a, o)
          );
        }),
        (r.render = function (t, e, r) {
          var n,
            i,
            s,
            a,
            o,
            u,
            l,
            h,
            d,
            p,
            m,
            _,
            v = this._time,
            g = this._dirty ? this.totalDuration() : this._tDur,
            y = this._dur,
            w = t <= 0 ? 0 : yt(t),
            b = this._zTime < 0 != t < 0 && (this._initted || !y);
          if (
            (this !== f && w > g && t >= 0 && (w = g),
            w !== this._tTime || r || b)
          ) {
            if (
              (v !== this._time &&
                y &&
                ((w += this._time - v), (t += this._time - v)),
              (n = w),
              (d = this._start),
              (u = !(h = this._ts)),
              b && (y || (v = this._zTime), (t || !e) && (this._zTime = t)),
              this._repeat)
            ) {
              if (
                ((m = this._yoyo),
                (o = y + this._rDelay),
                this._repeat < -1 && t < 0)
              )
                return this.totalTime(100 * o + t, e, r);
              if (
                ((n = yt(w % o)),
                w === g
                  ? ((a = this._repeat), (n = y))
                  : ((a = ~~(w / o)) && a === w / o && ((n = y), a--),
                    n > y && (n = y)),
                (p = Bt(this._tTime, o)),
                !v && this._tTime && p !== a && (p = a),
                m && 1 & a && ((n = y - n), (_ = 1)),
                a !== p && !this._lock)
              ) {
                var x = m && 1 & p,
                  T = x === (m && 1 & a);
                if (
                  (a < p && (x = !x),
                  (v = x ? 0 : y),
                  (this._lock = 1),
                  (this.render(v || (_ ? 0 : yt(a * o)), e, !y)._lock = 0),
                  (this._tTime = w),
                  !e && this.parent && _e(this, "onRepeat"),
                  this.vars.repeatRefresh &&
                    !_ &&
                    (this.invalidate()._lock = 1),
                  (v && v !== this._time) ||
                    u !== !this._ts ||
                    (this.vars.onRepeat && !this.parent && !this._act))
                )
                  return this;
                if (
                  ((y = this._dur),
                  (g = this._tDur),
                  T &&
                    ((this._lock = 2),
                    (v = x ? y : -1e-4),
                    this.render(v, !0),
                    this.vars.repeatRefresh && !_ && this.invalidate()),
                  (this._lock = 0),
                  !this._ts && !u)
                )
                  return this;
                Re(this, _);
              }
            }
            if (
              (this._hasPause &&
                !this._forcing &&
                this._lock < 2 &&
                ((l = (function (t, e, r) {
                  var n;
                  if (r > e)
                    for (n = t._first; n && n._start <= r; ) {
                      if ("isPause" === n.data && n._start > e) return n;
                      n = n._next;
                    }
                  else
                    for (n = t._last; n && n._start >= r; ) {
                      if ("isPause" === n.data && n._start < e) return n;
                      n = n._prev;
                    }
                })(this, yt(v), yt(n))),
                l && (w -= n - (n = l._start))),
              (this._tTime = w),
              (this._time = n),
              (this._act = !h),
              this._initted ||
                ((this._onUpdate = this.vars.onUpdate),
                (this._initted = 1),
                (this._zTime = t),
                (v = 0)),
              !v && n && !e && (_e(this, "onStart"), this._tTime !== w))
            )
              return this;
            if (n >= v && t >= 0)
              for (i = this._first; i; ) {
                if (
                  ((s = i._next), (i._act || n >= i._start) && i._ts && l !== i)
                ) {
                  if (i.parent !== this) return this.render(t, e, r);
                  if (
                    (i.render(
                      i._ts > 0
                        ? (n - i._start) * i._ts
                        : (i._dirty ? i.totalDuration() : i._tDur) +
                            (n - i._start) * i._ts,
                      e,
                      r
                    ),
                    n !== this._time || (!this._ts && !u))
                  ) {
                    (l = 0), s && (w += this._zTime = -1e-8);
                    break;
                  }
                }
                i = s;
              }
            else {
              (r = r || c), (i = this._last);
              for (var S = t < 0 ? t : n; i; ) {
                if (
                  ((s = i._prev), (i._act || S <= i._end) && i._ts && l !== i)
                ) {
                  if (i.parent !== this) return this.render(t, e, r);
                  if (
                    (i.render(
                      i._ts > 0
                        ? (S - i._start) * i._ts
                        : (i._dirty ? i.totalDuration() : i._tDur) +
                            (S - i._start) * i._ts,
                      e,
                      r
                    ),
                    n !== this._time || (!this._ts && !u))
                  ) {
                    (l = 0), s && (w += this._zTime = S ? -1e-8 : k);
                    break;
                  }
                }
                i = s;
              }
            }
            if (
              l &&
              !e &&
              (this.pause(),
              (l.render(n >= v ? 0 : -1e-8)._zTime = n >= v ? 1 : -1),
              this._ts)
            )
              return (this._start = d), Wt(this), this.render(t, e, r);
            this._onUpdate && !e && _e(this, "onUpdate", !0),
              ((w === g && this._tTime >= this.totalDuration()) || (!w && v)) &&
                ((d !== this._start && Math.abs(h) === Math.abs(this._ts)) ||
                  this._lock ||
                  ((t || !y) &&
                    ((w === g && this._ts > 0) || (!w && this._ts < 0)) &&
                    Dt(this, 1),
                  e ||
                    (t < 0 && !v) ||
                    (!w && !v && g) ||
                    (_e(
                      this,
                      w === g && t >= 0 ? "onComplete" : "onReverseComplete",
                      !0
                    ),
                    this._prom &&
                      !(w < g && this.timeScale() > 0) &&
                      this._prom())));
          }
          return this;
        }),
        (r.add = function (t, e) {
          var r = this;
          if ((z(e) || (e = Jt(this, e, t)), !(t instanceof Ne))) {
            if (X(t))
              return (
                t.forEach(function (t) {
                  return r.add(t, e);
                }),
                this
              );
            if (q(t)) return this.addLabel(t, e);
            if (!R(t)) return this;
            t = tr.delayedCall(0, t);
          }
          return this !== t ? Ut(this, t, e) : this;
        }),
        (r.getChildren = function (t, e, r, n) {
          void 0 === t && (t = !0),
            void 0 === e && (e = !0),
            void 0 === r && (r = !0),
            void 0 === n && (n = -E);
          for (var i = [], s = this._first; s; )
            s._start >= n &&
              (s instanceof tr
                ? e && i.push(s)
                : (r && i.push(s),
                  t && i.push.apply(i, s.getChildren(!0, e, r)))),
              (s = s._next);
          return i;
        }),
        (r.getById = function (t) {
          for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
            if (e[r].vars.id === t) return e[r];
        }),
        (r.remove = function (t) {
          return q(t)
            ? this.removeLabel(t)
            : R(t)
            ? this.killTweensOf(t)
            : (Pt(this, t),
              t === this._recent && (this._recent = this._last),
              qt(this));
        }),
        (r.totalTime = function (e, r) {
          return arguments.length
            ? ((this._forcing = 1),
              !this._dp &&
                this._ts &&
                (this._start = yt(
                  Me.time -
                    (this._ts > 0
                      ? e / this._ts
                      : (this.totalDuration() - e) / -this._ts)
                )),
              t.prototype.totalTime.call(this, e, r),
              (this._forcing = 0),
              this)
            : this._tTime;
        }),
        (r.addLabel = function (t, e) {
          return (this.labels[t] = Jt(this, e)), this;
        }),
        (r.removeLabel = function (t) {
          return delete this.labels[t], this;
        }),
        (r.addPause = function (t, e, r) {
          var n = tr.delayedCall(0, e || nt, r);
          return (
            (n.data = "isPause"), (this._hasPause = 1), Ut(this, n, Jt(this, t))
          );
        }),
        (r.removePause = function (t) {
          var e = this._first;
          for (t = Jt(this, t); e; )
            e._start === t && "isPause" === e.data && Dt(e), (e = e._next);
        }),
        (r.killTweensOf = function (t, e, r) {
          for (var n = this.getTweensOf(t, r), i = n.length; i--; )
            Ue !== n[i] && n[i].kill(t, e);
          return this;
        }),
        (r.getTweensOf = function (t, e) {
          for (var r, n = [], i = se(t), s = this._first, a = z(e); s; )
            s instanceof tr
              ? bt(s._targets, i) &&
                (a
                  ? (!Ue || (s._initted && s._ts)) &&
                    s.globalTime(0) <= e &&
                    s.globalTime(s.totalDuration()) > e
                  : !e || s.isActive()) &&
                n.push(s)
              : (r = s.getTweensOf(i, e)).length && n.push.apply(n, r),
              (s = s._next);
          return n;
        }),
        (r.tweenTo = function (t, e) {
          e = e || {};
          var r,
            n = this,
            i = Jt(n, t),
            s = e,
            a = s.startAt,
            o = s.onStart,
            u = s.onStartParams,
            l = s.immediateRender,
            c = tr.to(
              n,
              Et(
                {
                  ease: e.ease || "none",
                  lazy: !1,
                  immediateRender: !1,
                  time: i,
                  overwrite: "auto",
                  duration:
                    e.duration ||
                    Math.abs(
                      (i - (a && "time" in a ? a.time : n._time)) /
                        n.timeScale()
                    ) ||
                    k,
                  onStart: function () {
                    if ((n.pause(), !r)) {
                      var t =
                        e.duration ||
                        Math.abs(
                          (i - (a && "time" in a ? a.time : n._time)) /
                            n.timeScale()
                        );
                      c._dur !== t && Qt(c, t, 0, 1).render(c._time, !0, !0),
                        (r = 1);
                    }
                    o && o.apply(c, u || []);
                  },
                },
                e
              )
            );
          return l ? c.render(0) : c;
        }),
        (r.tweenFromTo = function (t, e, r) {
          return this.tweenTo(e, Et({ startAt: { time: Jt(this, t) } }, r));
        }),
        (r.recent = function () {
          return this._recent;
        }),
        (r.nextLabel = function (t) {
          return void 0 === t && (t = this._time), me(this, Jt(this, t));
        }),
        (r.previousLabel = function (t) {
          return void 0 === t && (t = this._time), me(this, Jt(this, t), 1);
        }),
        (r.currentLabel = function (t) {
          return arguments.length
            ? this.seek(t, !0)
            : this.previousLabel(this._time + k);
        }),
        (r.shiftChildren = function (t, e, r) {
          void 0 === r && (r = 0);
          for (var n, i = this._first, s = this.labels; i; )
            i._start >= r && ((i._start += t), (i._end += t)), (i = i._next);
          if (e) for (n in s) s[n] >= r && (s[n] += t);
          return qt(this);
        }),
        (r.invalidate = function () {
          var e = this._first;
          for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
          return t.prototype.invalidate.call(this);
        }),
        (r.clear = function (t) {
          void 0 === t && (t = !0);
          for (var e, r = this._first; r; )
            (e = r._next), this.remove(r), (r = e);
          return (
            this._dp && (this._time = this._tTime = this._pTime = 0),
            t && (this.labels = {}),
            qt(this)
          );
        }),
        (r.totalDuration = function (t) {
          var e,
            r,
            n,
            i = 0,
            s = this,
            a = s._last,
            o = E;
          if (arguments.length)
            return s.timeScale(
              (s._repeat < 0 ? s.duration() : s.totalDuration()) /
                (s.reversed() ? -t : t)
            );
          if (s._dirty) {
            for (n = s.parent; a; )
              (e = a._prev),
                a._dirty && a.totalDuration(),
                (r = a._start) > o && s._sort && a._ts && !s._lock
                  ? ((s._lock = 1), (Ut(s, a, r - a._delay, 1)._lock = 0))
                  : (o = r),
                r < 0 &&
                  a._ts &&
                  ((i -= r),
                  ((!n && !s._dp) || (n && n.smoothChildTiming)) &&
                    ((s._start += r / s._ts), (s._time -= r), (s._tTime -= r)),
                  s.shiftChildren(-r, !1, -Infinity),
                  (o = 0)),
                a._end > i && a._ts && (i = a._end),
                (a = e);
            Qt(s, s === f && s._time > i ? s._time : i, 1, 1), (s._dirty = 0);
          }
          return s._tDur;
        }),
        (e.updateRoot = function (t) {
          if ((f._ts && (Tt(f, Yt(t, f)), (v = Me.frame)), Me.frame >= ht)) {
            ht += S.autoSleep || 120;
            var e = f._first;
            if ((!e || !e._ts) && S.autoSleep && Me._listeners.length < 2) {
              for (; e && !e._ts; ) e = e._next;
              e || Me.sleep();
            }
          }
        }),
        e
      );
    })(Ne);
    Et(Xe.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
    var Ue,
      je,
      Ve = function (t, e, r, n, i, s, a) {
        var o,
          u,
          l,
          c,
          h,
          f,
          d,
          p,
          m = new pr(this._pt, t, e, 0, 1, ur, null, i),
          _ = 0,
          v = 0;
        for (
          m.b = r,
            m.e = n,
            r += "",
            (d = ~(n += "").indexOf("random(")) && (n = de(n)),
            s && (s((p = [r, n]), t, e), (r = p[0]), (n = p[1])),
            u = r.match(H) || [];
          (o = H.exec(n));

        )
          (c = o[0]),
            (h = n.substring(_, o.index)),
            l ? (l = (l + 1) % 5) : "rgba(" === h.substr(-5) && (l = 1),
            c !== u[v++] &&
              ((f = parseFloat(u[v - 1]) || 0),
              (m._pt = {
                _next: m._pt,
                p: h || 1 === v ? h : ",",
                s: f,
                c: "=" === c.charAt(1) ? wt(f, c) - f : parseFloat(c) - f,
                m: l && l < 4 ? Math.round : 0,
              }),
              (_ = H.lastIndex));
        return (
          (m.c = _ < n.length ? n.substring(_, n.length) : ""),
          (m.fp = a),
          (G.test(n) || d) && (m.e = 0),
          (this._pt = m),
          m
        );
      },
      He = function (t, e, r, n, i, s, a, o, u, l) {
        R(n) && (n = n(i || 0, t, s));
        var c,
          h = t[e],
          f =
            "get" !== r
              ? r
              : R(h)
              ? u
                ? t[
                    e.indexOf("set") || !R(t["get" + e.substr(3)])
                      ? e
                      : "get" + e.substr(3)
                  ](u)
                : t[e]()
              : h,
          d = R(h) ? (u ? nr : rr) : er;
        if (
          (q(n) &&
            (~n.indexOf("random(") && (n = de(n)),
            "=" === n.charAt(1) &&
              ((c = wt(f, n) + (re(f) || 0)) || 0 === c) &&
              (n = c)),
          !l || f !== n || je)
        )
          return isNaN(f * n) || "" === n
            ? (!h && !(e in t) && tt(e, n),
              Ve.call(this, t, e, f, n, d, o || S.stringFilter, u))
            : ((c = new pr(
                this._pt,
                t,
                e,
                +f || 0,
                n - (f || 0),
                "boolean" == typeof h ? or : ar,
                0,
                d
              )),
              u && (c.fp = u),
              a && c.modifier(a, this, t),
              (this._pt = c));
      },
      Ge = function (t, e, r, n, i, s) {
        var a, o, u, l;
        if (
          lt[t] &&
          !1 !==
            (a = new lt[t]()).init(
              i,
              a.rawVars
                ? e[t]
                : (function (t, e, r, n, i) {
                    if (
                      (R(t) && (t = Ze(t, i, e, r, n)),
                      !F(t) || (t.style && t.nodeType) || X(t) || N(t))
                    )
                      return q(t) ? Ze(t, i, e, r, n) : t;
                    var s,
                      a = {};
                    for (s in t) a[s] = Ze(t[s], i, e, r, n);
                    return a;
                  })(e[t], n, i, s, r),
              r,
              n,
              s
            ) &&
          ((r._pt = o = new pr(r._pt, i, t, 0, 1, a.render, a, 0, a.priority)),
          r !== g)
        )
          for (
            u = r._ptLookup[r._targets.indexOf(i)], l = a._props.length;
            l--;

          )
            u[a._props[l]] = o;
        return a;
      },
      Qe = function t(e, r) {
        var n,
          i,
          s,
          a,
          o,
          u,
          h,
          d,
          p,
          m,
          _,
          v,
          g,
          y = e.vars,
          w = y.ease,
          b = y.startAt,
          x = y.immediateRender,
          T = y.lazy,
          S = y.onUpdate,
          M = y.onUpdateParams,
          O = y.callbackScope,
          A = y.runBackwards,
          C = y.yoyoEase,
          P = y.keyframes,
          D = y.autoRevert,
          q = e._dur,
          R = e._startAt,
          z = e._targets,
          I = e.parent,
          F = I && "nested" === I.data ? I.vars.targets : z,
          Y = "auto" === e._overwrite && !l,
          W = e.timeline;
        if (
          (W && (!P || !w) && (w = "none"),
          (e._ease = ze(w, L.ease)),
          (e._yEase = C ? qe(ze(!0 === C ? w : C, L.ease)) : 0),
          C &&
            e._yoyo &&
            !e._repeat &&
            ((C = e._yEase), (e._yEase = e._ease), (e._ease = C)),
          (e._from = !W && !!y.runBackwards),
          !W || (P && !y.stagger))
        ) {
          if (
            ((v = (d = z[0] ? mt(z[0]).harness : 0) && y[d.prop]),
            (n = Ot(y, at)),
            R &&
              (r < 0 && A && x && !D
                ? R.render(-1, !0)
                : R.revert(A && q ? st : it),
              (R._lazy = 0)),
            b)
          ) {
            if (
              (Dt(
                (e._startAt = tr.set(
                  z,
                  Et(
                    {
                      data: "isStart",
                      overwrite: !1,
                      parent: I,
                      immediateRender: !0,
                      lazy: B(T),
                      startAt: null,
                      delay: 0,
                      onUpdate: S,
                      onUpdateParams: M,
                      callbackScope: O,
                      stagger: 0,
                    },
                    b
                  )
                ))
              ),
              r < 0 && (c || (!x && !D)) && e._startAt.revert(st),
              x && q && r <= 0)
            )
              return void (r && (e._zTime = r));
          } else if (A && q && !R)
            if (
              (r && (x = !1),
              (s = Et(
                {
                  overwrite: !1,
                  data: "isFromStart",
                  lazy: x && B(T),
                  immediateRender: x,
                  stagger: 0,
                  parent: I,
                },
                n
              )),
              v && (s[d.prop] = v),
              Dt((e._startAt = tr.set(z, s))),
              r < 0 && (c ? e._startAt.revert(st) : e._startAt.render(-1, !0)),
              (e._zTime = r),
              x)
            ) {
              if (!r) return;
            } else t(e._startAt, k);
          for (
            e._pt = e._ptCache = 0, T = (q && B(T)) || (T && !q), i = 0;
            i < z.length;
            i++
          ) {
            if (
              ((h = (o = z[i])._gsap || pt(z)[i]._gsap),
              (e._ptLookup[i] = m = {}),
              ut[h.id] && ot.length && xt(),
              (_ = F === z ? i : F.indexOf(o)),
              d &&
                !1 !== (p = new d()).init(o, v || n, e, _, F) &&
                ((e._pt = a =
                  new pr(e._pt, o, p.name, 0, 1, p.render, p, 0, p.priority)),
                p._props.forEach(function (t) {
                  m[t] = a;
                }),
                p.priority && (u = 1)),
              !d || v)
            )
              for (s in n)
                lt[s] && (p = Ge(s, n, e, _, o, F))
                  ? p.priority && (u = 1)
                  : (m[s] = a =
                      He.call(e, o, s, "get", n[s], _, F, 0, y.stringFilter));
            e._op && e._op[i] && e.kill(o, e._op[i]),
              Y &&
                e._pt &&
                ((Ue = e),
                f.killTweensOf(o, m, e.globalTime(r)),
                (g = !e.parent),
                (Ue = 0)),
              e._pt && T && (ut[h.id] = 1);
          }
          u && dr(e), e._onInit && e._onInit(e);
        }
        (e._onUpdate = S),
          (e._initted = (!e._op || e._pt) && !g),
          P && r <= 0 && W.render(E, !0, !0);
      },
      $e = function (t, e, r, n) {
        var i,
          s,
          a = e.ease || n || "power1.inOut";
        if (X(e))
          (s = r[t] || (r[t] = [])),
            e.forEach(function (t, r) {
              return s.push({ t: (r / (e.length - 1)) * 100, v: t, e: a });
            });
        else
          for (i in e)
            (s = r[i] || (r[i] = [])),
              "ease" === i || s.push({ t: parseFloat(t), v: e[i], e: a });
      },
      Ze = function (t, e, r, n, i) {
        return R(t)
          ? t.call(e, r, n, i)
          : q(t) && ~t.indexOf("random(")
          ? de(t)
          : t;
      },
      Je = dt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
      Ke = {};
    vt(Je + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
      return (Ke[t] = 1);
    });
    var tr = (function (t) {
      function e(e, r, n, i) {
        var s;
        "number" == typeof r && ((n.duration = r), (r = n), (n = null));
        var a,
          u,
          c,
          h,
          d,
          p,
          m,
          _,
          v = (s = t.call(this, i ? r : At(r)) || this).vars,
          g = v.duration,
          y = v.delay,
          w = v.immediateRender,
          b = v.stagger,
          x = v.overwrite,
          T = v.keyframes,
          L = v.defaults,
          E = v.scrollTrigger,
          k = v.yoyoEase,
          M = r.parent || f,
          O = (X(e) || N(e) ? z(e[0]) : "length" in r) ? [e] : se(e);
        if (
          ((s._targets = O.length
            ? pt(O)
            : et(
                "GSAP target " + e + " not found. https://greensock.com",
                !S.nullTargetWarn
              ) || []),
          (s._ptLookup = []),
          (s._overwrite = x),
          T || b || W(g) || W(y))
        ) {
          if (
            ((r = s.vars),
            (a = s.timeline =
              new Xe({
                data: "nested",
                defaults: L || {},
                targets: M && "nested" === M.data ? M.vars.targets : O,
              })).kill(),
            (a.parent = a._dp = o(s)),
            (a._start = 0),
            b || W(g) || W(y))
          ) {
            if (((h = O.length), (m = b && ue(b)), F(b)))
              for (d in b) ~Je.indexOf(d) && (_ || (_ = {}), (_[d] = b[d]));
            for (u = 0; u < h; u++)
              ((c = Ot(r, Ke)).stagger = 0),
                k && (c.yoyoEase = k),
                _ && kt(c, _),
                (p = O[u]),
                (c.duration = +Ze(g, o(s), u, p, O)),
                (c.delay = (+Ze(y, o(s), u, p, O) || 0) - s._delay),
                !b &&
                  1 === h &&
                  c.delay &&
                  ((s._delay = y = c.delay), (s._start += y), (c.delay = 0)),
                a.to(p, c, m ? m(u, p, O) : 0),
                (a._ease = Ae.none);
            a.duration() ? (g = y = 0) : (s.timeline = 0);
          } else if (T) {
            At(Et(a.vars.defaults, { ease: "none" })),
              (a._ease = ze(T.ease || r.ease || "none"));
            var A,
              C,
              P,
              D = 0;
            if (X(T))
              T.forEach(function (t) {
                return a.to(O, t, ">");
              }),
                a.duration();
            else {
              for (d in ((c = {}), T))
                "ease" === d || "easeEach" === d || $e(d, T[d], c, T.easeEach);
              for (d in c)
                for (
                  A = c[d].sort(function (t, e) {
                    return t.t - e.t;
                  }),
                    D = 0,
                    u = 0;
                  u < A.length;
                  u++
                )
                  ((P = {
                    ease: (C = A[u]).e,
                    duration: ((C.t - (u ? A[u - 1].t : 0)) / 100) * g,
                  })[d] = C.v),
                    a.to(O, P, D),
                    (D += P.duration);
              a.duration() < g && a.to({}, { duration: g - a.duration() });
            }
          }
          g || s.duration((g = a.duration()));
        } else s.timeline = 0;
        return (
          !0 !== x || l || ((Ue = o(s)), f.killTweensOf(O), (Ue = 0)),
          Ut(M, o(s), n),
          r.reversed && s.reverse(),
          r.paused && s.paused(!0),
          (w ||
            (!g &&
              !T &&
              s._start === yt(M._time) &&
              B(w) &&
              It(o(s)) &&
              "nested" !== M.data)) &&
            ((s._tTime = -1e-8), s.render(Math.max(0, -y))),
          E && jt(o(s), E),
          s
        );
      }
      u(e, t);
      var r = e.prototype;
      return (
        (r.render = function (t, e, r) {
          var n,
            i,
            s,
            a,
            o,
            u,
            l,
            h,
            f,
            d = this._time,
            p = this._tDur,
            m = this._dur,
            _ = t < 0,
            v = t > p - k && !_ ? p : t < k ? 0 : t;
          if (m) {
            if (
              v !== this._tTime ||
              !t ||
              r ||
              (!this._initted && this._tTime) ||
              (this._startAt && this._zTime < 0 !== _)
            ) {
              if (((n = v), (h = this.timeline), this._repeat)) {
                if (((a = m + this._rDelay), this._repeat < -1 && _))
                  return this.totalTime(100 * a + t, e, r);
                if (
                  ((n = yt(v % a)),
                  v === p
                    ? ((s = this._repeat), (n = m))
                    : ((s = ~~(v / a)) && s === v / a && ((n = m), s--),
                      n > m && (n = m)),
                  (u = this._yoyo && 1 & s) && ((f = this._yEase), (n = m - n)),
                  (o = Bt(this._tTime, a)),
                  n === d && !r && this._initted)
                )
                  return (this._tTime = v), this;
                s !== o &&
                  (h && this._yEase && Re(h, u),
                  !this.vars.repeatRefresh ||
                    u ||
                    this._lock ||
                    ((this._lock = r = 1),
                    (this.render(yt(a * s), !0).invalidate()._lock = 0)));
              }
              if (!this._initted) {
                if (Vt(this, _ ? t : n, r, e)) return (this._tTime = 0), this;
                if (d !== this._time) return this;
                if (m !== this._dur) return this.render(t, e, r);
              }
              if (
                ((this._tTime = v),
                (this._time = n),
                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                (this.ratio = l = (f || this._ease)(n / m)),
                this._from && (this.ratio = l = 1 - l),
                n && !d && !e && (_e(this, "onStart"), this._tTime !== v))
              )
                return this;
              for (i = this._pt; i; ) i.r(l, i.d), (i = i._next);
              (h &&
                h.render(
                  t < 0 ? t : !n && u ? -1e-8 : h._dur * h._ease(n / this._dur),
                  e,
                  r
                )) ||
                (this._startAt && (this._zTime = t)),
                this._onUpdate &&
                  !e &&
                  (_ && zt(this, t, 0, r), _e(this, "onUpdate")),
                this._repeat &&
                  s !== o &&
                  this.vars.onRepeat &&
                  !e &&
                  this.parent &&
                  _e(this, "onRepeat"),
                (v !== this._tDur && v) ||
                  this._tTime !== v ||
                  (_ && !this._onUpdate && zt(this, t, 0, !0),
                  (t || !m) &&
                    ((v === this._tDur && this._ts > 0) ||
                      (!v && this._ts < 0)) &&
                    Dt(this, 1),
                  e ||
                    (_ && !d) ||
                    (!v && !d) ||
                    (_e(this, v === p ? "onComplete" : "onReverseComplete", !0),
                    this._prom &&
                      !(v < p && this.timeScale() > 0) &&
                      this._prom()));
            }
          } else
            !(function (t, e, r, n) {
              var i,
                s,
                a,
                o = t.ratio,
                u =
                  e < 0 ||
                  (!e &&
                    ((!t._start && Ht(t) && (t._initted || !Gt(t))) ||
                      ((t._ts < 0 || t._dp._ts < 0) && !Gt(t))))
                    ? 0
                    : 1,
                l = t._rDelay,
                h = 0;
              if (
                (l &&
                  t._repeat &&
                  ((h = ee(0, t._tDur, e)),
                  (s = Bt(h, l)),
                  t._yoyo && 1 & s && (u = 1 - u),
                  s !== Bt(t._tTime, l) &&
                    ((o = 1 - u),
                    t.vars.repeatRefresh && t._initted && t.invalidate())),
                u !== o || c || n || t._zTime === k || (!e && t._zTime))
              ) {
                if (!t._initted && Vt(t, e, n, r)) return;
                for (
                  a = t._zTime,
                    t._zTime = e || (r ? k : 0),
                    r || (r = e && !a),
                    t.ratio = u,
                    t._from && (u = 1 - u),
                    t._time = 0,
                    t._tTime = h,
                    i = t._pt;
                  i;

                )
                  i.r(u, i.d), (i = i._next);
                e < 0 && zt(t, e, 0, !0),
                  t._onUpdate && !r && _e(t, "onUpdate"),
                  h && t._repeat && !r && t.parent && _e(t, "onRepeat"),
                  (e >= t._tDur || e < 0) &&
                    t.ratio === u &&
                    (u && Dt(t, 1),
                    r ||
                      c ||
                      (_e(t, u ? "onComplete" : "onReverseComplete", !0),
                      t._prom && t._prom()));
              } else t._zTime || (t._zTime = e);
            })(this, t, e, r);
          return this;
        }),
        (r.targets = function () {
          return this._targets;
        }),
        (r.invalidate = function () {
          return (
            (this._pt =
              this._op =
              this._startAt =
              this._onUpdate =
              this._lazy =
              this.ratio =
                0),
            (this._ptLookup = []),
            this.timeline && this.timeline.invalidate(),
            t.prototype.invalidate.call(this)
          );
        }),
        (r.resetTo = function (t, e, r, n) {
          y || Me.wake(), this._ts || this.play();
          var i = Math.min(
            this._dur,
            (this._dp._time - this._start) * this._ts
          );
          return (
            this._initted || Qe(this, i),
            (function (t, e, r, n, i, s, a) {
              var o,
                u,
                l,
                c,
                h = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
              if (!h)
                for (
                  h = t._ptCache[e] = [],
                    l = t._ptLookup,
                    c = t._targets.length;
                  c--;

                ) {
                  if ((o = l[c][e]) && o.d && o.d._pt)
                    for (o = o.d._pt; o && o.p !== e && o.fp !== e; )
                      o = o._next;
                  if (!o)
                    return (je = 1), (t.vars[e] = "+=0"), Qe(t, a), (je = 0), 1;
                  h.push(o);
                }
              for (c = h.length; c--; )
                ((o = (u = h[c])._pt || u).s =
                  (!n && 0 !== n) || i ? o.s + (n || 0) + s * o.c : n),
                  (o.c = r - o.s),
                  u.e && (u.e = gt(r) + re(u.e)),
                  u.b && (u.b = o.s + re(u.b));
            })(this, t, e, r, n, this._ease(i / this._dur), i)
              ? this.resetTo(t, e, r, n)
              : (Nt(this, 0),
                this.parent ||
                  Ct(
                    this._dp,
                    this,
                    "_first",
                    "_last",
                    this._dp._sort ? "_start" : 0
                  ),
                this.render(0))
          );
        }),
        (r.kill = function (t, e) {
          if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
            return (this._lazy = this._pt = 0), this.parent ? ve(this) : this;
          if (this.timeline) {
            var r = this.timeline.totalDuration();
            return (
              this.timeline.killTweensOf(t, e, Ue && !0 !== Ue.vars.overwrite)
                ._first || ve(this),
              this.parent &&
                r !== this.timeline.totalDuration() &&
                Qt(this, (this._dur * this.timeline._tDur) / r, 0, 1),
              this
            );
          }
          var n,
            i,
            s,
            a,
            o,
            u,
            l,
            c = this._targets,
            h = t ? se(t) : c,
            f = this._ptLookup,
            d = this._pt;
          if (
            (!e || "all" === e) &&
            (function (t, e) {
              for (
                var r = t.length, n = r === e.length;
                n && r-- && t[r] === e[r];

              );
              return r < 0;
            })(c, h)
          )
            return "all" === e && (this._pt = 0), ve(this);
          for (
            n = this._op = this._op || [],
              "all" !== e &&
                (q(e) &&
                  ((o = {}),
                  vt(e, function (t) {
                    return (o[t] = 1);
                  }),
                  (e = o)),
                (e = (function (t, e) {
                  var r,
                    n,
                    i,
                    s,
                    a = t[0] ? mt(t[0]).harness : 0,
                    o = a && a.aliases;
                  if (!o) return e;
                  for (n in ((r = kt({}, e)), o))
                    if ((n in r))
                      for (i = (s = o[n].split(",")).length; i--; )
                        r[s[i]] = r[n];
                  return r;
                })(c, e))),
              l = c.length;
            l--;

          )
            if (~h.indexOf(c[l]))
              for (o in ((i = f[l]),
              "all" === e
                ? ((n[l] = e), (a = i), (s = {}))
                : ((s = n[l] = n[l] || {}), (a = e)),
              a))
                (u = i && i[o]) &&
                  (("kill" in u.d && !0 !== u.d.kill(o)) || Pt(this, u, "_pt"),
                  delete i[o]),
                  "all" !== s && (s[o] = 1);
          return this._initted && !this._pt && d && ve(this), this;
        }),
        (e.to = function (t, r) {
          return new e(t, r, arguments[2]);
        }),
        (e.from = function (t, e) {
          return Kt(1, arguments);
        }),
        (e.delayedCall = function (t, r, n, i) {
          return new e(r, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: r,
            onReverseComplete: r,
            onCompleteParams: n,
            onReverseCompleteParams: n,
            callbackScope: i,
          });
        }),
        (e.fromTo = function (t, e, r) {
          return Kt(2, arguments);
        }),
        (e.set = function (t, r) {
          return (r.duration = 0), r.repeatDelay || (r.repeat = 0), new e(t, r);
        }),
        (e.killTweensOf = function (t, e, r) {
          return f.killTweensOf(t, e, r);
        }),
        e
      );
    })(Ne);
    Et(tr.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0,
    }),
      vt("staggerTo,staggerFrom,staggerFromTo", function (t) {
        tr[t] = function () {
          var e = new Xe(),
            r = ne.call(arguments, 0);
          return (
            r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r)
          );
        };
      });
    var er = function (t, e, r) {
        return (t[e] = r);
      },
      rr = function (t, e, r) {
        return t[e](r);
      },
      nr = function (t, e, r, n) {
        return t[e](n.fp, r);
      },
      ir = function (t, e, r) {
        return t.setAttribute(e, r);
      },
      sr = function (t, e) {
        return R(t[e]) ? rr : I(t[e]) && t.setAttribute ? ir : er;
      },
      ar = function (t, e) {
        return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
      },
      or = function (t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e);
      },
      ur = function (t, e) {
        var r = e._pt,
          n = "";
        if (!t && e.b) n = e.b;
        else if (1 === t && e.e) n = e.e;
        else {
          for (; r; )
            (n =
              r.p +
              (r.m
                ? r.m(r.s + r.c * t)
                : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
              n),
              (r = r._next);
          n += e.c;
        }
        e.set(e.t, e.p, n, e);
      },
      lr = function (t, e) {
        for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
      },
      cr = function (t, e, r, n) {
        for (var i, s = this._pt; s; )
          (i = s._next), s.p === n && s.modifier(t, e, r), (s = i);
      },
      hr = function (t) {
        for (var e, r, n = this._pt; n; )
          (r = n._next),
            (n.p === t && !n.op) || n.op === t
              ? Pt(this, n, "_pt")
              : n.dep || (e = 1),
            (n = r);
        return !e;
      },
      fr = function (t, e, r, n) {
        n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
      },
      dr = function (t) {
        for (var e, r, n, i, s = t._pt; s; ) {
          for (e = s._next, r = n; r && r.pr > s.pr; ) r = r._next;
          (s._prev = r ? r._prev : i) ? (s._prev._next = s) : (n = s),
            (s._next = r) ? (r._prev = s) : (i = s),
            (s = e);
        }
        t._pt = n;
      },
      pr = (function () {
        function t(t, e, r, n, i, s, a, o, u) {
          (this.t = e),
            (this.s = n),
            (this.c = i),
            (this.p = r),
            (this.r = s || ar),
            (this.d = a || this),
            (this.set = o || er),
            (this.pr = u || 0),
            (this._next = t),
            t && (t._prev = this);
        }
        return (
          (t.prototype.modifier = function (t, e, r) {
            (this.mSet = this.mSet || this.set),
              (this.set = fr),
              (this.m = t),
              (this.mt = r),
              (this.tween = e);
          }),
          t
        );
      })();
    vt(
      dt +
        "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
      function (t) {
        return (at[t] = 1);
      }
    ),
      (Z.TweenMax = Z.TweenLite = tr),
      (Z.TimelineLite = Z.TimelineMax = Xe),
      (f = new Xe({
        sortChildren: !1,
        defaults: L,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0,
      })),
      (S.stringFilter = ke);
    var mr = [],
      _r = {},
      vr = [],
      gr = 0,
      yr = function (t) {
        return (_r[t] || vr).map(function (t) {
          return t();
        });
      },
      wr = function () {
        var t = Date.now(),
          e = [];
        t - gr > 2 &&
          (yr("matchMediaInit"),
          mr.forEach(function (t) {
            var r,
              n,
              i,
              s,
              a = t.queries,
              o = t.conditions;
            for (n in a)
              (r = d.matchMedia(a[n]).matches) && (i = 1),
                r !== o[n] && ((o[n] = r), (s = 1));
            s && (t.revert(), i && e.push(t));
          }),
          yr("matchMediaRevert"),
          e.forEach(function (t) {
            return t.onMatch(t);
          }),
          (gr = t),
          yr("matchMedia"));
      },
      br = (function () {
        function t(t, e) {
          (this.selector = e && ae(e)),
            (this.data = []),
            (this._r = []),
            (this.isReverted = !1),
            t && this.add(t);
        }
        var e = t.prototype;
        return (
          (e.add = function (t, e, r) {
            R(t) && ((r = e), (e = t), (t = R));
            var n = this,
              i = function () {
                var t,
                  i = h,
                  s = n.selector;
                return (
                  i && i !== n && i.data.push(n),
                  r && (n.selector = ae(r)),
                  (h = n),
                  (t = e.apply(n, arguments)),
                  R(t) && n._r.push(t),
                  (h = i),
                  (n.selector = s),
                  (n.isReverted = !1),
                  t
                );
              };
            return (n.last = i), t === R ? i(n) : t ? (n[t] = i) : i;
          }),
          (e.ignore = function (t) {
            var e = h;
            (h = null), t(this), (h = e);
          }),
          (e.getTweens = function () {
            var e = [];
            return (
              this.data.forEach(function (r) {
                return r instanceof t
                  ? e.push.apply(e, r.getTweens())
                  : r instanceof tr && e.push(r);
              }),
              e
            );
          }),
          (e.clear = function () {
            this._r.length = this.data.length = 0;
          }),
          (e.kill = function (t, e) {
            var r = this;
            if (
              (t
                ? (this.getTweens()
                    .map(function (t) {
                      return { g: t.globalTime(0), t };
                    })
                    .sort(function (t, e) {
                      return e.g - t.g || -1;
                    })
                    .forEach(function (e) {
                      return e.t.revert(t);
                    }),
                  this.data.forEach(function (e) {
                    return !(e instanceof Ne) && e.revert && e.revert(t);
                  }),
                  this._r.forEach(function (e) {
                    return e(t, r);
                  }),
                  (this.isReverted = !0))
                : this.data.forEach(function (t) {
                    return t.kill && t.kill();
                  }),
              this.clear(),
              e)
            ) {
              var n = mr.indexOf(this);
              ~n && mr.splice(n, 1);
            }
          }),
          (e.revert = function (t) {
            this.kill(t || {});
          }),
          t
        );
      })(),
      xr = (function () {
        function t(t) {
          (this.contexts = []), (this.scope = t);
        }
        var e = t.prototype;
        return (
          (e.add = function (t, e, r) {
            F(t) || (t = { matches: t });
            var n,
              i,
              s,
              a = new br(0, r || this.scope),
              o = (a.conditions = {});
            for (i in (this.contexts.push(a),
            (e = a.add("onMatch", e)),
            (a.queries = t),
            t))
              "all" === i
                ? (s = 1)
                : (n = d.matchMedia(t[i])) &&
                  (mr.indexOf(a) < 0 && mr.push(a),
                  (o[i] = n.matches) && (s = 1),
                  n.addListener
                    ? n.addListener(wr)
                    : n.addEventListener("change", wr));
            return s && e(a), this;
          }),
          (e.revert = function (t) {
            this.kill(t || {});
          }),
          (e.kill = function (t) {
            this.contexts.forEach(function (e) {
              return e.kill(t, !0);
            });
          }),
          t
        );
      })(),
      Tr = {
        registerPlugin: function () {
          for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
          e.forEach(function (t) {
            return ge(t);
          });
        },
        timeline: function (t) {
          return new Xe(t);
        },
        getTweensOf: function (t, e) {
          return f.getTweensOf(t, e);
        },
        getProperty: function (t, e, r, n) {
          q(t) && (t = se(t)[0]);
          var i = mt(t || {}).get,
            s = r ? Lt : St;
          return (
            "native" === r && (r = ""),
            t
              ? e
                ? s(((lt[e] && lt[e].get) || i)(t, e, r, n))
                : function (e, r, n) {
                    return s(((lt[e] && lt[e].get) || i)(t, e, r, n));
                  }
              : t
          );
        },
        quickSetter: function (t, e, r) {
          if ((t = se(t)).length > 1) {
            var n = t.map(function (t) {
                return Er.quickSetter(t, e, r);
              }),
              i = n.length;
            return function (t) {
              for (var e = i; e--; ) n[e](t);
            };
          }
          t = t[0] || {};
          var s = lt[e],
            a = mt(t),
            o = (a.harness && (a.harness.aliases || {})[e]) || e,
            u = s
              ? function (e) {
                  var n = new s();
                  (g._pt = 0),
                    n.init(t, r ? e + r : e, g, 0, [t]),
                    n.render(1, n),
                    g._pt && lr(1, g);
                }
              : a.set(t, o);
          return s
            ? u
            : function (e) {
                return u(t, o, r ? e + r : e, a, 1);
              };
        },
        quickTo: function (t, e, r) {
          var n,
            i = Er.to(
              t,
              kt((((n = {})[e] = "+=0.1"), (n.paused = !0), n), r || {})
            ),
            s = function (t, r, n) {
              return i.resetTo(e, t, r, n);
            };
          return (s.tween = i), s;
        },
        isTweening: function (t) {
          return f.getTweensOf(t, !0).length > 0;
        },
        defaults: function (t) {
          return t && t.ease && (t.ease = ze(t.ease, L.ease)), Mt(L, t || {});
        },
        config: function (t) {
          return Mt(S, t || {});
        },
        registerEffect: function (t) {
          var e = t.name,
            r = t.effect,
            n = t.plugins,
            i = t.defaults,
            s = t.extendTimeline;
          (n || "").split(",").forEach(function (t) {
            return (
              t &&
              !lt[t] &&
              !Z[t] &&
              et(e + " effect requires " + t + " plugin.")
            );
          }),
            (ct[e] = function (t, e, n) {
              return r(se(t), Et(e || {}, i), n);
            }),
            s &&
              (Xe.prototype[e] = function (t, r, n) {
                return this.add(ct[e](t, F(r) ? r : (n = r) && {}, this), n);
              });
        },
        registerEase: function (t, e) {
          Ae[t] = ze(e);
        },
        parseEase: function (t, e) {
          return arguments.length ? ze(t, e) : Ae;
        },
        getById: function (t) {
          return f.getById(t);
        },
        exportRoot: function (t, e) {
          void 0 === t && (t = {});
          var r,
            n,
            i = new Xe(t);
          for (
            i.smoothChildTiming = B(t.smoothChildTiming),
              f.remove(i),
              i._dp = 0,
              i._time = i._tTime = f._time,
              r = f._first;
            r;

          )
            (n = r._next),
              (!e &&
                !r._dur &&
                r instanceof tr &&
                r.vars.onComplete === r._targets[0]) ||
                Ut(i, r, r._start - r._delay),
              (r = n);
          return Ut(f, i, 0), i;
        },
        context: function (t, e) {
          return t ? new br(t, e) : h;
        },
        matchMedia: function (t) {
          return new xr(t);
        },
        matchMediaRefresh: function () {
          return (
            mr.forEach(function (t) {
              var e,
                r,
                n = t.conditions;
              for (r in n) n[r] && ((n[r] = !1), (e = 1));
              e && t.revert();
            }) || wr()
          );
        },
        addEventListener: function (t, e) {
          var r = _r[t] || (_r[t] = []);
          ~r.indexOf(e) || r.push(e);
        },
        removeEventListener: function (t, e) {
          var r = _r[t],
            n = r && r.indexOf(e);
          n >= 0 && r.splice(n, 1);
        },
        utils: {
          wrap: function t(e, r, n) {
            var i = r - e;
            return X(e)
              ? fe(e, t(0, e.length), r)
              : te(n, function (t) {
                  return ((i + ((t - e) % i)) % i) + e;
                });
          },
          wrapYoyo: function t(e, r, n) {
            var i = r - e,
              s = 2 * i;
            return X(e)
              ? fe(e, t(0, e.length - 1), r)
              : te(n, function (t) {
                  return (
                    e + ((t = (s + ((t - e) % s)) % s || 0) > i ? s - t : t)
                  );
                });
          },
          distribute: ue,
          random: he,
          snap: ce,
          normalize: function (t, e, r) {
            return pe(t, e, 0, 1, r);
          },
          getUnit: re,
          clamp: function (t, e, r) {
            return te(r, function (r) {
              return ee(t, e, r);
            });
          },
          splitColor: xe,
          toArray: se,
          selector: ae,
          mapRange: pe,
          pipe: function () {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
              e[r] = arguments[r];
            return function (t) {
              return e.reduce(function (t, e) {
                return e(t);
              }, t);
            };
          },
          unitize: function (t, e) {
            return function (r) {
              return t(parseFloat(r)) + (e || re(r));
            };
          },
          interpolate: function t(e, r, n, i) {
            var s = isNaN(e + r)
              ? 0
              : function (t) {
                  return (1 - t) * e + t * r;
                };
            if (!s) {
              var a,
                o,
                u,
                l,
                c,
                h = q(e),
                f = {};
              if ((!0 === n && (i = 1) && (n = null), h))
                (e = { p: e }), (r = { p: r });
              else if (X(e) && !X(r)) {
                for (u = [], l = e.length, c = l - 2, o = 1; o < l; o++)
                  u.push(t(e[o - 1], e[o]));
                l--,
                  (s = function (t) {
                    t *= l;
                    var e = Math.min(c, ~~t);
                    return u[e](t - e);
                  }),
                  (n = r);
              } else i || (e = kt(X(e) ? [] : {}, e));
              if (!u) {
                for (a in r) He.call(f, e, a, "get", r[a]);
                s = function (t) {
                  return lr(t, f) || (h ? e.p : e);
                };
              }
            }
            return te(n, s);
          },
          shuffle: oe,
        },
        install: K,
        effects: ct,
        ticker: Me,
        updateRoot: Xe.updateRoot,
        plugins: lt,
        globalTimeline: f,
        core: {
          PropTween: pr,
          globals: rt,
          Tween: tr,
          Timeline: Xe,
          Animation: Ne,
          getCache: mt,
          _removeLinkedListItem: Pt,
          reverting: function () {
            return c;
          },
          context: function (t) {
            return t && h && (h.data.push(t), (t._ctx = h)), h;
          },
          suppressOverwrites: function (t) {
            return (l = t);
          },
        },
      };
    vt("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
      return (Tr[t] = tr[t]);
    }),
      Me.add(Xe.updateRoot),
      (g = Tr.to({}, { duration: 0 }));
    var Sr = function (t, e) {
        for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
          r = r._next;
        return r;
      },
      Lr = function (t, e) {
        return {
          name: t,
          rawVars: 1,
          init: function (t, r, n) {
            n._onInit = function (t) {
              var n, i;
              if (
                (q(r) &&
                  ((n = {}),
                  vt(r, function (t) {
                    return (n[t] = 1);
                  }),
                  (r = n)),
                e)
              ) {
                for (i in ((n = {}), r)) n[i] = e(r[i]);
                r = n;
              }
              !(function (t, e) {
                var r,
                  n,
                  i,
                  s = t._targets;
                for (r in e)
                  for (n = s.length; n--; )
                    (i = t._ptLookup[n][r]) &&
                      (i = i.d) &&
                      (i._pt && (i = Sr(i, r)),
                      i && i.modifier && i.modifier(e[r], t, s[n], r));
              })(t, r);
            };
          },
        };
      },
      Er =
        Tr.registerPlugin(
          {
            name: "attr",
            init: function (t, e, r, n, i) {
              var s, a, o;
              for (s in ((this.tween = r), e))
                (o = t.getAttribute(s) || ""),
                  ((a = this.add(
                    t,
                    "setAttribute",
                    (o || 0) + "",
                    e[s],
                    n,
                    i,
                    0,
                    0,
                    s
                  )).op = s),
                  (a.b = o),
                  this._props.push(s);
            },
            render: function (t, e) {
              for (var r = e._pt; r; )
                c ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next);
            },
          },
          {
            name: "endArray",
            init: function (t, e) {
              for (var r = e.length; r--; )
                this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
            },
          },
          Lr("roundProps", le),
          Lr("modifiers"),
          Lr("snap", ce)
        ) || Tr;
    (tr.version = Xe.version = Er.version = "3.11.1"),
      (_ = 1),
      Y() && Oe(),
      Ae.Power0,
      Ae.Power1,
      Ae.Power2,
      Ae.Power3,
      Ae.Power4,
      Ae.Linear,
      Ae.Quad,
      Ae.Cubic,
      Ae.Quart,
      Ae.Quint,
      Ae.Strong,
      Ae.Elastic,
      Ae.Back,
      Ae.SteppedEase,
      Ae.Bounce,
      Ae.Sine,
      Ae.Expo,
      Ae.Circ;
    var kr,
      Mr,
      Or,
      Ar,
      Cr,
      Pr,
      Dr,
      qr,
      Rr = {},
      zr = 180 / Math.PI,
      Ir = Math.PI / 180,
      Fr = Math.atan2,
      Br = /([A-Z])/g,
      Yr = /(left|right|width|margin|padding|x)/i,
      Wr = /[\s,\(]\S/,
      Nr = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity",
      },
      Xr = function (t, e) {
        return e.set(
          e.t,
          e.p,
          Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
          e
        );
      },
      Ur = function (t, e) {
        return e.set(
          e.t,
          e.p,
          1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
          e
        );
      },
      jr = function (t, e) {
        return e.set(
          e.t,
          e.p,
          t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
          e
        );
      },
      Vr = function (t, e) {
        var r = e.s + e.c * t;
        e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
      },
      Hr = function (t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e);
      },
      Gr = function (t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
      },
      Qr = function (t, e, r) {
        return (t.style[e] = r);
      },
      $r = function (t, e, r) {
        return t.style.setProperty(e, r);
      },
      Zr = function (t, e, r) {
        return (t._gsap[e] = r);
      },
      Jr = function (t, e, r) {
        return (t._gsap.scaleX = t._gsap.scaleY = r);
      },
      Kr = function (t, e, r, n, i) {
        var s = t._gsap;
        (s.scaleX = s.scaleY = r), s.renderTransform(i, s);
      },
      tn = function (t, e, r, n, i) {
        var s = t._gsap;
        (s[e] = r), s.renderTransform(i, s);
      },
      en = "transform",
      rn = en + "Origin",
      nn = function (t) {
        var e = this,
          r = this.target,
          n = r.style;
        if (t in Rr) {
          if (
            ((this.tfm = this.tfm || {}),
            "transform" !== t &&
              (~(t = Nr[t] || t).indexOf(",")
                ? t.split(",").forEach(function (t) {
                    return (e.tfm[t] = xn(r, t));
                  })
                : (this.tfm[t] = r._gsap.x ? r._gsap[t] : xn(r, t))),
            this.props.indexOf(en) >= 0)
          )
            return;
          r._gsap.svg &&
            ((this.svgo = r.getAttribute("data-svg-origin")),
            this.props.push(rn, "")),
            (t = en);
        }
        n && this.props.push(t, n[t]);
      },
      sn = function (t) {
        t.translate &&
          (t.removeProperty("translate"),
          t.removeProperty("scale"),
          t.removeProperty("rotate"));
      },
      an = function () {
        var t,
          e,
          r = this.props,
          n = this.target,
          i = n.style,
          s = n._gsap;
        for (t = 0; t < r.length; t += 2)
          r[t + 1]
            ? (i[r[t]] = r[t + 1])
            : i.removeProperty(r[t].replace(Br, "-$1").toLowerCase());
        if (this.tfm) {
          for (e in this.tfm) s[e] = this.tfm[e];
          s.svg &&
            (s.renderTransform(),
            n.setAttribute("data-svg-origin", this.svgo || "")),
            !(t = Dr()) || t.isStart || i[en] || (sn(i), (s.uncache = 1));
        }
      },
      on = function (t, e) {
        var r = { target: t, props: [], revert: an, save: nn };
        return (
          e &&
            e.split(",").forEach(function (t) {
              return r.save(t);
            }),
          r
        );
      },
      un = function (t, e) {
        var r = Mr.createElementNS
          ? Mr.createElementNS(
              (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
              t
            )
          : Mr.createElement(t);
        return r.style ? r : Mr.createElement(t);
      },
      ln = function t(e, r, n) {
        var i = getComputedStyle(e);
        return (
          i[r] ||
          i.getPropertyValue(r.replace(Br, "-$1").toLowerCase()) ||
          i.getPropertyValue(r) ||
          (!n && t(e, hn(r) || r, 1)) ||
          ""
        );
      },
      cn = "O,Moz,ms,Ms,Webkit".split(","),
      hn = function (t, e, r) {
        var n = (e || Cr).style,
          i = 5;
        if (t in n && !r) return t;
        for (
          t = t.charAt(0).toUpperCase() + t.substr(1);
          i-- && !(cn[i] + t in n);

        );
        return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? cn[i] : "") + t;
      },
      fn = function () {
        "undefined" != typeof window &&
          window.document &&
          ((kr = window),
          (Mr = kr.document),
          (Or = Mr.documentElement),
          (Cr = un("div") || { style: {} }),
          un("div"),
          (en = hn(en)),
          (rn = en + "Origin"),
          (Cr.style.cssText =
            "border-width:0;line-height:0;position:absolute;padding:0"),
          (qr = !!hn("perspective")),
          (Dr = Er.core.reverting),
          (Ar = 1));
      },
      dn = function t(e) {
        var r,
          n = un(
            "svg",
            (this.ownerSVGElement &&
              this.ownerSVGElement.getAttribute("xmlns")) ||
              "http://www.w3.org/2000/svg"
          ),
          i = this.parentNode,
          s = this.nextSibling,
          a = this.style.cssText;
        if (
          (Or.appendChild(n),
          n.appendChild(this),
          (this.style.display = "block"),
          e)
        )
          try {
            (r = this.getBBox()),
              (this._gsapBBox = this.getBBox),
              (this.getBBox = t);
          } catch (t) {}
        else this._gsapBBox && (r = this._gsapBBox());
        return (
          i && (s ? i.insertBefore(this, s) : i.appendChild(this)),
          Or.removeChild(n),
          (this.style.cssText = a),
          r
        );
      },
      pn = function (t, e) {
        for (var r = e.length; r--; )
          if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
      },
      mn = function (t) {
        var e;
        try {
          e = t.getBBox();
        } catch (r) {
          e = dn.call(t, !0);
        }
        return (
          (e && (e.width || e.height)) ||
            t.getBBox === dn ||
            (e = dn.call(t, !0)),
          !e || e.width || e.x || e.y
            ? e
            : {
                x: +pn(t, ["x", "cx", "x1"]) || 0,
                y: +pn(t, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0,
              }
        );
      },
      _n = function (t) {
        return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !mn(t));
      },
      vn = function (t, e) {
        if (e) {
          var r = t.style;
          e in Rr && e !== rn && (e = en),
            r.removeProperty
              ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                  (e = "-" + e),
                r.removeProperty(e.replace(Br, "-$1").toLowerCase()))
              : r.removeAttribute(e);
        }
      },
      gn = function (t, e, r, n, i, s) {
        var a = new pr(t._pt, e, r, 0, 1, s ? Gr : Hr);
        return (t._pt = a), (a.b = n), (a.e = i), t._props.push(r), a;
      },
      yn = { deg: 1, rad: 1, turn: 1 },
      wn = { grid: 1, flex: 1 },
      bn = function t(e, r, n, i) {
        var s,
          a,
          o,
          u,
          l = parseFloat(n) || 0,
          c = (n + "").trim().substr((l + "").length) || "px",
          h = Cr.style,
          f = Yr.test(r),
          d = "svg" === e.tagName.toLowerCase(),
          p = (d ? "client" : "offset") + (f ? "Width" : "Height"),
          m = 100,
          _ = "px" === i,
          v = "%" === i;
        return i === c || !l || yn[i] || yn[c]
          ? l
          : ("px" !== c && !_ && (l = t(e, r, n, "px")),
            (u = e.getCTM && _n(e)),
            (!v && "%" !== c) || (!Rr[r] && !~r.indexOf("adius"))
              ? ((h[f ? "width" : "height"] = m + (_ ? c : i)),
                (a =
                  ~r.indexOf("adius") || ("em" === i && e.appendChild && !d)
                    ? e
                    : e.parentNode),
                u && (a = (e.ownerSVGElement || {}).parentNode),
                (a && a !== Mr && a.appendChild) || (a = Mr.body),
                (o = a._gsap) &&
                v &&
                o.width &&
                f &&
                o.time === Me.time &&
                !o.uncache
                  ? gt((l / o.width) * m)
                  : ((v || "%" === c) &&
                      !wn[ln(a, "display")] &&
                      (h.position = ln(e, "position")),
                    a === e && (h.position = "static"),
                    a.appendChild(Cr),
                    (s = Cr[p]),
                    a.removeChild(Cr),
                    (h.position = "absolute"),
                    f && v && (((o = mt(a)).time = Me.time), (o.width = a[p])),
                    gt(_ ? (s * l) / m : s && l ? (m / s) * l : 0)))
              : ((s = u ? e.getBBox()[f ? "width" : "height"] : e[p]),
                gt(v ? (l / s) * m : (l / 100) * s)));
      },
      xn = function (t, e, r, n) {
        var i;
        return (
          Ar || fn(),
          e in Nr &&
            "transform" !== e &&
            ~(e = Nr[e]).indexOf(",") &&
            (e = e.split(",")[0]),
          Rr[e] && "transform" !== e
            ? ((i = Dn(t, n)),
              (i =
                "transformOrigin" !== e
                  ? i[e]
                  : i.svg
                  ? i.origin
                  : qn(ln(t, rn)) + " " + i.zOrigin + "px"))
            : (!(i = t.style[e]) ||
                "auto" === i ||
                n ||
                ~(i + "").indexOf("calc(")) &&
              (i =
                (En[e] && En[e](t, e, r)) ||
                ln(t, e) ||
                _t(t, e) ||
                ("opacity" === e ? 1 : 0)),
          r && !~(i + "").trim().indexOf(" ") ? bn(t, e, i, r) + r : i
        );
      },
      Tn = function (t, e, r, n) {
        if (!r || "none" === r) {
          var i = hn(e, t, 1),
            s = i && ln(t, i, 1);
          s && s !== r
            ? ((e = i), (r = s))
            : "borderColor" === e && (r = ln(t, "borderTopColor"));
        }
        var a,
          o,
          u,
          l,
          c,
          h,
          f,
          d,
          p,
          m,
          _,
          v = new pr(this._pt, t.style, e, 0, 1, ur),
          g = 0,
          y = 0;
        if (
          ((v.b = r),
          (v.e = n),
          (r += ""),
          "auto" == (n += "") &&
            ((t.style[e] = n), (n = ln(t, e) || n), (t.style[e] = r)),
          ke((a = [r, n])),
          (n = a[1]),
          (u = (r = a[0]).match(V) || []),
          (n.match(V) || []).length)
        ) {
          for (; (o = V.exec(n)); )
            (f = o[0]),
              (p = n.substring(g, o.index)),
              c
                ? (c = (c + 1) % 5)
                : ("rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5)) ||
                  (c = 1),
              f !== (h = u[y++] || "") &&
                ((l = parseFloat(h) || 0),
                (_ = h.substr((l + "").length)),
                "=" === f.charAt(1) && (f = wt(l, f) + _),
                (d = parseFloat(f)),
                (m = f.substr((d + "").length)),
                (g = V.lastIndex - m.length),
                m ||
                  ((m = m || S.units[e] || _),
                  g === n.length && ((n += m), (v.e += m))),
                _ !== m && (l = bn(t, e, h, m) || 0),
                (v._pt = {
                  _next: v._pt,
                  p: p || 1 === y ? p : ",",
                  s: l,
                  c: d - l,
                  m: (c && c < 4) || "zIndex" === e ? Math.round : 0,
                }));
          v.c = g < n.length ? n.substring(g, n.length) : "";
        } else v.r = "display" === e && "none" === n ? Gr : Hr;
        return G.test(n) && (v.e = 0), (this._pt = v), v;
      },
      Sn = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%",
      },
      Ln = function (t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
          var r,
            n,
            i,
            s = e.t,
            a = s.style,
            o = e.u,
            u = s._gsap;
          if ("all" === o || !0 === o) (a.cssText = ""), (n = 1);
          else
            for (i = (o = o.split(",")).length; --i > -1; )
              (r = o[i]),
                Rr[r] && ((n = 1), (r = "transformOrigin" === r ? rn : en)),
                vn(s, r);
          n &&
            (vn(s, en),
            u &&
              (u.svg && s.removeAttribute("transform"),
              Dn(s, 1),
              (u.uncache = 1),
              sn(a)));
        }
      },
      En = {
        clearProps: function (t, e, r, n, i) {
          if ("isFromStart" !== i.data) {
            var s = (t._pt = new pr(t._pt, e, r, 0, 0, Ln));
            return (s.u = n), (s.pr = -10), (s.tween = i), t._props.push(r), 1;
          }
        },
      },
      kn = [1, 0, 0, 1, 0, 0],
      Mn = {},
      On = function (t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
      },
      An = function (t) {
        var e = ln(t, en);
        return On(e) ? kn : e.substr(7).match(j).map(gt);
      },
      Cn = function (t, e) {
        var r,
          n,
          i,
          s,
          a = t._gsap || mt(t),
          o = t.style,
          u = An(t);
        return a.svg && t.getAttribute("transform")
          ? "1,0,0,1,0,0" ===
            (u = [
              (i = t.transform.baseVal.consolidate().matrix).a,
              i.b,
              i.c,
              i.d,
              i.e,
              i.f,
            ]).join(",")
            ? kn
            : u
          : (u !== kn ||
              t.offsetParent ||
              t === Or ||
              a.svg ||
              ((i = o.display),
              (o.display = "block"),
              ((r = t.parentNode) && t.offsetParent) ||
                ((s = 1), (n = t.nextElementSibling), Or.appendChild(t)),
              (u = An(t)),
              i ? (o.display = i) : vn(t, "display"),
              s &&
                (n
                  ? r.insertBefore(t, n)
                  : r
                  ? r.appendChild(t)
                  : Or.removeChild(t))),
            e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
      },
      Pn = function (t, e, r, n, i, s) {
        var a,
          o,
          u,
          l = t._gsap,
          c = i || Cn(t, !0),
          h = l.xOrigin || 0,
          f = l.yOrigin || 0,
          d = l.xOffset || 0,
          p = l.yOffset || 0,
          m = c[0],
          _ = c[1],
          v = c[2],
          g = c[3],
          y = c[4],
          w = c[5],
          b = e.split(" "),
          x = parseFloat(b[0]) || 0,
          T = parseFloat(b[1]) || 0;
        r
          ? c !== kn &&
            (o = m * g - _ * v) &&
            ((u = x * (-_ / o) + T * (m / o) - (m * w - _ * y) / o),
            (x = x * (g / o) + T * (-v / o) + (v * w - g * y) / o),
            (T = u))
          : ((x =
              (a = mn(t)).x + (~b[0].indexOf("%") ? (x / 100) * a.width : x)),
            (T =
              a.y + (~(b[1] || b[0]).indexOf("%") ? (T / 100) * a.height : T))),
          n || (!1 !== n && l.smooth)
            ? ((y = x - h),
              (w = T - f),
              (l.xOffset = d + (y * m + w * v) - y),
              (l.yOffset = p + (y * _ + w * g) - w))
            : (l.xOffset = l.yOffset = 0),
          (l.xOrigin = x),
          (l.yOrigin = T),
          (l.smooth = !!n),
          (l.origin = e),
          (l.originIsAbsolute = !!r),
          (t.style[rn] = "0px 0px"),
          s &&
            (gn(s, l, "xOrigin", h, x),
            gn(s, l, "yOrigin", f, T),
            gn(s, l, "xOffset", d, l.xOffset),
            gn(s, l, "yOffset", p, l.yOffset)),
          t.setAttribute("data-svg-origin", x + " " + T);
      },
      Dn = function (t, e) {
        var r = t._gsap || new We(t);
        if ("x" in r && !e && !r.uncache) return r;
        var n,
          i,
          s,
          a,
          o,
          u,
          l,
          c,
          h,
          f,
          d,
          p,
          m,
          _,
          v,
          g,
          y,
          w,
          b,
          x,
          T,
          L,
          E,
          k,
          M,
          O,
          A,
          C,
          P,
          D,
          q,
          R,
          z = t.style,
          I = r.scaleX < 0,
          F = "px",
          B = "deg",
          Y = getComputedStyle(t),
          W = ln(t, rn) || "0";
        return (
          (n = i = s = u = l = c = h = f = d = 0),
          (a = o = 1),
          (r.svg = !(!t.getCTM || !_n(t))),
          Y.translate &&
            (("none" === Y.translate &&
              "none" === Y.scale &&
              "none" === Y.rotate) ||
              (z[en] =
                ("none" !== Y.translate
                  ? "translate3d(" +
                    (Y.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                    ") "
                  : "") +
                ("none" !== Y.rotate ? "rotate(" + Y.rotate + ") " : "") +
                ("none" !== Y.scale
                  ? "scale(" + Y.scale.split(" ").join(",") + ") "
                  : "") +
                Y[en]),
            (z.scale = z.rotate = z.translate = "none")),
          (_ = Cn(t, r.svg)),
          r.svg &&
            (r.uncache
              ? ((M = t.getBBox()),
                (W = r.xOrigin - M.x + "px " + (r.yOrigin - M.y) + "px"),
                (k = ""))
              : (k = !e && t.getAttribute("data-svg-origin")),
            Pn(t, k || W, !!k || r.originIsAbsolute, !1 !== r.smooth, _)),
          (p = r.xOrigin || 0),
          (m = r.yOrigin || 0),
          _ !== kn &&
            ((w = _[0]),
            (b = _[1]),
            (x = _[2]),
            (T = _[3]),
            (n = L = _[4]),
            (i = E = _[5]),
            6 === _.length
              ? ((a = Math.sqrt(w * w + b * b)),
                (o = Math.sqrt(T * T + x * x)),
                (u = w || b ? Fr(b, w) * zr : 0),
                (h = x || T ? Fr(x, T) * zr + u : 0) &&
                  (o *= Math.abs(Math.cos(h * Ir))),
                r.svg &&
                  ((n -= p - (p * w + m * x)), (i -= m - (p * b + m * T))))
              : ((R = _[6]),
                (D = _[7]),
                (A = _[8]),
                (C = _[9]),
                (P = _[10]),
                (q = _[11]),
                (n = _[12]),
                (i = _[13]),
                (s = _[14]),
                (l = (v = Fr(R, P)) * zr),
                v &&
                  ((k = L * (g = Math.cos(-v)) + A * (y = Math.sin(-v))),
                  (M = E * g + C * y),
                  (O = R * g + P * y),
                  (A = L * -y + A * g),
                  (C = E * -y + C * g),
                  (P = R * -y + P * g),
                  (q = D * -y + q * g),
                  (L = k),
                  (E = M),
                  (R = O)),
                (c = (v = Fr(-x, P)) * zr),
                v &&
                  ((g = Math.cos(-v)),
                  (q = T * (y = Math.sin(-v)) + q * g),
                  (w = k = w * g - A * y),
                  (b = M = b * g - C * y),
                  (x = O = x * g - P * y)),
                (u = (v = Fr(b, w)) * zr),
                v &&
                  ((k = w * (g = Math.cos(v)) + b * (y = Math.sin(v))),
                  (M = L * g + E * y),
                  (b = b * g - w * y),
                  (E = E * g - L * y),
                  (w = k),
                  (L = M)),
                l &&
                  Math.abs(l) + Math.abs(u) > 359.9 &&
                  ((l = u = 0), (c = 180 - c)),
                (a = gt(Math.sqrt(w * w + b * b + x * x))),
                (o = gt(Math.sqrt(E * E + R * R))),
                (v = Fr(L, E)),
                (h = Math.abs(v) > 2e-4 ? v * zr : 0),
                (d = q ? 1 / (q < 0 ? -q : q) : 0)),
            r.svg &&
              ((k = t.getAttribute("transform")),
              (r.forceCSS = t.setAttribute("transform", "") || !On(ln(t, en))),
              k && t.setAttribute("transform", k))),
          Math.abs(h) > 90 &&
            Math.abs(h) < 270 &&
            (I
              ? ((a *= -1),
                (h += u <= 0 ? 180 : -180),
                (u += u <= 0 ? 180 : -180))
              : ((o *= -1), (h += h <= 0 ? 180 : -180))),
          (e = e || r.uncache),
          (r.x =
            n -
            ((r.xPercent =
              n &&
              ((!e && r.xPercent) ||
                (Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
              ? (t.offsetWidth * r.xPercent) / 100
              : 0) +
            F),
          (r.y =
            i -
            ((r.yPercent =
              i &&
              ((!e && r.yPercent) ||
                (Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0)))
              ? (t.offsetHeight * r.yPercent) / 100
              : 0) +
            F),
          (r.z = s + F),
          (r.scaleX = gt(a)),
          (r.scaleY = gt(o)),
          (r.rotation = gt(u) + B),
          (r.rotationX = gt(l) + B),
          (r.rotationY = gt(c) + B),
          (r.skewX = h + B),
          (r.skewY = f + B),
          (r.transformPerspective = d + F),
          (r.zOrigin = parseFloat(W.split(" ")[2]) || 0) && (z[rn] = qn(W)),
          (r.xOffset = r.yOffset = 0),
          (r.force3D = S.force3D),
          (r.renderTransform = r.svg ? Wn : qr ? Yn : zn),
          (r.uncache = 0),
          r
        );
      },
      qn = function (t) {
        return (t = t.split(" "))[0] + " " + t[1];
      },
      Rn = function (t, e, r) {
        var n = re(e);
        return gt(parseFloat(e) + parseFloat(bn(t, "x", r + "px", n))) + n;
      },
      zn = function (t, e) {
        (e.z = "0px"),
          (e.rotationY = e.rotationX = "0deg"),
          (e.force3D = 0),
          Yn(t, e);
      },
      In = "0deg",
      Fn = "0px",
      Bn = ") ",
      Yn = function (t, e) {
        var r = e || this,
          n = r.xPercent,
          i = r.yPercent,
          s = r.x,
          a = r.y,
          o = r.z,
          u = r.rotation,
          l = r.rotationY,
          c = r.rotationX,
          h = r.skewX,
          f = r.skewY,
          d = r.scaleX,
          p = r.scaleY,
          m = r.transformPerspective,
          _ = r.force3D,
          v = r.target,
          g = r.zOrigin,
          y = "",
          w = ("auto" === _ && t && 1 !== t) || !0 === _;
        if (g && (c !== In || l !== In)) {
          var b,
            x = parseFloat(l) * Ir,
            T = Math.sin(x),
            S = Math.cos(x);
          (x = parseFloat(c) * Ir),
            (b = Math.cos(x)),
            (s = Rn(v, s, T * b * -g)),
            (a = Rn(v, a, -Math.sin(x) * -g)),
            (o = Rn(v, o, S * b * -g + g));
        }
        m !== Fn && (y += "perspective(" + m + Bn),
          (n || i) && (y += "translate(" + n + "%, " + i + "%) "),
          (w || s !== Fn || a !== Fn || o !== Fn) &&
            (y +=
              o !== Fn || w
                ? "translate3d(" + s + ", " + a + ", " + o + ") "
                : "translate(" + s + ", " + a + Bn),
          u !== In && (y += "rotate(" + u + Bn),
          l !== In && (y += "rotateY(" + l + Bn),
          c !== In && (y += "rotateX(" + c + Bn),
          (h === In && f === In) || (y += "skew(" + h + ", " + f + Bn),
          (1 === d && 1 === p) || (y += "scale(" + d + ", " + p + Bn),
          (v.style[en] = y || "translate(0, 0)");
      },
      Wn = function (t, e) {
        var r,
          n,
          i,
          s,
          a,
          o = e || this,
          u = o.xPercent,
          l = o.yPercent,
          c = o.x,
          h = o.y,
          f = o.rotation,
          d = o.skewX,
          p = o.skewY,
          m = o.scaleX,
          _ = o.scaleY,
          v = o.target,
          g = o.xOrigin,
          y = o.yOrigin,
          w = o.xOffset,
          b = o.yOffset,
          x = o.forceCSS,
          T = parseFloat(c),
          S = parseFloat(h);
        (f = parseFloat(f)),
          (d = parseFloat(d)),
          (p = parseFloat(p)) && ((d += p = parseFloat(p)), (f += p)),
          f || d
            ? ((f *= Ir),
              (d *= Ir),
              (r = Math.cos(f) * m),
              (n = Math.sin(f) * m),
              (i = Math.sin(f - d) * -_),
              (s = Math.cos(f - d) * _),
              d &&
                ((p *= Ir),
                (a = Math.tan(d - p)),
                (i *= a = Math.sqrt(1 + a * a)),
                (s *= a),
                p &&
                  ((a = Math.tan(p)),
                  (r *= a = Math.sqrt(1 + a * a)),
                  (n *= a))),
              (r = gt(r)),
              (n = gt(n)),
              (i = gt(i)),
              (s = gt(s)))
            : ((r = m), (s = _), (n = i = 0)),
          ((T && !~(c + "").indexOf("px")) ||
            (S && !~(h + "").indexOf("px"))) &&
            ((T = bn(v, "x", c, "px")), (S = bn(v, "y", h, "px"))),
          (g || y || w || b) &&
            ((T = gt(T + g - (g * r + y * i) + w)),
            (S = gt(S + y - (g * n + y * s) + b))),
          (u || l) &&
            ((a = v.getBBox()),
            (T = gt(T + (u / 100) * a.width)),
            (S = gt(S + (l / 100) * a.height))),
          (a =
            "matrix(" +
            r +
            "," +
            n +
            "," +
            i +
            "," +
            s +
            "," +
            T +
            "," +
            S +
            ")"),
          v.setAttribute("transform", a),
          x && (v.style[en] = a);
      },
      Nn = function (t, e, r, n, i) {
        var s,
          a,
          o = 360,
          u = q(i),
          l = parseFloat(i) * (u && ~i.indexOf("rad") ? zr : 1) - n,
          c = n + l + "deg";
        return (
          u &&
            ("short" === (s = i.split("_")[1]) &&
              (l %= o) != l % 180 &&
              (l += l < 0 ? o : -360),
            "cw" === s && l < 0
              ? (l = ((l + 36e9) % o) - ~~(l / o) * o)
              : "ccw" === s && l > 0 && (l = ((l - 36e9) % o) - ~~(l / o) * o)),
          (t._pt = a = new pr(t._pt, e, r, n, l, Ur)),
          (a.e = c),
          (a.u = "deg"),
          t._props.push(r),
          a
        );
      },
      Xn = function (t, e) {
        for (var r in e) t[r] = e[r];
        return t;
      },
      Un = function (t, e, r) {
        var n,
          i,
          s,
          a,
          o,
          u,
          l,
          c = Xn({}, r._gsap),
          h = r.style;
        for (i in (c.svg
          ? ((s = r.getAttribute("transform")),
            r.setAttribute("transform", ""),
            (h[en] = e),
            (n = Dn(r, 1)),
            vn(r, en),
            r.setAttribute("transform", s))
          : ((s = getComputedStyle(r)[en]),
            (h[en] = e),
            (n = Dn(r, 1)),
            (h[en] = s)),
        Rr))
          (s = c[i]) !== (a = n[i]) &&
            "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 &&
            ((o = re(s) !== (l = re(a)) ? bn(r, i, s, l) : parseFloat(s)),
            (u = parseFloat(a)),
            (t._pt = new pr(t._pt, n, i, o, u - o, Xr)),
            (t._pt.u = l || 0),
            t._props.push(i));
        Xn(n, c);
      };
    vt("padding,margin,Width,Radius", function (t, e) {
      var r = "Top",
        n = "Right",
        i = "Bottom",
        s = "Left",
        a = (e < 3 ? [r, n, i, s] : [r + s, r + n, i + n, i + s]).map(function (
          r
        ) {
          return e < 2 ? t + r : "border" + r + t;
        });
      En[e > 1 ? "border" + t : t] = function (t, e, r, n, i) {
        var s, o;
        if (arguments.length < 4)
          return (
            (s = a.map(function (e) {
              return xn(t, e, r);
            })),
            5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o
          );
        (s = (n + "").split(" ")),
          (o = {}),
          a.forEach(function (t, e) {
            return (o[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
          }),
          t.init(e, o, i);
      };
    });
    var jn,
      Vn,
      Hn = {
        name: "css",
        register: fn,
        targetTest: function (t) {
          return t.style && t.nodeType;
        },
        init: function (t, e, r, n, i) {
          var s,
            a,
            o,
            u,
            l,
            c,
            h,
            f,
            d,
            p,
            m,
            _,
            v,
            g,
            y,
            w,
            b,
            x,
            T,
            L,
            E = this._props,
            k = t.style,
            M = r.vars.startAt;
          for (h in (Ar || fn(),
          (this.styles = this.styles || on(t)),
          (w = this.styles.props),
          (this.tween = r),
          e))
            if (
              "autoRound" !== h &&
              ((a = e[h]), !lt[h] || !Ge(h, e, r, n, t, i))
            )
              if (
                ((l = typeof a),
                (c = En[h]),
                "function" === l && (l = typeof (a = a.call(r, n, t, i))),
                "string" === l && ~a.indexOf("random(") && (a = de(a)),
                c)
              )
                c(this, t, h, a, r) && (y = 1);
              else if ("--" === h.substr(0, 2))
                (s = (getComputedStyle(t).getPropertyValue(h) + "").trim()),
                  (a += ""),
                  (Le.lastIndex = 0),
                  Le.test(s) || ((f = re(s)), (d = re(a))),
                  d ? f !== d && (s = bn(t, h, s, d) + d) : f && (a += f),
                  this.add(k, "setProperty", s, a, n, i, 0, 0, h),
                  E.push(h),
                  w.push(h, k[h]);
              else if ("undefined" !== l) {
                if (
                  (M && h in M
                    ? ((s =
                        "function" == typeof M[h]
                          ? M[h].call(r, n, t, i)
                          : M[h]),
                      q(s) && ~s.indexOf("random(") && (s = de(s)),
                      re(s + "") || (s += S.units[h] || re(xn(t, h)) || ""),
                      "=" === (s + "").charAt(1) && (s = xn(t, h)))
                    : (s = xn(t, h)),
                  (u = parseFloat(s)),
                  (p =
                    "string" === l && "=" === a.charAt(1) && a.substr(0, 2)) &&
                    (a = a.substr(2)),
                  (o = parseFloat(a)),
                  h in Nr &&
                    ("autoAlpha" === h &&
                      (1 === u &&
                        "hidden" === xn(t, "visibility") &&
                        o &&
                        (u = 0),
                      w.push("visibility", k.visibility),
                      gn(
                        this,
                        k,
                        "visibility",
                        u ? "inherit" : "hidden",
                        o ? "inherit" : "hidden",
                        !o
                      )),
                    "scale" !== h &&
                      "transform" !== h &&
                      ~(h = Nr[h]).indexOf(",") &&
                      (h = h.split(",")[0])),
                  (m = h in Rr))
                )
                  if (
                    (this.styles.save(h),
                    _ ||
                      (((v = t._gsap).renderTransform && !e.parseTransform) ||
                        Dn(t, e.parseTransform),
                      (g = !1 !== e.smoothOrigin && v.smooth),
                      ((_ = this._pt =
                        new pr(
                          this._pt,
                          k,
                          en,
                          0,
                          1,
                          v.renderTransform,
                          v,
                          0,
                          -1
                        )).dep = 1)),
                    "scale" === h)
                  )
                    (this._pt = new pr(
                      this._pt,
                      v,
                      "scaleY",
                      v.scaleY,
                      (p ? wt(v.scaleY, p + o) : o) - v.scaleY || 0,
                      Xr
                    )),
                      (this._pt.u = 0),
                      E.push("scaleY", h),
                      (h += "X");
                  else {
                    if ("transformOrigin" === h) {
                      w.push(rn, k[rn]),
                        (x = void 0),
                        (T = void 0),
                        (L = void 0),
                        (T = (x = (b = a).split(" "))[0]),
                        (L = x[1] || "50%"),
                        ("top" !== T &&
                          "bottom" !== T &&
                          "left" !== L &&
                          "right" !== L) ||
                          ((b = T), (T = L), (L = b)),
                        (x[0] = Sn[T] || T),
                        (x[1] = Sn[L] || L),
                        (a = x.join(" ")),
                        v.svg
                          ? Pn(t, a, 0, g, 0, this)
                          : ((d = parseFloat(a.split(" ")[2]) || 0) !==
                              v.zOrigin && gn(this, v, "zOrigin", v.zOrigin, d),
                            gn(this, k, h, qn(s), qn(a)));
                      continue;
                    }
                    if ("svgOrigin" === h) {
                      Pn(t, a, 1, g, 0, this);
                      continue;
                    }
                    if (h in Mn) {
                      Nn(this, v, h, u, p ? wt(u, p + a) : a);
                      continue;
                    }
                    if ("smoothOrigin" === h) {
                      gn(this, v, "smooth", v.smooth, a);
                      continue;
                    }
                    if ("force3D" === h) {
                      v[h] = a;
                      continue;
                    }
                    if ("transform" === h) {
                      Un(this, a, t);
                      continue;
                    }
                  }
                else h in k || (h = hn(h) || h);
                if (
                  m ||
                  ((o || 0 === o) && (u || 0 === u) && !Wr.test(a) && h in k)
                )
                  o || (o = 0),
                    (f = (s + "").substr((u + "").length)) !==
                      (d = re(a) || (h in S.units ? S.units[h] : f)) &&
                      (u = bn(t, h, s, d)),
                    (this._pt = new pr(
                      this._pt,
                      m ? v : k,
                      h,
                      u,
                      (p ? wt(u, p + o) : o) - u,
                      m || ("px" !== d && "zIndex" !== h) || !1 === e.autoRound
                        ? Xr
                        : Vr
                    )),
                    (this._pt.u = d || 0),
                    f !== d &&
                      "%" !== d &&
                      ((this._pt.b = s), (this._pt.r = jr));
                else if (h in k) Tn.call(this, t, h, s, p ? p + a : a);
                else {
                  if (!(h in t)) {
                    tt(h, a);
                    continue;
                  }
                  this.add(t, h, s || t[h], p ? p + a : a, n, i);
                }
                m || w.push(h, k[h]), E.push(h);
              }
          y && dr(this);
        },
        render: function (t, e) {
          if (e.tween._time || !Dr())
            for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
          else e.styles.revert();
        },
        get: xn,
        aliases: Nr,
        getSetter: function (t, e, r) {
          var n = Nr[e];
          return (
            n && n.indexOf(",") < 0 && (e = n),
            e in Rr && e !== rn && (t._gsap.x || xn(t, "x"))
              ? r && Pr === r
                ? "scale" === e
                  ? Jr
                  : Zr
                : (Pr = r || {}) && ("scale" === e ? Kr : tn)
              : t.style && !I(t.style[e])
              ? Qr
              : ~e.indexOf("-")
              ? $r
              : sr(t, e)
          );
        },
        core: { _removeProperty: vn, _getMatrix: Cn },
      };
    (Er.utils.checkPrefix = hn),
      (Er.core.getStyleSaver = on),
      (Vn = vt(
        "x,y,z,scale,scaleX,scaleY,xPercent,yPercent" +
          "," +
          (jn = "rotation,rotationX,rotationY,skewX,skewY") +
          ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
        function (t) {
          Rr[t] = 1;
        }
      )),
      vt(jn, function (t) {
        (S.units[t] = "deg"), (Mn[t] = 1);
      }),
      (Nr[Vn[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + jn),
      vt(
        "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
        function (t) {
          var e = t.split(":");
          Nr[e[1]] = Vn[e[0]];
        }
      ),
      vt(
        "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
        function (t) {
          S.units[t] = "px";
        }
      ),
      Er.registerPlugin(Hn);
    var Gn = Er.registerPlugin(Hn) || Er;
    function Qn(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return $n(t);
        })(t) ||
        (function (t) {
          if (
            ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
            null != t["@@iterator"]
          )
            return Array.from(t);
        })(t) ||
        (function (t, e) {
          if (t) {
            if ("string" == typeof t) return $n(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            return (
              "Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(t)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? $n(t, e)
                : void 0
            );
          }
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function $n(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    Gn.core.Tween, r(520);
    var Zn = function () {
        var e = t.body.classList;
        switch (!0) {
          case e.contains("home"):
            (function () {
              var t,
                e = document.querySelector("body"),
                r =
                  (document.querySelectorAll(".gallery-item"),
                  document.querySelector(".thumbs")),
                i = r.querySelector(".thumbs-center"),
                a = (i.querySelectorAll("a").length, i.querySelectorAll("a"));
              document.querySelector(".thumb0"),
                a.forEach(function (t) {
                  var e = t.cloneNode(!0);
                  r.querySelector(".thumbs-left-1").appendChild(e),
                    (e = t.cloneNode(!0)),
                    r.querySelector(".thumbs-left-2").appendChild(e),
                    (e = t.cloneNode(!0)),
                    r.querySelector(".thumbs-left-3").appendChild(e),
                    (e = t.cloneNode(!0)),
                    r.querySelector(".thumbs-right-1").appendChild(e),
                    (e = t.cloneNode(!0)),
                    r.querySelector(".thumbs-right-2").appendChild(e),
                    (e = t.cloneNode(!0)),
                    r.querySelector(".thumbs-right-3").appendChild(e);
                });
              var o,
                u = r.querySelector(".thumbs-left-1"),
                l = r.querySelector(".thumbs-left-2"),
                c = r.querySelector(".thumbs-left-3"),
                h = [u, l, c],
                f = r.querySelector(".thumbs-right-1"),
                d = r.querySelector(".thumbs-right-2"),
                p = r.querySelector(".thumbs-right-3"),
                m = [f, d, p],
                _ = i.offsetWidth;
              o = window.innerWidth < 1100 ? 50 : 64;
              var v = function () {
                matchMedia("(hover: none)").matches
                  ? e.classList.add("touch")
                  : e.classList.remove("touch");
              };
              v();
              var g,
                y,
                w,
                b = function () {
                  window.innerWidth <= 1e3 && e.classList.contains("touch")
                    ? ((u.style.left = "0px"),
                      (l.style.left = _ + "px"),
                      (c.style.left = 2 * _ + "px"),
                      (i.style.left = 3 * _ + "px"),
                      (f.style.left = 4 * _ + "px"),
                      (d.style.left = 5 * _ + "px"),
                      (p.style.left = 6 * _ + "px"),
                      (r.scrollLeft = 1.5 * _))
                    : (i.style.left = -(_ - window.innerWidth) / 2 + "px");
                },
                x = function () {
                  (i.style.left = null), (i.style.transform = null);
                },
                T = function () {
                  window.innerWidth < 900 && e.classList.contains("touch")
                    ? window.innerWidth < _
                      ? (r.classList.remove("rolling"),
                        r.classList.contains("cycling") || b(),
                        r.classList.add("cycling"))
                      : (r.classList.contains("cycling"),
                        r.classList.remove("cycling"))
                    : window.innerWidth < _
                    ? (r.classList.remove("cycling"),
                      r.classList.contains("rolling") || b(),
                      r.classList.add("rolling"))
                    : (r.classList.contains("rolling") && x(),
                      r.classList.remove("rolling"));
                };
              T();
              var S = function () {
                if (g) {
                  if (
                    g !==
                    document.elementFromPoint(
                      window.innerWidth / 2,
                      window.innerHeight - 25
                    )
                  ) {
                    // Supprimer les classes actives de l'élément précédent
                    g.classList.remove("active");
                    g.closest("div").classList.remove("active");
                    w.classList.remove("show");
                    if (t) {
                      t.pause();
                      t = null;
                    }

                    // Sélectionner le nouvel élément au centre de l'écran
                    g = document.elementFromPoint(
                      window.innerWidth / 2,
                      window.innerHeight - 25
                    );
                    g.classList.add("active");
                    g.closest("div").classList.add("active");
                    y = g.dataset.itemid;
                    w = document.querySelector(
                      '[data-itemID="'.concat(y, '"]')
                    );
                    w.classList.add("show");

                    // // Vérifier si la vidéo existe, et écouter l'événement 'canplaythrough' avant de la lire
                    // var videoElement = w.querySelector("video");
                    //               console.log("testy");
                    // if (videoElement) {
                    //     videoElement.addEventListener('canplaythrough', function() {
                    //         t = videoElement;

                    //         t.play();  // Lire la vidéo une fois prête
                    //     });
                    // }

                    // var videoElement = w.querySelector("video");
                    // // console.log("videoElement:", videoElement);
                    // if (videoElement) {
                    //   console.log("videoElement.readyState:", videoElement.readyState);

                    //   videoElement.addEventListener(
                    //     "canplay",
                    //     function () {
                    //       console.log("canplaythrough événement déclenché");
                    //       console.log("videoElement.src:", videoElement.src);
                    //       console.log("videoElement.paused:", videoElement.paused);
                    //       console.log("videoElement.ended:", videoElement.ended);
                    //       console.log("videoElement.readyState:", videoElement.readyState);
                    
                    //       t = videoElement;
                    //       t.play(); // Lire la vidéo une fois prête
                    //     }
                    //   );
                    // }
                  }
                } else {
                  // Sélectionner l'élément actif au centre de l'écran
                  g = document.elementFromPoint(
                    window.innerWidth / 2,
                    window.innerHeight - 25
                  );
                  g.classList.add("active");
                  g.closest("div").classList.add("active");
                  y = g.dataset.itemid;
                  document.querySelector(".show").classList.remove("show");
                  w = document.querySelector('[data-itemID="'.concat(y, '"]'));
                  w.classList.add("show");
                }
              };

              var L,
              E,
              k,
              M = setInterval(function () {
                  console.log("not ready yet..."), n && (clearInterval(M), console.log("now ready"), e.classList.contains("touch") && S());
              }, 50),
              O = function () {
                  L = (_ - window.innerWidth) / window.innerWidth;
              };
          O(),
              r.addEventListener("mousemove", function (t) {
                  r.classList.contains("rolling") &&
                      (function (t) {
                          (E = { x: t.clientX }), (k = -(E.x * L - (_ - window.innerWidth) / 2)), Gn.to(i, { x: k, ease: "linear" });
                      })(t);
              });
              var A = !0,
                C = !0,
                P = !0,
                D = h,
                q = i,
                R = m;
              r.scrollLeft,
                r.addEventListener("scroll", function (t) {
                  n && e.classList.contains("touch") && S(),
                    r.scrollLeft < 5 * o && P
                      ? ((P = !1),
                        r.prepend.apply(r, m),
                        (r.scrollLeft = r.scrollLeft + _),
                        (R = q = D = R),
                        (C = A = !0))
                      : r.scrollLeft < 5 * o &&
                        C &&
                        (console.log("moving TC"),
                        (C = !1),
                        r.prepend.apply(r, Qn(R)),
                        (r.scrollLeft = r.scrollLeft + _),
                        (D = q),
                        (q = R),
                        (R = D),
                        (P = A = !0)),
                    r.scrollLeft >
                      6 * r.scrollWidth - window.innerWidth - 5 * o &&
                      A &&
                      ((A = !1),
                      D.length > 1 ? r.append.apply(r, Qn(D)) : r.append(D),
                      (r.scrollLeft = r.scrollLeft + _),
                      (D = q),
                      (q = R),
                      (R = D),
                      (P = C = !0)),
                    r.scrollLeft > r.scrollWidth - window.innerWidth - 5 * o &&
                      A &&
                      ((C = !1),
                      D.length > 1 ? r.append.apply(r, Qn(D)) : r.append(D),
                      (r.scrollLeft = r.scrollLeft - _),
                      (D = q),
                      (q = R),
                      (R = D),
                      (P = A = !0));
                }),
                window.addEventListener(
                  "resize",
                  s(function () {
                    r.offsetWidth !== _ && (_ = i.offsetWidth),
                      _ > window.innerWidth ? b() : x(),
                      v(),
                      T(),
                      O();
                  }),
                  200
                );
            })(),
              (!e.contains("touch") || window.innerWidth >= 1100) &&
                (function () {
                  document
                    .querySelector(".gallery")
                    .querySelectorAll(".gallery-item"),
                    document.querySelector("section .thumbs");
                  var t,
                    e = document.querySelectorAll(".thumbs a"),
                    r = 1,
                    n = document.querySelector(".gallery-item.show");
                  n.querySelector("video") &&
                    ((t = n.querySelector("video")), t.play()),
                    e.forEach(function (e) {
                      e.addEventListener("mouseenter", function () {
                        e.classList.add("active"),
                          (r = e.dataset.itemid),
                          n.classList.remove("show"),
                          (n = document.querySelector(
                            '[data-itemID="'.concat(r, '"]')
                          )),
                          t && (t.pause(), (t = null)),
                          n.classList.add("show"),
                          n.querySelector("video") &&
                            (t = n.querySelector("video")).play();
                      }),
                        e.addEventListener("mouseleave", function () {
                          e.classList.remove("active"),
                            (r = e.dataset.itemid),
                            (n = document.querySelector(
                              '[data-itemID="'.concat(r, '"]')
                            ));
                        });
                    });
                })();
            break;
          case e.contains("single-projects"):
            !(function (t) {
              var e,
                r = document.querySelector(".gallery"),
                n = r.querySelectorAll(".gallery-item"),
                i = n.length,
                s = document.querySelectorAll(".gallery-nav-item"),
                a = n[0].dataset.itemid,
                o = r.querySelector(".gallery-item.show"),
                u = r.querySelector(".gallery-right .counter");
              o.querySelector("video") && (e = o.querySelector("video")).play(),
                s.forEach(function (t) {
                  t.addEventListener("click", function () {
                    t.dataset.id !== a &&
                      (document
                        .querySelector(".gallery-nav-item.active")
                        .classList.remove("active"),
                      t.classList.add("active"),
                      (a = t.dataset.id),
                      o.classList.remove("show"),
                      (o = document.querySelector(
                        '[data-itemID="'.concat(a, '"]')
                      )).classList.add("show"),
                      console.log(o));
                  });
                });
              var l = function (t) {
                o.classList.remove("show"),
                  e && (e.pause(), (e = null)),
                  "left" == t
                    ? 1 == a
                      ? ((a = i), (o = n[i - 1]).classList.add("show"))
                      : (a--, (o = n[a - 1]).classList.add("show"))
                    : a == i
                    ? ((a = 1), (o = n[0]).classList.add("show"))
                    : (a++, (o = n[a - 1]).classList.add("show")),
                  document
                    .querySelector(".gallery-nav-item.active")
                    .classList.remove("active"),
                  document
                    .querySelector('[data-ID="'.concat(a, '"]'))
                    .classList.add("active"),
                  o.querySelector("video") &&
                    (e = o.querySelector("video")).play(),
                  (u.innerHTML = a < 10 ? "0" + a : a);
              };
              n.forEach(function (t) {
                [
                  t.querySelector(".gallery-item-left"),
                  t.querySelector(".gallery-item-right"),
                ].forEach(function (t) {
                  t.addEventListener("click", function () {
                    t.classList.contains("gallery-item-left")
                      ? l("left")
                      : l("right");
                  });
                });
              });
            })();
            break;
          default:
            console.log("no router matches");
        }
      },
      Jn = function () {
        var e, r, n;
        ((e = navigator.userAgent || navigator.vendor || window.opera).match(
          /iPad/i
        ) ||
          e.match(/iPhone/i) ||
          e.match(/iPod/i)) &&
          document.querySelector("html").classList.add("ios"),
          -1 != navigator.userAgent.indexOf("Mac OS X") &&
            document.querySelector("html").classList.add("mac"),
          sessionStorage.getItem("instaReloaded") ||
            sessionStorage.setItem("instaReloaded", "false"),
          i(),
          (function () {
            document.querySelector("header");
            var e,
              r,
              n,
              i,
              s = document.querySelector(".header-info"),
              o = document.querySelector(".header-info-overlay-cont"),
              u = document.querySelector(".header-info-back"),
              l = o.querySelectorAll(" a");
            (r = o),
              (n = u),
              (i = l),
              (e = s).addEventListener("click", function (s) {
                s.stopPropagation(),
                  e.classList.toggle("is-active"),
                  r.classList.contains("show")
                    ? a(r)
                    : (function (e, r) {
                        switch (
                          (t.body.classList.add(
                            "events-none",
                            "overflowY-hidden"
                          ),
                          e.querySelectorAll(" li > a").forEach(function (t) {
                            t.classList.add("events-auto", "internal");
                          }),
                          !0)
                        ) {
                          case e.classList.contains("overlay-bottom") ||
                            e.classList.contains("overlay-top"):
                            e.classList.add("transform-y0"),
                              setTimeout(function () {
                                document.querySelector(
                                  ".overlay-bottom"
                                ).style.bottom = "1px";
                              }, 500);
                            break;
                          case e.classList.contains("overlay-left") ||
                            e.classList.contains("overlay-right"):
                            e.classList.add("transform-x0");
                            break;
                          case e.classList.contains("overlay-fadein"):
                            e.classList.add("show");
                        }
                      })(r),
                  n &&
                    n.addEventListener(
                      "click",
                      function (t) {
                        t.stopPropagation(),
                          console.log("close btn clicked"),
                          e.classList.remove("is-active"),
                          a(r);
                      },
                      { once: !0 }
                    ),
                  i &&
                    i.forEach(function (t) {
                      t.addEventListener("click", function (t) {
                        a(r);
                      });
                    }),
                  document.addEventListener("keyup", function (t) {
                    "Escape" === t.key &&
                      (e.classList.remove("is-active"), a(r));
                  }),
                  document
                    .getElementById("page")
                    .addEventListener("click", function (t) {
                      t.target.closest("nav") ||
                        (e.classList.remove("is-active"), a(r));
                    });
              });
          })(),
          (function () {
            var e = document.createElement("div");
            (e.className = "scrollbar-measure"), t.body.appendChild(e);
            var r = e.offsetWidth - e.clientWidth;
            t.body.removeChild(e),
              document.documentElement.style.setProperty(
                "--scrollbar-width",
                "".concat(r, "px")
              );
          })(),
          (n = function () {
            (r = window.innerHeight),
              document.documentElement.style.setProperty(
                "--vh100",
                "".concat(r, "px")
              );
          })(),
          document.documentElement.style.setProperty(
            "--vh100-once",
            "".concat(r, "px")
          ),
          window.addEventListener(
            "resize",
            s(function () {
              n();
            }, 20)
          ),
          Zn();
      };
    document.addEventListener("DOMContentLoaded", function () {
      Jn();
    });
  })();
})();
