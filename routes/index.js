var express = require('express');
var router = express.Router();
var fs = require('fs')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({
    storage: storage, limits: {
        fileSize: 1 * 1024
    }
}).single('avatar');

var db = 'mongodb+srv://admin:i6bkzeGwmfoZqsI5@cluster0.wg9fr.mongodb.net/student?retryWrites=true&w=majority'

// trả về file giao diện đăng kí
router.get('/register', function (req, res) {
    res.render('register', {message: ''})
})

// đón dữ liệu file từ form html
router.post('/register', function (req, res) {
    // đổi tên file
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.render('register', {message: err.message})
        } else {
            res.render('register', {message: 'Thành công!!!!'})
        }
    })
})

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = [0, 5, 4, 3, 6, 4, 7, 6, 5, 4];

    var student = {name: 'Quan', sinhNhat: '2022', address: 'Ha Noi city'}

    res.render('index', {
        title: 'Express', name: 'Huy Nguyen',
        mang: data, sinhVien: student
    });
});

var db = 'mongodb+srv://admin:i6bkzeGwmfoZqsI5@cluster0.wg9fr.mongodb.net/student?retryWrites=true&w=majority'

//var dbb = 'mongodb+srv://admin:Iyo6tI9V69oy1oft@cluster0.tze35.mongodb.net/mydata?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
    console.log("co loi xay ra" + error)
});

router.get('/asia', function (req, res, next) {

    var name = "Huy Nguyen"

    var tuoi = 8

    var array = [6, 54, 4, 4, 5, 6, 4, 3, 34, 5, 4, 3]

    var sinhVien = {name: 'Huy Nguyen', sdt: '091345678'}

    var danhSach = [
        {name: 'Huy Nguyen', sdt: '091345678'},
        {name: 'Huy Nguyen', sdt: '091345678'},
        {name: 'Huy Nguyen', sdt: '091345678'},
        {name: 'Huy Nguyen', sdt: '091345678'}
    ]

    var thongTin = {
        name: 'Huy Nguyen', sdt: '091345678',
        danhSach: [
            {name: 'Huy Nguyen', sdt: '091345678'},
            {name: 'Huy Nguyen', sdt: '091345678'},
            {name: 'Huy Nguyen', sdt: '091345678'},
            {name: 'Huy Nguyen', sdt: '091345678'}
        ]
    }
    res.render('category', {
        title: 'Asia', message: '', name: name, tuoi: tuoi, array: array, sinhVien: sinhVien, danhSach: danhSach
        , thongTin: thongTin
    });

});
router.get('/euro', function (req, res, next) {
    res.render('category', {title: 'Euro', message: ''});
});

router.get('/america', function (req, res, next) {
    res.render('category', {title: 'America', message: ''});
});

router.get('/about', function (req, res, next) {
    res.render('about', {title: 'About', message: ''});
});
router.get('/hot-view', function (req, res, next) {
    // biến bình thường
    var diaChi = 'Ha Noi - Nam Tu Liem - 19 To Huu'

    // biến kiểu array
    var mang = [5, 3, 6, 7, 5, 3, 3, 5, 6, 7, 7]

    // biến kiểu object
    var sinhVien = {name: 'Huy Nguyen', sinhNhat: '08092022', sdt: '0913360468'}

    // biến kiểu array các object
    var danhSach = [{name: 'Huy Nguyen 1', sinhNhat: '08092022444', sdt: '0913360468'},
        {name: 'Huy Nguyen 2', sinhNhat: '08092022444', sdt: '0913360468'},
        {name: 'Huy Nguyen 3', sinhNhat: '08092022555', sdt: '0913360468'},
        {name: 'Huy Nguyen 4', sinhNhat: '08092022555', sdt: '0913360468'},
        {name: 'Huy Nguyen 5', sinhNhat: '080920223333', sdt: '0913360468'}]

    // biến kiểu kết hợp
    var thongTin = {
        name: 'Huy Nguyen',
        yeuThich: 'laptop',
        danhSachBanGai: [
            {name: 'Huy Nguyen 1', sinhNhat: '08092022444', sdt: '0913360468'},
            {name: 'Huy Nguyen 2', sinhNhat: '08092022444', sdt: '0913360468'},
            {name: 'Huy Nguyen 3', sinhNhat: '08092022555', sdt: '0913360468'},
            {name: 'Huy Nguyen 4', sinhNhat: '08092022555', sdt: '0913360468'},
            {name: 'Huy Nguyen 5', sinhNhat: '080920223333', sdt: '0913360468'}
        ]
    }
    res.render('hot', {
        title: 'Hot', diaChi: diaChi, mang: mang, sinhVien: sinhVien, danhSach: danhSach,
        thongTin: thongTin
    });
});

/*// viết câu lệnh thêm vào collection - students - database - mydata

// bước 1 : định nghĩa Schema - tương đương với model bên Java
const studentSchema = new mongoose.Schema({
    email: 'string',
    content: 'string'
});
// students : là tên của collection tạo phía trang mongoDB ban nãy
const Student = mongoose.model('students', studentSchema);*/

