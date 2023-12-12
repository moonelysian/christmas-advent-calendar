import { handleModal, modalMessageList } from "./modal.js";

const targetDate = new Date("2023-12-25T00:00:00Z");

export function updateCountdown() {
  // 현재 한국 시간을 얻어오기
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  // 남은 시간 계산
  const timeRemaining = targetDate - now;

  // 시간, 분, 초 계산
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // 결과를 HTML에 업데이트
  const countdownElement = document.getElementById("countdown");
  countdownElement.style.color = "#FF9EA9";
  countdownElement.innerHTML = `
      <span>D-${days} ${hours}시간${minutes}분${seconds}초</span>`;
}

// 날짜 기준 카드 오픈 기능
const doors = document.querySelectorAll(".door");

doors.forEach((door, index) => {
  const checkbox = door.parentElement.getElementsByTagName("input").item(0);

  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const openDate = new Date(2023, 11, index + 1);

  if (now.getDate() > openDate.getDate()) {
    checkbox.checked = true;
    checkbox.disabled = true;
  }

  door.addEventListener("click", () => {
    if (checkbox.checked && !checkbox.disabled) return;
    if (now.getTime() > openDate.getTime()) {
      const imageUrl = `image/card/card-${index + 1}.png`;
      const text = modalMessageList[index]["message"];
      return handleModal(imageUrl, text);
    }
    const daysRemaining = Math.ceil((openDate - now) / (1000 * 60 * 60 * 24));
    checkbox.disabled = true;
    const imageUrl = `image/frame/frame${index + 1}.png`;
    const text = `이 카드는 ${daysRemaining}일 후에 열 수 있어요!`;
    return handleModal(imageUrl, text);
  });
});
