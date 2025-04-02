import { React, useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  TextField,
  styled,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Profile from "./../assets/profile.png";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import travelImg from "./../assets/travel.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import place from "./../assets/place.png";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const EditMyTravel = () => {
  const navigator = useNavigate();

  const handleUpdateTravelClick = async (e) => {
    e.preventDefault();

    if (travelPlace.trim().length == 0) {
      alert("กรุณาป้อนสถานที่เดินทาง");
      return;
    } else if (travelStartDate.trim().length == 0) {
      alert("กรุณาป้อนวันที่เดินทางไป");
      return;
    } else if (travelEndDate.trim().length == 0) {
      alert("กรุณาป้อนวันที่เดินทางกลับ");
      return;
    } else if (travelCostTotal.length == 0) {
      alert("กรุณาป้อนค่าใช้จ่ายในการเดินทาง");
      return;
    } else {
      const formData = new FormData();
      formData.append("travellerId", travellerId);
      formData.append("travelPlace", travelPlace);
      formData.append("travelStartDate", travelStartDate);
      formData.append("travelEndDate", travelEndDate);
      formData.append("travelCostTotal", travelCostTotal);
      if (travelNewImage) {
        formData.append("travelImage", travelNewImage);
      }

      try {
        const response = await axios.put(
          `${API_URL}/travel/${travelId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status == 200) {
          alert("บันทึกการแก้ไขการเดินทางสําเร็จ");
          navigator("/mytravel");
        } else {
          alert(
            "บันทึกการแก้ไขการเดินทางไม่สําเร็จ กรุณาลองใหม่อีกครั้ง error: " +
              response.status
          );
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาด: " + error);
      }
    }
  };

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravelNewImage(file);
    }
  };

  const SelectFileBt = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  
  const { travelId } = useParams();
  const [travellerId, setTravellerId] = useState("");
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");
  const [travelImage, setTravelImage] = useState(null);
  const [travelNewImage, setTravelNewImage] = useState(null);
  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");

  useEffect(() => {
    //เอาข้อมูลใน Memory มาแสดงที่ Appbar
    //อ่านข้อมูล Traveller จาก Memory
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    //เอาข้อมูลในตัวแปรกำหนดให้กับ state ที่สร้างไว้
    setTravellerId(traveller.travellerId);
    setTravellerFullname(traveller.travellerFullname);
    setTravellerImage(traveller.travellerImage);

    const getTravel = async () => {
      // const response = await fetch(
      //   `http://localhost:4000/travel/one/${travelId}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const response = await axios.get(
        `${API_URL}/travel/one/${travelId}`,
      );
      const data = await response.data;
      // setTravel(data["data"]);
      setTravelPlace(data["data"].travelPlace);
      setTravelStartDate(data["data"].travelStartDate);
      setTravelEndDate(data["data"].travelEndDate);
      setTravelCostTotal(data["data"].travelCostTotal);
      setTravelImage(data["data"].travelImage);
    };
    getTravel();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Link to="/mytravel">
                <FlightTakeoffIcon sx={{ color: "white" }} />
              </Link>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              แก้ไขการเดินทาง
            </Typography>
            <Button color="inherit">{travellerFullname}</Button>
            <Avatar
              src={
                travellerImage
                  ? `${travellerImage}`
                  : Profile
              }
            />
            <Link
              to={"/"}
              style={{
                color: "red",
                textDecoration: "none",
                marginLeft: "10px",
                fontWeight: "bold",
              }}
            >
              LOG OUT
            </Link>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "70%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          <Typography
            variant="h3"
            component={"div"}
            fontWeight={"bold"}
            sx={{ textAlign: "center" }}
          >
            Travel DTI
          </Typography>
          <Avatar
            src={travelImg}
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
          />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            แก้ไขการเดินทาง
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            สถานที่ที่เดินทางไป
          </Typography>
          <TextField
            fullWidth
            value={travelPlace}
            onChange={(e) => setTravelPlace(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            วันที่เดินทางไป
          </Typography>
          <TextField
            fullWidth
            value={travelStartDate}
            onChange={(e) => setTravelStartDate(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            วันที่เดินทางกลับ
          </Typography>
          <TextField
            fullWidth
            value={travelEndDate}
            onChange={(e) => setTravelEndDate(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ค่าใช้จ่ายในการเดินทาง
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={travelCostTotal}
            onChange={(e) => setTravelCostTotal(e.target.value)}
          />
          <Avatar
            src={
              travelNewImage == null
                ? travelImage == ""
                  ? place
                  : `${travelImage}`
                : URL.createObjectURL(travelNewImage)
            }
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 3 }}
            variant="rounded"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mx: "auto" }}
              component="label"
            >
              อัปโหลดรูปภาพ
              <SelectFileBt
                type="file"
                accept="image/*"
                onChange={handleSelectFileClick}
              />
            </Button>
          </Box>
          {/* */}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}
            onClick={handleUpdateTravelClick}
          >
            บันทึกการแก้ไขการเดินทาง
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 1,
            }}
          >
            <Typography sx={{ mr: 1 }}>กลับไปหน้า</Typography>
            <Link
              to="/mytravel"
              style={{ textDecoration: "none", color: "#259e69" }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                บันทึกการเดินทางของฉัน
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};
