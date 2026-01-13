interface GridProps {
  isFiltered: boolean;
}

const Grid = ({ isFiltered }: GridProps) => {
  return (
    <section>
      <p>{isFiltered ? "구독한 언론사 그리드" : "전체 언론사 그리드"}</p>
    </section>
  );
};

export default Grid;
