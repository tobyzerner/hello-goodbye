function y(t, r, a = {}) {
  const n = /* @__PURE__ */ new WeakMap(), i = v(a);
  t instanceof HTMLCollection && (t = Array.from(t)), t.forEach((e) => {
    getComputedStyle(e).display !== "none" && n.set(e, e.getBoundingClientRect());
  }), r(), t.forEach((e) => {
    const s = n.get(e);
    if (!s)
      return;
    const c = s.left - e.getBoundingClientRect().left, u = s.top - e.getBoundingClientRect().top;
    if (!c && !u)
      return;
    const o = e.style;
    o.transitionDuration = "0s", o.transform = `translate(${c}px, ${u}px)`, requestAnimationFrame(async () => {
      e.classList.add(i + "move"), o.transitionDuration = o.transform = "", await m(e), e.classList.remove(i + "move");
    });
  });
}
function g(t) {
  t._currentTransition && (t.classList.remove(
    ...["active", "from", "to"].map(
      (r) => t._currentTransition + r
    )
  ), t._currentTransition = null);
}
async function f(t, r, a = {}) {
  const n = v(a) + r + "-", i = t.classList;
  g(t), t._currentTransition = n, i.add(n + "active", n + "from"), await d(), i.add(n + "to"), i.remove(n + "from"), await m(t), i.remove(n + "to", n + "active"), t._currentTransition === n && (t._currentTransition = null);
}
function L(t, r = {}) {
  return f(t, "enter", r);
}
function x(t, r = {}) {
  return f(t, "leave", r);
}
function d() {
  return new Promise(
    (t) => requestAnimationFrame(() => requestAnimationFrame(() => t()))
  );
}
async function m(t) {
  if (getComputedStyle(t).transitionDuration.startsWith("0s"))
    return;
  let r = !1;
  const a = () => r = !0;
  if (t.addEventListener("transitionstart", a), await d(), t.removeEventListener("transitionstart", a), !!r)
    return new Promise((n) => {
      const i = () => {
        n(), t.removeEventListener("transitionend", i), t.removeEventListener("transitioncancel", i);
      };
      t.addEventListener("transitionend", i), t.addEventListener("transitioncancel", i);
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
