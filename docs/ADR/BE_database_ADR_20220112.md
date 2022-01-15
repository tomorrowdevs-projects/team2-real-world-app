## Team 2 - TD Project

* Status: Proposed 
* Deciders: 
  * Isabel Lombardi
  * Alessandro Attene
  * Domenico Cavaglieri
  * Matteo Bisicchia
  * Gabriele Diana
  * Aldo Telese
  * Luca Bertoldi   
  

* Date: 2022/01/12


## Context and Problem Statement
To create a webapp that allows the user to upload a file > 2gb and gives the chance to query.

## Decision Drivers <!-- optional -->

* MultiThread support
* Lightweight software
* Easy management of > 2GB
* Availability to support simple queries
* Easy interaction with GO

## Considered Options

* SQLite
* MySQL
* PostgreSQL

## Decision Outcome

Chosen option: "{option 1}", because {justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}.

### Positive Consequences <!-- optional -->

* {e.g., improvement of quality attribute satisfaction, follow-up decisions required, …}
* …

### Negative Consequences <!-- optional -->

* {e.g., compromising quality attribute, follow-up decisions required, …}
* …

## Pros and Cons of the Options <!-- optional -->

### SQLite

It differs from all other SQL languages since it uses a dynamic type system, meaning a value stored in a column determines its data type, and not the column’s data type
**Pro**

* Can be used by multithread (as long as a single database connection is not used simultaneously in two or more threads)
* Serverless, it doesn’t require much configuration, the setup is fast and easy
* Using the language is simple
* Runs very fast

**Cons**
* Primitive syntax and formatting limitations, doesn’t support as many functions
* Doesn't provide network access (i.e. accessing it from another machine) as it is serverless
* Not built for large-scale applications

### MySQL
Is a database server. 
Therefore, you can't just directly integrate it with your app like SQLite, it requires that you install it and then connect it to your app

* Powerful and able to handle high traffic sites
* Feature rich
* Many security features built-in
* If you require scalability in terms of the number of database queries required,

* Not as portable as SQLite
* Reliability issues
* Since being acquired by Oracle, development has slowed down


### PostgreSQL

{example | description | pointer to more information | …} <!-- optional -->

* Good, because {argument a}
* Good, because {argument b}
* Bad, because {argument c}
* … <!-- numbers of pros and cons can vary -->

## Links <!-- optional -->

* {Link type} {Link to ADR} <!-- example: Refined by [ADR-0005](0005-example.md) -->
* … <!-- numbers of links can vary -->

<!-- markdownlint-disable-file MD013 -->