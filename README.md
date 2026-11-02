# Biologi 2 · Från cell till samband

En färdig interaktiv intensivkurs på svenska för **Cellens karta, Membranets portar, Osmos, Aktiv transport, Mikrobernas värld, Antibiotika & resistens och Växtcellen**.

Koden ligger i rätt destination: **bebobibi04-ux/sandoog**. Det här var ett tomt repository när arbetet började. `alialsaadi19050-rgb/Biologiatlas` har enbart lästs som innehållskälla.

## Börja direkt

Öppna `index.html` i en modern webbläsare. Allt innehåll, alla bilder och all funktion finns i filen. Inga konton, paketinstallationer, externa typsnitt eller API-nycklar behövs för den lokala kursen.

1. Välj **Starta första passet** och sedan **Snabbdiagnos**.
2. Försök förklara varje fråga i cirka en minut innan du öppnar svaret. Markera Inte kan, Delvis kan eller Kan säkert utifrån vad du kunde före facit.
3. Följ pass 1: 10 min diagnos, 30 min cellens grundmodell och 25 min membran. Ta sammanlagt 10 min paus under 15:00–16:15.
4. Formulera egna provsvar före modellsvaren. Använd checklistan för självbedömning och återkom till missade poänger.

## Funktioner

- Sju kapitel med progressionen grund → mekanism → sammanhang → tillämpning → resonemang → kontroll.
- 28 utvalda återkallningsfrågor, sju diagnosfrågor ur samma kärna, 12 öppna provfrågor och sju sambandsövningar.
- Separata egna svar, modellsvar, begrepp, fallgropar och checklistor. Ingen automatisk eller simulerad AI-betygsättning.
- Studieplan på 360 effektiva minuter; minimiprogram på 180 och extraprogram på 450. Egen återstående tidsbudget kan anges.
- Repetition prioriteras efter självskattning, tid till repetition och områden med missade provpoänger.
- Kvalitativt osmoslabb och stegmodell av Na⁺/K⁺-pumpen.
- Lokal lagring med synlig varning om den inte fungerar, export/import av säkerhetskopia och återställning med bekräftelse.
- Tangentbordsstöd via vanliga kontroller, responsiv navigation och reducerad rörelse.

## Schema

| Dag | Fönster | Effektiv tid | Uppgift |
| --- | --- | ---: | --- |
| Mån 2 nov | 15:00–16:15 | 65 min | Diagnos, cellens karta, membran |
| Mån 2 nov | 16:35–17:50 | 65 min | Membran, osmos, pumpens grund |
| Mån 2 nov | 19:00–20:15 | 65 min | Kopplad transport, mikrober, samband |
| Mån 2 nov | 20:30–21:15 | 40 min | Antibiotika, resistens och återkallning |
| Tis 3 nov | 14:20–16:00 | 85 min | Repetition, växtcell och två egna provsvar |
| Tis 3 nov | 20:30–21:20 | 40 min | Ett eget provsvar och viktigaste luckorna |

Totalt **360 effektiva minuter** och 60 minuter korta pauser inom dessa fönster. Mellan fönstren finns ytterligare återhämtning och mat. Fotboll 16:30–19:00 på tisdagen respekteras. Om kvällen börjar först 21:00: 25 effektiva minuter, avslut senast 21:30. Ändra återstående tid i kursen.

## Spara framsteg

Svar lagras i webbläsarens `localStorage`, nyckeln `biologi2-intensiv-v1`. Inga elevsvar sänds till en server av kurskoden. Lagringen är knuten till webbläsare och adress. Använd **Inställningar → Exportera säkerhetskopia** för att flytta från lokal fil till en publicerad version, mellan enheter eller mellan olika adresser. Import ersätter den lokala progressionen efter bekräftelse.

En säker självskattning är ingen verifierad kunskapsnivå och kan inte översättas till ett A. Modellsvaren är möjliga svar, inte lärarens facit. Provets exakta frågor och bedömningsmatris är inte kända.

## GitHub Pages

Sidan är förberedd för publicering direkt från repositoryts rot. I en inloggad GitHub-session:

1. Öppna **Settings → Pages** i `bebobibi04-ux/sandoog`.
2. Välj **Build and deployment → Source → Deploy from a branch**.
3. Välj **main** och **/(root)**, sedan **Save**.
4. Vänta tills GitHub visar ett lyckat Pages-bygge. Öppna adressen som GitHub returnerar.

Repositoryt är privat. Pages i privata repositoryn kräver en plan som stöder det, exempelvis GitHub Pro. GitHub Free stöder Pages från publika repositoryn. Repositoryts synlighet har inte ändrats automatiskt. Se [GitHubs dokumentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

Anslutningen i den här miljön kan skriva repositoryfiler men erbjuder inga Pages-administrationsverktyg. Webbläsarsessionen var inte inloggad på GitHub. En Pages-publicering ska därför inte betraktas som verifierad bara för att källan ligger här.

## Bygga och kontrollera

Den färdiga `index.html` behöver ingen byggning för att användas. Redigerbara delar finns separat:

- `data.js`: undervisning, frågor, modeller, samband och schema.
- `engine.js`: tidsbudget, prioritering, repetition och validering av säkerhetskopia.
- `app.js`, `style.css`, `index.template.html`: gränssnittet.
- `build.py`: fogar ihop allt till fristående `index.html` och `dist/index.html`.
- `test-engine.cjs`: meningsfulla kontroller av innehåll och inlärningslogik.

Kör vid ändringar:

```text
node --check app.js
node test-engine.cjs
python build.py
```

`STUDIEGUIDE.md` beskriver prioriteringen. `KALLGRANSKNING.md` redovisar källans omfattning, begränsningar och biologiska korrigeringar.
