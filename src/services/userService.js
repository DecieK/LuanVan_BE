// import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import db from "../models/index";
import emailService from "./emailService"
const {
  Op
} = require("sequelize");
// import bcrypt, { hash } from "bcryptjs"; //hashpassword
const bcrypt = require('bcrypt');
import userController from "../controller/userController";
import dayjs from "dayjs"
import chitietloaiphim from "../models/chitietloaiphim";
var Sequelize = require('sequelize');

// const salt = bcrypt.genSaltSync(10);

let handleDangnhap = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userdata = {};
      if (email) {
        //user ton tai >>> true
        //compare password
        let khachhang = await db.khachhangs.findOne({
          //get duoc alldata user
          attributes: ["Email_KH", "Matkhau_KH"], //get data can thiet
          where: {
            Email_KH: email
          },
          raw: true,
        });
        let nhanvien = await db.nhanviens.findOne({
          //get duoc alldata user
          attributes: ["Email_NV", "Matkhau_NV"], //get data can thiet
          where: {
            Email_NV: email
          },
          raw: true,
        });
        if (khachhang) {
          if (password === khachhang.Matkhau_KH) {
            userdata.errCode = 0;
            userdata.message = "ok";
          } else {
            userdata.errCode = 1;
            userdata.message = "sai password";
          }
        } else {
          if (nhanvien) {
            if (password === nhanvien.Matkhau_NV) {
              userdata.errCode = 0;
              userdata.message = "ok";
            } else {
              userdata.errCode = 1;
              userdata.message = "sai password";
            }
          } else {
            userdata.errCode = 2;
            userdata.message = "Nhan vien khong ton tai";
          }
        }

        resolve(userdata);
      } else {
        //return err
        reject({
          errCode: 3,
          errMessage: `Email not found. Try again`,
        });
        // userdata.errCode = 1;
        // userdata.errMessage = `Email not found. Try again`;
      }
      // resolve(userdata);
    } catch (e) {
      reject(e);
    }
  });
};

