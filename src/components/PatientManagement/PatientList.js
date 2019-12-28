import React, { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

const SearchInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
})(Button);

function PatientList() {
  const [isSortDown, setSortDown] = useState(false);
  return (
    <>
      <div className="list-header">
        <SearchInput type="text" placeholder="검색" id="list-header__search" />
        <BootstrapButton variant="contained" disableRipple>
          환자 추가
        </BootstrapButton>
      </div>
      <div className="list-content-wrapper">
        <div className="list-content">
          <div className="list-content__header">
            <div
              className="list-content__header__cell"
              onClick={() => setSortDown(!isSortDown)}
            >
              최근 측정 일자 {isSortDown ? <FaSortDown /> : <FaSortUp />}
            </div>
            <div className="list-content__header__cell">등록 일자</div>
            <div className="list-content__header__cell">이름</div>
            <div className="list-content__header__cell">환자 번호</div>
            <div className="list-content__header__cell">버튼</div>
          </div>
          <div className="list-content__item">
            <div className="list-content__item__cell">대기 번호</div>
            <div className="list-content__item__cell">이름</div>
            <div className="list-content__item__cell">환자 번호</div>
            <div className="list-content__item__cell">버튼</div>
            <div className="list-content__item__cell">버튼</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientList;
