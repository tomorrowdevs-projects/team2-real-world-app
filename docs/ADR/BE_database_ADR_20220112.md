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
**Pros**

* Can be used by multithread (as long as a single database connection is not used simultaneously in two or more threads)
* Serverless, it doesn’t require much configuration, the setup is fast and easy
* Using the language is simple
* Runs very fast
* Maximum number of rows in a table is 2^64 (18446744073709551616 or 1.8e+19)
* Maximum database size is 140 terabytes

**Cons**
* Primitive syntax and formatting limitations, doesn’t support as many functions
* Doesn't provide network access (i.e. accessing it from another machine) as it is serverless
* Not built for large-scale applications
* Speed to query data may be reduced if you have large data set

### MySQL

**Pros**
* Support multithread
* Easy to use the queries
* Superfast in fetching the data
* Easy to learn and apply
* Powerful and able to handle high traffic sites
* Feature rich
* Many security features built-in
* Architecture: purely relational 
* MySQL has also been optimized to reduce the gap when it comes to heavy data writes.
- If you don't expect your application to grow or are looking for a quick prototyping tool, then consider MySQL.


**Cons**
* Bad Documentation
* Not as portable as SQLite
* Reliability issues
* Absolutely weird default settings 


### PostgreSQL

**Pros**
* Data are safe and secure
* Support multithread
* Good Documentation
* Advertises itself as "the most advanced open-source relational database in the world".
* Built to be feature-rich, extendable and standards-compliant
* Architecture: object-relational database, offers more complex data types and allows objects to inherit properties, but it also makes working with PostgreSQL more complex.
* It is built with extensibility, standards compliance, scalability, and data integrity in mind, sometimes at the expense of speed; for simple, read-heavy workflows, Postgres may be a worse choice than MySQL.
* It handles concurrency better than MySQL
* Highly extensible. It supports a number of advanced data types not available in MySQL (geometric/GIS, network address types, JSONB that can be indexed, native UUID, time zone compatible timestamps)
* Consider PostgreSQL for any application that might grow to the enterprise environment, with complex queries and frequent write operations.

**Cons**   
* Architecture: object-relational database, offers more complex data types and allows objects to inherit properties, but it also makes working with PostgreSQL more complex.
* Less popular than MySQL, so fewer third-party tools are available. 


