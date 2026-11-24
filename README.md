# Kjøleskapsskjerm

En felles skjerm for kjøleskapet med klokke, vær for Nesttun (fra yr/MET), felles Google-kalender, handleliste og huskeliste.
Dere legger inn ting fra iPhone, og det dukker opp på skjermen. Listene kan også krysses av og fylles på rett fra skjermen.

Uten oppsett kjører skjermen i **demomodus** med eksempeldata, så dere kan se hvordan den ser ut.

## Slik henger det sammen

| Hva | Hvor dataene bor | Slik legger dere inn fra iPhone |
|---|---|---|
| Kalender | En felles Google-kalender («Hjemme») | Kalender-appen på iPhone eller Google Kalender-appen |
| Handleliste | Todoist-prosjektet «Handleliste», delt mellom dere | Todoist-appen, eller «Hei Siri, legg til melk i Todoist» |
| Huskeliste | Todoist-prosjektet «Huskeliste», delt mellom dere | Todoist-appen (kan ha frister) |
| Vær | yr / MET Norge | Ingenting, kommer automatisk |

---

## Steg 1: Felles Google-kalender (10 min, på PC)

1. Gå til [calendar.google.com](https://calendar.google.com) på PC.
2. Til venstre ved **Andre kalendere**, trykk **+** og velg **Opprett ny kalender**. Kall den f.eks. «Hjemme».
3. Åpne innstillingene for «Hjemme», gå til **Del med bestemte personer**, legg til samboerens e-post og velg **Gjør endringer i aktiviteter**.
4. Lenger ned under **Integrer kalender**, kopier **Kalender-ID** (ser ut som `…@group.calendar.google.com`). Den trenger dere i steg 2.
5. På hver iPhone: **Innstillinger → Apper → Kalender → Kalenderkontoer → Legg til konto → Google**. Da kan dere legge inn avtaler i «Hjemme» rett fra iPhone-kalenderen.

## Steg 2: Kalender-koblingen (10 min, på PC)

Skjermen henter kalenderen gjennom et lite skript som kjører i din egen Google-konto.

1. Gå til [script.google.com](https://script.google.com) og trykk **Nytt prosjekt**. Kall det «Kjøleskapsskjerm».
2. Slett alt som står der, og lim inn innholdet fra [`apps-script/Code.gs`](apps-script/Code.gs).
3. Endre de to tingene øverst:
   - `KEY`: bytt til en lang, tilfeldig tekst (f.eks. `blåbær-tromme-7391-sky`). Dette er passordet skjermen bruker.
   - `CALENDAR_IDS`: lim inn Kalender-ID-en fra steg 1. Behold `'primary'` hvis du også vil se din egen hovedkalender.
4. Trykk **Distribuer → Ny distribusjon**. Velg typen **Nettapp**, **Kjør som: meg**, **Hvem har tilgang: Alle**. Trykk **Distribuer**.
5. Google spør om tillatelse til å lese kalenderen. Godta (velg «Avansert → Gå til Kjøleskapsskjerm» hvis den advarer, det er ditt eget skript).
6. Kopier **nettapp-URL-en** (slutter på `/exec`).

Det er bare de som har både URL-en og nøkkelen som kan lese kalenderen.

## Steg 3: Delte lister i Todoist (10 min)

1. Last ned **Todoist** fra App Store på begge iPhonene og lag en konto hver (gratisversjonen holder).
2. Én av dere lager to prosjekter: **Handleliste** og **Huskeliste** (navnene må være akkurat slik, eller endres i skjermens innstillinger).
3. Del begge prosjektene med den andre: åpne prosjektet, trykk **⋯ → Del** og inviter med e-post.
4. Hent API-tokenet til den som eier prosjektene: i Todoist på nett, **Innstillinger → Integrasjoner → Utvikler → API-token**. Kopier det.

Tips: I Todoist-appen kan dere legge til en Siri-snarvei, så «Hei Siri, legg til melk i Todoist» havner rett i handlelisten.

## Steg 4: Skjermen på nett

Skjermen er én fil (`index.html`) som legges ut gratis med GitHub Pages. Når GitHub-repoet finnes, legger Claude koden der og slår på Pages. Adressen blir da noe som `https://<brukernavn>.github.io/kjoleskapsskjerm/`.

## Steg 5: Nettbrettet (20 min)

Anbefalt: Samsung Galaxy Tab A9+ (11") eller tilsvarende Android-nettbrett, en magnetisk holder og en lang USB-C-kabel.

1. Sett opp nettbrettet som vanlig og koble til wifi.
2. Skru på batterivern så det tåler å stå i lading hele tiden: **Innstillinger → Batteri → Batterivern → på** (lader bare til 80–85 %).
3. Installer **Fully Kiosk Browser** fra Play Butikk.
4. I Fully Kiosk: sett **Start URL** til adressen fra steg 4, og slå på:
   - *Keep Screen On* (skjermen står på)
   - *Fullscreen Mode* / *Hide Status Bar*
   - *Start on Boot* (starter av seg selv etter strømbrudd)
   - Valgfritt: *Screen Brightness* lav om kvelden. Skjermen bytter selv til mørkt tema fra kl. 22 til 06.
5. Trykk **⚙︎** oppe til høyre på skjermen og fyll inn kalender-URL, nøkkel og Todoist-token. Trykk **Lagre**.

Slipper du å taste lange koder på nettbrettet, kan du åpne én lenke på formen
`https://…/kjoleskapsskjerm/?kalenderUrl=…&kalenderNokkel=…&todoistToken=…`
Den lagrer innstillingene på nettbrettet og fjerner dem fra adresselinjen.

Innstillingene lagres kun på nettbrettet, aldri i koden.

## Hvor ofte den oppdaterer

- Klokke: hvert 10. sekund
- Lister: hvert minutt
- Kalender: hvert 5. minutt
- Vær: hver halvtime
- Hele siden lastes på nytt kl. 03 hver natt
