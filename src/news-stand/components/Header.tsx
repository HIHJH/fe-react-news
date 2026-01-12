import { formatDateWithDay } from "@/news-stand/utils/formatDate";
import logo from "@/assets/icons/logo.svg";

const Header = () => {
  const today = new Date();
  const formattedToday = formatDateWithDay(today);

  return (
    <section className="flex items-center justify-between">
      <div className="flex gap-2">
        <img src={logo} alt="뉴스스탠드 로고" />
        <h1 className="typo-display-bold-24 text-strong">뉴스스탠드</h1>
      </div>
      <p className="typo-display-medium-16 text-default">{formattedToday}</p>
    </section>
  );
};

export default Header;
