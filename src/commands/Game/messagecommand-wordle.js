const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

const wordList = [
    'ABADI', 'ACARA', 'ADZAN', 'AKHIR', 'AKTIF', 'ALAMI', 'ALASAN', 'ALBUM', 'AMBIL', 'ANAKAN',
    'ANGIN', 'ANGKA', 'ANIME', 'ANTRI', 'APLIK', 'APRIL', 'AROMA', 'ARSIP', 'ARTIS', 'ASING',
    'ASPAL', 'ASRAM', 'ATLAS', 'AUDIO', 'AULIA', 'AWANG', 'AYANK', 'BABAK', 'BADAN', 'BAGAN',
    'BAHAN', 'BAHWA', 'BAJAU', 'BAJUAN', 'BAKAR', 'BAKAT', 'BALOK', 'BALON', 'BANCI', 'BANDA',
    'BANIR', 'BANJIR', 'BANTU', 'BARAT', 'BARIS', 'BARUT', 'BASAH', 'BASIS', 'BATAK', 'BATAL',
    'BATAS', 'BATIK', 'BATIN', 'BATUAN', 'BATUK', 'BAYAR', 'BEBAS', 'BEBEK', 'BEKAS', 'BELAJ',
    'BENAR', 'BENDA', 'BENIH', 'BERAS', 'BERAT', 'BERES', 'BESAR', 'BESI', 'BESOK', 'BIASA',
    'BIAYA', 'BIBIR', 'BIJAK', 'BIKIN', 'BILAS', 'BINTI', 'BIOLA', 'BISIK', 'BISNIS', 'BOKER',
    'BONUS', 'BOSAN', 'BOTOL', 'BUANG', 'BUAYA', 'BUBAR', 'BUDHA', 'BUKTI', 'BUKUAN', 'BULAN',
    'BUMBU', 'BUNYI', 'BURUK', 'BURUNG', 'BUSAH', 'BUSUR', 'BUTUH', 'CABAI', 'CABANG', 'CADEL',
    'CAGAR', 'CAKAP', 'CALON', 'CANDU', 'CANGK', 'CAPAI', 'CEPAT', 'CERAH', 'CERDAS', 'CERIA',
    'CEWEK', 'CUKUP', 'CUMA', 'CUMAN', 'DADAAN', 'DAGEL', 'DAGUAN', 'DAMAI', 'DANAU', 'DAPAT',
    'DARAH', 'DARAT', 'DASAR', 'DATANG', 'DATAR', 'DEBAT', 'DEKAT', 'DEMAM', 'DENDA', 'DEPAN',
    'DERET', 'DESAAN', 'DESIR', 'DEWASA', 'DIAM', 'DINAS', 'DIRIA', 'DOAAN', 'DOKTER', 'DONAT',
    'DOSIS', 'DUNIA', 'DUREN', 'DURIAN', 'DUSUN', 'EJAAN', 'EKSEK', 'EMBER', 'EMBUN', 'EMPAT',
    'ENAM', 'ENERGI', 'FAKTA', 'FAKUL', 'FARMA', 'FOKUS', 'FORUM', 'FOTOAN', 'FRASA', 'GAGAH',
    'GAGAL', 'GAJAH', 'GAJIAN', 'GALAK', 'GALAU', 'GAMBAR', 'GANAS', 'GANDA', 'GANGGU', 'GANJIL',
    'GANTU', 'GARAM', 'GARIS', 'GARPU', 'GAUL', 'GAYAA', 'GEDUNG', 'GEJAL', 'GELAP', 'GELAS',
    'GEMA', 'GEMAS', 'GENAP', 'GERAK', 'GERAM', 'GESER', 'GETAR', 'GIGIH', 'GILAS', 'GIRANG',
    'GITU', 'GLAS', 'GOYANG', 'GULAI', 'GULAT', 'GULIR', 'GUMAM', 'GUNA', 'GURAU', 'GURUN',
    'HABIS', 'HADAP', 'HADIAH', 'HADIR', 'HAFAL', 'HAJAR', 'HALAL', 'HALUS', 'HAMIL', 'HAMPA',
    'HANCU', 'HANDA', 'HANGAT', 'HANTU', 'HAPUS', 'HARAM', 'HARAP', 'HARGA', 'HARTA', 'HARUM',
    'HARUS', 'HASIL', 'HASYA', 'HAYAL', 'HEBAT', 'HEMAT', 'HERAN', 'HEWAN', 'HIBUR', 'HIDUP',
    'HIJAU', 'HILANG', 'HINDI', 'HINGG', 'HITAM', 'HITUNG', 'HUJAN', 'HUKUM', 'HURUF', 'HUTAN',
    'IBADAH', 'IDEAL', 'IJIN', 'IKLAN', 'IKRAR', 'IKUTI', 'ILMU', 'IMPI', 'INDAH', 'INDUK',
    'INFAN', 'INGAT', 'INGIN', 'INSAN', 'INTAN', 'INTI', 'IRAMA', 'IRIS', 'ISRA', 'ISTRI',
    'ITIK', 'IURAN', 'JADWAL', 'JAGAD', 'JAGUAN', 'JAJAN', 'JAKSA', 'JALAN', 'JAMAN', 'JAMBU',
    'JAMIN', 'JAMUR', 'JANDA', 'JANJI', 'JARAK', 'JARAN', 'JARUM', 'JATAH', 'JATUH', 'JAUH',
    'JAWAB', 'JAYAA', 'JEBAK', 'JEDA', 'JEJAK', 'JEJAL', 'JELAS', 'JELITA', 'JEMAR', 'JENIS',
    'JENUH', 'JERUK', 'JIWAA', 'JODOH', 'JOGET', 'JUARA', 'JUDUL', 'JUGA', 'JUJUR', 'JUMAT',
    'JUMLAH', 'JUMPA', 'JURNAL', 'JURUS', 'KABAR', 'KABEL', 'KABUR', 'KACAAN', 'KADAR', 'KADO',
    'KAFE', 'KAGET', 'KAGUM', 'KAIL', 'KAIN', 'KAJIAN', 'KAKAK', 'KAKU', 'KALAH', 'KALAU',
    'KALBU', 'KALDU', 'KALEM', 'KALI', 'KALUNG', 'KAMAR', 'KAMIS', 'KAMUS', 'KANAL', 'KANAN',
    'KANDA', 'KANKER', 'KANTON', 'KAPAL', 'KAPAS', 'KAPUR', 'KARAK', 'KAREN', 'KARIA', 'KARNA',
    'KARTU', 'KARUN', 'KARYA', 'KASAR', 'KASIH', 'KASIR', 'KASUR', 'KASUS', 'KATAK', 'KATAAN',
    'KATUN', 'KAUM', 'KAWAT', 'KAYA', 'KAYU', 'KEBUN', 'KECAP', 'KECIL', 'KEDAI', 'KEJAM',
    'KEJAR', 'KEJAM', 'KELAS', 'KELIN', 'KELOM', 'KELUA', 'KEMAL', 'KEMAR', 'KEMAS', 'KEMUD',
    'KENAL', 'KENAN', 'KENCAN', 'KENTAL', 'KENTAN', 'KERAK', 'KERAN', 'KERAS', 'KERJA', 'KERTA',
    'KESAL', 'KESAN', 'KETAT', 'KETIK', 'KETUA', 'KHAIR', 'KHASI', 'KHAS', 'KIDAL', 'KIKIR',
    'KILAS', 'KIMIA', 'KINER', 'KIPAS', 'KIRA', 'KIRIM', 'KISAH', 'KITAB', 'KLAN', 'KLASIK',
    'KLINIK', 'KOALA', 'KOBAR', 'KODE', 'KOKOH', 'KOLAM', 'KOLEK', 'KOLON', 'KOMIK', 'KOMPA',
    'KONSEP', 'KONTAN', 'KOPLAK', 'KOPYOR', 'KORAN', 'KOREK', 'KORIS', 'KORSA', 'KOTA', 'KOTAK',
    'KOTOR', 'KRIST', 'KUASA', 'KUAT', 'KUBU', 'KUCIN', 'KUDAA', 'KULIA', 'KULIT', 'KUMAN',
    'KUMIS', 'KUMUL', 'KUNCI', 'KUNIN', 'KUNO', 'KUPAS', 'KURAN', 'KURSI', 'KURUN', 'KURUS',
    'KUSTA', 'KUSUT', 'KUTIP', 'LABA', 'LABIL', 'LABUH', 'LACAK', 'LAHAN', 'LAHIR', 'LAIN',
    'LAJUR', 'LAKON', 'LALAP', 'LALAT', 'LALU', 'LAMAN', 'LAMBA', 'LAMBU', 'LAMPU', 'LANAI',
    'LANCH', 'LANDA', 'LANGI', 'LANTU', 'LAPAR', 'LAPIS', 'LAPOR', 'LARAN', 'LARAS', 'LARIS',
    'LARUT', 'LATAR', 'LATIH', 'LAUK', 'LAUT', 'LAYAK', 'LAYAN', 'LAYAR', 'LAZIM', 'LEBAK',
    'LEBAR', 'LEBIH', 'LECEH', 'LEDAK', 'LEGAK', 'LEHER', 'LELAH', 'LELANG', 'LEMAH', 'LEMAK',
    'LEMBAR', 'LEMBU', 'LEMES', 'LENDIR', 'LENGAN', 'LENGK', 'LENSA', 'LEPAS', 'LERAI', 'LEREN',
    'LESAN', 'LESTAL', 'LESU', 'LETUS', 'LEWAT', 'LIBUR', 'LIDAH', 'LIDI', 'LIGA', 'LIHAT',
    'LILIN', 'LIMA', 'LIMBA', 'LIMPA', 'LINCA', 'LINDU', 'LINGK', 'LINTA', 'LIPAN', 'LIPAT',
    'LIPUR', 'LISAN', 'LISTR', 'LITER', 'LIUR', 'LOBAK', 'LOBI', 'LOGAM', 'LOGIK', 'LOKAL',
    'LOKAS', 'LOKET', 'LOLOS', 'LOMBA', 'LONGS', 'LONJE', 'LORON', 'LULUS', 'LUMAT', 'LUMBA',
    'LUMPU', 'LUMUT', 'LUNAK', 'LUNAS', 'LUNAS', 'LUPAA', 'LURAH', 'LURUS', 'LUTUT', 'LUWAT',
    'LUYAK', 'MABUK', 'MACAM', 'MADYA', 'MAFIA', 'MAGIS', 'MAGMA', 'MAGRIB', 'MAHAL', 'MAHIR',
    'MAIN', 'MAJAL', 'MAJAS', 'MAJEL', 'MAJU', 'MAKAN', 'MAKAT', 'MAKHL', 'MAKNA', 'MAKSI',
    'MALAM', 'MALAS', 'MALU', 'MAMPU', 'MANAA', 'MANAJ', 'MANCA', 'MANDI', 'MANDU', 'MANFA',
    'MANGG', 'MANIS', 'MANJA', 'MANSI', 'MANTA', 'MANTU', 'MANUS', 'MAPAN', 'MARAH', 'MARET',
    'MARGA', 'MARI', 'MARIN', 'MASAA', 'MASAK', 'MASAM', 'MASIH', 'MASIN', 'MASUK', 'MASYA',
    'MATA', 'MATAN', 'MATI', 'MAU', 'MAWAR', 'MAYAT', 'MEDIA', 'MEDIS', 'MEGA', 'MEGEL',
    'MEKAR', 'MELEK', 'MELON', 'MEMAN', 'MENAN', 'MENDA', 'MENGA', 'MENIT', 'MENJA', 'MENOL',
    'MENTA', 'MENTI', 'MENUR', 'MERAH', 'MERAK', 'MERAM', 'MERAN', 'MERDE', 'MERDU', 'MEREK',
    'MEREM', 'MERIA', 'MERIN', 'MESAN', 'MESIN', 'MESRA', 'MESTI', 'METRE', 'METRO', 'MEWAH',
    'MIDIA', 'MIKIR', 'MIKRO', 'MILIK', 'MIMPI', 'MINAT', 'MINGG', 'MINIM', 'MINTA', 'MINUM',
    'MINUS', 'MIRIP', 'MIRIS', 'MISAL', 'MISI', 'MISKI', 'MISTI', 'MITRA', 'MOBIL', 'MODAL',
    'MODEL', 'MODER', 'MODUL', 'MODUS', 'MOHON', 'MOLEK', 'MOMEN', 'MOMOK', 'MOTOR', 'MUARA',
    'MUDAA', 'MUDIK', 'MUGER', 'MUJUR', 'MUKA', 'MUKIM', 'MULAI', 'MULIA', 'MULUS', 'MULUT',
    'MUMET', 'MUMUK', 'MUNCU', 'MUNDU', 'MUNGU', 'MUNIC', 'MUNTA', 'MURAH', 'MURID', 'MURNI',
    'MURUT', 'MUSUH', 'MUTAN', 'MUTIA', 'MUTU', 'MUYAK', 'NABII', 'NADA', 'NADIR', 'NAFAS',
    'NAFSU', 'NAGAA', 'NAIK', 'NAKAL', 'NALAR', 'NAMAA', 'NAMPAK', 'NAMUN', 'NANAS', 'NANDA',
    'NANTI', 'NAPAS', 'NASAB', 'NASIB', 'NASIK', 'NASYA', 'NATAL', 'NAUNG', 'NEKAT', 'NENEK',
    'NERAK', 'NESIA', 'NETRA', 'NGERI', 'NIAGA', 'NIAT', 'NIDIA', 'NIFAS', 'NIKAH', 'NILAI',
    'NILAM', 'NIPIS', 'NIRWA', 'NISAN', 'NISTA', 'NOBEL', 'NOMOR', 'NONA', 'NORMA', 'NOTIF',
    'NOVEL', 'NUKLE', 'NURUL', 'NUSA', 'NYALA', 'NYALI', 'NYAMA', 'NYANY', 'NYATA', 'NYAWA',
    'OBAT', 'OBJEK', 'OBRAL', 'OBROL', 'ODONG', 'OKNUM', 'OKSAD', 'OKSIG', 'OLAH', 'OLAHR',
    'OMBAK', 'OPINI', 'OPTIF', 'OPTAL', 'ORANG', 'ORBIT', 'ORDER', 'ORDIN', 'ORGAN', 'ORGAS',
    'ORGIN', 'ORIDA', 'ORING', 'ORISA', 'ORLEN', 'ORLOP', 'ORMAT', 'ORNAM', 'ORONG', 'ORPEL',
    'ORTOD', 'OSKAR', 'OTAK', 'OTOT', 'OVARY', 'PABRI', 'PACAR', 'PACEL', 'PADAA', 'PADAM',
    'PADAN', 'PADAS', 'PADAT', 'PAGAR', 'PAGI', 'PAGUY', 'PAHAM', 'PAHAT', 'PAHIT', 'PAJAK',
    'PAKAI', 'PAKAN', 'PAKET', 'PAKSA', 'PAKU', 'PALSU', 'PALU', 'PAMAN', 'PAMER', 'PAMIT',
    'PAMON', 'PANAS', 'PANDA', 'PANEL', 'PANEN', 'PANGL', 'PANIT', 'PANJA', 'PANTA', 'PANTI',
    'PANTU', 'PAPAN', 'PAPAR', 'PARA', 'PARAH', 'PARAS', 'PARI', 'PARIS', 'PARKA', 'PARKIR',
    'PARLE', 'PARO', 'PARSA', 'PARSI', 'PARTA', 'PARTI', 'PARUT', 'PASAL', 'PASAR', 'PASIF',
    'PASIR', 'PASKA', 'PASMA', 'PASOK', 'PASTI', 'PASUK', 'PATAH', 'PATEN', 'PATIH', 'PATOK',
    'PATRA', 'PATRI', 'PATRO', 'PATUH', 'PATUK', 'PATUN', 'PATUT', 'PAUS', 'PAWAI', 'PAYAU',
    'PAYUN', 'PEBAL', 'PECEL', 'PECU', 'PEDAL', 'PEDAS', 'PEDEL', 'PEDIH', 'PEDUL', 'PEGAL',
    'PEGAN', 'PEGAS', 'PEGAW', 'PEJAM', 'PEKA', 'PEKAN', 'PEKAS', 'PEKAT', 'PEKER', 'PELAK',
    'PELAN', 'PELAP', 'PELAR', 'PELAS', 'PELAT', 'PELAY', 'PELEK', 'PELEP', 'PELIT', 'PELOK',
    'PELOP', 'PELOR', 'PELOT', 'PELU', 'PELUK', 'PELUR', 'PEMAL', 'PEMAN', 'PEMAR', 'PEMAS',
    'PEMAT', 'PEMBA', 'PEMBE', 'PEMBI', 'PEMBU', 'PEMER', 'PEMIC', 'PEMIH', 'PEMIK', 'PEMIL',
    'PEMIN', 'PEMIR', 'PEMIS', 'PEMUL', 'PEMUR', 'PENAK', 'PENAL', 'PENAM', 'PENAR', 'PENAS',
    'PENAT', 'PENDA', 'PENDE', 'PENEB', 'PENEM', 'PENER', 'PENET', 'PENGA', 'PENGE', 'PENGH',
    'PENGI', 'PENGU', 'PENIT', 'PENJA', 'PENJE', 'PENJU', 'PENSI', 'PENTA', 'PENTI', 'PENUH',
    'PENUR', 'PENYA', 'PENYE', 'PENYI', 'PEPAS', 'PEPAY', 'PERAH', 'PERAK', 'PERAM', 'PERAN',
    'PERAS', 'PERAT', 'PERCA', 'PERCE', 'PERCU', 'PERDA', 'PERDE', 'PERDI', 'PEREK', 'PEREM',
    'PEREN', 'PERES', 'PERGI', 'PERI', 'PERIK', 'PERIN', 'PERIS', 'PERIT', 'PERKA', 'PERKIL',
    'PERKU', 'PERLA', 'PERLU', 'PERMA', 'PERME', 'PERMI', 'PERNA', 'PERNE', 'PERNI', 'PERON',
    'PEROT', 'PERPA', 'PERPU', 'PERSA', 'PERSE', 'PERSI', 'PERTA', 'PERTI', 'PERTU', 'PERUT',
    'PERWI', 'PESAN', 'PESAT', 'PESAW', 'PESER', 'PESIR', 'PESTA', 'PESUT', 'PETAI', 'PETAK',
    'PETAL', 'PETAN', 'PETAR', 'PETAS', 'PETER', 'PETIK', 'PETIR', 'PETIS', 'PETIT', 'PETRA',
    'PETRI', 'PETRO', 'PETU', 'PIALA', 'PIANO', 'PICIK', 'PIDAN', 'PIHAK', 'PIJAT', 'PIKIR',
    'PIKNIK', 'PILAR', 'PILIH', 'PILOT', 'PINDA', 'PINGG', 'PINJA', 'PINSA', 'PINTA', 'PINTU',
    'PIPAA', 'PIPII', 'PIRAM', 'PIRIK', 'PIRIN', 'PIRSA', 'PIRUS', 'PISAH', 'PISANG', 'PISAU',
    'PITA', 'PITING', 'PITUR', 'PIYAM', 'PLAFO', 'PLANE', 'PLANI', 'PLANO', 'PLAST', 'PLATA',
    'PLATI', 'PLATO', 'PLENO', 'PLINT', 'PLUK', 'PLUMB', 'POHON', 'POKOK', 'POLA', 'POLAN',
    'POLAR', 'POLDA', 'POLEN', 'POLES', 'POLIK', 'POLIP', 'POLIS', 'POLIT', 'POLOS', 'POMPA',
    'PONAL', 'PONDA', 'PONDI', 'PONDO', 'PONGA', 'PONTI', 'POPUL', 'PORSI', 'PORTA', 'PORTO',
    'PORUS', 'POSIS', 'POSTE', 'POSTU', 'POTEN', 'POTRE', 'POTON', 'PRADA', 'PRAHA', 'PRAMU',
    'PRASA', 'PRASI', 'PRATAMA', 'PREDI', 'PREMA', 'PREMI', 'PRESB', 'PREST', 'PRIA', 'PRIBA',
    'PRIMA', 'PRINS', 'PRINT', 'PRIOR', 'PRISA', 'PRISI', 'PRISMA', 'PRIST', 'PRIVS', 'PRODU',
    'PROFE', 'PROFI', 'PROGR', 'PROJE', 'PROKO', 'PROMO', 'PRONA', 'PROPN', 'PROPO', 'PROSE',
    'PROSI', 'PROST', 'PROSY', 'PROTE', 'PROTO', 'PROVI', 'PROYE', 'PUASA', 'PUBLI', 'PUCUK',
    'PUDAR', 'PUGAR', 'PUISI', 'PUJA', 'PUJIA', 'PUKUL', 'PULANG', 'PULAU', 'PULEN', 'PULIH',
    'PULPA', 'PULSA', 'PUNCA', 'PUNYA', 'PUPUK', 'PURBA', 'PURNA', 'PUSAT', 'PUSID', 'PUSKA',
    'PUSPA', 'PUSTAK', 'PUTAR', 'PUTIH', 'PUTRA', 'PUTRI', 'PUTUS', 'PUYUH', 'QADAR', 'QURAN',
    'RABUA', 'RACUN', 'RADAR', 'RADEN', 'RADIO', 'RAFAH', 'RAGAA', 'RAGAM', 'RAGU', 'RAHIM',
    'RAHMAT', 'RAKYAT', 'RAMAI', 'RAMAL', 'RAMBU', 'RAMPA', 'RAMUAN', 'RANAH', 'RANCO', 'RANTA',
    'RAPAT', 'RAPI', 'RAPOR', 'RASAA', 'RASAM', 'RASIO', 'RASUL', 'RATA', 'RATAP', 'RATU',
    'RAWA', 'RAWAN', 'RAWAT', 'RAYA', 'RAYAP', 'REAK', 'REBAH', 'REBANA', 'REBUS', 'REDAK',
    'REDUP', 'REFORM', 'REKAM', 'REKAN', 'REKAP', 'REKOR', 'REKRE', 'REKUT', 'RELA', 'RELASI',
    'RELIEF', 'REMAJA', 'REMAN', 'REMID', 'REMIK', 'REMIS', 'REMOT', 'REMPA', 'RENDAH', 'RENGG',
    'RENTA', 'RENUN', 'REPOT', 'RESAP', 'RESEP', 'RESIK', 'RESMI', 'RESTU', 'RETAK', 'RETRE',
    'REVIS', 'RIAU', 'RIBUA', 'RIBUT', 'RILIS', 'RIMBA', 'RINDU', 'RINGA', 'RINTI', 'RIRIS',
    'RISAL', 'RISET', 'RISIKO', 'RIWAY', 'RODAA', 'ROKET', 'ROKOK', 'ROMAA', 'ROMAN', 'ROMBA',
    'RONDA', 'ROTAN', 'ROTI', 'RUANG', 'RUAS', 'RUBIK', 'RUGI', 'RUKUN', 'RUMAH', 'RUMPI',
    'RUMUS', 'RUNTU', 'RUPAA', 'RUPIAH', 'RUSAK', 'RUSIA', 'RUTIN', 'SABAR', 'SABDA', 'SABTU',
    'SABUN', 'SADAR', 'SADIS', 'SAFIR', 'SAGAA', 'SAHAB', 'SAHAM', 'SAID', 'SAINS', 'SAJAA',
    'SAJAK', 'SAJIA', 'SAKIT', 'SAKSI', 'SALAH', 'SALAM', 'SALDO', 'SALEH', 'SALIN', 'SALUR',
    'SAMAA', 'SAMAN', 'SAMBAL', 'SAMBA', 'SAMBIL', 'SAMBUT', 'SAMPAI', 'SAMPEL', 'SAMPU', 'SAMUD',
    'SANDA', 'SANDI', 'SANGAT', 'SANGG', 'SANGK', 'SAPAAN', 'SAPU', 'SARAN', 'SARAP', 'SARI',
    'SARJAA', 'SARUN', 'SARUT', 'SASAR', 'SASTRA', 'SATE', 'SATU', 'SATUAN', 'SAUDI', 'SAUR',
    'SAWAH', 'SAWUT', 'SAYANG', 'SAYAP', 'SAYUR', 'SEBAB', 'SEBAR', 'SEBUT', 'SEDANG', 'SEDAP',
    'SEDAR', 'SEDIK', 'SEDOT', 'SEDUH', 'SEGAR', 'SEGER', 'SEHAT', 'SEHATI', 'SEJATI', 'SEJUK',
    'SEKAD', 'SEKAL', 'SEKAP', 'SEKAS', 'SEKAT', 'SEKIL', 'SEKOL', 'SEKRU', 'SEKTE', 'SEKU',
    'SEKUT', 'SELAA', 'SELAL', 'SELAM', 'SELAR', 'SELAS', 'SELAT', 'SELEB', 'SELEK', 'SELEP',
    'SELES', 'SELID', 'SELIM', 'SELIP', 'SELIR', 'SELOK', 'SELOR', 'SELOT', 'SELUR', 'SEMAL',
    'SEMAM', 'SEMAN', 'SEMAR', 'SEMAS', 'SEMAT', 'SEMBA', 'SEMBE', 'SEMBI', 'SEMBO', 'SEMBU',
    'SEMEN', 'SEMES', 'SEMIR', 'SEMOT', 'SEMPA', 'SEMPU', 'SEMUA', 'SEMUR', 'SEMUT', 'SENAD',
    'SENAM', 'SENAN', 'SENAP', 'SENAR', 'SENAT', 'SENDA', 'SENDI', 'SENI', 'SENIN', 'SENJA',
    'SENJU', 'SENTA', 'SENTI', 'SENTU', 'SENUM', 'SENYA', 'SENYUM', 'SEPAK', 'SEPAN', 'SEPAT',
    'SEPER', 'SEPI', 'SEPUL', 'SEPUP', 'SERAG', 'SERAH', 'SERAK', 'SERAM', 'SERAN', 'SERAP',
    'SERAT', 'SERBA', 'SERBU', 'SERDA', 'SEREM', 'SERES', 'SERET', 'SERGIE', 'SERIA', 'SERIK',
    'SERIN', 'SERIP', 'SERIUS', 'SERTA', 'SERTU', 'SERUB', 'SERUK', 'SERUL', 'SERUM', 'SERUN',
    'SERUT', 'SESAL', 'SESAM', 'SESAP', 'SESAR', 'SESAT', 'SESUAI', 'SETEL', 'SETIA', 'SETIR',
    'SETOR', 'SETUJU', 'SEWA', 'SEWOT', 'SIAK', 'SIAL', 'SIAM', 'SIANG', 'SIAP', 'SIAPA',
    'SIAR', 'SIASAT', 'SIBIB', 'SIBUK', 'SIDAN', 'SIDIK', 'SIFAT', 'SIGAP', 'SIHIR', 'SIKAP',
    'SIKAT', 'SIKSA', 'SIKU', 'SILA', 'SILAM', 'SILAT', 'SILIH', 'SILIT', 'SIMAK', 'SIMBO',
    'SIMPA', 'SIMPU', 'SINAR', 'SINDI', 'SINGA', 'SINGK', 'SINYA', 'SIPIL', 'SIPIR', 'SIPIT',
    'SIRAM', 'SIRAP', 'SIRIK', 'SIRIP', 'SIRNA', 'SIRSA', 'SIRUP', 'SISAA', 'SISIK', 'SISIL',
    'SISIP', 'SISIR', 'SISWA', 'SITUS', 'SIVAS', 'SIWAK', 'SIYUL', 'SKALA', 'SKENAR', 'SKOR',
    'SOBAT', 'SOBEK', 'SODOR', 'SOFAN', 'SOPAN', 'SOPIR', 'SORAK', 'SOROT', 'SOSIAL', 'SOSOK',
    'SOTO', 'SPASI', 'SPION', 'SPORA', 'SPORT', 'STAFF', 'START', 'STASI', 'STIK', 'STIL',
    'STOK', 'STRES', 'STUDI', 'SUARA', 'SUAS', 'SUATU', 'SUBUH', 'SUCI', 'SUDAH', 'SUDUT',
    'SUGAR', 'SUHU', 'SUJUD', 'SUKAA', 'SUKAR', 'SUKSES', 'SULAM', 'SULING', 'SULIT', 'SULUH',
    'SULUN', 'SULUT', 'SUMBA', 'SUMBE', 'SUMPA', 'SUMUR', 'SUNAI', 'SUNAN', 'SUNGA', 'SUNGG',
    'SUNYI', 'SUPAI', 'SUPAN', 'SUPEL', 'SUPIR', 'SURAM', 'SURAT', 'SURGA', 'SURUH', 'SURUT',
    'SURYA', 'SUSAH', 'SUSUK', 'SUSUL', 'SUSUN', 'SUSUP', 'SUSUR', 'SUTRA', 'SUWAK', 'SUWAR',
    'SYAIR', 'SYARAT', 'SYEKH', 'SYUKUR', 'TABAH', 'TABEL', 'TABIR', 'TABRA', 'TABU', 'TABUH',
    'TABUN', 'TABUR', 'TADAH', 'TAGIH', 'TAHAN', 'TAHAP', 'TAHIA', 'TAHUN', 'TAJAM', 'TAJIR',
    'TAKAD', 'TAKAR', 'TAKDIR', 'TAKIR', 'TAKUT', 'TALAK', 'TALAM', 'TALAN', 'TALAS', 'TALAT',
    'TALI', 'TAMAK', 'TAMAN', 'TAMAR', 'TAMAT', 'TAMBA', 'TAMPI', 'TAMPU', 'TAMUN', 'TANAH',
    'TANDA', 'TANDU', 'TANGG', 'TANGK', 'TANYA', 'TAPAK', 'TAPEL', 'TAPI', 'TAPIS', 'TAPOL',
    'TARAF', 'TARIK', 'TARIF', 'TARIK', 'TARIP', 'TARIS', 'TARU', 'TARUH', 'TARUK', 'TARUM',
    'TARUN', 'TARUT', 'TASIK', 'TATA', 'TATAP', 'TATAR', 'TATAS', 'TAUBAT', 'TAUHID', 'TAUR',
    'TAWA', 'TAWAF', 'TAWAN', 'TAWAR', 'TEBAL', 'TEBAR', 'TEBAS', 'TEBAT', 'TEBING', 'TEBUA',
    'TEBUN', 'TEBUR', 'TEDUH', 'TEGA', 'TEGAK', 'TEGANG', 'TEGAR', 'TEGAS', 'TEGEL', 'TEGOR',
    'TEGUH', 'TEGUK', 'TEKAD', 'TEKAN', 'TEKAS', 'TEKAT', 'TEKUK', 'TEKUN', 'TEKUP', 'TELAD',
    'TELAK', 'TELAN', 'TELAP', 'TELAS', 'TELAT', 'TELIH', 'TELIK', 'TELOR', 'TELUK', 'TELUR',
    'TELUT', 'TEMAN', 'TEMAT', 'TEMBA', 'TEMBE', 'TEMBI', 'TEMBO', 'TEMBU', 'TEMEN', 'TEMPA',
    'TEMPO', 'TEMPU', 'TEMU', 'TENAG', 'TENAN', 'TENDA', 'TENER', 'TENGA', 'TENIS', 'TENTU',
    'TENUN', 'TEPAT', 'TEPI', 'TEPIK', 'TEPIR', 'TEPIS', 'TEPOK', 'TEPUNG', 'TERAK', 'TERAM',
    'TERAN', 'TERAP', 'TERAS', 'TERAT', 'TERBA', 'TERBE', 'TERBI', 'TERBO', 'TERBU', 'TERCE',
    'TERDA', 'TERDE', 'TERDI', 'TEREK', 'TEREM', 'TEREN', 'TERES', 'TERGI', 'TERIA', 'TERIK',
    'TERIN', 'TERIP', 'TERIS', 'TERJA', 'TERJE', 'TERJU', 'TERKA', 'TERKE', 'TERKU', 'TERLA',
    'TERLU', 'TERMA', 'TERME', 'TERMI', 'TERNA', 'TERNE', 'TERNI', 'TERON', 'TEROT', 'TERPA',
    'TERPU', 'TERSA', 'TERSE', 'TERSI', 'TERTA', 'TERTI', 'TERTU', 'TERUT', 'TESIS', 'TETAP',
    'TETAS', 'TETES', 'TETIR', 'TETUA', 'TETUK', 'TEWAS', 'TIADA', 'TIANG', 'TIAP', 'TIBAS',
    'TIDAK', 'TIDUR', 'TIGA', 'TIKAM', 'TIKUS', 'TILAM', 'TILAS', 'TILIK', 'TIMAH', 'TIMANG',
    'TIMBA', 'TIMBO', 'TIMBU', 'TIMOR', 'TIMPA', 'TIMPU', 'TIMUN', 'TIMUR', 'TINDA', 'TINGG',
    'TINJA', 'TINTA', 'TIPIS', 'TIRAI', 'TIRAM', 'TIRAS', 'TIRIK', 'TIRIN', 'TIRIS', 'TIRTA',
    'TIRTI', 'TIRTO', 'TIRU', 'TIRUK', 'TIRUS', 'TISIK', 'TITIK', 'TITIL', 'TITIP', 'TITIR',
    'TIUP', 'TIWAS', 'TOBAT', 'TOKOH', 'TOLAK', 'TOLE', 'TOLER', 'TOLONG', 'TOMAT', 'TOMBO',
    'TONDA', 'TONGK', 'TONTO', 'TOPAN', 'TOPAS', 'TOPEL', 'TOPI', 'TOPIN', 'TOPON', 'TOTAL',
    'TOTEM', 'TOTOK', 'TRADA', 'TRAFI', 'TRAGI', 'TRAIR', 'TRAKA', 'TRAKO', 'TRANS', 'TRASA',
    'TRASI', 'TRAYE', 'TREMO', 'TREN', 'TRESI', 'TRILI', 'TRIMO', 'TRINU', 'TRIO', 'TRIP',
    'TRIPL', 'TRISU', 'TRITI', 'TROFE', 'TROLI', 'TROMP', 'TRONI', 'TROPO', 'TROSS', 'TROTO',
    'TRUBU', 'TRUK', 'TRUS', 'TUAA', 'TUAK', 'TUAM', 'TUAN', 'TUANG', 'TUAS', 'TUBAA', 'TUBES',
    'TUBIR', 'TUBIS', 'TUBIT', 'TUBRA', 'TUBUH', 'TUDUH', 'TUGAS', 'TUJU', 'TUJUH', 'TUKAR',
    'TUKAS', 'TUKIK', 'TUKIR', 'TUKIS', 'TUKUL', 'TUKUP', 'TULAN', 'TULAS', 'TULAT', 'TULI',
    'TULIS', 'TULUP', 'TULUS', 'TUMAN', 'TUMAS', 'TUMAT', 'TUMBA', 'TUMBE', 'TUMBI', 'TUMBU',
    'TUMIS', 'TUMIT', 'TUMPA', 'TUMPI', 'TUMPU', 'TUNAI', 'TUNAK', 'TUNAM', 'TUNAS', 'TUNDA',
    'TUNDU', 'TUNGA', 'TUNGE', 'TUNGU', 'TUNJA', 'TUNJE', 'TUNJU', 'TUNTA', 'TUNTE', 'TUNTU',
    'TURAN', 'TURAS', 'TURAT', 'TURI', 'TURIK', 'TURIN', 'TURIS', 'TURNA', 'TURNE', 'TURNI',
    'TURUN', 'TURUS', 'TURUT', 'TUSIR', 'TUSUK', 'TUTUP', 'TUTUR', 'TUWAK', 'TUWAR', 'TYPEN',
    'UCAP', 'UCAPAN', 'UDANG', 'UDARA', 'UGAMA', 'UJIAN', 'UKIR', 'UKUR', 'ULAMA', 'ULAR',
    'ULAS', 'ULAT', 'UMAT', 'UMBAI', 'UMBAN', 'UMBAR', 'UMBI', 'UMBUL', 'UMUM', 'UMUR',
    'UNDAN', 'UNDAS', 'UNDAT', 'UNDUR', 'UNGGA', 'UNGGU', 'UNGKI', 'UNGKU', 'UNGSI', 'UNGU',
    'UNIK', 'UNIT', 'UNSUR', 'UNTA', 'UNTUK', 'UNTUN', 'UPAYA', 'UPACA', 'URAI', 'URAT',
    'URBAN', 'URGEN', 'URIP', 'URUN', 'URUS', 'URUT', 'USAHA', 'USAIA', 'USIL', 'USIR',
    'USRA', 'USTAD', 'USUL', 'USUR', 'USUT', 'UTAMA', 'UTARA', 'UTAS', 'UTUH', 'UTUS',
    'VAKUM', 'VALAS', 'VALDA', 'VANDA', 'VARIA', 'VASAL', 'VASKU', 'VEGAT', 'VEMAS', 'VENES',
    'VENTI', 'VERBA', 'VERIF', 'VERSA', 'VERSI', 'VERTI', 'VETER', 'VETIN', 'VETRA', 'VETRO',
    'VIDEO', 'VINIL', 'VIRAL', 'VIRTU', 'VIRUS', 'VISAA', 'VISI', 'VISIO', 'VISIT', 'VISMA',
    'VISTA', 'VISUAL', 'VITAL', 'VITAS', 'VITRI', 'VITRO', 'VIVID', 'VOCAL', 'VOKAL', 'VOLTA',
    'VOLTE', 'VOLUM', 'VONIS', 'VOTUM', 'WABAH', 'WADAH', 'WADAK', 'WADAS', 'WADAT', 'WADUH',
    'WAFAT', 'WAGUB', 'WAJAH', 'WAJAR', 'WAJIB', 'WAJIK', 'WAKAF', 'WAKIL', 'WAKTU', 'WALAU',
    'WALI', 'WALIK', 'WALIM', 'WALIR', 'WALIS', 'WAMAL', 'WAMAS', 'WAMAT', 'WANAT', 'WANDA',
    'WANGI', 'WANITA', 'WARAS', 'WARGA', 'WARIA', 'WARIS', 'WARNA', 'WARTA', 'WARU', 'WARUN',
    'WASAL', 'WASAN', 'WASI', 'WASIA', 'WASIK', 'WASIL', 'WASIR', 'WASIT', 'WASPA', 'WATAK',
    'WATAN', 'WATAS', 'WATES', 'WAWAS', 'WAYAN', 'WAYAR', 'WIDIA', 'WIJAY', 'WIKAN', 'WILAY',
    'WINDU', 'WIRA', 'WIRAAM', 'WIRAS', 'WISMA', 'WORTEL', 'WUDHU', 'WUJUD', 'WUKUF', 'WULAN',
    'WUWUN', 'XENON', 'YAKIN', 'YANG', 'YATIM', 'YAYAS', 'YOGA', 'YUANA', 'YUDAS', 'YUNAN',
    'YUNIO', 'YURID', 'YUSUF', 'ZABUR', 'ZAKAT', 'ZALIM', 'ZAMAN', 'ZAMBR', 'ZAMZA', 'ZARAH',
    'ZAT', 'ZEBRA', 'ZEN', 'ZIARA', 'ZIGOT', 'ZIKIR', 'ZODIA', 'ZONA', 'ZULFI', 'ZULHU', 'ZULKA'
];

