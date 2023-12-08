/**
 * Created by CTT VNPAY
 */



let express = require('express');
let router = express.Router();
let $ = require('jquery');
const request = require('request');
const moment = require('moment');
const {
    randomInt
} = require('crypto');


router.get('/', function (req, res, next) {
    res.render('../views/error.jade', {
        title: 'Danh sách đơn hàng'
    })
});

router.get('/create_payment_url', function (req, res, next) {
    res.render('../views/order.jade', {
        title: 'Tạo mới đơn hàng',
        amount: req.query.keyword
    })
});

router.get('/querydr', function (req, res, next) {

    let desc = 'truy van ket qua thanh toan';
    res.render('../views/querydr.jade', {
        title: 'Truy vấn kết quả thanh toán'
    })
});

router.get('/refund', function (req, res, next) {

    let desc = 'Hoan tien GD thanh toan';
    res.render('../views/refund.jade', {
        title: 'Hoàn tiền giao dịch thanh toán'
    })
});


router.post('/create_payment_url', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let config = require('config');

    let tmnCode = 'DO4KCUCZ';
    let secretKey = 'GXEXVMCPYVXIBPUAPVARKUCBKYJWSUAB';
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    // let vnpUrl = 'http://localhost:3000/';
    let returnUrl = `http://localhost:3000/thanhtoan/`;
    let orderId = randomInt(0, 9999);
    // let amount = 1000 * 100;
    // let bankCode = 'NCB';
    let amount = req.body.amount;
    // let bankCode = req.body.bankCode;
    let bankCode = 'VNBANK';

    let locale = 'vn'
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ve:' + orderId;
    // vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_OrderType'] = 'billpayment';

    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, {
        encode: false
    });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, {
        encode: false
    });

    res.redirect(vnpUrl)
    // return res.status(200).json({
    //     errCode: 0,
    //     errMessage: "ok",
    //     vnp_Params,
    //   });
});

router.get('/vnpay_return', function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let tmnCode = 'DO4KCUCZ';
    let secretKey = 'GXEXVMCPYVXIBPUAPVARKUCBKYJWSUAB';

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, {
        encode: false
    });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('../views/success.jade', {
            code: vnp_Params['vnp_ResponseCode']
        })
    } else {
        res.render('../views/success.jade', {
            code: '97'
        })
    }
});

router.get('/vnpay_ipn', function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let config = require('config');
    let secretKey = 'GXEXVMCPYVXIBPUAPVARKUCBKYJWSUAB';
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, {
        encode: false
    });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) { //kiểm tra checksum
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus == "0") { //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                    if (rspCode == "00") {
                        //thanh cong
                        //paymentStatus = '1'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                        res.status(200).json({
                            RspCode: '00',
                            Message: 'Success'
                        })
                    } else {
                        //that bai
                        //paymentStatus = '2'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                        res.status(200).json({
                            RspCode: '00',
                            Message: 'Success'
                        })
                    }
                } else {
                    res.status(200).json({
                        RspCode: '02',
                        Message: 'This order has been updated to the payment status'
                    })
                }
            } else {
                res.status(200).json({
                    RspCode: '04',
                    Message: 'Amount invalid'
                })
            }
        } else {
            res.status(200).json({
                RspCode: '01',
                Message: 'Order not found'
            })
        }
    } else {
        res.status(200).json({
            RspCode: '97',
            Message: 'Checksum failed'
        })
    }
});

router.post('/querydr', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let config = '/src/configs/default.json'
    let crypto = require("crypto");

    let vnp_TmnCode = 'DO4KCUCZ';
    let secretKey = 'GXEXVMCPYVXIBPUAPVARKUCBKYJWSUAB';
    // let vnp_Api = config.get('vnp_Api');
    let vnp_Api = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";


    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'querydr';
    let vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let currCode = 'VND';
    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };
    // /merchant_webapi/api/transaction
    request({
        url: vnp_Api,
        method: "POST",
        json: true,
        body: dataObj
    }, function (error, response, body) {
        console.log(response)

        return res.status(200).json({
            // errCode: response.vnp_ResponseCode,
            // message: response.message,
            response,
        })

    });

});

router.post('/refund', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let config = require('config');
    let crypto = require("crypto");

    let vnp_TmnCode = 'DO4KCUCZ';
    let secretKey = 'GXEXVMCPYVXIBPUAPVARKUCBKYJWSUAB';
    let vnp_Api = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;
    let vnp_Amount = req.body.amount * 100;
    let vnp_TransactionType = req.body.transType;
    let vnp_CreateBy = req.body.user;

    let currCode = 'VND';

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'refund';
    let vnp_OrderInfo = 'Hoan tien ve co ma GD:' + vnp_TxnRef;

    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let vnp_TransactionNo = '0';

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TransactionType + "|" + vnp_TxnRef + "|" + vnp_Amount + "|" + vnp_TransactionNo + "|" + vnp_TransactionDate + "|" + vnp_CreateBy + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TransactionType': vnp_TransactionType,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_Amount': vnp_Amount,
        'vnp_TransactionNo': vnp_TransactionNo,
        'vnp_CreateBy': vnp_CreateBy,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };

    request({
        url: vnp_Api,
        method: "POST",
        json: true,
        body: dataObj
    }, function (error, response, body) {
        return res.status(200).json({
            // errCode: 0,
            // message: "Hoàn tiền thành công",
            response
        })
    });

});

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = router;