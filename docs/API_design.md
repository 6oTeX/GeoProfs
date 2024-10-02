# API Design

## Requests

| Url                          | Method | Action                                                       | Result |
| ---------------------------- | ------ | ------------------------------------------------------------ | ------ |
| /api/leave_request           | GET    | Fetch alle data verlof informatie van de ingelogde gebruiker | JSON   |
| /api/leave_request?user={id} | GET    | Fetch alle data van de aangevraagde user                     |

## verlof aanvragen

### Alle verlof aanvragen van de ingelogde gebruiker

| url                | Method | Result |
| ------------------ | ------ | ------ |
| /api/leave_request | GET    | JSON   |

Krijg alle verlof aanvragen van de database tabel "leave_requests" van de huidig ingelogde gebruiker.

### Alle verlof aanvragen van de ingelogde gebruiker

| url                          | Method | Result |
| ---------------------------- | ------ | ------ |
| /api/leave_request?user={ID} | GET    | JSON   |

| Parameter |     |
| --------- | --- |
| user      | User id  |

Krijg alle verlof aanvragen van de database tabel "leave_requests" van de gekozen gebruiker.
