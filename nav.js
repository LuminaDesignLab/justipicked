// nav.js  (외부 스크립트 파일: <script> 태그 넣지 마세요!)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav_bar_container").forEach((nav, idx) => {
    const menu = nav.querySelector(".nav_menu");
    if (!menu) return;

    // 이미 버튼 있으면 중복 생성 방지
    if (nav.querySelector(".hamburger")) return;

    // 메뉴 id 보장(페이지마다 유니크)
    if (!menu.id) menu.id = `primary-menu-${idx}`;

    // 햄버거 버튼 생성
    const btn = document.createElement("button");
    btn.className = "hamburger";
    btn.setAttribute("aria-label", "Toggle menu");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", menu.id);
    btn.innerHTML = "<span></span><span></span><span></span>";

    // 로고 다음 위치에 삽입(없으면 메뉴 앞)
    const logoBlock =
      nav.querySelector(".nav_bar_logo")?.closest("div") ||
      nav.firstElementChild;
    if (logoBlock && logoBlock.nextElementSibling) {
      nav.insertBefore(btn, logoBlock.nextElementSibling);
    } else {
      nav.insertBefore(btn, menu);
    }

    // 메뉴 토글
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.classList.toggle("is-active");
      menu.classList.toggle("is-open");
    });

    // (선택) 드롭다운을 탭으로 열고 닫기
    nav.querySelectorAll(".dropdown > span").forEach((label) => {
      label.setAttribute("tabindex", "0"); // 키보드 포커스 가능
      const content = label.parentElement.querySelector(".dropdown_content");
      if (!content) return;

      const toggle = (e) => {
        e.preventDefault();
        const shown = content.style.display === "block";
        content.style.display = shown ? "none" : "block";
      };

      label.addEventListener("click", toggle);
      label.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") toggle(e);
      });
    });
  });
});
