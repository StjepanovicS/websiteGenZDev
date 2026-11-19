// Englische Fassung der Startseite.
// Jede Zeile: [deutscher Text exakt wie in index.html, englischer Text].
// Der Build ersetzt längere Texte zuerst und bricht ab, wenn
// - ein deutscher Text hier nicht mehr in index.html vorkommt (Übersetzung veraltet) oder
// - auf der englischen Seite noch ein deutscher Text übrig ist, der nicht in `same` steht.

export const pairs = [
  // Kopf
  [`<html lang="de">`, `<html lang="en">`],
  [`<title>GenZ Dev – App-Entwicklung, KI-Beratung &amp; Webseiten aus München</title>`, `<title>GenZ Dev – App Development, AI Consulting &amp; Websites from Munich</title>`],
  [`GenZ Dev aus München: mobile Apps für iOS und Android, KI-Beratung, Webseiten inklusive Hosting und Pflege sowie Game Development. Klare Preise, ein fester Ansprechpartner.`, `GenZ Dev from Munich: mobile apps for iOS and Android, AI consulting, websites including hosting and maintenance, and game development. Clear prices, one point of contact.`],
  [`<link rel="canonical" href="https://genz-dev.com/">`, `<link rel="canonical" href="https://genz-dev.com/en/">`],
  [`<meta property="og:locale" content="de_DE">`, `<meta property="og:locale" content="en_US">`],
  [`<meta property="og:url" content="https://genz-dev.com/">`, `<meta property="og:url" content="https://genz-dev.com/en/">`],
  [`GenZ Dev – Apps und KI, die Ihrem Geschäft Arbeit abnehmen`, `GenZ Dev – Apps and AI that take work off your plate`],
  [`Mobile Apps für iOS und Android, KI-Beratung und Webseiten mit Hosting. Ein Ansprechpartner aus München, Festpreis vor Projektstart.`, `Mobile apps for iOS and Android, AI consulting and websites with hosting. One point of contact in Munich, fixed price before we start.`],
  [`https://genz-dev.com/assets/og-image.png`, `https://genz-dev.com/assets/og-image-en.png`],
  [`GenZ Dev – Apps und KI aus München`, `GenZ Dev – apps and AI from Munich`],
  [`Zum Inhalt springen`, `Skip to content`],
  [`aria-label="GenZ Dev – zur Startseite"`, `aria-label="GenZ Dev – home"`],
  [`<div class="lang" role="group" aria-label="Sprache">
        <a href="./" hreflang="de" lang="de" aria-current="true">DE</a>
        <a href="en/" hreflang="en" lang="en">EN</a>
      </div>`, `<div class="lang" role="group" aria-label="Language">
        <a href="../" hreflang="de" lang="de">DE</a>
        <a href="./" hreflang="en" lang="en" aria-current="true">EN</a>
      </div>`],
  [`aria-label="Hauptnavigation"`, `aria-label="Main navigation"`],
  [`<span class="sr-only">Menü</span>`, `<span class="sr-only">Menu</span>`],
  [`>Leistungen<`, `>Services<`],
  [`>Rundum-Service<`, `>Full service<`],
  [`>Preise<`, `>Pricing<`],
  [`Projekt anfragen`, `Start a project`],

  // Hero
  [`Apps, KI und Web aus München`, `Apps, AI and web from Munich`],
  [`Apps und KI, die Ihrem Geschäft Arbeit abnehmen.`, `Apps and AI that take work off your plate.`],
  [`Leistungen ansehen`, `See services`],
  [`aria-label="Auf einen Blick"`, `aria-label="At a glance"`],
  [`Festpreis vor Projektstart`, `Fixed price before we start`],
  [`DSGVO-konform, Server in Deutschland`, `GDPR-compliant, servers in Germany`],
  [`>Kein Lock-in<`, `>No lock-in<`],

  // App-Showcase
  [`>App-Entwicklung<`, `>App development<`],
  [`Von der Idee bis in den App Store.`, `From idea to the App Store.`],
  [`Idee schärfen`, `Sharpen the idea`],
  [`Wir legen fest, was die erste Version können muss und was warten kann.`, `We decide what the first version must do and what can wait.`],
  [`Design und Entwicklung`, `Design and development`],
  [`Eine Codebasis für iOS und Android. Sie testen früh auf Ihrem eigenen Handy.`, `One codebase for iOS and Android. You test early on your own phone.`],
  [`Launch mit KI`, `Launch with AI`],
  [`Veröffentlichung in beiden Stores, auf Wunsch mit KI-Funktionen, bei denen Ihre Daten geschützt bleiben.`, `Release in both stores, with optional AI features that keep your data protected.`],
  [`Termin-Assistent`, `Booking assistant`],
  [`Hast du morgen Vormittag etwas frei?`, `Any free slots tomorrow morning?`],
  [`Ja, um 9:30 oder 11:00 Uhr. Soll ich 9:30 reservieren?`, `Yes, 9:30 or 11:00. Shall I book 9:30 for you?`],
  [`9:30 passt, danke!`, `9:30 works, thanks!`],
  [`Termin bestätigt`, `Booking confirmed`],
  [`Mi., 9:30 Uhr · Haarschnitt`, `Wed, 9:30 · Haircut`],
  [`Nachricht schreiben …`, `Write a message …`],

  // Leistungen
  [`Vier Bereiche, ein Ansprechpartner.`, `Four areas, one point of contact.`],
  [`>KI-Beratung<`, `>AI consulting<`],
  [`>Webseiten<`, `>Websites<`],

  // Rundum-Service
  [`Sie führen Ihr Geschäft. Um die Technik kümmere ich mich.`, `You run your business. I take care of the tech.`],

  // Für wen
  [`Auftragsverarbeitungsvertrag (AVV) nach DSGVO`, `Data processing agreement (DPA) under GDPR`],

  // Über mich
  [`>Über mich<`, `>About me<`],
  [`B. Sc. Informatik (TU München) und Gründer von GenZ Dev`, `B. Sc. Computer Science (Technical University of Munich) and founder of GenZ Dev`],
  [`Porträt von Saša Stjepanović`, `Portrait of Saša Stjepanović`],

  // Hinter den Kulissen
  [`<span class="lab-label">KI-Assistent</span>`, `<span class="lab-label">AI assistant</span>`],
  [`<span class="lab-label">Sicherheit</span>`, `<span class="lab-label">Security</span>`],
  [`<span class="lab-label">Erreichbarkeit</span>`, `<span class="lab-label">Uptime</span>`],

  // Ablauf
  [`<h3>Betreuung</h3>`, `<h3>Support</h3>`],

  // Projekte
  [`>Projekte<`, `>Projects<`],
  [`Woran ich gerade arbeite.`, `What I am working on.`],
  [`Erste Kundenprojekte folgen.`, `First client projects coming soon.`],
  [`Mobile App · iPhone `, `Mobile app · iPhone `],
  [`stayincontact-de-poster.webp`, `stayincontact-en-poster.webp`],
  [`stayincontact-de.mp4`, `stayincontact-en.mp4`],
  [`stayincontact-de.webm`, `stayincontact-en.webm`],
  [`Werbevideo: So funktioniert StayInContact`, `Promo video: how StayInContact works`],
  [`aria-label="Video anhalten"`, `aria-label="Pause video"`],
  [`<span class="project-status">Bald im App Store</span>`, `<span class="project-status">Coming soon to the App Store</span>`],
  [`Erinnert Sie daran, sich bei den Menschen zu melden, die Ihnen wichtig sind. Für jeden Kontakt legen Sie einen eigenen Rhythmus fest, ein Tipp startet Anruf oder WhatsApp. Alle Daten bleiben offline auf dem Gerät.`, `Reminds you to get in touch with the people who matter to you. Set your own rhythm for each contact, and one tap starts a call or WhatsApp. All data stays offline on the device.`],
  [`<li>27 Sprachen</li>`, `<li>27 languages</li>`],
  [`<li>100&nbsp;% offline</li>`, `<li>100&nbsp;% offline</li>`],

  // Preise
  [`So rechne ich ab.`, `How I charge.`],
  [`Festpreis-Projekt`, `Fixed-price project`],
  [`Für Apps, Webseiten und Games mit klarem Umfang.`, `For apps, websites and games with a clear scope.`],
  [`Keine Nachforderungen für den vereinbarten Umfang`, `No extra charges for the agreed scope`],
  [`Zahlung in Teilbeträgen nach Projektfortschritt`, `Payment in instalments as the project progresses`],
  [`<h3>Beratung</h3>`, `<h3>Consulting</h3>`],
  [`Für KI-Beratung, Workshops und technische Fragen.`, `For AI consulting, workshops and technical questions.`],
  [`Nach Tagessatz oder als Paket mit festem Umfang`, `Day rate or a package with a fixed scope`],
  [`In München vor Ort oder remote`, `On site in Munich or remote`],
  [`Beratung anfragen`, `Ask about consulting`],
  [`Für Hosting, Pflege und App-Updates nach dem Launch.`, `For hosting, maintenance and app updates after launch.`],
  [`Hosting in Deutschland, Backups, Sicherheitsupdates`, `Hosting in Germany, backups, security updates`],
  [`<li>Monatlich kündbar</li>`, `<li>Cancel any month</li>`],
  [`Betreuung anfragen`, `Ask about support`],
  [`Ihr Angebot in 48 Stunden`, `Your quote within 48 hours`],
  [`Als Kleinunternehmer gemäß § 19 UStG berechne ich keine Umsatzsteuer.`, `As a small business under section 19 of the German VAT Act (UStG), I do not charge VAT.`],

  // FAQ
  [`Häufige Fragen.`, `Frequently asked questions.`],
  [`Ihre Frage ist nicht dabei? <a href="#kontakt">Schreiben Sie mir.</a>`, `Question not listed? <a href="#kontakt">Get in touch.</a>`],
  [`Was kostet eine App?`, `How much does an app cost?`],
  [`Das hängt vom Umfang ab. Nach dem kostenlosen Erstgespräch bekommen Sie einen Festpreis. Oft starten wir mit einer schlanken ersten Version, die Sie schnell mit echten Nutzern testen können.`, `It depends on the scope. After the free initial call you get a fixed price. We often start with a lean first version that you can quickly test with real users.`],
  [`Wie lange dauert es, bis meine Webseite online ist?`, `How long until my website is live?`],
  [`Eine typische Unternehmensseite ist meist in 2 bis 4 Wochen fertig. Den genauen Zeitplan nenne ich Ihnen im Angebot.`, `A typical business website is usually ready in 2 to 4 weeks. The exact timeline is in your quote.`],
  [`Kann ich Texte und Bilder selbst ändern?`, `Can I edit text and images myself?`],
  [`Ja, wenn Sie möchten. Ich richte die Seite so ein, dass Sie Texte und Bilder selbst pflegen können, und zeige Ihnen, wie es geht. Oder Sie schicken mir eine kurze Nachricht und ich übernehme das im Rahmen der Pflege.`, `Yes, if you like. I set the site up so you can edit text and images yourself, and show you how. Or send me a short message and I'll take care of it as part of maintenance.`],
  [`Wo liegen meine Daten?`, `Where is my data stored?`],
  [`Auf Servern in Deutschland. Für Unternehmen schließe ich einen Auftragsverarbeitungsvertrag (AVV) nach DSGVO ab.`, `On servers in Germany. For businesses, I sign a data processing agreement (DPA) under GDPR.`],
  [`Was ist in der monatlichen Pauschale enthalten?`, `What does the monthly fee include?`],
  [`Hosting, SSL-Zertifikat, tägliche Backups, Sicherheitsupdates, Ihre E-Mail-Postfächer und ein festes Kontingent für kleine Änderungen. Monatlich kündbar.`, `Hosting, SSL certificate, daily backups, security updates, your email inboxes and a fixed allowance for small changes. Cancel any month.`],

  // Kontakt
  [`>Kontakt<`, `>Contact<`],
  [`Erzählen Sie mir von Ihrem Projekt.`, `Tell me about your project.`],
  [`B. Sc. Informatik (TU München), Gründer von GenZ Dev`, `B. Sc. Computer Science (TU Munich), founder of GenZ Dev`],
  [` (öffnet in neuem Tab)`, ` (opens in a new tab)`],
  [`?text=Hallo%20Sa%C5%A1a%2C%20ich%20interessiere%20mich%20f%C3%BCr%20ein%20Projekt.`, `?text=Hi%20Sa%C5%A1a%2C%20I%27m%20interested%20in%20a%20project.`],
  [`Per WhatsApp schreiben`, `Message me on WhatsApp`],
  [`<label for="firma">Firma <span class="optional">(optional)</span></label>`, `<label for="firma">Company <span class="optional">(optional)</span></label>`],
  [`<label for="email">E-Mail</label>`, `<label for="email">Email</label>`],
  [`Worum geht es?`, `What's it about?`],
  [`<option value="app">Mobile App</option>`, `<option value="app">Mobile app</option>`],
  [`<option value="web">Webseite</option>`, `<option value="web">Website</option>`],
  [`<option value="shop">Online-Shop oder Buchungssystem</option>`, `<option value="shop">Online shop or booking system</option>`],
  [`<option value="other">Etwas anderes</option>`, `<option value="other">Something else</option>`],
  [`<label for="nachricht">Nachricht</label>`, `<label for="nachricht">Message</label>`],
  [`Was haben Sie vor? Gibt es einen Zeitrahmen?`, `What are you planning? Is there a timeline?`],
  [`Ich habe die <a href="datenschutz.html">Datenschutzerklärung</a> gelesen und bin einverstanden, dass meine Angaben zur Beantwortung meiner Anfrage verwendet werden.`, `I have read the <a href="datenschutz.html">privacy policy</a> (in German) and agree that my details may be used to respond to my enquiry.`],
  [`Anfrage senden`, `Send enquiry`],

  // Footer
  [`Apps, KI-Beratung, Webseiten und Games. Saša Stjepanović, München.`, `Apps, AI consulting, websites and games. Saša Stjepanović, Munich.`],
  [`aria-label="Rechtliches und Social Media"`, `aria-label="Legal and social media"`],
  [`>Impressum</a>`, `>Legal notice</a>`],
  [`>Datenschutz</a>`, `>Privacy</a>`],

  // Gekürzte Startseite
  [`Mobile Apps, KI-Lösungen und Webseiten. Ein Ansprechpartner, feste Preise.`, `Mobile apps, AI solutions and websites. One point of contact, fixed prices.`],
  [`iOS und Android aus einer Codebasis, bis in den Store.`, `iOS and Android from one codebase, all the way to the store.`],
  [`Wo KI Ihnen wirklich Arbeit abnimmt. Ehrlich bewertet.`, `Where AI really saves you work. Honestly assessed.`],
  [`Design, Hosting und Pflege, mit eigenen E-Mail-Postfächern.`, `Design, hosting and maintenance, with your own email inboxes.`],
  [`Spiele für Mobil, PC und Browser.`, `Games for mobile, PC and browser.`],
  [`Getestet, gehostet, gesichert und überwacht. Alles läuft im Hintergrund.`, `Tested, hosted, backed up and monitored. It all runs in the background.`],
  [`Von der ersten Idee bis zum laufenden Betrieb haben Sie denselben Ansprechpartner.`, `From the first idea to day-to-day operation, you deal with the same person.`],
  [`So arbeiten wir zusammen`, `How we work together`],
  [`<strong>Gespräch</strong>`, `<strong>Talk</strong>`],
  [`30 Minuten, kostenlos. Danach ein Festpreis.`, `30 minutes, free. Then a fixed price.`],
  [`<strong>Umsetzung</strong>`, `<strong>Delivery</strong>`],
  [`Sie sehen Zwischenstände und geben frei.`, `You see progress and approve each step.`],
  [`<strong>Betreuung</strong>`, `<strong>Support</strong>`],
  [`Updates, Backups, Änderungen. Monatlich kündbar.`, `Updates, backups, changes. Cancel any month.`],
  [`Keine Preisliste, sondern ein schriftlicher Preis nach dem Erstgespräch.`, `No price list, but a written price after our first call.`],
  [`Schriftlich und unverbindlich, zwei Werktage nach dem Erstgespräch.`, `In writing and with no obligation, two business days after our first call.`],
  [`Ich antworte innerhalb eines Werktags. Das Erstgespräch ist kostenlos, in ganz Deutschland per Video, in München auch persönlich.`, `I reply within one business day. The first call is free, by video from anywhere, in person in Munich.`],
  [`aria-label="Beispiel: Monatsbericht einer betreuten Webseite"`, `aria-label="Example: monthly report for a managed website"`],
  [`<dt>Erreichbarkeit</dt><dd>99,98&nbsp;%</dd>`, `<dt>Uptime</dt><dd>99.98&nbsp;%</dd>`],
  [`<dt>Letztes Backup</dt><dd>heute, 03:00</dd>`, `<dt>Last backup</dt><dd>today, 3:00 am</dd>`],
  [`<dd>alle aktuell</dd>`, `<dd>all current</dd>`],
  [`<dt>E-Mail-Postfächer</dt><dd>3 aktiv</dd>`, `<dt>Email inboxes</dt><dd>3 active</dd>`],
  [`Monatsbericht Oktober`, `Monthly report, October`],
  [`<span class="status-example">Beispiel</span>`, `<span class="status-example">Example</span>`],
  [`Sie müssen nichts tun.`, `Nothing for you to do.`],
  [`<dt>Serverstandort</dt><dd>Deutschland</dd>`, `<dt>Server location</dt><dd>Germany</dd>`],
  [`Für Handwerksbetriebe, Startups und größere Firmen. Auf Wunsch mit AVV nach DSGVO und festen Reaktionszeiten.`, `For local businesses, startups and larger companies. With a GDPR data processing agreement and agreed response times if you need them.`],
  [`Erstgespräch buchen`, `Book a first call`],
  [`Kostenlos, 30 Minuten per Video. Den Termin wählen Sie direkt in meinem Kalender.`, `Free, 30 minutes by video. Pick a time straight from my calendar.`],
];

// Texte, die in beiden Sprachen gleich sind (Namen, Fachbegriffe)
export const same = [
  "width=device-width, initial-scale=1", "website", "summary_large_image",
  "GenZ Dev", "DE", "EN", "FAQ", "LinkedIn", "Instagram","Name", "(optional)",
  "Mobile Apps", "Game Development", "Mobile App · iOS &amp; Android", "StayInContact", "React Native &amp; Expo", "100&nbsp;% offline",
  "Salon Lina", "L", "9:41", "baeckerei-huber.de", "Online", "Updates",
  "Saša Stjepanović", "SS",
  "Code", "Tests", "App", "Launch", "Backups",
  "info@genz-dev.com", "© ",
];
