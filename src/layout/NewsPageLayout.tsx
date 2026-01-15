import Header from "@/layout/Header";

const NewsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center pt-20">
      <div className="flex flex-col w-[930px]">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default NewsPageLayout;