let handleDangky = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_KH ||
        !data.Ngaysinh ||
        !data.gt_KH ||
        !data.sdt_KH ||
        !data.cccd_KH ||
        !data.email_KH ||
        !data.diachi_KH ||
        !data.matkhau_KH
      ) {
        resovle({
          errCode: 101,
          errMessage: "Missing parameter",
        });
      } else {
        let khachhang = await db.khachhangs.findOne({
          where: {
            // Hten_KH: data.hten_KH,
            Email_KH: data.email_KH,
            // Sdt_KH: data.sdt_KH,
          },
        });
        let khachhang1 = await db.khachhangs.findOne({
          where: {
            // Hten_KH: data.hten_KH,
            Email_KH: '?' + data.email_KH,
            // Sdt_KH: data.sdt_KH,
          },
        });

        if (khachhang || khachhang1) {
          resovle({
            errCode: 1,
            errMessage: "Email đã được sử dụng ở tài khoản khác",
          });
        } else {
          await db.khachhangs.create({
            // id_KH: 5,
            Hten_KH: data.hten_KH,
            Sdt_KH: data.sdt_KH,
            Email_KH: data.email_KH,
            Ngaysinh_KH: data.Ngaysinh,
            Diachi_KH: data.diachi_KH,
            Gioitinh_KH: data.gt_KH,
            Cccd_KH: data.cccd_KH,
            // Taikhoan_KH: data.taikhoan_KH,
            Matkhau_KH: data.matkhau_KH,

          });

          // bcrypt.hash(data.email_KH, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
          //   console.log(`${process.env.APP_URL}/verify?email=${data.email_KH}&token=${hashedEmail}`);
          //   emailService.sendEmail(data.email_KH, "Verify Email", `<a href="${process.env.URL_REACT}/api/verify?email=${data.email_KH}&token=${hashedEmail}"> Ấn vào đây để xác nhận email </a>`)
          // });

          resovle({
            errCode: 0,
            errMessage: "Tạo tài khoản thành công",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Tạo và lưu",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleDatve = (data) => {
  // interface DSDichVu {
  //   id: number,
  //   ten: string,
  //   anhminhhoa: string,
  //   loai: string,
  //   mota: string,
  //   gia: number,
  //   size: string,
  //   sl: number
  // }
  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_KH ||
        !data.httt ||
        !data.tongtien ||
        !data.soluongghe ||
        !data.ngaymuave ||
        !data.id_KH ||
        !data.id_ghe ||
        !data.id_suatchieu ||
        !data.id_rap ||
        !data.id_cumrap ||
        // !data.id_KM ||
        !data.id_NV ||
        // !data.id_doan ||
        !data.id_chieu
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        //tạo chuỗi ngẫu nhiên
        let result = '';

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const CreateString = async () => {
          const charactersLength = characters.length;
          for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          // console.log("ressult", result)
          return result;
        }
        CreateString()




        // await handleDatve(data)
        // console.log('thoigian',data.thoigiangd)
        await db.ves.create({
          // id_KH: 5,
          Hten_KH: data.hten_KH,
          HTTT: data.httt,
          Tongtien: data.tongtien,
          SLghe: data.soluongghe,
          Ngaymuave: data.ngaymuave,
          id_KH: data.id_KH,
          id_chieu: data.id_chieu,
          id_suatchieu: data.id_suatchieu,
          id_rap: data.id_rap,
          id_cumrap: data.id_cumrap,
          id_KM: data.id_KM,
          id_NV: data.id_NV,
          maCode: result,
          MaGD: data.magd,
          ThoigianGD: data.thoigiangd
          // id_DA: data.id_doan
        });
        let n_id = await db.ves.max('id'); // 40
        for (let index1 = 0; index1 < data.soluongghe; index1++) {
          await db.chitietves.create({
            id_ve: n_id,
            id_ghe: data.id_ghe[index1]
          });
        }
        // console.log("ádas",data.id_doan.length)
        for (let index2 = 0; index2 < data.id_doan.length; index2++) {
          if (data.id_doan[index2].sl > 0) {
            await db.chitietdoans.create({
              slda: data.id_doan[index2].sl,
              id_doan: data.id_doan[index2].id,
              id_ve: n_id
              // id_ghe: data.id_ghe[index2]
            });
          }
        }
        let khachhang = await db.khachhangs.findOne({
          where: {
            id: data.id_KH
          },
          raw: false
        });
        if (khachhang) {
          khachhang.Diemtichluy_KH = khachhang.Diemtichluy_KH + ((data.tongtien * 1) / 100),

            await khachhang.save();
        }
        let cumrap = await db.qlcumraps.findOne({
          where: {
            id: data.id_cumrap
          },
          // raw : false
        });
        let chieu = await db.chieus.findOne({
          where: {
            id: data.id_chieu
          },
          // raw : false
        });
        let suatchieu = await db.suatchieus.findOne({
          where: {
            id: data.id_suatchieu
          },
          // raw : false
        });
        // console.log('chieu.id_phim',chieu.id_phim)
        let phim = await db.phims.findOne({
          where: {
            id: chieu.id_phim
          },
          // raw : false
        });
        let rap = await db.raps.findOne({
          where: {
            id: data.id_rap
          },
          // raw : false
        });
        let danhsachghe = ''
        for (let index2 = 0; index2 < data.soluongghe; index2++) {
          let ghe = await db.ghes.findOne({
            where: {
              id: data.id_ghe[index2]
            }
          });
          if (ghe) {
            danhsachghe += ', ' + ghe.maGhe
          }
        }
        // let danhsacnhDV = ([{
        //   ten: String,
        //   sl: Number,
        //   size: String

        // }])
        let danhsacnhDV = ''

        for (let index2 = 0; index2 < data.id_doan.length; index2++) {
          if (data.id_doan[index2].sl > 0) {
            let ttdichvu = await db.doans.findOne({
              where: {
                id: data.id_doan[index2].id
              }
            });
            if (ttdichvu) {
              danhsacnhDV += ', ' + ttdichvu.ten + ' size ' + data.id_doan[index2].size + ' sl: ' + data.id_doan[index2].sl
              // danhsacnhDV.push({
              //   ten : ttdichvu.ten,
              //   sl: data.id_doan[index2].sl,
              //   size: ttdichvu.size
              // })
            }
          }
        }

        // console.log('danhsacnhDV', danhsacnhDV.length)
        // console.log('danhsacnhDV', data.id_doan.length)

        emailService.sendEmail(khachhang.Email_KH, "Thông báo đặt vé xem phim ",
          `<h1>Xin chào ${khachhang.Hten_KH}, </h1>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của CGV!</p>
            <p>CGV xác nhận bạn đã đặt vé xem phim của ${cumrap.ten_tttt} thành công lúc ${ dayjs(new Date()).format("DD/MM/YYYY - HH:mm:ss A")}. </p>
          <p>Chi tiết vé của bạn:</p>
            <h3>Mã code: ${result}</h3>
            <a>Đem mã code này đến quầy giao dịch để nhận vé</a>
            <p>Thời gian chiếu: ${suatchieu.giobatdau} - ${dayjs(chieu.ngaychieu).format('DD/MM/YYYY')}</p>
            <p>Phim: ${phim.tenphim}</p>
            <p>Phòng chiếu: ${rap.ten_rap} - Ghế: ${danhsachghe.slice(2,danhsachghe.length)}</p>
            <p>Dịch vụ: ${danhsacnhDV.slice(2,danhsacnhDV.length)}</p>
            `)

        resovle({
          errCode: 0,
          errMessage: "Đặt vé thành công",
        });
      }




      // }
      // resovle({
      //   errCode: thongtinve,
      //   errMessage: "Đặt vé thành công",
      // });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
let handleCapnhatTTve = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_KH ||
        !data.httt ||
        !data.tongtien ||
        !data.soluongghe ||
        !data.ngaymuave ||
        !data.id_KH ||
        !data.id_ghe ||
        !data.id_suatchieu ||
        !data.id_rap ||
        !data.id_cumrap ||
        // !data.id_KM ||
        !data.id_NV ||
        !data.macode ||
        !data.id_chieu ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let ve = await db.ves.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        let ctve = await db.chitietves.findAll({
          where: {
            id_ve: data.id
          },
          raw: false,
        });
        if (ctve) {
          await db.chitietves.destroy({
            where: {
              id_ve: data.id
            },
          });
        }
        let ctdoan = await db.chitietdoans.findAll({
          where: {
            id_ve: data.id
          },
          raw: false,
        });
        if (ctdoan) {
          await db.chitietdoans.destroy({
            where: {
              id_ve: data.id
            },
          });
        }
        let khachhang = await db.khachhangs.findOne({
          where: {
            id: data.id_KH
          },
          raw: false
        });
        if (khachhang && ve) {
          khachhang.Diemtichluy_KH = khachhang.Diemtichluy_KH - (ve.Tongtien * 1) / 100

          await khachhang.save();
        }
        if (ve) {
          ve.Hten_KH = data.hten_KH,
            ve.HTTT = data.httt,
            ve.Tongtien = data.tongtien,
            ve.SLghe = data.soluongghe,
            ve.Ngaymuave = data.ngaymuave,
            ve.id_KH = data.id_KH,
            ve.id_chieu = data.id_chieu,
            ve.id_suatchieu = data.id_suatchieu,
            ve.id_rap = data.id_rap,
            ve.id_cumrap = data.id_cumrap,
            ve.id_KM = data.id_KM,
            ve.id_NV = data.id_NV,
            ve.maCode = data.macode,

            await ve.save();

          khachhang.Diemtichluy_KH = khachhang.Diemtichluy_KH + (data.tongtien * 1) / 100
          await khachhang.save();

          for (let index1 = 0; index1 < data.soluongghe; index1++) {
            await db.chitietves.create({
              id_ve: data.id,
              id_ghe: data.id_ghe[index1]
            });
          }
          // console.log("ádas",data.id_doan.length)
          for (let index2 = 0; index2 < data.id_doan.length; index2++) {
            if (data.id_doan[index2].sl > 0) {
              await db.chitietdoans.create({
                slda: data.id_doan[index2].sl,
                id_doan: data.id_doan[index2].id,
                id_ve: data.id
              });
            }
          }


          let cumrap = await db.qlcumraps.findOne({
            where: {
              id: data.id_cumrap
            },
            // raw : false
          });
          let chieu = await db.chieus.findOne({
            where: {
              id: data.id_chieu
            },
            // raw : false
          });
          let suatchieu = await db.suatchieus.findOne({
            where: {
              id: data.id_suatchieu
            },
            // raw : false
          });
          // console.log('chieu.id_phim',chieu.id_phim)
          let phim = await db.phims.findOne({
            where: {
              id: chieu.id_phim
            },
            // raw : false
          });
          let rap = await db.raps.findOne({
            where: {
              id: data.id_rap
            },
            // raw : false
          });
          let danhsachghe = ''
          for (let index2 = 0; index2 < data.soluongghe; index2++) {
            let ghe = await db.ghes.findOne({
              where: {
                id: data.id_ghe[index2]
              }
            });
            if (ghe) {
              danhsachghe += ', ' + ghe.maGhe
            }
          }


          // console.log('danhsachghe', danhsachghe.slice(2,danhsachghe.length))
          if (ve.Tongtien > data.tongtien) {

            emailService.sendEmail(khachhang.Email_KH, "Thông báo CẬP NHẬT vé xem phim ",
              `<h1>Xin chào ${khachhang.Hten_KH}, </h1>
              <h2>Cảm ơn bạn đã sử dụng dịch vụ của CGV!</h2>
                <h3>Thông tin vé của bạn đã được cập nhật, tiền thừa đã được hoàn về tài khoản!!!</h3>
                <p>CGV xác nhận bạn đã đặt vé xem phim của ${cumrap.ten_tttt} thành công lúc ${ dayjs(new Date()).format("DD/MM/YYYY - HH:mm:ss A")}. </p>
                <p>Chi tiết vé của bạn:</p>
                <h3>Mã code: ${data.macode}</h3>
                <a>Đem mã code này đến quầy giao dịch để nhận vé</a>
                <p>Thời gian chiếu: ${suatchieu.giobatdau} - ${dayjs(chieu.ngaychieu).format('DD/MM/YYYY')}</p>
                <p>Phim: ${phim.tenphim}</p>
                <p>Phòng chiếu: ${rap.ten_rap} - Ghế: ${danhsachghe.slice(2,danhsachghe.length)}</p>
                `)
          } else {

            emailService.sendEmail(khachhang.Email_KH, "Thông báo CẬP NHẬT vé xem phim ",
              `<h1>Xin chào ${khachhang.Hten_KH}, </h1>
            <h2>Cảm ơn bạn đã sử dụng dịch vụ của CGV!</h2>
              <p>CGV xác nhận bạn đã đặt vé xem phim của ${cumrap.ten_tttt} thành công lúc ${ dayjs(new Date()).format("DD/MM/YYYY - HH:mm:ss A")}. </p>
              <p>Chi tiết vé của bạn:</p>
              <h3>Mã code: ${data.macode}</h3>
              <a>Đem mã code này đến quầy giao dịch để nhận vé</a>
              <p>Thời gian chiếu: ${suatchieu.giobatdau} - ${dayjs(chieu.ngaychieu).format('DD/MM/YYYY')}</p>
              <p>Phim: ${phim.tenphim}</p>
              <p>Phòng chiếu: ${rap.ten_rap} - Ghế: ${danhsachghe.slice(2,danhsachghe.length)}</p>
    `)
          }



        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin vé KHÔNG thành thông",
          });
        }

        resovle({
          errCode: 0,
          errMessage: "Cập nhật vé thành công",
        });
      }
      // resovle({
      //   errCode: thongtinve,
      //   errMessage: "Đặt vé thành công",
      // });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTchitietve = (id_ve) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitietve = "";
      if (id_ve === "ALL") {
        chitietve = await db.chitietves.findAll({});
      }

      if (id_ve && id_ve !== "ALL") {
        chitietve = await db.chitietves.findAll({
          where: {
            id_Ve: id_ve
          },
        });
      }
      resolve(chitietve);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTGhe = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ghe = "";
      if (key === "ALL") {
        ghe = await db.ghes.findAll({});
      }

      if (key && key !== "ALL") {
        ghe = await db.ghes.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(ghe);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTGhe_idrap = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ghe = "";
      if (key === "ALL") {
        ghe = await db.ghes.findAll({});
      }

      if (key && key !== "ALL") {
        ghe = await db.ghes.findAll({
          where: {
            id_rap: key
          },
        });
      }
      resolve(ghe);
    } catch (e) {
      reject(e);
    }
  });
};



