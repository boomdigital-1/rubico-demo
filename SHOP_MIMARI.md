# RUBICO SHOP V3 — Mimari Kararları

## 1. Kanal ayrımı
- Kurumsal site: mevcut Render statik ön yüzü; ürün ailesi ve B2B teknik teklif.
- Perakende: önce aynı sitede bu statik demo (`magaza.html`, `magaza-urun.html`, `sepet.html`); canlıda önerilen `shop.rubico.com.tr` alt alan adında WooCommerce uygulaması.
- Ortak marka: aynı logo, renk paleti, TR/EN tercihli yönlendirmeler, kategoriler ve ürün eşleştirmeleri.

## 2. Sipariş tipleri
- STOCK: SKU, varyasyon, stok, fiyat, adedi belirlenmiş; sepet + online ödeme.
- MEASURED: metre/m² vb, ölçü aralığı, minimum sipariş ve kesim maliyeti; üretim kuralı doğrulanınca sepete fiyatlı ürün olarak eklenir.
- ENGINEERED: malzeme, tolerans, CAD ve kalıp; mühendis değerlendirmesi, teklif onayı sonrası ödeme linki/sipariş.

## 3. Satış sistemi
- WooCommerce + WordPress host, API kullanan kalıcı veri tabanı, ödeme altyapısı (iyzico veya PAYTR), fatura ve kargo entegrasyonları.
- Önerilen ölçü hesaplayıcı WooCommerce Measurement Price Calculator; özel teknik kurallar için geliştirme gerekebilir. Fiyat sunucu tarafında tekrar hesaplanmalıdır.
- Admin panelinde SKU, malzeme, sertlik, boyut, birim, kesim kuralları, stok, fiyat, vergiler, teslimat, sipariş ve teklif yönetimi.

## 4. Kısıtlar
- Bu pakette ödeme yoktur. Yerel sepet ve fiyatlar tümüyle demo amaçlıdır.
- Stok/kesim/rakamlar Rubico tarafından onaylanmadı.
- Teknik CAD dosyaları tarayıcıda kalmaz; gerçek sistemde izin denetimli güvenli depolama gerekir.
- Gerçek açılış öncesi ETBİS, KVKK, ticari sözleşmeler, mesafeli satış, KDV, e-fatura/entegrasyonlar ve iade politikası teyit edilmelidir.
- WooCommerce ölçü fiyatlandırma ve ürün eklentilerinin birlikte kullanılmasında uyumluluk testi gereklidir.

## 5. Test planı
- TR/EN, iPhone/Safari, desktop Chrome, responsive tasarım
- Stoklu ve ölçülü ürünleri aynı sepete ekleme
- Yanlış/limit dışı ölçüler, stok üst limitleri, ürün varyasyonu
- Ödeme callbackleri, iade, çift işlem koruması, stok düşümü
- Teknik teklif, mühendis onayı, fiyat teklifi sürümleri, tekliften siparişe dönüşüm

## 6. Yayınlama
- Repo kökünde index.html ve magaza.html bir arada. Render Static Site Publish Directory `.` olmalı.
- ZIP klasör içeriği GitHub repo köküne yüklenir. Canlı sistem onayı olmadan mevcut demoyu değiştirmeyin.
