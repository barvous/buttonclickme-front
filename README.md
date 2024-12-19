# ButtonclickmeFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### Script 1 - Anticheat

/**

* Função para simular cliques automatizados.
* @param {string} buttonSelector - O seletor do botão no DOM.
* @param {number} totalClicks - Quantidade total de cliques simulados.
* @param {number} intervalBetweenClicks - Intervalo entre cliques (em milissegundos).
  */
  function simulateClicks(buttonSelector, totalClicks, intervalBetweenClicks) {
  const button = document.querySelector(buttonSelector);

  if (!button) {
  console.error('Botão não encontrado!');
  return;
  }

  console.log('Iniciando teste de cliques automatizados...');

  let clickCount = 0;

  const clickInterval = setInterval(() => {
  if (clickCount >= totalClicks) {
  clearInterval(clickInterval);
  console.log('Teste concluído!');
  return;
  }

  button.click();
  console.log(`Clique ${clickCount + 1} enviado`);

  clickCount++;
  }, intervalBetweenClicks);
  }

call function: simulateClicks('.principal-button', 50, 100);


### Script 2 - Anticheat

Este script faz clicks aleatórios com base em um range determinado

let clickInfinito = true;
let btn = document.querySelector('.principal-button')
function simularClick(timeout) {
    let modificador = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    let offsetRandom = Math.floor(Math.random() * 40) * (modificador);

    if (clickInfinito) {
        let offset = timeout + offsetRandom;
        setTimeout(() => {btn.click(); simularClick(timeout)}, offset);
    }
}

function stop() {
    clickInfinito = false;
}

function restart(timeout) {
    clickInfinito = true;
    simularClick(timeout);
}

call function: simularClick(80);