let handleTTChieu = (ngaychieu, id_phim, id_rap) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ttchieu = "";
      if (ngaychieu && id_phim && id_rap) {
        if (ngaychieu === 'ALL' && id_phim === 'ALL' && id_rap === 'ALL') {
          ttchieu = await db.chieus.findAll({});
        } else {
          ttchieu = await db.chieus.findAll({
            where: {
              ngaychieu: ngaychieu,
              id_phim: id_phim,
              id_rap: id_rap
            },
          });
        }

      }
      resolve(ttchieu);
    } catch (e) {
      reject(e);
    }
  });
};


let handleTTDoan = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doan = "";
      if (key === "ALL") {
        doan = await db.doans.findAll({});
      }

      if (key && key !== "ALL") {
        doan = await db.doans.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(doan);
    } catch (e) {
      reject(e);
    }
  });
};
let handleLayTTPhim = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let phim = "";
      if (key === "ALL") {
        phim = await db.phims.findAll({});
      }

      if (key && key !== "ALL") {
        phim = await db.phims.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(phim);
    } catch (e) {
      reject(e);
    }
  });
};



let handleTTKM = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let khuyenmai = "";
      if (key === "ALL") {
        khuyenmai = await db.khuyenmais.findAll({});
      }

      if (key && key !== "ALL") {
        khuyenmai = await db.khuyenmais.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(khuyenmai);
    } catch (e) {
      reject(e);
    }
  });
};








let handleTest = (data) => {

  return new Promise(async (resovle, reject) => {

    try {
      if (
        !data.File ||
        !data.Filename ||
        !data.File_src
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.tests.create({
          image: data.File.path

        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin phim thành công",
          //   var storage = multer.diskStorage({
          //     destination: (req, file, callBack) => {
          //         callBack(null, './public/images/')     // './public/images/' directory name where save the file
          //     },
          //     filename: (req, file, callBack) => {
          //         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
          //     }
          // })
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin phim thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

// let handleThemTTGhe = (data) => {

//   return new Promise(async (resovle, reject) => {
//     try {
//       if (
//         !data.maGhe ||
//         !data.loaiGhe ||
//         !data.id_rap
//       ) {
//         resovle({
//           errCode: 1,
//           errMessage: "Missing parameter",
//         });
//       } else {
//         let ghe = await db.ghes.findOne({
//           //get duoc alldata user
//           attributes: ["email", "roleId", "firstName", "lastName", "password"], //get data can thiet
//           where: { maGhe: data.maGhe },
//           raw: true,
//         });
//         if (ghe) {
//           await db.ghes.create({
//             // id_KH: 5,
//             maGhe: data.maGhe,
//             loaiGhe: data.loaiGhe,
//             id_rap: data.id_rap
//           });
//         }

//         resovle({
//           errCode: 0,
//           errMessage: "Thêm thông tin phim thành công",
//         });
//       }
//       resovle({
//         errCode: 0,
//         errMessage: "Thêm thông tin phim thành công",
//       });
//       // }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };


let handleTTCumrap = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cumrap = "";
      if (key === "ALL") {
        cumrap = await db.qlcumraps.findAll({});
      }

      if (key && key !== "ALL") {
        cumrap = await db.qlcumraps.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(cumrap);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTSuatchieu = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let suatchieu = "";
      if (key === "ALL") {
        suatchieu = await db.suatchieus.findAll({});
      }

      if (key && key !== "ALL") {
        suatchieu = await db.suatchieus.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(suatchieu);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTRap_idcumrap = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rap = "";
      if (key === "ALL") {
        rap = await db.raps.findAll({});
      }

      if (key && key !== "ALL") {
        rap = await db.raps.findAll({
          where: {
            id_cumrap: key
          },
        });
      }
      resolve(rap);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTLoaiphim = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let loaiphim = "";
      if (id === "ALL") {
        loaiphim = await db.loaiphims.findAll({});
      }

      if (id && id !== "ALL") {
        loaiphim = await db.loaiphims.findAll({
          where: {
            id: id
          },
        });
      }
      resolve(loaiphim);
    } catch (e) {
      reject(e);
    }
  });
};

let handleLayTTCTLoaiphim_idP = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitietloaiphim = "";
      if (id === "ALL") {
        chitietloaiphim = await db.chitietloaiphims.findAll({
          include: [{
            model: db.loaiphims,
          }, ],
          raw: true,
          nest: true
        });
      }

      if (id && id !== "ALL") {

        // let tk_ngay = await db.ves.findAll({
        //   attributes: [
        //     'id',
        //     // exclude: ['tongtien'],
        //     [Sequelize.fn('SUM', Sequelize.col('Tongtien')), 'total_amount']

        //   ],
        //   include: [{
        //     model: db.chieus,
        //   }, ],
        //   group: ['chieu.ngaychieu'],
        //   raw: true,
        //   nest: true
        // });

        chitietloaiphim = await db.chitietloaiphims.findAll({
          where: {
            id_phim: id
          },
          include: [{
            model: db.loaiphims,
          }, ],
          raw: true,
          nest: true
        });
      }
      resolve(chitietloaiphim);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTVe_idchieu = (id_chieu) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ve = "";
      if (id_chieu === "ALL") {
        ve = await db.ves.findAll({});
      }

      if (id_chieu && id_chieu !== "ALL") {
        ve = await db.ves.findAll({
          where: {
            id_chieu: id_chieu
          },
        });
      }
      resolve(ve);
    } catch (e) {
      reject(e);
    }
  });
};

let handleThemTTCumrap = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tentttt ||
        !data.diachi
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let cumrap = await db.qlcumraps.findOne({
          where: {
            ten_tttt: data.tentttt,
            diachi: data.diachi,
          },
        });
        if (!cumrap) {
          await db.qlcumraps.create({
            ten_tttt: data.tentttt,
            diachi: data.diachi,
          });
        } else {
          resovle({
            errCode: 1,
            errMessage: "Thông tin cụm rạp đã tồn tại",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin cụm rạp mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let handleSuaTTCumrap = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.id ||
        !data.tentttt ||
        !data.diachi
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let cumrap = await db.qlcumraps.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (cumrap) {
          cumrap.ten_tttt = data.tentttt;
          cumrap.diachi = data.diachi;
          await cumrap.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin cụm rạp mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin cụm rạp mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


let handleXoaTTCumrap = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let cumrap = await db.qlcumraps.findOne({
      where: {
        id: Id
      },
    });

    if (!cumrap) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy cụm rạp`,
      });
    }

    await db.qlcumraps.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin cụm rạp đã xóa",
    });
  });
};


let handleThemTTRap = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tenrap ||
        !data.id_cr ||
        !data.slg
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let cumrap = await db.raps.findOne({
          where: {
            ten_rap: data.tenrap,
            slghe: data.slg,
            id_cumrap: data.id_cr
          },
        });
        if (!cumrap) {
          await db.raps.create({
            ten_rap: data.tenrap,
            slghe: data.slg,
            id_cumrap: data.id_cr
          });
        } else {
          resovle({
            errCode: 1,
            errMessage: "Thông tin rạp đã tồn tại",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin rạp mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTRap = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tenrap ||
        !data.id_cr ||
        !data.id ||
        !data.slg
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let rap = await db.raps.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (rap) {
          rap.ten_rap = data.tenrap;
          rap.slghe = data.slg;
          rap.id_cumrap = data.id_cr;

          await rap.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin rạp mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin rạp mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTRap = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let rap = await db.raps.findOne({
      where: {
        id: Id
      },
    });

    if (!rap) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy rạp`,
      });
    }

    await db.raps.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin rạp đã xóa",
    });
  });
};