router.post('/support', async function (req, res) {
    // lấy tham số ra
    var email = req.body.email;
    var content = req.body.content;
    // in ra log để kiểm tra
    console.log(email)
    console.log(content)

    // bước 2 : gọi câu lệnh thêm vào database
    const data = new Student({
        email: email,
        content: content
    });

    data.save(function (err) {
        if (err) return handleError(err);
        res.render('about', {
            title: 'About',
            message: 'Chúng tôi đã nhận thông tin'
        })

    });

// câu lệnh cập nhật
    const filter = {email: email};
    const update = {content: content};
    let ketqua = await Student.findOneAndUpdate(filter, update, {
        new: true
    });

// câu lệnh xóa
    let xoa = await Student.deleteOne(filter, function (error) {
        console.log(error)
        console.log("xoa thành công")
    })


});

router.get('/all', function (req, res) {

    // lấy danh sách students
    Student.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.render('all', {data: data})
    })

})

router.get('/getAll', function (req, res) {

    // lấy danh sách students
    Student.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.send(data)
    })

})







router.get('/getAllForMobile', function (req, res) {

    // lấy danh sách students
    Student.find({}, function (err, data) {
        // trả về 1 file ejs.
        res.send(data)
    })

})


router.get('/allMobile', function (req, res) {

    // lấy danh sách students
    Student.find({}, function (err, data) {
        res.send(data)
    })

})

router.post('/deleteMobile', function (req, res) {
    var email = req.body.email;
    fs.unlink('files/' + email + '.text', function (err) {
        var data = {
            code : '200',
            message : 'OK',
            error : err.message
        }
        res.send(data)
    });
})
router.post('/delete', function (req, res) {
    var email = req.body.email;
    fs.unlink('files/' + email + '.text', function (err) {
        res.render('about', {
            title: 'About',
            message: err
        })
    });
})

router.post('/deleteForMobile', function (req, res) {
    var email = req.body.email;
    fs.unlink('files/' + email + '.text', function (err) {
        var data = {
            code : 200,
            error:  err.message
        }
        res.send(data);
    });
})

router.post('/test', function (request
    , response) {

    var email = request.body.email;
    var content = request.body.content;

    fs.unlink('myFile/' + email + '.txt', function (error) {
        if (error) {
            response.render('hot',
                {message: error})
        } else
            response.render('hot',
                {message: 'Chúng tôi đã nhận phản hồi'})
    })
});


var fs = require('fs')

router.post('/hotro', function (request,
                                response) {
    var email = request.body.email
    var noidung = request.body.noidung

    fs.writeFile('luutru/' + email + '.txt', noidung, function (error) {
        var message = ''
        if (error) {
            message = error
        } else {
            message = "OK, chung toi da nhan phan hoi"
        }
        response.render('category', {title: 'OK', message: message})
    })


});

router.get('/photos', function (request, response) {

    response.render('photos')
})

// b1 : định nghĩa Schema - model
var studentSch = new mongoose.Schema({
    email: 'string',
    name: 'string',
    sdt: 'string'
});
// b2 : khai báo Schema với thư viện mongosee
var Student = mongoose.model('student', studentSch);

router.post('/student', function (request, response) {

    var email = request.body.email;
    var ten = request.body.name;
    var sdt = request.body.sdt;

    console.log(email + ten + sdt);

    const data = new Student({
        email: email,
        name: ten,
        sdt: sdt
    });
    data.save(function (error) {
        var mes;
        if (error == null) {
            mes = 'Them thanh cong'
            console.log('them thanh cong')
        } else mes = error
        response.render('photos', {message: mes})
    })

    // lấy danh sách
    Student.find({}, function (err, data) {

        response.render('photos', {data: data})

    })
    // xóa
    Student.deleteOne({_id: ''}, function (error) {

    })

    // sửa
    Student.updateOne({_id: ''}, {email: 'ABC@gmail.com', name: 'AAAAAAA'}, function (error) {

    })


})
router.get('/cars', function (req, res) {
    Car.find({}, function (err, data) {
        res.render('cars', {duLieu: data})
    })
})
// buoc 1 : khoi tao khung - Schema
var carSchema = new mongoose.Schema({
    maXe: 'string',
    giaXe: 'string'
})
// buoc 2 : lien ket Schema vs mongoDB qua mongoose
var Car = mongoose.model('car', carSchema);

router.post('/addCar', function (req, res) {
    var maXe = req.body.maXe
    var giaXe = req.body.giaXe
    // b3 : khởi tạo Car vs giá trị lấy được
    const car = new Car({
        maXe: maXe,
        giaXe: giaXe
    })
    car.save(function (error) {
        var mess;
        if (error == null) {
            mess = 'Them thanh cong'
        } else {
            mess = error
        }
        console.log(maXe + giaXe)
        res.render('cars')
    })


    Car.deleteOne({_id: '623ed30e9241476c955a209c'}, function (error) {

    })

    Car.updateOne({_id: '623ed30e9241476c955a209c'}, {maXe: '11111', giaXe: 'bnmbnmbnmbn'}, function (error) {

    })

})

const multer1 = require('multer')

var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var random = Math.random();
        cb(null, random + Date.now() + file.originalname);
    },
});

var upload1 = multer1({
    storage: storage1, limits: {
        fileSize: 1 * 1024 // giới hạn file up lên là 1MB
    }
}).array('avatar',12);

router.get('/upload', function (req, res) {
    res.render('upload', {message: ''})
})

router.post('/upload', function (req, res) {
    upload1(req, res, function (err) {
        if (err) {
            res.render('upload', {message: err.message})
        } else {
            res.render('upload', {message: 'Tải file thành công!!!'})
        }
    })
})
module.exports = router;
