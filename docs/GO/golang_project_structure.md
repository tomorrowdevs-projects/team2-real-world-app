<h1>Golang Project Structure</h1>



<img src="..\images\golang.jpg" alt="golang" width="500" height="300">


<br>


<h3>/docs</h3>
<p>
Folder containing all project documentation, images and information
</p>

<br>

<h3>/cmd</h3>
<p>Folder that contains the entry point files of the project.
Useful when you need to have more than one application binary. 
Each binary you get will have a subdirectory, like:

<code>/cmd/server/main.go</code><br>
<code>/cmd/client/main.go</code>
</p>

<br>

<h3>/internal</h3>
<p>
Folder that contains your private code files, ensures that your private packages are not importable (layout compiled by Go), it's the application code that you don't want others to import.

You can have more than one internal directory at any level of your project tree.
pkg/app/internal/client
You can add additional structure by separating your shared libraries, like <code>project/internal/pkg/private_lib</code>

No external project will be able to import files into it, even within the project you will not be able to access this internal code if it resides outside of its parent directory.
</p>

<br>

<h3>/pgk</h3>
<p>
Folder that contains files that can be used by external projects and internally by the application.
Other projects will be able to import these libraries; it is an informal contract between you and other external users that the code in that folder is safe for use by other
</p>

<br>

<h3>/api</h3>
<p>
Folder that contains the scripts that define the project's API.
It can also be inside <code>/pkg/api/</code>.
May contain JSON schema files and protocol definition files.
<p>

<br>

<h3>/config</h3>
<p>
Folder containing the deployment configurations such as config.yml or even stage_config.yml and prod_config.yml files
</p>

<br>

<h3>go.mod</h3>
<p>
File that manages the dependencies, it will contain all the modules and packages that will be used in the program
Defines:
<ul>
<li> Import path of the module. </li>
<li> The version of go with which the module is created. </li>
<li>Module dependency requirements for a successful build. Defines the dependency requirements of both projects and also locks them onto the correct version. </li>
</ul>


<br>

<h3>go.sum</h3>
<p>
Used to validate the checksum of each of the direct and indirect dependencies to confirm that none of them have been modified.
</p>

<br>

<h3>*_test.go</h3>
<p>
Test files should be placed next to the code you are testing, 
It is not mandatory, and as you go up the complexity scale from the tests goes up it would be difficult to have the tests next to the code, since you might be testing more than one module at a time
</p>
