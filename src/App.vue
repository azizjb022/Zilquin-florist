<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  category: string
  name: string
  flowerType: string
  occasion: string
  priceLabel: string
  badge: string
  badgeClass: string
  tagOverlay: string
  description: string
  image: string
}

const whatsappNumber = '6281234567890'
const instagramUrl = 'https://www.instagram.com/zilquin_pesona_bunga_official/'

const buildWaUrl = (text: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

const generalWaLink = buildWaUrl(
  'Halo Zilquin Pesona Bunga, saya ingin konsultasi pesanan bunga hidup segar & anggrek bernuansa soft pink',
)
const referenceWaLink = buildWaUrl(
  'Halo Zilquin Pesona Bunga, saya punya referensi rangkaian bunga hidup/anggrek soft pink dan ingin tanya ketersediaan stok & harga',
)
const closingWaLink = buildWaUrl(
  'Halo Zilquin Pesona Bunga, saya ingin memesan rangkaian bunga hidup / anggrek untuk hadiah',
)

// State UI Reaktif
const isMobileMenuOpen = ref(false)
const selectedCategory = ref('all')
const activeFaqIndex = ref<number | null>(null)
const selectedProduct = ref<Product | null>(null)

const getTomorrowDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

const orderForm = ref({
  customerName: '',
  deliveryDate: getTomorrowDate(),
  colorTheme: 'Nuansa Soft Pink & Putih Pastel',
  cardText: '',
})

// Data Navigasi & Konten
const navLinks = [
  { label: 'Koleksi Bunga Hidup', href: '#katalog' },
  { label: 'Keunggulan Kami', href: '#keunggulan' },
  { label: 'Cara Pesan', href: '#cara-pesan' },
  { label: 'Ulasan Pelanggan', href: '#testimoni' },
  { label: 'FAQ', href: '#faq' },
]

const categoryTabs = [
  { label: 'Semua Koleksi', value: 'all' },
  { label: '🌸 Anggrek Hidup Pot', value: 'anggrek' },
  { label: '💐 Hand Bouquet Segar', value: 'bouquet' },
  { label: '🎀 Bloom Box Segar', value: 'box' },
  { label: '🏢 Standing Flower', value: 'standing' },
  { label: '✨ Rangkaian Vas Meja', value: 'vas' },
]

const products: Product[] = [
  {
    id: 1,
    category: 'anggrek',
    name: 'Royal Blush Phalaenopsis Twin Pot',
    flowerType: 'Anggrek Bulan Hidup (2 Tangkai)',
    occasion: 'Mewah & Tahan Lama',
    priceLabel: 'Rp 385.000',
    badge: 'Favorit Anggrek',
    badgeClass: 'bg-flora-terracotta',
    tagOverlay: 'Bunga Hidup Berakar Sehat',
    description:
      'Dua tangkai anggrek bulan hidup kelopak soft pink gradasi fuchsia dalam pot keramik putih premium. Mekar anggun dan bertahan hingga 4–8 minggu dengan perawatan minim.',
    image:
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    category: 'anggrek',
    name: 'Sweet Orchid Grace Single Stem',
    flowerType: 'Anggrek Bulan Hidup Soft Pink',
    occasion: 'Hias Meja & Hadiah',
    priceLabel: 'Rp 235.000',
    badge: 'Best Seller',
    badgeClass: 'bg-pink-600',
    tagOverlay: 'Tahan 4-6 Minggu',
    description:
      'Satu tangkai anggrek bulan hidup rimbun dengan 8–10 kuntum mekar sempurna. Dilengkapi pot anyaman estetik bernuansa pastel dan kartu panduan menyiram praktis.',
    image:
      'https://images.unsplash.com/photo-1566999573499-f70366eb7b44?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    category: 'bouquet',
    name: 'Blushing Blossom Rose Bouquet',
    flowerType: 'Mawar Holland & Baby Breath Segar',
    occasion: 'Wisuda & Ulang Tahun',
    priceLabel: 'Rp 295.000',
    badge: 'Bunga Potong Segar',
    badgeClass: 'bg-flora-terracotta',
    tagOverlay: '100% Bunga Segar Asli',
    description:
      'Rangkaian mawar hidup asli warna soft pink dan blush rose, dipercantik rimbunnya baby’s breath putih dan daun eucalyptus aromatik dengan wrapping Korea dusty pink.',
    image:
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    category: 'box',
    name: 'Pink Serenade Orchid Bloom Box',
    flowerType: 'Anggrek Potong, Mawar & Lili',
    occasion: 'Anniversary & Ucapan',
    priceLabel: 'Rp 360.000',
    badge: 'Eksklusif',
    badgeClass: 'bg-rose-500',
    tagOverlay: 'Oasis Basah Bernutrisi',
    description:
      'Kotak silinder blush pink eksklusif berisi kuntum anggrek dendrobium hidup, mawar soft pink, dan baby breath. Ditancapkan pada floral foam basah agar tetap segar berhari-hari.',
    image:
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    category: 'standing',
    name: 'Grand Celebration Standing Flower',
    flowerType: 'Anggrek, Mawar & Lili Casablanca',
    occasion: 'Grand Opening & Syukuran',
    priceLabel: 'Rp 650.000',
    badge: 'Acara Resmi',
    badgeClass: 'bg-flora-dark',
    tagOverlay: 'Standing Bunga Segar',
    description:
      'Standing flower megah bertingkat memadukan untaian anggrek dendrobium ungu-pink segar, bunga lili Casablanca wangi semerbak, krisan putih, dan mawar pastel yang rimbun memukau.',
    image:
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    category: 'vas',
    name: 'Pastel Symphony Fresh Table Vase',
    flowerType: 'Bunga Hidup Vas Kaca Segar',
    occasion: 'Dekorasi Meja & Ruang Tamu',
    priceLabel: 'Rp 340.000',
    badge: 'Elegan',
    badgeClass: 'bg-flora-terracotta',
    tagOverlay: 'Dilengkapi Air Nutrisi',
    description:
      'Vas kaca jernih beraksen pita satin soft pink berisi rangkaian mawar hidup, lili, gerbera soft pink, dan foliage segar. Menghadirkan aroma alami dan kesegaran di ruangan Anda.',
    image:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
  },
]

const valuePropositions = [
  {
    icon: 'fa-solid fa-seedling',
    title: '100% Bunga Hidup & Segar',
    description:
      'Semua produk menggunakan bunga hidup asli dari kebun dan nurseri terpercaya. Kelopak mekar alami, harum lembut, dan tanpa campuran bunga plastik.',
  },
  {
    icon: 'fa-solid fa-spa',
    title: 'Spesialis Anggrek Bulan Berkualitas',
    description:
      'Koleksi anggrek hidup kami dipilih dengan akar sehat dan kuntum banyak. Tahan mekar berminggu-minggu di dalam ruangan dengan perawatan sangat praktis.',
  },
  {
    icon: 'fa-solid fa-droplet',
    title: 'Water Tube & Nutrisi Segar',
    description:
      'Setiap tangkai bunga potong dilengkapi tabung air khusus (water tube) agar suplai cairan tetap terjaga utuh selama perjalanan kurir ke penerima.',
  },
  {
    icon: 'fa-solid fa-camera-retro',
    title: 'Foto Persetujuan Sebelum Kirim',
    description:
      'Setelah florist merangkai bunga hidup Anda, kami mengirimkan foto real-pic ke WhatsApp untuk memastikan keindahan dan detailnya sesuai harapan.',
  },
]

const orderSteps = [
  {
    number: 1,
    title: 'Pilih Rangkaian / Anggrek',
    description:
      'Pilih pot anggrek bulan hidup, buket mawar segar, atau request kombinasi bunga hidup bernuansa soft pink.',
  },
  {
    number: 2,
    title: 'Konsultasi & Personalisasi',
    description:
      'Admin kami mengonfirmasi ketersediaan stok anggrek/bunga segar hari ini, isi kartu ucapan gratis, dan jam kirim.',
  },
  {
    number: 3,
    title: 'Proses Rangkai & Quality Check',
    description:
      'Florist merangkai bunga hidup pilihan Anda dengan rapi, menambahkan air nutrisi, dan menyiapkan kartu ucapan.',
  },
  {
    number: 4,
    title: 'Approval Foto & Pengantaran',
    description:
      'Kami kirimkan foto hasil jadi ke WhatsApp, lalu kurir khusus bunga mengantarkan pesanan dengan posisi tegak dan aman.',
  },
]

const testimonials = [
  {
    rating: 5,
    quote:
      'Beli anggrek bulan soft pink untuk kado ulang tahun mama. Bunganya sehat banget, akarnya segar, dan sampai sekarang sudah sebulan lebih masih mekar cantik di ruang tamu!',
    initials: 'NR',
    author: 'Nabila Rahmawati',
    orderType: 'Pesanan Anggrek Bulan 2 Tangkai Soft Pink',
  },
  {
    rating: 5,
    quote:
      'Buket mawarnya beneran bunga hidup asli yang wangi dan segar banget, wrapping dusty pink-nya mewah. Dikasih foto dulu sebelum dikirim, pelayanan ramah bintang lima!',
    initials: 'DS',
    author: 'Dimas Satria',
    orderType: 'Pesanan Buket Mawar Soft Pink Wisuda',
  },
  {
    rating: 5,
    quote:
      'Puas sekali pesan standing flower bunga hidup untuk peresmian klinik. Anggrek dendrobium dan lilinya rimbun, warnanya soft pink anggun, sangat mencolok dan harum.',
    initials: 'CK',
    author: 'dr. Clara Kusuma',
    orderType: 'Pesanan Standing Bunga Hidup & Anggrek',
  },
]

const faqs = [
  {
    question: 'Apakah bunga yang dijual benar-benar bunga hidup asli (bukan tiruan)?',
    answer:
      'Benar 100%! Semua koleksi kami adalah bunga hidup asli (living fresh flowers). Untuk anggrek, kami sediakan dalam bentuk tanaman hidup berakar sehat di dalam pot yang tahan mekar berminggu-minggu. Sedangkan untuk buket dan bloom box, kami memakai bunga potong segar harian kualitas premium yang dilengkapi spons basah atau water tube.',
  },
  {
    question: 'Berapa lama anggrek bulan hidup bisa bertahan mekar?',
    answer:
      'Anggrek bulan (Phalaenopsis) hidup yang kami sediakan umumnya bertahan mekar 4 hingga 8 minggu di dalam ruangan berpendingin atau bersirkulasi baik. Anda cukup menyiramnya 1–2 kali seminggu dengan sedikit air (sekitar 3–4 sendok makan). Kami sertakan kartu panduan perawatan praktis di setiap pot.',
  },
  {
    question: 'Bisakah request dominasi warna soft pink untuk bunga dan kertas wrap?',
    answer:
      'Tentu saja bisa! Nuansa soft pink, pastel blush, peach lembut, dan putih susu adalah signature style florist kami. Anda bisa meminta tone warna khusus saat konsultasi melalui WhatsApp.',
  },
  {
    question: 'Bagaimana cara pengiriman agar bunga hidup dan pot anggrek tidak rusak di jalan?',
    answer:
      'Kami menggunakan kurir mobil atau motor berwadah khusus bunga tegak. Untuk anggrek pot dan standing flower diantar dengan mobil agar tangkai tidak patah, media tanam tidak tumpah, dan bunga tiba dalam kondisi segar sempurna.',
  },
]

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products
  }
  return products.filter((item) => item.category === selectedCategory.value)
})

