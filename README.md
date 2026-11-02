# Biologi 2 · Från cell till samband

En färdig interaktiv intensivkurs på svenska för **Cellens karta, Membranets portar, Osmos, Aktiv transport, Mikrobernas värld, Antibiotika & resistens och Växtcellen**.

Koden ligger i rätt destination: **bebobibi04-ux/sandoog**. Det här var ett tomt repository när arbetet började. `alialsaadi19050-rgb/Biologiatlas` har enbart lästs som innehållskälla.

## Börja direkt

Öppna `index.html` i en modern webbläsare. Allt innehåll, alla bilder och all funktion finns i filen. Inga konton, paketinstallationer, externa typsnitt eller API-nycklar behövs för den lokala kursen.

1. Välj **Starta första passet** och sedan **Snabbdiagnos**.
2. Skriv ett eget svar, eller markera att du svarat högt/på papper, innan du öppnar modellen. Jämför med de konkreta biologiska poängerna. Behöver du stöd direkt finns en särskild knapp.
3. Följ pass 1: 10 min diagnos, 30 min cellens grundmodell och 25 min membran. Ta sammanlagt 10 min paus under 15:00–16:15.
4. Formulera egna provsvar före modellsvaren. Använd checklistan för självbedömning och återkom till missade poänger.

## Funktioner

- Sju kapitel med progressionen grund → mekanism → sammanhang → tillämpning → resonemang → kontroll.
- Alla 28 ursprungliga kärnfrågor och 12 ursprungliga provfrågor är bevarade. Tillagt: en antibiotikafråga, fyra korta variationsfrågor och en slutkontroll med tre situationer. Sju diagnosfrågor och sju samband finns kvar.
- Eget svar sparas före modellen och låses för jämförelse. Varje kärnfråga har tre konkreta kriterier; provfrågor, variationer och slutkontroll har egna biologiska bedömningspunkter. Missade poänger syns under Mina luckor. Ingen automatisk eller simulerad AI-betygsättning.
- Kan säkert kräver att eleven själv markerar alla kärnpoänger från ett försök utan stöd. Första säkra försöket följs av ny återkallning tidigast efter tio minuter; upprepade klick på samma försök räknas inte som fördröjd återkallning. Det verifierar inte att elevens självbedömning är korrekt.
- Studieplan på 360 effektiva minuter; minimiprogram på 180 och valbart extraprogram på 450, utanför sextimmarsplanen. Egen återstående tidsbudget kan anges.
- Repetition prioriteras efter självskattning, tid till repetition och områden med missade provpoänger.
- Kvalitativt osmoslabb och stegmodell av Na⁺/K⁺-pumpen.
- Lokal lagring med synlig varning om den inte fungerar, export/import av säkerhetskopia och återställning med bekräftelse.
- Tangentbordsstöd via vanliga kontroller, responsiv navigation och reducerad rörelse.

## Schema

| Dag | Fönster | Effektiv tid | Uppgift |
| --- | --- | ---: | --- |
| Mån 2 nov | 15:00–16:15 | 65 min | Diagnos, cellens karta, membran |
| Mån 2 nov | 16:35–17:50 | 65 min | Membran, osmos, variation om permeabilitet, pumpens grund |
| Mån 2 nov | 19:00–20:15 | 65 min | Kopplad transport, variation om ATP över tid, mikrober, samband |
| Mån 2 nov | 20:30–21:15 | 40 min | Antibiotika, variation om genöverföring/urval och återkallning |
| Tis 3 nov | 14:20–16:00 | 85 min | Repetition, växtcell, tre egna provsvar, organellvariation och DNA-samband |
| Tis 3 nov | 20:30–21:20 | 40 min | Ett eget provsvar, viktigaste luckorna och fem minuters slutkontroll |

Totalt **360 effektiva minuter** och 60 minuter korta pauser inom dessa fönster. Mellan fönstren finns ytterligare återhämtning och mat. Fotboll 16:30–19:00 på tisdagen respekteras. Om kvällen börjar först 21:00: 25 effektiva minuter, avslut senast 21:30. Ändra återstående tid i kursen.

Den disjunkta aktivitetsbudgeten är 156 min inlärning, 138 min diagnos/återkallning/reparation, 45 min egna fullständiga svar med jämförelse, 16 min variationer med jämförelse och 5 min slutkontroll. Det är en planeringsuppskattning, inte en uppmätt studietid för varje elev. Standardprogrammet väljer fyra av de tretton fullständiga provfrågorna; övriga är valbara inom kvarvarande tid.

## Spara framsteg

Svar lagras i webbläsarens `localStorage`, nyckeln `biologi2-intensiv-v1`. Inga elevsvar sänds till en server av kurskoden. Lagringen är knuten till webbläsare och adress. Använd **Inställningar → Exportera säkerhetskopia** för att flytta från lokal fil till en publicerad version, mellan enheter eller mellan olika adresser. Import ersätter den lokala progressionen efter bekräftelse.

En säker självskattning är ingen verifierad kunskapsnivå och kan inte översättas till ett A. Modellsvaren är möjliga svar, inte lärarens facit. Provets exakta frågor och bedömningsmatris är inte kända.

## GitHub Pages

[Öppna den publicerade Biologi 2-kursen](https://bebobibi04-ux.github.io/sandoog/).

Repositoryt har gjorts offentligt efter ägarens uttryckliga godkännande. GitHub Pages är aktiverat med **Deploy from a branch → main → /(root)**. Webbplatsen kan öppnas utan GitHub- eller ChatGPT-inloggning. Nya ändringar på main publiceras via GitHub Pages.

Länk till kursen: https://bebobibi04-ux.github.io/sandoog/

## Bygga och kontrollera

Den färdiga `index.html` behöver ingen byggning för att användas. Redigerbara delar finns separat:

- `data.js`: undervisning, frågor, modeller, samband och schema.
- `practice-data.js`: riktade innehållstillägg, konkreta kriterier, variationsfrågor, slutkontroll och det omfördelade sexpasschemat.
- `engine.js`: tidsbudget, prioritering, repetition och validering av säkerhetskopia.
- `app.js`, `style.css`, `index.template.html`: gränssnittet.
- `build.py`: fogar ihop allt till fristående `index.html` och `dist/index.html`.
- `test-engine.cjs` och `test-baseline.json`: kontroller av innehåll, tidsbudget, inlärningslogik, bakåtkompatibel import och bevarade ursprungliga frågor.

Kör vid ändringar:

```text
node --check app.js
node test-engine.cjs
python build.py
```

`STUDIEGUIDE.md` beskriver prioriteringen. `KALLGRANSKNING.md` redovisar källans omfattning, begränsningar och biologiska korrigeringar.
