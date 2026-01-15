import logo from "@/assets/icons/logo.svg";
import { useState } from "react";

const getKoreaDate = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const koreaTime = new Date(utc + 9 * 3600000);
  return koreaTime;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const weekdays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const weekday = weekdays[date.getDay()];

  return `${year}. ${month}. ${day}. ${weekday}`;
};

const Header = () => {
  const [date] = useState<Date | null>(() => getKoreaDate());

  const formattedDate = date ? formatDate(date) : "";
  const dateTimeString = date ? date.toISOString().split("T")[0] : "";

  return (
    <header className="flex items-center justify-between mb-10">
      <h2 className="m-0 flex items-center gap-2">
        <img
          src={logo}
          alt="뉴스스탠드"
          className="block w-6 h-6 object-contain"
        />
        <span className="text-2xl font-bold text-gray-900">뉴스스탠드</span>
      </h2>
      <time className="text-base text-gray-500" dateTime={dateTimeString}>
        {formattedDate}
      </time>
    </header>
  );
};

export default Header;