let handleThemTTGhe = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.maghe ||
        !data.loaighe ||
        !data.idr
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let ghe = await db.ghes.findOne({
          where: {
            maGhe: data.maghe,
            loaiGhe: data.loaighe,
            id_rap: data.idr
          },
        });
        if (!ghe) {
          await db.ghes.create({
            maGhe: data.maghe,
            loaiGhe: data.loaighe,
            id_rap: data.idr
          });
        } else {
          resovle({
            errCode: 1,
            errMessage: "Thông tin ghế đã tồn tại",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin ghế mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTGhe = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.maghe ||
        !data.loaighe ||
        !data.idr ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let ghe = await db.ghes.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (ghe) {
          ghe.maGhe = data.maghe;
          ghe.loaiGhe = data.loaighe;
          ghe.id_rap = data.idr;

          await ghe.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin ghế mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin ghế mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTGhe = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let ghe = await db.ghes.findOne({
      where: {
        id: Id
      },
    });

    if (!ghe) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy ghế`,
      });
    }

    await db.ghes.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin ghế đã xóa",
    });
  });
};


let handleThemTTPhim = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.Tenphim ||
        !data.Dieukien ||
        !data.Poster ||
        !data.Trailer ||
        !data.Dienvien ||
        !data.Ngonngu ||
        !data.Quocgia ||
        !data.Tomtat ||
        !data.Daodien ||
        !data.Thoiluong ||
        !data.Ngaychieu ||
        !data.Nsx ||
        !data.arridLP ||
        !data.Trangthai
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.phims.create({
          // id_KH: 5,
          tenphim: data.Tenphim,
          dieukien: data.Dieukien,
          poster: data.Poster,
          trailer: data.Trailer,
          dienvien: data.Dienvien,
          ngonngu: data.Ngonngu,
          quocgia: data.Quocgia,
          tomtat: data.Tomtat,
          daodien: data.Daodien,
          thoiluong: data.Thoiluong,
          ngaychieu: data.Ngaychieu,
          nsx: data.Nsx,
          trangthai: data.Trangthai
        });
        // console.log('pt',data.arridLP[0])
        // console.log('length',data.arridLP.length)

        let n_id = await db.phims.max('id'); // 40
        for (let index1 = 0; index1 < data.arridLP.length; index1++) {
          await db.chitietloaiphims.create({
            id_phim: n_id,
            id_loaiphim: data.arridLP[index1]
          });
          // console.log('asd',data.arridLP[index1])

        }
        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin phim thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin phim thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTPhim = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.Tenphim ||
        !data.Dieukien ||
        !data.Poster ||
        !data.Trailer ||
        !data.Dienvien ||
        !data.Ngonngu ||
        !data.Quocgia ||
        !data.Tomtat ||
        !data.Daodien ||
        !data.Thoiluong ||
        !data.Ngaychieu ||
        !data.Nsx ||
        !data.Trangthai ||
        !data.ArrCTLP ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let phim = await db.phims.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (phim) {
          phim.tenphim = data.Tenphim;
          phim.dieukien = data.Dieukien;
          phim.poster = data.Poster;
          phim.trailer = data.Trailer;
          phim.dienvien = data.Dienvien;
          phim.ngonngu = data.Ngonngu;
          phim.quocgia = data.Quocgia;
          phim.tomtat = data.Tomtat;
          phim.daodien = data.Daodien;
          phim.thoiluong = data.Thoiluong;
          phim.ngaychieu = data.Ngaychieu;
          phim.nsx = data.Nsx;
          phim.trangthai = data.Trangthai;

          await phim.save();

          let ctloaiphim = await db.chitietloaiphims.findAll({
            where: {
              id_phim: data.id
            },
            raw: false,
          });
          console.log("Ád", ctloaiphim)
          if (ctloaiphim) {
            await db.chitietloaiphims.destroy({
              where: {
                id_phim: data.id
              },
            });
          }
          for (let index1 = 0; index1 < data.ArrCTLP.length; index1++) {
            await db.chitietloaiphims.create({
              id_phim: data.id,
              id_loaiphim: data.ArrCTLP[index1]
            });
          }
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin phim KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin phim thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTPhim = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let phim = await db.phims.findOne({
      where: {
        id: Id
      },
    });
    let ctloaiphim = await db.chitietloaiphims.findAll({
      where: {
        id_phim: Id
      },
      raw: false,
    });
    if (!phim) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy phim`,
      });
    }

    await db.phims.destroy({
      where: {
        id: Id
      },
    });
    if (ctloaiphim) {
      await db.chitietloaiphims.destroy({
        where: {
          id_phim: Id
        },
      });
    }

    resolve({
      errCode: 0,
      message: "Thông tin phim đã xóa",
    });
  });
};


