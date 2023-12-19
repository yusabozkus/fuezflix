# FuezFlix

FuezFlix, kullanıcı kaydı ve girişi, TMDB API kullanarak geniş bir film veritabanı, Firebase veritabanı entegrasyonu, şık tasarıma sahip bir film uygulaması ve ayrıca Python ile yazılmış bir bot içerir, bu bot TMDB'den film verilerini çeker ve veritabanına yazar.

## Tanıtım

FuezFlix, film severlere geniş bir film koleksiyonuna erişim sağlar. Kullanıcılar kayıt olduktan sonra film veritabanını arayabilir, favori filmlerini işaretleyebilir ve film detaylarına ulaşabilir.

## Özellikler

- Kullanıcı kaydı ve girişi
- TMDB API kullanarak 6000'den fazla film verisi
- Firebase veritabanı entegrasyonu
- Şık tasarım ve kullanıcı arayüzü
- Python botu ile film verilerini çekme ve veritabanına yazma

## Teknolojiler

- HTML
- CSS
- JavaScript
- Firebase
- Python

## Kurulum

Projeyi yerel makinenizde çalıştırmak için şu adımları izleyin:

1. Repoyu klonlayın: `git clone https://github.com/sizin-kullanici-adi/film-veritabani.git`
2. Gerekli bağımlılıkları yükleyin: `npm install` veya `yarn install`
3. Firebase konfigürasyon dosyasını ekleyin: `src/firebaseConfig.js` (örnek dosya: `src/firebaseConfig.example.js`)
4. Projeyi başlatın: `npm start` veya `yarn start`

## Python Bot

Film verilerini çekmek ve veritabanına yazmak için Python botunu aşağıdaki adımları kullanarak çalıştırabilirsiniz:

1. Python botunun bulunduğu klasöre gidin: `cd Fuez Movie`
2. Gerekli Python bağımlılıklarını yükleyin: `pip install selenium firebase-admin`
3. Botu çalıştırın: `python getMovieSource.py`

## Kullanım

Uygulamayı başlatın ve tarayıcınızda `http://localhost:3000` adresine giderek FuezFlix'i kullanmaya başlayın.

## Ekran Görüntüleri

![Ana Sayfa](https://i.hizliresim.com/36camrl.png)
![Film Detayları](https://i.hizliresim.com/qgopcqg.png)
![Profil Sayfası](https://i.hizliresim.com/d5svtui.png)
![Arama Sonuçları](https://i.hizliresim.com/6rz12z0.png)
![Favori Filmler](https://i.hizliresim.com/bwvte8j.png)
![Kullanıcı Ayarları](https://i.hizliresim.com/34l9hku.png)

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [Lisans Dosyası](LICENSE)na bakın.
