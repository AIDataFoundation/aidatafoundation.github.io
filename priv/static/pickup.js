const msg = document.querySelector("#pick-up");
const msgPhone = document.querySelector("#pick-up-phone");

if (msg && msgPhone) {
  const btn = msg.querySelector("a");
  const btnPhone = msgPhone.querySelector("a");
  const closeBtn = msg.querySelector("button");
  const closePhone = msgPhone.querySelector("button");
  const overlay = document.querySelector("#pick-up-overlay");

  let pickupFrom = null;
  try {
    pickupFrom = JSON.parse(localStorage.getItem("pick-up"));
  } catch {}

  const urlParams = new URLSearchParams(window.location.search);
  let isOn = false;

  function close() {
    isOn = false;
    msg.classList.add("hidden");
    if (msgPhone) msgPhone.classList.remove("is-visible");
    if (overlay) overlay.classList.remove("is-on");
    disableScroll();
  }

  function disableScroll() {
    document.body.style["overflow-y"] = window.innerWidth < 768 && isOn ? "hidden" : "auto";
  }

  if (closeBtn) closeBtn.onclick = close;
  if (closePhone) closePhone.onclick = close;
  if (overlay) overlay.onclick = close;

  function updateMessage() {
    if (pickupFrom && !window.location.pathname.includes("/labs") && !window.location.pathname.includes("/blog")) {
      isOn = true;
      msg.classList.remove("hidden");
      if (btn) btn.href = pickupFrom.from + "?pickup=true";
      if (btnPhone) btnPhone.href = pickupFrom.from + "?pickup=true";
      if (overlay) overlay.classList.add("is-on");
      if (msgPhone) msgPhone.classList.add("is-visible");
      disableScroll();
    } else if (pickupFrom && window.location.pathname === pickupFrom.from && urlParams.get("pickup") === "true") {
      window.scrollTo(0, pickupFrom.scroll);
    } else if (window.location.pathname.includes("/labs/") || window.location.pathname.includes("/blog/")) {
      localStorage.setItem("pick-up", JSON.stringify({ from: window.location.pathname, scroll: window.scrollY }));
    }
  }

  window.addEventListener("load", updateMessage);

  if (window.location.pathname.includes("/labs/") || window.location.pathname.includes("/blog/")) {
    window.addEventListener("scroll", () => {
      localStorage.setItem("pick-up", JSON.stringify({ from: window.location.pathname, scroll: window.scrollY }));
    });
  }

  window.addEventListener("resize", disableScroll);
}
