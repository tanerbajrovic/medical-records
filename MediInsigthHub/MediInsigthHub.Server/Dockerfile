#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs


FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["MediInsigthHub.Server/MediInsigthHub.Server.csproj", "MediInsigthHub.Server/"]
COPY ["mediinsigthhub.client/mediinsigthhub.client.esproj", "mediinsigthhub.client/"]
RUN dotnet restore "./MediInsigthHub.Server/MediInsigthHub.Server.csproj"
COPY . .
WORKDIR "/src/MediInsigthHub.Server"
RUN dotnet build "./MediInsigthHub.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./MediInsigthHub.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MediInsigthHub.Server.dll"]
