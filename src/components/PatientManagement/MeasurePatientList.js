import React from "react";
import IconButton from "../IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ListTitle from "./ListTitle";
import ListContent from "./ListContent";
import ListItem from "./ListItem";
import ListItemCell from "./ListItemCell";

function MeasurePatientList() {
  return (
    <>
      {/* 타이틀 */}
      <ListTitle>
        <span>현재 측정 환자</span>
      </ListTitle>
      {/* 컨텐츠 리스트 */}
      <ListContent>
        <ListItem>
          <ListItemCell>대기 번호</ListItemCell>
          <ListItemCell>이름</ListItemCell>
          <ListItemCell>환자 번호</ListItemCell>
          <ListItemCell>
            <IconButton label="close" onClick={() => console.log("close")}>
              <CloseIcon />
            </IconButton>
          </ListItemCell>
        </ListItem>
      </ListContent>
    </>
  );
}

export default MeasurePatientList;