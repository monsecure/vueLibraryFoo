BookLibrari Application
BookLibrari is a web application for managing a library's book collection. It allows users to register books with various details, perform CRUD operations, search with filters and pagination, and view book details.

Prerequisites
Before setting up the BookLibrari application, make sure you have the following installed on your system:

VUE 3 

Node.js: Download and Install Node.js 
Vue CLI: Install Vue CLI globally by running the following command:
bash
Copy code
npm install -g @vue/cli        
Getting Started
To get started with the BookLibrari application, follow the steps below:

Clone the repository:

bash
Copy code
git clone <https://github.com/monsecure/vueLibraryFoo.git>
Navigate to the project directory:

bash
Copy code
cd library-ui-app
Install dependencies:

Copy code
npm install
Configure the API base URL:

Open the src/services/Api.js file.
Locate the baseURL variable and replace it with the appropriate URL of your API.
and all axios calls to change the route
Launch the application:

arduino
Copy code
npm run serve
Access the application:
Open your web browser and visit http://localhost:8080 to access the BookLibrari application.