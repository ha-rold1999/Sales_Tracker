﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SalesTracker.EntityFramework;

#nullable disable

namespace SalesTracker.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20230905132539_AddStoreInformationFKColoumnAtSaleTable")]
    partial class AddStoreInformationFKColoumnAtSaleTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Models.Model.Account.Credentials.StoreCredentials", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("user_name");

                    b.HasKey("Id");

                    b.ToTable("store_credentials");
                });

            modelBuilder.Entity("Models.Model.Account.Information.StoreInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("OwnerFirstname")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("first_name");

                    b.Property<string>("OwnerLastname")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("last_name");

                    b.Property<string>("StoreAddress")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("address");

                    b.Property<int>("StoreCredentialsId")
                        .HasColumnType("integer");

                    b.Property<string>("StoreEmail")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("StoreName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("store_name");

                    b.HasKey("Id");

                    b.HasIndex("StoreCredentialsId");

                    b.ToTable("store_information");
                });

            modelBuilder.Entity("Models.Model.Account.Status.AccountStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DataDeleted")
                        .HasColumnType("date")
                        .HasColumnName("date_deleted");

                    b.Property<DateOnly>("DateCreated")
                        .HasColumnType("date")
                        .HasColumnName("date_created");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_deleted");

                    b.Property<int>("StoreCredentialsId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("StoreCredentialsId");

                    b.ToTable("account_status");
                });

            modelBuilder.Entity("Models.Model.Account.Token", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("token")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("token_blacklist");
                });

            modelBuilder.Entity("Models.Model.CashFlowModel.Flow.CashFlow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("CashOnBank")
                        .HasColumnType("numeric")
                        .HasColumnName("cash_on_bank");

                    b.Property<decimal>("CashOnHand")
                        .HasColumnType("numeric")
                        .HasColumnName("cash_on_hand");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date")
                        .HasColumnName("date");

                    b.Property<int>("PrincipalId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PrincipalId");

                    b.ToTable("cash_flow");
                });

            modelBuilder.Entity("Models.Model.CashFlowModel.Principal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Capital")
                        .HasColumnType("numeric")
                        .HasColumnName("capital");

                    b.HasKey("Id");

                    b.ToTable("principal");
                });

            modelBuilder.Entity("Models.Model.CashFlowModel.Report.CashFlowReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CashFlowId")
                        .HasColumnType("integer");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date")
                        .HasColumnName("date");

                    b.Property<decimal>("TotalExpense")
                        .HasColumnType("numeric")
                        .HasColumnName("total_expense");

                    b.Property<int>("TotalMoneyReturned")
                        .HasColumnType("integer")
                        .HasColumnName("tota_money_returned");

                    b.HasKey("Id");

                    b.HasIndex("CashFlowId");

                    b.ToTable("cash_flow_report");
                });

            modelBuilder.Entity("Models.Model.Expense.Expense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date")
                        .HasColumnName("date");

                    b.HasKey("Id");

                    b.ToTable("expense");
                });

            modelBuilder.Entity("Models.Model.Expense.Expenses.Expenses", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Cost")
                        .HasColumnType("numeric")
                        .HasColumnName("cost");

                    b.Property<int>("ExpenseId")
                        .HasColumnType("integer");

                    b.Property<int>("ItemId")
                        .HasColumnType("integer");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.HasKey("Id");

                    b.HasIndex("ExpenseId");

                    b.HasIndex("ItemId");

                    b.ToTable("expenses");
                });

            modelBuilder.Entity("Models.Model.Expense.Reports.ExpenseReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ExpenseId")
                        .HasColumnType("integer");

                    b.Property<decimal>("TotalExpense")
                        .HasColumnType("numeric")
                        .HasColumnName("total_expense");

                    b.HasKey("Id");

                    b.HasIndex("ExpenseId");

                    b.ToTable("expense_report");
                });

            modelBuilder.Entity("Models.Model.Items.BuyingPriceLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DateUpdate")
                        .HasColumnType("date")
                        .HasColumnName("date_update");

                    b.Property<int>("ItemIDId")
                        .HasColumnType("integer");

                    b.Property<decimal>("NewPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("new_price");

                    b.Property<decimal>("OldPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("old_price");

                    b.HasKey("Id");

                    b.HasIndex("ItemIDId");

                    b.ToTable("buying_price_log");
                });

            modelBuilder.Entity("Models.Model.Items.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("BuyingPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("buying_price");

                    b.Property<string>("ItemName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("item_name");

                    b.Property<decimal>("SellingPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("selling_price");

                    b.Property<int>("Stock")
                        .HasColumnType("integer")
                        .HasColumnName("stock");

                    b.Property<int>("StoreInformationId")
                        .HasColumnType("integer");

                    b.Property<bool>("isDeleted")
                        .HasColumnType("boolean")
                        .HasColumnName("is_delete");

                    b.HasKey("Id");

                    b.HasIndex("StoreInformationId");

                    b.ToTable("item");
                });

            modelBuilder.Entity("Models.Model.Items.SellingPriceLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DateUpdate")
                        .HasColumnType("date")
                        .HasColumnName("date_update");

                    b.Property<int>("ItemIDId")
                        .HasColumnType("integer");

                    b.Property<decimal>("NewPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("new_price");

                    b.Property<decimal>("OldPrice")
                        .HasColumnType("numeric")
                        .HasColumnName("old_price");

                    b.HasKey("Id");

                    b.HasIndex("ItemIDId");

                    b.ToTable("selling_price_log");
                });

            modelBuilder.Entity("Models.Model.Items.StockLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DateUpdate")
                        .HasColumnType("date")
                        .HasColumnName("date_update");

                    b.Property<int>("ItemIDId")
                        .HasColumnType("integer");

                    b.Property<int>("NewStock")
                        .HasColumnType("integer")
                        .HasColumnName("new_stock");

                    b.Property<int>("OldStock")
                        .HasColumnType("integer")
                        .HasColumnName("old_stock");

                    b.HasKey("Id");

                    b.HasIndex("ItemIDId");

                    b.ToTable("stock_log");
                });

            modelBuilder.Entity("Models.Model.Sale.Reports.SaleReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("SaleId")
                        .HasColumnType("integer");

                    b.Property<decimal>("TotalIncome")
                        .HasColumnType("numeric")
                        .HasColumnName("total_income");

                    b.Property<decimal>("TotalProfit")
                        .HasColumnType("numeric")
                        .HasColumnName("total_profit");

                    b.HasKey("Id");

                    b.HasIndex("SaleId");

                    b.ToTable("sale_report");
                });

            modelBuilder.Entity("Models.Model.Sale.Sale", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date")
                        .HasColumnName("date");

                    b.Property<int>("StoreInformationId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("StoreInformationId");

                    b.ToTable("sale");
                });

            modelBuilder.Entity("Models.Model.Sale.Sales.Sales", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Income")
                        .HasColumnType("numeric")
                        .HasColumnName("income");

                    b.Property<int>("ItemId")
                        .HasColumnType("integer");

                    b.Property<decimal>("Profit")
                        .HasColumnType("numeric")
                        .HasColumnName("profit");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.Property<int>("SaleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.HasIndex("SaleId");

                    b.ToTable("sales");
                });

            modelBuilder.Entity("Models.Model.Account.Information.StoreInformation", b =>
                {
                    b.HasOne("Models.Model.Account.Credentials.StoreCredentials", "StoreCredentials")
                        .WithMany()
                        .HasForeignKey("StoreCredentialsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StoreCredentials");
                });

            modelBuilder.Entity("Models.Model.Account.Status.AccountStatus", b =>
                {
                    b.HasOne("Models.Model.Account.Credentials.StoreCredentials", "StoreCredentials")
                        .WithMany()
                        .HasForeignKey("StoreCredentialsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StoreCredentials");
                });

            modelBuilder.Entity("Models.Model.CashFlowModel.Flow.CashFlow", b =>
                {
                    b.HasOne("Models.Model.CashFlowModel.Principal", "Principal")
                        .WithMany()
                        .HasForeignKey("PrincipalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Principal");
                });

            modelBuilder.Entity("Models.Model.CashFlowModel.Report.CashFlowReport", b =>
                {
                    b.HasOne("Models.Model.CashFlowModel.Flow.CashFlow", "CashFlow")
                        .WithMany()
                        .HasForeignKey("CashFlowId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CashFlow");
                });

            modelBuilder.Entity("Models.Model.Expense.Expenses.Expenses", b =>
                {
                    b.HasOne("Models.Model.Expense.Expense", "Expense")
                        .WithMany()
                        .HasForeignKey("ExpenseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Model.Items.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Expense");

                    b.Navigation("Item");
                });

            modelBuilder.Entity("Models.Model.Expense.Reports.ExpenseReport", b =>
                {
                    b.HasOne("Models.Model.Expense.Expense", "Expense")
                        .WithMany()
                        .HasForeignKey("ExpenseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Expense");
                });

            modelBuilder.Entity("Models.Model.Items.BuyingPriceLog", b =>
                {
                    b.HasOne("Models.Model.Items.Item", "ItemID")
                        .WithMany()
                        .HasForeignKey("ItemIDId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ItemID");
                });

            modelBuilder.Entity("Models.Model.Items.Item", b =>
                {
                    b.HasOne("Models.Model.Account.Information.StoreInformation", "StoreInformation")
                        .WithMany()
                        .HasForeignKey("StoreInformationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StoreInformation");
                });

            modelBuilder.Entity("Models.Model.Items.SellingPriceLog", b =>
                {
                    b.HasOne("Models.Model.Items.Item", "ItemID")
                        .WithMany()
                        .HasForeignKey("ItemIDId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ItemID");
                });

            modelBuilder.Entity("Models.Model.Items.StockLog", b =>
                {
                    b.HasOne("Models.Model.Items.Item", "ItemID")
                        .WithMany()
                        .HasForeignKey("ItemIDId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ItemID");
                });

            modelBuilder.Entity("Models.Model.Sale.Reports.SaleReport", b =>
                {
                    b.HasOne("Models.Model.Sale.Sale", "Sale")
                        .WithMany()
                        .HasForeignKey("SaleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sale");
                });

            modelBuilder.Entity("Models.Model.Sale.Sale", b =>
                {
                    b.HasOne("Models.Model.Account.Information.StoreInformation", "StoreInformation")
                        .WithMany()
                        .HasForeignKey("StoreInformationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("StoreInformation");
                });

            modelBuilder.Entity("Models.Model.Sale.Sales.Sales", b =>
                {
                    b.HasOne("Models.Model.Items.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Model.Sale.Sale", "Sale")
                        .WithMany()
                        .HasForeignKey("SaleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("Sale");
                });
#pragma warning restore 612, 618
        }
    }
}