let handleThemTTLoaiphim = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tenloai
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.loaiphims.create({
          tenloai: data.tenloai
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin loại phim thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin loại phim thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTLoaiphim = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tenloai ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let loaiphim = await db.loaiphims.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (loaiphim) {
          loaiphim.tenloai = data.tenloai
          await loaiphim.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin loại phim mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin loại phim mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTLoaiphim = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let loaiphim = await db.loaiphims.findOne({
      where: {
        id: Id
      },
    });

    if (!loaiphim) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy loại phim`,
      });
    }

    await db.loaiphims.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin loại phim đã xóa",
    });
  });
};


let handleThemTTSuatchieu = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.giobd ||
        !data.giokt

      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.suatchieus.create({
          giobatdau: data.giobd,
          gioketthuc: data.giokt
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin suất chiếu thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin suất chiếu KHÔNG thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTSuatchieu = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.giobd ||
        !data.giokt ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let suatchieu = await db.suatchieus.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (suatchieu) {
          suatchieu.giobatdau = data.giobd;
          suatchieu.gioketthuc = data.giokt;
          await suatchieu.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin suất chiếu KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin suất chiếu thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTSuatchieu = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let suatchieu = await db.suatchieus.findOne({
      where: {
        id: Id
      },
    });

    if (!suatchieu) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy suất chiếu`,
      });
    }

    await db.suatchieus.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin loại suất chiếu đã xóa",
    });
  });
};

let handleThemTTChieu = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.ngaychieu ||
        !data.giave ||
        !data.idr ||
        !data.idp ||
        !data.idsc

      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let ttchieu = await db.chieus.findOne({
          where: {
            ngaychieu: data.ngaychieu,
            id_rap: data.idr,
            id_suatchieu: data.idsc,
            // id_phim: data.idp
          },
          raw: false,
        })
        // if (ttchieu) {
        //   let ttsc = await db.suatchieus.findOne({
        //     where: {
        //       ngaychieu: data.ngaychieu,
        //       id_rap: data.idr,
        //       id_suatchieu: data.idsc,
        //       // id_phim: data.idpơ
        //     },
        //     raw: false,
        //   })
        // }
        console.log('ada', ttchieu)

        if (!ttchieu) {
          await db.chieus.create({
            ngaychieu: data.ngaychieu,
            giave: data.giave,
            id_rap: data.idr,
            id_suatchieu: data.idsc,
            id_phim: data.idp
          });

          resovle({
            errCode: 0,
            errMessage: "Thêm thông tin chiếu thành công",
          });
        } else {
          resovle({
            errCode: 111,
            errMessage: "Lịch chiếu trùng lặp",
          });
        }
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin chiếu thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTChieu = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.ngaychieu ||
        !data.giave ||
        !data.idr ||
        !data.idp ||
        !data.idsc ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let chieu = await db.chieus.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });

        let ttchieu = await db.chieus.findAll({
          where: {
            ngaychieu: data.ngaychieu,
            id_rap: data.idr,
            id_suatchieu: data.idsc,
            id_phim: data.idp
          },
          raw: false,

        })


        if (chieu && ttchieu.length === 0) {
          chieu.ngaychieu = data.ngaychieu;
          chieu.giave = data.giave;
          chieu.id_rap = data.idr;
          chieu.id_suatchieu = data.idsc;
          chieu.id_phim = data.idp;
          await chieu.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin chiếu KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin chiếu thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTChieu = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let chieu = await db.chieus.findOne({
      where: {
        id: Id
      },
    });

    if (!chieu) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy chiếu`,
      });
    }

    await db.chieus.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin loại chiếu đã xóa",
    });
  });
};

let handleThemTTDoan = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.Ten ||
        !data.Anhminhhoa ||
        !data.Loai ||
        !data.Mota ||
        !data.Gia ||
        !data.Size
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.doans.create({
          // id_KH: 5,
          ten: data.Ten,
          anhminhhoa: data.Anhminhhoa,
          loai: data.Loai,
          mota: data.Mota,
          gia: data.Gia,
          size: data.Size
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin đồ ăn thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin đồ ăn thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
let handleSuaTTDoan = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.Ten ||
        !data.Anhminhhoa ||
        !data.Loai ||
        !data.Mota ||
        !data.Gia ||
        !data.Size ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let doan = await db.doans.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (doan) {
          doan.ten = data.Ten;
          doan.anhminhhoa = data.Anhminhhoa;
          doan.loai = data.Loai;
          doan.mota = data.Gia;
          doan.size = data.Size;
          await doan.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin doan KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin doan thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTDoan = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let doan = await db.doans.findOne({
      where: {
        id: Id
      },
    });

    if (!doan) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy doans`,
      });
    }

    await db.doans.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin doan đã xóa",
    });
  });
};

let handleLayTTKhachhang = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let khachhang = "";
      if (key === "ALL") {
        khachhang = await db.khachhangs.findAll({});
      }

      if (key && key !== "ALL") {
        khachhang = await db.khachhangs.findAll({
          where: {
            Email_KH: key
          },
        });
      }
      resolve(khachhang);
    } catch (e) {
      reject(e);
    }
  });
};


