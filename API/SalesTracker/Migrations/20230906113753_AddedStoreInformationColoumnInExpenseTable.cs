using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddedStoreInformationColoumnInExpenseTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoreInformationId",
                table: "expense",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_expense_StoreInformationId",
                table: "expense",
                column: "StoreInformationId");

            migrationBuilder.AddForeignKey(
                name: "FK_expense_store_information_StoreInformationId",
                table: "expense",
                column: "StoreInformationId",
                principalTable: "store_information",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_expense_store_information_StoreInformationId",
                table: "expense");

            migrationBuilder.DropIndex(
                name: "IX_expense_StoreInformationId",
                table: "expense");

            migrationBuilder.DropColumn(
                name: "StoreInformationId",
                table: "expense");
        }
    }
}