const toggleFaq = (index: number) => {
  activeFaqIndex.value = activeFaqIndex.value === index ? null : index
}

const openOrderModal = (product: Product) => {
  selectedProduct.value = product
  if (!orderForm.value.deliveryDate) {
    orderForm.value.deliveryDate = getTomorrowDate()
  }
}

const closeOrderModal = () => {
  selectedProduct.value = null
}

const handleOrderSubmit = () => {
  if (!selectedProduct.value) return

  const customerName = orderForm.value.customerName.trim()
  const deliveryDate = orderForm.value.deliveryDate
  const colorTheme = orderForm.value.colorTheme.trim() || 'Nuansa Soft Pink & Putih Pastel'
  const cardText = orderForm.value.cardText.trim() || '-'

  const message =
    `Halo Zilquin Pesona Bunga, saya ingin memesan rangkaian bunga hidup berikut:\n\n` +
    `🌸 *Produk:* ${selectedProduct.value.name} (${selectedProduct.value.priceLabel})\n` +
    `🌿 *Jenis Bunga:* ${selectedProduct.value.flowerType}\n` +
    `👤 *Nama Pemesan:* ${customerName}\n` +
    `📅 *Tanggal Diperlukan:* ${deliveryDate}\n` +
    `🎨 *Nuansa/Warna:* ${colorTheme}\n` +
    `💌 *Isi Kartu Ucapan:* "${cardText}"\n\n` +
    `Mohon info ketersediaan stok bunga segar hari ini dan estimasi ongkirnya ya. Terima kasih!`

  window.open(buildWaUrl(message), '_blank', 'noopener,noreferrer')
  closeOrderModal()
}
</script>

