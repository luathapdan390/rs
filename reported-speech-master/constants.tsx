
import { Principle, RulePair, VerbGroup } from './types';

export const PRINCIPLES: Principle[] = [
  { title: "1. ĐỔI NGÔI", description: "Thay đổi đại từ nhân xưng cho phù hợp ngữ cảnh.", example: "I → He/She, We → They" },
  { title: "2. LÙI THÌ", description: "Lùi một bậc về quá khứ khi động từ dẫn ở quá khứ.", example: "Hiện tại → Quá khứ" },
  { title: "3. ĐỔI TRẠNG TỪ", description: "Thay đổi trạng từ chỉ thời gian và nơi chốn.", example: "Now → Then, Here → There" }
];

export const TENSE_RULES: RulePair[] = [
  { from: "Hiện tại đơn (V/Vs/es)", to: "Quá khứ đơn (V2/ed)" },
  { from: "Hiện tại tiếp diễn (am/is/are + Ving)", to: "Quá khứ tiếp diễn (was/were + Ving)" },
  { from: "Hiện tại hoàn thành (have/has + V3/ed)", to: "Quá khứ hoàn thành (had + V3/ed)" },
  { from: "Quá khứ đơn (V2/ed)", to: "Quá khứ hoàn thành (had + V3/ed)" },
  { from: "Will / Can / May / Must", to: "Would / Could / Might / Had to" }
];

export const ADVERB_RULES: RulePair[] = [
  { from: "Today / Tonight", to: "That day / That night" },
  { from: "Now / Here", to: "Then / There" },
  { from: "Yesterday", to: "The day before / The previous day" },
  { from: "Tomorrow", to: "The next day / The following day" },
  { from: "Ago / This / These", to: "Before / That / Those" }
];

export const TO_V_VERBS: string[] = [
  "Ask / Tell / Order: Yêu cầu",
  "Advise: Khuyên",
  "Promise: Hứa",
  "Threaten: Đe dọa",
  "Warn + sb + not to V: Cảnh báo",
  "Invite: Mời",
  "Remind: Nhắc nhở",
  "Encourage: Khuyến khích"
];

export const VING_VERBS: string[] = [
  "Admit / Deny / Suggest + Ving",
  "Apologize for + Ving: Xin lỗi",
  "Accuse sb of + Ving: Buộc tội",
  "Blame sb for + Ving: Đổ lỗi",
  "Thank sb for + Ving: Cảm ơn",
  "Congratulate sb on + Ving",
  "Insist on + Ving: Khăng khăng",
  "Warn sb against + Ving: Cảnh báo"
];

export const EXCEPTIONS: string[] = [
  "Động từ tường thuật ở hiện tại/tương lai (say/will say)",
  "Sự thật hiển nhiên, chân lý vĩnh cửu.",
  "Câu điều kiện Loại 2, Loại 3.",
  "Cấu trúc giả định: Wish, If only.",
  "Cấu trúc với: would, could, should, used to, ought to."
];