module.exports = new MessageCommand({
    command: {
        name: 'wordle',
        description: 'Bermain tebak kata 5 huruf (Wordle) bersama Hanekawa.'
    },
    run: async (client, message, args) => {
        const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
        let attempts = 0;
        const maxAttempts = 6;
        const guesses = [];

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Hanekawa Wordle', iconURL: client.user.displayAvatarURL() })
            .setTitle('🧩 Wordle Indonesia')
            .setDescription(`Tebak kata **5 huruf** dalam **6 kali percobaan**.\n\nKetik kata 5 huruf di chat sekarang!`)
            .setColor('#f8a5c2')
            .setFooter({ text: 'Gunakan h?stop untuk menyerah.' });

        await message.reply({ embeds: [embed] });

        const filter = m => m.author.id === message.author.id && m.content.length === 5;
        const collector = message.channel.createMessageCollector({ filter, time: 300000 });

        collector.on('collect', async m => {
            const guess = m.content.toUpperCase();
            if (!/^[A-Z]+$/.test(guess)) return;

            attempts++;
            const resultRow = checkWord(guess, targetWord);
            guesses.push(`${guess} \n${resultRow}`);

            const gameEmbed = new EmbedBuilder()
                .setAuthor({ name: 'Hanekawa Wordle', iconURL: client.user.displayAvatarURL() })
                .setTitle('🧩 Wordle Indonesia')
                .setDescription(guesses.join('\n\n'))
                .setColor('#f8a5c2')
                .setFooter({ text: `Percobaan: ${attempts}/${maxAttempts}` });

            await m.reply({ embeds: [gameEmbed] });

            if (guess === targetWord) {
                collector.stop('win');
                return m.channel.send(`🎉 **Selamat!** Kamu berhasil menebak katanya: **${targetWord}**!`);
            }

            if (attempts >= maxAttempts) {
                collector.stop('lose');
                return m.channel.send(`😔 Sayang sekali, katanya adalah **${targetWord}**.`);
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') message.channel.send('Waktunya habis! Permainan Wordle dihentikan.');
        });
    }
}).toJSON();

function checkWord(guess, target) {
    const result = new Array(5).fill('⬛');
    const targetArr = target.split('');
    const guessArr = guess.split('');

    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === targetArr[i]) {
            result[i] = '🟩';
            targetArr[i] = null;
            guessArr[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (guessArr[i] !== null) {
            const index = targetArr.indexOf(guessArr[i]);
            if (index !== -1) {
                result[i] = '🟨';
                targetArr[index] = null;
            }
        }
    }

    return result.join('');
}
