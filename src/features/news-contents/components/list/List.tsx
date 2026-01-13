interface ListProps {
  isFiltered: boolean;
}

const List = ({ isFiltered }: ListProps) => {
  return (
    <section>
      <p>{isFiltered ? "구독한 언론사 리스트" : "전체 언론사 리스트"}</p>
    </section>
  );
};

export default List;
