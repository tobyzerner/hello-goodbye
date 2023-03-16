function v() {
  document.body.offsetWidth;
}
function x(t, n, e = {}) {
  const i = /* @__PURE__ */ new WeakMap(), o = m(e);
  t instanceof HTMLCollection && (t = Array.from(t)), t.forEach((r) => {
    getComputedStyle(r).display !== "none" && i.set(r, r.getBoundingClientRect());
  }), n(), t.forEach((r) => {
    const c = i.get(r);
    if (!c)
      return;
    const s = c.left - r.getBoundingClientRect().left, f = c.top - r.getBoundingClientRect().top;
    if (!s && !f)
      return;
    const a = r.style;
    a.transitionDuration = "0s", a.transform = `translate(${s}px, ${f}px)`, requestAnimationFrame(() => {
      r.classList.add(o + "move"), a.transitionDuration = a.transform = "", d(r, () => {
        r.classList.remove(o + "move");
      });
    });
  });
}
function g(t) {
  t._currentTransition && (t.classList.remove(
    ...["active", "from", "to"].map(
      (n) => t._currentTransition + n
    )
  ), t._currentTransition = null);
}
function u(t, n, e = {}) {
  const i = m(e) + n + "-", o = t.classList;
  g(t), t._currentTransition = i, o.add(i + "active", i + "from"), v(), o.add(i + "to"), o.remove(i + "from"), d(t, () => {
    o.remove(i + "to", i + "active"), t._currentTransition === i && (e.finish && e.finish(), t._currentTransition = null);
  });
}
function y(t, n = {}) {
  u(t, "enter", n);
}
function L(t, n = {}) {
  u(t, "leave", n);
}
function d(t, n) {
  if (getComputedStyle(t).transitionDuration.startsWith("0s"))
    n();
  else {
    const e = () => {
      n(), t.removeEventListener("transitionend", e), t.removeEventListener("transitioncancel", e);
    };
    t.addEventListener("transitionend", e), t.addEventListener("transitioncancel", e);
  }
}
function m(t) {
  return t != null && t.prefix ? t.prefix + "-" : "";
}
export {
  g as cancel,
  L as goodbye,
  y as hello,
  x as move,
  u as transition
};
