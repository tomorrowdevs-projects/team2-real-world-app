
<h1 id="logo"><a href="/"><img src="..\images\TD-logo.png" alt="TD-logo" width="100" height="100" /> Team 2 - TD Project </a></h1>

<br>


- Status: Accepted
- Deciders:

  - Isabel Lombardi
  - Alessandro Attene
  - Domenico Cavaglieri
  - Matteo Bisicchia
  - Gabriele Diana
  - Aldo Telese
  - Luca Bertoldi

- Date: 2022/01/12

## Context and Problem Statement

To create a webapp that allows the user to upload a file > 2gb and gives the chance to query.

## Decision Drivers

- Ease of learning
- Community's support
- Fit for the project's purpose
- Simplification in the use of complex tools
- Quality level of the webapp

## Considered Options

- JavaScript (without frameworks)
- JavaScript with React
- TypeScript (with or without React)

## Decision Outcome

Chosen **JavaScript with React** because it is a frontend stack which makes the webapp level more adequate to current web standards.
The frontend technologies will include Create React App and possibly React-Bootstrap and Axios.

### Positive Consequences <!-- optional -->

- Simplification in the use of complex tools aimed at compilation, module bundling, transpilation and minification, combined with modern development for components and advanced state management
- Community Active

### Negative Consequences <!-- optional -->

- Learning not facilitated by the presence of very specific syntax

## Pros and Cons of the Options

### JavaScript (without frameworks)

**Pro**

- Easy to understand, clear syntax.
- Community's support
- Fit for the project's purpose

**Cons**

- No simplification in the use of complex tools aimed at compilation, module bundling, transpilation and minification
- Quality level of the webapp consequently lower than the current standards of the Web

### JavaScript with React

**Pro**

- Community's support
- Fit for the project's purpose
- Simplification in the use of complex tools aimed at compilation, module bundling, transpilation and minification, combined with modern development for components and advanced state management
- Quality level of the webapp consequently more compliant with current web standards

**Cons**

- Learning not facilitated by the presence of very specific syntax

### TypeScript (with or without React)

**Pro**

- Strong typing and stability-enhancing constraints that are characteristic of more traditnal languages than JavaSctiript

**Cons**

- Oversized structure and benefits not appreciable in this specific application context
- Learning not facilitated by the presence of very specific syntax
