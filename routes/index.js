var express = require('express');
var router = express.Router();
var fs = require('fs')

var db = 'mongodb+srv://admin:VZg4GvN9dEoEufIY@cluster0.svz3x.mongodb.net/mydata?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
    console.log("co loi xay ra")
});

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = [0, 5, 4, 3, 6, 4, 7, 6, 5, 4];

    var student = {name: 'Quan', sinhNhat: '2022', address: 'Ha Noi city'}

    res.render('index', {
        title: 'Express', name: 'Huy Nguyen',
        mang: data, sinhVien: student
    });

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

// viết câu lệnh thêm vào collection - students - database - mydata

// bước 1 : định nghĩa Schema - tương đương với model bên Java
const studentSchema = new mongoose.Schema({
    email: 'string',
    content: 'string'
});
// students : là tên của collection tạo phía trang mongoDB ban nãy
const Student = mongoose.model('students', studentSchema);

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
    let xoa = await Student.findOneAndDelete(filter, function (error) {
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
router.post('/delete', function (req, res) {
    var email = req.body.email;
    fs.unlink('files/' + email + '.text', function (err) {
        res.render('about', {
            title: 'About',
            message: err
        })
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


module.exports = router;
