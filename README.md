# NodeJS + Express + MongoDB Template

<b>Ini adalah template preferensi yang saya gunakan untuk proyek NodeJS, Express, dan MongoDB. Template ini dirancang dengan struktur yang mudah dipahami dan siap digunakan untuk pengembangan aplikasi backend.</b>

---

## Cara Memulai (Instalasi)
* git clone https://github.com/bintang-bintang/be-coffee-ukk.git
* cd be-coffee-ukk
* npm install
<br/>

Jangan lupa : <br/:
1. ketik "git remote remove origin"
2. ketik "rm -rf .git"
3. Pastikan untuk mengatur file .env yang sudah di-ignore di .gitignore.
<br/>

Terdapat beberapa dependencies yang saya gunakan di dalam template ini, antara lain: <br/:
1. mongoose "database mongodb"
2. nodemon "refresh otomatis saat ada perubahan file"
3. express "framework untuk membuat server dan API"
4. cors "untuk mengizinkan akses API dari domain lain"
5. express-validator "validasi dari input user"
6. jsonwebtoken "membuat token verifikasi dan authentication"
7. bcrypt "sebagai hashing utama"
8. dotenv "menyimpan variabel dalam lingkungan .env"
9. multer "untuk menangani upload file"
<br/>

## Fitur
<b>Template ini sudah dilengkapi dengan beberapa fitur dasar yang umum digunakan dalam aplikasi backend, antara lain:</b>
<br/:
1. Folder structure
   - controllers: Menangani logika utama aplikasi. Ada dua controller, yaitu:
     - auth_controller.js: Mengelola fungsi authentication dan authorization.
     - user_controller.js: Mengelola data pengguna dengan 5 fungsi (create user, get all users, get user by ID, update user, delete user).
   - middlewares: Berisi middleware untuk mengelola otorisasi berdasarkan role. Contoh middleware:
     - role_validation.js: Memvalidasi apakah user memiliki peran admin, manager, atau kasir sebelum mengakses route tertentu.
   - models: Berisi model yang digunakan untuk mengelola skema database MongoDB. Ada satu model:
     - user_model.js: Skema user dengan field username, email, password, dan role yang dapat bernilai admin, kasir, atau manager.
   - routes: Menyediakan endpoint API yang sudah dihubungkan dengan controller dan middleware.
     - Contoh integrasi route: 
```javascript
router.post("/add", authorize, IsAdmin, userController.addUser);
```
2. Role-based Access Control (RBAC): Template ini mendukung otorisasi berbasis role. Hanya user dengan role tertentu (admin, kasir, manager) yang dapat mengakses endpoint tertentu.
3. Authentication & Authorization: Menggunakan jsonwebtoken (JWT) untuk otentikasi pengguna dan middleware authorize untuk melindungi route sensitif.
<br/>
