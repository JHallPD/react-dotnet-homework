# Welcome

![Homepage Image](/images/homepage.PNG)

This is a simple application to manage your contacts. It's built using React, ASP.NET Core and SQL Server.

CLHbid.com will be using this application in our technical screening process. We'll ask you to make some changes to the
application and discuss them with you in the interview.

You'll need to start by following the steps in getting started, then you can move on to the homework section. More details, resources, and troubleshooting follow that.

If you have any issues, don't hesitate to email Mark for help!

## Getting Started

To start development, follow these steps:

1. Clone the repository.
2. Open the repository in a Codespace on GitHub, or setup a local environment with dotnet v8, SQL Server 2022, and node v20 (requires more detail for local).
3. Install the required dependencies by running `npm install` in the root directory and in `frontend`.
4. LOCAL - In the .devcontainer folder run `docker compose up` then with your sql manager of choice create the "ApplicationDB" database in the newly created sql container - temp fix to get coding
5. Run database migrations by running `npm run db:migrate` in the root directory.
6. Start the development server by running `npm run dev` in the root directory.
7. Run tests using `npm run test` in the frontend directory and `dotnet test` in the backend directory.

## Testing
	
Testing this app can be done using `npm run integrated-test`. 
This will run all the cypress e2e crud tests to ensure everything is working properly for the users

Comparing Cypress to Playwrite it was decided cypress would be more appropriate to use. Playwrite has a higher learning curve and is newer so there is less to use with it compared to cypress.

Cypress was selected for its easy of use and experimental features that allow for direct replication of user input on the app for a better test.
These simple crud tests need to be updated to reflect any changes in the appliation. This also allows for visualization of the actions.

## Homework

Now that you've got the application up and running, it's time to make some changes! Make sure you've taken some time to
look over the app and have either a Codespace or local environment running before starting.

We'll be reviewing your work for:

- **Correctness** - Does the code do what it's supposed to? Does it consider edge cases and business constraints?
- **Readability** - Is the code easy to understand? Are decisions and key knowledge captured?
- **Maintainability** - Is the code easy to change?
- **Testability** - Is the code easy to test? Are the tests you added maintainable?
- **Collaboration** - Did you communicate well with others? Did you ask for help when you needed it? Did you use git, source code, and tests to communicate effectively?
- **Ownership** - Did you take ownership of the code? Did you make it better?

Below is a list of things to try in the app. We don't expect people to make it through all of them, so don't worry if
you don't get to the end. Please allow yourself **no more than 3 hours to implement the changes below** after you've got
your preferred development environment configured. We'll discuss your changes in the interview.

1. Get the app up and running and add a screenshot of the homepage to the [Welcome Section](#welcome) of this README.
2. Add the ability to create a new contact.
3. Add a new field (of your choosing) to the contact model and update the UI.
4. Add the ability to delete a contact.
5. Review the unit tests for the backend and make a change to improve them. Explain your choice in the commit message.
6. Consider the user experience of the app. Make a change to improve it and explain your choice in the commit message.
7. Imagine you're adding integrated tests using a tool like Cypress or Playwright. What would you test? What would you
   not test? Why? Add a new `npm run integrated-test` script to the frontend `package.json` file update this README
   explaining your choice and how to run the tests.

## Technologies Used

In this app we're using the following technologies:

- [ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite](https://vitejs.dev/)

## Project Structure

The significant files and folders in this project are:

```
.
├── frontend                    # A React Router application powered by Vite
│   ├── package.json            # npm dependencies and scripts
|   ├── public                  # static assets served without preprocessing
|   ├── src
|   |   ├── assets              # assets that are preprocessed by Vite
|   |   ├── components          # React components
|   |   ├── routes              # Routes exporting React components, loaders and actions mentioned in `main.tsx`
|   |   ├── main.tsx            # The JS entry point for the application
|   |   ├── types.ts            # Common TypeScript types not specific to one file
|   |   ├── utils.ts            # Shared utility functions
|   ├── index.html              # The HTML entry point for the application
|   ├── tailwind.config.js      # Tailwind configuration
├── backend                     # The dotnet backend API application
│   ├── Contacts                # The implementation of the Contacts API
│   │   ├── Migrations          # Database migrations to initialize and update the database
│   │   ├── appsettings.json    # Configuration for the application (with Development and HttpsDevelopment overrides)
│   │   ├── Contact.cs          # The Contact model
│   │   ├── DbContext.cs        # The database context
│   │   ├── Program.cs          # The entry point for the application
│   ├── Contacts.Tests          # A dotnet test project for the Contacts API
│   │   ├── ContactTests.cs     # Model tests for the API
├── README.md                   # This file!
```

## Connecting to SQL Server

This development environment runs MS SQL Server 2022 in a container. You can find connection details in the `devcontainer.json` file. To connect to the database, you can use the following command:

```bash
sqlcmd -S localhost -U sa -d ApplicationDB -P 'P@ssw0rd'
```

Learn more about the SQL Server container [here](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16&tabs=ubuntu2204#connect-locally).

## Trouble Shooting

### If you're unable to access the database
Make sure that you can connect to the database on the command line. If you can't try re-building your container using the VS Code command, "Codespaces: Rebuild Container". local dev alternative?

If the database is available it's possible the migrations didn't run properly from the `postCreateCommand` in the `devcontainer.json` file. You can run the migrations manually by running the following commands:

```bash
dotnet tool install --global dotnet-ef
dotnet ef database update
```

Happy coding!


# Notes


Requires more setup for local - works great on github codespaces
Container files can include frontend. 
