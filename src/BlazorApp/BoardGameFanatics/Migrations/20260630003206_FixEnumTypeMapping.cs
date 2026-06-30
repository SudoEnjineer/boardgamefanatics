using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BoardGameFanatics.Migrations
{
    /// <inheritdoc />
    public partial class FixEnumTypeMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // No-op: switches enum columns from Npgsql native enum mapping to EF Core
            // value converters. The PostgreSQL enum types are unchanged in the database.
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
