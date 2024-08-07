import React, { useEffect, useState } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";
import { movieApi } from "../../apis/movie.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Button } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Tab ,Tabs  } from "@mui/material";
interface PhimDetailParams {
  maPhim: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const MovieDetail: React.FC = () => {
  const params = useParams();

  const [detailId, setDetailId] = useState({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchMovieDetail = async () => {
    const result = await movieApi.getMovieDetail(params.movieId);

    setDetailId(result);
  };

  useEffect(() => {
    fetchMovieDetail();
  },[params.movieId]);
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${detailId.hinhAnh})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "auto", // Đảm bảo phần tử có kích thước để hiển thị hình ảnh nền
    width: "100%", // Đảm bảo phần tử có kích thước rộng đủ
  };
  const numStars = Math.floor(detailId.danhGia/2);
  const starsElement = document.getElementById("stars");
  let span ='';
  for (var i = 0; i < numStars; i++) {
    span += '<span>★</span>';
  }
  if (starsElement) {
    starsElement.innerHTML = span;
  } else {
      console.error("Phần tử với id 'stars' không tồn tại.");
  }
  
  return (
    <div className="h-[100vh]" style={{backgroundColor:'rgb(10, 32, 41)'}}>
      <div className="relative w-[100%] h-[41vw]">
        <div className="movieDetail__detailbackground-setup">
          <div className="jss778 " style={backgroundStyle}></div>
          <div className="top-0 left-0 right-0 bottom-0 ">
            <div className="movieDetail__detail-add">
              <div className="movieDetail__detail-img ">
                <img src={detailId.hinhAnh} alt="" />
              </div>
              <div className="movieDetail__detail-content">
                <p>{dayjs(detailId.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
                <p>
                  <span className="movieDetail__detail-span font-semibold">C18</span>
                  {detailId.tenPhim}
                </p>
                <p className="movieDetail__detail-descript">{detailId.moTa}</p>
                <Button className="movieDetail__detail-btnInfo uppercase font-semibold">Mua vé</Button>
              </div>
              <div className="movieDetail__detail-rate">
                <div className="movieDetail__detail-ratetitle">
                  <span>{detailId.danhGia}</span>
                  <div
                    className="MuiCircularProgress-root jss67 MuiCircularProgress-colorSecondary MuiCircularProgress-determinate"
                    role="progressbar"
                    aria-valuenow={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: "rotate(-90deg)",
                    }}
                  >
                    <svg
                      className="MuiCircularProgress-svg"
                      viewBox="22 22 44 44"
                    >
                      <circle
                        className="MuiCircularProgress-circle MuiCircularProgress-circleDeterminate"
                        cx={44}
                        cy={44}
                        r="20.2"
                        fill="none"
                        strokeWidth="3.6"
                        style={{
                          strokeDasharray: "126.92",
                          strokeDashoffset: 0,
                        }}
                      />
                    </svg>
                  </div>
                  <div
                    className="MuiCircularProgress-root jss66 MuiCircularProgress-colorSecondary MuiCircularProgress-determinate"
                    role="progressbar"
                    aria-valuenow={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: "rotate(-90deg)",
                    }}
                  >
                    <svg
                      className="MuiCircularProgress-svg"
                      viewBox="22 22 44 44"
                    >
                      <circle
                        className="MuiCircularProgress-circle MuiCircularProgress-circleDeterminate"
                        cx={44}
                        cy={44}
                        r="20.2"
                        fill="none"
                        strokeWidth="3.6"
                        style={{
                          strokeDasharray: "126.92",
                          strokeDashoffset: 0,
                        }}
                      />
                    </svg>
                  </div>
                </div>
                <span
                
                  className="MuiRating-root MuiRating-readOnly"
                  role="img"
                  aria-label="5 Stars"
                >
                  <span   className="MuiRating-decimal">
                    <span
                      style={{
                        width: "0%",
                        overflow: "hidden",
                        zIndex: 1,
                        position: "absolute",
                      }}
                    >
                      <span className="MuiRating-icon MuiRating-iconFilled">
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </span>
                    </span>
                    <span>
                      <span id="stars" className="MuiRating-icon MuiRating-iconFilled">
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="movieDetail__container-tab my-4">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default MovieDetail;
