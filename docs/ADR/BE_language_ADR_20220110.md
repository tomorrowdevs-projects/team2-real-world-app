## Team 2 - TD Project

* Status: Accepted  
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

## Decision Drivers

* Speed, due to file's size.
* Ease of learning
* Community's support
* Fit for the project's purpose
* Steadiness

## Considered Options

* GO 
* C#
* NodeJS


## Decision Outcome

Chosen **Go**, because We preferred the speed and execution power of the basic multithread over the Nodejs event loop.

### Positive Consequences <!-- optional -->

* Processing speed due to the use of multithread
* Basic API and Multithread management 
* Community Active

### Negative Consequences <!-- optional -->

* It’s a new programming language for everyone
* Compared to Node it requires more code to implement a simple function (it has less versatility than Node).

## Pros and Cons of the Options

### Go
**Pro**
- Very fast.
- Easy to understand, clear syntax.
- Provides heaps of libraries with no need to use the from third parties.
- Safe, including a Garbage Collector that helps preventing loss of memory in the code.
- Excellent with APIs, scalability e performance for heavy APIs.
- Standard multithread library that exploits all processor's cores without additional modules.
- Alternative option to C++, easier to learn and code, optimized to execute on multicore CPUs.
- Open-source, static, multi-purpose, cross-platform and compiled typing
- High efficiency programming language
- Resembles the C programming language with regard to speed and syntax
- Structural language with proper concurrent programming management, excellent garbage collection management, dynamic interfaces and integrated memory security. 
- Multipurpose programming language to create various applications (highly modular application systems focused on safety and speed)
- Easy to maintain applications since the code is easy to read.
- Active support from Google.
- Statically typed (alias fewer errors in variable management).
- Alert when writing a program without appropriate documentation (TOP)
- Significant performance gains due to being a compiled language (interpreted languages are a bit slower).
- Available Apis to test the code.
- Static code analysis with GoMetaLinter, a very convenient tool.
- Concurrency (or competition) supported, which helps programmers and programmers build systems with a high degree of parallel processing.


**Cons**
- It's a young language.
- Lack of MV, Go's files' size often outclass other languages' one.
- Compared to Node it requires more code to implement a simple function (it has less versatility than Node).
- The reusability of the code not very simple
- It does not offer a built-in GUI library to build GUI applications (this defect means you will have to make a significant effort to connect a library to your project).
- Less mature community than other languages (e.g., JS)


### NodeJS

**Pro**
- Designed to build complex and simple scalable network applications 
- Works on different platforms such as Windows, Linux and MACOS.
- Allowing full-stack development of both the frontend and backend of an application.
- Suitable and efficient in any network-related application.
- Excellent choice to create a real time application, with bidirectional connections where the server does not wait for an API to return data
- Used to build scalable web applications.
- Works very well with the Nosql Mongodb database.
- Easy to learn (using JS)
- Used to create high-performance applications thanks to the built-in Event loop function.
- It has the fastest growing community, with features and packages coming out every day.
- excellent for building streaming applications.
- Node has a better processing speed than GO
- Has a lower learning curve than Golang.
- Traditionally handles errors using the exception management try-catch technique, where errors are captured just when they occur and developers can debug errors quickly and quickly. This is why Node.js overcomes Go in handling errors and exceptions correctly.
 
**Cons**
- Difficult to debug Node.js because it uses Javascript, a dynamic typing language
- It uses asynchronous programming, which seems advantageous but requires a high level of skills to master to create a scalable application.
- Many Apis and packages undergo frequent changes and updates, which cause compatibility problems and confuse the developer





