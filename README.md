<div align="center">

# Maglo – Finansal Takip Platformu 

Kullanıcıların gelir–gider hareketlerini, işletme sermayesini ve planlı transferlerini takip edebileceği; bileşen mimarisi, temiz kod ve erişilebilirlik odaklı geliştirilen bir demo finans dashboard uygulaması.

</div>

---

## İçindekiler
1. Amaç ve Kapsam  
2. Kurulum  
3. Özellikler  
4. Ekranlar  
5. Teknik Mimari  
6. Teknolojiler  
7. State & Veri Akışı  
8. Erişilebilirlik (A11y)  
9. Performans  
10. Klasör Yapısı  
11. Script’ler  
12. Öne Çıkan Yaklaşımlar  

---

## 1. Amaç ve Kapsam
Bu proje; React bileşen tasarımı, durum (state) yönetimi, veri modelleme, erişilebilirlik ve kod kalitesi yaklaşımlarının incelenmesi amacıyla hazırlanmış bir vaka çalışmasıdır. Gerçek bir arka uç (backend) servisi yerine, geliştirme sürecinde json-server tabanlı mock API kullanılmıştır.

Giriş (login) modülünde gerekli validasyonlar gerçekleştirilmekte; bilgiler doğru girildiği takdirde kullanıcı, üzerinde yüklenme animasyonu (loader) bulunan bir buton aracılığıyla doğrulama sürecine alınmakta ve başarıyla bağlanması durumunda dashboard ekranına yönlendirilmektedir. Bu geçiş sürecinde, kullanıcı deneyimini artırmak için ek bir loading aşaması uygulanmaktadır.

Dashboard üzerinde, kart (card) yapıları aracılığıyla Türk Lirası ve Dolar cinsinden finansal veriler sunulmaktadır. Grafik bileşeninde ise kullanıcı, hover etkileşimi ile gelir-gider dağılımını görüntüleyebilmekte; ayrıca grafik üzerinde tıklama işlemiyle açılan bir detay modalı üzerinden daha kapsamlı verilere erişebilmektedir.

Projenin genelinde, modüler dosya yapısı benimsenmiş olup, tüm bileşenler ve işlevler dinamik, yeniden kullanılabilir ve ölçeklenebilir bir şekilde tasarlanmıştır.

## 2. Kurulum
```bash
git clone <repo-url>
cd Maglo
npm install

# Mock API başlat
npm run server

# Uygulama
npm start
```
Varsayılan Portlar:
- Frontend: http://localhost:3000  
- API: http://localhost:3001/transactions  

## 3. Özellikler
Kategori | Özellik | Durum
---------|---------|------
Auth | Basit giriş simülasyonu | ✔
Auth | Form validasyon (email regex, şifre min uzunluk) | ✔
Auth | Loading spinner | ✔
Dashboard | Bakiye / Gelir / Gider kartları | ✔
Dashboard | USD ↔ TRY para birimi geçişi | ✔
Dashboard | 7 / 30 günlük gelir–gider grafiği | ✔
Dashboard | Tooltip + aktif gün highlight | ✔
Dashboard | Son işlemler listesi | ✔
Transactions | Arama / filtre / sıralama / sayfalama | ✔
Expense | Kategori bazlı gider analizi | ✔
Wallet | Cüzdan kartları + dummy bakiyeler | ✔
Transfers | Planlı transfer listesi | ✔
Global | Route geçişlerinde loading wrapper | ✔
Global | Bildirim & profil menüsü (focus trap) | ✔
Modal | Ayrıntı paneli (SelectedDetail) | ✔
Format | Tarih & para unified util | ✔
Responsive | Mobil / tablet / masaüstü destek | ✔
Persist | Kullanıcı & para birimi localStorage | ✔

## 4. Ekranlar
Ekran | Açıklama
------|---------
Login | Giriş formu + görsel panel (desktop) + doğrulama
Dashboard | Kartlar, grafik, hızlı tablo, wallet & transfer paneli
Transactions | Tam liste; arama, filtre, sorting, pagination
Expense (Invoices) | Gider odaklı görünüm + kategori dağılımı
Wallet | Cüzdan kartları ve bakiye kutuları
Invoices | `/invoices` route => Expense reuse

## 5. Teknik Mimari
Katman | Açıklama
-------|---------
components/ui | Görsel ve tekrar kullanılabilir küçük bileşenler
context | Global state (UserContext, CurrencyContext)
hooks | `useTransactions` veri fetch + loading yönetimi
screens | Route bazlı sayfa bileşenleri
utils | Pure yardımcı fonksiyonlar (formatDate, formatCurrency)
routes | Router + loader wrapper
services | Mock veri JSON dosyası

## 6. Teknolojiler
Tür | Araç | Amaç
----|------|-----
React | 19.x | UI component modeli
react-router-dom | 7.x | İstemci yönlendirme
recharts | 3.x | Grafik
json-server | 1.x beta | Mock API
tailwindcss | 4.x | Hızlı stil üretimi
react-icons | 5.x | İkon seti
testing-library | * | Test altyapısı (şu an yazılmadı)

## 7. State & Veri Akışı
Öğe | Rol
----|----
UserContext | Kullanıcı adı, email, logout
CurrencyContext | Para birimi (USD/TRY) + toggle + persist
useTransactions | Fetch + loading + error state
Derived State | Reduce ile toplam gelir, gider, bakiye
UI State | Menü açık/kapalı, modal seçili detay, grafik range

## 8. Erişilebilirlik (A11y)
Öğe | Durum | Not
----|-------|----
Modal focus trap | ✔ | ESC + odak döndürme
Menü focus trap | ✔ | Bildirim & profil
Form hata bildirimi | ✔ | `aria-invalid`, açıklayıcı metin
Aria rolleri | KISMEN | Menü / dialog var, tablo geliştirilebilir
Grafik alternatif metin | EKSİK | SR-only özet eklenebilir

## 9. Performans
- Minimal state & context kullanımı  
- `useMemo` ile filtre/sort maliyet azaltımı  
- Boş veri kontrolleri (chart placeholder)  
Gelecek: Code splitting, virtualization, ErrorBoundary

## 10. Klasör Yapısı
```
src/
	components/
		ui/
		services/
	context/
	hooks/
	screens/
		loginPage/
		dashboardPage/
			components/
			detailAmount/
	utils/
	routes/
```

## 11. Script’ler
Script | Açıklama
-------|---------
`npm start` | React dev sunucusu
`npm run server` | json-server (3001)
`npm run build` | Prod build
`npm test` | Test runner
`npm run eject` | CRA yapı dosyalarını dışa çıkarır


## 12. Öne Çıkan Yaklaşımlar
- Unified tarih & para util katmanı  
- Duplicate chart dosyalarının temizlenmesi  
- CurrencySwitch ile UI bağımsız para birimi yönetimi  
- Focus trap + ESC erişilebilirlik uygulamaları  
- Arama + filtre + sort + pagination entegre Transactions tablosu  

---


Teşekkürler!  
Maglo Case
