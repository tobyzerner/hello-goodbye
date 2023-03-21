function L(t, r, o = {}) {
  const n = /* @__PURE__ */ new WeakMap(), i = m(o);
  t instanceof HTMLCollection && (t = Array.from(t)), t.forEach((e) => {
    getComputedStyle(e).display !== "none" && n.set(e, e.getBoundingClientRect());
  }), r(), t.forEach((e) => {
    const s = n.get(e);
    if (!s)
      return;
    const c = s.left - e.getBoundingClientRect().left, u = s.top - e.getBoundingClientRect().top;
    if (!c && !u)
      return;
    const a = e.style;
    a.transitionDuration = "0s", a.transform = `translate(${c}px, ${u}px)`, requestAnimationFrame(async () => {
      e.classList.add(i + "move"), a.transitionDuration = a.transform = "", await d(e), e.classList.remove(i + "move");
    });
  });
}
function v(t) {
  t._currentTransition && (t.classList.remove(
    ...["active", "from", "to"].map(
      (r) => t._currentTransition + r
    )
  ), t._currentTransition = null);
}
async function f(t, r, o = {}) {
  const n = m(o) + r + "-", i = t.classList;
  v(t), t._currentTransition = n, i.add(n + "active", n + "from"), g(), i.add(n + "to"), i.remove(n + "from"), await d(t), i.remove(n + "to", n + "active"), t._currentTransition === n && (t._currentTransition = null);
}
function x(t, r = {}) {
  return f(t, "enter", r);
}
function E(t, r = {}) {
  return f(t, "leave", r);
}
function y() {
  return new Promise(
    (t) => requestAnimationFrame(() => requestAnimationFrame(() => t()))
  );
}
async function d(t) {
  if (getComputedStyle(t).transitionDuration.startsWith("0s"))
    return;
  let r = !1;
  const o = () => r = !0;
  if (t.addEventListener("transitionstart", o), await y(), t.removeEventListener("transitionstart", o), !!r)
    return new Promise((n) => {
      const i = () => {
        n(), t.removeEventListener("transitionend", i), t.removeEventListener("transitioncancel", i);
      };
      t.addEventListener("transitionend", i), t.addEventListener("transitioncancel", i);
    });
}
function m(t) {
  return t != null && t.prefix ? t.prefix + "-" : "";
}
function g() {
  document.body.offsetWidth;
}
export {
  v as cancel,
  E as goodbye,
  x as hello,
  L as move,
  f as transition
};
