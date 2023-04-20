import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h4>{diaryList.length}개의 글이 있습니다.</h4>
      <div>
        {diaryList.map((obj) => (
          <DiaryItem key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
};
DiaryList.defaultProps = { diaryList: [] };
export default DiaryList;
