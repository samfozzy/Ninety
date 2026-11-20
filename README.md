# Ninety

**A private 90-day front door to men's reproductive health.**

Future Health Digital Innovation Challenge 2026 · Fertility · Challenge 01: Male Reproductive Health

- **Live prototype (no login):** https://samfozzy.github.io/Ninety/
- **Submission deck:** [docs/Ninety-FHDIC-submission.pdf](docs/Ninety-FHDIC-submission.pdf)
- **Solution deck:** [docs/Ninety-solution-deck.pdf](docs/Ninety-solution-deck.pdf)
- **Demo video (2:30):** https://samfozzy.github.io/Ninety/docs/Ninety-demo.mp4

> Prototype on synthetic data. Not medical advice and not a medical device. Clinics and labs shown are illustrative.

## The idea

New sperm take about 74 days to form and about two weeks to mature, so whatever a man changes today shows up in a semen test about 90 days later. Ninety uses that window as the unit of care:

1. **Sense.** A 3-minute private check (29 questions), with no name or phone number. Answers stay on the phone.
2. **Explain.** Every risk signal shows why it matters, whether it can change, and its guideline source.
3. **Route.** 35 published rules map to five tiers: self-care, primary care, andrology/urology, fertility services, urgent care. Red flags override everything, and a clinician confirms every referral.
4. **Test.** A lab-ready pack, home screening, teleconsult, and a reader that explains a semen report against WHO 2021 reference limits.
5. **Act.** A 90-day plan with personal levers and precision nutrition.
6. **Retest.** Day 90: did it work? Not better means the next tier.

### Profertil, made precise

Ninety's nutrition arm takes the 8-nutrient Profertil formulation (L-carnitine, L-arginine, zinc, selenium, vitamin E, folic acid, coenzyme Q10, glutathione) and turns it into a measured intervention:

- **Workup first:** no supplement advice before a baseline semen analysis.
- **Right men:** offered only where semen results and oxidative-stress signals suggest benefit.
- **Food first:** all eight nutrients mapped to Gulf and West African foods.
- **Stack safety:** the formula alone supplies 40 mg zinc a day, the adult upper limit; the app flags extra zinc, selenium, folic acid and known interactions.
- **Measured:** a day-90 retest against the man's own baseline.

The app states the evidence plainly, for and against, and stays brand-neutral. It never shares data with supplement makers.

## How it meets the six requirements

| Requirement | In the prototype |
|---|---|
| 1. Earlier, explainable risk identification | `#results`: signals by domain, rule trace, sources |
| 2. A culturally trusted experience | `#home`: no name, quick hide (Esc), Arabic preview, faith-sensitive collection options |
| 3. Lower-friction assessment | `#tests`: lab-ready pack, home screening, teleconsult, semen-report reader |
| 4. Safe triage and referral | `#results` and `#clinic`: five tiers, red-flag override, clinician confirms or changes with a logged reason |
| 5. Privacy by design | `#privacy`: memory-only by default, consent toggles, 72-hour share codes, access log, one-tap delete |
| 6. Demonstrable value | `#evidence`: 27 reference vignettes, red-flag recall, 405-run fairness check, pilot measures |

## Run it

The whole prototype is one file with its fonts and libraries built in. It needs no server and no internet connection.

- Open `index.html` in any modern browser, or
- Serve the folder: `npx serve .` and open the address it prints.

## Test the triage engine

```bash
node tests/test_engine.js
```

Expected output:

```
suite 27/27 red 5/5 under 0 over 0 fair 0/405
report reader ok
```

The test extracts the engine from `index.html` and runs it against the reference vignettes, the fairness variants and a sample lab report. It exits with code 1 if anything fails.

## Project structure

```
index.html                 the prototype (patient app, clinician console, evidence page)
tests/test_engine.js       triage-engine tests
docs/Ninety-FHDIC-submission.pdf   challenge submission deck
docs/Ninety-solution-deck.pdf      solution deck
docs/Ninety-demo.mp4               demo video
README.md
```

Inside `index.html`, the `<script id="engine">` block is the pure, deterministic triage engine. It reads no demographic fields. The second script block is the user interface.

## Safety and limits

- Screening and navigation only. Ninety does not diagnose or prescribe.
- AI never sets a tier. In the pilot, AI is used to read report photos, to write plain-language Arabic and English from signal codes, and for microscopy motility counts, each behind validators.
- All data in the prototype are synthetic. The reference vignettes check the engine against its specification; independent clinician labelling is the first pilot step.

## Team

| Name | Role | Organization |
|---|---|---|
| Dr. Samiuel C. Atuahene | Project lead; Head, Emerging Engineering Technologies Division | Council for Scientific and Industrial Research – Institute of Industrial Research (CSIR-IIR), Accra, Ghana |
| Dr. Adu Amankwaah | Medical doctor | Kumasi General Hospital, Kumasi, Ghana |
| Mr. Ekow Quayson Yale | Digital technologies | Council for Scientific and Industrial Research – Institute of Industrial Research (CSIR-IIR), Accra, Ghana |
| Miss Hilda Amarfio | Male and female health practitioner | Mediport Fertility Hospital, University of Ghana |

## Key sources

1. WHO laboratory manual for the examination and processing of human semen, 6th edition, 2021.
2. AUA/ASRM guideline on diagnosis and treatment of infertility in men, 2020, amended 2024.
3. Agarwal A et al. Global Andrology Forum guidelines on antioxidant use in male infertility. World J Mens Health, 2026.
4. Steiner AZ et al. The MOXI randomized clinical trial. Fertil Steril, 2020.
5. Lipovac M et al. Micronutrient supplementation, sperm DNA integrity and pregnancy rates. Gynecol Endocrinol, 2021.
6. NIH Office of Dietary Supplements. Zinc fact sheet (adult upper limit 40 mg/day).

## Third-party components

- Newsreader and IBM Plex fonts, SIL Open Font License 1.1, embedded in `index.html`.
- qrcode-generator 2.0.4 by Kazuhiko Arase, MIT licence, embedded in `index.html`.
