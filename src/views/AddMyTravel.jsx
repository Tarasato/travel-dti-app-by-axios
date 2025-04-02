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
import { Link, useNavigate } from "react-router-dom";
import travel from "./../assets/travel.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import place from "./../assets/place.png";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const AddMyTravel = () => {

  const navigator = useNavigate();

  const handleSaveTravelClick = async (e) => {
    e.preventDefault();

    if (travelPlace.length == 0) {
      alert("กรุณาป้อนสถานที่เดินทาง");
      return;
    } else if (travelStartDate.length == 0) {
      alert("กรุณาป้อนวันที่เดินทางไป");
      return;
    } else if (travelEndDate.length == 0) {
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
      if (travelImage) {
        formData.append("travelImage", travelImage);
      }

      try {
        // const response = await fetch("http://localhost:4000/travel", {
        //   method: "POST",
        //   body: formData,
        // });
        const response = await axios.post(API_URL+"/travel", formData);
        if (response.status == 201) {
          alert("เพิ่มการเดินทางสําเร็จ");
          navigator("/mytravel");
        }else{
          alert("เพิ่มการเดินทางไม่สําเร็จ กรุณาลองใหม่อีกครั้ง");
        }
      } catch (error) {
        alert("เกิดข้อผิดพลาด: " + error);
      }
    }
  };

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravelImage(file);
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

  const [travelImage, setTravelImage] = useState(null);
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerImage, setTravellerImage] = useState("");
  const [travellerId, setTravellerId] = useState("");
  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");

  useEffect(() => {
    //เอาข้อมูลใน Memory มาแสดงที่ Appbar
    //อ่านข้อมูล Traveller จาก Memory
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    //เอาข้อมูลในตัวแปรกำหนดให้กับ state ที่สร้างไว้
    setTravellerFullname(traveller.travellerFullname);
    setTravellerEmail(traveller.travellerEmail);
    setTravellerImage(traveller.travellerImage);
    setTravellerId(traveller.travellerId);
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
              เพิ่มการเดินทาง
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
            src={travel}
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
          />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            เพิ่มการเดินทาง
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
            src={travelImage == null ? place : URL.createObjectURL(travelImage)}
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
            onClick={handleSaveTravelClick}
          >
            บันทึกการเดินทาง
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
