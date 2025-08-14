using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BagStore.Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixIndexesAndColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Orders_Email",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Orders",
                type: "nvarchar(MAX) COLLATE Cyrillic_General_CI_AS",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Orders",
                type: "nvarchar(MAX) COLLATE Cyrillic_General_CI_AS",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "DeliveryAddress",
                table: "Orders",
                type: "nvarchar(MAX) COLLATE Cyrillic_General_CI_AS",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "CustomerName",
                table: "Orders",
                type: "nvarchar(MAX) COLLATE Cyrillic_General_CI_AS",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalAmount",
                table: "Orders",
                type: "decimal(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Orders",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(MAX) COLLATE Cyrillic_General_CI_AS");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Orders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(MAX) COLLATE Cyrillic_General_CI_AS");

            migrationBuilder.AlterColumn<string>(
                name: "DeliveryAddress",
                table: "Orders",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(MAX) COLLATE Cyrillic_General_CI_AS");

            migrationBuilder.AlterColumn<string>(
                name: "CustomerName",
                table: "Orders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(MAX) COLLATE Cyrillic_General_CI_AS");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Email",
                table: "Orders",
                column: "Email");
        }
    }
}
