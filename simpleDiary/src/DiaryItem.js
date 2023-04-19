const DiaryItem = ({ diaryList }) => {
  return (
    <div className="DairyItem">
      {diaryList.map((obj) => (
        <div key={obj.id}>
          <div>작성자 : {obj.author}</div>
          <div>내용 : {obj.content}</div>
          <div>감정점수 : {obj.emotion}</div>
          <div>작성시간(ms) : {obj.created_date}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryItem;
