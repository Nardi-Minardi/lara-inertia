export default function scrollToPage(id) {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}