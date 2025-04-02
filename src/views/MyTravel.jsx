import { React, useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Profile from "./../assets/profile.png";
import Place from "./../assets/place.png";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.API_URL;

export const MyTravel = () => {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerImage, setTravellerImage] = useState("");
  const [travel, setTravel] = useState([]);

  useEffect(() => {
    //เอาข้อมูลใน Memory มาแสดงที่ Appbar
    //อ่านข้อมูล Traveller จาก Memory
    const traveller = localStorage.getItem('traveller')
    //เอาข้อมูลในตัวแปรกำหนดให้กับ state ที่สร้างไว้
    setTravellerFullname(traveller.travellerFullname);
    setTravellerEmail(traveller.travellerEmail);
    setTravellerImage(traveller.travellerImage);

    //ดึงข้อมูลจาก DB ของ Traveller ที่ Login เข้ามา เพื่อแสดง
    const getAllTravel = async () => {
      // const resData = await fetch(
      //   `http://localhost:4000/travel/${traveller.travellerId}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      
      const resData = await axios.get(API_URL+`/travel/${traveller.travellerId}`);

      if (resData.status == 200) {
        // const data = await resData.json();
        // setTravel(data["data"]);
        setTravel(resData.data["data"]);
      }
    };
    getAllTravel();
  }, []);

  //delete travel
  const handleDeleteTravelClick = async (travelId) => {
    // const response = await fetch(`http://localhost:4000/travel/${travelId}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    
    const response = await axios.delete(API_URL+`/travel/${travelId}`);
    
    if (response.status == 200) {
      alert("ลบข้อมูลสำเร็จ");
      window.location.reload();
    }else{
      alert("ลบข้อมูลไม่สำเร็จกรุณาลองใหม่อีกครั้ง error code: " + response.status);
    }
  };

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
              <FlightTakeoffIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              บันทึกการเดินทาง
            </Typography>
            <Link to="/editprofile" style={{ color: "white" }}>
              <Button color="inherit">{travellerFullname}</Button>
            </Link>
            <Avatar
              src={
                travellerImage
                  ? API_URL+`/images/traveller/${travellerImage}`
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
      </Box>
      <Box sx={{ width: "70%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
        <Typography
          variant="h3"
          component={"div"}
          fontWeight={"bold"}
          sx={{ textAlign: "center", mb: 4 }}
        >
          การเดินทางของฉัน
        </Typography>

        {/*แสดงผลการเดินทาง*/}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#aaaaaa" }}>
                <TableCell align="center">ลำดับ</TableCell>
                <TableCell align="center">สถานที่ไป</TableCell>
                <TableCell align="center">รูป</TableCell>
                <TableCell align="center">วันที่ไป</TableCell>
                <TableCell align="center">วันที่กลับ</TableCell>
                <TableCell align="center">ค่าใช้จ่ายทั้งหมด</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {travel.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: index % 2 == 0 ? "white" : "lightblue",
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">{row.travelPlace}</TableCell>
                  <TableCell align="left">
                    <Avatar
                      src={
                        row.travelImage == "" || null
                          ? Place
                          : API_URL+`/images/travel/${row.travelImage}`
                      }
                      sx={{ width: 60, height: 60, boxShadow: 3 }}
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell align="left">{row.travelStartDate}</TableCell>
                  <TableCell align="left">{row.travelEndDate}</TableCell>
                  <TableCell align="left">{row.travelCostTotal}</TableCell>
                  <TableCell align="center">
                    <Button component={Link} to={`/editmytravel/${row.travelId}`}>แก้ไข</Button>
                    <Button onClick={() => handleDeleteTravelClick(row.travelId)}>ลบ</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* */}

        <Link
          to="/addmytravel"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            sx={{ py: 2, color: "white", mt: 4 }}
          >
            เพิ่มการเดินทาง
          </Button>
        </Link>
      </Box>
    </>
  );
};
