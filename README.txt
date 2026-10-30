RUBICO — ÇOK SAYFALI KURUMSAL WEB PROTOTİPİ / V2.1
================================================

KURULUM / GÖRÜNTÜLEME
1) ZIP dosyasını bir klasöre çıkarın.
2) index.html dosyasını Safari / Chrome ile açın.
3) Menüdeki bağlantılar ayrı HTML sayfalarını açar; tek sayfa tasarımı değildir.
4) İnternet olmadan sayfa, resimler ve işlevler çalışır. Google Fonts ulaşılmazsa sistem yazı tipi kullanılır.
5) Sayfanın üstündeki TR / EN düğmeleri dili değiştirir. Seçim sayfalar arasında URL (?lang=en) ve tarayıcı belleğiyle korunur.

SAYFALAR (11)
- index.html             Ana sayfa
- urunler.html           Dinamik aramalı / filtreli ürün kataloğu
- urun-detay.html        Ürün detay şablonu (?urun=... ile seçim)
- uretim.html            Üretim yaklaşımı
- malzemeler.html        Malzeme kütüphanesi
- sektorler.html         Uygulama sektörleri
- kurumsal.html          Kurumsal
- bilgi-merkezi.html     Bilgi merkezi
- konfigurator.html      3 adımlı teknik teklif konfigüratörü
- iletisim.html          İletişim formu
- admin.html             Yönetim paneli görsel demosu

İŞLEVLER
- Türkçe / İngilizce dil desteği: 11 sayfa, menüler, ürünler, arama, ürün detayı, teknik form, uyarılar ve indirme özeti
- Mobil menü / duyarlı grid düzeni
- Ürün adı, kategori ve malzemeye göre canlı arama
- Ürün kategori filtreleri ve detay sayfası
- Ürün detayı → ürün seçili konfigüratör bağlantısı
- Malzeme / sektör → konfigüratöre ön seçili bağlantı
- Adım doğrulamalı teknik talep sihirbazı
- Teknik dosya seçme UI: dosya sunucuya yüklenmez
- TXT biçiminde teknik talep özeti indirme
- Demo istek ve iletişim kayıtlarını tarayıcı localStorage alanında saklama (tarayıcı izin verirse)
- Demo yönetim panelinde aynı tarayıcıdaki kayıtları görme

VERİ VE GÜVENLİK
- Bu bir statik, değerlendirme amaçlı arayüz prototipidir.
- Sunucu, API, veritabanı, gerçek kullanıcı hesabı veya gerçek teklif gönderimi YOKTUR.
- Ürün ve yöntem örnekleri Rubico üretim kapasitesiyle henüz doğrulanmamıştır.
- Firma tesisi, belgelendirme, referans, iletişim bilgileri kesinleştirilmeden yayına konmamalıdır.
- Teknik bilgi ve ürün görselleri temsili ve konsept amaçlıdır.
- Demo localStorage kişisel/gerçek müşteri verileri için güvenli bir veri deposu değildir.
- Yüklenen dosyanın sadece adı tutulur, dosya içeriği gönderilmez veya saklanmaz.
- Üretim sürümünde güvenli backend, oturum, izinler, güvenli dosya depolama, KVKK, e-posta ve veritabanı gerekir.

DOSYA YAPISI
styles.css  -> Ortak tasarım sistemi ve responsive kurallar
site.js     -> Katalog, formlar, istemci tarafı demo davranışları
i18n.js     -> Dil tespiti, dil değişimi ve sayfalar arası tercih taşıma
translations.js -> Türkçe / İngilizce metin karşılıkları
products.json -> Örnek ürün listesi (gelecek CMS altyapısı için)
assets/     -> Gerçek Rubico logoları ve temsili ürün SVG görselleri

MARKA
Logo: Kullanıcının paylaştığı Rubico görselinden ayrılmış sembol ve yazı.
Palet: siyah, camgöbeği, elektrik mavisi, mor, fuşya.

ÜRETİME GEÇİŞ SONRAKİ ADIMLARI
1. Firma tarafından doğrulanmış ürün ve üretim kabiliyetleri
2. Fotoğraf / teknik çizim / gerçek malzeme dataları
3. İçerik onayından sonra profesyonel TR/EN redaksiyon, SEO ve dil bazlı URL (hreflang) planlaması
4. Veritabanı ve güvenli, oturumlu yönetim paneli
5. Gerçek teklif API'si, dosya yükleme ve e-posta akışı
6. KVKK / veri saklama / güvenlik / QA / hosting
