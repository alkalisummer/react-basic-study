import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>List</h2>
      <h4>{diaryList.length}개의 글이 있습니다.</h4>
      <div>
        <DiaryItem diaryList={diaryList} />
      </div>
    </div>
  );
};
DiaryList.defaultProps = { diaryList: [] };
export default DiaryList;
