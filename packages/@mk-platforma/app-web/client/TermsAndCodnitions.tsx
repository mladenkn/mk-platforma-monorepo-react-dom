import { Header_full_common } from "./Header"
import Link from "next/link"
import HomeIcon from "@mui/icons-material/Home"
import { Typography, Box, useTheme } from "@mui/material"
import Layout from "./Layout"

export default function TermsAndCodnitions() {
  const { typography } = useTheme()
  return (
    <Layout
      header={
        <Header_full_common
          left={
            <Link style={{ color: "white", ...typography.h3 }} href="/">
              <HomeIcon />
            </Link>
          }
          middle={
            <Typography sx={{ ml: 1 }} variant="h4">
              Pravila i uvjeti korištenja
            </Typography>
          }
          moreOptions_props={{
            options: ["post.create", "profile", "post.list", "devContact"],
          }}
        />
      }
      content={
        <Box sx={{ p: 1, pr: 2 }}>
          <Typography sx={{ mb: 1 }} variant="h5">
            Temeljne odredbe
          </Typography>
          <ol style={{ margin: 0 }}>
            <ListItem>
              Uvjeti i pravila korištenja vrijede za internetski portal www.za-brata.hr sa svim
              poddomenama i web stranicama te aplikacijama za mobilne telefone koji pripadaju domeni
              za-brata.hr, dalje u tekstu internetski portal Za Brata ili IP Za Brata.
            </ListItem>
            <ListItem>
              Korisnik je svaka osoba koja pristupa i/ili koristi usluge IP Za Brata, što
              podrazumijeva neregistrirane korisnike i registrirane korisnike.
            </ListItem>
          </ol>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h5">
            Opće odredbe
          </Typography>
          <ol style={{ margin: 0 }} start={3}>
            <ListItem>
              {/* CUSTOM */}
              IP Za Brata ne služi za bilo kakvu prodaju. Proizvodi koji su oglašeni dakle nisu na
              prodaju, več se radi isključivo o razmjeni dobara, bez naplate. Također, isto vrijedi
              i za nuđenje usluga. Sudionici razmjene se mogu dogovarati preko nekog drugog medija
              ili uživo. Vlasnik IP Za Brata ne odgovara za uvjete koji su među sudionicima
              dogovoreni van IP Za Brata.
            </ListItem>
            <li>
              <Typography variant="body2">
                Pristupanjem ovim stranicama prihvaćate sva pravila i uvjete korištenja IP Za Brata.
                Zadržavamo pravo promjena, modifikacija i dopuna uvjeta korištenja ovih stranica u
                bilo kojem trenutku. Promjene stupaju na snagu u trenutku objave. Korisnik je dužan
                redovito čitati Uvjete i pravila korištenja te se smatra da je pristupanjem
                stranicama Za Brata upoznat s aktualnim pravilima i uvjetima njihova korištenja.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                U svrhu korištenja usluga IP Za Brata, korisnik se obvezuje registrirati te u
                registracijskom obrascu popuniti potrebne podatke i podatke za kontakt. Korisnik ima
                mogućnost registracije i prijave na IP Za Brata putem podataka za pristup društvenim
                mrežama koje su u trenutku korištenja dostupne na internetskom portalu Za Brata te
                kroz sučelje društvene mreže daje izričitu suglasnost korištenja i pohrane potrebnih
                podataka. Prikupljanje traženih podataka provodi se sukladno potrebama usluge za
                čije se korištenje korisnik registrirao, a za oglašavanje je utemeljeno na Zakonu o
                zabrani i sprječavanju obavljanja neregistrirane djelatnosti. IP Za Brata svoje
                usluge ne nudi za korištenje osobama mlađim od 16 godina. // ???
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Korisnik za točnost dostavljenih podataka jamči kaznenom i materijalnom odgovornošću
                te je obvezan održavati podatke točnim i ažurnim. Korisnik registracijom na IP Za
                Brata dopušta pohranu, uporabu i obradu navedenih podataka u svrhu djelovanja
                sustava, slanja sistemskih poruka i komunikaciju s korisničkom podrškom putem
                elektroničke pošte i telefona. IP Za Brata se obvezuje da će te podatke koristiti
                samo u svrhe za koje su dobiveni te u skladu s mjerodavnim propisima.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Korisnik ima pravo u svakom trenutku zatražiti zatvaranje svog korisničkog računa i
                brisanje podataka. Korisnički račun i oglasi tog korisnika bit će uklonjeni 24 sata
                nakon podnošenja zahtjeva, osim ako korisnik u navedenom roku ne odustane od
                zatvaranja.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Voditelj obrade podataka IP Za Brata vodi računa o zaštiti osobnih podataka sukladno
                primjenjivim propisima te Politici privatnosti (todo: link) kojom se detaljnije
                uređuju prikupljanje osobnih podataka, njihovo korištenje, sigurnost, čuvanje,
                brisanje, prijenos te korištenje alata.
              </Typography>
            </li>
            {/* <li>
          <Typography variant="body2">
            Korisnik je dužan brinuti se o sigurnosti svoje korisničke lozinke i povremeno je
            mijenjati. Korisnik je u potpunosti odgovoran za svu štetu nastalu neovlaštenim
            korištenjem prava pristupa, kao i sve sadržaje objavljene pod njegovim korisničkim
            imenom. Vlasnik IP Za Brata ne odgovara za slučajeve zloporabe korisničke lozinke, ali čim
            korisnik javi o vjerojatnoj zloporabi, može odgovarajuće postupati.
          </Typography>
        </li> */}
            <li>
              <Typography variant="body2">
                Korisnik je u potpunosti odgovoran za svu štetu nastalu neovlaštenim korištenjem
                prava pristupa, kao i sve sadržaje objavljene pod njegovim korisničkim imenom
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Vlasnik IP ZaBrata je ovlašten u svakom trenutku zatvoriti korisnički račun onih
                korisnika koji krše ove Uvjete i pravila korištenja ili na neki drugi način
                usporavaju ili ometaju rad IP ZaBrata
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Vlasnik IP ZaBrata je ovlašten u svakom trenutku ukloniti profilne fotografije
                korisnika, i to bez prethodne najave, ako profilna fotografija sadrži ilustracije
                govora mržnje ili psovke, pornografski sadržaj, logotip (osim ako je radi o usluzi
                IP Za Brata), fotografiju druge osobe, fotografiju s tuđeg korisničkog profila,
                fotografiju koja je zaštićena autorskim pravima ili drugi sadržaj koji se smatra
                neprimjerenim.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Vlasnik IP ZaBrata zadržava pravo, uz zatvaranje korisničkog računa, poduzeti i
                druge odgovarajuće mjere protiv korisnika koji krše ove Uvjete i pravila korištenja.
                Uvjeti i odnosi između korisnika i vlasnika IP ZaBrata podliježu zakonima Republike
                Hrvatske. U slučaju spora nadležan je sud RH.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Za sve objave, oglase, poruke, tekstove, prikaze, fotografije, videosnimke, ponude,
                kataloge, vaučere i drugi materijal (u daljnjem tekstu: sadržaj) objavljen na
                stranicama, prenesen preko stranica ili povezan elektroničkom poveznicom (linkom) sa
                stranica, isključivo odgovara osoba od koje je takav sadržaj potekao. Vlasnik IP Za
                Brata ne daje nikakva jamstva o pitanju točnosti, potpunosti ili autentičnosti
                takvog sadržaja.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Zabranjeno je naručivanje i objavljivanje sadržaja koji su nezakoniti, štetni,
                prijeteći, koji zlostavljaju, uznemiravaju, kleveću ili su na bilo koji način štetni
                malodobnim osobama. Nedopušteni su sadržaji koji sadrže osobne podatke drugih osoba
                bez njihova izričitog odobrenja. Korisnik se obvezuje da neće objavljivati sadržaj
                koji je u suprotnosti sa zakonom, ostalim propisima i Ustavom Republike Hrvatske.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Svi eventualni sporovi nastali iz odnosa korisnika IP Za Brata i oglašivača (nastali
                zbog istinitosti podataka o korisniku ili sadržaju ponude, o predmetu, cijeni
                ponude, trajanju akcije i sl.) rješavaju se isključivo između korisnika. Vlasnik IP
                Za Brata nije odgovoran ni za kakvu štetu bilo koje vrste, nastale kao posljedica
                takvih odnosa
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Kako bi unaprijedio svoju uslugu IP Za Brata upotrebljava i analizira podatke koje
                ima o svojim korisnicima, uključujući i podatke o korisničkim interesima,
                aktivnostima i pregledima, a kako bi odabrao i personalizirao oglase i druge
                marketinške obavijesti kojima se promoviraju proizvodi i usluge IP Za Brata.
              </Typography>
            </li>
            {/* <li>
          <Typography variant="body2">
            Njuškalo kao dodatnu funkciju za registrirane korisnike nudi mogućnost obavještavanja
            putem e-pošte ili slanje obavijesti u mobilnim aplikacijama Njuškala. Njuškalo ne
            preuzima odgovornost za pravodobno ili detaljno obavještavanje korisnika.
          </Typography>
        </li> */}
            {/* Izbačeno Njuškalo.20 */}
            <li>
              <Typography variant="body2">
                Vlasnik IP Za Brata ne odgovara za bilo kakvu štetu koja bi mogla nastati zbog
                prekida dostupnosti, neobjavljivanja, odnosno brisanja sadržaja ili zloupotrebe
                javno objavljenih podataka.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Vlasnik IP Za Brata ne odgovara za bilo kakve troškove koji bi mogli nastati
                korisniku, a koji mogu nastati zbog korištenja IP Za Brata i aplikacija Za Brata za
                mobilne telefone.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                IP Za Brata sadrži poveznice na internetske stranice drugih poslužitelja. Vlasnik IP
                Za Brata ne odgovara za sadržaj internetskih stranica treće strane, ne jamči i ne
                preuzima odgovornost za štetan, ilegalni sadržaj ili druga zakonska kršenja na
                internetskim stranicama trećih strana. Vlasnik IP Za Brata će u najkraćem mogućem
                vremenu ukloniti bilo koju poveznicu ili sadržaj nakon što se u potpunosti uvjeri da
                on krši pozitivne zakonske propise ili je na bilo koji način štetan ili nepoželjan.
              </Typography>
            </li>
          </ol>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h5">
            Objavljivanje oglasa na IP Za Brata
          </Typography>
          <ol>
            <ListItem>
              IP Za Brata je namijenjen javnom objavljivanju oglasa i s time povezanim uslugama koje
              će omogućiti što učinkovitiju objavu i pretraživanje oglasa. Slanjem zahtjeva za
              objavu oglasa, korisnik pristaje da se uz njegov oglas na IP Za Brata objave i osobni
              podaci, kako je podesio u postavkama ili upisao u sadržaj oglasa, a koje mogu vidjeti
              sve osobe koje imaju pristup internetu. Korisnik može zatražiti brisanje oglasa iz
              bilo kojeg razloga na način da se ulogira u svoj korisnički račun i potvrdi brisanje
              oglasa.
            </ListItem>
            {/* Izbačeno Njuškalo.25 */}
            {/* Izbačeno Njuškalo.26 */}
            {/* Izbačeno Njuškalo.27 */}
            {/* Izbačeno Njuškalo.28 */}
            <ListItem>Oglas mora sadržajno pripadati u primjerenu rubriku.</ListItem>
            <ListItem>
              Oglasi koji pozivaju na sudjelovanje u raznim mrežnim marketinzima i piramidalnim
              igrama nisu dopušteni. Jednako tako nisu dopušteni oglasi koji pozivaju na igranje
              nedopuštenih igara na sreću.
            </ListItem>
            <ListItem>
              Korisnik može imati samo jedno korisničko ime i za jedan predmet može predati samo
              jedan oglas. Nije dopušteno mijenjanje predmeta oglašavanja unutar zakupljenog
              oglasnog paketa ili proizvoda niti je dopuštena objava oglasa za isti predmet u dvije
              različite rubrike. Naziv korisničkog računa može se koristiti samo jednom za
              registraciju.
            </ListItem>
            {/* Izbačeno Njuškalo.33 */}
            <ListItem>
              Internetske veze (linkovi) s IP Za Brata: dopušteno je jedino povezivanje na dodatni
              opis predmeta. Linkovi na stranice koje oglašavaju razne usluge nisu dopušteni.
              Vlasnik IP Za Brata zadržava diskrecijsko pravo procjene hoće li neki link odobriti
              ili neće.
            </ListItem>
            <ListItem>
              Vlasnik IP Za Brata zadržava pravo brisanja, odnosno neobjavljivanja oglasa koji ne
              zadovoljavaju određeni kriterij ili su u suprotnosti s ovim pravilima i uvjetima.
            </ListItem>
            <li>
              <Typography variant="body2">
                Vlasnik IP Za Brata ima pravo ukloniti, urediti, izmijeniti ili odbiti objavu
                oglasa, i to bez najave, a to će se dogoditi u sljedećim okolnostima:
              </Typography>
              <ul>
                <ListItem>kad je oglas predan u pogrešnu rubriku</ListItem>
                <ListItem>
                  kad proizvod i/ili oglašivač krši autorska prava i/ili druga prava intelektualnog
                  vlasništva
                </ListItem>
                <ListItem>
                  kad proizvod može uzrokovati štetu i/ili prekršiti prava intelektualnog vlasništva
                  nekom drugom, na bilo koji način
                </ListItem>
                <ListItem>
                  kad proizvod i/ili sadržaj oglasa sadrži diskriminirajuće aspekte, (dječje)
                  pornografske materijale ili po hrvatskom zakonu ilegalne materijale
                </ListItem>
                <ListItem>
                  kad sadržaj jednog oglasa sadrži više proizvoda ili usluga koji nisu raspoređeni u
                  ispravne kategorije
                </ListItem>
                <ListItem>kad je oglas u bilo kojem smislu uvredljiv</ListItem>
                <ListItem>
                  kad je oglas sumnjiv u smislu oglašavanja ukradene ili ilegalne robe
                </ListItem>
                <ListItem>kad postoji sumnja na zloupotrebu IP Za Brata</ListItem>
                <ListItem>
                  vlasnik IP Za Brata zadržava pravo izmjene i dopune pojedinog oglasa, a da se pri
                  tome ne mijenja sadržaj predmetnog oglasa (lektorske intervencije, dopuna podataka
                  i slično).
                </ListItem>
              </ul>
            </li>
            <ListItem>
              Objavom oglasa na IP Za Brata korisnik se obvezuje da će savjesno odgovarati na upite
              ostalih korisnika.
            </ListItem>
            <ListItem>
              {/* CUSTOM */}
              Nije dozvoljena objava oglasa u kojima se pokušava nešto prodati. Oglasi u kojima se
              nudi određeni proizvod su namjenjeni isključivo za druge oblike razmjene, bez
              trgovaranja.
            </ListItem>
            <ListItem>
              {/* CUSTOM */}
              Nije dozvoljena objava oglasa kojima se pokušava reklamirati bilo kakva usluga koja se
              naplaćuje.
            </ListItem>
            <ListItem>
              {/* CUSTOM */}
              Usprkos pravilima za objavljivanje, vlasnik IP Za Brata ne odgovara za eventualno
              kršenje pravila od strane korisnika. Upravitelj sustava IP Za Brata se trudi ispravno
              postupati sa oglasima koja krše pravila, ali zbog velike količine podataka, nije
              uvijek u mogućnosti.
            </ListItem>
            {/* Izbačeno Njuškalo.38 */}
            {/* Izbačeno Njuškalo.39 */}
            <li>
              <Box>
                <Typography variant="body2">
                  Elektronička komunikacija između korisnika IP Za Brata namijenjena je razgovorima
                  vezanima uz proizvod ili uslugu ponuđenu u oglasu, a radi:
                </Typography>
                <ul>
                  <ListItem>informiranja o detaljima oglasa</ListItem>
                  <ListItem>
                    sklapanja transakcije, odnosno trgovanja vezanog uz oglašeni proizvod ili uslugu
                  </ListItem>
                  <ListItem>
                    informiranja o ostalim proizvodima ili uslugama ako je oglašivač poslovni
                    korisnik.
                  </ListItem>
                </ul>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Korisnicima u pisanoj komunikaciji na IP Za Brata nije dopušteno
                </Typography>
                <ul>
                  <ListItem>promovirati druge servise, proizvode i usluge</ListItem>
                  <ListItem>slati poveznice na druge internetske lokacije</ListItem>
                  <ListItem>nuditi posredovanje u prodaji ili iznajmljivanju</ListItem>
                  <ListItem>slati ponude za poslovnu suradnju koja nije oglašena</ListItem>
                  <ListItem>
                    rabiti tuđe ime ili adresu e-pošte, lažno se predstavljati ili na bilo koji
                    drugi način dovoditi drugog korisnika u zabludu da s njim kontaktira treća
                    osoba, institucija ili poslovni subjekt
                  </ListItem>
                  <ListItem>tražiti pomoć, donacije ili sponzorstva</ListItem>
                  <ListItem>dogovarati se s drugim oglašivačima o cijenama</ListItem>
                  <ListItem>
                    psovati, pisati komentare uvredljivog sadržaja i koristiti se govorom mržnje
                  </ListItem>
                  <ListItem>pisati komentare prijetećeg sadržaja ili zastrašivati</ListItem>
                  <ListItem>
                    rabiti robote ili skripte za automatizirano pisanje više komentara.
                  </ListItem>
                </ul>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Radi zaštite korisnika, sprječavanja zloporabe komunikacije, otkrivanja neželjene
                  pošte i zlonamjernog softvera i razvoja Njuškalovih proizvoda, Njuškalo zadržava
                  pravo bez obavijesti:
                </Typography>
                <ul>
                  <ListItem>
                    provjeriti i analizirati sadržaj komentara (uključujući vezanu elektroničku
                    poštu)
                  </ListItem>
                  <ListItem>privremeno zadržati komentare i odgoditi njihovu objavu</ListItem>
                  <ListItem>trajno otkazati objavu komentara</ListItem>
                  <ListItem>
                    isključiti korisnika ili mu onemogućiti daljnje komuniciranje putem komentara.
                  </ListItem>
                  <ListItem>komentari stariji od 2 godine se trajno brišu</ListItem>
                </ul>
              </Box>
            </li>
          </ol>
        </Box>
      }
    />
  )
}

function ListItem({ children }: { children?: string }) {
  return (
    <li>
      <Typography variant="body2">{children}</Typography>
    </li>
  )
}
