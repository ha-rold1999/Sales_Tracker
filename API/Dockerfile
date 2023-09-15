#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["SalesTracker/SalesTracker.csproj", "./SalesTracker/"]
COPY ["BusinessLogic/BusinessLogic.csproj", "./BusinessLogic/"]
COPY ["CustomException/CustomException.csproj", "./CustomException/"]
COPY ["Models/Models.csproj", "./Models/"]
COPY ["Utility/Utility.csproj", "./Utility/"]
RUN dotnet restore "SalesTracker/SalesTracker.csproj"
COPY . .
WORKDIR "/src/SalesTracker"
RUN dotnet build "SalesTracker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SalesTracker.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SalesTracker.dll"]