let handleThemTTKhuyenmai = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.ten ||
        !data.tile ||
        !data.mota ||
        !data.dieukien ||
        !data.thoigianbatdau ||
        !data.thoigianketthuc
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.khuyenmais.create({
          // id_KH: 5,
          ten_KM: data.ten,
          tile_KM: data.tile,
          mota_KM: data.mota,
          dieukien_KM: data.dieukien,
          thoigianbatdau: data.thoigianbatdau,
          thoigianketthuc: data.thoigianketthuc
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin khuyenmais thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin khuyenmais thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
let handleSuaTTKhuyenmai = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.ten ||
        !data.tile ||
        !data.mota ||
        !data.dieukien ||
        !data.thoigianbatdau ||
        !data.thoigianketthuc ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let khuyenmai = await db.khuyenmais.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (khuyenmai) {
          khuyenmai.ten_KM = data.ten;
          khuyenmai.tile_KM = data.tile;
          khuyenmai.mota_KM = data.mota;
          khuyenmai.dieukien_KM = data.dieukien;
          khuyenmai.thoigianbatdau = data.thoigianbatdau;
          khuyenmai.thoigianketthuc = data.thoigianketthuc;

          await khuyenmai.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin khuyenmai KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin khuyenmai thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTKhuyenmai = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let khuyenmai = await db.khuyenmais.findOne({
      where: {
        id: Id
      },
    });

    if (!khuyenmai) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy khuyenmais`,
      });
    }

    await db.khuyenmais.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin khuyenmais đã xóa",
    });
  });
};


let handleLayTTNhanvien = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nhanvien = "";
      if (key === "ALL") {
        nhanvien = await db.nhanviens.findAll({});
      }

      if (key && key !== "ALL") {
        nhanvien = await db.nhanviens.findAll({
          where: {
            Email_NV: key
          },
        });
      }
      resolve(nhanvien);
    } catch (e) {
      reject(e);
    }
  });
};


let handleThemTTNhanvien = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_nv ||
        !data.sdt_nv ||
        !data.ngaysinh_nv ||
        !data.tuoi_nv ||
        !data.diachi_nv ||
        !data.gioitinh_nv ||
        !data.cccd_nv ||
        !data.chucvu_nv ||
        !data.taikhoan_nv ||
        !data.matkhau_nv
        // 0 === 1
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter nv",
        });
      } else {

        // await emailService.sendEmail('luongvukhoa572001@gmail.com')

        await db.nhanviens.create({
          Hten_NV: data.hten_nv,
          Sdt_NV: data.sdt_nv,
          Ngaysinh_NV: data.ngaysinh_nv,
          Tuoi_NV: data.tuoi_nv,
          Diachi_NV: data.diachi_nv,
          Gioitinh_NV: data.gioitinh_nv,
          Cccd_NV: data.cccd_nv,
          Chucvu_NV: data.chucvu_nv,
          Email_NV: data.taikhoan_nv,
          Matkhau_NV: data.matkhau_nv,
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin nhân viên thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin nhân viên thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
let handleSuaTTNhanvien = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_nv ||
        !data.sdt_nv ||
        !data.ngaysinh_nv ||
        !data.tuoi_nv ||
        !data.diachi_nv ||
        !data.gioitinh_nv ||
        !data.cccd_nv ||
        !data.chucvu_nv ||
        !data.taikhoan_nv ||
        !data.matkhau_nv ||
        data.email_nv ||
        !data.id
        // 0 === 1
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter nv",
        });
      } else {

        let nhanvien = await db.nhanviens.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (nhanvien) {
          nhanvien.Hten_NV = data.hten_nv;
          nhanvien.Sdt_NV = data.sdt_nv;
          nhanvien.Email_NV = data.email_nv;
          nhanvien.Ngaysinh_NV = data.ngaysinh_nv;
          nhanvien.Tuoi_NV = data.tuoi_nv;
          nhanvien.Diachi_NV = data.diachi_nv;
          nhanvien.Gioitinh_NV = data.gioitinh_nv;
          nhanvien.Cccd_NV = data.cccd_nv;
          nhanvien.Chucvu_NV = data.chucvu_nv;
          nhanvien.Email_NV = data.taikhoan_nv,
            nhanvien.Matkhau_NV = data.matkhau_nv,

            await nhanvien.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin nhân viên KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin nhân viên thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTNhanvien = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let nhanvien = await db.nhanviens.findOne({
      where: {
        id: Id
      },
    });

    if (!nhanvien) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy nhân viên`,
      });
    }

    await db.nhanviens.destroy({
      where: {
        id: Id
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin nhân viên đã xóa",
    });
  });
};

let handleLayTTVe_idKH = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ve = "";
      if (key === "ALL") {
        ve = await db.ves.findAll({

        });
      }

      if (key && key !== "ALL") {
        ve = await db.ves.findAll({
          where: {
            id_KH: key
          },
        });
      }
      resolve(ve);
    } catch (e) {
      reject(e);
    }
  });
};


let handleThongke_ngay = (key) => {
  return new Promise(async (resolve, reject) => {
    try {

      let tk_ngay = await db.ves.findAll({
        attributes: [
          'id',
          // exclude: ['tongtien'],
          [Sequelize.fn('SUM', Sequelize.col('Tongtien')), 'total_amount']

        ],
        include: [{
          model: db.chieus,
        }, ],
        group: ['chieu.ngaychieu'],
        raw: true,
        nest: true
      });

      resolve(tk_ngay);
    } catch (e) {
      reject(e);
    }
  });
};

let handleThongke_phim = (key) => {
  return new Promise(async (resolve, reject) => {
    try {

      let tk_ngay = await db.ves.findAll({
        attributes: [
          'id',
          // exclude: ['tongtien'],
          [Sequelize.fn('SUM', Sequelize.col('Tongtien')), 'total_amount']

        ],
        include: [{
          model: db.chieus,
          attributes: [
            'id',
            // exclude: ['tongtien'],
            [Sequelize.fn('SUM', Sequelize.col('Tongtien')), 'total_amount']

          ],
          include: [{
            model: db.phims,
          }, ],
        }, ],
        group: ['chieu.id_phim'],
        raw: true,
        nest: true
      });

      resolve(tk_ngay);
    } catch (e) {
      reject(e);
    }
  });
};

let handleThongke_cumrap = (key) => {
  return new Promise(async (resolve, reject) => {
    try {

      let tk_ngay = await db.ves.findAll({
        // where: {
        //   id: key
        // },
        attributes: [
          'id',
          // '',
          // exclude: ['tongtien'],
          // [Sequelize.fn('sum', Sequelize.col('db.ves.tongtien')), 'total_amount'],
          [Sequelize.fn('SUM', Sequelize.col('Tongtien')), 'total_amount']

        ],
        include: [{
            model: db.qlcumraps,
            // attributes: []

          },
          // {model:db.Periods, attributes:['DisplayLabel']},
          // {model:db.Subjects, attributes:['Name']}   
        ],
        group: ['qlcumrap.id'],
        // group: ['CustomerAccount.uuid']
        raw: true,
        nest: true
      });

      resolve(tk_ngay);
    } catch (e) {
      reject(e);
    }
  });
};
let handleThongke_thang = (key) => {
  return new Promise(async (resolve, reject) => {
    try {

      let tk_ngay = await db.ves.findAll({
        attributes: [
          'id',
          // exclude: ['tongtien'],
          [Sequelize.fn("MONTH", db.sequelize.col("chieu.ngaychieu")), "month"],

          [Sequelize.fn('SUM', Sequelize.col('Tongtien')), 'total_amount']

        ],
        include: [{
          model: db.chieus,
        }, ],
        group: ['month'],
        raw: true,
        nest: true
      });

      resolve(tk_ngay);
    } catch (e) {
      reject(e);
    }
  });
};
let handleThongke_tuan = (key) => {
  return new Promise(async (resolve, reject) => {
    try {

      let tk_ngay = await db.ves.findAll({
        attributes: [
          'id',
          // exclude: ['tongtien'],
          [Sequelize.fn('WEEKOFYEAR', db.sequelize.col('chieu.ngaychieu')), "week"],

          [Sequelize.fn('SUM', Sequelize.col('Tongtien')), 'total_amount']

        ],
        include: [{
          model: db.chieus,
        }, ],
        group: ['week'],
        raw: true,
        nest: true
      });

      resolve(tk_ngay);
    } catch (e) {
      reject(e);
    }
  });
};

let handleLayTTRap = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rap = "";
      if (key === "ALL") {
        rap = await db.raps.findAll({

        });
      }

      if (key && key !== "ALL") {
        rap = await db.raps.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(rap);
    } catch (e) {
      reject(e);
    }
  });
};
let handleLayTTChieu_idc = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chieu = "";
      if (key === "ALL") {
        chieu = await db.chieus.findAll({

        });
      }

      if (key && key !== "ALL") {
        chieu = await db.chieus.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(chieu);
    } catch (e) {
      reject(e);
    }
  });
};
let handleLayTTDoan_idve = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitietdoan = "";
      if (key === "ALL") {
        chitietdoan = await db.chitietdoans.findAll({

        });
      }

      if (key && key !== "ALL") {
        chitietdoan = await db.chitietdoans.findAll({
          where: {
            id_ve: key
          },
        });
      }
      resolve(chitietdoan);
    } catch (e) {
      reject(e);
    }
  });
};

