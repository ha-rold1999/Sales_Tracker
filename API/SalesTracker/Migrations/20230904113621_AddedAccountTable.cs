using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SalesTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddedAccountTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "store_credentials",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_store_credentials", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "account_status",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    date_created = table.Column<DateOnly>(type: "date", nullable: false),
                    is_deleted = table.Column<bool>(type: "boolean", nullable: false),
                    date_deleted = table.Column<DateOnly>(type: "date", nullable: false),
                    StoreCredentialsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_account_status", x => x.id);
                    table.ForeignKey(
                        name: "FK_account_status_store_credentials_StoreCredentialsId",
                        column: x => x.StoreCredentialsId,
                        principalTable: "store_credentials",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "store_information",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    store_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    address = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    first_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    last_name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    StoreCredentialsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_store_information", x => x.id);
                    table.ForeignKey(
                        name: "FK_store_information_store_credentials_StoreCredentialsId",
                        column: x => x.StoreCredentialsId,
                        principalTable: "store_credentials",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_account_status_StoreCredentialsId",
                table: "account_status",
                column: "StoreCredentialsId");

            migrationBuilder.CreateIndex(
                name: "IX_store_information_StoreCredentialsId",
                table: "store_information",
                column: "StoreCredentialsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "account_status");

            migrationBuilder.DropTable(
                name: "store_information");

            migrationBuilder.DropTable(
                name: "store_credentials");
        }
    }
}
