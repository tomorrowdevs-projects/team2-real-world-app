## Team 2 - TD Project

* Status: Proposed 
* Deciders: 
* Date: 2022/01/10

Technical Story: {description | ticket/issue URL} <!-- optional -->

## Context and Problem Statement
Creare una webapp che permetta l'upload di un file > 2gb con la possibilita' di effettuare query.

## Decision Drivers

* Velocita' visto la dimensione dei file
* Facilita' di apprendimento
* Supporto community
* Adattabile allo scopo del progetto
* Stabilita'

## Considered Options

* GO 
* C#
* NodeJS


## Decision Outcome

Chosen option: "{option 1}", because {justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}.

### Positive Consequences <!-- optional -->

* {e.g., improvement of quality attribute satisfaction, follow-up decisions required, …}
* …

### Negative Consequences <!-- optional -->

* {e.g., compromising quality attribute, follow-up decisions required, …}
* …

## Pros and Cons of the Options

### Go
*Pro*
- Molto veloce
- Facile da comprendere, sintassi chiara
- Fornisce molte librerie senza bisogno di utilizzarle da terzi
- Sicuro, Garbage Collector incluso che aiuta a prevenire la perdita di memoria nel codice
- Ottimo con le API,
scalabilità e prestazioni per le API pesanti
- Libreria standard multithread che utilizza tutti i core del processore senza moduli aggiuntivi
- alternativa al C++ più facile da apprendere e codificare ottimizzato per - l'esecuzione su CPU multicore

*Cons*
- E’ un linguaggio giovane
- Mancanza di una MV, le dimensioni dei file Go spesso superano quelle di altri linguaggi

### C#

{example | description | pointer to more information | …} <!-- optional -->

* Good, because {argument a}
* Good, because {argument b}
* Bad, because {argument c}
* … <!-- numbers of pros and cons can vary -->

### NodeJS

{example | description | pointer to more information | …} <!-- optional -->

* Good, because {argument a}
* Good, because {argument b}
* Bad, because {argument c}
* … <!-- numbers of pros and cons can vary -->

## Links <!-- optional -->

* {Link type} {Link to ADR} <!-- example: Refined by [ADR-0005](0005-example.md) -->
* … <!-- numbers of links can vary -->

<!-- markdownlint-disable-file MD013 -->





