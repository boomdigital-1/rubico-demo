# RUBICO SHOP V3 — Demo Kurulumu

Bu dosyalar mevcut Rubico kurumsal sitesinin üzerine geliştirilmiş **tek proje** hâlindeki prototiptir.

## Eklendi
- `magaza.html`: stoklu ve özel ölçülü ürün listesi, kategori filtreleri, arama.
- `magaza-urun.html`: ürün detayı, demo metre/m² fiyatı ve sepete ekleme.
- `sepet.html`: aynı sepette standart + ölçüye göre ürünler.
- `shop.css` ve `shop.js`: responsive tasarım ve tarayıcı içi demo işlevleri.
- `SHOP_MIMARI.md`: gerçek e-ticaret altyapısı ve uygulama kararları.
- Mevcut kurumsal sayfalarda mağaza yönlendirmeleri.

## Render / GitHub
1. ZIP'i açın ve **ZIP içindeki tüm dosya ve assets klasörünü** `boomdigital-1/rubico-demo` reposunun **köküne** yükleyin. ZIP'i tek dosya olarak yüklemeyin.
2. GitHub mevcut dosyaları yenileme/değiştirme gerektirir. Mevcut çalışan demo onaylanmadan doğrudan değiştirilmeyecekse yeni `rubico-shop-preview` reposunda önizleme yayını yapın.
3. Render → Static Site → Settings → Publish Directory: `.` (nokta). Build Command: `echo "Rubico static demo"`.
4. Yeni commit sonrası otomatik deployment veya Render Deploys → Manual Deploy → Deploy latest commit.
5. Menüden Online Mağaza, ürün detayı, sepet ve TR/EN sayfalarını kontrol edin.

## Kesin sınırlar
- Fiyat/stok/ürün çeşitleri **gerçek Rubico verisi değildir**.
- Kredi kartı, sipariş, dosya yükleme, sunucu ve ödeme altyapısı **YOKTUR**.
- Sepet ziyaretçinin tarayıcısında tutulur. Gerçek müşteri bilgisi girmeyin.
- Canlı ticaret için WooCommerce veya eşdeğer gerçek bir e-ticaret backend'i, ödeme sağlayıcısı, kargo, fatura, KVKK ve satış sözleşmeleri gerekir.
