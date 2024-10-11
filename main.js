// Animation Cards
let animation = document.querySelectorAll(".animation");

function showScroll() {
  let scrollTop = document.documentElement.scrollTop;
  for (let i = 0; i < animation.length; i++) {
    let heightAnimation = animation[i].offsetHeight;
    if (heightAnimation - 450 < scrollTop) {
      animation[i].style.opacity = 1;
      animation[i].classList.add("showUp");
    }
  }
}

window.addEventListener("scroll", showScroll);

// Animation Timeline
function qs(selector, all = false) {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}

const sections = qs(".time-line-description", true);
const timeline = qs(".timeline");
const line = qs(".line");
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e) {
  const { scrollY } = window;
  const up = scrollY < prevScrollY;
  const down = !up;

  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect();

  const dist = targetY - timelineRect.top;

  // 스크롤이 아래로 내려가고 full이 false일 때만 실행
  if (down && !full) {
    set = Math.max(set, dist);
    line.style.bottom = `calc(100% - ${set}px)`;
  }

  // 타임라인 끝에 도달했을 때 처리
  if (dist > timeline.offsetHeight + 50 && !full) {
    full = true;
    line.style.bottom = `-50px`;
  }

  // 각 섹션의 위치에 따라 'show-me' 클래스 추가
  sections.forEach((item) => {
    const rect = item.getBoundingClientRect();

    if (rect.top + item.offsetHeight / 5 < targetY) {
      item.classList.add("show-me");
    }
  });

  // 스크롤 위치 업데이트
  prevScrollY = window.scrollY;
}

// 초기화
line.style.display = "block";
window.addEventListener("scroll", scrollHandler);
