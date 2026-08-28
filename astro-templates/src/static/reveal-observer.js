// 0 dependency, ~15 dòng — thay cho framer-motion chỉ để phát hiện viewport.
document.documentElement.classList.remove("no-js");

const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.25 }
);

document.querySelectorAll(".cb-reveal").forEach((el) => io.observe(el));