<template>
  <div class="min-h-screen bg-flora-cream text-flora-dark font-sans antialiased selection:bg-flora-rose selection:text-white">
    <!-- Top Announcement Banner -->
    <div class="bg-gradient-to-r from-flora-dark via-[#4A2631] to-flora-dark text-pink-100 text-xs py-2 px-4 text-center tracking-wide font-medium border-b border-flora-blush/30">
      <span>🌸 Spesialis Bunga Hidup &amp; Anggrek Bulan Soft Pink • 100% Segar Harian • Gratis Kartu Ucapan &amp; Foto Approval</span>
    </div>

    <!-- Header & Navbar -->
    <header
      id="mainHeader"
      class="sticky top-0 z-40 bg-flora-cream/95 backdrop-blur-md border-b border-flora-blush/70 transition-all duration-300 shadow-sm"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Brand Logo / Name -->
          <a href="#" class="flex items-center gap-3.5 group">
            <div
              class="w-11 h-11 rounded-full bg-gradient-to-br from-pink-100 to-flora-blush flex items-center justify-center text-flora-terracotta border border-flora-rose/50 group-hover:scale-105 transition-transform duration-300 shadow-sm"
            >
              <i class="fa-solid fa-spa text-xl"></i>
            </div>
            <div>
              <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-flora-dark block leading-none">
                Zilquin
              </span>
              <span class="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-flora-terracotta font-semibold mt-1 block">
                Bunga Hidup &amp; Anggrek
              </span>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-flora-dark">
            <a
              v-for="item in navLinks"
              :key="item.href"
              :href="item.href"
              class="hover:text-flora-terracotta transition-colors py-1"
            >
              {{ item.label }}
            </a>
          </nav>

          <!-- CTA WhatsApp Button -->
          <div class="hidden sm:flex items-center gap-3">
            <a
              :href="generalWaLink"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-flora-terracotta to-[#C23F66] hover:from-flora-dark hover:to-flora-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-pink-300/50 hover:shadow-lg transition-all duration-300 group"
            >
              <i class="fa-brands fa-whatsapp text-lg group-hover:rotate-12 transition-transform"></i>
              <span>Konsultasi WA</span>
            </a>
          </div>

          <!-- Mobile Menu Toggle Button -->
          <button
            type="button"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle Menu"
            class="md:hidden p-2 text-flora-dark hover:text-flora-terracotta focus:outline-none"
          >
            <i :class="isMobileMenuOpen ? 'fa-solid fa-xmark text-2xl' : 'fa-solid fa-bars-staggered text-2xl'"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Menu -->
      <div
        v-show="isMobileMenuOpen"
        id="mobileMenu"
        class="md:hidden bg-flora-sand/90 backdrop-blur-md border-b border-flora-blush px-6 pt-3 pb-6 space-y-3"
      >
        <a
          v-for="item in navLinks"
          :key="'mobile-' + item.href"
          :href="item.href"
          @click="isMobileMenuOpen = false"
          class="block py-2 text-base font-medium text-flora-dark hover:text-flora-terracotta"
        >
          {{ item.label }}
        </a>
        <div class="pt-2">
          <a
            :href="generalWaLink"
            target="_blank"
            rel="noopener noreferrer"
            @click="isMobileMenuOpen = false"
            class="w-full flex items-center justify-center gap-2 bg-flora-terracotta text-white py-3 rounded-full font-medium shadow"
          >
            <i class="fa-brands fa-whatsapp text-xl"></i> Chat WhatsApp
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-grain">
      <!-- Soft Pink Blur Accents -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <!-- Left Hero Copy -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-flora-blush text-flora-terracotta text-xs font-semibold tracking-wide uppercase shadow-sm"
            >
              <i class="fa-solid fa-spa text-flora-rose"></i>
              <span>Fresh Living Florist &amp; Orchid Specialist</span>
            </div>

            <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-flora-dark leading-[1.18]">
              Pesona Bunga Hidup &amp; Anggrek Segar <br />
              <span class="italic text-flora-terracotta font-normal">Mekar Cantik Bernuansa Soft Pink</span>
            </h1>

            <p class="text-flora-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Hadirkan keanggunan alami dari bunga hidup berkualitas tinggi: Anggrek Bulan segar dalam pot mewah,
              Mawar Holland soft pink, Lili wangi, hingga Baby's Breath mekar asli. Dirawat teliti oleh florist
              dengan suplai nutrisi dan media segar agar tahan mekar lebih lama.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                :href="generalWaLink"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-flora-terracotta to-[#C23F66] hover:from-flora-dark hover:to-flora-dark text-white font-medium text-base px-8 py-3.5 rounded-full shadow-lg shadow-pink-400/30 hover:shadow-xl transition-all duration-300"
              >
                <i class="fa-brands fa-whatsapp text-xl"></i>
                <span>Pesan Anggrek &amp; Bunga via WA</span>
              </a>

              <a
                href="#katalog"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-flora-dark border border-flora-blush hover:border-flora-terracotta font-medium text-base px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm"
              >
                <i class="fa-solid fa-seedling text-flora-rose"></i>
                <span>Lihat Koleksi Bunga Hidup</span>
              </a>
            </div>

            <!-- Trust Badges -->
            <div class="pt-6 border-t border-flora-blush/80 grid grid-cols-3 gap-3 sm:gap-6 text-left max-w-lg mx-auto lg:mx-0">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-flora-terracotta shrink-0 text-sm border border-flora-blush">
                  <i class="fa-solid fa-spa"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-flora-dark leading-tight">100% Bunga Hidup</p>
                  <p class="text-[11px] text-flora-muted">Asli &amp; segar harian</p>
                </div>
              </div>

              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-flora-terracotta shrink-0 text-sm border border-flora-blush">
                  <i class="fa-solid fa-camera"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-flora-dark leading-tight">Foto Sebelum Kirim</p>
                  <p class="text-[11px] text-flora-muted">Real-pic approval</p>
                </div>
              </div>

              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-flora-terracotta shrink-0 text-sm border border-flora-blush">
                  <i class="fa-solid fa-heart"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-flora-dark leading-tight">Tahan Lama</p>
                  <p class="text-[11px] text-flora-muted">Akar &amp; nutrisi terjaga</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Hero Visual Grid -->
          <div class="lg:col-span-5 relative">
            <div class="relative mx-auto max-w-md lg:max-w-none">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=80"
                  alt="Anggrek Bulan Hidup Soft Pink Zilquin"
                  class="w-full h-[470px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-flora-dark/85 via-flora-dark/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span class="inline-block px-3 py-1 bg-flora-terracotta text-[11px] font-semibold tracking-wider uppercase rounded-full w-max mb-1 shadow">
                    Living Orchid Signature
                  </span>
                  <h3 class="font-serif text-2xl font-bold">Phalaenopsis Soft Pink Blush</h3>
                  <p class="text-xs text-pink-100 font-light">
                    Anggrek bulan hidup mekar sempurna dalam pot keramik, bertahan 4–8 minggu.
                  </p>
                </div>
              </div>

              <!-- Floating Badge Accent -->
              <div class="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-flora-blush flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-pink-50 text-flora-terracotta flex items-center justify-center text-2xl border border-pink-100">
                  🌸
                </div>
                <div>
                  <p class="text-xs font-bold text-flora-dark">Anggrek Bulan Berkualitas</p>
                  <p class="text-[11px] text-flora-muted">Akar Sehat &amp; Kuntum Lebat</p>
                </div>
              </div>

              <!-- Floating Badge Top Right -->
              <div class="absolute -top-4 -right-4 bg-flora-dark text-white px-4 py-2 rounded-2xl shadow-lg border border-flora-rose/40 text-center">
                <p class="text-[10px] uppercase tracking-wider text-pink-200">Garansi</p>
                <p class="text-sm font-bold font-serif text-flora-sand">Segar Tiba di Tempat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Catalog Section -->
    <section id="katalog" class="py-20 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-flora-terracotta block mb-2">
            Katalog Bunga Hidup &amp; Anggrek
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-flora-dark">
            Koleksi Segar Bernuansa Soft Pink
          </h2>
          <p class="text-flora-muted mt-3 text-sm sm:text-base">
            Semua rangkaian dibuat dari bunga hidup segar harian. Pilih tanaman anggrek pot tahan lama atau buket bunga potong segar dengan nuansa pastel romantis.
          </p>

          <!-- Filter Tab Buttons -->
          <div class="flex flex-wrap justify-center gap-2 mt-8">
            <button
              v-for="tab in categoryTabs"
              :key="tab.value"
              type="button"
              @click="selectedCategory = tab.value"
              :class="[
                'px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 border',
                selectedCategory === tab.value
                  ? 'bg-flora-terracotta text-white border-flora-terracotta shadow-md shadow-pink-200'
                  : 'bg-flora-sand/70 hover:bg-pink-100 text-flora-dark border-flora-blush',
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Catalog Product Grid -->
        <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="product in filteredProducts"
            :key="product.id"
            class="group rounded-2xl overflow-hidden border border-flora-blush bg-flora-sand/30 hover:shadow-xl hover:border-flora-rose/60 transition-all duration-300 flex flex-col"
          >
            <div class="relative overflow-hidden h-72 bg-pink-50">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                :class="[
                  'absolute top-3 left-3 text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm',
                  product.badgeClass,
                ]"
              >
                {{ product.badge }}
              </span>
              <span
                v-if="product.tagOverlay"
                class="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-flora-dark text-xs font-semibold px-2.5 py-1 rounded-lg border border-pink-100 shadow-sm flex items-center gap-1"
              >
                <i class="fa-solid fa-leaf text-emerald-600 text-[10px]"></i>
                {{ product.tagOverlay }}
              </span>
            </div>

            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div class="flex justify-between items-start gap-2 mb-1.5">
                  <h3 class="font-serif text-xl font-bold text-flora-dark group-hover:text-flora-terracotta transition-colors">
                    {{ product.name }}
                  </h3>
                  <span class="text-[11px] bg-pink-100 text-flora-dark px-2.5 py-0.5 rounded-full font-medium shrink-0 border border-flora-blush">
                    {{ product.occasion }}
                  </span>
                </div>
                <p class="text-xs font-semibold text-flora-terracotta mb-2 flex items-center gap-1.5">
                  <i class="fa-solid fa-spa text-xs"></i>
                  {{ product.flowerType }}
                </p>
                <p class="text-flora-muted text-xs leading-relaxed">
                  {{ product.description }}
                </p>
              </div>

              <div class="pt-4 border-t border-flora-blush/70 flex items-center justify-between">
                <div>
                  <span class="text-[11px] text-flora-muted block">Harga</span>
                  <span class="text-flora-terracotta font-serif font-bold text-lg">{{ product.priceLabel }}</span>
                </div>
                <button
                  type="button"
                  @click="openOrderModal(product)"
                  class="px-4 py-2 bg-flora-terracotta hover:bg-flora-dark text-white text-xs font-medium rounded-full transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <i class="fa-brands fa-whatsapp text-sm"></i>
                  <span>Pesan</span>
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Custom Consultation Banner -->
        <div class="mt-14 p-8 rounded-3xl bg-gradient-to-r from-flora-sand via-pink-50 to-flora-sand border border-flora-blush flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div class="space-y-1.5 text-center md:text-left">
            <span class="text-xs font-bold text-flora-terracotta uppercase tracking-wider">🌸 Request Khusus Anggrek &amp; Bunga Segar</span>
            <h4 class="font-serif text-2xl font-bold text-flora-dark">
              Ingin Custom Anggrek Bulan Pot / Nuansa Soft Pink Tertentu?
            </h4>
            <p class="text-sm text-flora-muted max-w-2xl">
              Florist kami siap merangkai anggrek bulan hidup 3–5 tangkai, buket wisuda custom mawar, atau standing flower bertema pastel sesuai selera dan budget Anda.
            </p>
          </div>
          <a
            :href="referenceWaLink"
            target="_blank"
            rel="noopener noreferrer"
            class="whitespace-nowrap px-6 py-3.5 bg-flora-terracotta hover:bg-flora-dark text-white rounded-full text-sm font-semibold transition-colors flex items-center gap-2 shadow-md shadow-pink-200"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>Konsultasi Request Custom</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="keunggulan" class="py-20 bg-flora-sand/40 border-t border-flora-blush/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-flora-terracotta block mb-2">
            Kelebihan Bunga Hidup Kami
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-flora-dark">
            Mengapa Memilih Zilquin Pesona Bunga?
          </h2>
          <p class="text-flora-muted mt-3 text-sm sm:text-base">
            Setiap tangkai bunga hidup dan pot anggrek dirawat dengan cinta agar tiba di tangan penerima dalam kondisi mekar paling prima.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="item in valuePropositions"
            :key="item.title"
            class="bg-white p-8 rounded-2xl border border-flora-blush hover:-translate-y-1.5 transition-all duration-300 shadow-sm"
          >
            <div class="w-14 h-14 rounded-2xl bg-pink-100 text-flora-terracotta flex items-center justify-center text-2xl mb-6 border border-flora-blush/60">
              <i :class="item.icon"></i>
            </div>
            <h3 class="font-serif text-lg font-bold text-flora-dark mb-2">{{ item.title }}</h3>
            <p class="text-xs text-flora-muted leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Order Steps Section -->
    <section id="cara-pesan" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-flora-terracotta block mb-2">
            Alur Pemesanan Mudah
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-flora-dark">
            4 Langkah Praktis Memesan Bunga
          </h2>
          <p class="text-flora-muted mt-3 text-sm sm:text-base">
            Pesan bunga hidup dari mana saja, biar florist kami yang merawat, merangkai, dan mengantarkannya dengan aman.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div v-for="step in orderSteps" :key="step.number" class="text-center relative">
            <div
              class="w-16 h-16 rounded-full bg-pink-100 border-2 border-flora-rose text-flora-terracotta font-serif text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-sm"
            >
              {{ step.number }}
            </div>
            <h3 class="font-bold text-flora-dark text-base mb-1.5">{{ step.title }}</h3>
            <p class="text-xs text-flora-muted leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimoni" class="py-20 bg-flora-sand/50 border-t border-flora-blush">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-flora-terracotta block mb-2">
            Kisah Pelanggan Puas
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-flora-dark">
            Ulasan Pencinta Bunga Segar
          </h2>
          <p class="text-flora-muted mt-3 text-sm sm:text-base">
            Kepuasan melihat bunga hidup yang mekar tahan lama adalah prioritas kami.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="review in testimonials"
            :key="review.author"
            class="bg-white p-8 rounded-3xl border border-flora-blush shadow-sm flex flex-col justify-between"
          >
            <div>
              <div class="text-amber-400 text-sm mb-4">
                <i v-for="n in review.rating" :key="n" class="fa-solid fa-star"></i>
              </div>
              <p class="text-xs sm:text-sm text-flora-dark italic leading-relaxed mb-6">
                "{{ review.quote }}"
              </p>
            </div>
            <div class="flex items-center gap-3 pt-4 border-t border-flora-blush">
              <div class="w-10 h-10 rounded-full bg-pink-100 text-flora-terracotta border border-flora-blush flex items-center justify-center font-bold text-xs">
                {{ review.initials }}
              </div>
              <div>
                <h4 class="font-bold text-xs text-flora-dark">{{ review.author }}</h4>
                <p class="text-[11px] text-flora-muted">{{ review.orderType }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-flora-terracotta block mb-2">
            Tanya Jawab Seputar Bunga Hidup
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-flora-dark">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p class="text-flora-muted mt-2 text-sm">
            Informasi lengkap seputar ketahanan anggrek, perawatan, dan pengiriman aman.
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(item, index) in faqs"
            :key="item.question"
            class="border border-flora-blush rounded-2xl overflow-hidden bg-flora-sand/20"
          >
            <button
              type="button"
              @click="toggleFaq(index)"
              :aria-expanded="activeFaqIndex === index"
              class="w-full flex items-center justify-between p-5 text-left hover:bg-pink-50 transition-colors"
            >
              <span class="font-serif font-bold text-flora-dark text-base">{{ item.question }}</span>
              <i
                :class="[
                  'fa-solid fa-chevron-down text-flora-terracotta text-sm transition-transform duration-300',
                  activeFaqIndex === index ? 'rotate-180' : '',
                ]"
              ></i>
            </button>
            <div
              v-show="activeFaqIndex === index"
              class="p-5 pt-0 text-xs sm:text-sm text-flora-muted leading-relaxed border-t border-flora-blush/60 bg-white"
            >
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="py-20 bg-gradient-to-br from-flora-dark via-[#42222D] to-flora-dark text-flora-sand relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
        <span class="text-xs uppercase tracking-[0.25em] text-pink-300 block font-semibold">
          Kirimkan Kehangatan Alami
        </span>
        <h2 class="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
          Ingin Menghadiahkan Anggrek Cantik <br class="hidden sm:inline" />atau Bunga Hidup Soft Pink Hari Ini?
        </h2>
        <p class="text-sm sm:text-base text-pink-100/90 max-w-xl mx-auto font-light leading-relaxed">
          Konsultasikan jenis bunga dan nuansa impian Anda bersama florist kami sekarang. Cepat, ramah, dan dijamin segar sampai tujuan.
        </p>
        <div class="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            :href="closingWaLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-flora-terracotta to-[#C23F66] hover:bg-white hover:text-flora-dark text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg"
          >
            <i class="fa-brands fa-whatsapp text-xl"></i>
            <span>Chat WhatsApp Florist</span>
          </a>
          <a
            :href="instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 border border-pink-300/40 hover:border-white text-flora-sand font-medium px-6 py-3.5 rounded-full transition-all duration-300"
          >
            <i class="fa-brands fa-instagram text-lg"></i>
            <span>Follow Galeri Instagram</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#26151B] text-pink-100/80 py-16 border-t border-pink-950 text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <!-- Col 1: About -->
          <div class="space-y-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-flora-terracotta flex items-center justify-center text-white">
                <i class="fa-solid fa-spa text-sm"></i>
              </div>
              <span class="font-serif text-lg font-bold text-white tracking-wide">Zilquin Pesona Bunga</span>
            </div>
            <p class="leading-relaxed text-pink-100/70">
              Spesialis bunga hidup asli, pot anggrek bulan mekar tahan lama, bloom box segar, serta standing flower bernuansa lembut soft pink untuk momen terindah Anda.
            </p>
            <div class="flex items-center gap-3 pt-2">
              <a
                :href="instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-full bg-white/10 hover:bg-flora-terracotta text-white flex items-center justify-center transition-colors"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a
                :href="generalWaLink"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-full bg-white/10 hover:bg-flora-terracotta text-white flex items-center justify-center transition-colors"
              >
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <a
                href="#katalog"
                class="w-8 h-8 rounded-full bg-white/10 hover:bg-flora-terracotta text-white flex items-center justify-center transition-colors"
              >
                <i class="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>

          <!-- Col 2: Navigasi Cepat -->
          <div>
            <h4 class="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Koleksi Favorit
            </h4>
            <ul class="space-y-2.5">
              <li><a href="#katalog" class="hover:text-pink-300 transition-colors">Anggrek Bulan Pot Soft Pink</a></li>
              <li><a href="#katalog" class="hover:text-pink-300 transition-colors">Buket Mawar Segar Holland</a></li>
              <li><a href="#katalog" class="hover:text-pink-300 transition-colors">Bloom Box Anggrek &amp; Mawar</a></li>
              <li><a href="#katalog" class="hover:text-pink-300 transition-colors">Standing Flower Grand Opening</a></li>
              <li><a href="#katalog" class="hover:text-pink-300 transition-colors">Vas Bunga Hidup Meja</a></li>
            </ul>
          </div>

          <!-- Col 3: Layanan & Jam Buka -->
          <div>
            <h4 class="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Jam Operasional
            </h4>
            <ul class="space-y-2.5">
              <li><strong class="text-white">Senin - Sabtu:</strong> 08.00 - 20.00 WIB</li>
              <li><strong class="text-white">Minggu / Libur:</strong> 08.00 - 17.00 WIB</li>
              <li class="pt-2 text-pink-300 font-medium">
                🌸 Pengiriman same-day bunga segar &amp; anggrek tersedia setiap hari.
              </li>
            </ul>
          </div>

          <!-- Col 4: Kontak & Area -->
          <div>
            <h4 class="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Studio Florist
            </h4>
            <ul class="space-y-2.5">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-location-dot mt-0.5 text-flora-rose"></i>
                <span>Kota Surakarta &amp; Sekitarnya, Jawa Tengah, Indonesia</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fa-solid fa-phone mt-0.5 text-flora-rose"></i>
                <span>+62 812-3456-7890</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fa-brands fa-instagram text-flora-rose"></i>
                <span>@zilquin_pesona_bunga_official</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-pink-200/60">
          <p>&copy; 2026 Zilquin Pesona Bunga. Seluruh hak cipta dilindungi.</p>
          <p>Dirancang dengan Vue 3 &amp; nuansa soft pink alami.</p>
        </div>
      </div>
    </footer>

    <!-- Order Modal -->
    <div
      v-if="selectedProduct"
      @click.self="closeOrderModal"
      id="orderModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop transition-opacity duration-300"
    >
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-flora-blush overflow-y-auto max-h-[90vh]">
        <button
          type="button"
          @click="closeOrderModal"
          aria-label="Tutup modal pemesanan"
          class="absolute top-5 right-5 text-flora-muted hover:text-flora-dark p-2 text-lg"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="mb-5">
          <span class="text-[11px] font-bold text-flora-terracotta uppercase tracking-widest block mb-1">
            🌸 Form Pemesanan Bunga Hidup
          </span>
          <h3 class="font-serif text-2xl font-bold text-flora-dark">
            {{ selectedProduct.name }}
          </h3>
          <p class="text-xs text-flora-muted mt-1">
            {{ selectedProduct.flowerType }} • {{ selectedProduct.priceLabel }}
          </p>
        </div>

        <form id="orderForm" @submit.prevent="handleOrderSubmit" class="space-y-4 text-xs sm:text-sm">
          <div>
            <label class="block font-medium text-flora-dark mb-1">Produk Dipilih</label>
            <input
              type="text"
              :value="`${selectedProduct.name} - ${selectedProduct.priceLabel}`"
              readonly
              class="w-full bg-pink-50 border border-flora-blush rounded-xl px-3.5 py-2.5 text-flora-dark font-semibold"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="orderName" class="block font-medium text-flora-dark mb-1">Nama Pemesan</label>
              <input
                id="orderName"
                v-model="orderForm.customerName"
                type="text"
                required
                placeholder="Nama Anda"
                class="w-full border border-flora-blush focus:border-flora-terracotta focus:ring-1 focus:ring-flora-terracotta rounded-xl px-3.5 py-2.5 outline-none"
              />
            </div>
            <div>
              <label for="orderDate" class="block font-medium text-flora-dark mb-1">Tanggal Diperlukan</label>
              <input
                id="orderDate"
                v-model="orderForm.deliveryDate"
                type="date"
                required
                class="w-full border border-flora-blush focus:border-flora-terracotta focus:ring-1 focus:ring-flora-terracotta rounded-xl px-3.5 py-2.5 outline-none"
              />
            </div>
          </div>

          <div>
            <label for="orderColorTheme" class="block font-medium text-flora-dark mb-1">
              Nuansa Warna / Catatan Khusus
            </label>
            <input
              id="orderColorTheme"
              v-model="orderForm.colorTheme"
              type="text"
              placeholder="Contoh: Dominan Soft Pink &amp; Putih Lilac"
              class="w-full border border-flora-blush focus:border-flora-terracotta focus:ring-1 focus:ring-flora-terracotta rounded-xl px-3.5 py-2.5 outline-none"
            />
          </div>

          <div>
            <label for="orderCardText" class="block font-medium text-flora-dark mb-1">
              Teks Kartu Ucapan (Gratis Dicetak)
            </label>
            <textarea
              id="orderCardText"
              v-model="orderForm.cardText"
              rows="2"
              placeholder="Tuliskan ucapan untuk penerima (Contoh: Happy Birthday, Sukses Selalu, dll)..."
              class="w-full border border-flora-blush focus:border-flora-terracotta focus:ring-1 focus:ring-flora-terracotta rounded-xl px-3.5 py-2.5 outline-none"
            ></textarea>
          </div>

          <div class="p-3 bg-pink-50 rounded-xl border border-flora-blush text-[11px] text-flora-dark flex items-start gap-2">
            <i class="fa-solid fa-circle-info text-flora-terracotta mt-0.5"></i>
            <span>Pesan akan otomatis terformat rapi dan dialihkan langsung ke WhatsApp admin florist Zilquin.</span>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-flora-terracotta to-[#C23F66] hover:from-flora-dark hover:to-flora-dark text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-300/40"
            >
              <i class="fa-brands fa-whatsapp text-lg"></i>
              <span>Lanjutkan Pesan ke WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Floating WhatsApp Button -->
    <div class="fixed bottom-6 right-6 z-40">
      <a
        :href="generalWaLink"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Langsung"
        class="relative group flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <i class="fa-brands fa-whatsapp text-3xl"></i>
        <span
          class="absolute right-16 bg-white text-flora-dark text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg border border-flora-blush whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block"
        >
          Tanya Bunga Hidup &amp; Anggrek 👋
        </span>
      </a>
    </div>
  </div>
</template>
