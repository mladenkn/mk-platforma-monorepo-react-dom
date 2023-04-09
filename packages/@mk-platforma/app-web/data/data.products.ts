import { faker } from "@faker-js/faker"
import * as cro_dataset from "./data.cro.dataset"
import { post_id_getNext, post_image_id_getNext } from "./data._utils"

const withRelatedProps = [
  {
    title: "Prodaja domaćih oraha",
    image: "https://www.njuskalo.hr/image-200x150/orasi/prodaja-domacih-oraha-slika-188755044.jpg",
    description: `Prodaju se domaći, kvalitetni i zdravi orasi, ručno brani u rujnu i listopadu 2022. Orasi su ručno očišćeni te su sačuvane cijele polovice jezgri.
Nasad oraha u skopu OPG-a se nalazi na području Međimurja.
Dostupne su veće količine očišćenih oraha i u ljusci na području Zagreba i Međimurja.

1kg očišćenih oraha - 8 €
1kg očišćenih oraha - 3 €
`,
  },
  {
    title: "KOCHA kućni set za pripremu kombuche",
    image:
      "https://www.njuskalo.hr/image-200x150/cajevi/kocha-kucni-set-pripremu-kombuche-slika-188395758.jpg",
    description: `Kućni set za pripremu kombuche uključuje sve što vam je potrebno da počnete pripremati ukusnu kombuchu bogatu probioticima u vlastitoj kuhinji.

    Bez obzira jeste li iskusni konzument kombuche ili ste novi u trendu, ovaj pribor olakšava stvaranje vlastitih jedinstvenih mješavina koristeći vaše omiljene čajeve, začine i voće. Započnite svoju kombucha pustolovinu već danas!
    
    Opširne upute vodit će vas kroz svaki korak procesa kuhanja, tako da možete uživati ​​u svježoj, domaćoj kombuchi u samo 7-14 dana.`,
  },
  {
    title: "prašak za točeni sladoled mješavina",
    image:
      "https://www.njuskalo.hr/image-200x150/hrana-pice-ostalo/prasak-toceni-sladoled-mjesavina-slika-34994516.jpg",
    description: `prašak za točeni sladoled mješavina:
    Mješavina pripremlena za uporabo u strojevima za soft sladoled.
    Dozacija 5 l vode na 2 kg smjese
    vrste okusa:
    -ČOKOLADA
    -VANILIJA
    -JAGODA
    -ŠUMSKO VOČE BOROVNICA
    -MALINA
    -BANANA
    -PISTACIJA
    -TROPICANA
    -JOGURT
    -JIGURT GRECCO
    -FIOR DI LATTE-ŠLAG-MLIJEČNI CVIJET
    -LEŠNJAK
    
    Cijena iznad 100 kg 37,5 kn
    Cijena za 1 kg 50 kn
    `,
  },
  {
    title: "Protein konoplje (protein 50%+) 400 g - u prahu - 100% hrvatsko",
    image:
      "https://www.njuskalo.hr/image-200x150/orasasti-plodovi-sjemenke/protein-konoplje-protein-50-400-g-prahu-100-hr-slika-94315389.jpg",
    description: `Protein konoplje izvrstan je izvor bjelančevina koji sadrži esencijalne aminokiseline (EAA), te je stoga najkompletniji biljni protein.
    Sjeme konoplje ima najveći udio globulina edistina u prirodi (cca. 65%) koji se smatra najlakše probavljivim proteinom, ne napuhava.
    Iznimno bogat izvor lako i brzo probavljivih proteina (svih aminokiselina i svih esencijalnih aminokiselina) i dijetetskih vlakana, izvor Omega-3 i Omega-6 te bogato vitaminima B i E, kalcijem, kalijem, željezom i magnezijem.
    Ne sadrži GLUTEN.
    Redovito konzumiranje osigurava urednu probavu.
    
    Više informacija o konoplji, proizvodima konoplje i web shop na www.cannabio.hr`,
  },
  {
    title: "UKC odvodne cijevi i pribor 110, 125, 160...",
    image:
      "https://www.njuskalo.hr/image-200x150/odvodne-cijevi/ukc-odvodne-cijevi-pribor-110-125-160-slika-188733751.jpg",
    description: `UKC odvodne cijevi i fiting za podzemnu ugradnju.
    Na zalihi dimenzije 110, 125, 160.
    -------------------------------------------------------------------------------
    Za vas smo dizajnirali dvije vrste okna:
    1. Revizijsko-prolazno okno promjera fi 400mm sa priključcima fi 160.
    2. Revizijski-sabirno okno promjera fi 400 mm sa 3 ulaza i jednim izlazom.
    Visina okana je 1 metar, s time da se okno kasnije reže na visinu gotovog terena i stavlja poklopac.
    -------------------------------------------------------------------------------
    Pošaljite nam popis potrebnog materijala sa vašim podacima na info@mikicdoo.hr ili fax 042 300 288. Dostavit ćemo vam ponudu na vaš email ili fax po kojoj možete izvršiti plačanje na pošti, bilo kojoj banci ili internet bankarstvom.
    Dostava robe je prema dogovoru.
    ----------------------------------------------------------------
    `,
  },
  {
    title: "Luster",
    image: "https://www.njuskalo.hr/image-200x150/lusteri/luster-slika-187392586.jpg",
    description: `Starinski luster, ispravan.`,
  },
  {
    title: "Ormari za spavaću sobu-očuvano",
    image:
      "https://www.njuskalo.hr/image-200x150/spavace-sobe-ormari/ormari-spavacu-sobu-ocuvano-slika-187322925.jpg",
    description: `Prodajem ormar za spavaću sobu ,očuvan, u dobrom stanju, malo oštećen`,
  },
  {
    title: "ICEPEAK VANCE jakna plava NOVO %OUTLET% RAČUN 36 RATA",
    image:
      "https://www.njuskalo.hr/image-200x150/muske-jakne-kaputi/icepeak-vance-muska-skijaska-jakna-plava-outlet-racun-36-rata-slika-181977557.jpg",
    description: ``,
  },
  {
    title: "Pliš crna M/L suknja duga skoro do gležnja NOVO Marks& Spencer",
    image:
      "https://www.njuskalo.hr/image-200x150/suknje/plis-crna-m-l-suknja-duga-skoro-gleznja-marks-spencer-slika-185069563.jpg",
    description: `Novo zapakirano, Icepeak Vance muška jakna najnoviji model, tamno plava, najnoviji model 2023g. Obucite se za zimu po %OUTLET% Cijenama!

    AKCIJSKE CIJENE RASPRODAJA DO KRAJA 01/2023!
    Cijena jednokratno plaćanje: 99,99 €
    Cijena kartice rate: 110,00 €
    
    Dostupnost u svim veličinama: 50, 52, 54, 56, 58.
    (Više komada odmah dostupno)
    
    Ova praktična softshell jakna iz Icepeaka namijenjena je muškarcima i izrađena je od vodo odbojnog materijala. Ima izuzetno fina vlakna koja daju mekanu površinu i lagan osjećaj.
    `,
  },
  {
    title: "Skejtbord Skateboard Penny, svjetleci kotaci i daska, NOV, dostava",
    image:
      "https://www.njuskalo.hr/image-200x150/skateboard/skejtbord-skateboard-svjetlecim-kotacima-potpuno-nov-slika-127897137.jpg",
    description: `U ponudi su 3 razlicita modela skateboarda. Sve 3 su potpuno nova i nekoristena i razlicitih su boja....

    01. Skejt sa obicnim silikonskim kotacima - cijena 16 € / 120,55 kn (zadnja slika)
    02. Skejt sa SVJETLECIM silikonskim kotacima - cijena 26 € / 195,90 kn (ostale slike)
    03. Skejt sa svjetlecim kotacima i daskom - cijena 39 € / 293,85 kn (slike od 1 do 6)
    
    Informacije preko SMS-a ili pozivom na 098 474 969....Može i na mail trgovina.emanuel@gmail.com ili preko njuskalo poruka, kao i preko vibera ili whatsappa. S obzirom da dio poruka poslanih preko maila i njuskalo poruka ode u spam najsigurniji nacin kontakta je preko SMS-a ili pozivom na 098 474 969....Ako saljete upite preko njuskala i maila molim ostavite i broj mobitela radi brzeg i jednostavnijeg kontakta......
    
    `,
  },
  {
    title: "BATERIJSKA LAMPA SVJETILJKA profesionalna s 2 baterijska uloška",
    image:
      "https://www.njuskalo.hr/image-200x150/sportska-oprema-ostalo/baterijska-lampa-profesionalna-2-baterijska-uloska-slika-147901611.jpg",
    description: `BATERIJSKA LAMPA - SVJETILJKA - profesionalna, kao nova.

    Pogodno za razne poslove gdje treba baterijska svjetiljka koja dugo svijetli: noćni čuvari, ophodnja, zaštitari ali i druge namjene: lov, ribolov, kampiranje i sl.
    
    Lampa radi na 2 punjive baterije što osigurava min. 3 sata jake rasvjete .... VIDI SLIKE
    
    Za punjanje baterije postoje 2 punjača: autopunjač i punjač na 230 V
    
    Vrlo kvalitetna i jaka svjetiljka - pogodna za profesionalce.`,
  },
]

export default function generateProducts(
  item_getMoreData: () => Record<string, unknown> = () => ({})
) {
  return withRelatedProps.map(({ title, image, description }) => ({
    ...item_getMoreData(),
    categories: ["sellable" as "sellable"],
    title,
    description,
    images: [
      {
        id: post_image_id_getNext(),
        url: image,
      },
    ],
  }))
}
