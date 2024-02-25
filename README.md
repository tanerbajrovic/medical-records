# MedInsightHUB

MedInsightHUB is a simple web application for viewing/adding/modifying medical records. It supports two kinds of access: `Doctor` and `Technician`.

## How to run it?

### Setup

Migrations are configured. To update the database use:

```bash
dotnet-ef migrations add InitialCreate
dotnet-ef database update
```

Setting up the frontend part of the web application is done with:

```bash
npm install
```

### Running locally

Run the the following commands to setup the application locally at `http://localhost` (backend is running on port `5051`, frontend on port `3000`):

```bash
dotnet run
npm start
```
