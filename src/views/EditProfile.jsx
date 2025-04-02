import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useEffect, useState } from "react";
import Profile from "./../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import Travel from "./../assets/travel.png";

const API_URL = import.meta.env.VITE_API_URL;

export const EditProfile = () => {
  
  const [travellerFullname, setTravellerFullname] = useState('');
  const [travellerNewFullname, setTravellerNewFullname] = useState('');
  const [travellerImage, setTravellerImage] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");
  const [travellerId, setTravellerId] = useState("");

  const [travellerNewImage, setTravellerNewImage] = useState(null);

  useEffect(() => {
    //เอาข้อมูลใน memory มาแสดงที่ AppBar
    //อ่านข้อมูลจาก memory เก็บในตัวแปร
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    //เอาข้อมูลในตัวแปรกำหนดให้กับ state ที่สร้างไว้
    setTravellerId(traveller.travellerId);
    setTravellerFullname(traveller.travellerFullname);
    setTravellerNewFullname(traveller.travellerFullname);
    setTravellerImage(traveller.travellerImage);
    setTravellerEmail(traveller.travellerEmail);
    setTravellerPassword(traveller.travellerPassword);
  }, []);

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];

    if (file) {
      setTravellerNewImage(file);
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

  const handleEditProfileClick = async (e) => {
    e.preventDefault();
    if (travellerNewFullname.length == 0) {
      alert("ป้อนชื่อ-นามสกุลด้วย");
    } else if (travellerEmail.length == 0) {
      alert("ป้อนอีเมล์ด้วย");
    } else if (travellerPassword.length == 0) {
      alert("ป้อนรหัสผ่านด้วย");
    } else {
      //Send data to API, save to DB and redirect to Login page.
      //Packing data
      const formData = new FormData();
      formData.append("travellerId", travellerId);
      formData.append("travellerImage", travellerNewImage);
      formData.append("travellerFullname", travellerNewFullname);
      formData.append("travellerEmail", travellerEmail);
      formData.append("travellerPassword", travellerPassword);
      //Send data to API
      try {
        // const response = await fetch(`http://localhost:4000/traveller/${travellerId}`, {
        //   method: "PUT",
        //   body: formData,
        // });
        const response = await axios.put(`${API_URL}/traveller/${travellerId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status == 200) {
          alert("บันทึกการแก้ไขโปรไฟล์สําเร็จ");
          const data = await response.data;
          localStorage.setItem('traveller', JSON.stringify(data["data"]))
          navigator("/mytravel");
           //window.location.href("/")
        } else {
          alert("บันทึกการแก้ไขโปรไฟล์ไม่สำเร็จโปรดลองใหม่อีกครั้ง, error code: " + response.status);
        }
      } catch (error) {
        alert("พบข้อผิดพลาดในการบันทึกการแก้ไขโปรไฟล์ error: " + error);
      }
    }
  };

  const navigator = useNavigate();

  return (
    <>
      <Box sx={{ width: "100%" }}>
      {/* AppBar */}
        <Box sx={{ flexGrow: 1 }}>
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
                บันทึกการเดินทาง
              </Typography>
              <Link to={"/editprofile"} style={{ color: "white" }}>
                <Button color="inherit">{travellerFullname}</Button>
              </Link>
              <Avatar
                src={
                  travellerImage == ""
                    ? Profile
                    : `${travellerImage}`
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
        </Box>
         {/* AppBar*/}

        <Box sx={{ width: "60%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Travel DTI
          </Typography>

          <Avatar
            src={Travel}
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
          />

          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            แก้ไขข้อมูลส่วนตัว
          </Typography>

          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ชื่อ-นามสกุล
          </Typography>
          {/* TextField travellerFullname */}
          <TextField
            fullWidth
            value={travellerNewFullname}
            onChange={(e) => setTravellerNewFullname(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ชื่อผู้ใช้ (E-Mail)
          </Typography>
          {/* TextField travellerEmail */}
          <TextField
            fullWidth
            value={travellerEmail}
            onChange={(e) => setTravellerEmail(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            รหัสผ่าน
          </Typography>
          {/* TextField travellerPassword*/}
          <TextField
            fullWidth
            type="password"
            value={travellerPassword}
            onChange={(e) => setTravellerPassword(e.target.value)}
          />

          <Avatar
            src={
              travellerNewImage == null
                ? `${travellerImage}`
                : travellerNewImage != null ? URL.createObjectURL(travellerNewImage) : Profile
            }
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 3 }}
            variant="rounded"
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              เลือกรูป
              <SelectFileBt
                type="file"
                accept="image/*"
                onChange={handleSelectFileClick}
              />
            </Button>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4, py: 2, backgroundColor: "#259e69" }}
            onClick={handleEditProfileClick}
          >
            บันทึกการแก้ไข
          </Button>

          <Link
            to="/mytravel"
            style={{ textDecoration: "none", color: "#259e69" }}
          >
            <Typography
              sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
            >
              กลับไปหน้า การเดินทางของฉัน
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}
