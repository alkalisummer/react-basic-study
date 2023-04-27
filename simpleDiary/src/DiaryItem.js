import React, { useState, useRef, useContext, useEffect } from "react";
import { DiaryDispatchContext } from "./App";
const DiaryItem = ({ author, content, created_date, emotion, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleRemove = () => {
    if (window.confirm(`${id}번째 글을 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 글을 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      setIsEdit(!isEdit);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>취소</button>
          <button onClick={handleEdit}>저장</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제</button>
          <button onClick={toggleIsEdit}>수정</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
