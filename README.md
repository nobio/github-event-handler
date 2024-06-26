# Architektur
Folgende Abhängigkeiten sind gegeben:

1. Dieses Projekt muss als Docker container auf der Maschine laufen, auf die eine Software neu deployt werden soll. Sie bietet einen Endpoint `POST /github/webhook`, der am besten über einen Reverse Proxy im Internet exponiert werden muss. Dieser Endpoint muss bei Githhub registriert werden (siehe `Settings/Webhooks`). Als Format muss JSON ausgewählt werden und es können "alle Events" gepusht werden. Dieses Programm erkennt über Umgebungsvariablen, ob es ein Redeployment einer Software triggern muss oder nicht.

2. Matcht der Trigger, wird eine Datei im Rootverzeichnis angelegt, aus deren Name das zu deployende Repo hervorgeht. Bezeichnung: `deploy.<repo name>`. Das Rootverzeichnis muss als Volume eingebunden werden (siehe `docker-compose.yaml`).

### Umgebungsvariablen
* `GITHUB_WEBHOOK_SECRET`: Das Secret das bei Github im Bererich Webhook hinterlegt wurde wird validiert.

* `GITHUB_WEBHOOK_TRIGGER`: Komma separierte Liste zusammengesetzter Bezeichner, der aus dem Post-Body ermittelt wird. Er setzt sich zusammen aus `<repo name>.<job name>.<status>`, bspw. `github-event-handler.build-arm (v16).completed`

* `GITHUB_WEBHOOK_TRIGGER_ROOT_PATH`: Root-Pfad, von dem aus `docker-compose.yaml` gefunden wird: `<ROOT_PATH>/<repo name>/docker-compose.yaml`.
