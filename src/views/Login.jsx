import {React, useState} from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import travel from "./../assets/travel.png";
import axios from "axios";

const API_URL = process.env.API_URL;

export const Login = () => {
  const navigator = useNavigate();

  const [travellerEmail, setTravellerEmail] = useState('');
  const [travellerPassword, setTravellerPassword] = useState('');

  const handleLoginClick = async (e) => {
    e.preventDefault();

    //validate UI
    if(travellerEmail.length == 0){
      alert('กรุณาป้อนชื่อผู้ใช้(อีเมล)')
      return
    }else if (travellerPassword.length == 0){
      alert('กรุณาป้อนรหัสผ่าน')
      return
    }

    // ส่งข้อมูลไป API เพื่อตรวจสอบและไปหน้าถัดไป MyTravel (/mytravel)
    try {
      // const response = await fetch(`http://localhost:4000/traveller/${travellerEmail}/${travellerPassword}`, { //'http://localhost:4000/traveller/+travellerEmail+'/'+travellerPassword'
      //   method: 'GET',
      // })
      
      const response = await axios.get(API_URL+`/traveller/${travellerEmail}/${travellerPassword}`)

      if(response.status == 200){
        //เอาข้อมูลของ Teaveller ไปเก็บไว้ใน memory
        // const data = await response.json()
        // localStorage.setItem('traveller', JSON.stringify(data["data"]))

        localStorage.setItem('traveller', JSON.stringify(response.data["data"]))

        //เปลี่ยนหน้าไปที่ /mytravel
        navigator('/mytravel')
        }else if(response.status == 404){
          alert('ชื่อผู้ใช้(Email)หรือรหัสผ่านไม่ถูกต้อง')
        }else{
          alert('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' + response.status)
            }
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error)
    }

  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "40%", boxShadow: 4, mx: "auto", p: 5 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontWeight: "bold" }}
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
          เข้าใช้งานระบบ
        </Typography>
        <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          ชื่อผู้ใช้ (Email)
        </Typography>
        <TextField fullWidth value={travellerEmail} onChange={(e) => setTravellerEmail(e.target.value)}/>
        <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          รหัสผ่าน
        </Typography>
        <TextField fullWidth type="password" value={travellerPassword} onChange={(e) => setTravellerPassword(e.target.value)}/>
        <Button
          variant="contained"
          fullWidth
          onClick={handleLoginClick}
          sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}
        >
          Login
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
          <Typography sx={{ mr: 1 }}>ยังไม่มีบัญชีผู้ใช้?</Typography>
          <Link to="/register" style={{ textDecoration: "none", color: "#259e69" }}>
            <Typography sx={{ fontWeight: "bold" }}>ลงทะเบียน</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};