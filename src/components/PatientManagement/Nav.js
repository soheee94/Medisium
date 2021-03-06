import React, { useState } from "react";
import styled, { css } from "styled-components";
import logo from "../../assets/logo.png";
import IconButton from "../common/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const NavBlock = styled.nav`
  ${({ theme }) => `height: 60px;
  background-color: ${theme.palette.white};
  color: ${theme.palette.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  // logo
  img {
    height: 25px;
  }`}
`;

const NavRightMenu = styled.div`
  display: flex;
  align-items: center;
`;

const DropDown = styled.div`
  position: relative;
  width: auto;
  min-width: 130px;
  /* isOpen */
  ${props =>
    props.open &&
    css`
      ${DropDownItems} {
        visibility: visible;
        height: 100px;
        transition: all 0.7s ease;
      }
      ${HospitalName}:after {
        margin-top: 5px;
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
      }
    `}
`;

const HospitalName = styled.div`
  color: ${props => props.theme.palette.black};
  font-family: "Noto Sans KR Bold";
  font-weight: bold;
  padding: 10px 16px;
  cursor: pointer;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:after {
    content: "";
    transition: all 0.3s;
    border: solid ${props => props.theme.palette.black};
    border-width: 0 1px 1px 0;
    float: right;
    margin-left: 15px;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
`;

const DropDownItems = styled.div`
  width: 100%;
  position: absolute;
  visibility: hidden;
  border: 1px solid ${props => props.theme.palette.gray};
  border-top: none;
  height: 0px;
  overflow: hidden;
  transition: all 0.7s ease;
  /* item */
  div {
    position: relative;
    background: ${props => props.theme.palette.white};
    border-top: 1px solid ${props => props.theme.palette.gray};
    cursor: pointer;
    padding: 15px 18px;
    height: 50px;
    &:hover {
      background: ${props => props.theme.palette.gray};
    }
  }
`;

function Nav({ onTutorialOpen }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  return (
    <NavBlock>
      <img src="" alt="LOGO" />
      <NavRightMenu>
        <DropDown open={isDropdownOpen}>
          <HospitalName onClick={() => setDropdownOpen(!isDropdownOpen)}>[ 병원이름 ]</HospitalName>
          <DropDownItems>
            <div>병원정보</div>
            <div>로그아웃</div>
          </DropDownItems>
        </DropDown>
        <IconButton label="tutorial" onClick={onTutorialOpen}>
          <HelpOutlineIcon />
        </IconButton>
      </NavRightMenu>
    </NavBlock>
  );
}

export default React.memo(Nav);
