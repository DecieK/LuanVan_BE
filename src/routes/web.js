import express from "express";
import userController from "../controller/userController";
import register from "../auth/register";
import userService from "../services/emailService";



// var appRoot = require("app-root-path");
let router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", userController.getHomepage);

  router.get("/api/TTChitietve", userController.handleTTchitietve);
  router.post("/api/Datve", userController.handleDatve);
  router.post("/api/CapnhatTTve", userController.handleCapnhatTTve);
  router.post("/api/Dangky", userController.handleDangky);
  router.post("/api/Dangnhap", userController.handleDangnhap);
  router.get("/api/TTGhe", userController.handleTTGhe);
  router.get("/api/TTGhetheoIdrap", userController.handleTTGhe_idrap);
  router.post("/api/TTChieu", userController.handleTTChieu);
  router.get("/api/TTCumrap", userController.handleTTCumrap);
  router.get("/api/TTSuatchieu", userController.handleTTSuatchieu);
  router.get("/api/TTKM", userController.handleTTKM);
  router.get("/api/TTDoan", userController.handleTTDoan);
  router.get("/api/LayTTPhim", userController.handleTTPhim);
  router.post("/upload", userController.handleTest);
  router.get("/api/TTRap_idcumrap", userController.handleTTRap_idcumrap);
  router.get("/api/TTVe_idchieu", userController.handleTTVe_idchieu);
  router.get("/api/TTLoaiphim", userController.handleTTLoaiphim);

  router.post("/api/ThemTTCumrap", userController.handleThemTTCumrap);
  router.post("/api/SuaTTCumrap", userController.handleSuaTTCumrap);
  router.delete("/api/XoaTTCumrap", userController.handleXoaTTCumrap);

  router.post("/api/ThemTTRap", userController.handleThemTTRap);
  router.post("/api/SuaTTRap", userController.handleSuaTTRap);
  router.delete("/api/XoaTTRap", userController.handleXoaTTRap);

  router.post("/api/ThemTTGhe", userController.handleThemTTGhe);
  router.post("/api/SuaTTGhe", userController.handleSuaTTGhe);
  router.delete("/api/XoaTTGhe", userController.handleXoaTTGhe);


  router.post("/api/ThemTTPhim", userController.handleThemTTPhim);
  router.post("/api/SuaTTPhim", userController.handleSuaTTPhim);
  router.delete("/api/XoaTTPhim", userController.handleXoaTTPhim);

  router.post("/api/ThemTTLoaiphim", userController.handleThemTTLoaiphim);
  router.post("/api/SuaTTLoaiphim", userController.handleSuaTTLoaiphim);
  router.delete("/api/XoaTTLoaiphim", userController.handleXoaTTLoaiphim);

  router.post("/api/ThemTTSuatchieu", userController.handleThemTTSuatchieu);
  router.post("/api/SuaTTSuatchieu", userController.handleSuaTTSuatchieu);
  router.delete("/api/XoaTTSuatchieu", userController.handleXoaTTSuatchieu);
 

  router.post("/api/ThemTTChieu", userController.handleThemTTChieu);
  router.post("/api/SuaTTChieu", userController.handleSuaTTChieu);
  router.delete("/api/XoaTTChieu", userController.handleXoaTTChieu);
 
 
  router.post("/api/ThemTTDoan", userController.handleThemTTDoan);
  router.post("/api/SuaTTDoan", userController.handleSuaTTDoan);
  router.delete("/api/XoaTTDoan", userController.handleXoaTTDoan);

  router.get("/api/LayTTKhachhang", userController.handleLayTTKhachhang);
  router.get("/api/LayTTCTLoaiphim_idP", userController.handleLayTTCTLoaiphim_idP);

  router.post("/api/ThemTTKhuyenmai", userController.handleThemTTKhuyenmai);
  router.post("/api/SuaTTKhuyenmai", userController.handleSuaTTKhuyenmai);
  router.delete("/api/XoaTTKhuyenmai", userController.handleXoaTTKhuyenmai);
 

  router.get("/api/LayTTNhanvien", userController.handleLayTTNhanvien);
  router.post("/api/ThemTTNhanvien", userController.handleThemTTNhanvien);
  router.post("/api/SuaTTNhanvien", userController.handleSuaTTNhanvien);
  router.delete("/api/XoaTTNhanvien", userController.handleXoaTTNhanvien);


  router.get("/api/LayTTVe_idKH", userController.handleLayTTVe_idKH);
  router.get("/api/LayTTRap", userController.handleLayTTRap);
  router.get("/api/LayTTChieu_idc", userController.handleLayTTChieu_idc);
  router.get("/api/LayTTDoan_idve", userController.handleLayTTDoan_idve);
  router.get("/api/LayTTKhuyenmai", userController.handleLayTTKhuyenmai);

  //ch dungf
  router.delete("/api/XoaCTDoan", userController.handleXoaCTDoan);
  router.delete("/api/XoaCTVe", userController.handleXoaCTVe);
  router.delete("/api/HuyVe", userController.handleHuyVe);

  router.get("/api/verify", userController.handleVerify)
  router.post("/api/Sendemail", userController.handleSendmail);
  router.post("/api/UpdateVerifyEmail", userController.handleUpdateVerifyEmail);

  router.post("/api/QuenMatKhau", userController.handleQuenMatKhau);
  router.get("/api/verifyQuenmk", userController.handleverifyQuenmk)
  router.post("/api/UpdateMatkhau", userController.handleUpdateMatkhau);


  // router.post("/api/VnPay", userController.handleVnPay);

  return app.use("/", router);
};

module.exports = initWebRoutes;

//them chổ loaiphim

//sua BE them phim
// Deploy nextjs xong mới sử dụng api vnpay được