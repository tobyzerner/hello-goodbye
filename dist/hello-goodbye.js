function y(t, i, a = {}) {
  const n = /* @__PURE__ */ new WeakMap(), e = v(a);
  t instanceof HTMLCollection && (t = Array.from(t)), t.forEach((r) => {
    getComputedStyle(r).display !== "none" && n.set(r, r.getBoundingClientRect());
  }), i(), t.forEach((r) => {
    const s = n.get(r);
    if (!s)
      return;
    const c = s.left - r.getBoundingClientRect().left, u = s.top - r.getBoundingClientRect().top;
    if (!c && !u)
      return;
    const o = r.style;
    o.transitionDuration = "0s", o.transform = `translate(${c}px, ${u}px)`, requestAnimationFrame(async () => {
      r.classList.add(e + "move"), o.transitionDuration = o.transform = "", await m(r), r.classList.remove(e + "move");
    });
  });
}
function g(t) {
  t._currentTransition && (t.classList.remove(
    ...["active", "from", "to"].map(
      (i) => t._currentTransition + i
    )
  ), t._currentTransition = null);
}
async function f(t, i, a = {}) {
  const n = v(a) + i + "-", e = t.classList;
  g(t), t._currentTransition = n, e.add(n + "active", n + "from"), await d(), e.add(n + "to"), e.remove(n + "from"), await m(t), e.remove(n + "to", n + "active"), t._currentTransition === n && (t._currentTransition = null);
}
function L(t, i = {}) {
  return f(t, "enter", i);
}
function x(t, i = {}) {
  return f(t, "leave", i);
}
function d() {
  return new Promise(
    (t) => requestAnimationFrame(() => requestAnimationFrame(() => t()))
  );
}
async function m(t) {
  if (getComputedStyle(t).transitionDuration.startsWith("0s"))
    return;
  let i = !1;
  const a = (n) => i || (i = n.target === t);
  if (t.addEventListener("transitionstart", a), await d(), t.removeEventListener("transitionstart", a), !!i)
    return new Promise((n) => {
      const e = (r) => {
        r.target === t && (n(), t.removeEventListener("transitionend", e), t.removeEventListener("transitioncancel", e));
      };
      t.addEventListener("transitionend", e), t.addEventListener("transitioncancel", e);
    });
}
function v(t) {
  return t != null && t.prefix ? t.prefix + "-" : "";
}
export {
  g as cancel,
  x as goodbye,
  L as hello,
  y as move,
  f as transition
};