let handleLayTTKhuyenmai = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let khuyenmai = "";
      if (key === "ALL") {
        khuyenmai = await db.khuyenmais.findAll({

        });
      }

      if (key && key !== "ALL") {
        khuyenmai = await db.khuyenmais.findAll({
          where: {
            id: key
          },
        });
      }
      resolve(khuyenmai);
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaCTDoan = async (id_ve) => {
  return new Promise(async (resolve, reject) => {
    let ctdoan = await db.chitietdoans.findOne({
      where: {
        id_ve: id_ve
      },
    });

    if (!ctdoan) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy Chi tiet do an`,
      });
    }

    await db.chitietdoans.destroy({
      where: {
        id_ve: id_ve
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin nChi tiet do an đã xóa",
    });
  });
};
let handleXoaCTVe = async (id_ve) => {
  return new Promise(async (resolve, reject) => {
    let ctve = await db.chitietves.findOne({
      where: {
        id_ve: id_ve
      },
    });

    if (!ctve) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy Chi tiet do ve`,
      });
    }

    await db.chitietves.destroy({
      where: {
        id_ve: id_ve
      },
    });

    resolve({
      errCode: 0,
      message: "Thông tin nChi tiet do ve đã xóa",
    });
  });
};

let handleHuyVe = async (id_ve) => {
  return new Promise(async (resolve, reject) => {
    let ctve = await db.chitietves.findAll({
      where: {
        id_ve: id_ve
      },
      raw: false
    });

    let ctda = await db.chitietdoans.findAll({
      where: {
        id_ve: id_ve
      },
      raw: false
    });

    let ve = await db.ves.findOne({
      where: {
        id: id_ve
      },
      raw: false
    });
    let khachhang = await db.khachhangs.findOne({
      where: {
        id: ve.id_KH
      },
      raw: false
    });
    if (khachhang) {
      khachhang.Diemtichluy_KH = khachhang.Diemtichluy_KH - (ve.Tongtien * 1) / 100
      await khachhang.save()
    }
    if (ve) {
      await db.chitietves.destroy({
        where: {
          id_ve: id_ve
        },
      });
      await db.chitietdoans.destroy({
        where: {
          id_ve: id_ve
        },
      });
      await db.ves.destroy({
        where: {
          id: id_ve
        },
      });


      emailService.sendEmail(khachhang.Email_KH, "Thông báo hủy vé xem phim ",
        `<h1>Xin chào ${khachhang.Hten_KH}, </h1>
        <h3>Vé của bạn đã được hủy. Tiền đã được hoàn về số tài khoản thanh toán khi đặt</h3>

        `)
    } else {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy Chi tiet do ve`,
      });
    }



    resolve({
      errCode: 0,
      message: "Thông tin nChi tiet do ve đã xóa",
    });
  });
};


let handleSendmail = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (

        !data.email
        // 0 === 1
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter email",
        });
      } else {

        // await emailService.sendEmail(data.email)

        bcrypt.hash(data.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
          console.log(`${process.env.APP_URL}/verify?email=${data.email}&token=${hashedEmail}`);
          emailService.sendEmail(data.email, "Verify Email", `<a href="${process.env.URL_REACT}/api/verify?email=${data.email}&token=${hashedEmail}"> Verify </a>`)
        });
      }

      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin nhân viên thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleVerify = (email, token) => {
  return new Promise(async (resovle, reject) => {
    try {
      bcrypt.compare(email, token, async (err, result) => {
        console.log(email)
        if (result == true) {
          await handleUpdateVerifyEmail(email)
          resovle({
            errCode: 0,
            errMessage: "Xác nhận email thành công",
          });
        } else {
          resovle({
            errCode: 1,
            errMessage: "Xác nhận email không thành công",
          });
        }
      })
      resovle({
        errCode: 0,
        errMessage: "Xác nhận email thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleUpdateVerifyEmail = (email) => {
  return new Promise(async (resovle, reject) => {
    try {
      let khachhang = await db.khachhangs.findOne({
        where: {
          Email_KH: '?' + email,
        },
        raw: false,

      })

      if (khachhang) {
        console.log("email", khachhang.Email_KH)

        khachhang.Email_KH = email
        await khachhang.save()
      }
      // redirect('http://localhost:3000/login')

      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin nhân viên thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleQuenMatKhau = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (

        !data.email
        // 0 === 1
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter nv",
        });
      } else {

        let kh = await db.khachhangs.findOne({
          where: {
            Email_KH: data.email
          },
          raw: false,
        });
        if (kh) {
          bcrypt.hash(data.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
            console.log(`${process.env.APP_URL}/verify?email=${data.email}&token=${hashedEmail}`);
            emailService.sendEmail(data.email, "Xác nhận email để cập nhật mật khẩu ", `<a href="${process.env.URL_REACT}/api/verifyQuenmk?email=${data.email}&token=${hashedEmail}"> Ấn vào đây để xác nhận email </a>`)
          });
        } else {
          resovle({
            errCode: 1,
            errMessage: "Tài khoản không tồn tại",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Đã gửi email xác nhận",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let handleverifyQuenmk = (email, token) => {
  return new Promise(async (resovle, reject) => {
    try {
      bcrypt.compare(email, token, async (err, result) => {
        console.log(email)
        if (result == true) {
          // await handleUpdateMatkhau(email)
          resovle({
            errCode: 0,
            errMessage: "Xác nhận email thành công",
          });
        } else {
          resovle({
            errCode: 1,
            errMessage: "Xác nhận email không thành công",
          });
        }
      })
      resovle({
        errCode: 0,
        errMessage: "Xác nhận email thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleUpdateMatkhau = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      let khachhang = await db.khachhangs.findOne({
        where: {
          // Email_KH: '?' + email ||
          Email_KH: data.email
        },
        raw: false,

      })

      if (khachhang) {
        // console.log("email", khachhang.Email_KH)

        khachhang.Matkhau_KH = data.matkhau
        await khachhang.save()
      } else {
        resovle({
          errCode: 1,
          errMessage: "Cập nhật mật khẩu Không thành công",
        });
      }
      // redirect('http://localhost:3000/login')

      resovle({
        errCode: 0,
        errMessage: "Cập nhật mật khẩu thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
let handleKiemtrataikhoan = (email) => {
  return new Promise(async (resolve, reject) => {
    try {

      let khachhang = await db.khachhangs.findOne({
        where: {
          // Hten_KH: data.hten_KH,
          Email_KH: email,
          // Sdt_KH: data.sdt_KH,
        },
      });
      let khachhang1 = await db.khachhangs.findOne({
        where: {
          // Hten_KH: data.hten_KH,
          Email_KH: '?' + email,
          // Sdt_KH: data.sdt_KH,
        },
      });
      if (khachhang || khachhang1) {
        resolve({
          errCode: 1,
          errMessage: "Email đã được dùng ở tài khoản khác",
        });
      } else {
        bcrypt.hash(email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
          console.log(`${process.env.APP_URL}/verify?email=${email}&token=${hashedEmail}`);
          emailService.sendEmail(email, "Verify Email", `<a href="${process.env.URL_REACT}/api/verify?email=${email}&token=${hashedEmail}"> Ấn vào đây để xác nhận email </a>`)
        });
        resolve({
          errCode: 0,
          errMessage: "okii",
        });
      }

      resolve(e);
    } catch (e) {
      reject(e);
    }
  });
};

let handleCapnhatTTCanhan = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (

        !data.id
        // 0 === 1
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter nv",
        });
      } else {

        let khachhang = await db.khachhangs.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (khachhang) {
          khachhang.Hten_KH = data.hten_kh;
          khachhang.Sdt_KH = data.sdt_kh;
          khachhang.Email_KH = data.email_kh;
          khachhang.Ngaysinh_KH = data.ngaysinh_kh;
          // khachhang.Tuoi_KH = data.tuoi_kh;
          khachhang.Diachi_KH = data.diachi_kh;
          khachhang.Gioitinh_KH = data.gioitinh_kh;
          khachhang.Cccd_KH = data.cccd_kh;
          // khachhang.Mathethanhvien_KH = data.chucvu_kh;
          // khachhang.Diemtichluy_KH= data.taikhoan_kh,
          // khachhang.Matkhau_KH = data.matkhau_kh,

          await khachhang.save();
        } else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin khách hàng KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin khách hàng thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSearch = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let timkiem = await db.phims.findAll({
        // include: [{
        //   model: db.loaiphims,
        // }, ],

        where: {
          [Op.or]: [{
              tenphim: {
                [Op.like]: `%${keyword}%`
              }
            },
            {
              dienvien: {
                [Op.like]: `%${keyword}%`
              }
            },
            {
              daodien: {
                [Op.like]: `%${keyword}%`
              }
            },
            {
              nsx: {
                [Op.like]: `%${keyword}%`
              }
            },
            // {
            //   loai: {
            //     [Op.like]: `%${keyword}%`
            //   }
            // },
            // { dienvien: { [Op.like]: `%${keyword}%` } },
            // { daodien: { [Op.like]: `%${keyword}%` } },
          ],
        },
        raw: true,
        nest: true
      });
      resolve(timkiem);
    } catch (e) {
      reject(e);
    }
  });
};


let handleLaybinhluan = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let binhluan = "";
      if (key === "ALL") {
        binhluan = await db.danhgias.findAll({

        });
      }

      if (key && key !== "ALL") {
        binhluan = await db.danhgias.findAll({
          where: {
            id_phim: key
          },
        });
      }
      resolve(binhluan);
    } catch (e) {
      reject(e);
    }
  });
};


let handleThembinhluan = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.sosao ||
        !data.noidung ||
        !data.id_kh ||
        !data.id_phim
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter nv",
        });
      } else {

        await db.danhgias.create({
          noidung: data.noidung,
          sosao: data.sosao,
          id_KH: data.id_kh,
          id_phim: data.id_phim,
        });

        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin khách hàng thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  handleThembinhluan: handleThembinhluan,
  handleLaybinhluan: handleLaybinhluan,
  handleSearch: handleSearch,
  handleCapnhatTTCanhan: handleCapnhatTTCanhan,
  handleDangnhap: handleDangnhap,
  handleDangky: handleDangky,
  handleDatve: handleDatve,
  handleCapnhatTTve: handleCapnhatTTve,
  handleTTchitietve: handleTTchitietve,
  handleTTGhe: handleTTGhe,
  handleTTChieu: handleTTChieu,
  handleTTKM: handleTTKM,
  handleTTDoan: handleTTDoan,
  handleLayTTPhim: handleLayTTPhim,
  handleTest: handleTest,
  // handleThemTTGhe: handleThemTTGhe,
  handleTTCumrap: handleTTCumrap,
  handleTTSuatchieu: handleTTSuatchieu,
  handleTTRap_idcumrap: handleTTRap_idcumrap,
  handleTTGhe_idrap: handleTTGhe_idrap,
  handleTTVe_idchieu: handleTTVe_idchieu,
  handleTTLoaiphim: handleTTLoaiphim,
  handleThemTTCumrap: handleThemTTCumrap,
  handleSuaTTCumrap: handleSuaTTCumrap,
  handleXoaTTCumrap: handleXoaTTCumrap,
  handleThemTTRap: handleThemTTRap,
  handleSuaTTRap: handleSuaTTRap,
  handleXoaTTRap: handleXoaTTRap,
  handleThemTTGhe: handleThemTTGhe,
  handleSuaTTGhe: handleSuaTTGhe,
  handleXoaTTGhe: handleXoaTTGhe,
  handleThemTTPhim: handleThemTTPhim,
  handleSuaTTPhim: handleSuaTTPhim,
  handleXoaTTPhim: handleXoaTTPhim,
  handleThemTTLoaiphim: handleThemTTLoaiphim,
  handleSuaTTLoaiphim: handleSuaTTLoaiphim,
  handleXoaTTLoaiphim: handleXoaTTLoaiphim,
  handleThemTTSuatchieu: handleThemTTSuatchieu,
  handleSuaTTSuatchieu: handleSuaTTSuatchieu,
  handleXoaTTSuatchieu: handleXoaTTSuatchieu,
  handleThemTTChieu: handleThemTTChieu,
  handleSuaTTChieu: handleSuaTTChieu,
  handleXoaTTChieu: handleXoaTTChieu,
  handleThemTTDoan: handleThemTTDoan,
  handleSuaTTDoan: handleSuaTTDoan,
  handleXoaTTDoan: handleXoaTTDoan,
  handleLayTTKhachhang: handleLayTTKhachhang,
  handleLayTTCTLoaiphim_idP: handleLayTTCTLoaiphim_idP,
  handleThemTTKhuyenmai: handleThemTTKhuyenmai,
  handleSuaTTKhuyenmai: handleSuaTTKhuyenmai,
  handleXoaTTKhuyenmai: handleXoaTTKhuyenmai,
  handleLayTTNhanvien: handleLayTTNhanvien,
  handleThemTTNhanvien: handleThemTTNhanvien,
  handleSuaTTNhanvien: handleSuaTTNhanvien,
  handleXoaTTNhanvien: handleXoaTTNhanvien,
  handleLayTTVe_idKH: handleLayTTVe_idKH,
  handleLayTTRap: handleLayTTRap,
  handleLayTTChieu_idc: handleLayTTChieu_idc,
  handleLayTTDoan_idve: handleLayTTDoan_idve,
  handleLayTTKhuyenmai: handleLayTTKhuyenmai,
  handleXoaCTDoan: handleXoaCTDoan,
  handleXoaCTVe: handleXoaCTVe,
  handleSendmail: handleSendmail,
  handleVerify: handleVerify,
  handleUpdateVerifyEmail: handleUpdateVerifyEmail,
  handleQuenMatKhau: handleQuenMatKhau,
  handleverifyQuenmk: handleverifyQuenmk,
  handleUpdateMatkhau: handleUpdateMatkhau,
  handleHuyVe: handleHuyVe,
  handleThongke_ngay: handleThongke_ngay,
  handleThongke_phim: handleThongke_phim,
  handleThongke_cumrap: handleThongke_cumrap,
  handleThongke_thang: handleThongke_thang,
  handleThongke_tuan: handleThongke_tuan,
  handleKiemtrataikhoan: handleKiemtrataikhoan,


};