function toggleLang(el) {
  doc.query(".l1").forEach((e) => {
    e.style.display = el.checked ? "none" : "block";
  });
  doc.query(".l2").forEach((e) => {
    e.style.display = !el.checked ? "none" : "block";
  });
}