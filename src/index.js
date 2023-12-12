import handleSound from "./music.js";
import { updateCountdown } from "./countdown.js";

handleSound();
updateCountdown();

// 1초마다 업데이트
setInterval(updateCountdown, 1000);
