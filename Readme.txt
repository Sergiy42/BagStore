Тестовое приложение для магазина.
Операционная система: Windows
Приложение выполнено на Visual Studio 2022

Бэкенд:
Язык: C#
Фреймворк: ASP.NET Core 9.0
База данных: SQL Server (Entity Framework Core)

Фронтенд
Язык: JavaScript (React)

Библиотеки:
ASP.NET Core 9.0
Entity Framework Core 9.0
Microsoft.EntityFrameworkCore.SqlServer
System.Net.Http.Json
Microsoft.EntityFrameworkCore.Design
React Router
Axios
Material-UI
Context API

Требования для запуска:
.NET 9.0 SDK
Node.js 16+ и npm
SQL Server (LocalDB, Express или полноценная версия)
Visual Studio 2022 или VS Code

-------Запуск--------

Откройте приложение в программе Visual Studio 2022 или VS Code. 
1. Перейдите в BagStore.Backend, восстановите зависимости: dotnet restore. 
2. Примените миграции базы данных: dotnet ef database update 
3. Запустите сервер, так как приложение пока тестировочное, запустите сервер через Start.bat или командой: dotnet run
4. Запустите приложение: Перейдите в bagstore-web-client, выполните команду: npm start
