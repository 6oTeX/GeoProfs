<style>
h1 {
    page-break-before: always;
    color: rgb(57, 170, 207);
    width: 100%;
    border-bottom: 1px solid rgb(57, 170, 207); 
}

.title {
    font-size: 32px;
}
</style>

<div class="title">
Technisch ontwerp
</div>

- [Tech Stack](#tech-stack)
  - [Framework](#framework)
  - [Packages](#packages)
  - [Versie beheer](#versie-beheer)
  - [Database](#database)
- [Architectuur](#architectuur)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database-structuur](#database-structuur)
  - [API-ontwerp](#api-ontwerp)
    - [REST API Endpoints](#rest-api-endpoints)
  - [Authenticatie en Autorisatie](#authenticatie-en-autorisatie)
    - [Werknemer](#werknemer)
    - [Manager](#manager)
    - [CEO](#ceo)
- [Test Strategie](#test-strategie)
- [Beveiliging](#beveiliging)
  - [Veiligheidsmaatregelen](#veiligheidsmaatregelen)
  - [Logging en Monitoring](#logging-en-monitoring)
- [Documentatie en code conventie](#documentatie-en-code-conventie)

# Tech Stack

De volgende frameworks, libraries en software applicaties worden gebruikt.

## Framework

Het framework wat gebruikt gaat worden is Next.js.
Next.js is een web compleet framework, wat gebaseerd is op React. Het heeft een makkelijk en snel ontwikkelproces.

Next.js kan geschreven worden in JavaScript of TypeScript. Voor dit project is TypeScript gekozen, vanwege het feit dat hier minder foutgevoelige code mee wordt geschreven.

## Packages

De packages worden gemanaged door NPM.

De packages die gebruikt worden zijn:

- Shadcn voor UI-componenten
- Tailwind voor CSS

## Versie beheer

GIT wordt gebruikt voor versiebeheer en deployment.
De GIT-repo wordt op GitHub gehost.

## Database

De database die gebruikt wordt is Supabase. Voor nu is het nog niet duidelijk of deze zelf wordt gehost (lokaal) of op de servers van Supabase.

# Architectuur

## Frontend

De front-end gebruikt shadcn als component library. NEXT maakt gebruik van server-side rendering (SSR) en client-side rendering (CSR).

## Backend

De backend bestaat uit Next.js API-routes, gecombineerd met Supabase als database-backend en authenticatiesysteem. Supabase biedt ingebouwde API's voor CRUD-operaties. Voor het ophalen van data zullen de ingebouwde API's van supabase gebruikt worden. Het aanroepen van functies zal via NEXT apis gaan.

## Database-structuur

![database diagram](db.png)

<div style="page-break-before: always;"></div>

## API-ontwerp

### REST API Endpoints

---

| **URL**     | /api/leave-request?reason=TEXT&explanation=TEXT&start-date=DATE&end-date=DATE |
| ----------- | ----------------------------------------------------------------------------- |
| **Method**  | POST                                                                          |
| **Uitleg**  | Voor het indienen van een verlofaanvraag.                                     |
| **Toegang** | Alle ingelogde gebruikers                                                     |
| **Return**  | ActionStatus                                                                  |

---

| **URL**     | /api/leave-requests                                                          |
| ----------- | ---------------------------------------------------------------------------- |
| **Method**  | GET                                                                          |
| **Uitleg**  | Voor het ophalen van alle verlofaanvragen van een gebruiker en/of department |
| **Toegang** | Alle ingelogde gebruikers                                                    |
| **Return**  | array met leave_requests                                                     |

**Parameters:**

_?user=ID:_ De geselecteerde gebruiker, standaard is dit de huidig ingelogde gebruiker.

_?department=ID_ De geselecteerde department, geeft nu alle leave_requests binnen een department terug.\*\*

_?sectie=ID_ De geselecteerde sectie, geeft nu alle leave_requests binnen een sectie terug.\*\*

---

| **URL**     | /api/leave-requests/ID/accept                                                  |
| ----------- | ------------------------------------------------------------------------------ |
| **Method**  | PUT                                                                            |
| **Uitleg**  | Voor het accepteren van een leave request.                                     |
| **Toegang** | Alle managers welke de gebruiker in een van zijn secties of departments heeft. |
| **Return**  | array met leave requests                                                       |

---

| **URL**     | /api/leave-requests/ID/decline?response=TEXT                                   |
| ----------- | ------------------------------------------------------------------------------ |
| **Method**  | PUT                                                                            |
| **Uitleg**  | Voor het afwijzen van een leave request.                                       |
| **Toegang** | Alle managers welke de gebruiker in een van zijn secties of departments heeft. |
| **Return**  | array met leave requests                                                       |

---

| **URL**     | /api/users                             |
| ----------- | -------------------------------------- |
| **Method**  | GET                                    |
| **Uitleg**  | Voor het ontvangen van alle user data. |
| **Toegang** | Alle ingelogde gebruikers.             |
| **Return**  | array met leave requests               |

---

| **URL**     | /api/users/me                                                           |
| ----------- | ----------------------------------------------------------------------- |
| **Method**  | GET                                                                     |
| **Uitleg**  | Voor het ontvangen van alle beveiligde data van de ingelogde gebruiker. |
| **Toegang** | Alle ingelogde gebruikers.                                              |
| **Return**  | array met leave requests                                                |

---

| **URL**     | /api/calender/YEAR/MONTH                                         |
| ----------- | ---------------------------------------------------------------- |
| **Method**  | GET                                                              |
| **Uitleg**  | Voor het ontvangen van alle leave_requests van de gegeven maand. |
| **Toegang** | Alle ingelogde gebruikers. \*                                    |
| **Return**  | array met leave requests.                                        |

De leave_requests zijn niet volledig gevuld gebaseerd op de rechten van de gebruiker, zo krijgt een werknemer alleen te zien wie er binnen zijn department afwezig zijn, maar niet reden.

---

<div style="page-break-before: always;"></div>

## Authenticatie en Autorisatie

De applicatie maakt gebruik van Supabase-authenticatie voor inlog- en toegangsbeheer. Toegang tot de API wordt verleend op basis van rollen en ownership. De rollen zijn als volgt:

### Werknemer

Een werknemer kan:

- zijn eigen gebruikers data inzien via _GET /api/users/me_
- Leave aanvragen via _PUT /api/leave_request_
- Afwezigheid zijn via _GET /api/calendar/MONTH_

### Manager

Een manager kan het volgende:

- Alle leave_requests ophalen binnen zijn/haar bevoegdheid via: _GET /api/leave-requests_
- leave_requests accepteren binnen zijn/haar bevoegdheid via: _PUT /api/leave-requests/ID/accept_
- leave_requests afwijzen binnen zijn/haar bevoegdheid via: _PUT /api/leave-requests/ID/decline_
- Afwezigheid zijn, en de redenen hiervan via: _GET /api/calendar/MONTH_
- De gebruikers data van alle gebruikers binnen zijn/haar bevoegdheid via: _GET /api/users_

Een manager kan ook alles wat een werknemer kan.

### CEO

Een CEO kan het volgende:

- Het exporteren van alle afwezigheid binnen periode naar .CSV via: _GET /api/export_

# Test Strategie

Testen zal plaatsvinden op zowel frontend als backend. Supabase wordt niet getest, aangezien het een beheerde service is.

Er wordt gebruik gemaakt van:

- **Jest** voor unit testing
- **Cypress** voor end-to-end testing

# Beveiliging

## Veiligheidsmaatregelen

Bescherming tegen veelvoorkomende kwetsbaarheden zoals SQL-injecties, Cross-Site Scripting (XSS), en Cross-Site Request Forgery (CSRF).

SQL-Injectie is niet mogelijk, de supabase API is hier namelijk voor beschermd.

Voor cross site scripting zullen we elk request "schoonmaken" door middel van de js package DOMPurify.

Voor Cross-site request forgery zullen wij de js package csrfProtection gebruiken.

## Logging en Monitoring

Bepaalde acties van de applicatie worden gelogd. Hierin wordt datum en tijd van de actie gelogd, de gebruiker welke deze actie uitvoert en de actie zelf. Deze logs zullen verborgen zijn voor de gebruiker, en kunnen opgevraagd worden wanner nodig.

# Documentatie en code conventie

Documentatie van de code zal plaatsvinden in de code.
Er zal gebruik gemaakt worden van een Doxygen-documentatievorm.

```ts
class Foo {
  /**
   * @brief bar function of foo
   *
   * @todo nog geen implementatie
   * @return void
   */
  public Bar() {}
}
```
