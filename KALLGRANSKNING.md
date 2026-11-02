# Källgranskning och avgränsning

## Huvudkälla

[Biologiatlas](https://alialsaadi19050-rgb.github.io/Biologiatlas/) och dess faktiska [index.html](https://github.com/alialsaadi19050-rgb/Biologiatlas/blob/faae0b22c1c21e2a486dad2096384b193ca0fc96/index.html).

Analyserad källversion: `faae0b22c1c21e2a486dad2096384b193ca0fc96`, daterad 14 oktober 2026. Inspektion 2 november 2026. Originalrepositoryt har inte ändrats.

Källan är en stor HTML-fil med separata kapitelsidor inbäddade som JSON i elementet `pages`. De sju relevanta sidorna extraherades för text- och kodgranskning. Andra kapitel uteslöts från kursen.

| Sidan | Text, ungefär antal tecken | Kortposter | Quiz-/frågeposter | Ordlista | SVG-diagram |
| --- | ---: | ---: | ---: | ---: | ---: |
| Cellens karta | 18 737 | 57 | 18 | – | 7 |
| Membranets portar | 39 338 | 105 | 57 | 65 | 14 |
| Osmos | 14 189 | 38 | 23 | 30 | 6 |
| Aktiv transport | 8 818 | 21 | 11 | 24 | 4 |
| Mikrobernas värld | 24 334 | 76 | 31 | 59 | 8 |
| Antibiotika & resistens | 19 841 | 51 | 27 | 43 | 4 |
| Växtcellen | 9 838 | 29 | 20 | 27 | 5 |
| **Summa** | **135 095** | **377** | **187** | **248** | **48** |

Antalen gäller statiska dataposter som identifierats i deklarationer och tillägg med `push`, inklusive PPT-tillägg. Vissa quizposter är öppna frågor eller jämförelser; antalet beskriver inte 187 olika flervalsfrågor. Diagrammens antal beskriver kodens SVG-element, inte hur många separat granskade originalbilder läraren har tillhandahållit.

## Täckning och prioritering

- Cellens karta: membran, proteiner, glykokalyx/ECM, kärna, ribosomer, ER, Golgi, lysosom, peroxisom, mitokondrie, cellskelett och proteinets väg.
- Membran: permeabilitet, diffusion, faciliterad diffusion, osmos, primär/sekundär transport, LDL, vesiklar och PPT:s kompletteringar.
- Osmos: vattenkanaler, partikelmått, cellvolym, turgor/plasmolys, konservering och lektionsscenarier om vattenbalans.
- Aktiv: Na⁺/K⁺-cykel, vesikeltrafik, exo-/endocytos, synaps och virusinträde.
- Mikrober: eukaryota mikrober, malaria, bakterier, Gram, ekologiska roller, arv, genöverföring, systematik, arkéer och virus.
- Antibiotika: målstrukturer, resistensmekanismer, urval, plasmider, spridning, prevention och exempel som MRSA/ESBL.
- Växtcell: cellvägg, vakuol, turgor, kloroplast, ljus, plastider och kort tillägg om växtgrupper.

Överlapp mellan kapitel samlades i gemensamma mekanismer. Kursen återanvänder inte 377 kort utan väljer 28 kärnfrågor och skapar nya tillämpningar. Detaljer som inte kan prioriteras inom sex timmar finns i märkt fördjupning eller utelämnas med motivering.

Lärarens ursprungliga PowerPoint-filer, hela filmer och alla bokfoton har inte granskats separat som kompletta primärkällor. Den dokumenterade täckningen gäller materialet som faktiskt finns återgivet i Biologiatlas. Provets exakta format är inte verifierat.

## Korrigeringar och preciseringar

1. **Osmolalitet och tonicitet.** Per kg lösningsmedel, inte lösning. Partiklar som snabbt passerar membranet påverkar inte långvarig tonicitet på samma sätt som icke genomträngande partiklar. Vattenpotential påverkas också av tryck.
2. **Växtcell i isoton miljö.** Relativt slapp snarare än garanterat turgid; väggens mottryck kan stoppa nettoinflödet i en hypoton omgivning trots kvarvarande partikelgradient.
3. **Akvaporiner.** Ökar permeabilitet men bestämmer inte en enkelriktad flödesriktning. Alla medlemmar i hela proteinfamiljen är inte strikt begränsade till enbart vatten.
4. **Aktiv transport.** För joner spelar elektrokemisk gradient roll. ATP-pumpar är inte obegränsat oberoende av gradienter. Kopplad transport använder lagrad energi och kan fortsätta tillfälligt när ATP-försörjningen faller.
5. **Na⁺/K⁺-pumpen.** 3 Na⁺ ut, 2 K⁺ in, 1 ATP. Vilopotentialen beror också på kanaler och permeabilitet. En universell ATP-andel som 40 procent tränas inte som lag.
6. **Endocytos.** Ospecifik pinocytos skiljs från receptormedierat upptag. Vesikeltransportens energikrav handlar inte enbart om lastens koncentrationsgradient.
7. **Resistens.** Naturligt urval av ärftlig variation; ingen behovsstyrd mutation. Resistens kan bevaras genom stabilt plasmidarv, överföring och andra processer. Alla plasmider försvinner inte utan antibiotika.
8. **Antibiotika.** Kan döda eller hämma tillväxt. Selektiv toxicitet är relativ. Folatantagonister förklaras som metabol påverkan och inte som direkt blockering av RNA-polymeras. Dos och tid följer ordination; längre behandling är inte automatiskt bättre.
9. **Virus.** Herpeslatens skiljs från fagers lysogeni. Inträde via endocytos är inte universellt; fusion kan också förekomma.
10. **Växt- och djurcell.** Kloroplaster finns i fotosyntetiserande celler, inte alla växtceller. Växter har mitokondrier. Vakuolens lytiska funktion beskrivs utan absoluta påståenden om alla växtcellstyper.
11. **Övrigt.** Kollagen ger framför allt draghållfasthet; spektrin ligger på blodkroppens insida. Peroxisombildning och kromatinpackning beskrivs med relevanta nyanser. Gamla malaria-, biomassa- och bakterieantal används inte som aktuella fakta.
12. **Medicinska exempel.** Scenarier är undervisning om mekanismer. Originalets förenklade litergränser för vattenintag och behandlingspåståenden har inte byggts in i någon rådgivande simulator.

## Kontrollunderlag

- [Skolverket: Biologi 2, BIOBIO02](https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?subjectCode=BIO&tos=gy&version=2). Gäller utbildning påbörjad före juli 2025, vilket stämmer med den uppgivna kursen och årskursen.
- [Molecular Biology of the Cell: Membrane Transport](https://www.ncbi.nlm.nih.gov/books/NBK26815/).
- [The Cell: The Origin and Evolution of Cells](https://www.ncbi.nlm.nih.gov/books/NBK9841/).
- [Molecular Biology of the Cell: The Plant Cell Wall](https://www.ncbi.nlm.nih.gov/books/NBK26928/).
- [American Physiological Society: Teaching osmolarity and tonicity](https://journals.physiology.org/doi/full/10.1152/advan.00094.2018).
- [WHO Europe: Antimicrobial resistance](https://www.who.int/europe/news-room/fact-sheets/item/antimicrobial-resistance).
- [Lopatkin et al.: Persistence and reversal of plasmid-mediated antibiotic resistance](https://www.nature.com/articles/s41467-017-01532-1).
- [Roediger & Karpicke: Test-enhanced learning](https://pubmed.ncbi.nlm.nih.gov/16507066/), originalstudie som stöder användning av aktiv återkallning. Den bevisar inte att just denna individuella tvådagarsplan garanterar ett visst resultat.

## Gränser för bedömningen

Kursen tränar begrepp, mekanism, tillämpning och resonemang var för sig och tillsammans. Självbedömningen visar centrala biologiska poänger; den ersätter inte lärarens bedömning. Det finns ingen nyckelordsrättning, automatisk AI-bedömning eller påhittad betygsprognos.

## Riktad slutoptimering 2 november 2026

Jämförelsen mot samma Biologiatlas-underlag visade att tidsförlopp vid ATP-brist, osmosens permeabilitets- och tryckvillkor, genöverföring/urval och centrala organellsamband redan var förklarade. Dessa undervisningsdelar har behållits. Alla ursprungliga 28 kärnfrågor och 12 provfrågor, inklusive modeller, har oförändrade kontrollsummor.

Antibiotikakapitlets kärntext har kompletterats med 95 ord om smalt/brett spektrum, normal mikrobiota, selektion och villkor för ett biologiskt motiverat preparatval. Spektrum skiljs från styrka; smalt preparat antas inte skona hela normalfloran. En ny tillämpning prövar mekanismerna utan att bli en medicinsk behandlingsguide. Kontrollstöd: [NHS England, kompetensram för antibiotikaresistens och ansvarsfull användning](https://www.england.nhs.uk/long-read/amr-and-ams-pharmacy-undergraduate-competency-framework/).

Källans växtdel innehåller mossor, kärlväxter och fröväxter. En kort orsakskedja om transportvävnad, vattenförsörjning och befruktning utan fri vattenfilm har därför lagts under Bör kunna. Den ingår med två minuter i växtpasset. Artlistor och fullständiga livscykler prioriteras inte.

Fyra ändrade situationer tränar överföring av samma mekanismer. Eget försök före modell, konkreta kriterier och återkallning efter paus är pedagogiska designval. [Butler 2010](https://pubmed.ncbi.nlm.nih.gov/20804289/) visar i experiment att upprepad återkallning kan förbättra överföring jämfört med omläsning. Studien validerar inte just denna kurs, dess sex timmar eller en viss elevs betyg.

Kärntexten i kapitlens sex undervisningssteg växte från cirka 2 580 till 2 675 ord, ungefär 3,7 procent. Den siffran omfattar inte frågefeedback eller valbar fördjupning. Standardplanen räknar 360 minuter inklusive egna svar, jämförelse, repetition och slutkontroll. Tidsåtgången är uppskattad; inget användartest med en elev under sex timmar har genomförts.
